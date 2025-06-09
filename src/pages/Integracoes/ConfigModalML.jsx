import { useState, useRef } from "react";

export default function ConfigModalML({ config, setConfig, onClose, onSave }) {
  // Estado para controlar os valores dos inputs
  const [inputValues, setInputValues] = useState({
    margemMinima: config.margemMinima || "",
    margemMaxima: config.margemMaxima || "",
    premium: config.premium || "",
    classico: config.classico || "",
    imposto: config.imposto || "",
    extras: config.extras || "",
  });

  // Refs para os inputs
  const inputRefs = useRef({});

  // Função para formatar números como moeda brasileira
  const formatCurrency = (value) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    if (numbers === '') return '';
    
    // Converte para centavos e depois para reais
    const cents = parseInt(numbers);
    const reais = cents / 100;
    
    // Formata com vírgula decimal
    return reais.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Manipula mudanças nos inputs
  const handleInputChange = (fieldName, rawValue) => {
    // Formata o valor em tempo real
    const formattedValue = formatCurrency(rawValue);
    
    // Atualiza o estado local
    setInputValues(prev => ({
      ...prev,
      [fieldName]: formattedValue
    }));

    // Atualiza o estado pai
    setConfig(prev => ({
      ...prev,
      [fieldName]: formattedValue
    }));
  };

  // Componente de input customizado
  const CurrencyInput = ({ name, label, prefix, placeholder = "0,00" }) => {
    return (
      <div className="col-span-1">
        <label className="text-sm text-zinc-200 font-semibold block text-center mb-1">
          {label}
        </label>
        <div className="flex w-full rounded-lg overflow-hidden border border-zinc-700 bg-zinc-800 focus-within:border-cyan-400">
          <div className="w-12 bg-zinc-100 text-black flex items-center justify-center text-sm font-bold border-r border-zinc-400">
            {prefix}
          </div>
          <input
            ref={el => inputRefs.current[name] = el}
            type="text"
            value={inputValues[name]}
            onChange={(e) => handleInputChange(name, e.target.value)}
            className="flex-1 p-2 bg-transparent text-zinc-100 outline-none text-center"
            placeholder={placeholder}
            inputMode="numeric"
            autoComplete="off"
          />
        </div>
      </div>
    );
  };

  // Processa os dados para salvar
  const processDataForSave = () => {
    const processedData = {};
    
    Object.keys(inputValues).forEach(key => {
      const value = inputValues[key];
      // Converte vírgula para ponto e remove espaços
      const cleanValue = value.toString().replace(',', '.').trim();
      const numericValue = parseFloat(cleanValue);
      processedData[key] = isNaN(numericValue) ? 0 : numericValue;
    });
    
    return processedData;
  };

  // Função para salvar
  const handleSave = () => {
    const processedData = processDataForSave();
    onSave(processedData);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-cyan-500/40 relative">
        <h2 className="text-xl text-cyan-300 font-bold mb-5 text-center">
          Configurar Integração Mercado Livre
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <CurrencyInput 
            name="margemMinima" 
            label="Margem Mínima" 
            prefix="%" 
          />
          <CurrencyInput 
            name="margemMaxima" 
            label="Margem Máxima" 
            prefix="%" 
          />
          <CurrencyInput 
            name="premium" 
            label="Premium" 
            prefix="%" 
          />
          <CurrencyInput 
            name="classico" 
            label="Clássico" 
            prefix="%" 
          />
          <CurrencyInput 
            name="imposto" 
            label="Imposto CNPJ" 
            prefix="%" 
          />
          <CurrencyInput 
            name="extras" 
            label="Extra" 
            prefix="R$" 
          />
        </div>

        <div className="flex justify-between gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-lg bg-cyan-600 text-white font-bold hover:bg-cyan-800 shadow border border-cyan-400 transition-colors"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}


