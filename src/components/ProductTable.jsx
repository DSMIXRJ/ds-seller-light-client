// ...importações e useEffect mantidos...

// ...funções mantidas...

return (
  <div className="bg-[#101420] text-white rounded-2xl shadow-xl p-4">
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead className="bg-[#181c2f] text-xs uppercase text-center">
          <tr>
            <th className="px-3 py-2 text-left">Imagem</th>
            <th className="px-3 py-2 text-left">SKU</th>
            <th className="px-3 py-2 text-left">Estoque</th>
            <th className="px-3 py-2 text-left">Título</th>
            <th className="px-3 py-2 text-center">Preço</th>
            <th className="px-3 py-2 text-center">Custo</th>
            <th className="px-3 py-2 text-center">Lucro %</th>
            <th className="px-3 py-2 text-center">Lucro (R$)</th>
            <th className="px-3 py-2 text-center">Lucro Total</th>
            <th className="px-3 py-2 text-center">Visitas</th>
            <th className="px-3 py-2 text-center">Vendas</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id} className="border-b border-[#23243a] text-center">
              <td className="px-3 py-2 text-left">
                <img src={prod.image} alt="" className="w-12 h-12 rounded" />
              </td>

              <td className="px-3 py-2">
                <div className="inline-block border-b-2 border-white px-1 min-w-[72px] text-center">
                  {prod.sku || "—"}
                </div>
              </td>

              <td className="px-3 py-2 text-left">{prod.estoque}</td>

              <td className="px-3 py-2 text-left align-top w-full max-w-[360px]">
                <div
                  className="w-full break-words line-clamp-2"
                  title={prod.title}
                >
                  {prod.title}
                </div>
              </td>

              <td className="px-3 py-2">
                <input
                  type="text"
                  value={prod.precoVendaMasked}
                  onChange={(e) => handleMaskedChange(prod.id, "precoVenda", e.target.value)}
                  className="text-center bg-transparent border-b-2 border-cyan-500 focus:outline-none min-w-[96px]"
                  inputMode="numeric"
                />
              </td>

              <td className="px-3 py-2">
                <input
                  type="text"
                  value={prod.precoCustoMasked}
                  onChange={(e) => handleMaskedChange(prod.id, "precoCusto", e.target.value)}
                  className="text-center bg-transparent border-b-2 border-yellow-400 focus:outline-none min-w-[96px]"
                  inputMode="numeric"
                />
              </td>

              <td className="px-3 py-2">
                <div className="inline-block border-b-2 border-green-500 px-1 min-w-[64px] text-center">
                  {prod.lucroPercentual}
                </div>
              </td>

              <td className="px-3 py-2">
                <div className="inline-block border-b-2 border-blue-500 px-1 min-w-[96px] text-center">
                  {prod.lucroReais}
                </div>
              </td>

              <td className="px-3 py-2">
                <div className="inline-block border-b-2 border-purple-500 px-1 min-w-[96px] text-center">
                  {prod.lucroTotal}
                </div>
              </td>

              <td className="px-3 py-2">
                <div className="inline-block border-b-2 border-pink-500 px-1 min-w-[72px] text-center">
                  {prod.visitas || "—"}
                </div>
              </td>

              <td className="px-3 py-2">
                <div className="inline-block border-b-2 border-orange-500 px-1 min-w-[72px] text-center">
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

// ...sampleProducts permanece o mesmo...
