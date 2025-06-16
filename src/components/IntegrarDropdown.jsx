import { useState } from "react";

const marketplaces = [
  { nome: "Mercado Livre", id: "ml" },
  { nome: "Shopee", id: "shopee" },
  { nome: "Magalu", id: "magalu" },
  { nome: "Amazon", id: "amazon" },
];

export default function IntegrarDropdown({ onIntegrar }) {
  const [open, setOpen] = useState(false);

  // Para posição correta do dropdown
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleButtonClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    setCoords({ x: rect.left, y: rect.bottom });
    setOpen((v) => !v);
  };

  return (
    <div className="relative">
      <button
        className="px-6 py-2 rounded-xl font-semibold border-2 border-cyan-400 text-cyan-300 bg-zinc-900/80 shadow transition-all flex items-center gap-2"
        onClick={handleButtonClick}
        tabIndex={0}
      >
        Integrar
        <span className="ml-2">
          <svg width={18} height={18} viewBox="0 0 20 20" fill="none"><path d="M6 8L10 12L14 8" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
        </span>
      </button>
      {open && (
        <div
          style={{
            position: "fixed",
            top: coords.y + 4,
            left: coords.x,
            width: "160px",
            zIndex: 9999,
          }}
          className="bg-zinc-900 border border-cyan-500 rounded-xl shadow-lg"
          onMouseLeave={() => setOpen(false)}
        >
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
