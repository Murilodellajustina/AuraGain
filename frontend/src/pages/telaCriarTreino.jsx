import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../imagens/logoAuraGain.png";
import Select from 'react-select';
import { listarExercicios } from "../Services/Api";

export default function CadastrarTreino() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);

    const [nome, setNome] = useState("Visitante");
    const [letraInicial, setLetraInicial] = useState("V");
    const [email, setEmail] = useState("");
    const [exercicios, setExercicios] = useState([]);
    const [carregando, setCarregando] = useState(false);

    const [linhasExercicios, setLinhasExercicios] = useState([{ id: Date.now(), exercicioId: null, series: '', repeticoes: ''}]);

    useEffect(() => {
        const nomeSalvo = localStorage.getItem("userName");
        const emailSalvo = localStorage.getItem("userEmail");
        if (nomeSalvo) {
            setNome(nomeSalvo.split(" ")[0]);
            setLetraInicial(nomeSalvo.charAt(0).toUpperCase());
            setEmail(emailSalvo);
        } else {
            navigate("/Login");
        }

        async function carregarExercicio() {
            try {
                const dados = await listarExercicios();
                console.log(dados);
                setExercicios(dados);
            } catch (erro) {
                console.error(erro)
            }
        }

        carregarExercicio();
    }, [navigate]);

    function handleLogout() {
        localStorage.clear();
        navigate("/");
    }

    const adicionarNovaLinha = () => {
        setLinhasExercicios([...linhasExercicios, { id: Date.now(), exercicioId: null, series: '', repeticoes: '' }]);
    }

    const handleLinhaChange = (idLinha, campo, valor) => {
        setLinhasExercicios(linhasAnteriores => 
            linhasAnteriores.map(linha => 
                linha.id === idLinha ? { ...linha, [campo]: valor } : linha
            )
        );
    };

    const removerLinha = (idLinha) => {
        if (linhasExercicios.length > 1) {
            setLinhasExercicios(linhasExercicios.filter(linha => linha.id !== idLinha));
        }
    };

    const handleCadastrarTreino = async () => {
        if (!opcaoSelecionada) {
            alert("Por favor, selecione o dia da ficha (ex: SEGUNDA).");
            return;
        }

        const exerciciosValidos = linhasExercicios.filter(linha => linha.exercicioId && linha.series && linha.repeticoes);
        if (exerciciosValidos.length === 0 || exerciciosValidos.length !== linhasExercicios.length) {
            alert("Por favor, preencha todos os campos (Exercício, Séries e Repetições) nas linhas criadas.");
            return;
        }

        setCarregando(true);

        const payload = {
            diaFicha: opcaoSelecionada.value,
            emailUsuario: email,
            exercicios: exerciciosValidos.map(linha => ({
                exercicioId: linha.exercicioId,
                series: parseInt(linha.series),
                repeticoes: parseInt(linha.repeticoes)
            }))
        };

        try {
            const resposta = await fetch("http://localhost:8080/api/treinos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            });

            if (resposta.ok) {
                alert("Treino cadastrado com sucesso!");
                setOpcaoSelecionada(null);
                setLinhasExercicios([{ id: Date.now(), exercicioId: null, series: '', repeticoes: '' }]);
            } else {
                const erroMsg = await resposta.text();
                alert("Erro ao salvar: " + erroMsg);
            }
        } catch (error) {
            alert("Erro de conexão com o servidor.");
            console.error(error);
        } finally {
            setCarregando(false);
        }
    };

    const opcoesExercicios = exercicios.map(exercicio => ({
        value: exercicio.id,
        label: exercicio.nome
    }));

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

    const opcoesDias = [
        { value: 'A', label: 'FICHA A' },
        { value: 'B', label: 'FICHA B' },
        { value: 'C', label: 'FICHA C' },
        { value: 'D', label: 'FICHA D' },
        { value: 'E', label: 'FICHA E' },
        { value: 'F', label: 'FICHA F' },

    ];

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
                        <Link to="/telaCriarTreino" className="nav-link text-dark custom-hover">
                            Criar treinos
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

                    <div className="col-lg-12 mb-4">
                        <div className="card bg-white border-0 shadow-sm h-100 rounded-4 overflow-hidden">
                            <div className="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
                                <h4 className="mb-0 text-success fw-bold">Crie seu treino</h4>
                            </div>
                            <div className="card-body p-0">
                                <ul className="list-group list-group-flush fs-5">
                                    <div className="col-lg-z d-flex " style={{ marginLeft: '20px' }}>
                                        <Select
                                            value={opcaoSelecionada}
                                            onChange={setOpcaoSelecionada}
                                            options={opcoesDias}
                                            isSearchable={true}
                                            placeholder="Selecione a ficha"
                                            noOptionsMessage={() => "Nenhum resultado encontrado"}
                                        />
                                    </div>


                                </ul>
                            </div>
                            <div className="card-body p-0 ">
                                <ul className="list-group list-group-flush fs-5">
                                    {linhasExercicios.map((linha, index) => (
                                        <div key={linha.id} className="d-flex align-items-center mt-3" style={{ marginTop: '20px', marginLeft: '20px' }}>
                                            <div className="flex-grow-1">
                                                <Select
                                                    options={opcoesExercicios}
                                                    placeholder="Selecione um exercício"
                                                    noOptionsMessage={() => "Nenhum resultado encontrado"}
                                                    value={opcoesExercicios.find(op => op.value === linha.exercicioId) || null}
                                                    onChange={(opcao) => handleLinhaChange(linha.id, 'exercicioId', opcao ? opcao.value : null)}
                                                />
                                            </div>
                                            <div className="ms-3">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Séries (ex: 3)"
                                                    min="1"
                                                    style={{ width: '130px' }}
                                                    value={linha.series}
                                                    onChange={(e) => handleLinhaChange(linha.id, 'series', e.target.value)}
                                                />
                                            </div>
                                            <div className="ms-3">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Reps (ex: 12)"
                                                    min="1"
                                                    style={{ width: '130px' }}
                                                    value={linha.repeticoes}
                                                    onChange={(e) => handleLinhaChange(linha.id, 'repeticoes', e.target.value)}
                                                />
                                            </div>

                                            {linhasExercicios.length > 1 && (
                                                <div className="ms-3">
                                                    <button className="btn btn-outline-danger" onClick={() => removerLinha(linha.id)}>
                                                        X
                                                    </button>
                                                </div>
                                            )}

                                        </div>
                                    ))}
                                </ul>
                                <button className="btn btn-outline-success fw-bold shadow-sm rounded-3 " style={{ marginTop: '20px', marginLeft: '20px' }} onClick={adicionarNovaLinha}>
                                    Adicionar exercicio
                                </button>
                            </div>
                            <div className="card-footer bg-white border-top-0 p-4 d-grid">
                                <button className="btn btn-success btn-lg fw-bold shadow-sm rounded-3" onClick={handleCadastrarTreino}
                                    disabled={carregando}>
                                    {carregando ? "Salvando..." : "Cadastrar Treino"}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}