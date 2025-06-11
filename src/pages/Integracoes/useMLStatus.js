import { useState, useEffect, useCallback } from "react";

const API_BASE_URL = "https://dsseller-backend-final.onrender.com";

export default function useMLStatus() {
  const [mlIntegrado, setMlIntegrado] = useState(false);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(false);
  const [showConfigML, setShowConfigML] = useState(false);
  const [mlConfig, setMlConfig] = useState({
    margemMinima: "",
    margemMaxima: "",
    imposto: "",
    extras: "",
  });

  const checkMLStatus = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/mercadolivre/status`);
      const data = await response.json();
      return data.status === "ok";
    } catch {
      return false;
    }
  }, []);

  const fetchMLConfig = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/mercadolivre/config`);
      const data = await response.json();
      if (data) {
        setMlConfig({
          margemMinima: data.margemMinima !== undefined ? String(data.margemMinima) : "",
          margemMaxima: data.margemMaxima !== undefined ? String(data.margemMaxima) : "",
          imposto: data.imposto !== undefined ? String(data.imposto) : "",
          extras: data.extras !== undefined ? String(data.extras) : "",
        });
      }
    } catch (error) {
      console.error("Erro ao buscar configurações do ML:", error);
    }
  }, []);

  const updateMLStatus = useCallback((status) => {
    setMlIntegrado(status);
    localStorage.setItem("mlIntegrado", status.toString());
    window.dispatchEvent(new Event("mlStatusChange"));
  }, []);

  const handleSetMlConfig = useCallback((newConfig) => {
    if (typeof newConfig === 'function') {
      setMlConfig(prev => newConfig(prev));
    } else {
      setMlConfig(newConfig);
    }
  }, []);

  useEffect(() => {
    const initializeStatusAndConfig = async () => {
      setLoading(true);
      const urlParams = new URLSearchParams(window.location.search);
      const mlQuery = urlParams.get("ml_integrado");

      if (mlQuery === "1") {
        setTimeout(async () => {
          const backendStatus = await checkMLStatus();
          updateMLStatus(backendStatus);
          await fetchMLConfig();
          setLoading(false);
        }, 2000);
        window.history.replaceState({}, document.title, window.location.pathname);
      } else {
        const backendStatus = await checkMLStatus();
        updateMLStatus(backendStatus);
        await fetchMLConfig();
        setLoading(false);
      }
    };

    initializeStatusAndConfig();

    const handleStatusChange = async () => {
      const backendStatus = await checkMLStatus();
      setMlIntegrado(backendStatus);
      await fetchMLConfig();
    };

    window.addEventListener("mlStatusChange", handleStatusChange);
    return () => window.removeEventListener("mlStatusChange", handleStatusChange);
  }, [checkMLStatus, updateMLStatus, fetchMLConfig]);

  const handleIntegrarML = useCallback(() => {
    window.location.href = `${API_BASE_URL}/auth/meli`;
  }, []);

  const handleRemoverML = useCallback(async () => {
    if (removing) return;
    setRemoving(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/mercadolivre/remove`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.success) updateMLStatus(false);
    } finally {
      setRemoving(false);
    }
  }, [removing, updateMLStatus]);

  const handleSalvarConfigML = useCallback(async (configToSave) => {
    console.log("Dados de configuração sendo enviados para o backend:", configToSave);
    try {
      const response = await fetch(`${API_BASE_URL}/api/mercadolivre/config`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(configToSave),
      });
      const data = await response.json();
      if (data.success) {
        setMlConfig(configToSave);
        setShowConfigML(false);
      } else {
        console.error("Erro ao salvar configurações do ML:", data.message || "Erro desconhecido");
      }
    } catch (error) {
      console.error("Erro ao salvar configurações do ML:", error);
    }
  }, []);

  return {
    mlIntegrado,
    loading,
    removing,
    handleIntegrarML,
    handleRemoverML,
    showConfigML,
    setShowConfigML,
    mlConfig,
    setMlConfig: handleSetMlConfig,
    handleSalvarConfigML,
  };
}
