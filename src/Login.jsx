import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resposta = await axios.post('https://dsseller-backend.onrender.com/auth/login', {
        email,
        password
      });
      setMensagem(resposta.data.message || 'Login bem-sucedido!');
    } catch (erro) {
      if (erro.response && erro.response.data && erro.response.data.message) {
        setMensagem(erro.response.data.message);
      } else {
        setMensagem('Erro de conexão com o servidor.');
      }
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login DS SELLER LIGHT</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
        <button type="submit">Entrar</button>
      </form>
      <p>{mensagem}</p>
    </div>
  );
}

export default Login;
