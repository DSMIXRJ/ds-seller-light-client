import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Anuncios from "./pages/Anuncios";
import Login from "./Login";
import Integracoes from "./pages/Integracoes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/anuncios/:integracao" element={<Anuncios />} />
        <Route path="/integracoes" element={<Integracoes />} />
      </Routes>
    </BrowserRouter>
  );
}
