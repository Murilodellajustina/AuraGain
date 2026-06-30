import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from 'react-i18next';
import useAtalhos from "../hooks/useAtalhos";

import logo from "../imagens/logoAuraGain.png";
import heroImg from "../assets/hero.png"; 

export default function TelaLandingPage() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    useAtalhos({
        "Alt+C": () => navigate("/cadastro"),
        "Alt+P": () => navigate("/cadastroPersonal"),
        "Alt+L": () => navigate("/login")
    });

    return (
        <div className="min-vh-100 bg-white" style={{ overflowX: "hidden" }}>
            
            <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm fixed-top">
                <div className="container">
                    <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold text-success" to="/">
                        <img src={logo} alt="AuraGain Logo" height="60" /> 
                        AuraGain
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav align-items-center gap-3">
                            <li className="nav-item">
                                <a className="nav-link text-dark fw-bold custom-hover" href="#funcionalidades">{t("lp_nav_funcionalidades")}</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark fw-bold custom-hover" href="#personal">{t("lp_nav_personal")}</a>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="btn btn-outline-success fw-bold px-4 rounded-pill" title="(Alt+L)">
                                    {t("lp_nav_entrar")}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/cadastro" className="btn btn-success fw-bold px-4 rounded-pill shadow-sm" title="(Alt+C)">
                                    {t("lp_nav_cadastrar")}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <header className="pt-5 mt-5 bg-light" style={{ backgroundImage: 'linear-gradient(to right, #fdfffe, #d6ffe0, #fdfffe)' }}>
                <div className="container py-5">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2 mb-3 fw-bold border border-success">
                                {t("lp_hero_badge")}
                            </span>
                            <h1 className="display-4 fw-bold text-dark mb-4">
                                {t("lp_hero_titulo_1")}
                                <span className="text-success">AuraGain.</span>
                            </h1>
                            <p className="lead text-muted mb-4">
                                {t("lp_hero_subtitulo")}
                            </p>
                            <div className="d-flex gap-3">
                                <Link to="/cadastro" className="btn btn-success btn-lg fw-bold px-4 rounded-pill shadow">
                                    {t("lp_hero_cta")}
                                </Link>
                                <a href="#funcionalidades" className="btn btn-outline-secondary btn-lg fw-bold px-4 rounded-pill">
                                    {t("lp_hero_saber_mais")}
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-6 text-center">
                            <img src={heroImg} alt="App Dashboard" className="img-fluid drop-shadow" style={{ maxHeight: "500px", objectFit: "contain" }} />
                        </div>
                    </div>
                </div>
            </header>

            <section id="funcionalidades" className="py-5 my-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 pe-md-5 mb-4 mb-md-0">
                            <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center mb-3 shadow-sm" style={{ width: "60px", height: "60px", fontSize: "24px" }}>
                                🏋️‍♂️
                            </div>
                            <h2 className="fw-bold text-dark mb-3">{t("lp_f1_titulo")}</h2>
                            <p className="text-muted fs-5 mb-4">
                                {t("lp_f1_desc")}
                            </p>
                            <ul className="list-unstyled text-muted">
                                <li className="mb-2">✅ {t("lp_f1_item1")}</li>
                                <li className="mb-2">✅ {t("lp_f1_item2")}</li>
                                <li className="mb-2">✅ {t("lp_f1_item3")}</li>
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <div className="bg-light rounded-4 shadow-lg p-5 text-center border">
                                <h1 className="display-1 opacity-50">📱</h1>
                                <h4 className="fw-bold mt-3 text-secondary">{t("lp_imagem_placeholder")}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5 bg-light border-top border-bottom">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 order-2 order-md-1 mt-4 mt-md-0">
                            <div className="bg-white rounded-4 shadow-lg p-5 text-center border">
                                <h1 className="display-1 opacity-50">🧍‍♂️</h1>
                                <h4 className="fw-bold mt-3 text-secondary">{t("lp_imagem_placeholder2")}</h4>
                            </div>
                        </div>
                        <div className="col-md-6 ps-md-5 order-1 order-md-2">
                            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mb-3 shadow-sm" style={{ width: "60px", height: "60px", fontSize: "24px" }}>
                                📏
                            </div>
                            <h2 className="fw-bold text-dark mb-3">{t("lp_f2_titulo")}</h2>
                            <p className="text-muted fs-5 mb-4">
                                {t("lp_f2_desc")}
                            </p>
                            <Link to="/cadastro" className="text-success fw-bold text-decoration-none">
                                {t("lp_f2_link")}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section id="personal" className="py-5 my-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 pe-md-5 mb-4 mb-md-0">
                            <div className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center mb-3 shadow-sm" style={{ width: "60px", height: "60px", fontSize: "24px" }}>
                                🤝
                            </div>
                            <h2 className="fw-bold text-dark mb-3">{t("lp_f3_titulo")}</h2>
                            <p className="text-muted fs-5 mb-4">
                                {t("lp_f3_desc")}
                            </p>
                            <ul className="list-unstyled text-muted">
                                <li className="mb-2">⭐ {t("lp_f3_item1")}</li>
                                <li className="mb-2">⭐ {t("lp_f3_item2")}</li>
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <div className="bg-light rounded-4 shadow-lg p-5 text-center border">
                                <h1 className="display-1 opacity-50">💻</h1>
                                <h4 className="fw-bold mt-3 text-secondary">{t("lp_imagem_placeholder3")}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-dark text-white py-4 mt-5">
                <div className="container text-center">
                    <h5 className="fw-bold text-success mb-3">AuraGain</h5>
                    <p className="text-white-50 small mb-0">
                        © 2026 AuraGain Project. Desenvolvido para a disciplina de LDS.
                    </p>
                </div>
            </footer>

        </div>
    );
}