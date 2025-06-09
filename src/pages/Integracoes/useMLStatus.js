import React, { useState, useRef, useEffect } from "react";

export default function ConfigModalML({ config, setConfig, onClose, onSave }) {
  // Estado interno para cada input
  const [internalValues, setInternalValues] = useState({
    margemMinima: config.margemMinima || "",
    margemMaxima: config.margemMaxima || "",
    premium: config.premium || "",
    classico: config.classico || "",
    imposto: config.imposto || "",
    extras: config.extras || "",
  });

  // Refs para manter referência dos inputs
  const inputRefs = useRef({});

  // Função para formatar valor
  const formatValue = (value, isMonetary = false) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers === '') return '';
    
    const num = parseInt(numbers) / 100;
    return num.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Handle input change - sem formatação, apenas armazena
  const handleInputChange = (name, value) => {
    setInternalValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle blur - formata o valor
  const handleInputBlur = (name, value) => {
    const isMonetary = name === 'extras';
    const formatted = formatValue(value, isMonetary);
    
    setInternalValues(prev => ({
      ...prev,
      [name]: formatted
    }));
    
    // Atualiza o config pai
    setConfig(prev => ({
      ...prev,
      [name]: formatted
    }));
  };

  // Componente Input isolado
  const InputField = React.memo(({ name, label, prefix, value }) => {
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
            value={value}
            onChange={(e) => handleInputChange(name, e.target.value)}
            onBlur={(e) => handleInputBlur(name, e.target.value)}
            className="flex-1 p-2 bg-transparent text-zinc-100 outline-none text-center"
            placeholder="0,00"
            inputMode="numeric"
            autoComplete="off"
          />
        </div>
      </div>
    );
  });

  const handleSave = () => {
    const processedData = {};
    Object.keys(internalValues).forEach(key => {
      const value = internalValues[key];
      const cleanValue = value?.toString().replace(',', '.').trim();
      const num = parseFloat(cleanValue);
      processedData[key] = isNaN(num) ? 0 : num;
    });
    onSave(processedData);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-cyan-500/40 relative">
        <h2 className="text-xl text-cyan-300 font-bold mb-5 text-center">
          Configurar Integração Mercado Livre
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <InputField 
            name="margemMinima" 
            label="Margem Mínima" 
            prefix="%" 
            value={internalValues.margemMinima}
          />
          <InputField 
            name="margemMaxima" 
            label="Margem Máxima" 
            prefix="%" 
            value={internalValues.margemMaxima}
          />
          <InputField 
            name="premium" 
            label="Premium" 
            prefix="%" 
            value={internalValues.premium}
          />
          <InputField 
            name="classico" 
            label="Clássico" 
            prefix="%" 
            value={internalValues.classico}
          />
          <InputField 
            name="imposto" 
            label="Imposto CNPJ" 
            prefix="%" 
            value={internalValues.imposto}
          />
          <InputField 
            name="extras" 
            label="Extra" 
            prefix="R$" 
            value={internalValues.extras}
          />
        </div>

        <div className="flex justify-between gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-600"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-lg bg-cyan-600 text-white font-bold hover:bg-cyan-800 shadow border border-cyan-400"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

