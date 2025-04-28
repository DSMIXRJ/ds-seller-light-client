import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const baseUrl = import.meta.env.VITE_PUBLIC_URL || window.location.origin;

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    fetch(`${baseUrl}/api/teste`)
      .then(res => res.json())
      .then(data => {
        console.log("Resposta da API:", data);
        alert(data.mensagem);
      })
      .catch(err => {
        console.error("Erro ao conectar com o backend:", err);
      });
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-4xl font-bold text-blue-500">DS SELLER LIGHT 🚀</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
