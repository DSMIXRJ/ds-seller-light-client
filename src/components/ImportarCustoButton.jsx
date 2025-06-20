import React, { useRef, useState } from "react";
import axios from "axios";

export default function ImportarCustoButton() {
  const fileInputRef = useRef(null);
  const [status, setStatus] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("arquivo", file);

    try {
      const response = await axios.post(
        "https://dsseller-backend-final.onrender.com/api/importar-custo",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setStatus(response.data.message || "Importação concluída com sucesso.");
    } catch (err) {
      console.error(err);
      setStatus("Erro ao importar planilha.");
    }
  };

  return (
    <div className="mb-4">
      <button
        onClick={() => fileInputRef.current.click()}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Importar Preço de Custo (Excel)
      </button>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".xlsx"
        onChange={handleUpload}
      />
      {status && <p className="mt-2 text-sm text-gray-700">{status}</p>}
    </div>
  );
}
