import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../imagens/logoAuraGain.png";
import { useTranslation } from 'react-i18next';
import useAtalhos from "../hooks/useAtalhos";

export default function Sidebar({ children }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [nome, setNome] = useState(t("visitante"));
    const [letraInicial, setLetraInicial] = useState("V");
    const [email, setEmail] = useState("");

    function handleLogout() {
        localStorage.clear();
        navigate("/");
    }

    useEffect(() => {
        const nomeSalvo = localStorage.getItem("userName");
        const emailSalvo = localStorage.getItem("userEmail");
        if (nomeSalvo && emailSalvo) {
            setNome(nomeSalvo.split(" ")[0]);
            setLetraInicial(nomeSalvo.charAt(0).toUpperCase());
        } else {
            navigate("/Login");
        }
    }, [navigate]);

    useAtalhos({
        "Alt+M": () => setIsSidebarOpen(prev => !prev), 
        "Alt+T": () => navigate("/telaCriarTreino"),     
        "Alt+P": () => navigate("/areaPersonal"),       
        "Alt+U": () => navigate("/perfil"),       
        "Alt+S": () => handleLogout()                    
    });

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


        <>
            <nav className="navbar navbar-light bg-white border-bottom shadow-sm px-3 pt-3 pb-3 sticky-top">
                <div className="d-flex align-items-center">
                    <button
                        className="btn btn-light border-secondary me-3 d-flex align-items-center justify-content-center"
                        onClick={() => setIsSidebarOpen(true) }
                        style={{ width: "40px", height: "40px" }}
                    >
                        <span className="navbar-toggler-icon" style={{ transform: "scale(0.8)" }}></span>
                    </button>
                    <h5 className="mb-0 fw-bold text-success">AuraGain</h5>
                </div>
                <div className="d-flex align-items-center">
                    <span className="me-3 fw-medium text-secondary d-none d-sm-inline">{t("dash_saudacao", { nome: nome })}</span>
                    <button className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm" 
                            onClick={() => navigate("/perfil")}
                            style={{ width: "40px", height: "40px" }}>
                            {letraInicial}
                    </button>
                </div>
            </nav>


            <div
                style={overlayStyle}
                onClick={() => setIsSidebarOpen(false)}
            />

            <div style={sidebarStyle} className="p-3 border-end">
                <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
                    <img src={logo} alt="AuraGain Logo" height="35" style={{ filter: 'brightness(0) invert(0)' }} />
                    <button className="btn-close" onClick={() => setIsSidebarOpen(false)} title="(Alt+M)"></button>
                </div>

                <ul className="nav flex-column mb-auto fs-5">
                    <li className="nav-item mb-2" title="Alt+D">
                        <Link to="/paginaInicial" className="nav-link text-success fw-bold bg-success bg-opacity-10 rounded">
                            {t("sidebar_dashboard")}
                        </Link>
                    </li>
                    <li className="nav-item mb-2" title="Alt+T">
                        <Link to="/telaCriarTreino" className="nav-link text-dark custom-hover">
                            {t("sidebar_criar")}
                        </Link>
                    </li>
                    <li className="nav-item mb-2" title="Alt+U">
                        <Link to="/perfil" className="nav-link text-dark custom-hover">
                            {t("sidebar_perfil")}
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="/telaEvolucao" className="nav-link text-dark custom-hover">
                            {t("sidebar_evolucao")}
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="/telaMedidas" className="nav-link text-dark custom-hover">
                            {t("sidebar_medidas")}
                        </Link>
                    </li>
                    <hr className="text-secondary" />
                    <li className="nav-item mb-2" title="Alt+P">
                        <Link to="/areaPersonal" className="nav-link text-dark custom-hover">
                            {t("sidebar_personal")}
                        </Link>
                    </li>
                </ul>

                <hr className="text-secondary" />
                <div className="d-grid">
                    <button className="btn btn-outline-danger fw-bold" onClick={handleLogout} title="Alt+S">
                        {t("sidebar_sair")}
                    </button>
                </div>
            </div>
            <div
                style={{
                    marginLeft: isSidebarOpen ? "260px" : "0",
                    transition: "0.3s"
                }}
            >
                {children}
            </div>

        </>
    );
}