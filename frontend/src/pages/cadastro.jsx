import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../imagens/logoAuraGain.png"
import { useNavigate } from "react-router-dom";

export default function Cadastrar() {
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [cpf, setCpf] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    async function handleCadastrar(e) {
        e.preventDefault();
        setErro("");

        try {
            const res = await Cadastrar(nome, sobrenome, cpf, dataNascimento, email, senha);

            navigate("/Login");

        } catch (err) {
            setErro("Dados inseridos incorretamente");
            if (senha.length < 6) setErro("A senha deve ter 6 digitos!!");
            console.error(err);
        }
    }

    return (
        <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-dark"
            style={{
                backgroundColor: '#11998e',
                backgroundImage: 'linear-gradient(to right, #021f1d, #0ab677 ,  #1d7a41)',
                overflowX: 'hidden'
            }}>
            <div
                className="card shadow p-4 bg-dark text-white"
                style={{ width: "100%", maxWidth: "400px" }}
            >
                <img
                    src={logo}
                    alt="Logo"
                    className="mx-auto d-block mb-4"
                    style={{ width: "300px" }}
                />
                <h2 className="text-center mb-4">Crie sua conta</h2>


                <form>
                    <div className="mb-3">
                        <label className="form-label">Nome</label>

                        <input
                            type="nome"
                            className="form-control bg-secondary text-white"
                            placeholder="..."
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Sobrenome</label>

                        <input
                            type="sobrenome"
                            className="form-control bg-secondary text-white"
                            placeholder="..."
                            value={sobrenome}
                            onChange={(e) => setSobrenome(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">CPF</label>

                        <input
                            type="cpf"
                            className="form-control bg-secondary text-white"
                            placeholder="***.***.***-**"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Data de Nascimento</label>

                        <input
                            type="date"
                            className="form-control bg-secondary text-white"
                            placeholder="01/01/2000"
                            value={dataNascimento}
                            onChange={(e) => setDataNascimento(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>

                        <input
                            type="email"
                            className="form-control bg-secondary text-white"
                            placeholder="nome@exemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Senha</label>

                        <input
                            type="password"
                            className="form-control bg-secondary text-white"
                            placeholder="********"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>

                    <div className="d-grid">
                        <button className="btn btn-primary" type="button">
                            Entrar
                        </button>
                    </div>
                    <div className="text-center mt-3">
                    </div>
                </form>
            </div>
        </div>
    );
}