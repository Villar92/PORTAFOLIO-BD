"use client";

import React from "react";

export function AntigravityBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[0] bg-[#0B1120] overflow-hidden">
      {/* Video de Fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source src="/istockphoto-2156608793-640_adpp_is.mp4" type="video/mp4" />
      </video>
      
      {/* Sutil gradiente oscuro para asegurar la legibilidad del texto */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120]/80 via-[#0B1120]/70 to-[#0B1120]/90 pointer-events-none"></div>
    </div>
  );
}
