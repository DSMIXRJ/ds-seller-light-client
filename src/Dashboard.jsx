import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Home, Zap, TrendingUp, Link } from 'lucide-react';

const cards = [
  {
    title: 'Anúncios Ativos',
    value: '23',
    icon: <Zap size={28} />,
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  {
    title: 'Vendas Hoje',
    value: '12',
    icon: <TrendingUp size={28} />,
    bg: 'bg-green-50',
    border: 'border-green-200',
  },
  {
    title: 'Contas Integradas',
    value: '2',
    icon: <Link size={28} />,
    bg: 'bg-purple-50',
    border: 'border-purple-200',
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(true);

  const sair = () => {
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-blue-50">
      {/* Sidebar */}
      <aside
        className={`${
          menuAberto ? 'w-64' : 'w-20'
        } transition-all duration-300 bg-white shadow-lg border-r border-gray-200 flex flex-col`}
      >
        <div className="flex items-center justify-between px-4 py-5 border-b">
          <span className={`font-extrabold text-lg tracking-wider text-blue-700 transition-all duration-300 ${menuAberto ? 'block' : 'hidden'}`}>
            <span className="text-blue-500">DS</span> SELLER
          </span>
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="text-gray-400"
            aria-label="Expandir ou retrair menu"
          >
            {menuAberto ? '◀' : '▶'}
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-blue-100 transition"
          >
            <Home size={22} />
            {menuAberto && <span className="font-medium">Dashboard</span>}
          </button>
          <button
            onClick={() => navigate('/integracoes')}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-blue-100 transition"
          >
            <Link size={22} />
            {menuAberto && <span className="font-medium">Integrações</span>}
          </button>
        </nav>
        <div className="px-4 pb-6">
          <button
            onClick={sair}
            className="flex items-center gap-2 text-red-500 px-3 py-2 w-full rounded-lg hover:bg-red-100 transition"
          >
            <LogOut size={20} />
            {menuAberto && <span>Sair</span>}
          </button>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 px-6 py-8">
        <div className="mb-6 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-900 tracking-tight mb-1">
              Dashboard <span className="text-blue-500">DS SELLER LIGHT</span>
            </h1>
            <p className="text-gray-500 text-lg">Bem-vindo de volta! Veja o resumo das suas operações.</p>
          </div>
        </div>

        {/* Cards de métricas */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`rounded-2xl shadow ${card.bg} ${card.border} border p-6 flex flex-col items-start transition hover:scale-[1.025]`}
            >
              <div className="mb-2 text-blue-500">{card.icon}</div>
              <div className="text-4xl font-extrabold text-gray-800 mb-1">{card.value}</div>
              <div className="text-lg text-gray-500">{card.title}</div>
            </div>
          ))}
        </section>

        {/* Espaço reservado para novas funcionalidades */}
        <div className="p-6 bg-white rounded-2xl shadow flex items-center justify-center text-gray-400 text-xl">
          <span className="animate-pulse">Em breve: Painel com dados reais de anúncios, vendas e integração Mercado Livre.</span>
        </div>
      </main>
    </div>
  );
}
