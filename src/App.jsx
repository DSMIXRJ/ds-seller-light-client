import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import EscolherMarketplace from "./pages/EscolherMarketplace";
import Integracoes from "./pages/Integracoes";
import AuthCallback from "./pages/AuthCallback";
import Anuncios from "./pages/Anuncios";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/escolher-marketplace" element={<EscolherMarketplace />} />
        <Route path="/integracoes" element={<Integracoes />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/anuncios/:integracao" element={<Anuncios />} />
      </Routes>
    </Router>
  );
}

export default App;


