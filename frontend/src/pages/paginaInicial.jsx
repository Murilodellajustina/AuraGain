import { useState, useEffect } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../imagens/logoAuraGain.png";
import Sidebar from "../components/sideBar";

export default function PaginaInicial() {
    const navigate = useNavigate();

    const [nome, setNome] = useState("Visitante");
    const [letraInicial, setLetraInicial] = useState("V");

    const [meusTreinos, setMeusTreinos] = useState([]);
    const [indiceTreinoAtivo, setIndiceTreinoAtivo] = useState(0);
    const [carregandoTreinos, setCarregandoTreinos] = useState(true);

    useEffect(() => {
        const nomeSalvo = localStorage.getItem("userName");
        const emailSalvo = localStorage.getItem("userEmail");
        if (nomeSalvo && emailSalvo) {
            setNome(nomeSalvo.split(" ")[0]);
            setLetraInicial(nomeSalvo.charAt(0).toUpperCase());
            buscarTreinosDoBanco(emailSalvo);
        } else {
            navigate("/Login");
        }
    }, [navigate]);

    async function buscarTreinosDoBanco(email) {
        try {
            const resposta = await fetch(`http://localhost:8080/api/treinos/usuario/${email}`);
            if (resposta.ok) {
                const dados = await resposta.json();

                dados.sort((a, b) => a.titulo.localeCompare(b.titulo));

                setMeusTreinos(dados);
            } else {
                console.error("Erro ao buscar treinos.");
            }
        } catch (erro) {
            console.error("Erro de conexão com o banco:", erro);
        } finally {
            setCarregandoTreinos(false);
        }
    }

    function handleLogout() {
        localStorage.clear();
        navigate("/");
    }


    const treinoAtual = meusTreinos.length > 0 ? meusTreinos[indiceTreinoAtivo] : null;

    return (

        <div className="container-fluid min-vh-100 bg-light text-dark p-0" style={{ overflowX: "hidden" }}>
            <Sidebar>
                <div className="container mt-4 mb-5">

                    <div className="row gx-4">

                        <div className="col-lg-7 mb-4">
                            <div className="card bg-white border-0 shadow-sm h-100 rounded-4 overflow-hidden">
                                <div className="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
                                    <h4 className="mb-0 text-success fw-bold">Treino de Hoje</h4>
                                    {meusTreinos.length > 0 && (
                                        <div className="btn-group shadow-sm">
                                            {meusTreinos.map((treino, index) => (
                                                <button
                                                    key={treino.id}
                                                    className={`btn btn-sm ${indiceTreinoAtivo === index ? 'btn-success fw-bold' : 'btn-outline-success'}`}
                                                    onClick={() => setIndiceTreinoAtivo(index)}
                                                >
                                                    {treino.titulo}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="card-body p-0">
                                    {carregandoTreinos ? (
                                        <div className="text-center p-5 text-muted">
                                            <div className="spinner-border text-success mb-3" role="status"></div>
                                            <p>Carregando sua rotina...</p>
                                        </div>
                                    ) : meusTreinos.length === 0 ? (
                                        <div className="text-center p-5 text-muted">
                                            <h5 className="fw-bold text-dark">Nenhum treino encontrado</h5>
                                            <p>Você ainda não possui nenhuma ficha. Vá até o menu "Criar Treinos" para começar!</p>
                                            <Link to="/telaCriarTreino" className="btn btn-success mt-2 fw-bold">Criar Meu Primeiro Treino</Link>
                                        </div>
                                    ) : (
                                        <ul className="list-group list-group-flush fs-5">
                                            {treinoAtual.exercicios.map((itemExercicio) => (
                                                <li key={itemExercicio.id} className="list-group-item d-flex justify-content-between align-items-center py-3 px-4 border-bottom">
                                                    <div>
                                                        <div className="fw-bold text-dark">{itemExercicio.exercicio.nome}</div>
                                                        <small className="text-muted d-none d-md-block">
                                                            {itemExercicio.exercicio.musculoPrincipal} | {itemExercicio.exercicio.equipamento}
                                                        </small>
                                                    </div>
                                                    <span className="badge bg-light text-success border border-success rounded-pill fs-6 px-3 py-2 shadow-sm">
                                                        {itemExercicio.series} x {itemExercicio.repeticoesAlvo}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                {meusTreinos.length > 0 && (

                                    <div className="card-footer bg-white border-top-0 p-4 d-grid">
                                        console.log(treinoAtual)
                                        <button className="btn btn-success btn-lg fw-bold shadow-sm rounded-3"
                                            onClick={() => navigate("/telaIniciarTreino",
                                                {
                                                    state: {
                                                        treino: treinoAtual
                                                    }
                                                })}>
                                            Iniciar Execução da {treinoAtual.titulo}
                                        </button>
                                    </div>
                                )}
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
            </Sidebar>
        </div>
    );
}