import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      if (!code) {
        navigate("/integracoes");
        return;
      }

      try {
        const backend = "https://dsseller-backend-final.onrender.com";
        const res = await axios.get(`${backend}/api/mercadolivre/exchange-code-get?code=${code}`);
        if (res.data && res.data.integrated) {
          localStorage.setItem("mlIntegrado", "true");
          window.dispatchEvent(new Event("mlStatusChange"));
        }
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
