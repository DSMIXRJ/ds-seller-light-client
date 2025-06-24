import { useState } from 'react';

export default function BulkActionsMenu({ onAction }) {
  const [showAlterar, setShowAlterar] = useState(false);
  const [showImportar, setShowImportar] = useState(false);

  return (
    <div className="flex gap-4">
      {/* Botão Alterações em Massa */}
      <div className="relative">
        <button
          className="bg-blue-600 text-white font-medium px-4 py-2 rounded hover:bg-blue-700 transition"
          onMouseEnter={() => setShowAlterar(true)}
          onMouseLeave={() => setShowAlterar(false)}
        >
          Alterações em Massa
        </button>
        {showAlterar && (
          <div
            className="absolute left-0 mt-1 w-56 bg-zinc-800 text-white rounded shadow-lg z-10"
            onMouseEnter={() => setShowAlterar(true)}
            onMouseLeave={() => setShowAlterar(false)}
          >
            <ul className="py-2 text-sm">
              <li className="px-4 py-2 hover:bg-zinc-700 cursor-pointer" onClick={() => onAction('aumentarCusto')}>📈 Aumentar custo (%)</li>
              <li className="px-4 py-2 hover:bg-zinc-700 cursor-pointer" onClick={() => onAction('reduzirCusto')}>📉 Reduzir custo (%)</li>
              <li className="px-4 py-2 hover:bg-zinc-700 cursor-pointer" onClick={() => onAction('aumentarPreco')}>💰 Aumentar preço (%)</li>
              <li className="px-4 py-2 hover:bg-zinc-700 cursor-pointer" onClick={() => onAction('reduzirPreco')}>💸 Reduzir preço (%)</li>
            </ul>
          </div>
        )}
      </div>

      {/* Botão Importar Excel */}
      <div className="relative">
        <button
          className="bg-blue-600 text-white font-medium px-4 py-2 rounded hover:bg-blue-700 transition"
          onMouseEnter={() => setShowImportar(true)}
          onMouseLeave={() => setShowImportar(false)}
        >
          Importar Excel
        </button>
        {showImportar && (
          <div
            className="absolute left-0 mt-1 w-56 bg-zinc-800 text-white rounded shadow-lg z-10"
            onMouseEnter={() => setShowImportar(true)}
            onMouseLeave={() => setShowImportar(false)}
          >
            <ul className="py-2 text-sm">
              <li className="px-4 py-2 hover:bg-zinc-700 cursor-pointer" onClick={() => onAction('importarCusto')}>🧾 Importar custo (SKU + custo)</li>
              <li className="px-4 py-2 hover:bg-zinc-700 cursor-pointer" onClick={() => onAction('importarPreco')}>🧾 Importar preço (SKU + preço)</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
