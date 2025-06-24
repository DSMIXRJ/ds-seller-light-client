import React, { useState, useRef } from "react";
import axios from "axios";

export default function ImportModule({ onImportSuccess }) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [importedData, setImportedData] = useState(null);
  const [importType, setImportType] = useState("");
  const fileInputRef = useRef(null);

  const backendUrl = 'https://dsseller-backend-final.onrender.com';

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
      setImportedData(response.data.updates);
      setImportType(type);
      
      if (onImportSuccess) {
        onImportSuccess(response.data.updates, type);
      }
    } catch (err) {
      console.error(err);
      setStatus("Erro ao importar planilha.");
      setImportedData(null);
      setImportType("");
    }
  };

  const handleSendUpdates = async () => {
    if (!importedData || !importType) return;

    try {
      const endpoint = importType === 'cost' ? 'send-cost-updates' : 'send-price-updates';
      const response = await axios.post(
        `${backendUrl}/api/import/${endpoint}`,
        { updates: importedData }
      );
      
      setStatus(response.data.message || "Atualizações enviadas com sucesso!");
      setImportedData(null);
      setImportType("");
    } catch (err) {
      console.error(err);
      setStatus("Erro ao enviar atualizações.");
    }
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
    
    if (option === 'template') {
      handleDownloadTemplate();
    } else {
      fileInputRef.current.click();
      fileInputRef.current.setAttribute('data-type', option);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const type = e.target.getAttribute('data-type');
    if (file && type) {
      handleFileUpload(file, type);
    }
    e.target.value = ''; // Reset input
  };

  return (
    <div className="relative mb-4">
      {/* Botão principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 shadow-lg border border-cyan-500/30 font-medium"
      >
        Importar
        <svg 
          className={`ml-2 inline w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-zinc-800 border border-cyan-500/30 rounded-lg shadow-xl z-50 overflow-hidden">
          <div className="py-2">
            <button
              onClick={() => handleOptionClick('template')}
              className="w-full px-4 py-3 text-left text-white hover:bg-cyan-600/20 transition-colors duration-200 border-b border-zinc-700/50"
            >
              <div className="font-medium text-cyan-400">Modelo</div>
              <div className="text-xs text-zinc-400 mt-1">Baixar planilha modelo (.xlsx)</div>
            </button>
            
            <button
              onClick={() => handleOptionClick('sale')}
              className="w-full px-4 py-3 text-left text-white hover:bg-cyan-600/20 transition-colors duration-200 border-b border-zinc-700/50"
            >
              <div className="font-medium text-green-400">Preço de Venda</div>
              <div className="text-xs text-zinc-400 mt-1">Importar preços de venda</div>
            </button>
            
            <button
              onClick={() => handleOptionClick('cost')}
              className="w-full px-4 py-3 text-left text-white hover:bg-cyan-600/20 transition-colors duration-200"
            >
              <div className="font-medium text-yellow-400">Preço de Custo</div>
              <div className="text-xs text-zinc-400 mt-1">Importar preços de custo</div>
            </button>
          </div>
        </div>
      )}

      {/* Input de arquivo oculto */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".xlsx"
        onChange={handleFileChange}
      />

      {/* Status */}
      {status && (
        <div className="mt-3 p-3 bg-zinc-800 border border-cyan-500/30 rounded-lg">
          <p className="text-sm text-cyan-300">{status}</p>
        </div>
      )}

      {/* Botão Enviar */}
      {importedData && importedData.length > 0 && (
        <div className="mt-3">
          <button
            onClick={handleSendUpdates}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg border border-green-500/30 font-medium"
          >
            Enviar ({importedData.length} itens)
          </button>
          <p className="text-xs text-zinc-400 mt-2">
            {importType === 'cost' ? 'Preços de custo' : 'Preços de venda'} prontos para envio
          </p>
        </div>
      )}

      {/* Overlay para fechar dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

