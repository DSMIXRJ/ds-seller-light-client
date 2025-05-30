import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Anuncios from "./pages/Anuncios";
import Login from "./Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/anuncios/:integracao" element={<Anuncios />} />
      </Routes>
    </BrowserRouter>
  );
}
