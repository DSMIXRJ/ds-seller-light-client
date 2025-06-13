import { useEffect } from "react";
import axios from "axios";

export default function AuthCallback() {
  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      if (!code) {
        window.location.replace("/integracoes");
        return;
      }

      try {
        const backend = "https://dsseller-backend-final.onrender.com";
        await axios.get(`${backend}/api/mercadolivre/exchange-code-get?code=${code}`);

        // slot-0 = Mercado Livre integrado
        const integrations = Array(6).fill({ integrated: false, marketplace: null });
        integrations[0] = {
          integrated: true,
          marketplace: { nome: "Mercado Livre", logo: "/ml-logo.png" },
        };
        localStorage.setItem("ds_integrations", JSON.stringify(integrations));
        localStorage.setItem("mlIntegrado", "true"); // para outros componentes
        window.dispatchEvent(new Event("mlStatusChange")); // avisa a sidebar

        // recarrega app com flag → hook useMLStatus confirma no backend
        window.location.replace("/integracoes?ml_integrado=1");
      } catch (err) {
        console.error("Erro ao integrar:", err);
        window.location.replace("/integracoes");
      }
    })();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      Processando integração...
    </div>
  );
}
