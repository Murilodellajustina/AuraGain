import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../imagens/logoAuraGain.png"
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function CadastroPersonal() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [cref, setCref] = useState("");
    const [biografia, setBiografia] = useState("");
    const [fotoPerfil, setFotoPerfil] = useState("");

    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function handleCadastro(e) {
        e.preventDefault();
        setErro("");
        setSucesso("");

        if (!nome || !email || !senha || !cref || !confirmarSenha) {
            setErro(t("cadastro_erro_preencher_campos"));
            return;
        }

        if(senha !== confirmarSenha) {
            setErro(t("cadastro_erro_senhas_nao_coincidem"));
            return;
        }

        if (senha.length < 6) {
            setErro(t("cadastro_erro_senha_curta"));
            return;
        }

        setCarregando(true);

        const payload = {
            nome,
            email,
            senha,
            perfil: "PERSONAL", 
            cref,
            biografia,
            fotoPerfil
        };

        try {
            const response = await fetch("http://localhost:8080/api/usuarios/cadastrar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert(t("cadastro_sucesso"));
                navigate("/");
            } else {
                const errorMsg = await response.text();
                setErro(t("cadastro_erro_servidor"));
            }
        } catch (err) {
            setErro(t("cadastro_erro_servidor"));
        } finally {
            setCarregando(false);
        }
    }

    return (
            <div className="container-fluid vh-100 d-flex justify-content-center align-items-center"
                style={{
                    backgroundColor: '#11998e',
                    backgroundImage: 'linear-gradient(to right, #021f1d, #0ab677 ,  #1d7a41)',
                    overflowX: 'hidden'
                }}>
                <div
                    className="card shadow p-4 "
                    style={{ width: "100%", maxWidth: "400px", opacity: 0.95, border: "none", borderRadius: "15px" }}
                >
                    <img
                        src={logo}
                        alt="Logo"
                        className="mx-auto d-block mb-4"
                        style={{ width: "300px" }}
                    />
                    <h2 className="text-center mb-4">{t("cadastro_titulo")}</h2>
    
                    {erro && <div className="alert alert-danger">{erro}</div>}
                    {sucesso && <div className="alert alert-success">{sucesso}</div>}
    
                    <form onSubmit={handleCadastro}>
                        <div className="mb-3">
                            <label className="form-label">{t("cadastro_label_nome")}</label>
    
                            <input
                                type="nome"
                                className="form-control"
                                placeholder={t("cadastro_placeholder_nome")}
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                disabled={carregando || sucesso}
                            />
                        </div>
    
                        <div className="mb-3">
                            <label className="form-label">{t("login_email_label")}</label>
    
                            <input
                                type="email"
                                className="form-control"
                                placeholder={t("login_email_placeholder")}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={carregando || sucesso}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">{t("cadastro_personal_cref")}</label>

                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="123456-G/SC" 
                                value={cref} 
                                onChange={(e) => setCref(e.target.value)} required 
                                disabled={carregando || sucesso}
                             />
                        </div>

                        <div className="mb-3">
                        <label className="form-label">{t("cadastro_personal_foto")}</label>
                        <input 
                            type="url" 
                            className="form-control" 
                            placeholder="https://..." 
                            value={fotoPerfil} 
                            onChange={(e) => setFotoPerfil(e.target.value)} 
                            disabled={carregando || sucesso}
                            />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">{t("cadastro_personal_bio")}</label>
                        <textarea 
                            className="form-control" rows="3" 
                            placeholder={t("cadastro_personal_bio_placeholder")}
                            value={biografia} 
                            onChange={(e) => setBiografia(e.target.value)}
                            disabled={carregando || sucesso}
                            >
                        </textarea>
                    </div>
    
                        <div className="mb-3">
                            <label className="form-label">{t("login_senha_label")}</label>
    
                            <input
                                type="password"
                                className="form-control"
                                placeholder="********"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                disabled={carregando || sucesso}
                            />
                        </div>
    
                        <div className="mb-3">
                            <label className="form-label">{t("cadastro_label_confirmar_senha")}</label>
    
                            <input
                                type="password"
                                className="form-control"
                                placeholder="********"
                                value={confirmarSenha}
                                onChange={(e) => setConfirmarSenha(e.target.value)}
                                disabled={carregando || sucesso}
                            />
                        </div>
    
                        <div className="d-grid">
                            <button className="btn btn-success" type="submit" disabled={carregando || sucesso}>
                                {carregando ? "Cadastrando..." : t("dash_btn_cadastrar")}
                            </button>
                        </div>
                        <div className="text-center mt-3">
                        </div>
    
                         <div className="text-center mt-4">
                            <p className="mb-0">{t("cadastro_ja_tem_conta")} <Link to="/" className="text-success fw-bold text-decoration-none">{t("cadastro_faca_login")}</Link></p>
                            <p className="mt-1"><Link to="/cadastro" className="text-muted text-decoration-underline">{t("cadastro_voltar_aluno")}</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        );
}