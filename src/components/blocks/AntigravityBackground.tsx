"use client";

import React from "react";

export function AntigravityBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[0] bg-[#0B1120] overflow-hidden">
      {/* Imagen de Fondo Principal - Líneas y datos cuánticos */}
      <img
        src="/istockphoto-2239372581-2048x2048.jpg"
        alt="Fondo tecnológico de base de datos"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-65 select-none pointer-events-none transition-opacity duration-700"
      />
      
      {/* Superposición cinematográfica equilibrada con tonos oscuros azul medianoche */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120]/60 via-[#0B1120]/40 to-[#0B1120]/85 pointer-events-none"></div>
      
      {/* Viñeta radial para enfocar el contenido central */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#0B1120_100%)] opacity-70 pointer-events-none"></div>
    </div>
  );
}
