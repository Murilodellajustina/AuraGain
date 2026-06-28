import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../imagens/logoAuraGain.png"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setErro("");

    if (!email || !senha) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }

    setCarregando(true);

    try {
      const response = await fetch("http://localhost:8080/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.nome);
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("userPerfil", data.perfil || "ALUNO");
        navigate("/paginaInicial");
      } else {
        const errorData = await response.json();
        setErro(errorData.message || "Email ou senha inválidos.");
      }
    } catch (err) {
      setErro("Erro de conexão com o servidor.");
      console.error(err);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center "
      style={{
        backgroundColor: '#11998e',
        backgroundImage: 'linear-gradient(to right, #095c56, #50daa7 ,  #1d7a41)',
        overflowX: 'hidden'
      }}
      >
      <div
        className="card shadow p-4 "
        style={{ width: "100%", maxWidth: "400px", opacity: 0.95, border: "none", borderRadius: "15px" }}
      >
        <img
          src={logo}
          alt="Logo"
          className="mx-auto d-block mb-4"
          style={{ width: "250px" }}
        />
        <h2 className="text-center mb-4">{t("login_titulo")}</h2>

        {erro && (
          <div className="alert alert-danger py-2 text-center fw-bold" role="alert">
            {erro}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">{t("login_email_label")}</label>

            <input
              type="email"
              className="form-control"
              placeholder={t("login_email_placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={carregando}
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
              disabled={carregando}
            />
          </div>

          <div className="d-grid">
            <button className="btn btn-success" type="submit" disabled={carregando}>
              {t("login_entrar_btn")}
            </button>
          </div>
          <div className="text-center mt-3">
            <p>
              {t("login_sem_conta")} <Link to="/cadastro" className="text-success text-decoration-none fw-bold">{t("login_cadastre_se")}</Link>
            </p>
            <small className="text-muted">
               {t("login_pergunta_personal")} <Link to="/cadastroPersonal" className="text-dark fw-bold text-decoration-underline">{t("login_entre_aqui")}</Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
}