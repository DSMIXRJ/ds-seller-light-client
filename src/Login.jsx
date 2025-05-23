import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resposta = await axios.post('https://dsseller-backend-final.onrender.com/api/login', {
        email,
        password
      });

      if (resposta.data.message === 'Login bem-sucedido!') {
        navigate('/dashboard');
      } else {
        setMensagem(resposta.data.message || 'Erro ao fazer login.');
      }
    } catch (erro) {
      setMensagem('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login DS SELLER LIGHT</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Entrar</button>
      </form>
      <p style={{ marginTop: 20 }}>{mensagem}</p>
    </div>
  );
}

export default Login;
