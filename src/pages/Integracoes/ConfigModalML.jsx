// ✅ ARQUIVO: src/pages/Integracoes/ConfigModalML.jsx

export default function ConfigModalML({ config, setConfig, onClose, onSave }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-cyan-500/40 relative">
        <h2 className="text-xl text-cyan-300 font-bold mb-5 text-center">
          Configurar Integração Mercado Livre
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {/* Margem mínima */}
          <div className="col-span-1">
            <label className="text-sm text-zinc-200 font-semibold">Margem Mínima (%)</label>
            <input
              type="number"
              name="margemMinima"
              min="0"
              max="99"
              value={config.margemMinima || ""}
              onChange={handleChange}
              className="mt-1 w-full p-2 rounded-lg bg-zinc-800 text-zinc-100 border border-zinc-700 focus:border-cyan-400"
              placeholder="%"
            />
          </div>

          {/* Margem máxima */}
          <div className="col-span-1">
            <label className="text-sm text-zinc-200 font-semibold">Margem Máxima (%)</label>
            <input
              type="number"
              name="margemMaxima"
              min="0"
              max="99"
              value={config.margemMaxima || ""}
              onChange={handleChange}
              className="mt-1 w-full p-2 rounded-lg bg-zinc-800 text-zinc-100 border border-zinc-700 focus:border-cyan-400"
              placeholder="%"
            />
          </div>

          {/* Premium */}
          <div className="col-span-1">
            <label className="text-sm text-zinc-200 font-semibold">Premium (%)</label>
            <input
              type="number"
              name="premium"
              min="0"
              max="99"
              value={config.premium || ""}
              onChange={handleChange}
              className="mt-1 w-full p-2 rounded-lg bg-zinc-800 text-zinc-100 border border-zinc-700 focus:border-cyan-400"
              placeholder="%"
            />
          </div>

          {/* Clássico */}
          <div className="col-span-1">
            <label className="text-sm text-zinc-200 font-semibold">Clássico (%)</label>
            <input
              type="number"
              name="classico"
              min="0"
              max="99"
              value={config.classico || ""}
              onChange={handleChange}
              className="mt-1 w-full p-2 rounded-lg bg-zinc-800 text-zinc-100 border border-zinc-700 focus:border-cyan-400"
              placeholder="%"
            />
          </div>

          {/* Imposto */}
          <div className="col-span-1">
            <label className="text-sm text-zinc-200 font-semibold">Imposto CNPJ (%)</label>
            <input
              type="number"
              name="imposto"
              min="0"
              max="99"
              value={config.imposto || ""}
              onChange={handleChange}
              className="mt-1 w-full p-2 rounded-lg bg-zinc-800 text-zinc-100 border border-zinc-700 focus:border-cyan-400"
              placeholder="%"
            />
          </div>

          {/* Extras */}
          <div className="col-span-1">
            <label className="text-sm text-zinc-200 font-semibold">Extras</label>
            <input
              type="text"
              name="extras"
              value={config.extras || ""}
              onChange={handleChange}
              className="mt-1 w-full p-2 rounded-lg bg-zinc-800 text-zinc-100 border border-zinc-700 focus:border-cyan-400"
              placeholder="Frete, taxa extra etc."
            />
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-between gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-600"
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            className="px-6 py-2 rounded-lg bg-cyan-600 text-white font-bold hover:bg-cyan-800 shadow border border-cyan-400"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
