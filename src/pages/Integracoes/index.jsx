// src/pages/Integracoes/index.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { Settings } from "lucide-react";

export default function Integracoes() {
  const navigate = useNavigate();
  const [integrations, setIntegrations] = useState(
    Array(6).fill({ integrated: false, marketplace: null })
  );

  const handleIntegrate = (index) => {
    navigate("/escolher-marketplace", { state: { slotIndex: index } });
  };

  const handleRemove = (index) => {
    const updated = [...integrations];
    updated[index] = { integrated: false, marketplace: null };
    setIntegrations(updated);
  };

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
              className={`relative w-44 h-44 flex flex-col items-center justify-center rounded-2xl transition-all bg-zinc-900
                ring-1 ring-cyan-500/20 shadow-lg shadow-cyan-500/10 hover:scale-105 duration-300`}
            >
              {item.integrated && (
                <button
                  className="absolute top-2 right-2 text-cyan-400 hover:text-white bg-zinc-800/80 rounded-full p-1"
                  onClick={() => alert("Abrir configuração")}
                >
                  <Settings className="w-5 h-5" />
                </button>
              )}
              {item.integrated && item.marketplace ? (
                <img
                  src={item.marketplace.logo}
                  alt="logo"
                  className="w-12 h-12 mb-2"
                />
              ) : null}
              {item.integrated ? (
                <button
                  onClick={() => handleRemove(index)}
                  className="w-24 py-2 rounded-xl font-bold bg-cyan-600 text-white border border-cyan-400 shadow hover:bg-cyan-700"
                >
                  Remover
                </button>
              ) : (
                <button
                  onClick={() => handleIntegrate(index)}
                  className="w-24 py-2 rounded-xl font-bold text-cyan-400 border border-cyan-500/40 shadow shadow-cyan-400/20 hover:bg-cyan-400/10 hover:text-white transition"
                  style={{ backgroundColor: "transparent" }}
                >
                  Integrar
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
