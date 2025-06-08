import { useState, useEffect } from "react";
import logoMercadoLivre from "../assets/mercado-livre.png";
import logoShopee from "../assets/shopee.png";
import logoAmazon from "../assets/amazon.png";
import Sidebar from "../components/Sidebar";

const API_BASE_URL = "https://dsseller-backend-final.onrender.com";

export default function Integracoes() {
  const [mlIntegrado, setMlIntegrado] = useState(false);
  const [shopeeIntegrado, setShopeeIntegrado] = useState(false);
  const [amazonIntegrado, setAmazonIntegrado] = useState(false);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(false);

  // Função para verificar status no backend
  const checkMLStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/mercadolivre/status`);
      const data = await response.json();
      return data.integrated || false;
    } catch (error) {
      console.error("Erro ao verificar status ML:", error);
      return false;
    }
  };

  // Função para atualizar status local e global
  const updateMLStatus = (status) => {
    setMlIntegrado(status);
    localStorage.setItem("mlIntegrado", status.toString());
    window.dispatchEvent(new Event("mlStatusChange"));
  };

  useEffect(() => {
    const initializeStatus = async () => {
      setLoading(true);
      
      // Sempre checa a URL para integração
      const urlParams = new URLSearchParams(window.location.search);
      const mlQuery = urlParams.get("ml_integrado");

      if (mlQuery === "1") {
        // Se veio da URL de callback, aguarda um pouco para o backend processar
        setTimeout(async () => {
          const backendStatus = await checkMLStatus();
          updateMLStatus(backendStatus);
          setLoading(false);
        }, 2000);

        // Remove o parâmetro da URL (sem recarregar)
        window.history.replaceState({}, document.title, window.location.pathname);
      } else {
        // Verifica status no backend
        const backendStatus = await checkMLStatus();
        updateMLStatus(backendStatus);
        setLoading(false);
      }
    };

    initializeStatus();

    // Atualiza status em tempo real
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
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (data.success) {
        updateMLStatus(false);
        console.log("Integração removida com sucesso");
      } else {
        console.error("Erro ao remover integração:", data.message);
        alert("Erro ao remover integração. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao remover integração:", error);
      alert("Erro ao remover integração. Tente novamente.");
    } finally {
      setRemoving(false);
    }
  };

  // Luzes sincronizadas
  const gerarEstiloBox = (integrado, cor, isDisabled = false) => {
    if (isDisabled) {
      return {
        borderColor: "#666",
        boxShadow: `0 0 15px 2px #66666633`,
      };
    }
    return {
      borderColor: integrado ? cor : "#ff0000",
      boxShadow: integrado
        ? `0 0 30px 6px ${cor}cc, 0 0 15px 2px ${cor}99`
        : `0 0 25px 4px #ff0000cc, 0 0 12px 2px #ff000099`,
      transition: "0.3s",
    };
  };

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
        <h1 className="text-3xl font-bold text-cyan-400 mb-10 glow-cyan tracking-wider">
          Integrações de Marketplace
        </h1>
        <div className="flex flex-row gap-8 flex-wrap justify-center">
          {/* Mercado Livre */}
          <div
            className="flex flex-col items-center gap-2 p-6 w-48 h-48 rounded-3xl bg-zinc-900/60 backdrop-blur-md border-2 shadow-xl transition-all duration-500 hover:scale-105 hover:rotate-1"
            style={gerarEstiloBox(mlIntegrado, "#00ff55")}
          >
            <img
              src={logoMercadoLivre}
              alt="Mercado Livre"
              className="w-16 h-16 object-contain mb-2 transition-transform duration-300 hover:scale-110"
              style={{
                filter: mlIntegrado
                  ? "drop-shadow(0 0 12px #00ff55cc)"
                  : "drop-shadow(0 0 12px #ff3333cc)",
                transition: "filter 0.3s",
              }}
            />
            <span className="text-sm text-zinc-300 font-bold">Mercado Livre</span>
            {mlIntegrado ? (
              <button
                style={botaoEstilo(true, removing)}
                onClick={handleRemoverML}
                disabled={removing}
                className="hover:scale-105 active:scale-95"
              >
                {removing ? "Removendo..." : "Remover"}
              </button>
            ) : (
              <button
                style={botaoEstilo(false)}
                onClick={handleIntegrarML}
                className="hover:scale-105 active:scale-95"
              >
                Integrar
              </button>
            )}
          </div>

          {/* Shopee */}
          <div
            className="flex flex-col items-center gap-2 p-6 w-48 h-48 rounded-3xl bg-zinc-900/40 backdrop-blur-md border-2 shadow-xl opacity-70 transition-all duration-500 hover:opacity-90"
            style={gerarEstiloBox(shopeeIntegrado, "#ff9900", true)}
          >
            <img
              src={logoShopee}
              alt="Shopee"
              className="w-16 h-16 object-contain mb-2 grayscale"
            />
            <span className="text-sm text-zinc-400 font-bold">Shopee</span>
            <button
              disabled
              className="mt-2 px-4 py-2 rounded-xl bg-orange-500/30 backdrop-blur-sm text-zinc-400 font-bold opacity-60 cursor-not-allowed text-sm border border-orange-500/20"
              style={{ borderRadius: "1.25rem" }}
            >
              Em breve
            </button>
          </div>

          {/* Amazon */}
          <div
            className="flex flex-col items-center gap-2 p-6 w-48 h-48 rounded-3xl bg-zinc-900/40 backdrop-blur-md border-2 shadow-xl opacity-70 transition-all duration-500 hover:opacity-90"
            style={gerarEstiloBox(amazonIntegrado, "#ffaa00", true)}
          >
            <img
              src={logoAmazon}
              alt="Amazon"
              className="w-16 h-16 object-contain mb-2 grayscale"
            />
            <span className="text-sm text-zinc-400 font-bold">Amazon</span>
            <button
              disabled
              className="mt-2 px-4 py-2 rounded-xl bg-yellow-400/30 backdrop-blur-sm text-zinc-400 font-bold opacity-60 cursor-not-allowed text-sm border border-yellow-400/20"
              style={{ borderRadius: "1.25rem" }}
            >
              Em breve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

