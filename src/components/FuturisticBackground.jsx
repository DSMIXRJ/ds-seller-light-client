import React from 'react';

const FuturisticBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Fundo base com gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800"></div>
      
      {/* Linhas animadas */}
      <div className="absolute inset-0">
        {/* Linhas horizontais fixas - Aumentada intensidade */}
        <div className="absolute top-1/4 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent animate-pulse-slow line-glow-cyan"></div>
        <div className="absolute top-2/4 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent animate-pulse-slower line-glow-blue"></div>
        <div className="absolute top-3/4 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-300/65 to-transparent animate-pulse-slow line-glow-cyan"></div>
        
        {/* Linhas verticais fixas - Aumentada intensidade */}
        <div className="absolute top-0 left-1/4 w-[2px] h-full bg-gradient-to-b from-transparent via-cyan-400/60 to-transparent animate-pulse-slower line-glow-cyan"></div>
        <div className="absolute top-0 left-3/4 w-[2px] h-full bg-gradient-to-b from-transparent via-blue-400/55 to-transparent animate-pulse-slow line-glow-blue"></div>
        
        {/* Linhas diagonais em movimento - Aumentada intensidade */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] animate-rotate-slow">
            <div className="absolute top-1/4 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent transform rotate-45 line-glow-cyan"></div>
            <div className="absolute top-2/4 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/45 to-transparent transform rotate-45 line-glow-blue"></div>
            <div className="absolute top-3/4 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/55 to-transparent transform rotate-45 line-glow-cyan"></div>
          </div>
        </div>
        
        {/* Pontos de luz flutuantes - Aumentada intensidade */}
        <div className="absolute top-1/3 left-1/5 w-3 h-3 bg-cyan-400/80 rounded-full animate-float-1 glow-point-cyan"></div>
        <div className="absolute top-2/3 left-4/5 w-2 h-2 bg-blue-400/90 rounded-full animate-float-2 glow-point-blue"></div>
        <div className="absolute top-1/2 left-1/2 w-2.5 h-2.5 bg-cyan-300/70 rounded-full animate-float-3 glow-point-cyan"></div>
        
        {/* Foco de luz central - Aumentada intensidade */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-cyan-400/20 via-blue-400/10 to-transparent rounded-full animate-pulse-gentle"></div>
        
        {/* NOVO: Interseções luminosas */}
        {/* Interseção horizontal 1/4 e vertical 1/4 */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full intersection-glow animate-intersection-pulse"></div>
        
        {/* Interseção horizontal 1/4 e vertical 3/4 */}
        <div className="absolute top-1/4 left-3/4 w-4 h-4 rounded-full intersection-glow animate-intersection-pulse-delayed"></div>
        
        {/* Interseção horizontal 2/4 e vertical 1/4 */}
        <div className="absolute top-2/4 left-1/4 w-4 h-4 rounded-full intersection-glow animate-intersection-pulse-delayed2"></div>
        
        {/* Interseção horizontal 2/4 e vertical 3/4 */}
        <div className="absolute top-2/4 left-3/4 w-4 h-4 rounded-full intersection-glow animate-intersection-pulse"></div>
        
        {/* Interseção horizontal 3/4 e vertical 1/4 */}
        <div className="absolute top-3/4 left-1/4 w-4 h-4 rounded-full intersection-glow animate-intersection-pulse-delayed"></div>
        
        {/* Interseção horizontal 3/4 e vertical 3/4 */}
        <div className="absolute top-3/4 left-3/4 w-4 h-4 rounded-full intersection-glow animate-intersection-pulse-delayed2"></div>
        
        {/* NOVO: Linhas adicionais para maior densidade visual */}
        <div className="absolute top-1/6 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent animate-pulse-slow line-glow-blue"></div>
        <div className="absolute top-5/6 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent animate-pulse-slower line-glow-cyan"></div>
        <div className="absolute top-0 left-1/6 w-[1px] h-full bg-gradient-to-b from-transparent via-blue-500/40 to-transparent animate-pulse-slow line-glow-blue"></div>
        <div className="absolute top-0 left-5/6 w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-500/40 to-transparent animate-pulse-slower line-glow-cyan"></div>
      </div>
      
      {/* Overlay para garantir legibilidade - Reduzido para aumentar visibilidade das linhas */}
      <div className="absolute inset-0 bg-zinc-950/10"></div>
    </div>
  );
};

export default FuturisticBackground;

