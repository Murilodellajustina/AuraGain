import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../imagens/logoAuraGain.png"
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import useAtalhos from "../hooks/useAtalhos";

export default function Cadastrar() {
    const { t } = useTranslation();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [carregando, setCarregando] = useState("");
    const navigate = useNavigate();

    async function handleCadastrar(e) {
        e.preventDefault();
        setErro("");
        setSucesso("");

        if (!nome || !email || !senha || !confirmarSenha) {
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

        try {
            const res = await fetch("http://localhost:8080/api/usuarios/cadastrar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, email, senha }),
            });

            if (resposta.ok) {
                setSucesso(t("cadastro_sucesso"));

            setTimeout(() => {
                navigate("/Login");
            }, 2000);
            } else {
                const data = await resposta.json();
                setErro(data.mensagem || t("cadastro_erro_servidor"));
            }

        } catch (err) {
            setErro(t("cadastro_erro_dados_incorretos"));
            console.error(err);
        } finally {
            setCarregando(false);
        }
    }

    useAtalhos({
        "Alt+L": () => navigate("/")
    });

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

                <form onSubmit={handleCadastrar}>
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
                        <p>
                            {t("cadastro_ja_tem_conta")} <Link to="/" className="text-success text-decoration-none fw-bold" title="Alt+L">{t("cadastro_faca_login")}</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}