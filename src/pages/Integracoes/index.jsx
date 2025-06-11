import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import useMLStatus from "./useMLStatus";
import logoMercadoLivre from "../../assets/mercado-livre.png";
import logoShopee from "../../assets/shopee.png";
import logoAmazon from "../../assets/amazon.png";
import { Settings } from "lucide-react";

const integrationSlots = [
  { key: "ml", name: "Mercado Livre", logo: logoMercadoLivre, available: true },
  { key: "shopee", name: "Shopee", logo: logoShopee, available: false },
  { key: "amazon", name: "Amazon", logo: logoAmazon, available: false },
  { key: "slot4", name: "Em breve", logo: null, available: false },
  { key: "slot5", name: "Em breve", logo: null, available: false },
];

export default function Integracoes() {
  const {
    mlIntegrado,
    loading,
    removing,
    handleIntegrarML,
    handleRemoverML,
    showConfigML,
    setShowConfigML,
    mlConfig,
    setMlConfig,
    handleSalvarConfigML,
  } = useMLStatus();

  // Modal de seleção de marketplace: não implementado, slots futuros

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {/* Slot Mercado Livre (real, funcional) */}
          <div className={`flex flex-col items-center gap-2 p-6 w-60 h-60 rounded-3xl
            bg-zinc-900/60 border-2 shadow-xl relative transition-all
            ${mlIntegrado ? "border-green-500 shadow-green-400/40" : "border-red-500 shadow-red-400/40"}`}>
            {/* Config Button */}
            <button
              className="absolute top-3 right-3 text-cyan-400 hover:text-white bg-zinc-800/80 rounded-full p-1 shadow transition"
              style={{ zIndex: 2 }}
              onClick={() => setShowConfigML(true)}
              title="Configurar integração Mercado Livre"
              disabled={!mlIntegrado}
            >
              <Settings className="w-5 h-5" />
            </button>
            {/* Logo */}
            <img
              src={logoMercadoLivre}
              alt="Mercado Livre"
              className="w-16 h-16 object-contain mb-2 transition-transform duration-300"
              style={{
                filter: mlIntegrado
                  ? "drop-shadow(0 0 12px #00ff55cc)"
                  : "drop-shadow(0 0 12px #ff3333cc)",
                opacity: 1,
              }}
            />
            <span className="text-base text-zinc-200 font-bold mb-3">Mercado Livre</span>
            {/* Botão */}
            {mlIntegrado ? (
              <button
                onClick={handleRemoverML}
                disabled={removing}
                className="w-32 py-2 rounded-xl font-bold bg-green-600 text-white
                  border-2 border-green-300 shadow-lg transition hover:bg-green-700"
              >
                {removing ? "Removendo..." : "Remover"}
              </button>
            ) : (
              <button
                onClick={handleIntegrarML}
                className="w-32 py-2 rounded-xl font-bold bg-red-600 text-white
                  border-2 border-red-300 shadow-lg transition hover:bg-red-700"
              >
                Integrar
              </button>
            )}
            {/* Neon */}
            <div
              className={`absolute top-0 left-0 w-full h-full rounded-3xl opacity-40 pointer-events-none 
                ${mlIntegrado ? "bg-green-400" : "bg-red-400"}`}
              style={{ filter: "blur(12px)" }}
            />
          </div>
          {/* Slot Shopee */}
          <div className="flex flex-col items-center gap-2 p-6 w-60 h-60 rounded-3xl
            bg-zinc-900/40 border-2 border-orange-400/60 shadow-xl opacity-80 transition-all duration-500 relative">
            <img src={logoShopee} alt="Shopee" className="w-16 h-16 object-contain mb-2 grayscale" />
            <span className="text-base text-zinc-300 font-bold mb-3">Shopee</span>
            <button
              disabled
              className="w-32 py-2 rounded-xl bg-orange-500/30 text-zinc-400 font-bold opacity-60 cursor-not-allowed text-sm border border-orange-500/20"
            >
              Em breve
            </button>
          </div>
          {/* Slot Amazon */}
          <div className="flex flex-col items-center gap-2 p-6 w-60 h-60 rounded-3xl
            bg-zinc-900/40 border-2 border-yellow-400/60 shadow-xl opacity-80 transition-all duration-500 relative">
            <img src={logoAmazon} alt="Amazon" className="w-16 h-16 object-contain mb-2 grayscale" />
            <span className="text-base text-zinc-300 font-bold mb-3">Amazon</span>
            <button
              disabled
              className="w-32 py-2 rounded-xl bg-yellow-400/30 text-zinc-400 font-bold opacity-60 cursor-not-allowed text-sm border border-yellow-400/20"
            >
              Em breve
            </button>
          </div>
          {/* Slot 4 */}
          <div className="flex flex-col items-center gap-2 p-6 w-60 h-60 rounded-3xl
            bg-zinc-900/30 border-2 border-zinc-700 shadow-xl opacity-60 transition-all duration-500 relative">
            <span className="w-16 h-16 mb-2 rounded-full bg-zinc-700" />
            <span className="text-base text-zinc-500 font-bold mb-3">Em breve</span>
            <button
              disabled
              className="w-32 py-2 rounded-xl bg-zinc-700 text-zinc-400 font-bold opacity-60 cursor-not-allowed text-sm border border-zinc-700/30"
            >
              Em breve
            </button>
          </div>
          {/* Slot 5 */}
          <div className="flex flex-col items-center gap-2 p-6 w-60 h-60 rounded-3xl
            bg-zinc-900/30 border-2 border-zinc-700 shadow-xl opacity-60 transition-all duration-500 relative">
            <span className="w-16 h-16 mb-2 rounded-full bg-zinc-700" />
            <span className="text-base text-zinc-500 font-bold mb-3">Em breve</span>
            <button
              disabled
              className="w-32 py-2 rounded-xl bg-zinc-700 text-zinc-400 font-bold opacity-60 cursor-not-allowed text-sm border border-zinc-700/30"
            >
              Em breve
            </button>
          </div>
        </div>
      </div>
      {/* Modal de configuração ML */}
      {showConfigML && (
        <ConfigModalML
          config={mlConfig}
          setConfig={setMlConfig}
          onClose={() => setShowConfigML(false)}
          onSave={handleSalvarConfigML}
        />
      )}
    </div>
  );
}

import ConfigModalML from "./ConfigModalML";
