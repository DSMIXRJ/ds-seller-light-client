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
          await axios.get(`${backendUrl}/api/mercadolivre/exchange-code-get?code=${code}`);

          const integration = {
            integrated: true,
            marketplace: {
              nome: "Mercado Livre",
              logo: "/ml-logo.png"
            }
          };

          const updated = Array(6).fill({ integrated: false, marketplace: null });
          updated[0] = integration;
          localStorage.setItem("ds_integrations", JSON.stringify(updated));

          navigate("/integracoes");
        } catch (error) {
          console.error("Erro ao integrar:", error);
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
