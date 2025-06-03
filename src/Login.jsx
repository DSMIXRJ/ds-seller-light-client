import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resposta = await axios.post('https://dsseller-backend-final.onrender.com/api/login', {
        email,
        password: senha,
      });

      if (
        resposta.data.message === 'Login bem-sucedido!' ||
        resposta.data.message === 'Login successful'
      ) {
        navigate('/dashboard');
      } else {
        setMensagem(resposta.data.message || 'Erro ao fazer login.');
      }
    } catch (erro) {
      setMensagem('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Bem-vindo ao futuro</h2>

        <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 mb-4 border rounded"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">Senha</label>
        <div className="relative">
          <input
            type={mostrarSenha ? 'text' : 'password'}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="w-full px-3 py-2 pr-10 border rounded"
          />
          <button
            type="button"
            onClick={() => setMostrarSenha(!mostrarSenha)}
            className="absolute right-2 top-2 text-sm text-gray-600"
            tabIndex={-1}
          >
            {mostrarSenha ? '🙈' : '👁️'}
          </button>
        </div>

        {mensagem && <p className="text-red-500 text-sm mt-3">{mensagem}</p>}

        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
