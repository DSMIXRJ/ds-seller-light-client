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

  if (loading) return <div className="text-white p-8">Carregando...</div>;
  if (error) return <div className="text-red-500 p-8">{error}</div>;

  return (
    <div className="bg-[#101420] text-white rounded-2xl shadow-xl p-4 overflow-x-auto w-full">
      <div className="min-w-[1400px]"> {/* Garantir largura mínima para todas as colunas */}
        <table className="w-full table-auto">
        <thead className="bg-[#181c2f] text-xs uppercase text-center">
          <tr>
            <th className="px-2 py-3 text-left w-[80px]">Imagem</th>
            <th className="px-2 py-3 text-center w-[120px]">SKU</th>
            <th className="px-2 py-3 text-center w-[80px]">Estoque</th>
            <th className="px-2 py-3 text-left w-[320px]">Título</th>
            <th className="px-2 py-3 text-center w-[120px]">Preço</th>
            <th className="px-2 py-3 text-center w-[120px]">Custo</th>
            <th className="px-2 py-3 text-center w-[100px]">Lucro %</th>
            <th className="px-2 py-3 text-center w-[120px]">Lucro (R$)</th>
            <th className="px-2 py-3 text-center w-[140px]">Lucro Total</th>
            <th className="px-2 py-3 text-center w-[90px]">Visitas</th>
            <th className="px-2 py-3 text-center w-[90px]">Vendas</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id} className="border-b border-[#23243a] text-center">
              <td className="px-2 py-3 text-left w-[80px]">
                <img src={prod.image} alt="" className="w-12 h-12 rounded" />
              </td>
              <td className="px-2 py-3 w-[120px]">
                <div className="inline-block border-b-2 border-white px-1 min-w-[96px] text-center">
                  {prod.sku}
                </div>
              </td>
              <td className="px-2 py-3 w-[80px]">
                <div className="inline-block border-b-2 border-indigo-400 px-1 min-w-[60px] text-center">
                  {prod.estoque}
                </div>
              </td>
              <td className="px-2 py-3 text-left align-top w-[320px] max-w-[320px]">
                <div className="w-full break-words leading-tight text-sm" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  lineHeight: '1.3'
                }} title={prod.title}>
                  {prod.title}
                </div>
              </td>
              <td className="px-2 py-3 w-[120px]">
                <input
                  type="text"
                  value={prod.precoVendaMasked}
                  onChange={(e) => handleMaskedChange(prod.id, "precoVenda", e.target.value)}
                  className="text-center bg-transparent border-b-2 border-cyan-500 focus:outline-none min-w-[120px]"
                  inputMode="numeric"
                />
              </td>
              <td className="px-2 py-3 w-[120px]">
                <input
                  type="text"
                  value={prod.precoCustoMasked}
                  onChange={(e) => handleMaskedChange(prod.id, "precoCusto", e.target.value)}
                  className="text-center bg-transparent border-b-2 border-yellow-400 focus:outline-none min-w-[120px]"
                  inputMode="numeric"
                />
              </td>
              <td className="px-2 py-3 w-[100px]">
                <div className="inline-block border-b-2 border-green-500 px-1 min-w-[96px] text-center">
                  {prod.lucroPercentual}
                </div>
              </td>
              <td className="px-2 py-3 w-[120px]">
                <div className="inline-block border-b-2 border-blue-500 px-1 min-w-[120px] text-center">
                  {prod.lucroReais}
                </div>
              </td>
              <td className="px-2 py-3 w-[140px]">
                <div className="inline-block border-b-2 border-purple-500 px-1 min-w-[140px] text-center">
                  {prod.lucroTotal}
                </div>
              </td>
              <td className="px-2 py-3 w-[90px]">
                <div className="inline-block border-b-2 border-pink-500 px-1 min-w-[80px] text-center">
                  {prod.visitas}
                </div>
              </td>
              <td className="px-2 py-3 w-[90px]">
                <div className="inline-block border-b-2 border-orange-500 px-1 min-w-[80px] text-center">
                  {prod.vendas}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  );
}
