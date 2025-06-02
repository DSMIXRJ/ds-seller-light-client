import { useState, useEffect } from "react";
import logoMercadoLivre from "../assets/mercado-livre.png";
import logoShopee from "../assets/shopee.png";
import logoAmazon from "../assets/amazon.png";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function Integracoes() {
  // Usar localStorage em vez de sessionStorage para persistência entre sessões
  const [mlIntegrado, setMlIntegrado] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verificar status de integração no backend ao carregar o componente
  useEffect(() => {
    const checkIntegrationStatus = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("https://dsseller-backend-final.onrender.com/api/mercadolivre/integration-status");
        const backendStatus = response.data.integrated;
        
        // Atualizar estado e localStorage
        setMlIntegrado(backendStatus);
        localStorage.setItem("mlIntegrado", backendStatus ? "true" : "false");
        
        // Disparar evento para notificar outras partes da aplicação
        const event = new Event('storage');
        event.key = 'mlIntegrado';
        event.newValue = backendStatus ? "true" : "false";
        window.dispatchEvent(event);
      } catch (error) {
        console.error("Erro ao verificar status de integração:", error);
        setError("Falha ao verificar status de integração");
        
        // Em caso de erro, usar o valor do localStorage como fallback
        const localStatus = localStorage.getItem("mlIntegrado") === "true";
        setMlIntegrado(localStatus);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Verificar status ao montar o componente
    checkIntegrationStatus();
    
    // Verificar status a cada 30 segundos para manter sincronizado
    const intervalId = setInterval(checkIntegrationStatus, 30000);
    
    // Limpar intervalo ao desmontar
    return () => clearInterval(intervalId);
  }, []);

  const handleIntegrarML = () => {
    setIsLoading(true);
    window.location.href = "https://dsseller-backend-final.onrender.com/auth/meli";
  };

  const handleRemoverML = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.delete("https://dsseller-backend-final.onrender.com/api/mercadolivre/remove-integration");
      
      if (response.data.success) {
        setMlIntegrado(false);
        localStorage.setItem("mlIntegrado", "false");
        
        // Disparar evento para notificar outras partes da aplicação
        const event = new Event('storage');
        event.key = 'mlIntegrado';
        event.newValue = "false";
        window.dispatchEvent(event);
      } else {
        throw new Error("Falha ao remover integração");
      }
    } catch (error) {
      console.error("Erro ao remover integração:", error);
      setError("Erro ao remover integração. Tente novamente.");
      alert("Erro ao remover integração. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 text-zinc-50">
      <Sidebar activePage="integracoes" />
      <main className="flex-1 ml-56 flex flex-col p-8 items-center justify-center">
        <div className="w-full max-w-6xl">
          <h1 className="text-3xl font-bold text-cyan-400 mb-10">Integrações de Marketplace</h1>
          
          {error && (
            <div className="bg-red-900/50 text-red-200 p-4 rounded-lg mb-6 text-center">
              {error}
            </div>
          )}
          
          <div className="flex flex-row gap-8 justify-center">
            {/* Mercado Livre */}
            <div 
              className="flex flex-col items-center gap-3 p-8 rounded-3xl bg-zinc-900 border-2 shadow-xl transition-all duration-300"
              style={{ 
                borderColor: mlIntegrado ? '#22c55e' : '#e63946',
                boxShadow: `0 0 30px 8px ${mlIntegrado ? 'rgba(34, 197, 94, 0.4)' : 'rgba(230, 57, 70, 0.4)'}`,
              }}
            >
              <div 
                className="w-28 h-28 rounded-full flex items-center justify-center p-2 transition-all duration-300"
                style={{ 
                  boxShadow: `0 0 20px 5px ${mlIntegrado ? 'rgba(34, 197, 94, 0.6)' : 'rgba(230, 57, 70, 0.6)'}`,
                  background: 'rgba(0, 0, 0, 0.2)'
                }}
              >
                <img src={logoMercadoLivre} alt="Mercado Livre" className="w-20 h-20 object-contain" />
              </div>
              <span className="text-lg text-zinc-200 font-bold mt-2">Mercado Livre</span>
              {isLoading ? (
                <button
                  disabled
                  className="mt-3 px-6 py-2 rounded-xl bg-zinc-700 text-white shadow-lg font-bold text-sm"
                  style={{ 
                    borderRadius: "1.25rem", 
                    boxShadow: "0 0 15px rgba(161, 161, 170, 0.5)" 
                  }}
                >
                  Carregando...
                </button>
              ) : mlIntegrado ? (
                <button
                  className="mt-3 px-6 py-2 rounded-xl bg-yellow-500 text-white shadow-lg font-bold hover:bg-yellow-600 transition text-sm"
                  style={{ 
                    borderRadius: "1.25rem", 
                    boxShadow: "0 0 15px rgba(234, 179, 8, 0.5)" 
                  }}
                  onClick={handleRemoverML}
                >
                  Remover
                </button>
              ) : (
                <button
                  className="mt-3 px-6 py-2 rounded-xl bg-yellow-500 text-white shadow-lg font-bold hover:bg-yellow-600 transition text-sm"
                  style={{ 
                    borderRadius: "1.25rem", 
                    boxShadow: "0 0 15px rgba(234, 179, 8, 0.5)" 
                  }}
                  onClick={handleIntegrarML}
                >
                  Integrar
                </button>
              )}
            </div>
            
            {/* Shopee */}
            <div 
              className="flex flex-col items-center gap-3 p-8 rounded-3xl bg-zinc-900 border-2 shadow-xl opacity-80 transition-all duration-300"
              style={{ 
                borderColor: '#e63946',
                boxShadow: '0 0 30px 8px rgba(230, 57, 70, 0.4)',
              }}
            >
              <div 
                className="w-28 h-28 rounded-full flex items-center justify-center p-2 transition-all duration-300"
                style={{ 
                  boxShadow: '0 0 20px 5px rgba(230, 57, 70, 0.6)',
                  background: 'rgba(0, 0, 0, 0.2)'
                }}
              >
                <img src={logoShopee} alt="Shopee" className="w-20 h-20 object-contain" />
              </div>
              <span className="text-lg text-zinc-200 font-bold mt-2">Shopee</span>
              <button 
                disabled 
                className="mt-3 px-6 py-2 rounded-xl bg-orange-500 text-white font-bold opacity-70 cursor-not-allowed text-sm"
                style={{ borderRadius: "1.25rem", boxShadow: "0 0 15px rgba(249, 115, 22, 0.4)" }}
              >
                Em breve
              </button>
            </div>
            
            {/* Amazon */}
            <div 
              className="flex flex-col items-center gap-3 p-8 rounded-3xl bg-zinc-900 border-2 shadow-xl opacity-80 transition-all duration-300"
              style={{ 
                borderColor: '#e63946',
                boxShadow: '0 0 30px 8px rgba(230, 57, 70, 0.4)',
              }}
            >
              <div 
                className="w-28 h-28 rounded-full flex items-center justify-center p-2 transition-all duration-300"
                style={{ 
                  boxShadow: '0 0 20px 5px rgba(230, 57, 70, 0.6)',
                  background: 'rgba(0, 0, 0, 0.2)'
                }}
              >
                <img src={logoAmazon} alt="Amazon" className="w-20 h-20 object-contain" />
              </div>
              <span className="text-lg text-zinc-200 font-bold mt-2">Amazon</span>
              <button 
                disabled 
                className="mt-3 px-6 py-2 rounded-xl bg-amber-600 text-white font-bold opacity-70 cursor-not-allowed text-sm"
                style={{ borderRadius: "1.25rem", boxShadow: "0 0 15px rgba(217, 119, 6, 0.4)" }}
              >
                Em breve
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
