import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import useAtalhos from "../hooks/useAtalhos";
import Sidebar from "../components/sideBar";

export default function Perfil() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [abaAtiva, setAbaAtiva] = useState("TREINOS"); // TREINOS ou SOBRE

    const [usuarioId, setUsuarioId] = useState(null);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [perfil, setPerfil] = useState("ALUNO");
    const [cref, setCref] = useState("");
    const [biografia, setBiografia] = useState("");
    const [fotoPerfil, setFotoPerfil] = useState("");
    
    const [meusTreinos, setMeusTreinos] = useState([]);
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
        const emailSalvo = localStorage.getItem("userEmail");
        if (!emailSalvo) {
            navigate("/");
            return;
        }

        async function carregarDados() {
            try {
                const resPerfil = await fetch(`http://localhost:8080/api/usuarios/${emailSalvo}`);
                if (resPerfil.ok) {
                    const dados = await resPerfil.json();
                    setUsuarioId(dados.id);
                    setNome(dados.nome);
                    setEmail(dados.email);
                    setPerfil(dados.perfil);
                    setCref(dados.cref || "");
                    setBiografia(dados.biografia || "");
                    setFotoPerfil(dados.fotoPerfil || "");
                }

                const resTreinos = await fetch(`http://localhost:8080/api/treinos/usuario/${emailSalvo}`);
                if (resTreinos.ok) {
                    const treinos = await resTreinos.json();
                    treinos.sort((a, b) => a.titulo.localeCompare(b.titulo));
                    setMeusTreinos(treinos);
                }
            } catch (error) {
                console.error("Erro ao carregar dados do perfil.");
            }
        }
        carregarDados();
    }, [navigate]);

    useAtalhos({
        "Alt+M": () => setIsSidebarOpen(prev => !prev),
        "Alt+D": () => navigate("/paginaInicial"),
        "Alt+N": () => setIsEditingProfile(false),
        "Alt+E": () => setIsEditingProfile(true)    
    });

    async function handleSalvarPerfil(e) {
        e.preventDefault();
        setCarregando(true);

        const payload = {
            nome, email, senha, perfil,
            cref: perfil === "PERSONAL" ? cref : null,
            biografia: perfil === "PERSONAL" ? biografia : null,
            fotoPerfil: perfil === "PERSONAL" ? fotoPerfil : null
        };

        try {
            const response = await fetch(`http://localhost:8080/api/usuarios/${usuarioId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert("Perfil atualizado com sucesso!");
                localStorage.setItem("userName", nome);
                setIsEditingProfile(false); 
            }
        } catch (err) {
            alert("Erro de conexão.");
        } finally {
            setCarregando(false);
        }
    }

    async function handleDeleteConta() {
        if (window.confirm("ATENÇÃO: Ação irreversível. Excluir conta?")) {
            try {
                const res = await fetch(`http://localhost:8080/api/usuarios/${usuarioId}`, { method: "DELETE" });
                if (res.ok) {
                    localStorage.clear();
                    navigate("/");
                }
            } catch (error) {
                alert("Erro ao excluir conta.");
            }
        }
    }

    async function handleDeleteTreino(idTreino) {
        if (window.confirm("Tens a certeza que queres eliminar esta ficha de treino?")) {
            try {
                const res = await fetch(`http://localhost:8080/api/treinos/${idTreino}`, { method: 'DELETE' });
                if (res.ok) {
                    alert("Treino eliminado!");
                    setMeusTreinos(meusTreinos.filter(t => t.id !== idTreino));
                }
            } catch (error) {
                console.error("Erro ao deletar treino");
            }
        }
    }

    const coverStyle = { height: "200px", backgroundColor: "#11998e", backgroundImage: "linear-gradient(to right, #095c56, #11998e)" };
    const avatarFallback = nome.charAt(0).toUpperCase();
    const sidebarStyle = { width: "260px", position: "fixed", top: 0, left: isSidebarOpen ? "0" : "-260px", height: "100vh", zIndex: 1050, transition: "left 0.3s ease-in-out", backgroundColor: "#ffffff", boxShadow: "2px 0 10px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column" };
    const overlayStyle = { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1040, display: isSidebarOpen ? "block" : "none" };

    return (
        <div className="container-fluid min-vh-100 bg-light text-dark p-0" style={{
            backgroundColor: '#11998e',
            backgroundImage: 'linear-gradient(to right, #fdfffe, #d6ffe0, #fdfffe)',
            overflowX: 'hidden'
        }}>
        
            <Sidebar>

                <div className="container p-0 pb-5" style={{ maxWidth: "700px", backgroundColor: "white", minHeight: "100vh", borderLeft: "1px solid #e1e8ed", borderRight: "1px solid #e1e8ed" }}>
                    
                    {!isEditingProfile ? (
                        <>
                            <div style={coverStyle}></div>
                            <div className="px-4 position-relative">
                                <div className="d-flex justify-content-between align-items-end" style={{ marginTop: "-65px" }}>
                                    {fotoPerfil ? (
                                        <img src={fotoPerfil} alt="Avatar" className="rounded-circle" style={{ width: "130px", height: "130px", objectFit: "cover", border: "4px solid white", backgroundColor: "white" }} />
                                    ) : (
                                        <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold bg-secondary" style={{ width: "130px", height: "130px", fontSize: "50px", border: "4px solid white" }}>
                                            {avatarFallback}
                                        </div>
                                    )}
                                    <button className="btn btn-outline-dark rounded-pill fw-bold px-4 mb-2" onClick={() => setIsEditingProfile(true)}>
                                        Editar Perfil
                                    </button>
                                </div>

                                <div className="mt-3">
                                    <h3 className="fw-bold mb-0 text-dark">{nome}</h3>
                                    <p className="text-muted mb-2">{email}</p>
                                    
                                    {perfil === "PERSONAL" && (
                                        <p className=" rounded-pill mb-2">CREF: {cref}</p>
                                    )}
                                    {perfil === "PERSONAL" && (
                                        <p className="fs-6 mt-2">{biografia || "Nenhuma biografia informada."}</p>
                                    )}
                                    
                                </div>
                            </div>

                            <div className="d-flex border-bottom mt-3">
                                <div 
                                    className={`flex-grow-1 text-center py-3 fw-bold ${abaAtiva === "TREINOS" ? "text-dark border-bottom border-success border-3" : "text-muted"}`} 
                                    style={{ cursor: "pointer" }} 
                                    onClick={() => setAbaAtiva("TREINOS")}
                                >
                                    Meus Treinos
                                </div>
                                <div 
                                    className={`flex-grow-1 text-center py-3 fw-bold ${abaAtiva === "SOBRE" ? "text-dark border-bottom border-success border-3" : "text-muted"}`} 
                                    style={{ cursor: "pointer" }} 
                                    onClick={() => setAbaAtiva("SOBRE")}
                                >
                                    Detalhes da Conta
                                </div>
                            </div>

                            <div className="p-0">
                                {abaAtiva === "TREINOS" && (
                                    <div className="list-group list-group-flush">
                                        {meusTreinos.length === 0 ? (
                                            <div className="text-center p-5 text-muted">
                                                <h5>Nenhum treino encontrado</h5>
                                                <p>Ainda não registrou nenhuma rotina.</p>
                                            </div>
                                        ) : (
                                            meusTreinos.map(treino => (
                                                <div key={treino.id} className="list-group-item p-4 custom-hover border-bottom">
                                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                                        <h5 className="fw-bold text-success mb-0">{treino.titulo}</h5>
                                                        <div>
                                                            <button 
                                                                className="btn btn-sm btn-light border-secondary rounded-pill fw-bold px-3 me-2"
                                                                onClick={() => navigate("/telaEditarTreino", { state: { treino: treino } })}
                                                            >
                                                                ✏️ Editar
                                                            </button>
                                                            <button 
                                                                className="btn btn-sm btn-light text-danger border-danger rounded-pill fw-bold px-3"
                                                                onClick={() => handleDeleteTreino(treino.id)}
                                                            >
                                                                🗑️ Excluir
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex gap-2 flex-wrap">
                                                        {treino.exercicios.map(ex => (
                                                            <span key={ex.id} className="badge bg-light text-dark border p-2">
                                                                {ex.exercicio.nome} ({ex.series}x{ex.repeticoesAlvo})
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}

                                {abaAtiva === "SOBRE" && (
                                    <div className="p-4">
                                        <h6 className="fw-bold text-muted text-uppercase mb-3">Informações da Conta</h6>
                                        <p><strong>Email:</strong> {email}</p>
                                        <p><strong>Tipo de Conta:</strong> {perfil}</p>
                                        <button type="button" className="btn btn-outline-danger rounded-pill" onClick={handleDeleteConta}>
                                           🗑️ Excluir a minha conta
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                                <h4 className="fw-bold mb-0">Editar Perfil</h4>
                                <button className="btn btn-light rounded-pill fw-bold px-3" onClick={() => setIsEditingProfile(false)}>Cancelar</button>
                            </div>
                            
                            <form onSubmit={handleSalvarPerfil}>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Nome</label>
                                    <input type="text" className="form-control bg-light" value={nome} onChange={(e) => setNome(e.target.value)} required />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Biografia</label>
                                    <textarea className="form-control bg-light" rows="3" placeholder="Escreva algo sobre você..." value={biografia} onChange={(e) => setBiografia(e.target.value)}></textarea>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-bold">Alterar Senha</label>
                                    <input type="password" className="form-control bg-light" placeholder="Deixa em branco se não quiser mudar" value={senha} onChange={(e) => setSenha(e.target.value)} />
                                </div>

                                {perfil === "PERSONAL" && (
                                    <div className="mb-4 bg-opacity-10">
                                        <div className="mb-2">
                                            <label className="form-label fw-bold">Registo CREF</label>
                                            <input type="text" className="form-control" value={cref} onChange={e => setCref(e.target.value)} required />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Link da Foto (URL)</label>
                                            <input type="url" className="form-control" placeholder="https://..." value={fotoPerfil} onChange={e => setFotoPerfil(e.target.value)} />
                                        </div>
                                    </div>
                                )}

                                <div className="d-grid gap-2">
                                    <button className="btn btn-success rounded-pill fw-bold py-2" type="submit" disabled={carregando}>
                                        {carregando ? "Salvando..." : "Salvar Alterações"}
                                    </button>
                                    
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </Sidebar>
    </div>
    );
}