import React from 'react';

export default function FuturisticBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Fundo escuro com leve overlay */}
      <div className="absolute inset-0 bg-zinc-950/10 backdrop-blur-sm" />

      {/* Linhas horizontais principais */}
      <div className="absolute inset-0 flex flex-col justify-between">
        {[...Array(6)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="h-[2px] w-full bg-cyan-400/70 line-glow-cyan animate-pulse"
          />
        ))}
      </div>

      {/* Linhas verticais principais */}
      <div className="absolute inset-0 flex flex-row justify-between">
        {[...Array(6)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="w-[2px] h-full bg-cyan-400/70 line-glow-blue animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
