// ✅ ARQUIVO: src/pages/Integracoes/useMLStatus.js

import { useState, useEffect } from "react";

const API_BASE_URL = "https://dsseller-backend-final.onrender.com";

export default function useMLStatus() {
  const [mlIntegrado, setMlIntegrado] = useState(false);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(false);
  const [showConfigML, setShowConfigML] = useState(false);
  const [mlConfig, setMlConfig] = useState({
    margemMinima: "",
    margemMaxima: "",
    premium: "",
    classico: "",
    imposto: "",
    extras: "",
  });

  const checkMLStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/mercadolivre/status`);
      const data = await response.json();
      return data.integrated || false;
    } catch {
      return false;
    }
  };

  const updateMLStatus = (status) => {
    setMlIntegrado(status);
    localStorage.setItem("mlIntegrado", status.toString());
    window.dispatchEvent(new Event("mlStatusChange"));
  };

  useEffect(() => {
    const initializeStatus = async () => {
      setLoading(true);
      const urlParams = new URLSearchParams(window.location.search);
      const mlQuery = urlParams.get("ml_integrado");

      if (mlQuery === "1") {
        setTimeout(async () => {
          const backendStatus = await checkMLStatus();
          updateMLStatus(backendStatus);
          setLoading(false);
        }, 2000);
        window.history.replaceState({}, document.title, window.location.pathname);
      } else {
        const backendStatus = await checkMLStatus();
        updateMLStatus(backendStatus);
        setLoading(false);
      }
    };

    initializeStatus();

    const handleStatusChange = async () => {
      const backendStatus = await checkMLStatus();
      setMlIntegrado(backendStatus);
    };

    window.addEventListener("mlStatusChange", handleStatusChange);
    return () => window.removeEventListener("mlStatusChange", handleStatusChange);
  }, []);

  const handleIntegrarML = () => {
    window.location.href = `${API_BASE_URL}/auth/meli`;
  };

  const handleRemoverML = async () => {
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
  };

  const handleSalvarConfigML = () => {
    setShowConfigML(false);
  };

  return {
    mlIntegrado,
    loading,
    removing,
    handleIntegrarML,
    handleRemoverML,
    showConfigML,
    setShowConfigML,
    mlConfig,
    setMlConfig,
    handleSalvarConfigML,
  };
}
