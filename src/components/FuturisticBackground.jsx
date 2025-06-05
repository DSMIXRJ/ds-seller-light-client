import React from 'react';

const FuturisticBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Fundo base com gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800"></div>
      
      {/* Linhas fixas */}
      <div className="absolute inset-0">
        {/* Linha vertical (25% da esquerda) */}
        <div className="absolute top-0 left-1/4 w-[2px] h-full bg-gradient-to-b from-transparent via-cyan-400/60 to-transparent animate-pulse-slow line-glow-cyan"></div>

        {/* Linha horizontal (75% da altura) */}
        <div className="absolute top-3/4 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent animate-pulse-slower line-glow-blue"></div>
      </div>

      {/* Linha diagonal única em movimento (top-1/4) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] animate-rotate-slow">
          <div className="absolute top-1/4 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent transform rotate-45 line-glow-cyan"></div>
        </div>
      </div>

      {/* Foco de luz central */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-cyan-400/20 via-blue-400/10 to-transparent rounded-full animate-pulse-gentle"></div>

      {/* Overlay final */}
      <div className="absolute inset-0 bg-zinc-950/10"></div>
    </div>
  );
};

export default FuturisticBackground;
