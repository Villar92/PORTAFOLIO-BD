"use client";

import React, { useState, useEffect } from "react";

export function AntigravityBackground() {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    // Generar las partículas
    const newParticles = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      size: Math.random() * 80 + 30, 
      left: Math.random() * 100, 
      delay: Math.random() * 10, 
      duration: Math.random() * 20 + 15, 
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[0] overflow-hidden">
      {/* Imagen de fondo desenfocada */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80 blur-xl scale-110"
        style={{ backgroundImage: 'url("/sql-server.jpg")' }}
      ></div>
      {/* Overlay claro/blanco para dar la apariencia corporativa brillante */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl"></div>

      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(110vh) scale(0.8) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 0.6;
          }
          80% {
            opacity: 0.6;
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
      
      {/* Formas sutiles cyan flotando al fondo */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="antigravity-particle rounded-full bg-cyan-400/10 blur-xl shadow-xl"
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
