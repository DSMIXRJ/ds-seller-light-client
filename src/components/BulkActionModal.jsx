import { useState } from 'react';

export default function BulkActionModal({ isOpen, onClose, tipoAcao, onSubmit }) {
  const [valor, setValor] = useState('');
  const [file, setFile] = useState(null);

  const isImportacao = tipoAcao === 'importarCusto' || tipoAcao === 'importarPreco';

  const handleSubmit = () => {
    if (isImportacao && file) {
      onSubmit({ tipo: tipoAcao, arquivo: file });
    } else if (!isImportacao && valor) {
      onSubmit({ tipo: tipoAcao, porcentagem: Number(valor) });
    }
    setValor('');
    setFile(null);
    onClose();
  };

  if (!isOpen) return null;

  const titulos = {
    aumentarCusto: 'Aumentar custo por %',
    reduzirCusto: 'Reduzir custo por %',
    aumentarPreco: 'Aumentar preço por %',
    reduzirPreco: 'Reduzir preço por %',
    importarCusto: 'Importar custo via Excel',
    importarPreco: 'Importar preço via Excel',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-zinc-900 p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-white text-lg font-semibold mb-4">{titulos[tipoAcao]}</h2>

        {!isImportacao ? (
          <input
            type="number"
            placeholder="Digite o valor em %"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="w-full px-3 py-2 rounded bg-zinc-800 text-white border border-zinc-600 mb-4"
          />
        ) : (
          <input
            type="file"
            accept=".xlsx"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full text-white mb-4"
          />
        )}

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-white bg-zinc-700 rounded hover:bg-zinc-600">Cancelar</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Confirmar</button>
        </div>
      </div>
    </div>
  );
}
