export default function ConfigModalML({ config, setConfig, onClose, onSave }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Define quais campos são monetários (com prefixo R$)
    const camposMonetarios = ['extras'];
    
    // Remove tudo que não é número
    const apenasNumeros = value.replace(/\D/g, '');
    
    if (apenasNumeros === '') {
      setConfig((prev) => ({ ...prev, [name]: '' }));
      return;
    }
    
    // Converte para número e divide por 100 para ter 2 casas decimais
    const numero = parseInt(apenasNumeros) / 100;
    
    // Formata com vírgula como separador decimal
    const valorFormatado = numero.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    
    setConfig((prev) => ({ ...prev, [name]: valorFormatado }));
  };

  const InputComPrefixo = ({ label, name, value, prefixo }) => (
    <div className="col-span-1">
      <label className="text-sm text-zinc-200 font-semibold block text-center mb-1">{label}</label>
      <div className="flex w-full rounded-lg overflow-hidden border border-zinc-700 bg-zinc-800 focus-within:border-cyan-400">
        <div className="w-12 bg-zinc-100 text-black flex items-center justify-center text-sm font-bold border-r border-zinc-400">
          {prefixo}
        </div>
        <input
          type="text"
          name={name}
          value={value || ""}
          onChange={handleChange}
          className="flex-1 p-2 bg-transparent text-zinc-100 outline-none text-center"
          placeholder="0,00"
          inputMode="numeric"
        />
      </div>
    </div>
  );

  const tratarNumeros = () => {
    const camposConvertidos = {};
    for (const chave in config) {
      const valor = config[chave];
      const valorLimpo = valor?.toString().replace(',', '.').trim();
      const num = parseFloat(valorLimpo);
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
          <InputComPrefixo label="Margem Mínima" name="margemMinima" value={config.margemMinima} prefixo="%" />
          <InputComPrefixo label="Margem Máxima" name="margemMaxima" value={config.margemMaxima} prefixo="%" />
          <InputComPrefixo label="Premium" name="premium" value={config.premium} prefixo="%" />
          <InputComPrefixo label="Clássico" name="classico" value={config.classico} prefixo="%" />
          <InputComPrefixo label="Imposto CNPJ" name="imposto" value={config.imposto} prefixo="%" />
          <InputComPrefixo label="Extra" name="extras" value={config.extras} prefixo="R$" />
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

