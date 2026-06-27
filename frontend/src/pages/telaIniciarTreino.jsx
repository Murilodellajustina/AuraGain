import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { listarExercicios } from "../Services/Api";
import Sidebar from "../components/sideBar";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function IniciarTreino() {

    const location = useLocation();

    const treino = location.state?.treino;

    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [nome, setNome] = useState("Visitante");
    const [letraInicial, setLetraInicial] = useState("V");
    const [meusTreinos, setMeusTreinos] = useState([]);
    const [indiceTreinoAtivo, setIndiceTreinoAtivo] = useState(0);
    const [carregandoTreinos, setCarregandoTreinos] = useState(true);

    const [realizados, setRealizados] = useState({});
    const concluidos = Object.values(realizados).filter(Boolean).length;
    const progresso = (concluidos / treino.exercicios.length) * 100;
    const treinoFinalizado = treino.exercicios.every(ex => realizados[ex.id]);

    const [pesos, setPesos] = useState({});

    useEffect(() => {
        const nomeSalvo = localStorage.getItem("userName");
        const emailSalvo = localStorage.getItem("userEmail");
        if (nomeSalvo && emailSalvo) {
            setNome(nomeSalvo.split(" ")[0]);
            setLetraInicial(nomeSalvo.charAt(0).toUpperCase());
            buscarTreinosDoBanco(emailSalvo);
        } else {
            navigate("/Login");
        }
    }, [navigate]);

    async function alternarRealizado(id) {
        setRealizados((anterior) => ({
            ...anterior,
            [id]: !anterior[id]
        }));
    }

    async function buscarTreinosDoBanco(email) {
        try {
            const resposta = await fetch(`http://localhost:8080/api/treinos/usuario/${email}`);
            if (resposta.ok) {
                const dados = await resposta.json();

                dados.sort((a, b) => a.titulo.localeCompare(b.titulo));

                setMeusTreinos(dados);
            } else {
                console.error("Erro ao buscar treinos.");
            }
        } catch (erro) {
            console.error("Erro de conexão com o banco:", erro);
        } finally {
            setCarregandoTreinos(false);
        }
    }

    async function imprimirFichaPDF() {
        console.log("Gerando PDF...");
        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.setTextColor(17, 153, 142);
        doc.text("AuraGain - Ficha de Treino", 14, 22);

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Treino: ${treino.titulo}`, 14, 32);
        doc.text(`Aluno: ${nome}`, 14, 38);

        const colunas = ["Exercício", "Séries", "Repetições", "Carga Registrada"];
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

        doc.save(`Ficha_Treino_${treino.titulo.replace(/\s+/g, '_')}.pdf`);
    }

    function handleLogout() {
        localStorage.clear();
        navigate("/");
    }

    async function finalizarTreino() {

        const lista = treino.exercicios.map(item => ({
            id: item.id,
            peso: pesos[item.id] || 0
        }));

        await fetch("http://localhost:8080/api/treinos/pesos", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(lista)
        });

        navigate("/paginaInicial");
    }


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
                        {treino.titulo}
                    </h2>

                        <div className="d-flex align-items-center gap-3">
                            <button
                                className="btn btn-outline-success fw-bold"
                                onClick={imprimirFichaPDF}
                                title="Baixar PDF"
                            >
                                PDF
                            </button>

                            <h4 className="mb-0" style={{ border: "2px solid black", padding: "5px 10px", borderRadius: "8px" }}>
                                {String(minutos).padStart(2, "0")}:{String(segundosRestantes).padStart(2, "0")}
                            </h4>
                        </div>
                    </div>


                    {treino.exercicios.map((item) => (
                        <><div
                            key={item.id}
                            className={`card mb-3 col-lg-10 ${realizados[item.id] ? "border-success" : ""
                                }`}
                        >
                            <div className="card-body  d-flex justify-content-between align-items-center">
                                <h5>{item.exercicio.nome}</h5>
                                <p>
                                    {item.series} séries × {item.repeticoesAlvo} repetições
                                </p>
                                <button
                                    className={`btn ${realizados[item.id]
                                        ? "btn-success"
                                        : "btn-outline-secondary"
                                        }`}
                                    onClick={() => alternarRealizado(item.id)}

                                >
                                    {realizados[item.id] ? "Realizado" : "○ Não realizado"}
                                </button>
                                {realizados && (
                                    <div className="input-group mt-2 col-lg-6" style={{ maxWidth: "180px" }}>

                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder={item.peso + " (anterior)"}
                                            disabled={realizados[item.id]}
                                            value={pesos[item.id] || ""}
                                            onChange={(e) =>
                                                setPesos({
                                                    ...pesos,
                                                    [item.id]: Number(e.target.value)
                                                })
                                            }

                                        />
                                        <span className="input-group-text">kg</span>

                                    </div>
                                )}
                            </div>
                        </div >
                        </>

                    ))}

                    <div className="mb-4">
                        <div className="d-flex justify-content-between">
                            <span>Progresso</span>
                            <span>{concluidos}/{treino.exercicios.length}</span>
                        </div>

                        <div className="progress">
                            <div
                                className="progress-bar"
                                style={{ width: `${progresso}%` }}
                            />
                        </div>
                    </div>

                    <div className="card-footer bg-white border-top-0 p-4 d-grid">
                        <button className="btn btn-success btn-lg fw-bold shadow-sm rounded-3" disabled={!treinoFinalizado}
                            onClick={finalizarTreino}>
                            Finalizar treino {treino.titulo}
                        </button>
                    </div>

                </div>


            </div>

        </Sidebar >
    );
}