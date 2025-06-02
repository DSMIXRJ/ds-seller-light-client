import { useState, useEffect } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 text-zinc-50">
      <Sidebar activePage="anuncios" />
      <main className="flex-1 ml-56 flex flex-col p-8">
        <div className="w-full max-w-6xl mx-auto">
          {/* Cabeçalho fixo */}
          <div className="sticky top-0 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-800 pt-4 pb-6 z-10">
            <h1 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-6 tracking-widest">
              Anúncios — {nomes[integracao] || "Integração"}
            </h1>
            
            {/* Filtros e botões fixos */}
            <div className="flex flex-wrap gap-4 mb-4">
              <input 
                type="text" 
                placeholder="Buscar anúncios..." 
                className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-200 focus:border-cyan-400 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select 
                className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-200 focus:border-cyan-400 focus:outline-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Todos os status</option>
                <option value="active">Ativos</option>
                <option value="paused">Pausados</option>
              </select>
              <button className="px-4 py-2 bg-cyan-700 text-cyan-100 rounded-xl hover:bg-cyan-600 transition">
                Atualizar
              </button>
            </div>
          </div>
          
          {/* Tabela com rolagem */}
          <div className="overflow-auto">
            <ProductTable searchTerm={searchTerm} statusFilter={statusFilter} />
          </div>
        </div>
      </main>
    </div>
  );
}
