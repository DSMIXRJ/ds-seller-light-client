import { useState, useEffect } from "react";
import logoMercadoLivre from "../assets/mercado-livre.png";
import logoShopee from "../assets/shopee.png";
import logoAmazon from "../assets/amazon.png";
import Sidebar from "../components/Sidebar";

const API_BASE_URL = "https://dsseller-backend-final.onrender.com";

export default function Integracoes() {
  const [mlIntegrado, setMlIntegrado] = useState(false);
  const [shopeeIntegrado, setShopeeIntegrado] = useState(false);
  const [amazonIntegrado, setAmazonIntegrado] = useState(false);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(false);

  // Função para verificar status no backend
  const checkMLStatus = async () => {
    try {
      const response = await fetch(${API_BASE_URL}/api/mercadolivre/status);
      const data = await response.json();
      return data.integrated || false;
    } catch (error) {
      console.error("Erro ao verificar status ML:", error);
      return false;
    }
  };

  // Função para atualizar status local e global
  const updateMLStatus = (status) => {
    setMlIntegrado(status);
    localStorage.setItem("mlIntegrado", status.toString());
    window.dispatchEvent(new Event("mlStatusChange"));
  };

  useEffect(() => {
    const initializeStatus = async () => {
      setLoading(true);
      
      // Sempre checa a URL para integração
      const urlParams = new URLSearchParams(window.location.search);
      const mlQuery = urlParams.get("ml_integrado");

      if (mlQuery === "1") {
        // Se veio da URL de callback, aguarda um pouco para o backend processar
        setTimeout(async () => {
          const backendStatus = await checkMLStatus();
          updateMLStatus(backendStatus);
          setLoading(false);
        }, 2000);

        // Remove o parâmetro da URL (sem recarregar)
        window.history.replaceState({}, document.title, window.location.pathname);
      } else {
        // Verifica status no backend
        const backendStatus = await checkMLStatus();
        updateMLStatus(backendStatus);
        setLoading(false);
      }
    };

    initializeStatus();

    // Atualiza status em tempo real
    const handleStatusChange = async () => {
      const backendStatus = await checkMLStatus();
      setMlIntegrado(backendStatus);
    };
    window.addEventListener("mlStatusChange", handleStatusChange);

    return () => {
      window.removeEventListener("mlStatusChange", handleStatusChange);
    };
  }, []);

  const handleIntegrarML = () => {
    window.location.href = ${API_BASE_URL}/auth/meli;
  };

  const handleRemoverML = async () => {
    if (removing) return;
    
    setRemoving(true);
    try {
      const response = await fetch(${API_BASE_URL}/api/mercadolivre/remove, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (data.success) {
        updateMLStatus(false);
        console.log("Integração removida com sucesso");
      } else {
        console.error("Erro ao remover integração:", data.message);
        alert("Erro ao remover integração. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao remover integração:", error);
      alert("Erro ao remover integração. Tente novamente.");
    } finally {
      setRemoving(false);
    }
  };

  // Luzes sincronizadas
  const gerarEstiloBox = (integrado, cor, isDisabled = false) => {
    if (isDisabled) {
      return {
        borderColor: "#666",
        boxShadow: 0 0 15px 2px #66666633,
      };
    }
    return {
      borderColor: integrado ? cor : "#ff0000",
      boxShadow: integrado
        ? 0 0 30px 6px ${cor}cc, 0 0 15px 2px ${cor}99
        : 0 0 25px 4px #ff0000cc, 0 0 12px 2px #ff000099,
      transition: "0.3s",
    };
  };

  const botaoEstilo = (integrado, isLoading = false) => {
    const cor = integrado ? "#00ff55" : "#ff3333";
    return {
      marginTop: "0.5rem",
      backgroundColor: "rgba(17, 17, 17, 0.8)",
      color: isLoading ? "#999" : cor,
      fontWeight: "bold",
      padding: "8px 18px",
      borderRadius: "1.25rem",
      boxShadow: isLoading ? "none" : 0 0 15px ${cor}66,
      textShadow: isLoading ? "none" : 0 0 6px ${cor},
      fontSize: "0.875rem",
      transition: "0.3s all ease-in-out",
      backdropFilter: "blur(10px)",
      border: 1px solid ${isLoading ? "#666" : cor}44,
      cursor: isLoading ? "not-allowed" : "pointer",
    };
  };

  if (loading) {
    return (
      <div className="flex min-h-screen text-white content-layer">
        <Sidebar />
        <div className="flex flex-col flex-1 items-center justify-center py-16 min-h-[60vh]">
          <div className="text-cyan-400 text-lg">Verificando status das integrações...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen text-white content-layer">
      <Sidebar />
      <div className="flex flex-col flex-1 items-center py-16 min-h-[60vh]">
        <h1 className="text-3xl font-bold text-cyan-400 mb-10 glow-cyan tracking-wider">
          Integrações de Marketplace
        </h1>
        <div className="flex flex-row gap-8 flex-wrap justify-center">
          {/* Mercado Livre */}
          <div
            className="flex flex-col items-center gap-2 p-6 w-48 h-48 rounded-3xl bg-zinc-900/60 backdrop-blur-md border-2 shadow-xl transition-all duration-500 hover:scale-105 hover:rotate-1"
            style={gerarEstiloBox(mlIntegrado, "#00ff55")}
          >
            <img
              src={logoMercadoLivre}
              alt="Mercado Livre"
              className="w-16 h-16 object-contain mb-2 transition-transform duration-300 hover:scale-110"
              style={{
                filter: mlIntegrado
                  ? "drop-shadow(0 0 12px #00ff55cc)"
                  : "drop-shadow(0 0 12px #ff3333cc)",
                transition: "filter 0.3s",
              }}
            />
            <span className="text-sm text-zinc-300 font-bold">Mercado Livre</span>
            {mlIntegrado ? (
              <button
                style={botaoEstilo(true, removing)}
                onClick={handleRemoverML}
                disabled={removing}
                className="hover:scale-105 active:scale-95"
              >
                {removing ? "Removendo..." : "Remover"}
              </button>
            ) : (
              <button
                style={botaoEstilo(false)}
                onClick={handleIntegrarML}
                className="hover:scale-105 active:scale-95"
              >
                Integrar
              </button>
            )}
          </div>

          {/* Shopee */}
          <div
            className="flex flex-col items-center gap-2 p-6 w-48 h-48 rounded-3xl bg-zinc-900/40 backdrop-blur-md border-2 shadow-xl opacity-70 transition-all duration-500 hover:opacity-90"
            style={gerarEstiloBox(shopeeIntegrado, "#ff9900", true)}
          >
            <img
              src={logoShopee}
              alt="Shopee"
              className="w-16 h-16 object-contain mb-2 grayscale"
            />
            <span className="text-sm text-zinc-400 font-bold">Shopee</span>
            <button
              disabled
              className="mt-2 px-4 py-2 rounded-xl bg-orange-500/30 backdrop-blur-sm text-zinc-400 font-bold opacity-60 cursor-not-allowed text-sm border border-orange-500/20"
              style={{ borderRadius: "1.25rem" }}
            >
              Em breve
            </button>
          </div>

          {/* Amazon */}
          <div
            className="flex flex-col items-center gap-2 p-6 w-48 h-48 rounded-3xl bg-zinc-900/40 backdrop-blur-md border-2 shadow-xl opacity-70 transition-all duration-500 hover:opacity-90"
            style={gerarEstiloBox(amazonIntegrado, "#ffaa00", true)}
          >
            <img
              src={logoAmazon}
              alt="Amazon"
              className="w-16 h-16 object-contain mb-2 grayscale"
            />
            <span className="text-sm text-zinc-400 font-bold">Amazon</span>
            <button
              disabled
              className="mt-2 px-4 py-2 rounded-xl bg-yellow-400/30 backdrop-blur-sm text-zinc-400 font-bold opacity-60 cursor-not-allowed text-sm border border-yellow-400/20"
              style={{ borderRadius: "1.25rem" }}
            >
              Em breve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}   ---   import { useState, useEffect } from "react";
import { Menu, Home, Layers, LogOut, Bot, ShoppingCart, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const API_BASE_URL = "https://dsseller-backend-final.onrender.com";

export default function Sidebar({ activePage }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mlOpen, setMlOpen] = useState(false);
  const [shopeeOpen, setShopeeOpen] = useState(false);
  const [amazonOpen, setAmazonOpen] = useState(false);
  const [mlIntegrado, setMlIntegrado] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Verifica status da integração Mercado Livre
  const checkMLStatus = async () => {
    try {
      const response = await fetch(${API_BASE_URL}/api/mercadolivre/status);
      const data = await response.json();
      return data.integrated || false;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const updateStatus = async () => {
      const localStatus = localStorage.getItem("mlIntegrado") === "true";
      setMlIntegrado(localStatus);
      const backendStatus = await checkMLStatus();
      if (backendStatus !== localStatus) {
        setMlIntegrado(backendStatus);
        localStorage.setItem("mlIntegrado", backendStatus.toString());
      }
    };
    updateStatus();
    const handleStatusChange = async () => {
      const backendStatus = await checkMLStatus();
      setMlIntegrado(backendStatus);
    };
    window.addEventListener("mlStatusChange", handleStatusChange);
    return () => {
      window.removeEventListener("mlStatusChange", handleStatusChange);
    };
  }, [location]);

  // Função genérica para abrir/fechar submenus
  const handleToggle = (marketplace) => {
    setMlOpen(marketplace === "ml" ? !mlOpen : false);
    setShopeeOpen(marketplace === "shopee" ? !shopeeOpen : false);
    setAmazonOpen(marketplace === "amazon" ? !amazonOpen : false);
  };

  // Classes para fonte menor e suavidade
  const btnClass = "flex items-center gap-3 px-3 py-2 rounded-xl text-base font-normal transition w-full";
  const subBtnClass = "flex items-center gap-2 px-2 py-1 rounded-lg transition text-xs";

  return (
    <aside
      className={fixed top-0 left-0 h-full z-40 transition-all duration-300 ease-in-out ${
        sidebarOpen ? "w-44" : "w-12"
      } bg-zinc-900/95 border-r border-zinc-800 flex flex-col py-6 px-2
      before:content-[''] before:absolute before:inset-0 before:rounded-3xl 
      before:border-4 before:border-cyan-400 before:blur before:opacity-60 
      before:pointer-events-none before:animate-pulse}
      style={{ boxShadow: "0 0 24px 6px #06b6d4cc" }}
    >
      <div className="mb-10 flex items-center justify-center relative z-20">
        <Bot className="w-10 h-10 text-cyan-400" />
      </div>

      <nav className="flex flex-col gap-2 flex-1 relative z-20">
        <button
          onClick={() => navigate("/dashboard")}
          className={${btnClass} ${
            activePage === "dashboard"
              ? "bg-cyan-900 text-cyan-300"
              : "hover:bg-zinc-800 text-zinc-200"
          }}
        >
          <Home className="w-5 h-5" />
          {sidebarOpen && <span>Dashboard</span>}
        </button>

        <button
          onClick={() => navigate("/integracoes")}
          className={${btnClass} ${
            activePage === "integracoes"
              ? "bg-cyan-900 text-cyan-300"
              : "hover:bg-zinc-800 text-zinc-200"
          }}
        >
          <Layers className="w-5 h-5" />
          {sidebarOpen && <span>Integrações</span>}
        </button>

        {/* Mercado Livre */}
        <div>
          <button
            onClick={() => handleToggle("ml")}
            className={${btnClass} ${
              mlOpen
                ? "bg-cyan-900 text-cyan-300"
                : mlIntegrado
                ? "hover:bg-zinc-800 text-zinc-200"
                : "bg-zinc-800 text-zinc-500 opacity-50 cursor-not-allowed"
            }}
            disabled={!mlIntegrado}
          >
            <ShoppingCart className="w-5 h-5" />
            {sidebarOpen && <span>Mercado Livre</span>}
            {sidebarOpen && <ChevronDown className={w-4 h-4 ml-auto transition-transform ${mlOpen ? "rotate-180" : ""}} />}
          </button>
          {mlOpen && sidebarOpen && (
            <div className="flex flex-col gap-1 ml-7 mt-1">
              <button
                onClick={() => mlIntegrado && navigate("/anuncios/ml")}
                disabled={!mlIntegrado}
                className={${subBtnClass} ${
                  mlIntegrado
                    ? "bg-cyan-900 text-cyan-300 hover:bg-cyan-700"
                    : "bg-zinc-800 text-zinc-500 opacity-50 cursor-not-allowed"
                }}
              >
                Anúncios
              </button>
            </div>
          )}
        </div>

        {/* Shopee */}
        <div>
          <button
            onClick={() => handleToggle("shopee")}
            className={${btnClass} bg-zinc-800 text-zinc-500 cursor-not-allowed}
            disabled
          >
            <ShoppingCart className="w-5 h-5" />
            {sidebarOpen && <span>Shopee</span>}
            {sidebarOpen && <ChevronDown className={w-4 h-4 ml-auto transition-transform ${shopeeOpen ? "rotate-180" : ""}} />}
          </button>
          {shopeeOpen && sidebarOpen && (
            <div className="flex flex-col gap-1 ml-7 mt-1">
              <button
                disabled
                className={${subBtnClass} bg-zinc-800 text-zinc-500 cursor-not-allowed}
              >
                Em breve
              </button>
            </div>
          )}
        </div>

        {/* Amazon */}
        <div>
          <button
            onClick={() => handleToggle("amazon")}
            className={${btnClass} bg-zinc-800 text-zinc-500 cursor-not-allowed}
            disabled
          >
            <ShoppingCart className="w-5 h-5" />
            {sidebarOpen && <span>Amazon</span>}
            {sidebarOpen && <ChevronDown className={w-4 h-4 ml-auto transition-transform ${amazonOpen ? "rotate-180" : ""}} />}
          </button>
          {amazonOpen && sidebarOpen && (
            <div className="flex flex-col gap-1 ml-7 mt-1">
              <button
                disabled
                className={${subBtnClass} bg-zinc-800 text-zinc-500 cursor-not-allowed}
              >
                Em breve
              </button>
            </div>
          )}
        </div>
      </nav>

      <button
        onClick={() => setSidebarOpen((s) => !s)}
        className="mt-10 mx-auto p-2 rounded-lg bg-zinc-800 hover:bg-cyan-900 transition relative z-20"
        title="Expandir/recolher menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      <button
        title="Sair"
        className="mt-8 text-red-400 hover:text-red-600 transition mx-auto relative z-20"
      >
        <LogOut className="w-6 h-6" />
      </button>
    </aside>
  );
} 
