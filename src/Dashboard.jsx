import { useState } from "react";
import { Menu, Home, Layers, LogOut, Bot } from "lucide-react";

// SVG logos simplificados para IA visual
const LogoMercadoLivre = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
    <ellipse cx="19" cy="19" rx="18" ry="13" fill="#FFE600" stroke="#222" strokeWidth="2"/>
    <path d="M11 19c2.5 2 6 2 8 0" stroke="#222" strokeWidth="2" fill="none"/>
    <ellipse cx="19" cy="19" rx="10" ry="5" fill="none" stroke="#222" strokeWidth="1.5"/>
  </svg>
);
const LogoShopee = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
    <rect x="6" y="10" width="26" height="20" rx="5" fill="#FF5722"/>
    <rect x="10" y="6" width="18" height="10" rx="5" fill="#FFF"/>
    <text x="19" y="22" fontSize="10" fill="#FFF" fontWeight="bold" textAnchor="middle">S</text>
  </svg>
);
const LogoAmazon = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
    <ellipse cx="19" cy="20" rx="12" ry="7" fill="#FF9900"/>
    <text x="19" y="25" fontSize="10" fill="#222" fontWeight="bold" textAnchor="middle">a</text>
    <path d="M12 25 Q19 32 26 25" stroke="#222" strokeWidth="2" fill="none"/>
  </svg>
);

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [page, setPage] = useState("dashboard");
  const [filtro, setFiltro] = useState("Hoje");

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
            <div className="text-zinc-300 text-sm">
              <em>Filtros e cards dinâmicos. Os dados serão integrados ao backend nas próximas etapas.</em>
            </div>
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
                <LogoMercadoLivre />
                <span className="text-sm text-zinc-300 font-bold">Mercado Livre</span>
                <button className="mt-2 px-4 py-1 rounded-xl bg-cyan-500 text-white shadow-cyan-400/70 shadow-lg font-bold hover:bg-cyan-700 transition text-sm"
                  style={{ borderRadius: "1.25rem", boxShadow: "0 0 12px #06b6d4cc" }}>
                  Integrar
                </button>
              </div>
              {/* Shopee */}
              <div className="flex flex-col items-center gap-2 p-6 rounded-3xl bg-zinc-900 border-2 border-orange-400 shadow-orange-400/50 shadow-xl opacity-70"
                   style={{ boxShadow: "0 0 18px 2px #ff572266, 0 0 6px 1px #ff9800aa" }}>
                <LogoShopee />
                <span className="text-sm text-zinc-300 font-bold">Shopee</span>
                <button disabled className="mt-2 px-4 py-1 rounded-xl bg-orange-400/60 text-white font-bold opacity-60 cursor-not-allowed text-sm"
                  style={{ borderRadius: "1.25rem" }}>
                  Em breve
                </button>
              </div>
              {/* Amazon */}
              <div className="flex flex-col items-center gap-2 p-6 rounded-3xl bg-zinc-900 border-2 border-yellow-400 shadow-yellow-400/40 shadow-xl opacity-70"
                   style={{ boxShadow: "0 0 14px 2px #ffb30066, 0 0 6px 1px #ffeb3baa" }}>
                <LogoAmazon />
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
