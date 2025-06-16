import { useState } from "react";

const marketplaces = [
  { nome: "Mercado Livre", id: "ml" },
  { nome: "Shopee", id: "shopee" },
  { nome: "Magalu", id: "magalu" },
  { nome: "Amazon", id: "amazon" },
];

export default function IntegrarDropdown({ onIntegrar }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="px-6 py-2 rounded-xl font-semibold border-2 border-cyan-400 text-cyan-300 bg-zinc-900/80 shadow transition-all flex items-center gap-2"
        onClick={() => setOpen((v) => !v)}
        tabIndex={0}
      >
        Integrar
        <span className="ml-2">
          <svg width={18} height={18} viewBox="0 0 20 20" fill="none"><path d="M6 8L10 12L14 8" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
        </span>
      </button>
      {open && (
        <div className="absolute left-0 top-12 w-40 bg-zinc-900 border border-cyan-500 rounded-xl shadow-lg z-50">
          {marketplaces.map((mp) => (
            <button
              key={mp.id}
              className="w-full px-4 py-2 text-left text-cyan-300 hover:bg-cyan-800 hover:text-white rounded-xl transition-all"
              onClick={() => {
                setOpen(false);
                onIntegrar(mp.id);
              }}
            >
              {mp.nome}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
