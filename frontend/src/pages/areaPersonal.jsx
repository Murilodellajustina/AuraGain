import { useState, useEffect } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../imagens/logoAuraGain.png";
import Sidebar from "../components/sideBar";
import { useTranslation } from 'react-i18next';
import useAtalhos from "../hooks/useAtalhos";

export default function AreaPersonal() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [userEmail, setUserEmail] = useState("");
    const [userPerfil, setUserPerfil] = useState("");

    const [personais, setPersonais] = useState([]);

    const [pendentes, setPendentes] = useState([]);
    const [meusAlunos, setMeusAlunos] = useState([]);
    const [abaAtiva, setAbaAtiva] = useState("PENDENTES");

    useEffect(() => {
        const emailSalvo = localStorage.getItem("userEmail");
        const perfilSalvo = localStorage.getItem("userPerfil");

        if (!emailSalvo) {
            navigate("/");
            return;
        }

        setUserEmail(emailSalvo);
        setUserPerfil(perfilSalvo);

        if (perfilSalvo === "PERSONAL") {
            buscarDashboardPersonal(emailSalvo);
        } else {
            buscarVitrinePersonais();
        }
    }, [navigate]);

    async function buscarVitrinePersonais() {
        try {
            const res = await fetch("http://localhost:8080/api/vinculos/personais");
            if (res.ok) setPersonais(await res.json());
        } catch (error) {
            console.error("Erro ao buscar personais", error);
        }
    }

    async function enviarSolicitacao(idPersonal) {
        try {
            const res = await fetch(`http://localhost:8080/api/vinculos/solicitar/${idPersonal}?emailAluno=${userEmail}`, { method: 'POST' });
            if (res.ok) {
                alert(t("alerta_solicitacao_enviada"));
            } else {
                const msg = await res.text();
                alert(msg);
            }
        } catch (error) {
            alert("Erro ao enviar solicitação.");
        }
    }

    async function buscarDashboardPersonal(email) {
        try {
            const resP = await fetch(`http://localhost:8080/api/vinculos/pendentes?emailPersonal=${email}`);
            if (resP.ok) setPendentes(await resP.json());

            const resA = await fetch(`http://localhost:8080/api/vinculos/meus-alunos?emailPersonal=${email}`);
            if (resA.ok) setMeusAlunos(await resA.json());
        } catch (error) {
            console.error("Erro ao buscar painel do personal", error);
        }
    }

    async function responderSolicitacao(idVinculo, aceitar) {
        try {
            const res = await fetch(`http://localhost:8080/api/vinculos/responder/${idVinculo}?aceitar=${aceitar}`, { method: 'PUT' });
            if (res.ok) {
                alert(aceitar ? "Aluno aceito!" : "Solicitação recusada.");
                buscarDashboardPersonal(userEmail);
            }
        } catch (error) {
            alert("Erro ao responder.");
        }
    }
    async function criarTreino(alunoEmail, alunoNome) {
        try {
            navigate("/telaCriarTreinoAluno", { state: { emailAluno: alunoEmail, nomeAluno: alunoNome } });

        } catch (error) {
            alert("Erro ao responder.");
        }

    }
    const fallbackImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"; // Imagem padrão caso o personal não tenha foto

    useAtalhos({
        "Alt+M": () => setIsSidebarOpen(prev => !prev),
        "Alt+D": () => navigate("/paginaInicial"),
        "Alt+1": () => setAbaAtiva("PENDENTES"),
        "Alt+2": () => setAbaAtiva("ALUNOS")     
    });

    return (
        <div className="container-fluid min-vh-100 bg-light text-dark p-0" style={{ overflowX: "hidden" }}>
            <Sidebar>

                <div className="container mt-4 mb-5">
                    {userPerfil !== "PERSONAL" && (
                        <div>
                            <h3 className="fw-bold text-success mb-4">{t("encontre_personal_ideal")}</h3>
                            <div className="row g-4">
                                {personais.length === 0 ? (
                                    <p className="text-muted">{t("area_nenhum_personal")}</p>
                                ) : (
                                    personais.map(personal => (
                                        <div className="col-md-6 col-lg-4" key={personal.id}>
                                            <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                                                <div className="text-center pt-4 pb-2 bg-light">
                                                    <img
                                                        src={personal.fotoPerfil || fallbackImage}
                                                        alt={personal.nome}
                                                        className="rounded-circle shadow-sm border border-3 border-white"
                                                        style={{ width: "120px", height: "120px", objectFit: "cover" }}
                                                    />
                                                </div>
                                                <div className="card-body text-center">
                                                    <h5 className="fw-bold text-dark mb-1">{personal.nome}</h5>
                                                    <span className="badge bg-success mb-3">CREF: {personal.cref}</span>
                                                    <p className="text-muted small mb-4">{personal.biografia || "Profissional dedicado ao seu resultado."}</p>
                                                    <button className="btn btn-outline-success w-100 fw-bold" onClick={() => enviarSolicitacao(personal.id)}>
                                                        {t("area_enviar_solicitacao")}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {userPerfil === "PERSONAL" && (
                        <div>
                            <h3 className="fw-bold text-success mb-4">{t("area_gestao_alunos")}</h3>

                            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                                <div className="card-header bg-white border-bottom p-0">
                                    <div className="d-flex">
                                        <button
                                            className= {`btn w-50 py-3 rounded-0 fw-bold border-0 ${abaAtiva === "PENDENTES" ? "btn-success" : "btn-light text-secondary"}`}
                                            title="Alt+1" onClick={() => setAbaAtiva("PENDENTES")}
                                        >
                                            {t("area_novas_solicitacoes")} <span className="badge bg-danger ms-2">{pendentes.length}</span>
                                        </button>
                                        <button
                                            className={`btn w-50 py-3 rounded-0 fw-bold border-0 ${abaAtiva === "ALUNOS" ? "btn-success" : "btn-light text-secondary"}`}
                                            title="Alt+2" onClick={() => setAbaAtiva("ALUNOS")}
                                        >
                                           {t("area_meus_alunos")} <span className="badge bg-success ms-2">{meusAlunos.length}</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="card-body p-0">
                                    <ul className="list-group list-group-flush">
                                        {abaAtiva === "PENDENTES" && pendentes.length === 0 && (
                                            <div className="text-center p-5 text-muted">{t("area_nenhuma_solicitacao")}</div>
                                        )}
                                        {abaAtiva === "PENDENTES" && pendentes.map(req => (
                                            <li key={req.idVinculo} className="list-group-item d-flex justify-content-between align-items-center p-4">
                                                <div>
                                                    <h6 className="mb-0 fw-bold">{req.nomeAluno}</h6>
                                                    <small className="text-muted">{req.emailAluno}</small>
                                                </div>
                                                <div className="d-flex gap-2">
                                                    <button className="btn btn-success btn-sm fw-bold" onClick={() => responderSolicitacao(req.idVinculo, true)}>{t("area_aceitar")}</button>
                                                    <button className="btn btn-outline-danger btn-sm" onClick={() => responderSolicitacao(req.idVinculo, false)}>{t("area_recusar")}</button>
                                                </div>
                                            </li>
                                        ))}

                                        {abaAtiva === "ALUNOS" && meusAlunos.length === 0 && (
                                            <div className="text-center p-5 text-muted">{t("area_nenhum_aluno")}</div>
                                        )}
                                        {abaAtiva === "ALUNOS" && meusAlunos.map(aluno => (
                                            <li key={aluno.idVinculo} className="list-group-item p-4">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <h6 className="mb-0 fw-bold">{aluno.nomeAluno}</h6>
                                                        <small className="text-muted">{aluno.emailAluno}</small>
                                                    </div>
                                                    <span className="badge bg-success bg-opacity-10 text-success border border-success rounded-pill px-3 py-2">
                                                        {t("area_aluno_ativo")}
                                                    </span>
                                                </div>
                                                <button className="btn btn-sm btn-outline-success mt-3 w-100 fw-bold" onClick={()=> criarTreino(aluno.emailAluno, aluno.nomeAluno)}>
                                                    {t("area_montar_treino")} {aluno.nomeAluno.split(" ")[0]}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Sidebar>
        </div>
    );
}