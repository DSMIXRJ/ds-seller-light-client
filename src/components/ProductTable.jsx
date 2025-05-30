import React, { useState } from "react";
import { FiFilter, FiEdit2 } from "react-icons/fi";

const sampleProducts = [
  {
    id: 1,
    image: "https://via.placeholder.com/64",
    estoque: 13,
    title: "Plafon Redondo Freijó 35cm",
    precoVenda: 199.99,
    precoCusto: 100.00,
    margemPercentual: 50,
    margemReais: 99.99,
    lucroTotal: 1599.92,
    visitas: 200,
    vendas: 8,
    promocao: true,
  },
  // ...adicione mais produtos para testes
];

export default function ProductTable() {
  const [products, setProducts] = useState(sampleProducts);
  const [hoveredStock, setHoveredStock] = useState(null);

  // Função para editar preço de venda/custo inline
  const handleEdit = (id, field, value) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, [field]: Number(value) } : p
      )
    );
  };

  return (
    <div className="bg-[#101420] text-white rounded-2xl shadow-xl p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">Anúncios Integrados</h2>
        <button className="flex items-center px-4 py-2 bg-[#23243a] rounded-lg hover:bg-[#2b2d4a] transition">
          <FiFilter className="mr-2" /> Filtros
        </button>
      </div>
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
                className={`border-b border-[#23243a] ${prod.promocao ? "bg-[#14273b] border-l-4 border-blue-500" : ""
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
                    <span className="text-blue-400" title="Produto em promoção!">
                      <FiEdit2 size={18} />
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
