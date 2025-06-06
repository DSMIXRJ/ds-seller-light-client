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
    <div className="bg-[#101420] text-white rounded-2xl shadow-xl p-4 w-full">
      {/* Indicador de cabeçalho fixo */}
      <div className="mb-3 text-xs text-gray-400 text-center">
        {products.length > 0 && (
          <div className="flex items-center justify-center gap-2">
            <span className="text-cyan-400">✓ Todas as colunas visíveis</span>
            <span>• Cabeçalho fixo ativo</span>
          </div>
        )}
      </div>
      
      <div className="w-full">
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr className="bg-[#181c2f] text-xs uppercase sticky top-0 z-50" style={{ position: 'sticky', top: '0px' }}>
              <th className="px-1 py-3 text-center w-[60px] bg-[#181c2f] border-b-2 border-cyan-500/50">Img</th>
              <th className="px-1 py-3 text-center w-[80px] bg-[#181c2f] border-b-2 border-cyan-500/50">SKU</th>
              <th className="px-1 py-3 text-center w-[50px] bg-[#181c2f] border-b-2 border-cyan-500/50">Est</th>
              <th className="px-1 py-3 text-center w-[200px] bg-[#181c2f] border-b-2 border-cyan-500/50">Título</th>
              <th className="px-1 py-3 text-center w-[80px] bg-[#181c2f] border-b-2 border-cyan-500/50">Preço</th>
              <th className="px-1 py-3 text-center w-[80px] bg-[#181c2f] border-b-2 border-cyan-500/50">Custo</th>
              <th className="px-1 py-3 text-center w-[60px] bg-[#181c2f] border-b-2 border-cyan-500/50">%</th>
              <th className="px-1 py-3 text-center w-[80px] bg-[#181c2f] border-b-2 border-cyan-500/50">Lucro</th>
              <th className="px-1 py-3 text-center w-[90px] bg-[#181c2f] border-b-2 border-cyan-500/50">Total</th>
              <th className="px-1 py-3 text-center w-[70px] bg-[#181c2f] border-b-2 border-cyan-500/50">Visit</th>
              <th className="px-1 py-3 text-center w-[70px] bg-[#181c2f] border-b-2 border-cyan-500/50">Vend</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id} className="border-b border-[#23243a] hover:bg-[#1a1f35] transition-colors">
                <td className="px-1 py-2 text-left w-[60px]">
                  <img src={prod.image} alt="" className="w-8 h-8 rounded object-cover" />
                </td>
                <td className="px-1 py-2 w-[80px]">
                  <div className="inline-block border-b-2 border-white px-1 py-1 text-center text-xs truncate w-full">
                    {prod.sku}
                  </div>
                </td>
                <td className="px-1 py-2 w-[50px]">
                  <div className="inline-block border-b-2 border-indigo-400 px-1 py-1 text-center text-xs">
                    {prod.estoque}
                  </div>
                </td>
                <td className="px-1 py-2 text-left w-[200px]">
                  <div className="w-full break-words leading-tight text-xs" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    lineHeight: '1.2'
                  }} title={prod.title}>
                    {prod.title}
                  </div>
                </td>
                <td className="px-1 py-2 w-[80px]">
                  <input
                    type="text"
                    value={prod.precoVendaMasked}
                    onChange={(e) => handleMaskedChange(prod.id, "precoVenda", e.target.value)}
                    className="w-full text-center bg-transparent border-b-2 border-cyan-500 focus:outline-none py-1 text-xs"
                    inputMode="numeric"
                  />
                </td>
                <td className="px-1 py-2 w-[80px]">
                  <input
                    type="text"
                    value={prod.precoCustoMasked}
                    onChange={(e) => handleMaskedChange(prod.id, "precoCusto", e.target.value)}
                    className="w-full text-center bg-transparent border-b-2 border-yellow-400 focus:outline-none py-1 text-xs"
                    inputMode="numeric"
                  />
                </td>
                <td className="px-1 py-2 w-[60px]">
                  <div className="inline-block border-b-2 border-green-500 px-1 py-1 text-center text-xs">
                    {prod.lucroPercentual}
                  </div>
                </td>
                <td className="px-1 py-2 w-[80px]">
                  <div className="inline-block border-b-2 border-blue-500 px-1 py-1 text-center text-xs truncate w-full">
                    {prod.lucroReais}
                  </div>
                </td>
                <td className="px-1 py-2 w-[90px]">
                  <div className="inline-block border-b-2 border-purple-500 px-1 py-1 text-center text-xs truncate w-full">
                    {prod.lucroTotal}
                  </div>
                </td>
                <td className="px-1 py-2 w-[70px]">
                  <div className="inline-block border-b-2 border-pink-500 px-1 py-1 text-center text-xs font-medium">
                    {prod.visitas || 0}
                  </div>
                </td>
                <td className="px-1 py-2 w-[70px]">
                  <div className="inline-block border-b-2 border-orange-500 px-1 py-1 text-center text-xs font-medium">
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
        <div className="mt-3 text-xs text-gray-400 text-center">
          Exibindo {products.length} anúncios • Layout: 960px total • Sem scroll horizontal
        </div>
      )}
    </div>
  );
}
