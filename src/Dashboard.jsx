// Forçar novo deploy Netlify
import React from 'react';

const Dashboard = () => {
  const anuncios = [
    {
      imagem: 'https://via.placeholder.com/50',
      titulo: 'Plafon de Madeira 35cm',
      margem: '25%',
      visitas: 432,
      vendas: 36,
      lucroMedio: 'R$ 18,00',
      lucroTotal: 'R$ 648,00'
    },
    {
      imagem: 'https://via.placeholder.com/50',
      titulo: 'Luminária Redonda 30cm',
      margem: '30%',
      visitas: 318,
      vendas: 28,
      lucroMedio: 'R$ 22,50',
      lucroTotal: 'R$ 630,00'
    },
    {
      imagem: 'https://via.placeholder.com/50',
      titulo: 'Plafon Quadrado Freijó',
      margem: '20%',
      visitas: 210,
      vendas: 19,
      lucroMedio: 'R$ 15,00',
      lucroTotal: 'R$ 285,00'
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 flex items-center gap-2">
          <span role="img" aria-label="ícone">📊</span>
          Na Aba <span className="text-blue-700">Anúncios</span>
        </h2>

        <div className="overflow-x-auto rounded shadow">
          <table className="min-w-full bg-white rounded text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="text-left px-4 py-3">Imagem do Produto</th>
                <th className="text-left px-4 py-3">Produto</th>
                <th className="text-center px-4 py-3">Margem Atual</th>
                <th className="text-center px-4 py-3">Visitas</th>
                <th className="text-center px-4 py-3">Vendas</th>
                <th className="text-center px-4 py-3">Lucro Médio</th>
                <th className="text-center px-4 py-3">Lucro Total</th>
              </tr>
            </thead>
            <tbody>
              {anuncios.map((item, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <img src={item.imagem} alt="Produto" className="w-12 h-12 object-cover rounded" />
                  </td>
                  <td className="px-4 py-3 text-gray-800">{item.titulo}</td>
                  <td className="px-4 py-3 text-center text-blue-600">{item.margem}</td>
                  <td className="px-4 py-3 text-center">{item.visitas}</td>
                  <td className="px-4 py-3 text-center">{item.vendas}</td>
                  <td className="px-4 py-3 text-center">{item.lucroMedio}</td>
                  <td className="px-4 py-3 text-center text-green-600">{item.lucroTotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
