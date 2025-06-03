import Sidebar from "../components/Sidebar";
import ProductTable from "../components/ProductTable";
import { useParams } from "react-router-dom";

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
      <main className="flex-1 flex flex-col p-8 items-center justify-center">
        <div className="w-full max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-10 tracking-widest">
            Anúncios — {nomes[integracao] || "Integração"}
          </h1>
          <ProductTable apiPath="/api/mercadolivre/items" />
        </div>
      </main>
    </div>
  );
}
