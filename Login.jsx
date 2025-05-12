import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importa o hook de navegação

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate(); // Inicializa o redirecionador

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(""); // Limpa erros anteriores
    try {
      // ATENÇÃO: URL do backend atualizada para o serviço no Render
      const resposta = await axios.post("https://dsseller-backend-final.onrender.com/api/login", {
        email,
        senha: senha, // Nome do campo corrigido para "senha"
      });
      // Idealmente, o backend retornaria um token JWT para ser armazenado
      // Aqui, para simplificar, apenas navegamos se o status for 200
      if (resposta.status === 200) {
        alert("Login realizado com sucesso!");
        navigate("/dashboard"); // Redireciona para a rota principal
      } else {
        // Isso pode não ser alcançado se o axios lançar um erro para status não-2xx
        setErro(resposta.data.mensagem || "Login inválido. Verifique e tente novamente.");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.mensagem) {
        setErro(err.response.data.mensagem);
      } else {
        setErro("Erro ao tentar fazer login. Tente novamente mais tarde.");
      }
      console.error("Erro no login:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Login DS SELLER LIGHT</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-80">
        <input
          type="email"
          placeholder="Seu e-mail"
          className="w-full p-2 border mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Sua senha"
          className="w-full p-2 border mb-3 rounded"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Entrar
        </button>
        {erro && <p className="text-red-600 mt-2 text-sm text-center">{erro}</p>}
      </form>
    </div>
  );
}

export default Login;

