
import { useState, useEffect } from "react";
import logoMercadoLivre from "../assets/mercado-livre.png";
import logoShopee from "../assets/shopee.png";
import logoAmazon from "../assets/amazon.png";
import Sidebar from "../components/Sidebar";
import { Settings } from "lucide-react";

const API_BASE_URL = "https://dsseller-backend-final.onrender.com";

export default function Integracoes() {
  const [mlIntegrado, setMlIntegrado] = useState(false);
  const [shopeeIntegrado, setShopeeIntegrado] = useState(false);
  const [amazonIntegrado, setAmazonIntegrado] = useState(false);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(false);

  const [showConfigML, setShowConfigML] = useState(false);
  const [mlConfig, setMlConfig] = useState({
    imposto: "",
    margemMinima: "",
    margemMaxima: "",
    premium: "",
    classico: "",
    extras: "",
  });

  const checkMLStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/mercadolivre/status`);
      const data = await response.json();
      return data.integrated || false;
    } catch {
      return false;
    }
  };

  const updateMLStatus = (status) => {
    setMlIntegrado(status);
    localStorage.setItem("mlIntegrado", status.toString());
    window.dispatchEvent(new Event("mlStatusChange"));
  };

  useEffect(() => {
    const initializeStatus = async () => {
      setLoading(true);
      const urlParams = new URLSearchParams(window.location.search);
      const mlQuery = urlParams.get("ml_integrado");

      if (mlQuery === "1") {
        setTimeout(async () => {
          const backendStatus = await checkMLStatus();
          updateMLStatus(backendStatus);
          setLoading(false);
        }, 2000);
        window.history.replaceState({}, document.title, window.location.pathname);
      } else {
        const backendStatus = await checkMLStatus();
        updateMLStatus(backendStatus);
        setLoading(false);
      }
    };

    initializeStatus();

    const handleStatusChange = async () => {
      const backendStatus = await checkMLStatus();
      setMlIntegrado(backendStatus);
    };
    window.addEventListener("mlStatusChange", handleStatusChange);

    return () => {
      window.removeEventListener("mlStatusChange", handleStatusChange);
    };
  }, []);

  const handleIntegrarML = () => {
    window.location.href = `${API_BASE_URL}/auth/meli`;
  };

  const handleRemoverML = async () => {
    if (removing) return;
    setRemoving(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/mercadolivre/remove`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (data.success) updateMLStatus(false);
    } finally {
      setRemoving(false);
    }
  };

  const handleOpenConfigML = () => setShowConfigML(true);
  const handleCloseConfigML = () => setShowConfigML(false);

  const handleConfigChange = (e) => {
    const { name, value } = e.target;
    setMlConfig((prev) => ({ ...prev, [name]: value }));
  };

  const handleSalvarConfigML = () => {
    handleCloseConfigML();
  };

  const gerarEstiloBox = (integrado, cor, isDisabled = false) => ({
    borderColor: isDisabled ? "#666" : integrado ? cor : "#ff0000",
    boxShadow: isDisabled
      ? `0 0 15px 2px #66666633`
      : integrado
      ? `0 0 30px 6px ${cor}cc, 0 0 15px 2px ${cor}99`
      : `0 0 25px 4px #ff0000cc, 0 0 12px 2px #ff000099`,
    transition: "0.3s",
  });

  const botaoEstilo = (integrado, isLoading = false) => {
    const cor = integrado ? "#00ff55" : "#ff3333";
    return {
      marginTop: "0.5rem",
      backgroundColor: "rgba(17, 17, 17, 0.8)",
      color: isLoading ? "#999" : cor,
      fontWeight: "bold",
      padding: "8px 18px",
      borderRadius: "1.25rem",
      boxShadow: isLoading ? "none" : `0 0 15px ${cor}66`,
      textShadow: isLoading ? "none" : `0 0 6px ${cor}`,
      fontSize: "0.875rem",
      transition: "0.3s all ease-in-out",
      backdropFilter: "blur(10px)",
      border: `1px solid ${isLoading ? "#666" : cor}44`,
      cursor: isLoading ? "not-allowed" : "pointer",
    };
  };

  if (loading) {
    return (
      <div className="flex min-h-screen text-white content-layer">
        <Sidebar />
        <div className="flex flex-col flex-1 items-center justify-center py-16 min-h-[60vh]">
          <div className="text-cyan-400 text-lg">Verificando status das integrações...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen text-white content-layer">
      <Sidebar />
      <div className="flex flex-col flex-1 items-center py-16 min-h-[60vh]">
        <h1 className="text-3xl font-bold text-cyan-400 mb-10 glow-cyan tracking-wider">Integrações de Marketplace</h1>
        {/* ... caixas de integração mantidas ... */}

        {showConfigML && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-zinc-900 rounded-2xl shadow-2xl p-8 min-w-[320px] w-full max-w-[420px] border border-cyan-500/40 relative">
              <h2 className="text-xl text-cyan-300 font-bold mb-5 text-center">
                Configurar Integração Mercado Livre
              </h2>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="text-sm text-zinc-200 font-semibold">Margem Mínima (%)</label>
                    <input type="number" name="margemMinima" min="0" max="99" value={mlConfig.margemMinima} onChange={handleConfigChange} className="mt-1 w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700" />
                  </div>
                  <div className="w-1/2">
                    <label className="text-sm text-zinc-200 font-semibold">Margem Máxima (%)</label>
                    <input type="number" name="margemMaxima" min="0" max="99" value={mlConfig.margemMaxima} onChange={handleConfigChange} className="mt-1 w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="text-sm text-zinc-200 font-semibold">Premium (%)</label>
                    <input type="number" name="premium" min="0" max="99" value={mlConfig.premium} onChange={handleConfigChange} className="mt-1 w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700" />
                  </div>
                  <div className="w-1/2">
                    <label className="text-sm text-zinc-200 font-semibold">Clássico (%)</label>
                    <input type="number" name="classico" min="0" max="99" value={mlConfig.classico} onChange={handleConfigChange} className="mt-1 w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="text-sm text-zinc-200 font-semibold">Imposto CNPJ (%)</label>
                    <input type="number" name="imposto" min="0" max="99" value={mlConfig.imposto} onChange={handleConfigChange} className="mt-1 w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700" />
                  </div>
                  <div className="w-1/2">
                    <label className="text-sm text-zinc-200 font-semibold">Extras</label>
                    <input type="text" name="extras" value={mlConfig.extras} onChange={handleConfigChange} className="mt-1 w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700" />
                  </div>
                </div>
              </div>
              <div className="flex justify-between gap-3 mt-8">
                <button onClick={handleCloseConfigML} className="px-5 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-600">
                  Cancelar
                </button>
                <button onClick={handleSalvarConfigML} className="px-6 py-2 rounded-lg bg-cyan-600 text-white font-bold hover:bg-cyan-800 shadow border border-cyan-400">
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
