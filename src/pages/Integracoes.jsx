import { useState, useEffect } from "react";
import logoMercadoLivre from "../assets/mercado-livre.png";
import logoShopee from "../assets/shopee.png";
import logoAmazon from "../assets/amazon.png";
import Sidebar from "../components/Sidebar"; // ajuste se o nome for diferente

export default function Integracoes() {
  const [mlIntegrado, setMlIntegrado] = useState(
    sessionStorage.getItem("mlIntegrado") === "true"
  );

  useEffect(() => {
    sessionStorage.setItem("mlIntegrado", mlIntegrado ? "true" : "false");
  }, [mlIntegrado]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("ml_integrado") === "1") {
      setMlIntegrado(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleIntegrarML = () => {
    window.location.href = "https://dsseller-backend-final.onrender.com/auth/meli";
  };

  const handleRemoverML = () => {
    setMlIntegrado(false);
    sessionStorage.removeItem("mlIntegrado");
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
          <div className="flex flex-col items-center gap-2 p-6 w-48 h-64 rounded-3xl bg-zinc-900 border-2 border-cyan-400 shadow-cyan-400/50 shadow-xl"
               style={{ boxShadow: "0 0 24px 4px #ffe60066, 0 0 8px 1px #06b6d4aa" }}>
            <img
              src={logoMercadoLivre}
              alt="Mercado Livre"
              className="w-full h-32 object-contain"
            />
            {mlIntegrado ? (
              <button
                className="mt-4 px-4 py-1 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition text-sm shadow-md"
                onClick={handleRemoverML}
              >
                Remover
              </button>
            ) : (
              <button
                className="mt-4 px-4 py-1 rounded-xl bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition text-sm shadow-md"
                onClick={handleIntegrarML}
              >
                Integrar
              </button>
            )}
          </div>

          {/* Shopee */}
          <div className="flex flex-col items-center gap-2 p-6 w-48 h-64 rounded-3xl bg-zinc-900 border-2 border-orange-400 shadow-orange-400/50 shadow-xl opacity-70"
               style={{ boxShadow: "0 0 18px 2px #ff572266, 0 0 6px 1px #ff9800aa" }}>
            <img
              src={logoShopee}
              alt="Shopee"
              className="w-full h-32 object-contain"
            />
            <button
              disabled
              className="mt-4 px-4 py-1 rounded-xl bg-orange-500/60 text-white font-bold opacity-60 cursor-not-allowed text-sm"
            >
              Em breve
            </button>
          </div>

          {/* Amazon */}
          <div className="flex flex-col items-center gap-2 p-6 w-48 h-64 rounded-3xl bg-zinc-900 border-2 border-yellow-400 shadow-yellow-400/40 shadow-xl opacity-70"
               style={{ boxShadow: "0 0 14px 2px #ffb30066, 0 0 6px 1px #ffeb3baa" }}>
            <img
              src={logoAmazon}
              alt="Amazon"
              className="w-full h-32 object-contain"
            />
            <button
              disabled
              className="mt-4 px-4 py-1 rounded-xl bg-amber-500/60 text-white font-bold opacity-60 cursor-not-allowed text-sm"
            >
              Em breve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
