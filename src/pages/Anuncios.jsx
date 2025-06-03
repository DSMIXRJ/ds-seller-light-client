import { useEffect, useState } from "react";

export default function Anuncios() {
  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    async function carregarAnuncios() {
      try {
        setLoading(true);
        const resposta = await fetch("https://dsseller-backend-final.onrender.com/anuncios/ml");
        if (!resposta.ok) {
          throw new Error("Erro na resposta da API");
        }
        const dados = await resposta.json();
        setAnuncios(dados);
        setErro(false);
      } catch (error) {
        console.error("Erro ao carregar anúncios:", error);
        setErro(true);
      } finally {
        setLoading(false);
      }
    }

    carregarAnuncios();
  }, []);

  if (loading) return <p>Carregando anúncios...</p>;
  if (erro) return <p>Ops! Algo deu errado. Não foi possível carregar os anúncios.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Anúncios Ativos</h1>
      <ul className="space-y-2">
        {anuncios.map((anuncio) => (
          <li key={anuncio.id} className="p-4 border border-zinc-700 rounded-lg bg-zinc-800">
            <p className="text-white font-medium">{anuncio.title}</p>
            <p className="text-zinc-400 text-sm">{anuncio.id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
