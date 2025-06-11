import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import logoMercadoLivre from "../assets/mercado-livre.png";
import logoShopee from "../assets/shopee.png";
import logoAmazon from "../assets/amazon.png";
import { useEffect } from "react";

export default function EscolherMarketplace() {
  const location = useLocation();
  const navigate = useNavigate();
  const slotIndex = location.state?.slotIndex;

  useEffect(() => {
    if (slotIndex === undefined) {
      navigate("/integracoes");
    }
  }, [slotIndex, navigate]);

  const handleEscolher = (marketplace) => {
    const saved = JSON.parse(localStorage.getItem("ds_integrations") || "[]");
    const updated = Array(6).fill({ integrated: false, marketplace: null });

    if (Array.isArray(saved)) {
      saved.forEach((item, i) => {
        if (item && item.marketplace) updated[i] = item;
      });
    }

    updated[slotIndex] = { integrated: true, marketplace };
    localStorage.setItem("ds_integrations", JSON.stringify(updated));
    navigate("/integracoes");
  };

  const marketplaces = [
    { nome: "Mercado Livre", logo: logoMercadoLivre },
    { nome: "Shopee", logo: logoShopee },
    { nome: "Amazon", logo: logoAmazon },
  ];

  return (
    <div className="flex min-h-screen text-white content-layer">
      <Sidebar />
      <div className="flex flex-col flex-1 items-center py-16">
        <h1 className="text-3xl font-sans text-white mb-10 text-center">
          Escolher Integração
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {marketplaces.map((mp, index) => (
            <div
              key={index}
              onClick={() => handleEscolher(mp)}
              className="w-44 h-44 flex flex-col items-center justify-center rounded-2xl transition-all bg-zinc-900
              ring-1 ring-cyan-500/20 shadow-lg shadow-cyan-500/10 hover:scale-105 duration-300 cursor-pointer"
            >
              <img
                src={mp.logo}
                alt={mp.nome}
                className="w-20 h-20 mb-4"
              />
              <span className="text-sm font-sans text-white text-center">{mp.nome}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
