// ✅ ARQUIVO: src/pages/Integracoes/ConfigModalML.jsx

export default function ConfigModalML({ config, setConfig, onClose, onSave }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig((prev) => ({ ...prev, [name]: value }));
  };

  const InputComSimbolo = ({ label, name, value, simbolo }) => (
    <div className="col-span-1">
      <label className="text-sm text-zinc-200 font-semibold block text-center">{label}</label>
      <div className="mt-1 flex w-full rounded-lg overflow-hidden border border-zinc-700 bg-zinc-800 focus-within:border-cyan-400">
        <input
          type="number"
          name={name}
          value={value || ""}
          onChange={handleChange}
          className="flex-1 p-2 bg-transparent text-zinc-100 outline-none"
        />
        <div className="px-3 bg-white text-black flex items-center justify-center text-sm font-bold border-l border-zinc-400">
          {simbolo}
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-cyan-500/40 relative">
        <h2 className="text-xl text-cyan-300 font-bold mb-5 text-center">
          Configurar Integração Mercado Livre
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <InputComSimbolo label="Margem Mínima" name="margemMinima" value={config.margemMinima} simbolo="%" />
          <InputComSimbolo label="Margem Máxima" name="margemMaxima" value={config.margemMaxima} simbolo="%" />
          <InputComSimbolo label="Premium" name="premium" value={config.premium} simbolo="%" />
          <InputComSimbolo label="Clássico" name="classico" value={config.classico} simbolo="%" />
          <InputComSimbolo label="Imposto CNPJ" name="imposto" value={config.imposto} simbolo="%" />

          {/* Campo Custos Extras com R$ fixo */}
          <div className="col-span-2">
            <label className="text-sm text-zinc-200 font-semibold block text-center">CUSTOS EXTRAS (R$)</label>
            <div className="mt-1 flex w-full rounded-lg overflow-hidden border border-zinc-700 bg-zinc-800 focus-within:border-cyan-400">
              <div className="px-3 bg-white text-black flex items-center justify-center text-sm font-bold border-r border-zinc-400">
                R$
              </div>
              <input
                type="text"
                name="extras"
                value={config.extras || ""}
                onChange={handleChange}
                className="flex-1 p-2 bg-transparent text-zinc-100 outline-none"
                placeholder="Frete, embalagem, outras taxas..."
              />
            </div>
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
