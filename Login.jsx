import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🟡 Enviando login para o backend...');
    try {
      const resposta = await axios.post('https://dsseller-backend-final.onrender.com/api/login', {
        email,
        password
      });
      console.log('🟢 Resposta recebida:', resposta.data);
      setMensagem(resposta.data.message || 'Login bem-sucedido!');
    } catch (erro) {
      console.log('🔴 Erro recebido:', erro);
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
      <p style={{ marginTop: 20 }}>{mensagem}</p>
    </div>
  );
}

export default Login;
