import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import ConfigModalML from "./ConfigModalML";
import { Settings } from "lucide-react";
import useMLStatus from "./useMLStatus";
import axios from "axios";

export default function Integracoes() {
  const [integrations, setIntegrations] = useState(
    Array(6).fill({ integrated: false, marketplace: null })
  );
  const [showConfig, setShowConfig] = useState(false);
  const [activeSlot, setActiveSlot] = useState(null);
  const { handleIntegrarML } = useMLStatus();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("ds_integrations") || "[]");
    const filled = Array(6).fill({ integrated: false, marketplace: null });

    // Verifica status real com backend
    axios.get("https://dsseller-backend-final.onrender.com/api/mercadolivre/status")
      .then((res) => {
        if (res.data.integrated) {
          filled[0] = {
            integrated: true,
            marketplace: {
              nome: "Mercado Livre",
              logo: "/ml-logo.png"
            }
          };
          setIntegrations(filled);
          localStorage.setItem("ds_integrations", JSON.stringify(filled));
        } else {
          // fallback pro que estava salvo no localStorage
          if (Array.isArray(saved) && saved.length > 0) {
            saved.forEach((item, i) => {
              if (item && item.marketplace) filled[i] = item;
            });
            setIntegrations(filled);
          }
        }
      })
      .catch(() => {
        // fallback se a API falhar
        if (Array.isArray(saved) && saved.length > 0) {
          saved.forEach((item, i) => {
            if (item && item.marketplace) filled[i] = item;
          });
        }
        setIntegrations(filled);
      });
  }, []);

  const handleRemove = (index) => {
    const updated = [...integrations];
    updated[index] = { integrated: false, marketplace: null };
    setIntegrations(updated);
    localStorage.setItem("ds_integrations", JSON.stringify(updated));
  };

  const handleSaveConfig = (slotIndex, configData) => {
    setShowConfig(false);
  };

  const botaoClasse =
    "w-24 h-9 rounded-xl font-sans text-white bg-zinc-800 border border-cyan-500/30 hover:bg-cyan-500/10 transition";

  return (
    <div className="flex min-h-screen text-white content-layer bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800">
      <Sidebar />
      <div className="flex flex-col flex-1 items-center py-16 min-h-[60vh]">
        <h1 className="text-3xl font-sans text-white mb-10 text-center">
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
                  className="absolute top-2 right-2 text-white font-sans bg-zinc-800/80 rounded-full p-1"
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
                  <div className="h-5 mb-2 text-sm text-white text-center font-sans"></div>
                  <button onClick={() => handleRemove(index)} className={botaoClasse}>
                    Remover
                  </button>
                </>
              ) : (
                <button onClick={handleIntegrarML} className={botaoClasse}>
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
