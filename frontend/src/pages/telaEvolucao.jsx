import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from 'react-select';
import { listarExercicios } from "../Services/Api";
import useAtalhos from "../hooks/useAtalhos";
import Sidebar from "../components/sideBar";
import { useTranslation } from 'react-i18next';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { t } from "i18next";

export default function TelaEvolucao() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [exercicios, setExercicios] = useState([]);
    const [exercicioSelecionado, setExercicioSelecionado] = useState(null);
    const [dadosGrafico, setDadosGrafico] = useState([]);
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
        const emailSalvo = localStorage.getItem("userEmail");
        if (!emailSalvo) navigate("/");

        async function carregarExerciciosAPI() {
            try {
                const dados = await listarExercicios();
                setExercicios(dados);
            } catch (erro) {
                console.error(t("erro_buscar_treinos"));
            }
        }
        carregarExerciciosAPI();
    }, [navigate]);

    useEffect(() => {
        if (!exercicioSelecionado) return;

        async function buscarHistorico() {
            setCarregando(true);
            const email = localStorage.getItem("userEmail");
            try {
                const res = await fetch(`http://localhost:8080/api/treinos/historico/${email}/${exercicioSelecionado.value}`);
                if (res.ok) {
                    const historico = await res.json();

                    const dadosFormatados = historico.map(item => {
                        const partesData = item.data.split("-");
                        return {
                            ...item,
                            dataFormatada: `${partesData[2]}/${partesData[1]}`
                        };
                    });

                    setDadosGrafico(dadosFormatados);
                }
            } catch (error) {
                console.error(t("erro_carregar_graficos"));
            } finally {
                setCarregando(false);
            }
        }
        buscarHistorico();
    }, [exercicioSelecionado]);

    useAtalhos({
        "Alt+M": () => setIsSidebarOpen(prev => !prev),
        "Alt+D": () => navigate("/paginaInicial")
    });
    const toTranslationKey = (text) =>
        text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "_")
            .replace(/^_+|_+$/g, "");

    const opcoesExercicios = exercicios.map(ex => ({ value: ex.id, label: t(toTranslationKey(ex.nome)) }));



    return (
        <div className="container-fluid min-vh-100 bg-light p-0"
            style={{
                backgroundColor: '#11998e',
                backgroundImage: 'linear-gradient(to right, #fdfffe, #d6ffe0, #fdfffe)',
                overflowX: 'hidden'
            }}>
            <Sidebar>
                <div className="container py-5" style={{ maxWidth: "800px" }}>

                    <div className="text-center mb-5">
                        <h2 className="fw-bold text-success">📈 {t("evo_titulo")}</h2>
                    </div>

                    <div className="card shadow-lg border-0 rounded-4 p-4 mb-4">
                        <label className="fw-bold text-dark mb-2 fs-5">{t("evo_selecione")}</label>
                        <Select
                            value={exercicioSelecionado}
                            onChange={setExercicioSelecionado}
                            options={opcoesExercicios}
                            isSearchable={true}
                            placeholder={t("alternate_incline_dumbbell_curl")}
                            noOptionsMessage={() => t("evo_nenhum_encontrado")}
                        />
                    </div>

                    {exercicioSelecionado && (
                        <div className="card shadow-lg border-0 rounded-4 p-4">
                            {carregando ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-success" role="status"></div>
                                </div>
                            ) : dadosGrafico.length === 0 ? (
                                <div className="text-center py-5">
                                    <h1 className="display-1 text-muted opacity-25">📉</h1>
                                    <h5 className="fw-bold text-secondary mt-3">{t("evo_nenhum_registo")}</h5>
                                </div>
                            ) : (
                                <div>
                                    <h5 className="fw-bold text-center mb-4 text-dark">
                                        {t("evo_evolucao_em")} <span className="text-success">{exercicioSelecionado.label}</span>
                                    </h5>

                                    <div style={{ width: '100%', height: 400 }}>
                                        <ResponsiveContainer>
                                            <LineChart
                                                data={dadosGrafico}
                                                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                                                <XAxis dataKey="dataFormatada" stroke="#6c757d" tick={{ fill: '#6c757d' }} dy={10} />
                                                <YAxis stroke="#6c757d" tick={{ fill: '#6c757d' }} unit="kg" />
                                                <Line
                                                    type="monotone"
                                                    dataKey="peso"
                                                    stroke="#198754"
                                                    strokeWidth={4}
                                                    dot={{ r: 6, fill: "#198754", stroke: "#fff", strokeWidth: 2 }}
                                                    activeDot={{ r: 8, fill: "#198754", stroke: "#fff", strokeWidth: 2 }}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </Sidebar>
        </div>
    );
}