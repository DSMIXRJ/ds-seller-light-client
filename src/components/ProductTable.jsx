import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { integracao } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const backendUrl = "https://dsseller-backend-final.onrender.com";
        const response = await axios.get(`${backendUrl}/api/mercadolivre/items`);

        const data = response.data.map((p) => ({
          ...p,
          // Manter o SKU que vem do backend
          precoCusto: 0,
          precoVendaMasked: formatCurrency(p.precoVenda),
          precoCustoMasked: "",
          lucroPercentual: "0.00%",
          lucroReais: "R$ 0,00",
          lucroTotal: "R$ 0,00",
        }));
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar anúncios.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [integracao]);

  const formatCurrency = (value) => {
    const numeric = value.toString().replace(/\D/g, "");
    const number = parseFloat(numeric) / 100;
    return number.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  const parseCurrency = (masked) => {
    const onlyNumbers = masked.replace(/\D/g, "");
    return parseFloat(onlyNumbers) / 100;
  };

  const handleMaskedChange = (id, field, rawValue) => {
    const numericValue = parseCurrency(rawValue);
    const masked = formatCurrency(rawValue);

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = { ...p };

          if (field === "precoVenda") {
            updated.precoVenda = numericValue;
            updated.precoVendaMasked = masked;
          }

          if (field === "precoCusto") {
            updated.precoCusto = numericValue;
            updated.precoCustoMasked = masked;
          }

          const lucroReais = updated.precoVenda - updated.precoCusto;
          const lucroPercentual = updated.precoVenda > 0 ? ((lucroReais / updated.precoVenda) * 100) : 0;
          const lucroTotal = lucroReais * (updated.vendas || 0);

          updated.lucroReais = formatCurrency(lucroReais.toFixed(2));
          updated.lucroPercentual = lucroPercentual.toFixed(2) + "%";
          updated.lucroTotal = formatCurrency(lucroTotal.toFixed(2));

          return updated;
        }
        return p;
      })
    );
  };

  if (loading) return (
    <div className="bg-[#101420] text-white rounded-2xl shadow-xl p-8 text-center">
      <div className="animate-pulse">Carregando anúncios...</div>
    </div>
  );
  
  if (error) return (
    <div className="bg-[#101420] text-red-500 rounded-2xl shadow-xl p-8 text-center">
      {error}
    </div>
  );

  return (
    <div className="bg-[#101420] text-white rounded-2xl shadow-xl p-6 w-full">
      {/* Indicador de scroll horizontal */}
      <div className="mb-4 text-xs text-gray-400 text-center">
        {products.length > 0 && "← Role horizontalmente para ver todas as colunas →"}
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full table-fixed min-w-[1600px]">
          <thead className="bg-[#181c2f] text-xs uppercase">
            <tr>
              <th className="px-3 py-4 text-left w-[100px]">Imagem</th>
              <th className="px-3 py-4 text-center w-[140px]">SKU</th>
              <th className="px-3 py-4 text-center w-[100px]">Estoque</th>
              <th className="px-3 py-4 text-left w-[400px]">Título</th>
              <th className="px-3 py-4 text-center w-[140px]">Preço</th>
              <th className="px-3 py-4 text-center w-[140px]">Custo</th>
              <th className="px-3 py-4 text-center w-[120px]">Lucro %</th>
              <th className="px-3 py-4 text-center w-[140px]">Lucro (R$)</th>
              <th className="px-3 py-4 text-center w-[160px]">Lucro Total</th>
              <th className="px-3 py-4 text-center w-[120px]">Visitas</th>
              <th className="px-3 py-4 text-center w-[120px]">Vendas</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id} className="border-b border-[#23243a] hover:bg-[#1a1f35] transition-colors">
                <td className="px-3 py-4 text-left w-[100px]">
                  <img src={prod.image} alt="" className="w-14 h-14 rounded object-cover" />
                </td>
                <td className="px-3 py-4 w-[140px]">
                  <div className="inline-block border-b-2 border-white px-2 py-1 min-w-[120px] text-center text-sm">
                    {prod.sku}
                  </div>
                </td>
                <td className="px-3 py-4 w-[100px]">
                  <div className="inline-block border-b-2 border-indigo-400 px-2 py-1 min-w-[80px] text-center text-sm">
                    {prod.estoque}
                  </div>
                </td>
                <td className="px-3 py-4 text-left w-[400px]">
                  <div className="w-full break-words leading-tight text-sm pr-2" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    lineHeight: '1.4'
                  }} title={prod.title}>
                    {prod.title}
                  </div>
                </td>
                <td className="px-3 py-4 w-[140px]">
                  <input
                    type="text"
                    value={prod.precoVendaMasked}
                    onChange={(e) => handleMaskedChange(prod.id, "precoVenda", e.target.value)}
                    className="w-full text-center bg-transparent border-b-2 border-cyan-500 focus:outline-none focus:border-cyan-300 py-1 text-sm"
                    inputMode="numeric"
                  />
                </td>
                <td className="px-3 py-4 w-[140px]">
                  <input
                    type="text"
                    value={prod.precoCustoMasked}
                    onChange={(e) => handleMaskedChange(prod.id, "precoCusto", e.target.value)}
                    className="w-full text-center bg-transparent border-b-2 border-yellow-400 focus:outline-none focus:border-yellow-300 py-1 text-sm"
                    inputMode="numeric"
                  />
                </td>
                <td className="px-3 py-4 w-[120px]">
                  <div className="inline-block border-b-2 border-green-500 px-2 py-1 min-w-[100px] text-center text-sm">
                    {prod.lucroPercentual}
                  </div>
                </td>
                <td className="px-3 py-4 w-[140px]">
                  <div className="inline-block border-b-2 border-blue-500 px-2 py-1 min-w-[120px] text-center text-sm">
                    {prod.lucroReais}
                  </div>
                </td>
                <td className="px-3 py-4 w-[160px]">
                  <div className="inline-block border-b-2 border-purple-500 px-2 py-1 min-w-[140px] text-center text-sm">
                    {prod.lucroTotal}
                  </div>
                </td>
                <td className="px-3 py-4 w-[120px]">
                  <div className="inline-block border-b-2 border-pink-500 px-2 py-1 min-w-[100px] text-center text-sm font-medium">
                    {prod.visitas || 0}
                  </div>
                </td>
                <td className="px-3 py-4 w-[120px]">
                  <div className="inline-block border-b-2 border-orange-500 px-2 py-1 min-w-[100px] text-center text-sm font-medium">
                    {prod.vendas || 0}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Resumo da tabela */}
      {products.length > 0 && (
        <div className="mt-4 text-xs text-gray-400 text-center">
          Exibindo {products.length} anúncios • Todas as colunas visíveis: Imagem, SKU, Estoque, Título, Preço, Custo, Lucro %, Lucro (R$), Lucro Total, Visitas, Vendas
        </div>
      )}
    </div>
  );
}
