import { useState } from "react";
import { Menu, Home, Layers, LogOut, Bot } from "lucide-react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [page, setPage] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 text-zinc-50">
      {/* Sidebar */}
      <aside
        className={`transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-56" : "w-16"
        } bg-zinc-900/95 border-r border-zinc-800 flex flex-col py-6 px-2`}
      >
        {/* Logo IA */}
        <div className="mb-10 flex items-center justify-center">
          <Bot className="w-10 h-10 text-cyan-400" />
        </div>
        {/* Menu Buttons */}
        <nav className="flex flex-col gap-4 flex-1">
          <button
            onClick={() => setPage("dashboard")}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl text-lg font-medium transition ${
              page === "dashboard"
                ? "bg-cyan-900 text-cyan-300"
                : "hover:bg-zinc-800 text-zinc-200"
            }`}
            style={{ borderRadius: "1.25rem" }}
          >
            <Home className="w-6 h-6" />
            {sidebarOpen && <span>Dashboard</span>}
          </button>
          <button
            onClick={() => setPage("integracoes")}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl text-lg font-medium transition ${
              page === "integracoes"
                ? "bg-cyan-900 text-cyan-300"
                : "hover:bg-zinc-800 text-zinc-200"
            }`}
            style={{ borderRadius: "1.25rem" }}
          >
            <Layers className="w-6 h-6" />
            {sidebarOpen && <span>Integrações</span>}
          </button>
        </nav>
        {/* Colapsar Sidebar */}
        <button
          onClick={() => setSidebarOpen((s) => !s)}
          className="mt-10 mx-auto p-2 rounded-lg bg-zinc-800 hover:bg-cyan-900 transition"
          title="Expandir/recolher menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        {/* Sair */}
        <button
          title="Sair"
          className="mt-8 text-red-400 hover:text-red-600 transition mx-auto"
        >
          <LogOut className="w-6 h-6" />
        </button>
      </aside>
      {/* Conteúdo principal dinâmico */}
      <main className="flex-1 flex flex-col p-8 items-center justify-center">
        {page === "dashboard" && (
          <div className="w-full max-w-6xl">
            {/* Cards e filtros do dashboard virão aqui nos próximos passos */}
            <h1 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-10 tracking-widest">
              Painel de Controle
            </h1>
            <div className="text-zinc-300 mb-2">
              <em>Aqui você verá métricas, vendas e filtros inteligentes.</em>
            </div>
          </div>
        )}
        {page === "integracoes" && (
          <div className="w-full max-w-3xl flex flex-col items-center">
            {/* Aqui virá o conteúdo de integrações no próximo passo */}
            <h1 className="text-3xl font-bold text-cyan-400 mb-10">
              Integrações de Marketplace
            </h1>
            <div className="text-zinc-300 mb-2">
              <em>Conecte ou gerencie suas integrações Mercado Livre, Shopee, Amazon...</em>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
