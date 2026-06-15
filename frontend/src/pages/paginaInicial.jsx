import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../imagens/logoAuraGain.png";

export default function PaginaInicial() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [nome, setNome] = useState("Visitante");
    const [letraInicial, setLetraInicial] = useState("V");

    useEffect(() => {
        const nomeSalvo = localStorage.getItem("userName");
        if (nomeSalvo) {
            setNome(nomeSalvo.split(" ")[0]);
            setLetraInicial(nomeSalvo.charAt(0).toUpperCase());
        } else {
            navigate("/Login");
        }
    }, [navigate]);

    function handleLogout() {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userName");
        navigate("/");
    }

    const sidebarStyle = {
        width: "260px",
        position: "fixed",
        top: 0,
        left: isSidebarOpen ? "0" : "-260px",
        height: "100vh",
        zIndex: 1050,
        transition: "left 0.3s ease-in-out",
        backgroundColor: "#ffffff",
        boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column"
    };

    const overlayStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 1040,
        display: isSidebarOpen ? "block" : "none"
    };

    return (
        <div className="container-fluid min-vh-100 bg-light text-dark p-0" style={{ overflowX: "hidden" }}>
            
            <div style={overlayStyle} onClick={() => setIsSidebarOpen(false)}></div>

            <div style={sidebarStyle} className="p-3 border-end">
                <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
                    <img src={logo} alt="AuraGain Logo" height="35" style={{ filter: 'brightness(0) invert(0)' }} />
                    <button className="btn-close" onClick={() => setIsSidebarOpen(false)}></button>
                </div>
                
                <ul className="nav flex-column mb-auto fs-5">
                    <li className="nav-item mb-2">
                        <Link to="/paginaInicial" className="nav-link text-success fw-bold bg-success bg-opacity-10 rounded">
                            Dashboard
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="#" className="nav-link text-dark custom-hover">
                            Treinos
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="#" className="nav-link text-dark custom-hover">
                            Medidas
                        </Link>
                    </li>
                    <hr className="text-secondary" />
                    <li className="nav-item mb-2">
                        <Link to="#" className="nav-link text-dark custom-hover">
                            Área do Personal
                        </Link>
                    </li>
                </ul>

                <hr className="text-secondary" />
                <div className="d-grid">
                    <button className="btn btn-outline-danger fw-bold" onClick={handleLogout}>
                        Sair
                    </button>
                </div>
            </div>

            <nav className="navbar navbar-light bg-white border-bottom shadow-sm px-3 sticky-top">
                <div className="d-flex align-items-center">
                    <button 
                        className="btn btn-light border-secondary me-3 d-flex align-items-center justify-content-center" 
                        onClick={() => setIsSidebarOpen(true)}
                        style={{ width: "40px", height: "40px" }}
                    >
                        <span className="navbar-toggler-icon" style={{ transform: "scale(0.8)" }}></span>
                    </button>
                    <h5 className="mb-0 fw-bold text-success">AuraGain</h5>
                </div>
                <div className="d-flex align-items-center">
                    <span className="me-3 fw-medium text-secondary d-none d-sm-inline">Olá, {nome}! </span>
                    <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm" style={{ width: "40px", height: "40px" }}>
                        {letraInicial}
                    </div>
                </div>
            </nav>

            <div className="container mt-4 mb-5">
                
                <div className="row gx-4">
                    
                    <div className="col-lg-7 mb-4">
                        <div className="card bg-white border-0 shadow-sm h-100 rounded-4 overflow-hidden">
                            <div className="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
                                <h4 className="mb-0 text-success fw-bold">Treino de Hoje</h4>
                                <span className="badge bg-success bg-opacity-10 text-success fs-6 border border-success">
                                    Treino A - Push
                                </span>
                            </div>
                            <div className="card-body p-0">
                                <ul className="list-group list-group-flush fs-5">
                                    <li className="list-group-item d-flex justify-content-between align-items-center py-3 px-4 border-bottom">
                                        <div className="fw-medium text-dark">Supino Reto com Halteres</div>
                                        <span className="badge bg-light text-dark border rounded-pill fs-6 px-3 py-2">4 x 10</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center py-3 px-4 border-bottom">
                                        <div className="fw-medium text-dark">Desenvolvimento Sentado com Halteres</div>
                                        <span className="badge bg-light text-dark border rounded-pill fs-6 px-3 py-2">3 x 12</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center py-3 px-4 border-bottom">
                                        <div className="fw-medium text-dark">Crucifixo Máquina</div>
                                        <span className="badge bg-light text-dark border rounded-pill fs-6 px-3 py-2">3 x 12</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center py-3 px-4">
                                        <div className="fw-medium text-dark">Paralelas (Tríceps)</div>
                                        <span className="badge bg-light text-dark border rounded-pill fs-6 px-3 py-2">4 x Falha</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="card-footer bg-white border-top-0 p-4 d-grid">
                                <button className="btn btn-success btn-lg fw-bold shadow-sm rounded-3">
                                    Iniciar Treino
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-5">
                        <div className="d-flex flex-column gap-3">
                            
                            <div className="card bg-white border-0 shadow-sm rounded-4 p-3 d-flex flex-row align-items-center">
                                <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3 text-primary fs-3">
                                    📅
                                </div>
                                <div>
                                    <h6 className="card-title text-secondary mb-1">Treinos na Semana</h6>
                                    <p className="card-text fs-3 fw-bold text-dark mb-0">4 <span className="fs-5 text-muted fw-normal">/ 6</span></p>
                                </div>
                            </div>

                            <div className="card bg-white border-0 shadow-sm rounded-4 p-3 d-flex flex-row align-items-center">
                                <div className="bg-info bg-opacity-10 rounded-circle p-3 me-3 text-info fs-3">
                                    ⚖️
                                </div>
                                <div>
                                    <h6 className="card-title text-secondary mb-1">Peso Atual</h6>
                                    <p className="card-text fs-3 fw-bold text-dark mb-0">106.9 kg</p>
                                </div>
                            </div>

                            <div className="card bg-white border-0 shadow-sm rounded-4 p-3 d-flex flex-row align-items-center">
                                <div className="bg-warning bg-opacity-10 rounded-circle p-3 me-3 text-warning fs-3">
                                    ⚡
                                </div>
                                <div>
                                    <h6 className="card-title text-secondary mb-1">Próximo Foco</h6>
                                    <p className="card-text fs-4 fw-bold text-dark mb-0">Treino B - Pull</p>
                                </div>
                            </div>

                            <div className="card text-black border-0 shadow-sm rounded-4 mt-2">
                                <div className="card-body p-4">
                                    <h5 className="fw-bold mb-2">Desempenho em Alta! 🔥</h5>
                                    <p className="mb-0 text-black-50">Você aumentou sua carga no supino em 5kg este mês. Continue assim!</p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}