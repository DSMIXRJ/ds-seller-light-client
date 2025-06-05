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

                {/* TÍTULO COM TRUNCATE E TOOLTIP */}
                <td className="px-3 py-2 text-left">
                  <div className="truncate max-w-[360px]" title={prod.title}>
                    {prod.title}
                  </div>
                </td>

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
    title: "Plafon Redondo Madeira 35cm Bivolt - Cor Freijó",
    precoVenda: 199.99,
    vendas: 5,
    promocao: true,
  },
];
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
                <th className="px-3 py-2 text-left">Título</th>
                <th className="px-3 py-2 text-left">Preço</th>
                <th className="px-3 py-2 text-left">Custo</th>
                <th className="px-3 py-2 text-left">Lucro %</th>
                <th className="px-3 py-2 text-left">Lucro R$</th>
                <th className="px-3 py-2 text-left">Lucro Total</th>
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
                  <td className="px-3 py-2 text-left">
                    <div className="max-w-[600px] overflow-hidden text-ellipsis line-clamp-2" title={prod.title}>
                      {prod.title}
                    </div>
                  </td>
                  <td className="px-3 py-2">R$ {prod.precoVenda.toFixed(2)}</td>
                  <td className="px-3 py-2">R$ {prod.precoCusto.toFixed(2)}</td>
                  <td className="px-3 py-2 text-center">{prod.margemPercentual}%</td>
                  <td className="px-3 py-2">R$ {prod.margemReais}</td>
                  <td className="px-3 py-2">R$ {prod.lucroTotal}</td>
                  <td className="px-3 py-2 text-center">{prod.visitas}</td>
                  <td className="px-3 py-2 text-center">{prod.vendas}</td>
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
