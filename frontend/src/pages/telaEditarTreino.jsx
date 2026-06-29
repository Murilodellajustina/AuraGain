import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from 'react-select';
import { listarExercicios } from "../Services/Api";
import Sidebar from "../components/sideBar";
import { useTranslation } from 'react-i18next';
import useAtalhos from "../hooks/useAtalhos";

export default function EditarTreino() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation(); 
    
    const treinoExistente = location.state?.treino;
    
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);

    const [email, setEmail] = useState("");
    const [exercicios, setExercicios] = useState([]);
    const [carregando, setCarregando] = useState(false);

    const [linhasExercicios, setLinhasExercicios] = useState([]);

    useEffect(() => {
        if (!treinoExistente) {
            navigate("/paginaInicial");
            return;
        }

        const emailSalvo = localStorage.getItem("userEmail");
        if (emailSalvo) {
            setEmail(emailSalvo);
        } else {
            navigate("/");
            return;
        }

        async function carregarExercicio() {
            try {
                const dados = await listarExercicios();
                setExercicios(dados);
            } catch (erro) {
                console.error(t("erro_carregar_exercicios"), erro);
            }
        }
        carregarExercicio();
        
        const tituloOriginal = treinoExistente.titulo || "";
        const letra = tituloOriginal.replace("Ficha ", "");
        setOpcaoSelecionada({ value: letra, label: `Ficha ${letra}` });
        
        if (treinoExistente.exercicios && treinoExistente.exercicios.length > 0) {
            const linhasCarregadas = treinoExistente.exercicios.map(ex => ({
                id: ex.id || Date.now() + Math.random(),
                exercicioId: ex.exercicio?.id || null,
                series: ex.series || '',
                repeticoes: ex.repeticoesAlvo || ''
            }));
            setLinhasExercicios(linhasCarregadas);
        } else {
            setLinhasExercicios([{ id: Date.now(), exercicioId: null, series: '', repeticoes: '' }]);
        }
    }, [navigate, treinoExistente]);

    const handleSalvarEdicao = async () => {
        if (!opcaoSelecionada) {
            alert(t("criar_alerta_selecione_dia"));
            return;
        }

        const exerciciosValidos = linhasExercicios.filter(linha => linha.exercicioId && linha.series && linha.repeticoes);
        
        if (exerciciosValidos.length === 0 || exerciciosValidos.length !== linhasExercicios.length) {
            alert(t("criar_alerta_preencher_campos"));
            return;
        }

        setCarregando(true);

        const payload = {
            diaFicha: opcaoSelecionada.value,
            emailUsuario: email, 
            exercicios: exerciciosValidos.map(linha => ({
                exercicioId: linha.exercicioId,
                series: parseInt(linha.series),
                repeticoes: parseInt(linha.repeticoes)
            }))
        };

        try {
            const resposta = await fetch(`http://localhost:8080/api/treinos/${treinoExistente.id}`, { 
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (resposta.ok) {
                alert(t("criar_alerta_sucesso"));
                navigate("/perfil"); 
            } else {
                const erroMsg = await resposta.text();
                alert(erroMsg);
            }
        } catch (error) {
            alert(t("erro_conexao_servidor"));
            console.error(error);
        } finally {
            setCarregando(false);
        }
    };

    const adicionarNovaLinha = () => {
        setLinhasExercicios([...linhasExercicios, { id: Date.now(), exercicioId: null, series: '', repeticoes: '' }]);
    }

    const handleLinhaChange = (idLinha, campo, valor) => {
        setLinhasExercicios(linhasAnteriores =>
            linhasAnteriores.map(linha =>
                linha.id === idLinha ? { ...linha, [campo]: valor } : linha
            )
        );
    };

    const removerLinha = (idLinha) => {
        if (linhasExercicios.length > 1) {
            setLinhasExercicios(linhasExercicios.filter(linha => linha.id !== idLinha));
        }
    };

    const toTranslationKey = (text) =>
        text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "_")
            .replace(/^_+|_+$/g, "");

    const opcoesExercicios = exercicios.map(exercicio => ({
        value: exercicio.id,
        label: t(toTranslationKey(exercicio.nome)) || exercicio.nome
    }));

    const opcoesDias = [
        { value: 'A', label: t("criar_ficha_a") || 'Ficha A' },
        { value: 'B', label: t("criar_ficha_b") || 'Ficha B' },
        { value: 'C', label: t("criar_ficha_c") || 'Ficha C' },
        { value: 'D', label: t("criar_ficha_d") || 'Ficha D' },
        { value: 'E', label: t("criar_ficha_e") || 'Ficha E' },
        { value: 'F', label: t("criar_ficha_f") || 'Ficha F' },
    ];

    useAtalhos({
        "Alt+M": () => setIsSidebarOpen(prev => !prev),
        "Alt+D": () => navigate("/paginaInicial"), 
        "Alt+N": () => adicionarNovaLinha(),       
        "Alt+C": () => handleSalvarEdicao()     
    });

    return (
        <div className="container-fluid min-vh-100 bg-light text-dark p-0" style={{
            backgroundColor: '#11998e',
            backgroundImage: 'linear-gradient(to right, #fdfffe, #d6ffe0, #fdfffe)',
            overflowX: 'hidden'
        }}>
            <Sidebar>
                <div className="container mt-4 mb-5">
                    <div className="row gx-4">
                        <div className="col-lg-12 mb-4">
                            <div className="card bg-white border-0 shadow-sm h-100 rounded-4 overflow-hidden">
                                
                                <div className="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
                                    <h4 className="mb-0 text-success fw-bold">✏️ {t("editar_ficha_treino")}</h4>
                                </div>
                                
                                <div className="card-body p-0">
                                    <ul className="list-group list-group-flush fs-5">
                                        <div className="col-lg-4 d-flex mt-3" style={{ marginLeft: '20px' }}>
                                            <Select
                                                value={opcaoSelecionada}
                                                onChange={setOpcaoSelecionada}
                                                options={opcoesDias}
                                                isSearchable={true}
                                                placeholder={t("criar_selecione_ficha")}
                                                noOptionsMessage={() => t("criar_nenhum_resultado")}
                                            />
                                        </div>
                                    </ul>
                                </div>
                                
                                <div className="card-body p-0 ">
                                    <ul className="list-group list-group-flush fs-5">
                                        {linhasExercicios.map((linha) => (
                                            <div key={linha.id} className="d-flex align-items-center mt-3" style={{ marginTop: '20px', marginLeft: '20px' }}>
                                                
                                                <div className="flex-grow-1">
                                                    <Select
                                                        options={opcoesExercicios}
                                                        placeholder={t("criar_selecione_exercicio")}
                                                        noOptionsMessage={() => t("criar_nenhum_resultado")}
                                                        value={opcoesExercicios.find(op => op.value === linha.exercicioId) || null}
                                                        onChange={(opcao) => handleLinhaChange(linha.id, 'exercicioId', opcao ? opcao.value : null)}
                                                    />
                                                </div>
                                                
                                                <div className="ms-3">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder={t("criar_label_series") || "Séries"}
                                                        min="1"
                                                        style={{ width: '130px' }}
                                                        value={linha.series}
                                                        onChange={(e) => handleLinhaChange(linha.id, 'series', e.target.value)}
                                                    />
                                                </div>
                                                
                                                <div className="ms-3">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder={t("criar_label_reps") || "Repetições"}
                                                        min="1"
                                                        style={{ width: '130px' }}
                                                        value={linha.repeticoes}
                                                        onChange={(e) => handleLinhaChange(linha.id, 'repeticoes', e.target.value)}
                                                    />
                                                </div>

                                                {linhasExercicios.length > 1 && (
                                                    <div className="ms-3 me-3">
                                                        <button className="btn btn-outline-danger" onClick={() => removerLinha(linha.id)}>
                                                            X
                                                        </button>
                                                    </div>
                                                )}
                                                
                                            </div>
                                        ))}
                                    </ul>
                                    
                                    <button className="btn btn-outline-success fw-bold shadow-sm rounded-3 " title="Alt+N" style={{ marginTop: '20px', marginLeft: '20px' }} onClick={adicionarNovaLinha}>
                                        {t("criar_btn_adicionar")}
                                    </button>
                                </div>
                                
                                <div className="card-footer bg-white border-top-0 p-4 d-grid">
                                    <button className="btn btn-success btn-lg fw-bold shadow-sm rounded-3" title="Alt+C" onClick={handleSalvarEdicao} disabled={carregando}>
                                        {carregando ? t("criar_salvando") : t("guardar_alteracoes_treino")}
                                    </button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </Sidebar>
        </div>
    );
}