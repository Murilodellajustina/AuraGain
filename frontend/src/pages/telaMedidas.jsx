import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sideBar";
import { useTranslation } from 'react-i18next';
import useAtalhos from "../hooks/useAtalhos";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';



export default function TelaMedidas() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const [abaAtiva, setAbaAtiva] = useState("GRAFICO"); 
    const [historico, setHistorico] = useState([]);
    const [carregando, setCarregando] = useState(false);

    const [form, setForm] = useState({
        peso: '', altura: '', torax: '', cintura: '', quadril: '', 
        bracoEsquerdo: '', bracoDireito: '', coxaEsquerda: '', 
        coxaDireita: '', panturrilhaEsquerda: '', panturrilhaDireita: ''
    });

    const mapaMetricas = {
        peso: { key: "peso", label: t("medida_peso") || "Peso", unidade: "kg" },
        imc: { key: "imc", label: "IMC", unidade: "pts" },
        torax: { key: "torax", label: t("medida_torax") || "Tórax", unidade: "cm" },
        cintura: { key: "cintura", label: t("medida_cintura") || "Cintura", unidade: "cm" },
        quadril: { key: "quadril", label: "Quadril", unidade: "cm" },
        bracoEsquerdo: { key: "bracoEsquerdo", label: "Braço Esq.", unidade: "cm" },
        bracoDireito: { key: "bracoDireito", label: "Braço Dir.", unidade: "cm" },
        coxaEsquerda: { key: "coxaEsquerda", label: "Coxa Esq.", unidade: "cm" },
        coxaDireita: { key: "coxaDireita", label: "Coxa Dir.", unidade: "cm" },
        panturrilhaEsquerda: { key: "panturrilhaEsquerda", label: "Panturrilha Esq.", unidade: "cm" },
        panturrilhaDireita: { key: "panturrilhaDireita", label: "Panturrilha Dir.", unidade: "cm" }
    };

    const [metricaSelecionada, setMetricaSelecionada] = useState(mapaMetricas.peso);

    const renderTooltip = useCallback((props) => <CustomTooltip {...props} metricaSelecionada={metricaSelecionada} />, [metricaSelecionada]);

    const carregarHistorico = async () => {
        const email = localStorage.getItem("userEmail");
        if (!email) return;
        
        try {
            const res = await fetch(`http://localhost:8080/api/medidas/${encodeURIComponent(email)}`);
            if (res.ok) {
                const dados = await res.json();
                const dadosFormatados = dados.map(item => {
                    let dia = "00", mes = "00";
                    if (typeof item.dataAvaliacao === 'string') {
                        const partes = item.dataAvaliacao.split("-");
                        dia = partes[2]; mes = partes[1];
                    } else if (Array.isArray(item.dataAvaliacao)) {
                        dia = String(item.dataAvaliacao[2]).padStart(2, '0');
                        mes = String(item.dataAvaliacao[1]).padStart(2, '0');
                    }
                    return { ...item, dataFormatada: `${dia}/${mes}` };
                });
                setHistorico(dadosFormatados);
            }
        } catch (error) {
            console.error("Erro ao buscar medidas:", error);
        }
    };

    useEffect(() => { carregarHistorico(); }, []);

    const handleSalvarAvaliacao = async (e) => {
        e.preventDefault();
        setCarregando(true);
        const email = localStorage.getItem("userEmail");

        const payload = { emailUsuario: email, ...form };

        try {
            const res = await fetch("http://localhost:8080/api/medidas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                alert(t("medida_salva_sucesso") || "Avaliação guardada com sucesso!");
                setForm({ peso: '', altura: '', torax: '', cintura: '', quadril: '', bracoEsquerdo: '', bracoDireito: '', coxaEsquerda: '', coxaDireita: '', panturrilhaEsquerda: '', panturrilhaDireita: '' });
                setAbaAtiva("GRAFICO");
                carregarHistorico();
            }
        } catch (error) {
            alert(t("medida_erro_salvar") || "Erro ao guardar avaliação.");
        } finally {
            setCarregando(false);
        }
    };

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: parseFloat(e.target.value) || '' });
    };

    useAtalhos({
        "Alt+M": () => setIsSidebarOpen(prev => !prev),
        "Alt+D": () => navigate("/paginaInicial")
    });

    const SVGPart = ({ x, y, width, height, rx, id, isCircle = false }) => {
        const isSelected = metricaSelecionada.key === id;
        const fill = isSelected ? "#198754" : "#e9ecef";
        const stroke = isSelected ? "#0f5132" : "#ced4da";

        const handleClick = () => setMetricaSelecionada(mapaMetricas[id]);

        const style = { cursor: "pointer", transition: "all 0.3s ease" };

        if (isCircle) {
            return <circle cx={x} cy={y} r={width} fill={fill} stroke={stroke} strokeWidth="3" style={style} onClick={handleClick} title={mapaMetricas[id]?.label} />;
        }
        return <rect x={x} y={y} width={width} height={height} rx={rx} fill={fill} stroke={stroke} strokeWidth="3" style={style} onClick={handleClick} title={mapaMetricas[id]?.label} />;
    };

    return (
        <div className="container-fluid min-vh-100 bg-light text-dark p-0" style={{ overflowX: "hidden" }}>
            <Sidebar>
                <div className="container mt-4 mb-5">
            

                <div className="container mt-4 mb-5" style={{ maxWidth: "1000px" }}>
                    <div className="card shadow-lg border-0 rounded-4 overflow-hidden bg-white">
                        <div className="d-flex border-bottom">
                            <button className={`flex-grow-1 btn py-3 fw-bold rounded-0 ${abaAtiva === "GRAFICO" ? "btn-success" : "btn-light text-muted"}`} onClick={() => setAbaAtiva("GRAFICO")}>
                                📈 {t("medidas_aba_grafico") || "Ver Evolução"}
                            </button>
                            <button className={`flex-grow-1 btn py-3 fw-bold rounded-0 ${abaAtiva === "NOVA_AVALIACAO" ? "btn-success" : "btn-light text-muted"}`} onClick={() => setAbaAtiva("NOVA_AVALIACAO")}>
                                📝 {t("medidas_aba_nova") || "Nova Avaliação"}
                            </button>
                        </div>

                        <div className="card-body p-4">
                            
                            {abaAtiva === "GRAFICO" && (
                                <div className="row">
                                    <div className="col-md-5 d-flex flex-column align-items-center justify-content-center position-relative mb-4 mb-md-0 border-end">
                                        
                                        <div className="position-absolute top-0 start-0 m-3 d-flex flex-column gap-2">
                                            <button className={`btn btn-sm rounded-pill fw-bold shadow-sm ${metricaSelecionada.key === 'peso' ? 'btn-success' : 'btn-light border'}`} onClick={() => setMetricaSelecionada(mapaMetricas.peso)}>Peso</button>
                                            <button className={`btn btn-sm rounded-pill fw-bold shadow-sm ${metricaSelecionada.key === 'imc' ? 'btn-success' : 'btn-light border'}`} onClick={() => setMetricaSelecionada(mapaMetricas.imc)}>IMC</button>
                                        </div>

                                        <svg width="220" height="400" viewBox="0 0 200 400" className="drop-shadow">
                                            <circle cx="100" cy="40" r="25" fill="#ced4da" />
                                            
                                            <SVGPart x="30" y="80" width="22" height="110" rx="10" id="bracoEsquerdo" />
                                            <SVGPart x="148" y="80" width="22" height="110" rx="10" id="bracoDireito" />
                                            
                                            <SVGPart x="60" y="80" width="80" height="55" rx="10" id="torax" />
                                            <SVGPart x="65" y="145" width="70" height="40" rx="10" id="cintura" />
                                            <SVGPart x="60" y="195" width="80" height="40" rx="10" id="quadril" />
                                            
                                            <SVGPart x="60" y="245" width="35" height="70" rx="10" id="coxaEsquerda" />
                                            <SVGPart x="105" y="245" width="35" height="70" rx="10" id="coxaDireita" />
                                            <SVGPart x="65" y="325" width="25" height="70" rx="10" id="panturrilhaEsquerda" />
                                            <SVGPart x="110" y="325" width="25" height="70" rx="10" id="panturrilhaDireita" />
                                        </svg>
                                    </div>

                                    <div className="col-md-7 ps-md-4">
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <h5 className="fw-bold text-dark m-0">
                                                Evolução: <span className="text-success">{metricaSelecionada.label}</span>
                                            </h5>
                                        </div>

                                        {historico.length === 0 ? (
                                            <div className="text-center py-5 text-muted bg-light rounded-4 border">
                                                <h1 className="opacity-25 mb-3">📏</h1>
                                                <p className="fw-bold">{t("medidas_sem_dados") || "Sem dados registados."}</p>
                                            </div>
                                        ) : (
                                            <div className="bg-light rounded-4 p-3 border shadow-sm" style={{ width: '100%', height: 350 }}>
                                                <ResponsiveContainer>
                                                    <LineChart data={historico} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                                                        <XAxis dataKey="dataFormatada" tick={{ fontSize: 12, fill: '#6c757d' }} tickLine={false} axisLine={false} dy={10} />
                                                        <YAxis tick={{ fontSize: 12, fill: '#6c757d' }} tickLine={false} axisLine={false} />
                                                        <Line 
                                                            type="monotone" 
                                                            dataKey={metricaSelecionada.key} 
                                                            stroke="#198754" 
                                                            strokeWidth={4} 
                                                            dot={{ r: 5, fill: "#198754", stroke: "#fff", strokeWidth: 2 }} 
                                                            activeDot={{ r: 7, fill: "#198754", stroke: "#fff", strokeWidth: 2 }}
                                                            animationDuration={1000}
                                                            connectNulls={true}
                                                        />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {abaAtiva === "NOVA_AVALIACAO" && (
                                <form onSubmit={handleSalvarAvaliacao} className="px-md-4">
                                    <h6 className="fw-bold text-success mb-3 pb-2 border-bottom">{t("medidas_gerais") || "Medidas Gerais"}</h6>
                                    <div className="row g-3 mb-4">
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small text-muted">Peso Corporal (kg)</label>
                                            <input type="number" step="0.1" className="form-control form-control-lg bg-light" name="peso" value={form.peso} onChange={handleInputChange} required />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small text-muted">Altura (m)</label>
                                            <input type="number" step="0.01" className="form-control form-control-lg bg-light" name="altura" placeholder="Ex: 1.80" value={form.altura} onChange={handleInputChange} required />
                                        </div>
                                    </div>

                                    <h6 className="fw-bold text-success mb-3 pb-2 border-bottom">{t("medidas_circunferencia") || "Circunferências Musculares (cm)"}</h6>
                                    <div className="row g-3 mb-3">
                                        <div className="col-4"><label className="form-label text-muted small fw-bold">Tórax</label><input type="number" step="0.1" className="form-control bg-light" name="torax" value={form.torax} onChange={handleInputChange} /></div>
                                        <div className="col-4"><label className="form-label text-muted small fw-bold">Cintura</label><input type="number" step="0.1" className="form-control bg-light" name="cintura" value={form.cintura} onChange={handleInputChange} /></div>
                                        <div className="col-4"><label className="form-label text-muted small fw-bold">Quadril</label><input type="number" step="0.1" className="form-control bg-light" name="quadril" value={form.quadril} onChange={handleInputChange} /></div>
                                    </div>
                                    <div className="row g-3 mb-3">
                                        <div className="col-6"><label className="form-label text-muted small fw-bold">Braço Esquerdo</label><input type="number" step="0.1" className="form-control bg-light" name="bracoEsquerdo" value={form.bracoEsquerdo} onChange={handleInputChange} /></div>
                                        <div className="col-6"><label className="form-label text-muted small fw-bold">Braço Direito</label><input type="number" step="0.1" className="form-control bg-light" name="bracoDireito" value={form.bracoDireito} onChange={handleInputChange} /></div>
                                    </div>
                                    <div className="row g-3 mb-5">
                                        <div className="col-6"><label className="form-label text-muted small fw-bold">Coxa Esquerda</label><input type="number" step="0.1" className="form-control bg-light" name="coxaEsquerda" value={form.coxaEsquerda} onChange={handleInputChange} /></div>
                                        <div className="col-6"><label className="form-label text-muted small fw-bold">Coxa Direita</label><input type="number" step="0.1" className="form-control bg-light" name="coxaDireita" value={form.coxaDireita} onChange={handleInputChange} /></div>
                                    </div>
                                    <div className="row g-3 mb-5">
                                        <div className="col-6"><label className="form-label text-muted small fw-bold">Panturrilha Esquerda</label><input type="number" step="0.1" className="form-control bg-light" name="panturrilhaEsquerda" value={form.panturrilhaEsquerda} onChange={handleInputChange} /></div>
                                        <div className="col-6"><label className="form-label text-muted small fw-bold">Panturrilha Direita</label><input type="number" step="0.1" className="form-control bg-light" name="panturrilhaDireita" value={form.panturrilhaDireita} onChange={handleInputChange} /></div>
                                    </div>

                                    <button type="submit" className="btn btn-success btn-lg w-100 fw-bold rounded-pill shadow" disabled={carregando}>
                                        {carregando ? "Salvando..." : "Salvar Nova Avaliação Física"}
                                    </button>
                                </form>
                            )}

                        </div>
                    </div>
                </div>
            </div>
            </Sidebar>
        </div>
    );
}