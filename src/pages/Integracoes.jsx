import { useState, useEffect } from "react";
import logoMercadoLivre from "../assets/mercado-livre.png";
import logoShopee from "../assets/shopee.png";
import logoAmazon from "../assets/amazon.png";
import Sidebar from "../components/Sidebar";

export default function Integracoes() {
  const [mlIntegrado, setMlIntegrado] = useState(
    localStorage.getItem("mlIntegrado") === "true"
  );
  const [shopeeIntegrado, setShopeeIntegrado] = useState(false);
  const [amazonIntegrado, setAmazonIntegrado] = useState(false);
  const [atualizar, setAtualizar] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("ml_integrado") === "1") {
      setMlIntegrado(true);
      localStorage.setItem("mlIntegrado", "true");
      window.dispatchEvent(new Event("mlStatusChange"));
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleIntegrarML = () => {
    window.location.href = "https://dsseller-backend-final.onrender.com/auth/meli";
  };

  const handleRemoverML = async () => {
    try {
      const response = await fetch(
        "https://dsseller-backend-final.onrender.com/auth/meli/logout",
        { method: "DELETE" }
      );

      if (response.ok) {
        setMlIntegrado(false);
        localStorage.setItem("mlIntegrado", "false");
        window.dispatchEvent(new Event("mlStatusChange"));
        setAtualizar(!atualizar);
      } else {
        console.error("Erro ao revogar token da API do Mercado Livre");
        alert("Não foi possível remover a integração. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao remover integração:", error);
      alert("Falha ao comunicar com o servidor.");
    }
  };

  const gerarEstiloBox = (integrado, cor) => {
    if (integrado) {
      return {
        borderColor: cor,
        boxShadow: `0 0 20px 3px ${cor}66, 0 0 8px 2px ${cor}aa`,
      };
    } else {
      return {
        borderColor: "#ff0000",
        boxShadow: `0 0 20px 3px #ff000066, 0 0 8px 2px #ff0000aa`,
      };
    }
  };

  const botaoEstilo = (integrado) => {
    const cor = integrado ? "#ff3333" : "#00ff88";
    return {
      marginTop: "0.5rem",
      backgroundColor: "#111",
      color: cor,
      fontWeight: "bold",
      padding: "6px 16px",
      borderRadius: "12px",
      boxShadow: `0 0 6px 1px ${cor}88`,
      textShadow: `0 0 4px ${cor}`,
      fontSize: "0.875rem",
      transition: "0.3s all ease-in-out",
    };
  };

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar />
      <div className="flex flex-col flex-1 items-center py-16 min-h-[60vh]">
        <h1 className="text-3xl font-bold text-cyan-400 mb-10">
          Integrações de Marketplace
        </h1>
        <div className="flex flex-row gap-8">
          {/* Mercado Livre */}
          <div
            className="flex flex-col items-center gap-2 p-6 w-48 h-48 rounded-3xl bg-zinc-900 border-2 shadow-xl transition-all duration-300"
            style={gerarEstiloBox(mlIntegrado, "#00ff55")}
          >
            <img
              src={logoMercadoLivre}
              alt="Mercado Livre"
              className="w-full h-24 object-contain"
            />
            {mlIntegrado ? (
              <button style={botaoEstilo(true)} onClick={handleRemoverML}>
                Remover
              </button>
            ) : (
              <button style={botaoEstilo(false)} onClick={handleIntegrarML}>
                Integrar
              </button>
            )}
          </div>

          {/* Shopee */}
          <div
            className="flex flex-col items-center gap-2 p-6 w-48 h-48 rounded-3xl bg-zinc-900 border-2 shadow-xl opacity-80 transition-all duration-300"
            style={gerarEstiloBox(shopeeIntegrado, "#ff9900")}
          >
            <img
              src={logoShopee}
              alt="Shopee"
              className="w-full h-24 object-contain"
            />
            <button
              disabled
              className="mt-2 px-4 py-1 rounded-xl bg-orange-500/60 text-white font-bold opacity-60 cursor-not-allowed text-sm"
            >
              Em breve
            </button>
          </div>

          {/* Amazon */}
          <div
            className="flex flex-col items-center gap-2 p-6 w-48 h-48 rounded-3xl bg-zinc-900 border-2 shadow-xl opacity-80 transition-all duration-300"
            style={gerarEstiloBox(amazonIntegrado, "#ffaa00")}
          >
            <img
              src={logoAmazon}
              alt="Amazon"
              className="w-full h-24 object-contain"
            />
            <button
              disabled
              className="mt-2 px-4 py-1 rounded-xl bg-amber-500/60 text-white font-bold opacity-60 cursor-not-allowed text-sm"
            >
              Em breve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
