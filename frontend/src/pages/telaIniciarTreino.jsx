import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { listarExercicios } from "../Services/Api";
import Sidebar from "../components/sideBar";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useTranslation } from 'react-i18next';
import useAtalhos from "../hooks/useAtalhos";

export default function IniciarTreino() {

    const location = useLocation();
    const { t } = useTranslation();
    const treino = location.state?.treino;

    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [nome, setNome] = useState("Visitante");
    const [letraInicial, setLetraInicial] = useState("V");
    const [meusTreinos, setMeusTreinos] = useState([]);
    const [indiceTreinoAtivo, setIndiceTreinoAtivo] = useState(0);
    const [carregandoTreinos, setCarregandoTreinos] = useState(true);

    const [realizados, setRealizados] = useState({});
    const [carregando, setCarregando] = useState(false);
    const concluidos = Object.values(realizados).filter(Boolean).length;
    const progresso = (concluidos / treino.exercicios.length) * 100;
    const treinoFinalizado = treino.exercicios.every(ex => realizados[ex.id]);

    const [pesos, setPesos] = useState({});

    useEffect(() => {
        if (!treino) {
            navigate("/paginaInicial");
            return;
        }

        const pesosIniciais = {};
        treino.exercicios.forEach(ex => {
            pesosIniciais[ex.id] = ex.peso || 0; 
        });
        setPesos(pesosIniciais);
    }, [treino, navigate]);

    async function alternarRealizado(id) {
        setRealizados((anterior) => ({
            ...anterior,
            [id]: !anterior[id]
        }));
    }

    const handlePesoChange = (id, valor) => {
        setPesos(prev => ({ ...prev, [id]: valor }));
    };

    async function buscarTreinosDoBanco(email) {
        try {
            const resposta = await fetch(`http://localhost:8080/api/treinos/usuario/${email}`);
            if (resposta.ok) {
                const dados = await resposta.json();

                dados.sort((a, b) => a.titulo.localeCompare(b.titulo));

                setMeusTreinos(dados);
            } else {
                console.error(t("erro_buscar_treinos"));
            }
        } catch (erro) {
            console.error(t("erro_conexao_banco"), erro);
        } finally {
            setCarregandoTreinos(false);
        }
    }

    async function imprimirFichaPDF() {
        console.log(t("gerando_pdf"));
        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.setTextColor(17, 153, 142);
        doc.text(t("pdf_titulo_auragain"), 14, 22);

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`${t("treino")}: ${treino.titulo}`, 14, 32);
        doc.text(`${t("aluno_padrao")}: ${nome}`, 14, 38);

        const colunas = [t("exercicio"), t("series"), t("repeticoes"), t("carga_registrada")];
        const linhas = [];

        treino.exercicios.forEach(item => {
            const linha = [
                item.exercicio.nome,
                item.series,
                item.repeticoesAlvo,
                item.peso + "kg" ? `${pesos[item.id]} kg` : "---"
            ];
            linhas.push(linha);
        });

        autoTable(doc, {
            startY: 45,
            head: [colunas],
            body: linhas,
            theme: "striped",
            headStyles: { fillColor: [17, 153, 142] },
            styles: { fontSize: 11, cellPadding: 4 },
        });

        doc.save(`${t("pdf_nome_arquivo")}${treino.titulo.replace(/\s+/g, '_')}.pdf`);
    }

    function handleLogout() {
        localStorage.clear();
        navigate("/");
    }

    const finalizarTreino = async () => {
        if (!treinoFinalizado) return;
        
        setCarregando(true);
        const emailUsuario = localStorage.getItem("userEmail");

        const payload = {
            emailUsuario: emailUsuario,
            exercicios: treino.exercicios.map(ex => ({
                treinoExercicioId: ex.id,
                exercicioId: ex.exercicio.id,
                pesoUtilizado: parseInt(pesos[ex.id]) || 0
            }))
        };

        try {
            const res = await fetch("http://localhost:8080/api/treinos/executar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                navigate("/paginaInicial");
            } else {
                const erro = await res.text();
            }
        } catch (error) {
        } finally {
            setCarregando(false);
        }
    };


    const [segundos, setSegundos] = useState(0);
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;

    useEffect(() => {
        const intervalo = setInterval(() => {
            setSegundos((s) => s + 1);
        }, 1000);

        return () => clearInterval(intervalo);
    }, []);


    const treinoAtual = meusTreinos.length > 0 ? meusTreinos[indiceTreinoAtivo] : null;

        const toTranslationKey = (text) =>
        text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "_")
            .replace(/^_+|_+$/g, "");

    useAtalhos({
        "Alt+D": () => navigate("/paginaInicial"), 
        "Alt+F": () => finalizarTreino(),
        "Alt+I": () => imprimirFichaPDF()
    });

    if (!treino) return null;

    return (
        <Sidebar>

            <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light"

                style={{
                    backgroundColor: '#11998e',
                    backgroundImage: 'linear-gradient(to right, #fdfffe, #d6ffe0, #fdfffe)',
                    overflowX: 'hidden'
                }}

            >

                <div className="card shadow-lg border-2 col-lg-10 rounded-4 p-4 p-md-5" style={{ marginTop: "50px" }}>
                    <div className="card-body  d-flex justify-content-between align-items-center"><h2 style={{
                        borderRight: "80px"
                    }}>
                        {t(toTranslationKey(treino.titulo))}
                    </h2>

                        <div className="d-flex align-items-center gap-3">
                            <button
                                className="btn btn-outline-success fw-bold" title="Alt+I"
                                onClick={imprimirFichaPDF}
                                title="Baixar PDF"
                            >
                                {t("baixar_pdf")}
                            </button>

                            <h4 className="mb-0" style={{ border: "2px solid black", padding: "5px 10px", borderRadius: "8px" }}>
                                {String(minutos).padStart(2, "0")}:{String(segundosRestantes).padStart(2, "0")}
                            </h4>
                        </div>
                    </div>


                    {treino.exercicios.map((itemExercicio, index) => (
                        <div key={itemExercicio.id} className="card shadow-sm border-0 rounded-4 mb-3 p-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center gap-3">
                                    <input 
                                        type="checkbox" 
                                        className="form-check-input mt-0" 
                                        style={{ width: "25px", height: "25px", cursor: "pointer" }}
                                        checked={!!realizados[itemExercicio.id]}
                                        onChange={() => alternarRealizado(itemExercicio.id)} 
                                    />
                                    <div>
                                        <h5 className={`mb-0 fw-bold ${realizados[itemExercicio.id] ? "text-success" : "text-dark"}`}>
                                            {itemExercicio.exercicio.nome}
                                        </h5>
                                        <small className="text-muted">
                                            {itemExercicio.series} {t("series")} x {itemExercicio.repeticoesAlvo} {t("reps")}
                                        </small>
                                    </div>
                                </div>
                            
                            {!realizados[itemExercicio.id] && (
                                    <div className="input-group" style={{ width: "120px" }}>
                                        <input 
                                            type="number" 
                                            className="form-control text-center fw-bold" 
                                            min="0"
                                            value={pesos[itemExercicio.id] !== undefined ? pesos[itemExercicio.id] : ''} 
                                            onChange={(e) => handlePesoChange(itemExercicio.id, e.target.value)} 
                                        />
                                        <span className="input-group-text bg-white fw-bold">kg</span>
                                    </div>
                                
                            )}
                            </div>
                        </div>
                    ))}

                    <div className="card shadow-sm border-0 rounded-4 p-4 mt-4">
                        <div className="d-flex justify-content-between mb-2 fw-bold">
                            <span className="text-secondary">{t("progresso") || "Progresso"}</span>
                            <span className="text-success">{concluidos} / {treino.exercicios.length}</span>
                        </div>

                        <div className="progress mb-4" style={{ height: "15px", borderRadius: "10px" }}>
                            <div
                                className="progress-bar"
                                style={{ 
                                    width: `${progresso}%`, 
                                    backgroundColor: '#119943',
                                    backgroundImage: 'linear-gradient(to right, #95fbc8, #46ff74, #00ff80)', 
                                    transition: "width 0.4s ease-in-out"
                                }}
                            />
                        </div>

                        <button 
                            className={`btn btn-lg w-100 fw-bold rounded-pill shadow-sm ${treinoFinalizado ? 'btn-success' : 'btn-secondary'}`} 
                            title="Alt+F" 
                            disabled={!treinoFinalizado || carregando}
                            onClick={finalizarTreino}
                        >
                            {carregando ? t("iniciar_salvando") || "Salvando histórico..." : t("finalizar_treino") || "Finalizar Treino"}
                        </button>
                    </div>

                </div>


            </div>

        </Sidebar >
    );
}