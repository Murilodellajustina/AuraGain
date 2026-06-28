import { useState, useEffect } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../imagens/logoAuraGain.png";
import Sidebar from "../components/sideBar";
import { useTranslation } from 'react-i18next';

export default function PaginaInicial() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [nome, setNome] = useState("Visitante");
    const [letraInicial, setLetraInicial] = useState("V");

    const [meusTreinos, setMeusTreinos] = useState([]);
    const [indiceTreinoAtivo, setIndiceTreinoAtivo] = useState(0);
    const [carregandoTreinos, setCarregandoTreinos] = useState(true);

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
                console.error("Erro ao buscar treinos.");
            }
        } catch (erro) {
            console.error("Erro de conexão com o banco:", erro);
        } finally {
            setCarregandoTreinos(false);
        }
    }

    function handleLogout() {
        localStorage.clear();
        navigate("/");
    }


    const treinoAtual = meusTreinos.length > 0 ? meusTreinos[indiceTreinoAtivo] : null;

    function toTranslationKey(text) {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "_")
            .replace(/^_+|_+$/g, "");
    }

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
                                                    {treino.titulo}
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
                                            <Link to="/telaCriarTreino" className="btn btn-success mt-2 fw-bold">{t("dash_sem_treino_btn")}</Link>
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
                                        <button className="btn btn-success btn-lg fw-bold shadow-sm rounded-3"
                                            onClick={() => navigate("/telaIniciarTreino",
                                                {
                                                    state: {
                                                        treino: treinoAtual
                                                    }
                                                })}>
                                            {t("dash_iniciar_execucao", { ficha: treinoAtual.titulo })}
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
                                        <button className="btn btn-sm btn-success btn-lg fw-bold rounded-3" onClick={() => navigate("/telaCriarTreino")} >{t("dash_btn_cadastrar")}</button>
                                    </div>
                                </div>

                                <div className="card bg-white border-0 shadow-sm rounded-4 p-3 d-flex flex-row align-items-center">
                                    <div className="bg-info bg-opacity-10 rounded-circle p-3 me-3 text-info fs-3">
                                        🏋️‍♂️
                                    </div>
                                    <div>

                                        <div>
                                            <h6 className="card-title text-secondary mb-1">{t("dash_card_solicitar")}</h6>
                                            <button className="btn btn-sm btn-success btn-lg fw-bold rounded-3" onClick={() => navigate("/areaPersonal")}>{t("dash_btn_solicitar")}</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </Sidebar>
        </div>
    );
}