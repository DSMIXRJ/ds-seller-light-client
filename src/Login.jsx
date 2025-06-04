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
    <div className="flex items-center justify-center min-h-screen text-white content-layer">
      <form 
        onSubmit={handleLogin} 
        className="bg-zinc-900/70 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-sm border border-cyan-400/30 glow-cyan"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-cyan-400 glow-cyan tracking-wider">
          Bem-vindo ao futuro
        </h2>

        <label className="block mb-2 text-sm font-medium text-cyan-300">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 mb-4 bg-zinc-800/60 backdrop-blur-sm border border-cyan-400/50 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:border-cyan-400 focus:glow-cyan transition-all duration-300"
          placeholder="seu@email.com"
        />

        <label className="block mb-2 text-sm font-medium text-cyan-300">Senha</label>
        <div className="relative">
          <input
            type={mostrarSenha ? 'text' : 'password'}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="w-full px-4 py-3 pr-12 bg-zinc-800/60 backdrop-blur-sm border border-cyan-400/50 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:border-cyan-400 focus:glow-cyan transition-all duration-300"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setMostrarSenha(!mostrarSenha)}
            className="absolute right-3 top-3 text-lg text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
            tabIndex={-1}
          >
            {mostrarSenha ? '🙈' : '👁️'}
          </button>
        </div>

        {mensagem && (
          <p className="text-red-400 text-sm mt-3 bg-red-900/20 backdrop-blur-sm p-2 rounded-lg border border-red-400/30">
            {mensagem}
          </p>
        )}

        <button
          type="submit"
          className="w-full mt-6 bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 px-4 rounded-xl hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 font-semibold glow-cyan hover:scale-105 active:scale-95"
        >
          Entrar
        </button>

        {/* Botão de acesso rápido para desenvolvimento */}
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="w-full mt-3 bg-zinc-700/60 backdrop-blur-sm text-zinc-300 py-2 px-4 rounded-xl hover:bg-zinc-600/60 transition-all duration-300 text-sm border border-zinc-600/50"
        >
          Acesso Rápido (Dev)
        </button>
      </form>
    </div>
  );
}

export default Login;

