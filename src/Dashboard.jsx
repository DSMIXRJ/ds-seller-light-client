import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(true);

  const handleNavegar = (rota) => {
    navigate(rota);
  };

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div
        className={`${
          menuAberto ? 'w-64' : 'w-20'
        } bg-white border-r transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className={`text-xl font-bold ${menuAberto ? 'block' : 'hidden'}`}>
            DS SELLER
          </h1>
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="text-gray-600"
          >
            {menuAberto ? '◀' : '▶'}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-4">
          <button
            onClick={() => handleNavegar('/dashboard')}
            className="w-full flex items-center space-x-2 text-left px-4 py-2 rounded hover:bg-blue-100"
          >
            <span>🏠</span>
            {menuAberto && <span>Dashboard</span>}
          </button>

          <button
            onClick={() => handleNavegar('/integracoes')}
            className="w-full flex items-center space-x-2 text-left px-4 py-2 rounded hover:bg-blue-100"
          >
            <span>🔗</span>
            {menuAberto && <span>Integrações</span>}
          </button>
        </nav>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
        <p className="text-gray-700">
          Bem-vindo ao seu painel, aqui você verá futuramente os dados dos seus anúncios, desempenho e muito mais.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
