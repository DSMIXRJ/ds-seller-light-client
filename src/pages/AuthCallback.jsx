import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      if (!code) {
        navigate("/integracoes");
        return;
      }

      try {
        const backendUrl = "https://dsseller-backend-final.onrender.com";
        await axios.get(
          `${backendUrl}/api/mercadolivre/exchange-code-get?code=${code}`
        );

        // salva no localStorage (slot 0 = Mercado Livre)
        const integrations = Array(6).fill({ integrated: false, marketplace: null });
        integrations[0] = {
          integrated: true,
          marketplace: { nome: "Mercado Livre", logo: "/ml-logo.png" },
        };
        localStorage.setItem("ds_integrations", JSON.stringify(integrations));

        // força hook a esperar 2 s e confirmar com backend
        navigate("/integracoes?ml_integrado=1");
      } catch (err) {
        console.error("Erro ao integrar:", err);
        navigate("/integracoes");
      }
    })();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      Processando integração...
    </div>
  );
}
