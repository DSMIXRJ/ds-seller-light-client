import { useRef } from 'react';

export default function ConfigModalML({ config, setConfig, onClose, onSave }) {
  
  const inputRefs = useRef({});

  const handleInput = (e) => {
    const { name, value } = e.target;
    const originalCursorPosition = e.target.selectionStart;
    
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    if (numbers === '') {
      e.target.value = '';
      setConfig(prev => ({ ...prev, [name]: '' }));
      return;
    }
    
    // Converte para centavos e depois para reais
    const cents = parseInt(numbers);
    const reais = cents / 100;
    
    // Formata com vírgula
    const formatted = reais.toFixed(2).replace('.', ',');
    
    // Calculate new cursor position
    let newCursorPosition = formatted.length;
    let digitsCount = 0;
    for (let i = 0; i < originalCursorPosition; i++) {
      if (value[i] && !isNaN(parseInt(value[i]))) {
        digitsCount++;
      }
    }

    let currentFormattedDigits = 0;
    for (let i = 0; i < formatted.length; i++) {
      if (!isNaN(parseInt(formatted[i]))) {
        currentFormattedDigits++;
      }
      if (currentFormattedDigits === digitsCount) {
        newCursorPosition = i + 1;
        break;
      }
    }

    // Atualiza o valor diretamente no input
    e.target.value = formatted;
    
    // Atualiza o estado
    setConfig(prev => ({ ...prev, [name]: formatted }));
    
    // Mantém o foco no input e ajusta a posição do cursor
    setTimeout(() => {
      if (inputRefs.current[name]) {
        inputRefs.current[name].focus();
        inputRefs.current[name].setSelectionRange(newCursorPosition, newCursorPosition);
      }
    }, 0);
  };

  const InputSemPrefixo = ({ label, name, defaultValue }) => (
    <div className="col-span-1">
      <label className="text-sm text-zinc-200 font-semibold block text-center mb-1">{label}</label>
      <input
        ref={el => inputRefs.current[name] = el}
        type="text"
        name={name}
        defaultValue={defaultValue || ""}
        onInput={handleInput}
        className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 outline-none text-center focus:border-cyan-400"
        placeholder="0,00"
        inputMode="numeric"
        autoComplete="off"
      />
    </div>
  );

  const tratarNumeros = () => {
    const camposConvertidos = {};
    Object.keys(inputRefs.current).forEach(key => {
      const input = inputRefs.current[key];
      if (input) {
        const valor = input.value;
        const num = parseFloat(valor?.replace(",", "."));
        camposConvertidos[key] = isNaN(num) ? 0 : num;
      }
    });
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
          <InputSemPrefixo label="Margem Mínima (%)" name="margemMinima" defaultValue={config.margemMinima} />
          <InputSemPrefixo label="Margem Máxima (%)" name="margemMaxima" defaultValue={config.margemMaxima} />
          <InputSemPrefixo label="Premium (%)" name="premium" defaultValue={config.premium} />
          <InputSemPrefixo label="Clássico (%)" name="classico" defaultValue={config.classico} />
          <InputSemPrefixo label="Imposto CNPJ (%)" name="imposto" defaultValue={config.imposto} />
          <InputSemPrefixo label="Extra (R$)" name="extras" defaultValue={config.extras} />
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


