import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProductTableTanStack from "../components/ProductTableTanStack";

const nomes = {
  ml: "Mercado Livre",
  shopee: "Shopee",
  amazon: "Amazon",
};

export default function Anuncios() {
  const { integracao } = useParams();
  const [_, setMlIntegrado] = useState(localStorage.getItem("mlIntegrado") === "true");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const mlQuery = urlParams.get("ml_integrado");
    if (mlQuery === "1") {
      localStorage.setItem("mlIntegrado", "true");
      setMlIntegrado(true);
      window.dispatchEvent(new Event("mlStatusChange"));
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <MainLayout activePage="anuncios">
      <h1 className="text-2xl font-sans text-white mb-6">
        Anúncios — {nomes[integracao] || "Integração"}
      </h1>
      <ProductTableTanStack />
    </MainLayout>
  );
}
