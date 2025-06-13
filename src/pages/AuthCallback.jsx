import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        try {
          const backendUrl = "https://dsseller-backend-final.onrender.com";
          await axios.post(`${backendUrl}/api/mercadolivre/exchange-code`, { code });
          navigate("/integracoes");
        } catch (error) {
          console.error("Erro ao trocar o código:", error);
          navigate("/integracoes");
        }
      } else {
        navigate("/integracoes");
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      Processando integração...
    </div>
  );
}
