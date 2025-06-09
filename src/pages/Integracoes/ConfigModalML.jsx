import { useState, useCallback, useMemo } from "react";

export default function ConfigModalML({ config, setConfig, onClose, onSave }) {
  // Estado local para controlar os valores durante a digitação
  const [localValues, setLocalValues] = useState(config);

  // Função para formatar valores percentuais
  const formatarPercentual = useCallback((valor) => {
    const apenasNumeros = valor.replace(/\D/g, '');
    if (apenasNumeros === '') return '';
    const numero = parseInt(apenasNumeros) / 100;
    return numero.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }, []);

  // Função para formatar valores monetários
  const formatarMonetario = useCallback((valor) => {
    const apenasNumeros = valor.replace(/\D/g, '');
    if (apenasNumeros === '') return '';
    const numero = parseInt(apenasNumeros) / 100;
    return numero.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }, []);

  // Campos monetários
  const camposMonetarios = useMemo(() => ['extras'], []);

  // Função para onChange - atualiza estado local
  const handleChange = useCallback((name, value) => {
    setLocalValues(prev => ({ ...prev, [name]: value }));
  }, []);

  // Função para onBlur - formata e atualiza estado principal
  const handleBlur = useCallback((name, value) => {
    let valorFormatado;
    
    if (camposMonetarios.includes(name)) {
      valorFormatado = formatarMonetario(value);
    } else {
      valorFormatado = formatarPercentual(value);
    }
    
    const novoValor = valorFormatado || value;
    setLocalValues(prev => ({ ...prev, [name]: novoValor }));
    setConfig(prev => ({ ...prev, [name]: novoValor }));
  }, [camposMonetarios, formatarMonetario, formatarPercentual, setConfig]);

  // Componente de input memoizado para evitar re-renderizações
  const InputComPrefixo = useMemo(() => {
    return function InputComPrefixoMemo({ label, name, value, prefixo }) {
      return (
        <div className="col-span-1">
          <label className="text-sm text-zinc-200 font-semibold block text-center mb-1">
            {label}
          </label>
          <div className="flex w-full rounded-lg overflow-hidden border border-zinc-700 bg-zinc-800 focus-within:border-cyan-400">
            <div className="w-12 bg-zinc-100 text-black flex items-center justify-center text-sm font-bold border-r border-zinc-400">
              {prefixo}
            </div>
            <input
              type="text"
              name={name}
              value={localValues[name] || ""}
              onChange={(e) => handleChange(name, e.target.value)}
              onBlur={(e) => handleBlur(name, e.target.value)}
              className="flex-1 p-2 bg-transparent text-zinc-100 outline-none text-center"
              placeholder="0,00"
              inputMode="numeric"
              autoComplete="off"
            />
          </div>
        </div>
      );
    };
  }, [localValues, handleChange, handleBlur]);

  const tratarNumeros = useCallback(() => {
    const camposConvertidos = {};
    for (const chave in localValues) {
      const valor = localValues[chave];
      const valorLimpo = valor?.toString().replace(',', '.').trim();
      const num = parseFloat(valorLimpo);
      camposConvertidos[chave] = isNaN(num) ? 0 : num;
    }
    return camposConvertidos;
  }, [localValues]);

  const salvarConfiguracoes = useCallback(() => {
    const dados = tratarNumeros();
    onSave(dados);
  }, [tratarNumeros, onSave]);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-cyan-500/40 relative">
        <h2 className="text-xl text-cyan-300 font-bold mb-5 text-center">
          Configurar Integração Mercado Livre
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <InputComPrefixo label="Margem Mínima" name="margemMinima" prefixo="%" />
          <InputComPrefixo label="Margem Máxima" name="margemMaxima" prefixo="%" />
          <InputComPrefixo label="Premium" name="premium" prefixo="%" />
          <InputComPrefixo label="Clássico" name="classico" prefixo="%" />
          <InputComPrefixo label="Imposto CNPJ" name="imposto" prefixo="%" />
          <InputComPrefixo label="Extra" name="extras" prefixo="R$" />
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

