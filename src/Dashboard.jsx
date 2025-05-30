import { useState } from "react";
import { Menu, Home, Layers, LogOut, Bot } from "lucide-react";

// Importe as logos reais
import logoMercadoLivre from "./assets/mercado-livre.png";
import logoShopee from "./assets/shopee.png";
import logoAmazon from "./assets/amazon.png";

// Importe a tabela de produtos
import ProductTable from "./components/ProductTable";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [page, setPage] = useState("dashboard");
  const [filtro, setFiltro] = useState("Hoje");
  // Estado visual para simular integração Mercado Livre
  const [mlIntegrado, setMlIntegrado] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 text-zinc-50">
      {/* Sidebar com borda neon/flutuante */}
      <aside
        className={`relative z-10 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-56" : "w-16"
        } bg-zinc-900/95 border-r border-zinc-800 flex flex-col py-6 px-2
        before:content-[''] before:absolute before:inset-0 before:rounded-3xl 
        before:border-4 before:border-cyan-400 before:blur before:opacity-60 
        before:pointer-events-none before:animate-pulse`}
        style={{ boxShadow: "0 0 24px 6px #06b6d4cc" }}
      >
        {/* Logo IA */}
        <div className="mb-10 flex items-center justify-center relative z-20">
          <Bot className="w-10 h-10 text-cyan-400" />
        </div>
        {/* Menu Buttons */}
        <nav className="flex flex-col gap-4 flex-1 relative z-20">
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
          className="mt-10 mx-auto p-2 rounded-lg bg-zinc-800 hover:bg-cyan-900 transition relative z-20"
          title="Expandir/recolher menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        {/* Sair */}
        <button
          title="Sair"
          className="mt-8 text-red-400 hover:text-red-600 transition mx-auto relative z-20"
        >
          <LogOut className="w-6 h-6" />
        </button>
      </aside>
      {/* Conteúdo principal dinâmico */}
      <main className="flex-1 flex flex-col p-8 items-center justify-center">
        {page === "dashboard" && (
          <div className="w-full max-w-6xl">
            <h1 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-10 tracking-widest">
              Painel de Controle
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
            {/* Cards de métricas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-4">
              {/* Card 1 */}
              <div className="bg-zinc-800/90 rounded-2xl shadow-xl p-8 flex flex-col items-center border border-cyan-400 hover:shadow-cyan-400/30 transition"
                style={{ boxShadow: "0 0 16px 2px #06b6d4bb" }}>
                <span className="text-sm text-zinc-400 mb-2">Faturamento</span>
                <span className="text-2xl font-bold text-cyan-400">R$ 0,00</span>
              </div>
              {/* Card 2 */}
              <div className="bg-zinc-800/90 rounded-2xl shadow-xl p-8 flex flex-col items-center border border-cyan-400 hover:shadow-cyan-400/30 transition"
                style={{ boxShadow: "0 0 16px 2px #06b6d4bb" }}>
                <span className="text-sm text-zinc-400 mb-2">Vendas</span>
                <span className="text-2xl font-bold text-cyan-400">0</span>
              </div>
              {/* Card 3 */}
              <div className="bg-zinc-800/90 rounded-2xl shadow-xl p-8 flex flex-col items-center border border-cyan-400 hover:shadow-cyan-400/30 transition"
                style={{ boxShadow: "0 0 16px 2px #06b6d4bb" }}>
                <span className="text-sm text-zinc-400 mb-2">Anúncios ativos</span>
                <span className="text-2xl font-bold text-cyan-400">0</span>
              </div>
            </div>
            <div className="text-zinc-300 text-sm mb-6">
              <em>Filtros e cards dinâmicos. Os dados serão integrados ao backend nas próximas etapas.</em>
            </div>
            {/* Tabela de anúncios integrada */}
            <ProductTable />
          </div>
        )}
        {page === "integracoes" && (
          <div className="w-full max-w-3xl flex flex-col items-center">
            <h1 className="text-3xl font-bold text-cyan-400 mb-10">
              Integrações de Marketplace
            </h1>
            <div className="flex flex-row gap-8">
              {/* Mercado Livre */}
              <div className="flex flex-col items-center gap-2 p-6 rounded-3xl bg-zinc-900 border-2 border-cyan-400 shadow-cyan-400/50 shadow-xl"
                   style={{ boxShadow: "0 0 24px 4px #ffe60066, 0 0 8px 1px #06b6d4aa" }}>
                <img src={logoMercadoLivre} alt="Mercado Livre" className="w-16 h-16 object-contain mb-2" />
                <span className="text-sm text-zinc-300 font-bold">Mercado Livre</span>
                <button
                  className="mt-2 px-4 py-1 rounded-xl bg-red-500 text-white shadow-red-400/70 shadow-lg font-bold hover:bg-red-700 transition text-sm"
                  style={{ borderRadius: "1.25rem", boxShadow: "0 0 12px #e63946cc" }}
                  onClick={() => {
                    window.location.href = "https://dsseller-backend-final.onrender.com/auth/meli";
                  }}
                >
                  Integrar
                </button>
              </div>
              {/* Shopee */}
              <div className="flex flex-col items-center gap-2 p-6 rounded-3xl bg-zinc-900 border-2 border-orange-400 shadow-orange-400/50 shadow-xl opacity-70"
                   style={{ boxShadow: "0 0 18px 2px #ff572266, 0 0 6px 1px #ff9800aa" }}>
                <img src={logoShopee} alt="Shopee" className="w-16 h-16 object-contain mb-2" />
                <span className="text-sm text-zinc-300 font-bold">Shopee</span>
                <button disabled className="mt-2 px-4 py-1 rounded-xl bg-orange-400/60 text-white font-bold opacity-60 cursor-not-allowed text-sm"
                  style={{ borderRadius: "1.25rem" }}>
                  Em breve
                </button>
              </div>
              {/* Amazon */}
              <div className="flex flex-col items-center gap-2 p-6 rounded-3xl bg-zinc-900 border-2 border-yellow-400 shadow-yellow-400/40 shadow-xl opacity-70"
                   style={{ boxShadow: "0 0 14px 2px #ffb30066, 0 0 6px 1px #ffeb3baa" }}>
                <img src={logoAmazon} alt="Amazon" className="w-16 h-16 object-contain mb-2" />
                <span className="text-sm text-zinc-300 font-bold">Amazon</span>
                <button disabled className="mt-2 px-4 py-1 rounded-xl bg-yellow-400/60 text-white font-bold opacity-60 cursor-not-allowed text-sm"
                  style={{ borderRadius: "1.25rem" }}>
                  Em breve
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
