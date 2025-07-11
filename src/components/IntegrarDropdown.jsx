import { useState } from "react";

const marketplaces = [
  { nome: "Mercado Livre", id: "ml" },
  { nome: "Shopee",        id: "shopee" },
  { nome: "Magalu",        id: "magalu" },
  { nome: "Amazon",        id: "amazon" },
];

export default function IntegrarDropdown({ onIntegrar }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        className="px-6 py-2 rounded-xl font-semibold border-2 border-cyan-400 text-cyan-300 bg-zinc-900/80 shadow flex items-center gap-2"
        onClick={() => setOpen((v) => !v)}
      >
        Integrar
        <svg width={18} height={18} viewBox="0 0 20 20" className="ml-2">
          <path d="M6 8L10 12L14 8" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute left-0 top-full mt-2 w-40 bg-zinc-900 border border-cyan-500 rounded-xl shadow-lg"
          style={{ zIndex: 1000 }}
          onMouseLeave={() => setOpen(false)}
        >
          {marketplaces.map((mp) => (
            <button
              key={mp.id}
              className="w-full px-4 py-2 text-left text-cyan-300 hover:bg-cyan-800 hover:text-white transition"
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
