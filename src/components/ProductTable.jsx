import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredStock, setHoveredStock] = useState(null);
  const { integracao } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const backendUrl = "https://dsseller-backend-final.onrender.com";

        if (integracao === "ml") {
          const response = await axios.get(`${backendUrl}/api/mercadolivre/items`);
          const data = response.data.map((p) => ({
            ...p,
            precoCusto: 0,
            precoVendaMasked: formatCurrency(p.precoVenda),
            precoCustoMasked: "R$ 0,00",
            margemPercentual: 0,
            margemReais: 0,
            lucroTotal: 0,
          }));
          setProducts(data);
        } else {
          setProducts(sampleProducts);
        }
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar anúncios:", err);
        setError("Não foi possível carregar os anúncios.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [integracao]);

  const formatCurrency = (value) => {
    const numeric = value.toString().replace(/\D/g, "");
    const number = parseFloat(numeric) / 100;
    return number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const parseCurrency = (masked) => {
    const onlyNumbers = masked.replace(/\D/g, "");
    return parseFloat(onlyNumbers) / 100;
  };

  const handleMaskedChange = (id, field, rawValue) => {
    const numericValue = parseCurrency(rawValue);

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = { ...p };

          if (field === "precoVenda") {
            updated.precoVenda = numericValue;
            updated.precoVendaMasked = formatCurrency(rawValue);
          }

          if (field === "precoCusto") {
            updated.precoCusto = numericValue;
            updated.precoCustoMasked = formatCurrency(rawValue);
          }

          const margemReais = updated.precoVenda - updated.precoCusto;
          const margemPercentual = updated.precoVenda > 0 ? ((margemReais / updated.precoVenda) * 100) : 0;
          const lucroTotal = margemReais * updated.vendas;

          updated.margemReais = margemReais.toFixed(2);
          updated.margemPercentual = margemPercentual.toFixed(2);
          updated.lucroTotal = lucroTotal.toFixed(2);

          return updated;
        }
        return p;
      })
    );
  };

  if (loading) {
    return <div className="text-white p-8">Carregando anúncios...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-8">{error}</div>;
  }

  return (
    <div className="bg-[#101420] text-white rounded-2xl shadow-xl p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-[#181c2f] text-xs uppercase">
            <tr>
              <th className="px-3 py-2 text-left">Imagem</th>
              <th className="px-3 py-2 text-left">Estoque</th>
              <th className="px-3 py-2 text-left">Título</th>
              <th className="px-3 py-2 text-left">Preço Venda</th>
              <th className="px-3 py-2 text-left">Preço Custo</th>
              <th className="px-3 py-2 text-left">Margem %</th>
              <th className="px-3 py-2 text-left">Margem (R$)</th>
              <th className="px-3 py-2 text-left">Lucro Total</th>
              <th className="px-3 py-2 text-left">Vendas</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id} className="border-b border-[#23243a]">
                <td className="px-3 py-2">
                  <img src={prod.image} alt="" className="w-12 h-12 rounded" />
                </td>
                <td className="px-3 py-2">{prod.estoque}</td>
                <td className="px-3 py-2">{prod.title}</td>
                <td className="px-3 py-2">
                  <input
                    type="text"
                    value={prod.precoVendaMasked}
                    onChange={(e) => handleMaskedChange(prod.id, "precoVenda", e.target.value)}
                    className="w-24 text-right bg-transparent border-b border-blue-400 focus:outline-none"
                    inputMode="numeric"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="text"
                    value={prod.precoCustoMasked}
                    onChange={(e) => handleMaskedChange(prod.id, "precoCusto", e.target.value)}
                    className="w-24 text-right bg-transparent border-b border-yellow-400 focus:outline-none"
                    inputMode="numeric"
                  />
                </td>
                <td className="px-3 py-2">{prod.margemPercentual}%</td>
                <td className="px-3 py-2">R$ {prod.margemReais}</td>
                <td className="px-3 py-2">R$ {prod.lucroTotal}</td>
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
    estoque: 13,
    title: "Plafon Redondo Freijó 35cm",
    precoVenda: 199.99,
    vendas: 8,
    promocao: true,
  },
];

