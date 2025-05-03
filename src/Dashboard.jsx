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
    <div className="min-h-screen w-full p-6 font-sans bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">📊 Na Aba <span className="text-blue-700">Anúncios</span></h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-3">Imagem do Produto</th>
              <th className="p-3">Produto</th>
              <th className="p-3 text-center">Margem Atual</th>
              <th className="p-3 text-center">Visitas</th>
              <th className="p-3 text-center">Vendas</th>
              <th className="p-3 text-center">Lucro Médio</th>
              <th className="p-3 text-center">Lucro Total</th>
            </tr>
          </thead>
          <tbody>
            {anuncios.map((item, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="p-3"><img src={item.imagem} alt="Produto" className="w-12 h-12 object-cover" /></td>
                <td className="p-3">{item.titulo}</td>
                <td className="p-3 text-center">{item.margem}</td>
                <td className="p-3 text-center">{item.visitas}</td>
                <td className="p-3 text-center">{item.vendas}</td>
                <td className="p-3 text-center">{item.lucroMedio}</td>
                <td className="p-3 text-center">{item.lucroTotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
