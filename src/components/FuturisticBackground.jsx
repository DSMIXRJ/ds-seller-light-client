import React from 'react';

const FuturisticBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Fundo base com gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800"></div>
      
      {/* Linhas animadas */}
      <div className="absolute inset-0">
        {/* Linhas horizontais */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-pulse-slow"></div>
        <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent animate-pulse-slower"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-300/25 to-transparent animate-pulse-slow"></div>
        
        {/* Linhas verticais */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-pulse-slower"></div>
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-blue-400/15 to-transparent animate-pulse-slow"></div>
        
        {/* Linhas diagonais em movimento */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] animate-rotate-slow">
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent transform rotate-45"></div>
            <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/8 to-transparent transform rotate-45"></div>
            <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/12 to-transparent transform rotate-45"></div>
          </div>
        </div>
        
        {/* Pontos de luz flutuantes */}
        <div className="absolute top-1/3 left-1/5 w-2 h-2 bg-cyan-400/40 rounded-full animate-float-1"></div>
        <div className="absolute top-2/3 left-4/5 w-1 h-1 bg-blue-400/50 rounded-full animate-float-2"></div>
        <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-cyan-300/30 rounded-full animate-float-3"></div>
        
        {/* Foco de luz central sutil */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-cyan-400/5 via-blue-400/3 to-transparent rounded-full animate-pulse-gentle"></div>
      </div>
      
      {/* Overlay para garantir legibilidade */}
      <div className="absolute inset-0 bg-zinc-950/20"></div>
    </div>
  );
};

export default FuturisticBackground;

