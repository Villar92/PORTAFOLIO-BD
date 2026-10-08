"use client";

import React, { useState, useEffect } from "react";

export function AntigravityBackground() {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    // Generar las partículas
    const newParticles = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      size: Math.random() * 150 + 50, 
      left: Math.random() * 100, 
      delay: Math.random() * 10, 
      duration: Math.random() * 20 + 20, 
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[0] overflow-hidden">
      {/* Imagen de fondo más visible */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
        style={{ backgroundImage: 'url("/sql-server.jpg")' }}
      ></div>
      {/* Overlay claro para que resalten las cajas grises/blancas */}
      <div className="absolute inset-0 bg-slate-50/70 backdrop-blur-sm"></div>

      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(110vh) scale(0.8) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 0.8;
          }
          80% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-20vh) scale(1.2) rotate(360deg);
            opacity: 0;
          }
        }
        .antigravity-particle {
          position: absolute;
          animation: floatUp linear infinite;
        }
      `}</style>
      
      {/* Formas geométricas corporativas y limpias flotando */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="antigravity-particle rounded-3xl bg-white/40 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            bottom: "-200px", 
          }}
        ></div>
      ))}
    </div>
  );
}
