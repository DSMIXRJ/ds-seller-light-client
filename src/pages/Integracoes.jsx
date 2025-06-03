import { useState, useEffect } from "react";
import logoMercadoLivre from "../assets/mercado-livre.png";
import logoShopee from "../assets/shopee.png";
import logoAmazon from "../assets/amazon.png";
import Sidebar from "../components/Sidebar";

export default function Integracoes() {
  const [mlIntegrado, setMlIntegrado] = useState(
    localStorage.getItem("mlIntegrado") === "true"
  );

  useEffect(() => {
    localStorage.setItem("mlIntegrado", mlIntegrado ? "true" : "false");
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
    localStorage.removeItem("mlIntegrado");
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
            className={`flex flex-col items-center gap-2 p-6 w-48 h-48 rounded-3xl bg-zinc-900 border-2 ${
              mlIntegrado ? "border-green-400" : "border-red-500"
            } shadow-xl transition-all duration-300`}
            style={{
              boxShadow: mlIntegrado
                ? "0 0 28px 4px #00ff5566, 0 0 12px 3px #00ff88aa"
                : "0 0 28px 4px #ff333366, 0 0 12px 3px #ff0000aa",
            }}
          >
            <img
              src={logoMercadoLivre}
              alt="Mercado Livre"
              className="w-full h-24 object-contain"
            />
            {mlIntegrado ? (
              <button
                className="mt-2 px-4 py-1 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition text-sm shadow-md"
                onClick={handleRemoverML}
              >
                Remover
              </button>
            ) : (
              <button
                className="mt-2 px-4 py-1 rounded-xl bg-green-400 text-black font-bold hover:bg-green-500 transition text-sm shadow-md"
                onClick={handleIntegrarML}
              >
                Integrar
              </button>
            )}
          </div>

          {/* Shopee */}
          <div className="flex flex-col items-center gap-2 p-6 w-48 h-48 rounded-3xl bg-zinc-900 border-2 border-orange-400 shadow-orange-400/50 shadow-xl opacity-70"
               style={{ boxShadow: "0 0 18px 2px #ff572266, 0 0 6px 1px #ff9800aa" }}>
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
          <div className="flex flex-col items-center gap-2 p-6 w-48 h-48 rounded-3xl bg-zinc-900 border-2 border-yellow-400 shadow-yellow-400/40 shadow-xl opacity-70"
               style={{ boxShadow: "0 0 14px 2px #ffb30066, 0 0 6px 1px #ffeb3baa" }}>
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
