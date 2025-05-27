import { useState } from "react";
import { Menu, Home, BarChart3, Users, LogOut, Bot } from "lucide-react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 text-zinc-50">
      {/* Sidebar */}
      <aside
        className={`transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-20" : "w-14"
        } bg-zinc-900/95 border-r border-zinc-800 flex flex-col items-center py-6`}
      >
        {/* Logo ou ícone IA */}
        <div className="mb-8 flex items-center justify-center">
          <Bot className="w-8 h-8 text-cyan-400" />
        </div>
        {/* Menu Icons */}
        <nav className="flex flex-col gap-8 flex-1">
          <button title="Dashboard" className="hover:text-cyan-400 transition">
            <Home className="w-7 h-7" />
          </button>
          <button title="Métricas" className="hover:text-cyan-400 transition">
            <BarChart3 className="w-7 h-7" />
          </button>
          <button title="Usuários" className="hover:text-cyan-400 transition">
            <Users className="w-7 h-7" />
          </button>
        </nav>
        {/* Colapsar Sidebar */}
        <button
          onClick={() => setSidebarOpen((s) => !s)}
          className="mt-6 p-2 rounded-lg bg-zinc-800 hover:bg-cyan-900 transition"
          title="Ocultar menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        {/* Sair */}
        <button
          title="Sair"
          className="mt-6 text-red-400 hover:text-red-600 transition"
        >
          <LogOut className="w-6 h-6" />
        </button>
      </aside>
      {/* Conteúdo principal */}
      <main className="flex-1 flex flex-col p-8 items-center justify-center">
        {/* Título IA */}
        <h1 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-8 tracking-widest">
          DS SELLER LIGHT
        </h1>
        {/* Cards métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {/* Card 1 */}
          <div className="bg-zinc-800/90 rounded-2xl shadow-xl p-8 flex flex-col items-center border border-zinc-700 hover:shadow-cyan-700/20 transition">
            <BarChart3 className="w-10 h-10 text-cyan-400 mb-4" />
            <span className="text-2xl font-semibold">R$ 0,00</span>
            <span className="text-sm text-zinc-400">Faturamento Hoje</span>
          </div>
          {/* Card 2 */}
          <div className="bg-zinc-800/90 rounded-2xl shadow-xl p-8 flex flex-col items-center border border-zinc-700 hover:shadow-cyan-700/20 transition">
            <Users className=
