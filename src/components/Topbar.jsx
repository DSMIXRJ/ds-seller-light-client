export default function Topbar() {
  const nomeConta = localStorage.getItem("ds_conta_nome") || "Conta não identificada";
  const nomeIntegracao = localStorage.getItem("ds_integracao_nome") || "Integração";

  return (
    <header className="fixed top-0 left-56 right-0 h-20 bg-zinc-950/95 border-b border-cyan-800/40 px-8 flex items-center justify-between z-30 shadow-md">
      <h1 className="text-2xl font-sans text-cyan-400 tracking-wider">DS SELLER</h1>
      <div className="text-sm font-sans text-zinc-300 text-right">
        <div className="text-cyan-500">{nomeConta}</div>
        <div className="text-xs text-zinc-400">{nomeIntegracao}</div>
      </div>
    </header>
  );
}
