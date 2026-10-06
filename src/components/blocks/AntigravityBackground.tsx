"use client";

import React, { useState, useEffect } from "react";

export function AntigravityBackground() {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    // Generar las partículas solo del lado del cliente para evitar errores de hidratación
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.random() * 60 + 20, 
      left: Math.random() * 100, 
      delay: Math.random() * 15, 
      duration: Math.random() * 10 + 15, 
      opacity: Math.random() * 0.4 + 0.1, 
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[0] overflow-hidden">
      {/* Imagen de fondo */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/images.jpg")' }}
      ></div>
      {/* Overlay oscuro para mejorar contraste */}
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"></div>

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
      {particles.map((p) => (
        <div
          key={p.id}
          className="antigravity-particle rounded-2xl bg-gradient-to-tr from-blue-500 to-cyan-400 blur-[2px] shadow-2xl"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            bottom: "-100px", // inicia fuera de pantalla abajo
          }}
        ></div>
      ))}
      
      {/* Círculos flotantes adicionales para variar formas */}
      {particles.slice(0, 5).map((p) => (
        <div
          key={`circle-${p.id}`}
          className="antigravity-particle rounded-full bg-gradient-to-tl from-indigo-400 to-blue-300 blur-md shadow-xl"
          style={{
            width: `${p.size * 1.5}px`,
            height: `${p.size * 1.5}px`,
            left: `${100 - p.left}%`,
            animationDelay: `${p.delay + 5}s`,
            animationDuration: `${p.duration + 5}s`,
            bottom: "-150px",
          }}
        ></div>
      ))}
    </div>
  );
}
