import { useState } from "react";
import Sidebar from "./components/Sidebar";

// Dados simulados para o dashboard
const stats = [
  {
    title: "Faturamento (R$)",
    value: "2.450,00",
    change: "+12%",
    description: "em relação à semana passada",
    color: "cyan",
  },
  {
    title: "Vendas",
    value: "26",
    change: "+8%",
    description: "em relação à semana passada",
    color: "green",
  },
  {
    title: "Visitas",
    value: "3.120",
    change: "+5%",
    description: "em relação à semana passada",
    color: "yellow",
  },
];

export default function Dashboard() {
  const [filtro, setFiltro] = useState("Hoje");

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 text-zinc-50">
      <Sidebar
        activePage="dashboard"
        onIntegracoesClick={() => window.location.href = "/dashboard"}
      />
      <main className="flex-1 flex flex-col p-8 items-center justify-center">
        <div className="w-full max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-10 tracking-widest">
            Painel de Estatísticas
          </h1>
          {/* Filtros de período */}
          <div className="flex gap-4 mb-8">
            {["Hoje", "7 dias", "30 dias", "Total"].map((opcao) => (
              <button
                key={opcao}
                className={`px-6 py-2 rounded-xl font-semibold border-2 transition ${
                  filtro === opcao
                    ? "bg-cyan-900 border-cyan-400 text-cyan-300 shadow-cyan-400/30 shadow-lg"
                    : "bg-zinc-800 border-zinc-700 text-zinc-200 hover:border-cyan-400"
                }`}
                style={{ borderRadius: "1.25rem" }}
                onClick={() => setFiltro(opcao)}
              >
                {opcao}
              </button>
            ))}
          </div>
          {/* Cards de estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`bg-zinc-800/90 rounded-2xl shadow-xl p-8 flex flex-col items-center border border-${stat.color}-400 hover:shadow-${stat.color}-400/30 transition`}
                style={{ boxShadow: `0 0 16px 2px var(--tw-shadow-color, #06b6d4bb)` }}
              >
                <span className="text-sm text-zinc-400 mb-2">{stat.title}</span>
                <span className={`text-2xl font-bold text-${stat.color}-400`}>{stat.value}</span>
                <span className="text-xs mt-1 text-zinc-300">{stat.change} <span className="text-zinc-400">{stat.description}</span></span>
              </div>
            ))}
          </div>
          {/* Pode adicionar gráficos ou métricas extras aqui */}
          <div className="text-zinc-400 text-sm text-center opacity-70">
            Estatísticas simuladas. Integração real em breve.
          </div>
        </div>
      </main>
    </div>
  );
}
