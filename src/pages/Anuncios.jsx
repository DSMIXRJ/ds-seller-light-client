import Sidebar from "../components/Sidebar";
import ProductTable from "../components/ProductTable";
import { useParams } from "react-router-dom";

// Nomes amigáveis das integrações
const nomes = {
  ml: "Mercado Livre",
  shopee: "Shopee",
  amazon: "Amazon",
};

export default function Anuncios() {
  const { integracao } = useParams();
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 text-zinc-50">
      <Sidebar activePage="anuncios" />
      <main className="flex-1 flex flex-col items-center ml-56">
        <div className="w-full max-w-6xl fixed top-0 left-56 right-0 z-20 bg-zinc-950/95 p-8 border-b border-zinc-800">
          <h1 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-10 tracking-widest">
            Anúncios — {nomes[integracao] || "Integração"}
          </h1>
        </div>
        <div className="w-full max-w-6xl pt-[120px]">
          <ProductTable />
        </div>
      </main>
    </div>
  );
}
