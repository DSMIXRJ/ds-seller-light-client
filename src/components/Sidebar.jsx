import { useState, useEffect } from "react";
import { Menu, Home, Layers, LogOut, Bot, List } from "lucide-react";
import logoMercadoLivre from "../assets/mercado-livre.png";
import logoShopee from "../assets/shopee.png";
import logoAmazon from "../assets/amazon.png";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function Sidebar({ activePage }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [anunciosOpen, setAnunciosOpen] = useState(false);
  const [mlIntegrado, setMlIntegrado] = useState(false);
  const [shopeeIntegrado, setShopeeIntegrado] = useState(false);
  const [amazonIntegrado, setAmazonIntegrado] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Verificar status de integração ao carregar o componente
  useEffect(() => {
    const checkIntegrationStatus = async () => {
      try {
        // Verificar status no localStorage primeiro (para resposta rápida)
        const localStatus = localStorage.getItem("mlIntegrado") === "true";
        setMlIntegrado(localStatus);
        
        // Verificar status no backend (mais confiável)
        const response = await axios.get("https://dsseller-backend-final.onrender.com/api/mercadolivre/integration-status");
        const backendStatus = response.data.integrated;
        
        // Atualizar estado e localStorage se necessário
        if (backendStatus !== localStatus) {
          setMlIntegrado(backendStatus);
          localStorage.setItem("mlIntegrado", backendStatus ? "true" : "false");
        }
      } catch (error) {
        console.error("Erro ao verificar status de integração:", error);
        // Manter o status do localStorage em caso de erro
      }
    };
    
    // Verificar parâmetro na URL (após redirecionamento de autenticação)
    const queryParams = new URLSearchParams(location.search);
    const mlIntegradoParam = queryParams.get('ml_integrado');
    
    if (mlIntegradoParam === '1') {
      localStorage.setItem("mlIntegrado", "true");
      setMlIntegrado(true);
    } else {
      // Verificar status atual
      checkIntegrationStatus();
    }
    
    // Adicionar event listener para detectar mudanças no localStorage
    const handleStorageChange = (e) => {
      if (e.key === "mlIntegrado") {
        setMlIntegrado(e.newValue === "true");
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [location]);

  return (
    <aside
      className={`fixed left-0 top-0 h-full z-10 transition-all duration-300 ease-in-out ${
        sidebarOpen ? "w-56" : "w-16"
      } bg-zinc-900/95 border-r border-zinc-800 flex flex-col py-6 px-2
      before:content-[''] before:absolute before:inset-0 before:rounded-3xl 
      before:border-4 before:border-cyan-400 before:blur before:opacity-60 
      before:pointer-events-none before:animate-pulse`}
      style={{ boxShadow: "0 0 24px 6px #06b6d4cc" }}
    >
      {/* Logo IA */}
      <div className="mb-10 flex items-center justify-center relative z-20">
        <Bot className="w-10 h-10 text-cyan-400" />
      </div>
      {/* Menu Buttons */}
      <nav className="flex flex-col gap-4 flex-1 relative z-20">
        <button
          onClick={() => navigate("/dashboard")}
          className={`flex items-center gap-3 px-3 py-3 rounded-xl text-lg font-medium transition ${
            activePage === "dashboard"
              ? "bg-cyan-900 text-cyan-300"
              : "hover:bg-zinc-800 text-zinc-200"
          }`}
          style={{ borderRadius: "1.25rem" }}
        >
          <Home className="w-6 h-6" />
          {sidebarOpen && <span>Dashboard</span>}
        </button>
        {/* Botão Integrações corrigido */}
        <button
          onClick={() => navigate("/integracoes")}
          className={`flex items-center gap-3 px-3 py-3 rounded-xl text-lg font-medium transition ${
            activePage === "integracoes"
              ? "bg-cyan-900 text-cyan-300"
              : "hover:bg-zinc-800 text-zinc-200"
          }`}
          style={{ borderRadius: "1.25rem" }}
        >
          <Layers className="w-6 h-6" />
          {sidebarOpen && <span>Integrações</span>}
        </button>
        {/* Botão Anúncios */}
        <button
          onClick={() => setAnunciosOpen(!anunciosOpen)}
          className={`flex items-center gap-3 px-3 py-3 rounded-xl text-lg font-medium transition ${
            activePage === "anuncios"
              ? "bg-cyan-900 text-cyan-300"
              : "hover:bg-zinc-800 text-zinc-200"
          }`}
          style={{ borderRadius: "1.25rem" }}
        >
          <List className="w-6 h-6" />
          {sidebarOpen && <span>Anúncios</span>}
        </button>
        {/* Submenu Anúncios */}
        {anunciosOpen && sidebarOpen && (
          <div className="flex flex-col gap-2 ml-7 mt-2">
            <button
              onClick={() => mlIntegrado && navigate("/anuncios/ml")}
              disabled={!mlIntegrado}
              className={`flex items-center gap-2 px-2 py-1 rounded-lg transition text-sm
                ${mlIntegrado
                  ? "bg-cyan-900 text-cyan-300 hover:bg-cyan-700"
                  : "bg-zinc-800 text-zinc-500 opacity-50 cursor-not-allowed"
                }`}
            >
              <img src={logoMercadoLivre} alt="ML" className="w-6 h-6" />
              Mercado Livre
            </button>
            <button
              onClick={() => shopeeIntegrado && navigate("/anuncios/shopee")}
              disabled={!shopeeIntegrado}
              className={`flex items-center gap-2 px-2 py-1 rounded-lg transition text-sm
                ${shopeeIntegrado
                  ? "bg-orange-900 text-orange-300 hover:bg-orange-700"
                  : "bg-zinc-800 text-zinc-500 opacity-50 cursor-not-allowed"
                }`}
            >
              <img src={logoShopee} alt="Shopee" className="w-6 h-6" />
              Shopee
            </button>
            <button
              onClick={() => amazonIntegrado && navigate("/anuncios/amazon")}
              disabled={!amazonIntegrado}
              className={`flex items-center gap-2 px-2 py-1 rounded-lg transition text-sm
                ${amazonIntegrado
                  ? "bg-yellow-900 text-yellow-300 hover:bg-yellow-700"
                  : "bg-zinc-800 text-zinc-500 opacity-50 cursor-not-allowed"
                }`}
            >
              <img src={logoAmazon} alt="Amazon" className="w-6 h-6" />
              Amazon
            </button>
          </div>
        )}
      </nav>
      {/* Colapsar Sidebar */}
      <button
        onClick={() => setSidebarOpen((s) => !s)}
        className="mt-10 mx-auto p-2 rounded-lg bg-zinc-800 hover:bg-cyan-900 transition relative z-20"
        title="Expandir/recolher menu"
      >
        <Menu className="w-6 h-6" />
      </button>
      {/* Sair */}
      <button
        title="Sair"
        className="mt-8 text-red-400 hover:text-red-600 transition mx-auto relative z-20"
      >
        <LogOut className="w-6 h-6" />
      </button>
    </aside>
  );
}
