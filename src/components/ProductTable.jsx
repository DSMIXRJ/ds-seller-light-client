import React, { useState, useEffect } from "react";
import axios from "axios";

// Manter dados de exemplo para fallback
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
  },
  // ...adicione mais produtos para testes
];

export default function ProductTable({ searchTerm, statusFilter }) {
  const [products, setProducts] = useState([]);
  const [hoveredStock, setHoveredStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Buscar anúncios reais do backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // URL do backend
        const backendUrl = "https://dsseller-backend-final.onrender.com";
        
        console.log("Buscando anúncios reais do Mercado Livre...");
        const response = await axios.get(`${backendUrl}/api/mercadolivre/items`);
        
        console.log("Anúncios recebidos:", response.data);
        
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          setProducts(response.data);
        } else {
          console.warn("Nenhum anúncio encontrado, usando dados simulados");
          setProducts(sampleProducts);
        }
      } catch (error) {
        console.error("Erro ao buscar anúncios:", error);
        setError("Falha ao carregar anúncios. Por favor, tente novamente.");
        setProducts(sampleProducts); // Usar dados simulados em caso de erro
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtrar produtos com base no termo de busca e filtro de status
  const filteredProducts = products.filter(product => {
    const matchesSearch = !searchTerm || 
      product.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || 
      product.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Função para editar preço de venda/custo inline
  const handleEdit = (id, field, value) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: Number(value) } : p))
    );
  };

  // Função para atualizar anúncios
  const handleRefresh = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // URL do backend
      const backendUrl = "https://dsseller-backend-final.onrender.com";
      
      const response = await axios.get(`${backendUrl}/api/mercadolivre/items`);
      
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        setProducts(response.data);
      } else {
        setError("Nenhum anúncio encontrado");
      }
    } catch (error) {
      console.error("Erro ao atualizar anúncios:", error);
      setError("Falha ao atualizar anúncios. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#101420] text-white rounded-2xl shadow-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          Anúncios Integrados 
          {loading && <span className="ml-2 text-sm text-zinc-400">(Carregando...)</span>}
        </h2>
        <button 
          className="px-4 py-2 bg-cyan-700 text-cyan-100 rounded-lg hover:bg-cyan-600 transition"
          onClick={handleRefresh}
          disabled={loading}
        >
          {loading ? "Atualizando..." : "Atualizar Anúncios"}
        </button>
      </div>
      
      {error && (
        <div className="bg-red-900/50 text-red-200 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12 text-zinc-400">
          Nenhum anúncio encontrado. Verifique sua integração com o Mercado Livre.
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
              {filteredProducts.map((prod) => (
                <tr
                  key={prod.id}
                  className={`border-b border-[#23243a] ${
                    prod.promocao
                      ? "bg-[#14273b] border-l-4 border-blue-500"
                      : ""
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
                  <td className="px-3 py-2">{prod.title}</td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      className="bg-transparent border-b border-blue-400 w-20 text-right focus:outline-none"
                      value={prod.precoVenda}
                      onChange={(e) =>
                        handleEdit(prod.id, "precoVenda", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      className="bg-transparent border-b border-yellow-400 w-20 text-right focus:outline-none"
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
