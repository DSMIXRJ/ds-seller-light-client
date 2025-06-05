import React from 'react';

const FuturisticBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Fundo base com gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800"></div>
      
      {/* Linhas principais */}
      <div className="absolute inset-0">
        {/* Horizontais */}
        <div className="absolute top-1/4 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent animate-pulse-slow line-glow-cyan"></div>
        <div className="absolute top-2/4 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent animate-pulse-slower line-glow-blue"></div>
        <div className="absolute top-3/4 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-300/65 to-transparent animate-pulse-slow line-glow-cyan"></div>
        
        {/* Verticais */}
        <div className="absolute top-0 left-1/4 w-[2px] h-full bg-gradient-to-b from-transparent via-cyan-400/60 to-transparent animate-pulse-slower line-glow-cyan"></div>
        <div className="absolute top-0 left-3/4 w-[2px] h-full bg-gradient-to-b from-transparent via-blue-400/55 to-transparent animate-pulse-slow line-glow-blue"></div>
        
        {/* Linhas diagonais em movimento */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] animate-rotate-slow">
            <div className="absolute top-1/4 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent transform rotate-45 line-glow-cyan"></div>
            <div className="absolute top-2/4 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/45 to-transparent transform rotate-45 line-glow-blue"></div>
            <div className="absolute top-3/4 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/55 to-transparent transform rotate-45 line-glow-cyan"></div>
          </div>
        </div>

        {/* Foco de luz central */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-cyan-400/20 via-blue-400/10 to-transparent rounded-full animate-pulse-gentle"></div>
      </div>

      {/* Overlay final */}
      <div className="absolute inset-0 bg-zinc-950/10"></div>
    </div>
  );
};

export default FuturisticBackground;
