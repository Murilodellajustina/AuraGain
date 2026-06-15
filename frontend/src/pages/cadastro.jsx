import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../imagens/logoAuraGain.png"
import { useNavigate, Link } from "react-router-dom";

export default function Cadastrar() {
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
            setErro("Por favor, preencha todos os campos");
            return;
        }

        if(senha !== confirmarSenha) {
            setErro("As senhas não coincidem");
            return;
        }

        if (senha.length < 6) {
            setErro("A senha deve ter no mínimo 6 caracteres");
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
                setSucesso("Cadastro realizado com sucesso!");

            setTimeout(() => {
                navigate("/Login");
            }, 2000);
            } else {
                const data = await resposta.json();
                setErro(data.mensagem || "Erro ao cadastrar");
            }

        } catch (err) {
            setErro("Dados inseridos incorretamente");
            console.error(err);
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
                <h2 className="text-center mb-4">Crie sua conta</h2>

                {erro && <div className="alert alert-danger">{erro}</div>}
                {sucesso && <div className="alert alert-success">{sucesso}</div>}

                <form onSubmit={handleCadastrar}>
                    <div className="mb-3">
                        <label className="form-label">Nome</label>

                        <input
                            type="nome"
                            className="form-control"
                            placeholder="Digite seu nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            disabled={carregando || sucesso}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="nome@exemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={carregando || sucesso}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Senha</label>

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
                        <label className="form-label">Confirmar Senha</label>

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
                            {carregando ? "Cadastrando..." : "Cadastrar"}
                        </button>
                    </div>
                    <div className="text-center mt-3">
                    </div>

                    <div className="text-center mt-4">
                        <p>
                            Já tem uma conta? <Link to="/" className="text-success text-decoration-none fw-bold">Faça Login</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}