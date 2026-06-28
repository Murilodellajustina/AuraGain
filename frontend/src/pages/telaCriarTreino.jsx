import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../imagens/logoAuraGain.png";
import Select from 'react-select';
import { listarExercicios } from "../Services/Api";
import Sidebar from "../components/sideBar";
import { useTranslation } from 'react-i18next';
import useAtalhos from "../hooks/useAtalhos";

export default function CadastrarTreino() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);

    const [nome, setNome] = useState("Visitante");
    const [letraInicial, setLetraInicial] = useState("V");
    const [email, setEmail] = useState("");
    const [exercicios, setExercicios] = useState([]);
    const [carregando, setCarregando] = useState(false);

    const [linhasExercicios, setLinhasExercicios] = useState([{ id: Date.now(), exercicioId: null, series: '', repeticoes: '' }]);

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
            alert(t("criar_alerta_selecione_dia"));
            return;
        }

        const exerciciosValidos = linhasExercicios.filter(linha => linha.exercicioId && linha.series && linha.repeticoes);
        if (exerciciosValidos.length === 0 || exerciciosValidos.length !== linhasExercicios.length) {
            alert(t("criar_alerta_preencher_campos"));
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
                alert(t("criar_alerta_sucesso"));
                setOpcaoSelecionada(null);
                setLinhasExercicios([{ id: Date.now(), exercicioId: null, series: '', repeticoes: '' }]);
            } else {
                const erroMsg = await resposta.text();
                alert(erroMsg);
            }
        } catch (error) {
            alert(t("cadastro_erro_servidor"));
            console.error(error);
        } finally {
            setCarregando(false);
        }
    };

    const toTranslationKey = (text) =>
        text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "_")
            .replace(/^_+|_+$/g, "");

    const opcoesExercicios = exercicios.map(exercicio => ({
        value: exercicio.id,
        label: t(toTranslationKey(exercicio.nome))
    }));

    const opcoesDias = [
        { value: 'A', label: t("criar_ficha_a") },
        { value: 'B', label: t("criar_ficha_b") },
        { value: 'C', label: t("criar_ficha_c") },
        { value: 'D', label: t("criar_ficha_d") },
        { value: 'E', label: t("criar_ficha_e") },
        { value: 'F', label: t("criar_ficha_f") },

    ];

    useAtalhos({
        "Alt+M": () => setIsSidebarOpen(prev => !prev),
        "Alt+D": () => navigate("/paginaInicial"), 
        "Alt+N": () => adicionarNovaLinha(),       
        "Alt+C": () => handleCadastrarTreino()     
    });

    return (
        <div className="container-fluid min-vh-100 bg-light text-dark p-0" style={{
            backgroundColor: '#11998e',
            backgroundImage: 'linear-gradient(to right, #fdfffe, #d6ffe0, #fdfffe)',
            overflowX: 'hidden'
        }}>

            <Sidebar>
                <div className="container mt-4 mb-5">

                    <div className="row gx-4">

                        <div className="col-lg-12 mb-4">
                            <div className="card bg-white border-0 shadow-sm h-100 rounded-4 overflow-hidden">
                                <div className="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
                                    <h4 className="mb-0 text-success fw-bold">{t("criar_titulo")}</h4>
                                </div>
                                <div className="card-body p-0">
                                    <ul className="list-group list-group-flush fs-5">
                                        <div className="col-lg-z d-flex " style={{ marginLeft: '20px' }}>
                                            <Select
                                                value={opcaoSelecionada}
                                                onChange={setOpcaoSelecionada}
                                                options={opcoesDias}
                                                isSearchable={true}
                                                placeholder={t("criar_selecione_ficha")}
                                                noOptionsMessage={() => { t("criar_nenhum_resultado") }}
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
                                                        placeholder={t("criar_selecione_exercicio")}
                                                        noOptionsMessage={() => { t("criar_nenhum_resultado") }}
                                                        value={opcoesExercicios.find(op => op.value === linha.exercicioId) || null}
                                                        onChange={(opcao) => handleLinhaChange(linha.id, 'exercicioId', opcao ? opcao.value : null)}
                                                    />
                                                </div>
                                                <div className="ms-3">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder={t("criar_label_series")}
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
                                                        placeholder={t("criar_label_reps")}
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
                                    <button className="btn btn-outline-success fw-bold shadow-sm rounded-3 " title="Alt+N" style={{ marginTop: '20px', marginLeft: '20px' }} onClick={adicionarNovaLinha}>
                                        {t("criar_btn_adicionar")}
                                    </button>
                                </div>
                                <div className="card-footer bg-white border-top-0 p-4 d-grid">
                                    <button className="btn btn-success btn-lg fw-bold shadow-sm rounded-3" title="Alt+C" onClick={handleCadastrarTreino}
                                        disabled={carregando}>
                                        {carregando ? t("criar_salvando") : t("dash_card_cadastrar")}
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Sidebar >
        </div>

    );
}