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
    <div className="bg-[#101420] text-white rounded-2xl shadow-xl p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-[#181c2f] text-xs uppercase text-center">
            <tr>
              <th className="px-3 py-2 text-left">Imagem</th>
              <th className="px-3 py-2 text-left">Estoque</th>
              <th className="px-3 py-2 text-left">Título</th>
              <th className="px-3 py-2 text-center">Preço</th>
              <th className="px-3 py-2 text-center">Custo</th>
              <th className="px-3 py-2 text-center">Lucro %</th>
              <th className="px-3 py-2 text-center">Lucro (R$)</th>
              <th className="px-3 py-2 text-center">Lucro Total</th>
              <th className="px-3 py-2 text-center">Vendas</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id} className="border-b border-[#23243a] text-center">
                <td className="px-3 py-2 text-left">
                  <img src={prod.image} alt="" className="w-12 h-12 rounded" />
                </td>
                <td className="px-3 py-2 text-left">{prod.estoque}</td>
                <td className="px-3 py-2 text-left">{prod.title}</td>

                {/* PREÇO (input editável) */}
                <td className="px-3 py-2">
                  <input
                    type="text"
                    value={prod.precoVendaMasked}
                    onChange={(e) => handleMaskedChange(prod.id, "precoVenda", e.target.value)}
                    className="text-center bg-transparent border-b-2 border-cyan-500 focus:outline-none min-w-[96px]"
                    inputMode="numeric"
                  />
                </td>

                {/* CUSTO (input editável) */}
                <td className="px-3 py-2">
                  <input
                    type="text"
                    value={prod.precoCustoMasked}
                    onChange={(e) => handleMaskedChange(prod.id, "precoCusto", e.target.value)}
                    className="text-center bg-transparent border-b-2 border-yellow-400 focus:outline-none min-w-[96px]"
                    inputMode="numeric"
                  />
                </td>

                {/* LUCRO % */}
                <td className="px-3 py-2">
                  <div className="inline-block border-b-2 border-green-500 px-1 min-w-[64px] text-center">
                    {prod.lucroPercentual}
                  </div>
                </td>

                {/* LUCRO R$ */}
                <td className="px-3 py-2">
                  <div className="inline-block border-b-2 border-blue-500 px-1 min-w-[96px] text-center">
                    {prod.lucroReais}
                  </div>
                </td>

                {/* LUCRO TOTAL */}
                <td className="px-3 py-2">
                  <div className="inline-block border-b-2 border-purple-500 px-1 min-w-[96px] text-center">
                    {prod.lucroTotal}
                  </div>
                </td>

                {/* VENDAS */}
                <td className="px-3 py-2">{prod.vendas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const sampleProducts = [
  {
    id: 1,
    image: "https://via.placeholder.com/64",
    estoque: 10,
    title: "Plafon Redondo Freijó 35cm",
    precoVenda: 199.99,
    vendas: 5,
    promocao: true,
  },
];
