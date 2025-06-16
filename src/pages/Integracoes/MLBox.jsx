import { Settings } from "lucide-react";
import logoMercadoLivre from "../../assets/mercado-livre.png";
import { gerarEstiloBox, botaoEstilo } from "./styles";
import IntegrarDropdown from "../../components/IntegrarDropdown";

export default function MLBox({ integrado, removing, onRemover, onOpenConfig }) {
  return (
    <div
      className="flex flex-col items-center gap-2 p-6 w-48 h-48 rounded-3xl bg-zinc-900/60 backdrop-blur-md border-2 shadow-xl transition-all duration-500 hover:scale-105 hover:rotate-1 relative"
      style={gerarEstiloBox(integrado, "#00ff55")}
    >
      <button
        className="absolute top-3 right-3 text-cyan-400 hover:text-white bg-zinc-800/80 rounded-full p-1 shadow transition"
        style={{ zIndex: 2 }}
        onClick={onOpenConfig}
        title="Configurar integração Mercado Livre"
      >
        <Settings className="w-5 h-5" />
      </button>

      <img
        src={logoMercadoLivre}
        alt="Mercado Livre"
        className="w-16 h-16 object-contain mb-2 transition-transform duration-300 hover:scale-110"
        style={{
          filter: integrado
            ? "drop-shadow(0 0 12px #00ff55cc)"
            : "drop-shadow(0 0 12px #ff3333cc)",
          transition: "filter 0.3s",
        }}
      />
      <span className="text-sm text-zinc-300 font-bold">Mercado Livre</span>

      {integrado ? (
        <button
          style={botaoEstilo(true, removing)}
          onClick={onRemover}
          disabled={removing}
          className="hover:scale-105 active:scale-95"
        >
          {removing ? "Removendo..." : "Remover"}
        </button>
      ) : (
        <IntegrarDropdown
          onIntegrar={(mpId) => {
            if (mpId === "ml") {
              window.location.href =
                "https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=911500565972996&redirect_uri=https://dsseller.com.br/auth/callback";
            }
            // Shopee, Magalu, Amazon: placeholder (em breve)
          }}
        />
      )}
    </div>
  );
}
