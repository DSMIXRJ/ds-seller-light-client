import { useState, useEffect } from "react";
import logoMercadoLivre from "../assets/mercado-livre.png";
import logoShopee from "../assets/shopee.png";
import logoAmazon from "../assets/amazon.png";

export default function Integracoes() {
  // O estado da integração é salvo no sessionStorage para persistir ao atualizar
  const [mlIntegrado, setMlIntegrado] = useState(
    sessionStorage.getItem("mlIntegrado") === "true"
  );

  useEffect(() => {
    sessionStorage.setItem("mlIntegrado", mlIntegrado ? "true" : "false");
  }, [mlIntegrado]);

  // Verifica se há parâmetro ml_integrado=1 na URL (retorno da integração)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("ml_integrado") === "1") {
      setMlIntegrado(true);
      // Remove o parâmetro da URL para limpar a interface
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleIntegrarML = () => {
    window.location.href = "https://dsseller-backend-final.onrender.com/auth/meli";
  };

  return (
    <div className="flex flex-col items-center py-16 min-h-[60vh]">
      <h1 className="text-3xl font-bold text-cyan-400 mb-10">Integrações de Marketplace</h1>
      <div className="flex flex-row gap-8">
        {/* Mercado Livre */}
        <div className="flex flex-col items-center gap-2 p-6 rounded-3xl bg-zinc-900 border-2 border-cyan-400 shadow-cyan-400/50 shadow-xl"
             style={{ boxShadow: "0 0 24px 4px #ffe60066, 0 0 8px 1px #06b6d4aa" }}>
          <img src={logoMercadoLivre} alt="Mercado Livre" className="w-16 h-16 object-contain mb-2" />
          <span className="text-sm text-zinc-300 font-bold">Mercado Livre</span>
          {mlIntegrado ? (
            <button
              className="mt-2 px-4 py-1 rounded-xl bg-green-500 text-white shadow-green-400/70 shadow-lg font-bold cursor-default text-sm"
              style={{ borderRadius: "1.25rem", boxShadow: "0 0 12px #22c55e88" }}
              disabled
            >
              Integrado
            </button>
          ) : (
            <button
              className="mt-2 px-4 py-1 rounded-xl bg-red-500 text-white shadow-red-400/70 shadow-lg font-bold hover:bg-red-700 transition text-sm"
              style={{ borderRadius: "1.25rem", boxShadow: "0 0 12px #e63946cc" }}
              onClick={handleIntegrarML}
            >
              Integrar
            </button>
          )}
        </div>
        {/* Shopee */}
        <div className="flex flex-col items-center gap-2 p-6 rounded-3xl bg-zinc-900 border-2 border-orange-400 shadow-orange-400/50 shadow-xl opacity-70"
             style={{ boxShadow: "0 0 18px 2px #ff572266, 0 0 6px 1px #ff9800aa" }}>
          <img src={logoShopee} alt="Shopee" className="w-16 h-16 object-contain mb-2" />
          <span className="text-sm text-zinc-300 font-bold">Shopee</span>
          <button disabled className="mt-2 px-4 py-1 rounded-xl bg-orange-400/60 text-white font-bold opacity-60 cursor-not-allowed text-sm"
            style={{ borderRadius: "1.25rem" }}>
            Em breve
          </button>
        </div>
        {/* Amazon */}
        <div className="flex flex-col items-center gap-2 p-6 rounded-3xl bg-zinc-900 border-2 border-yellow-400 shadow-yellow-400/40 shadow-xl opacity-70"
             style={{ boxShadow: "0 0 14px 2px #ffb30066, 0 0 6px 1px #ffeb3baa" }}>
          <img src={logoAmazon} alt="Amazon" className="w-16 h-16 object-contain mb-2" />
          <span className="text-sm text-zinc-300 font-bold">Amazon</span>
          <button disabled className="mt-2 px-4 py-1 rounded-xl bg-yellow-400/60 text-white font-bold opacity-60 cursor-not-allowed text-sm"
            style={{ borderRadius: "1.25rem" }}>
            Em breve
          </button>
        </div>
      </div>
    </div>
  );
}
