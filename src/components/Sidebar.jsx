import { useState, useEffect } from "react";
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

  const checkMLStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/mercadolivre/status`);
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

  const handleToggle = (marketplace) => {
    setMlOpen(marketplace === "ml" ? !mlOpen : false);
    setShopeeOpen(marketplace === "shopee" ? !shopeeOpen : false);
    setAmazonOpen(marketplace === "amazon" ? !amazonOpen : false);
  };

  const btnClass = "flex items-center gap-3 px-3 py-2 rounded-xl text-base font-normal transition w-full";
  const subBtnClass = "flex items-center gap-2 px-2 py-1 rounded-lg transition text-xs";

  return (
    <aside
      className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 ease-in-out ${
        sidebarOpen ? "w-56" : "w-12"
      } bg-zinc-900/95 border-r border-zinc-800 flex flex-col py-6 px-2`}
      style={{
        boxShadow: "0 0 40px 4px #06b6d440", // luz inferior
      }}
    >
      <div className="mb-10 flex items-center justify-center relative z-20">
        <Bot className="w-10 h-10 text-cyan-400" />
      </div>

      <nav className="flex flex-col gap-2 flex-1 relative z-20">
        <button
          onClick={() => navigate("/dashboard")}
          className={`${btnClass} ${
            activePage === "dashboard"
              ? "bg-cyan-900 text-cyan-300"
              : "hover:bg-zinc-800 text-zinc-200"
          }`}
        >
          <Home className="w-5 h-5" />
          {sidebarOpen && <span>Dashboard</span>}
        </button>

        <button
          onClick={() => navigate("/integracoes")}
          className={`${btnClass} ${
            activePage === "integracoes"
              ? "bg-cyan-900 text-cyan-300"
              : "hover:bg-zinc-800 text-zinc-200"
          }`}
        >
          <Layers className="w-5 h-5" />
          {sidebarOpen && <span>Integrações</span>}
        </button>

        {/* Mercado Livre */}
        <div>
          <button
            onClick={() => handleToggle("ml")}
            className={`${btnClass} ${
              mlOpen
                ? "bg-cyan-900 text-cyan-300"
                : mlIntegrado
                ? "hover:bg-zinc-800 text-zinc-200"
                : "bg-zinc-800 text-zinc-500 opacity-50 cursor-not-allowed"
            }`}
            disabled={!mlIntegrado}
          >
            <ShoppingCart className="w-5 h-5" />
            {sidebarOpen && <span>Mercado Livre</span>}
            {sidebarOpen && (
              <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${mlOpen ? "rotate-180" : ""}`} />
            )}
          </button>
          {mlOpen && sidebarOpen && (
            <div className="flex flex-col gap-1 ml-7 mt-1">
              <button
                onClick={() => mlIntegrado && navigate("/anuncios/ml")}
                disabled={!mlIntegrado}
                className={`${subBtnClass} ${
                  mlIntegrado
                    ? "bg-cyan-900 text-cyan-300 hover:bg-cyan-700"
                    : "bg-zinc-800 text-zinc-500 opacity-50 cursor-not-allowed"
                }`}
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
            className={`${btnClass} bg-zinc-800 text-zinc-500 cursor-not-allowed`}
            disabled
          >
            <ShoppingCart className="w-5 h-5" />
            {sidebarOpen && <span>Shopee</span>}
            {sidebarOpen && (
              <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${shopeeOpen ? "rotate-180" : ""}`} />
            )}
          </button>
          {shopeeOpen && sidebarOpen && (
            <div className="flex flex-col gap-1 ml-7 mt-1">
              <button
                disabled
                className={`${subBtnClass} bg-zinc-800 text-zinc-500 cursor-not-allowed`}
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
            className={`${btnClass} bg-zinc-800 text-zinc-500 cursor-not-allowed`}
            disabled
          >
            <ShoppingCart className="w-5 h-5" />
            {sidebarOpen && <span>Amazon</span>}
            {sidebarOpen && (
              <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${amazonOpen ? "rotate-180" : ""}`} />
            )}
          </button>
          {amazonOpen && sidebarOpen && (
            <div className="flex flex-col gap-1 ml-7 mt-1">
              <button
                disabled
                className={`${subBtnClass} bg-zinc-800 text-zinc-500 cursor-not-allowed`}
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
