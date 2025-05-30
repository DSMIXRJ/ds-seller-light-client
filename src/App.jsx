import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Anuncios from "./pages/Anuncios";
// import Integracoes from "./Integracoes"; // Removido pois não existe

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/anuncios/:integracao" element={<Anuncios />} />
        {/* Adicione aqui outras rotas reais do seu projeto, como Login, etc. */}
      </Routes>
    </BrowserRouter>
  );
}
