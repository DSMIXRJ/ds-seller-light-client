import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import useMLStatus from "./useMLStatus";
import logoMercadoLivre from "../../assets/mercado-livre.png";
import logoShopee from "../../assets/shopee.png";
import logoAmazon from "../../assets/amazon.png";
import { Settings } from "lucide-react";
import ConfigModalML from "./ConfigModalML";

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

  // Definição dos slots
  const slots = [
    {
      name: "Mercado Livre",
      logo: logoMercadoLivre,
      integrado: mlIntegrado,
      onIntegrar: handleIntegrarML,
      onRemover: handleRemoverML,
      onConfig: () => setShowConfigML(true),
      removing,
      enabled: true,
    },
    {
      name: "Shopee",
      logo: logoShopee,
      integrado: false,
      enabled: false,
    },
    {
      name: "Amazon",
      logo: logoAmazon,
      integrado: false,
      enabled: false,
    },
    {
      name: "Em breve",
      logo: null,
      integrado: false,
      enabled: false,
    },
    {
      name: "Em breve",
      logo: null,
      integrado: false,
      enabled: false,
    },
  ];

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
      <div className="flex flex-1 flex-col items-center py-16 min-h-[60vh] w-full">
        <h1 className="text-3xl font-bold text-cyan-400 mb-10 glow-cyan tracking-wider text-center">
          Integrações de Marketplace
        </h1>
        <div className="flex flex-1 items-center justify-center w-full">
          <div className="grid grid-cols-3 gap-x-10 gap-y-10">
            {slots.map((slot, i) => (
              <div
                key={i}
                className={`
                  flex flex-col items-center justify-center 
                  w-44 h-44 rounded-2xl bg-zinc-900/70 border-2 relative transition-all
                  ${slot.enabled
                    ? (slot.integrado
                        ? "border-green-500"
                        : "border-red-500")
                    : i === 1
                    ? "border-orange-500"
                    : i === 2
                    ? "border-yellow-500"
                    : "border-zinc-700"}
                `}
                style={{ boxShadow: "none" }}
              >
                {/* Configuração só para ML */}
                {slot.name === "Mercado Livre" && slot.integrado && (
                  <button
                    className="absolute top-2 right-2 text-cyan-400 hover:text-white bg-zinc-800/80 rounded-full p-1 shadow transition"
                    style={{ zIndex: 2 }}
                    onClick={slot.onConfig}
                    title="Configurar integração Mercado Livre"
                  >
                    <Settings className="w-5 h-5" />
                  </button>
                )}
                {/* Logo */}
                {slot.logo ? (
                  <img
                    src={slot.logo}
                    alt={slot.name}
                    className="w-10 h-10 mb-1"
                    style={{ opacity: slot.enabled ? 1 : 0.5, filter: "none" }}
                  />
                ) : (
                  <div className="w-10 h-10 mb-1 rounded-full bg-zinc-800" />
                )}
                <span className={`text-base font-bold mb-2 ${slot.enabled ? "text-zinc-100" : "text-zinc-400"}`}>
                  {slot.name}
                </span>
                {/* Botão */}
                {slot.enabled ? (
                  slot.integrado ? (
                    <button
                      onClick={slot.onRemover}
                      disabled={slot.removing}
                      className="w-24 py-2 rounded-xl font-bold bg-green-600 text-white border-2 border-green-300 transition hover:bg-green-700"
                    >
                      {slot.removing ? "Removendo..." : "Remover"}
                    </button>
                  ) : (
                    <button
                      onClick={slot.onIntegrar}
                      className="w-24 py-2 rounded-xl font-bold bg-red-600 text-white border-2 border-red-300 transition hover:bg-red-700"
                    >
                      Integrar
                    </button>
                  )
                ) : (
                  <button
                    disabled
                    className="w-24 py-2 rounded-xl font-bold bg-zinc-700 text-zinc-400 border border-zinc-600 opacity-60 cursor-not-allowed"
                  >
                    Em breve
                  </button>
                )}
              </div>
            ))}
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
