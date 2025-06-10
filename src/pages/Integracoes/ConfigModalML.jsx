// Funções de formatação baseadas no código existente dos Anúncios
const formatCurrency = (value) => {
  const numeric = value.toString().replace(/\D/g, '');
  const number = parseFloat(numeric) / 100;
  return number.toLocaleString('pt-BR', { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  });
};

const parseCurrency = (masked) => {
  const onlyNumbers = masked.replace(/\D/g, '');
  return parseFloat(onlyNumbers) / 100;
};

export default function ConfigModalML({ config, setConfig, onClose, onSave }) {
  
  // Função para lidar com mudanças nos inputs - EXATAMENTE como na tabela de produtos
  const handleMaskedChange = (field, rawValue) => {
    const numericValue = parseCurrency(rawValue);
    const masked = formatCurrency(rawValue);

    setConfig((prev) => ({
      ...prev,
      [field]: masked
    }));
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
          value={value || ""}
          onChange={(e) => handleMaskedChange(name, e.target.value)}
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
      // Usa a mesma função parseCurrency da tabela
      const num = parseCurrency(valor || "0");
      camposConvertidos[chave] = num;
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

