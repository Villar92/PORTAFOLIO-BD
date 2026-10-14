"use client";

import React, { useEffect, useState } from "react";
import { Database, Sparkles } from "lucide-react";

export function Presentacion({ setActiveTab }: { setActiveTab: (tab: string) => void, activeTab?: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center pt-6 pb-2 sm:pt-10 sm:pb-4 px-4 relative overflow-hidden">

      {/* Contenedor principal con efecto de gravedad cero */}
      <div className={`max-w-2xl w-full flex flex-col items-center text-center relative px-2 py-2 sm:py-4 z-10 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-4 blur-sm'}`}>

        {/* Etiqueta superior con levitación sutil */}
        <div 
          className="mb-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B1120]/80 border border-cyan-400/30 shadow-[0_0_12px_rgba(6,182,212,0.18)] backdrop-blur-md animate-antigravity-levitate hover:border-cyan-400/60 transition-colors"
          style={{ animationDuration: "5s" }}
        >
          <Database className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span className="text-[10px] sm:text-[11px] font-semibold text-cyan-50 tracking-widest uppercase">
            Universidad Peruana Los Andes
          </span>
          <Sparkles className="w-2.5 h-2.5 text-cyan-300" />
        </div>

        {/* Título Principal y Subtítulo Centrados y Compactos */}
        <div className="flex flex-col items-center justify-center text-center max-w-3xl w-full mb-2">
          {/* TÍTULO SUPERIOR */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-outfit)] font-extrabold text-white tracking-[0.06em] sm:tracking-[0.1em] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] leading-tight select-none">
            PORTAFOLIO{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">
              ACADÉMICO
            </span>
          </h1>

          {/* BASE DE DATOS II */}
          <div className="mt-3 sm:mt-4 flex flex-col items-center justify-center w-full animate-antigravity-levitate" style={{ animationDuration: "4s" }}>
            <div className="relative px-3.5 sm:px-5 py-1 sm:py-1.5 rounded-lg bg-gradient-to-r from-cyan-950/50 via-blue-950/70 to-cyan-950/50 border border-cyan-400/40 shadow-[0_0_20px_rgba(34,211,238,0.2)] backdrop-blur-md max-w-full">
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-[family-name:var(--font-outfit)] font-black text-white tracking-[0.08em] sm:tracking-[0.12em] drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] select-none whitespace-nowrap">
                BASE DE DATOS{" "}
                <span className="inline-block font-black text-transparent bg-clip-text bg-gradient-to-b from-cyan-200 via-cyan-400 to-blue-500 drop-shadow-[0_0_20px_rgba(34,211,238,0.7)] ml-1">
                  II
                </span>
              </h2>
            </div>
            
            {/* Línea decorativa luminosa centrada con brillo */}
            <div className="w-24 sm:w-36 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-3 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
          </div>
        </div>

      </div>
      
    </div>
  );
}
