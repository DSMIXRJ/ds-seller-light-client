import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Anuncios from "./pages/Anuncios";
import Login from "./Login";
import Integracoes from "./pages/Integracoes";
import FuturisticBackground from "./components/FuturisticBackground";

export default function App() {
  return (
    <BrowserRouter>
      {/* Fundo futurista aplicado globalmente com maior prioridade de renderização */}
      <FuturisticBackground />
      
      {/* Conteúdo principal com z-index superior */}
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/anuncios/:integracao" element={<Anuncios />} />
          <Route path="/integracoes" element={<Integracoes />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

