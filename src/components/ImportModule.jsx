import { useState, useRef } from 'react';
import axios from "axios";

export default function ImportModule({ onImportSuccess }) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [importedData, setImportedData] = useState(null);
  const [importType, setImportType] = useState("");
  const fileInputRef = useRef(null);

  const backendUrl = 'http://localhost:3001';

  const handleDownloadTemplate = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/import/template`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'modelo_importacao.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      setStatus("Modelo baixado com sucesso!");
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      setStatus("Erro ao baixar modelo.");
    }
  };

  const handleFileUpload = async (file, type) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("arquivo", file);

    try {
      const endpoint = type === 'cost' ? 'cost-price' : 'sale-price';
      const response = await axios.post(
        `${backendUrl}/api/import/${endpoint}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      
      setStatus(response.data.message || "Importação concluída com sucesso.");
      setImportedData(response.data.data || []);
      setImportType(type);
      
      // Resetar o input de arquivo
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      console.error(err);
      setStatus("Erro ao processar arquivo.");
    }
  };

  const handleSendUpdates = async () => {
    if (!importedData || importedData.length === 0) {
      setStatus("Nenhum dado para enviar.");
      return;
    }

    try {
      const endpoint = importType === 'cost' ? 'send-cost-updates' : 'send-price-updates';
      const response = await axios.post(`${backendUrl}/api/import/${endpoint}`, {
        updates: importedData
      });
      
      setStatus(response.data.message || "Atualizações enviadas com sucesso!");
      
      // Notificar o componente pai sobre o sucesso da importação
      if (onImportSuccess) {
        onImportSuccess(importedData, importType);
      }
      
      // Limpar dados após envio
      setImportedData(null);
      setImportType("");
    } catch (err) {
      console.error(err);
      setStatus("Erro ao enviar atualizações.");
    }
  };

  return (
    <div className="mb-6">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
        >
          Importar
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-2 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg p-4 min-w-80 z-10">
            <div className="space-y-3">
              <button
                onClick={handleDownloadTemplate}
                className="w-full text-left px-3 py-2 hover:bg-zinc-700 rounded text-zinc-300 hover:text-white transition-colors"
              >
                📥 Baixar Modelo (.xlsx)
              </button>
              
              <div className="border-t border-zinc-700 pt-3">
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Upload de Preço de Venda:
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={(e) => handleFileUpload(e.target.files[0], 'sale')}
                  className="w-full text-sm text-zinc-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-cyan-600 file:text-white hover:file:bg-cyan-700"
                />
              </div>
              
              <div className="border-t border-zinc-700 pt-3">
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Upload de Preço de Custo:
                </label>
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={(e) => handleFileUpload(e.target.files[0], 'cost')}
                  className="w-full text-sm text-zinc-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-cyan-600 file:text-white hover:file:bg-cyan-700"
                />
              </div>
              
              {importedData && importedData.length > 0 && (
                <div className="border-t border-zinc-700 pt-3">
                  <button
                    onClick={handleSendUpdates}
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium transition-colors"
                  >
                    Enviar ({importedData.length} itens)
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {status && (
        <div className="mt-3 p-3 bg-zinc-800 border border-zinc-700 rounded text-sm text-zinc-300">
          {status}
        </div>
      )}
    </div>
  );
}

