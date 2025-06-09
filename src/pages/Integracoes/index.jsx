// ✅ ARQUIVO: src/pages/Integracoes/index.jsx

import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import MLBox from "./MLBox";
import ConfigModalML from "./ConfigModalML";
import useMLStatus from "./useMLStatus";
import logoShopee from "../../assets/shopee.png";
import logoAmazon from "../../assets/amazon.png";
import { gerarEstiloBox } from "./styles";

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
          <MLBox
            integrado={mlIntegrado}
            removing={removing}
            onIntegrar={handleIntegrarML}
            onRemover={handleRemoverML}
            onOpenConfig={() => setShowConfigML(true)}
          />

          {/* Shopee */}
          <div
            className="flex flex-col items-center gap-2 p-6 w-48 h-48 rounded-3xl bg-zinc-900/40 backdrop-blur-md border-2 shadow-xl opacity-70 transition-all duration-500 hover:opacity-90"
            style={gerarEstiloBox(false, "#ff9900", true)}
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
            >
              Em breve
            </button>
          </div>

          {/* Amazon */}
          <div
            className="flex flex-col items-center gap-2 p-6 w-48 h-48 rounded-3xl bg-zinc-900/40 backdrop-blur-md border-2 shadow-xl opacity-70 transition-all duration-500 hover:opacity-90"
            style={gerarEstiloBox(false, "#ffaa00", true)}
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
            >
              Em breve
            </button>
          </div>
        </div>
      </div>

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
// index.jsx - será preenchido com conteúdo real depois
