import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProductTable() {
  const { integracao } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [colWidths, setColWidths] = useState({
    titulo: 220,
    preco: 100,
    custo: 100,
    lucroPct: 80,
    lucroR$: 100,
    lucroTotal: 100,
    vendas: 80,
  });

  const colRefs = {
    titulo: useRef(null),
    preco: useRef(null),
    custo: useRef(null),
    lucroPct: useRef(null),
    lucroR$: useRef(null),
    lucroTotal: useRef(null),
    vendas: useRef(null),
  };

  const startResizing = (colKey, e) => {
    const startX = e.clientX;
    const startWidth = colRefs[colKey].current.offsetWidth;

    const doDrag = (eMove) => {
      const newWidth = startWidth + (eMove.clientX - startX);
      setColWidths((prev) => ({ ...prev, [colKey]: Math.max(newWidth, 60) }));
    };

    const stopDrag = () => {
      document.removeEventListener("mousemove", doDrag);
      document.removeEventListener("mouseup", stopDrag);
    };

    document.addEventListener("mousemove", doDrag);
    document.addEventListener("mouseup", stopDrag);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
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
      } catch {
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

          if (field === "precoVenda") updated.precoVenda = numericValue;
          if (field === "precoCusto") updated.precoCusto = numericValue;

          updated.precoVendaMasked = formatCurrency(updated.precoVenda);
          updated.precoCustoMasked = formatCurrency(updated.precoCusto);

          const lucro = updated.precoVenda - updated.precoCusto;
          const pct = updated.precoVenda > 0 ? (lucro / updated.precoVenda) * 100 : 0;
          const total = lucro * (updated.vendas || 0);

          updated.lucroReais = formatCurrency(lucro.toFixed(2));
          updated.lucroPercentual = pct.toFixed(2) + "%";
          updated.lucroTotal = formatCurrency(total.toFixed(2));

          return updated;
        }
        return p;
      })
    );
  };

  const renderHeader = (label, colKey) => (
    <th
      className="relative px-3 py-2 text-left bg-[#181c2f] text-xs uppercase"
      ref={colRefs[colKey]}
      style={{ width: colWidths[colKey] }}
    >
      {label}
      <div
        className="absolute right-0 top-0 h-full w-1 cursor-col-resize"
        onMouseDown={(e) => startResizing(colKey, e)}
      ></div>
    </th>
  );

  if (loading) return <div className="text-white p-8">Carregando...</div>;

  return (
    <div className="bg-[#101420] text-white rounded-2xl shadow-xl p-4">
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-sm">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left">Imagem</th>
              <th className="px-3 py-2 text-left">Estoque</th>
              {renderHeader("Título", "titulo")}
              {renderHeader("Preço", "preco")}
              {renderHeader("Custo", "custo")}
              {renderHeader("Lucro %", "lucroPct")}
              {renderHeader("Lucro (R$)", "lucroR$")}
              {renderHeader("Lucro Total", "lucroTotal")}
              {renderHeader("Vendas", "vendas")}
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id} className="border-b border-[#23243a]">
                <td className="px-3 py-2">
                  <img src={prod.image} alt="" className="w-12 h-12 rounded" />
                </td>
                <td className="px-3 py-2">{prod.estoque}</td>
                <td className="px-3 py-2" style={{ width: colWidths.titulo }}>
                  <div className="max-w-full truncate line-clamp-2" title={prod.title}>
                    {prod.title}
                  </div>
                </td>
                <td className="px-3 py-2" style={{ width: colWidths.preco }}>
                  <input
                    type="text"
                    value={prod.precoVendaMasked}
                    onChange={(e) => handleMaskedChange(prod.id, "precoVenda", e.target.value)}
                    className="text-center bg-transparent border-b-2 border-cyan-500 focus:outline-none w-full"
                    inputMode="numeric"
                  />
                </td>
                <td className="px-3 py-2" style={{ width: colWidths.custo }}>
                  <input
                    type="text"
                    value={prod.precoCustoMasked}
                    onChange={(e) => handleMaskedChange(prod.id, "precoCusto", e.target.value)}
                    className="text-center bg-transparent border-b-2 border-yellow-400 focus:outline-none w-full"
                    inputMode="numeric"
                  />
                </td>
                <td className="px-3 py-2" style={{ width: colWidths.lucroPct }}>
                  <div className="border-b-2 border-green-500 text-center">{prod.lucroPercentual}</div>
                </td>
                <td className="px-3 py-2" style={{ width: colWidths.lucroR$ }}>
                  <div className="border-b-2 border-blue-500 text-center">{prod.lucroReais}</div>
                </td>
                <td className="px-3 py-2" style={{ width: colWidths.lucroTotal }}>
                  <div className="border-b-2 border-purple-500 text-center">{prod.lucroTotal}</div>
                </td>
                <td className="px-3 py-2" style={{ width: colWidths.vendas }}>
                  {prod.vendas}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
