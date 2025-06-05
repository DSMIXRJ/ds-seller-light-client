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
          setProducts(response.data);
        } else {
          setProducts(sampleProducts);
        }
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar anúncios:", err);
        setError("Não foi possível carregar os anúncios. Por favor, verifique sua conexão e tente novamente.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [integracao]);

  const handleEdit = (id, field, value) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: Number(value) } : p))
    );
  };

  if (loading) {
    return (
      <div className="bg-[#101420] text-white rounded-2xl shadow-xl p-8 flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-lg">Carregando seus anúncios...</p>
          <p className="text-sm text-gray-400 mt-2">Isso pode levar alguns segundos</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#101420] text-white rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold mb-2">Ops! Algo deu errado</h3>
          <p className="text-gray-400">{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition"
            onClick={() => window.location.reload()}
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#101420] text-white rounded-2xl shadow-xl p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">
          Anúncios Integrados ({products.length})
        </h2>
        <button className="px-4 py-2 bg-[#23243a] rounded-lg hover:bg-[#2b2d4a] transition">
          Filtros
        </button>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400">Nenhum anúncio encontrado para esta integração.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-[#181c2f] text-xs uppercase">
              <tr>
                <th className="px-3 py-2 text-left">Imagem</th>
                <th className="px-3 py-2 text-left">Estoque</th>
                <th className="px-3 py-2 text-left">Título do Produto</th>
                <th className="px-3 py-2 text-left">Preço de Venda (R$)</th>
                <th className="px-3 py-2 text-left">Preço de Custo (R$)</th>
                <th className="px-3 py-2 text-left">Margem %</th>
                <th className="px-3 py-2 text-left">Margem (R$)</th>
                <th className="px-3 py-2 text-left">Lucro Total (R$)</th>
                <th className="px-3 py-2 text-left">Nº Visitas</th>
                <th className="px-3 py-2 text-left">Nº Vendas</th>
                <th className="px-3 py-2 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr
                  key={prod.id}
                  className={`border-b border-[#23243a] ${
                    prod.promocao ? "bg-[#14273b] border-l-4 border-blue-500" : ""
                  }`}
                >
                  <td className="px-3 py-2">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="rounded-lg w-12 h-12 object-cover border border-[#23243a]"
                    />
                  </td>
                  <td
                    className="px-3 py-2 relative"
                    onMouseEnter={() => setHoveredStock(prod.id)}
                    onMouseLeave={() => setHoveredStock(null)}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="font-bold text-green-400">
                      {prod.estoque}
                    </span>
                    {hoveredStock === prod.id && (
                      <div className="absolute z-10 left-1/2 transform -translate-x-1/2 top-8 px-3 py-1 rounded-lg bg-zinc-900 text-zinc-100 text-xs shadow-md border border-cyan-500 animate-fade-in">
                        Estoque: {prod.estoque}
                      </div>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <a 
                      href={prod.permalink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-cyan-400 transition"
                    >
                      {prod.title}
                    </a>
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      inputMode="decimal"
                      className="bg-transparent border-b border-blue-400 w-20 text-right focus:outline-none no-spinner"
                      value={prod.precoVenda}
                      onChange={(e) =>
                        handleEdit(prod.id, "precoVenda", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      inputMode="decimal"
                      className="bg-transparent border-b border-yellow-400 w-20 text-right focus:outline-none no-spinner"
                      value={prod.precoCusto}
                      onChange={(e) =>
                        handleEdit(prod.id, "precoCusto", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-3 py-2">{prod.margemPercentual}%</td>
                  <td className="px-3 py-2">R$ {prod.margemReais}</td>
                  <td className="px-3 py-2">R$ {prod.lucroTotal}</td>
                  <td className="px-3 py-2">{prod.visitas}</td>
                  <td className="px-3 py-2">{prod.vendas}</td>
                  <td className="px-3 py-2 text-right">
                    {prod.promocao && (
                      <span
                        className="text-blue-400 font-semibold"
                        title="Produto em promoção!"
                      >
                        PROMO
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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
    precoCusto: 100.0,
    margemPercentual: 50,
    margemReais: 99.99,
    lucroTotal: 1599.92,
    visitas: 200,
    vendas: 8,
    promocao: true,
    permalink: "#"
  },
];
