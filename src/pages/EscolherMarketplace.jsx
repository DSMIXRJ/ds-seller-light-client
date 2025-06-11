// src/pages/EscolherMarketplace.jsx
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import logoML from "../assets/mercado-livre.png";
import logoShopee from "../assets/shopee.png";
import logoAmazon from "../assets/amazon.png";

const marketplaces = [
  { key: "ml", name: "Mercado Livre", logo: logoML },
  { key: "shopee", name: "Shopee", logo: logoShopee },
  { key: "amazon", name: "Amazon", logo: logoAmazon },
];

export default function EscolherMarketplace() {
  const location = useLocation();
  const navigate = useNavigate();
  const slotIndex = location.state?.slotIndex ?? 0;

  const handleSelect = (marketplace) => {
    const saved = JSON.parse(localStorage.getItem("ds_integrations") || "[]");
    saved[slotIndex] = { integrated: true, marketplace };
    localStorage.setItem("ds_integrations", JSON.stringify(saved));
    navigate("/integracoes");
  };

  return (
    <div className="flex min-h-screen text-white content-layer">
      <Sidebar />
      <div className="flex flex-1 flex-col items-center justify-center py-16 gap-10">
        <h1 className="text-2xl font-bold text-cyan-400">Escolha o Marketplace</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {marketplaces.map((mp) => (
            <button
              key={mp.key}
              onClick={() => handleSelect(mp)}
              className="flex flex-col items-center p-6 rounded-2xl bg-zinc-900 ring-1 ring-cyan-500/20 shadow-lg shadow-cyan-500/10 hover:scale-105 transition-all duration-300"
            >
              <img src={mp.logo} alt={mp.name} className="w-16 h-16 mb-2" />
              <span className="text-white font-bold">{mp.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
