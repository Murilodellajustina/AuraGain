import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../imagens/logoAuraGain.png";

export default function AreaPersonal() {
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
                alert("Solicitação enviada com sucesso! Aguarde a aprovação.");
            } else {
                const msg = await res.text();
                alert("Aviso: " + msg);
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

    const sidebarStyle = { width: "260px", position: "fixed", top: 0, left: isSidebarOpen ? "0" : "-260px", height: "100vh", zIndex: 1050, transition: "left 0.3s ease-in-out", backgroundColor: "#ffffff", boxShadow: "2px 0 10px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column" };
    const overlayStyle = { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1040, display: isSidebarOpen ? "block" : "none" };
    const fallbackImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"; // Imagem padrão caso o personal não tenha foto

    return (
        <div className="container-fluid min-vh-100 bg-light text-dark p-0">
            <div style={overlayStyle} onClick={() => setIsSidebarOpen(false)}></div>

            <div style={sidebarStyle} className="p-3 border-end">
                <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
                    <img src={logo} alt="AuraGain" height="35" />
                    <button className="btn-close" onClick={() => setIsSidebarOpen(false)}></button>
                </div>
                <ul className="nav flex-column mb-auto fs-5">
                    <li className="nav-item mb-2"><Link to="/paginaInicial" className="nav-link text-dark">🏠 Dashboard</Link></li>
                    <li className="nav-item mb-2"><Link to="/telaCriarTreino" className="nav-link text-dark">🏋️ Criar treinos</Link></li>
                    <li className="nav-item mb-2"><Link to="/area-personal" className="nav-link text-success fw-bold bg-success bg-opacity-10 rounded">🎓 Área do Personal</Link></li>
                </ul>
            </div>

            <nav className="navbar navbar-light bg-white border-bottom shadow-sm px-3 sticky-top">
                <div className="d-flex align-items-center">
                    <button className="btn btn-light me-3" onClick={() => setIsSidebarOpen(true)}>☰</button>
                    <h5 className="mb-0 fw-bold text-success">AuraGain</h5>
                </div>
            </nav>

            <div className="container mt-4 mb-5">
                {userPerfil !== "PERSONAL" && (
                    <div>
                        <h3 className="fw-bold text-success mb-4">Encontre o Personal Ideal</h3>
                        <div className="row g-4">
                            {personais.length === 0 ? (
                                <p className="text-muted">Nenhum personal cadastrado na plataforma ainda.</p>
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
                                                    Enviar Solicitação
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
                        <h3 className="fw-bold text-success mb-4">Gestão de Alunos</h3>
                        
                        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                            <div className="card-header bg-white border-bottom p-0">
                                <div className="d-flex">
                                    <button 
                                        className={`btn w-50 py-3 rounded-0 fw-bold border-0 ${abaAtiva === "PENDENTES" ? "btn-success" : "btn-light text-secondary"}`}
                                        onClick={() => setAbaAtiva("PENDENTES")}
                                    >
                                        Novas Solicitações <span className="badge bg-danger ms-2">{pendentes.length}</span>
                                    </button>
                                    <button 
                                        className={`btn w-50 py-3 rounded-0 fw-bold border-0 ${abaAtiva === "ALUNOS" ? "btn-success" : "btn-light text-secondary"}`}
                                        onClick={() => setAbaAtiva("ALUNOS")}
                                    >
                                        Meus Alunos <span className="badge bg-success ms-2">{meusAlunos.length}</span>
                                    </button>
                                </div>
                            </div>
                            
                            <div className="card-body p-0">
                                <ul className="list-group list-group-flush">
                                    {abaAtiva === "PENDENTES" && pendentes.length === 0 && (
                                        <div className="text-center p-5 text-muted">Nenhuma solicitação nova.</div>
                                    )}
                                    {abaAtiva === "PENDENTES" && pendentes.map(req => (
                                        <li key={req.idVinculo} className="list-group-item d-flex justify-content-between align-items-center p-4">
                                            <div>
                                                <h6 className="mb-0 fw-bold">{req.nomeAluno}</h6>
                                                <small className="text-muted">{req.emailAluno}</small>
                                            </div>
                                            <div className="d-flex gap-2">
                                                <button className="btn btn-success btn-sm fw-bold" onClick={() => responderSolicitacao(req.idVinculo, true)}>Aceitar</button>
                                                <button className="btn btn-outline-danger btn-sm" onClick={() => responderSolicitacao(req.idVinculo, false)}>Recusar</button>
                                            </div>
                                        </li>
                                    ))}

                                    {abaAtiva === "ALUNOS" && meusAlunos.length === 0 && (
                                        <div className="text-center p-5 text-muted">Você ainda não gerencia nenhum aluno.</div>
                                    )}
                                    {abaAtiva === "ALUNOS" && meusAlunos.map(aluno => (
                                        <li key={aluno.idVinculo} className="list-group-item p-4">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h6 className="mb-0 fw-bold">{aluno.nomeAluno}</h6>
                                                    <small className="text-muted">{aluno.emailAluno}</small>
                                                </div>
                                                <span className="badge bg-success bg-opacity-10 text-success border border-success rounded-pill px-3 py-2">
                                                    Aluno Ativo
                                                </span>
                                            </div>
                                            <button className="btn btn-sm btn-outline-success mt-3 w-100 fw-bold">
                                                Montar Treino para {aluno.nomeAluno.split(" ")[0]}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}