export default function ConfigModalML({ config, setConfig, onClose, onSave }) {
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    if (numbers === '') {
      setConfig(prev => ({ ...prev, [name]: '' }));
      return;
    }
    
    // Converte para centavos e depois para reais
    const cents = parseInt(numbers);
    const reais = cents / 100;
    
    // Formata com vírgula
    const formatted = reais.toFixed(2).replace('.', ',');
    
    setConfig(prev => ({ ...prev, [name]: formatted }));
  };

  const InputSemPrefixo = ({ label, name, value }) => (
    <div className="col-span-1">
      <label className="text-sm text-zinc-200 font-semibold block text-center mb-1">{label}</label>
      <input
        type="text"
        name={name}
        value={value || ""}
        onChange={handleChange}
        className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 outline-none text-center focus:border-cyan-400"
        placeholder="0,00"
        inputMode="numeric"
      />
    </div>
  );

  const tratarNumeros = () => {
    const camposConvertidos = {};
    for (const chave in config) {
      const valor = config[chave];
      const num = parseFloat(valor?.replace(",", "."));
      camposConvertidos[chave] = isNaN(num) ? 0 : num;
    }
    return camposConvertidos;
  };

  const salvarConfiguracoes = () => {
    const dados = tratarNumeros();
    onSave(dados);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-cyan-500/40 relative">
        <h2 className="text-xl text-cyan-300 font-bold mb-5 text-center">
          Configurar Integração Mercado Livre
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <InputSemPrefixo label="Margem Mínima (%)" name="margemMinima" value={config.margemMinima} />
          <InputSemPrefixo label="Margem Máxima (%)" name="margemMaxima" value={config.margemMaxima} />
          <InputSemPrefixo label="Premium (%)" name="premium" value={config.premium} />
          <InputSemPrefixo label="Clássico (%)" name="classico" value={config.classico} />
          <InputSemPrefixo label="Imposto CNPJ (%)" name="imposto" value={config.imposto} />
          <InputSemPrefixo label="Extra (R$)" name="extras" value={config.extras} />
        </div>

        <div className="flex justify-between gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-600"
          >
            Cancelar
          </button>
          <button
            onClick={salvarConfiguracoes}
            className="px-6 py-2 rounded-lg bg-cyan-600 text-white font-bold hover:bg-cyan-800 shadow border border-cyan-400"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

