"use client";

import React, { useEffect, useState } from "react";
import { Database, Sparkles } from "lucide-react";

export function Presentacion({ setActiveTab }: { setActiveTab: (tab: string) => void, activeTab?: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[48vh] sm:min-h-[54vh] py-6 sm:py-10 px-4 relative overflow-hidden">

      {/* Contenedor principal con efecto de gravedad cero */}
      <div className={`max-w-3xl w-full flex flex-col items-center text-center relative p-2 sm:p-6 z-10 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-6 blur-sm'}`}>

        {/* Etiqueta superior con levitación sutil */}
        <div 
          className="mb-4 sm:mb-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B1120]/80 border border-cyan-400/30 shadow-[0_0_15px_rgba(6,182,212,0.2)] backdrop-blur-md animate-antigravity-levitate hover:border-cyan-400/60 transition-colors"
          style={{ animationDuration: "5s" }}
        >
          <Database className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="text-[11px] sm:text-xs font-semibold text-cyan-50 tracking-widest uppercase">
            Universidad Peruana Los Andes
          </span>
          <Sparkles className="w-3 h-3 text-cyan-300" />
        </div>

        {/* Título Principal y Subtítulo Centrados y Proporcionados */}
        <div className="flex flex-col items-center justify-center text-center max-w-4xl w-full mb-4 sm:mb-6">
          {/* TÍTULO SUPERIOR */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-outfit)] font-black text-white tracking-[0.08em] sm:tracking-[0.12em] drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] leading-tight select-none">
            PORTAFOLIO{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.6)]">
              ACADÉMICO
            </span>
          </h1>

          {/* BASE DE DATOS II: Proporcionado y legible */}
          <div className="mt-4 sm:mt-6 flex flex-col items-center justify-center w-full animate-antigravity-levitate" style={{ animationDuration: "4s" }}>
            <div className="relative px-4 sm:px-6 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-cyan-950/50 via-blue-950/70 to-cyan-950/50 border border-cyan-400/40 shadow-[0_0_25px_rgba(34,211,238,0.2)] backdrop-blur-md max-w-full">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-outfit)] font-black text-white tracking-[0.08em] sm:tracking-[0.14em] drop-shadow-[0_0_20px_rgba(34,211,238,0.6)] select-none whitespace-nowrap">
                BASE DE DATOS{" "}
                <span className="inline-block font-black text-transparent bg-clip-text bg-gradient-to-b from-cyan-200 via-cyan-400 to-blue-500 drop-shadow-[0_0_25px_rgba(34,211,238,0.8)] ml-1">
                  II
                </span>
              </h2>
            </div>
            
            {/* Línea decorativa luminosa centrada con brillo */}
            <div className="w-36 sm:w-56 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-4 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
          </div>
        </div>

      </div>
      
    </div>
  );
}
