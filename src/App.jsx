import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Anuncios from "./pages/Anuncios";
import Integracoes from "./Integracoes"; // se existir

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/anuncios/:integracao" element={<Anuncios />} />
        <Route path="/integracoes" element={<Integracoes />} />
        {/* ...outras rotas, como login, etc... */}
      </Routes>
    </BrowserRouter>
  );
}
