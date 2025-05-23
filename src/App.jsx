import { Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
