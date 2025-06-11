import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import ConfigModalML from "./ConfigModalML";
import { Settings } from "lucide-react";

export default function Integracoes() {
  const navigate = useNavigate();
  const [integrations, setIntegrations] = useState(
    Array(6).fill({ integrated: false, marketplace: null })
  );
  const [showConfig, setShowConfig] = useState(false);
  const [activeSlot, setActiveSlot] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("ds_integrations") || "[]");
    if (Array.isArray(saved) && saved.length > 0) {
      const filled = Array(6).fill({ integrated: false, marketplace: null });
      saved.forEach((item, i) => {
        if (item && item.marketplace) filled[i] = item;
      });
      setIntegrations(filled);
    }
  }, []);

  const handleIntegrate = (index) => {
    navigate("/escolher-marketplace", { state: { slotIndex: index } });
  };

  const handleRemove = (index) => {
    const updated = [...integrations];
    updated[index] = { integrated: false, marketplace: null };
    setIntegrations(updated);
    localStorage.setItem("ds_integrations", JSON.stringify(updated));
  };

  const handleSaveConfig = (slotIndex, configData) => {
    console.log("Salvar config para slot", slotIndex, configData);
    setShowConfig(false);
  };

  const botaoClasse =
    "w-24 h-9 rounded-xl font-bold text-cyan-400 bg-zinc-800 border border-cyan-500/30 hover:bg-cyan-500/10 hover:text-white transition";

  return (
    <div className="flex min-h-screen text-white content-layer">
      <Sidebar />
      <div className="flex flex-col flex-1 items-center py-16 min-h-[60vh]">
        <h1 className="text-3xl font-bold text-cyan-400 mb-10 text-center">
          Integrações de Marketplace
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {integrations.map((item, index) => (
            <div
              key={index}
              className="relative w-44 h-44 flex flex-col items-center justify-center rounded-2xl transition-all bg-zinc-900
              ring-1 ring-cyan-500/20 shadow-lg shadow-cyan-500/10 hover:scale-105 duration-300"
            >
              {item.integrated && (
                <button
                  className="absolute top-2 right-2 text-cyan-400 hover:text-white bg-zinc-800/80 rounded-full p-1"
                  onClick={() => {
                    setActiveSlot(index);
                    setShowConfig(true);
                  }}
                >
                  <Settings className="w-5 h-5" />
                </button>
              )}
              {item.integrated && item.marketplace ? (
                <>
                  <img
                    src={item.marketplace.logo}
                    alt="logo"
                    className="w-16 h-16 mb-3"
                  />
                  <div className="h-5 mb-2 text-sm text-cyan-300 text-center"></div>
                  <button onClick={() => handleRemove(index)} className={botaoClasse}>
                    Remover
                  </button>
                </>
              ) : (
                <button onClick={() => handleIntegrate(index)} className={botaoClasse}>
                  Integrar
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      {showConfig && (
        <ConfigModalML
          config={{ margemMinima: "", margemMaxima: "", imposto: "", extras: "" }}
          setConfig={() => {}}
          onClose={() => setShowConfig(false)}
          onSave={(data) => handleSaveConfig(activeSlot, data)}
        />
      )}
    </div>
  );
}
