// ✅ ARQUIVO: src/pages/Integracoes/ConfigModalML.jsx

export default function ConfigModalML({ config, setConfig, onClose, onSave }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 rounded-2xl shadow-2xl p-8 min-w-[320px] w-full max-w-[380px] border border-cyan-500/40 relative">
        <h2 className="text-xl text-cyan-300 font-bold mb-5 text-center">
          Configurar Integração Mercado Livre
        </h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-zinc-200 font-semibold">Imposto CNPJ (%)</label>
            <input
              type="number"
              name="imposto"
              min="0"
              max="99"
              className="mt-1 w-full p-2 rounded-lg bg-zinc-800 text-zinc-100 outline-none border border-zinc-700 focus:border-cyan-400 transition"
              value={config.imposto}
              onChange={handleChange}
              placeholder="Ex: 4"
            />
          </div>
          <div>
            <label className="text-sm text-zinc-200 font-semibold">Margem Mínima (%)</label>
            <input
              type="number"
              name="margemMinima"
              min="0"
              max="99"
              className="mt-1 w-full p-2 rounded-lg bg-zinc-800 text-zinc-100 outline-none border border-zinc-700 focus:border-cyan-400 transition"
              value={config.margemMinima}
              onChange={handleChange}
              placeholder="Ex: 10"
            />
          </div>
          <div>
            <label className="text-sm text-zinc-200 font-semibold">Tipo de Anúncio</label>
            <select
              name="tipoAnuncio"
              className="mt-1 w-full p-2 rounded-lg bg-zinc-800 text-zinc-100 outline-none border border-zinc-700 focus:border-cyan-400 transition"
              value={config.tipoAnuncio}
              onChange={handleChange}
            >
              <option value="premium">Premium</option>
              <option value="classico">Clássico</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-zinc-200 font-semibold">Extras</label>
            <input
              type="text"
              name="extras"
              className="mt-1 w-full p-2 rounded-lg bg-zinc-800 text-zinc-100 outline-none border border-zinc-700 focus:border-cyan-400 transition"
              value={config.extras}
              onChange={handleChange}
              placeholder="Taxa extra, frete etc."
            />
          </div>
        </div>
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
