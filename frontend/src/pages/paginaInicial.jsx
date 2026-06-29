import { useState, useEffect } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../imagens/logoAuraGain.png";
import Sidebar from "../components/sideBar";
import { useTranslation } from 'react-i18next';
import useAtalhos from "../hooks/useAtalhos";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


export default function PaginaInicial() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [nome, setNome] = useState("Visitante");
    const [letraInicial, setLetraInicial] = useState("V");
    const [emailUsuario, setEmailUsuario] = useState("");

    const [meusTreinos, setMeusTreinos] = useState([]);
    const [indiceTreinoAtivo, setIndiceTreinoAtivo] = useState(0);
    const [carregandoTreinos, setCarregandoTreinos] = useState(true);

    const [exercicioGraficoSelecionado, setExercicioGraficoSelecionado] = useState(null);
    const [dadosGrafico, setDadosGrafico] = useState([]);
    const [carregandoGrafico, setCarregandoGrafico] = useState(false);

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
            console.error(t("erro_conexao_servidor"), erro);
        } finally {
            setCarregandoTreinos(false);
        }
    }

    function handleLogout() {
        localStorage.clear();
        navigate("/");
    }


    const treinoAtual = meusTreinos.length > 0 ? meusTreinos[indiceTreinoAtivo] : null;

    useEffect(() => {
        if (treinoAtual && treinoAtual.exercicios && treinoAtual.exercicios.length > 0) {
            const primeiroExercicio = treinoAtual.exercicios[0].exercicio;
            setExercicioGraficoSelecionado(primeiroExercicio);
        } else {
            setExercicioGraficoSelecionado(null);
        }
    }, [treinoAtual]);

    useEffect(() => {
        
        const email = localStorage.getItem("userEmail"); 

        if (!exercicioGraficoSelecionado) {
            return;
        }

        if (!email) {
            return;
        }

        async function buscarHistorico() {
            setCarregandoGrafico(true);
            try {
                const urlDaApi = `http://localhost:8080/api/treinos/historico/${encodeURIComponent(email)}/${exercicioGraficoSelecionado.id}`;

                const res = await fetch(urlDaApi);
                
                if (res.ok) {
                    const historico = await res.json();
                    
                    if (Array.isArray(historico) && historico.length > 0) {
                        const dadosFormatados = historico.map(item => {
                            let dia = "00", mes = "00";
                            if (typeof item.data === 'string') {
                                const partesData = item.data.split("-");
                                dia = partesData[2];
                                mes = partesData[1];
                            } else if (Array.isArray(item.data)) {
                                dia = String(item.data[2]).padStart(2, '0');
                                mes = String(item.data[1]).padStart(2, '0');
                            }
                            return {
                                ...item,
                                dataFormatada: `${dia}/${mes}`,
                                peso: item.peso 
                            };
                        });
                        setDadosGrafico(dadosFormatados);
                    } else {
                        setDadosGrafico([]);
                    }
                } else {
                    const erroTxt = await res.text();
                    setDadosGrafico([]);
                }
            } catch (error) {
                setDadosGrafico([]);
            } finally {
                setCarregandoGrafico(false);
            }
        }
        buscarHistorico();
    }, [exercicioGraficoSelecionado]);

    function toTranslationKey(text) {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "_")    
            .replace(/^_+|_+$/g, "");
    }

    useAtalhos({
        "Alt+M": () => setIsSidebarOpen(prev => !prev), 
        "Alt+T": () => navigate("/telaCriarTreino"),
        "Alt+P": () => navigate("/areaPersonal"),
        "Alt+I": () => navigate("/telaIniciarTreino", {state: {treino: treinoAtual}}),
        "Alt+S": () => handleLogout()                   
    });

    return (

        <div className="container-fluid min-vh-100 bg-light text-dark p-0" style={{ overflowX: "hidden" }}>
            <Sidebar>
                <div className="container mt-4 mb-5">

                    <div className="row gx-4">

                        <div className="col-lg-7 mb-4">
                            <div className="card bg-white border-0 shadow-sm h-100 rounded-4 overflow-hidden">
                                <div className="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
                                    <h4 className="mb-0 text-success fw-bold">{t("dash_treino_hoje")}</h4>
                                    {meusTreinos.length > 0 && (
                                        <div className="btn-group shadow-sm">
                                            {meusTreinos.map((treino, index) => (
                                                <button
                                                    key={treino.id}
                                                    className={`btn btn-sm ${indiceTreinoAtivo === index ? 'btn-success fw-bold' : 'btn-outline-success'}`}
                                                    onClick={() => setIndiceTreinoAtivo(index)}
                                                >
                                                    {t(toTranslationKey(treino.titulo))}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="card-body p-0">
                                    {carregandoTreinos ? (
                                        <div className="text-center p-5 text-muted">
                                            <div className="spinner-border text-success mb-3" role="status"></div>
                                            <p>{t("dash_carregando_treinos")}</p>
                                        </div>
                                    ) : meusTreinos.length === 0 ? (
                                        <div className="text-center p-5 text-muted">
                                            <h5 className="fw-bold text-dark">{t("dash_sem_treino_titulo")}</h5>
                                            <p>{t("dash_sem_treino_desc")}</p>
                                            <Link to="/telaCriarTreino" className="btn btn-success mt-2 fw-bold" title="Alt+T">{t("dash_sem_treino_btn")}</Link>
                                        </div>
                                    ) : (
                                        <ul className="list-group list-group-flush fs-5">
                                            {treinoAtual.exercicios.map((itemExercicio) => (
                                                <li key={itemExercicio.id} className="list-group-item d-flex justify-content-between align-items-center py-3 px-4 border-bottom">
                                                    <div>
                                                        <div className="fw-bold text-dark">{t(toTranslationKey(itemExercicio.exercicio.nome))}</div>
                                                        <small className="text-muted d-none d-md-block">
                                                            {t(toTranslationKey(itemExercicio.exercicio.musculoPrincipal))}
                                                            {" | "}
                                                            {t(toTranslationKey(itemExercicio.exercicio.equipamento))}
                                                        </small>
                                                    </div>
                                                    <span className="badge bg-light text-success border border-success rounded-pill fs-6 px-3 py-2 shadow-sm">
                                                        {itemExercicio.series} x {itemExercicio.repeticoesAlvo}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                {meusTreinos.length > 0 && (

                                    <div className="card-footer bg-white border-top-0 p-4 d-grid">
                                        <button className="btn btn-success btn-lg fw-bold shadow-sm rounded-3" title="Alt+I"
                                            onClick={() => navigate("/telaIniciarTreino",
                                                {
                                                    state: {
                                                        treino: treinoAtual
                                                    }
                                                })}>
                                            {t("dash_iniciar_execucao", { ficha: t(toTranslationKey(treinoAtual.titulo)) })}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="col-lg-5">
                            <div className="d-flex flex-column gap-3">

                                <div className="card bg-white border-0 shadow-sm rounded-4 p-3 d-flex flex-row align-items-center">
                                    <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3 text-primary fs-3">
                                        ➕
                                    </div>
                                    <div>
                                        <h6 className="card-title text-secondary mb-1">{t("dash_card_cadastrar")}</h6>
                                        <button className="btn btn-sm btn-success btn-lg fw-bold rounded-3" title="Alt+T" onClick={() => navigate("/telaCriarTreino")} >{t("dash_btn_cadastrar")}</button>
                                    </div>
                                </div>

                                <div className="card bg-white border-0 shadow-sm rounded-4 p-3 d-flex flex-row align-items-center">
                                    <div className="bg-info bg-opacity-10 rounded-circle p-3 me-3 text-info fs-3">
                                        🏋️‍♂️
                                    </div>
                                    <div>

                                        <div>
                                            <h6 className="card-title text-secondary mb-1">{t("dash_card_solicitar")}</h6>
                                            <button className="btn btn-sm btn-success btn-lg fw-bold rounded-3" title="Alt+P" onClick={() => navigate("/areaPersonal")}>{t("dash_btn_solicitar")}</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className="p-4 bg-white">
                    {treinoAtual && (
                        <div className="card shadow-sm border-0 rounded-4 p-4 mt-4 bg-white">
                     <h6 className="fw-bold text-dark mb-3">📈 {t("dash_evolucao_titulo")}</h6>
                                
                                <div className="d-flex gap-2 overflow-auto pb-3 custom-scrollbar" style={{ whiteSpace: "nowrap" }}>
                                    {treinoAtual.exercicios.map(item => (
                                        <button 
                                            key={item.id}
                                            className={`btn btn-sm rounded-pill fw-bold border ${exercicioGraficoSelecionado?.id === item.exercicio.id ? 'btn-success text-white border-success' : 'btn-light text-secondary border-secondary'}`}
                                            onClick={() => setExercicioGraficoSelecionado(item.exercicio)}
                                        >
                                            {t(toTranslationKey(item.exercicio.nome)) || item.exercicio.nome}
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-3 bg-light rounded-4 p-3 border">
                                    {carregandoGrafico ? (
                                        <div className="text-center py-5">
                                            <span className="spinner-border text-success spinner-border-sm" role="status" aria-hidden="true"></span>
                                        </div>
                                    ) : dadosGrafico.length === 0 ? (
                                        <div className="text-center py-5 text-muted">
                                            <h3 className="opacity-25 mb-3">📉</h3>
                                            <p className="mb-0">{t("dash_sem_registos")}</p>
                                        </div>
                                    ) : (
                                        <div style={{ width: '100%', height: 250 }}>
                                            <ResponsiveContainer>
                                                <LineChart data={dadosGrafico} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                                                    <XAxis dataKey="dataFormatada" tick={{ fontSize: 12, fill: '#6c757d' }} tickLine={false} axisLine={false} dy={10} />
                                                    <YAxis tick={{ fontSize: 12, fill: '#6c757d' }} tickLine={false} axisLine={false} />
                                                    <Line 
                                                        type="monotone" 
                                                        dataKey="peso" 
                                                        stroke="#198754" 
                                                        strokeWidth={3} 
                                                        dot={{ r: 4, fill: "#198754", stroke: "#fff", strokeWidth: 2 }} 
                                                        activeDot={{ r: 6, fill: "#198754", stroke: "#fff", strokeWidth: 2 }}
                                                        animationDuration={1500}
                                                    />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </div>
                                    )}
                                </div>
                                </div>
                        )}
                                </div>
                </div>
            </Sidebar>
        </div>
    );
}