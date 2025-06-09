// ✅ ARQUIVO: src/pages/Integracoes/ConfigModalML.jsx

import { NumericFormat } from "react-number-format";

export default function ConfigModalML({ config, setConfig, onClose, onSave }) {
  const handleChange = (name, value) => {
    setConfig((prev) => ({ ...prev, [name]: value }));
  };

  const Campo = ({ label, name, prefixo }) => (
    <div className="col-span-1">
      <label className="text-sm text-zinc-200 font-semibold block text-center mb-1">{label}</label>
      <div className="flex w-full rounded-lg overflow-hidden border border-zinc-700 bg-zinc-800 focus-within:border-cyan-400">
        <div className="w-12 bg-zinc-100 text-black flex items-center justify-center text-sm font-bold border-r border-zinc-400">
          {prefixo}
        </div>
        <NumericFormat
          value={config[name]}
          onValueChange={({ value }) => handleChange(name, value)}
          thousandSeparator="."
          decimalSeparator=","
          allowNegative={false}
          decimalScale={2}
          fixedDecimalScale
          placeholder="0,00"
          className="flex-1 p-2 bg-transparent text-zinc-100 outline-none"
        />
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
          <Campo label="Margem Mínima" name="margemMinima" prefixo="%" />
          <Campo label="Margem Máxima" name="margemMaxima" prefixo="%" />
          <Campo label="Premium" name="premium" prefixo="%" />
          <Campo label="Clássico" name="classico" prefixo="%" />
          <Campo label="Imposto CNPJ" name="imposto" prefixo="%" />
          <Campo label="Extra" name="extras" prefixo="R$" />
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
