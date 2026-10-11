"use client";

import React, { useEffect, useState } from "react";

interface AntigravityTransitionProps {
  active?: boolean;
}

export function AntigravityTransition({ active = true }: AntigravityTransitionProps) {
  const [shockwaveKey, setShockwaveKey] = useState(0);

  // Cada vez que se active, disparamos la onda gravitacional
  useEffect(() => {
    if (active) {
      setShockwaveKey((prev) => prev + 1);
    }
  }, [active]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
      
      {/* 1. ONDAS EXPANSIVAS GRAVITACIONALES (Shockwaves de entrada) */}
      <div
        key={`shockwave-${shockwaveKey}`}
        className="absolute top-1/2 left-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full border border-cyan-400/80 shadow-[0_0_50px_rgba(34,211,238,0.7)] animate-antigravity-shockwave pointer-events-none"
      />
      <div
        key={`shockwave-delay-${shockwaveKey}`}
        className="absolute top-1/2 left-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full border border-blue-500/60 shadow-[0_0_40px_rgba(59,130,246,0.6)] animate-antigravity-shockwave-delay pointer-events-none"
      />

      {/* 2. NÚCLEO DE SINGULARIDAD CENTRAL (Portal Antigravity) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[620px] h-[380px] sm:h-[620px] pointer-events-none flex items-center justify-center">
        
        {/* Resplandor profundo índigo / cian */}
        <div className="absolute w-[280px] sm:w-[480px] h-[280px] sm:h-[480px] rounded-full bg-gradient-to-tr from-cyan-500/20 via-blue-600/25 to-indigo-700/20 blur-[85px] animate-antigravity-glow" />

        {/* Anillo Orbital Externo Giroscópico */}
        <div className="absolute w-[360px] sm:w-[560px] h-[360px] sm:h-[560px] rounded-full border border-cyan-400/20 border-dashed animate-antigravity-orbit" style={{ animationDuration: "35s" }}>
          {/* Pequeños nodos de datos en órbita */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa]" />
        </div>

        {/* Anillo Orbital Intermedio en Rotación Contrapuesta */}
        <div className="absolute w-[280px] sm:w-[440px] h-[280px] sm:h-[440px] rounded-full border border-cyan-400/35 border-t-transparent border-b-transparent shadow-[0_0_25px_rgba(34,211,238,0.2)] animate-antigravity-orbit-fast" style={{ animationDuration: "20s" }}>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_15px_#67e8f9]" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_12px_#ffffff]" />
        </div>

        {/* Anillo Orbital Interno Fino */}
        <div className="absolute w-[200px] sm:w-[320px] h-[200px] sm:h-[320px] rounded-full border border-blue-400/30 animate-antigravity-orbit" style={{ animationDuration: "14s" }} />

        {/* Núcleo Central de Gravedad Cero */}
        <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-cyan-400/10 backdrop-blur-sm border border-cyan-400/40 shadow-[0_0_35px_rgba(34,211,238,0.5)] animate-pulse" />
      </div>

      {/* 3. PARTÍCULAS CUÁNTICAS INGRÁVIDAS (Levitando en Gravedad Cero) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(22)].map((_, i) => (
          <span
            key={`zero-g-${i}`}
            className="absolute rounded-full bg-cyan-300/60 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
            style={{
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              left: `${(i * 4.5 + 3)}%`,
              top: `${(i * 4.7 + 5)}%`,
              animation: `antigravity-levitate-slow ${4 + (i % 5)}s ease-in-out infinite`,
              animationDelay: `${(i * 0.3)}s`,
              opacity: (i % 2 === 0 ? 0.7 : 0.4),
            }}
          />
        ))}
      </div>

    </div>
  );
}
