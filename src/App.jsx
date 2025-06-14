import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import EscolherMarketplace from "./pages/EscolherMarketplace";
import Integracoes from "./pages/Integracoes";
import ProductTable from "./components/ProductTable";
import AuthCallback from "./pages/AuthCallback";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/escolher-marketplace" element={<EscolherMarketplace />} />
        <Route path="/integracoes" element={<Integracoes />} />
        <Route path="/produtos" element={<ProductTable />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </Router>
  );
}

export default App;
