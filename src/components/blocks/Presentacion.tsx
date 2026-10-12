"use client";

import React, { useEffect, useState } from "react";
import { Database, Sparkles } from "lucide-react";

export function Presentacion({ setActiveTab }: { setActiveTab: (tab: string) => void, activeTab?: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] py-10 px-4 relative overflow-hidden">


      {/* 2. Contenedor principal con efecto de gravedad cero */}
      <div className={`max-w-4xl w-full flex flex-col items-center text-center relative p-4 sm:p-8 z-10 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-10 blur-sm'}`}>

        {/* Etiqueta superior con levitación sutil */}
        <div 
          className="mb-6 inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#0B1120]/80 border border-cyan-400/30 shadow-[0_0_20px_rgba(6,182,212,0.25)] backdrop-blur-md animate-antigravity-levitate hover:border-cyan-400/60 transition-colors"
          style={{ animationDuration: "5s" }}
        >
          <Database className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-semibold text-cyan-50 tracking-widest uppercase">
            Universidad Peruana Los Andes
          </span>
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
        </div>

        {/* Título Principal y Subtítulo Centrados y Proporcionados */}
        <div className="flex flex-col items-center justify-center text-center max-w-5xl w-full mb-6 space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-[family-name:var(--font-outfit)] font-extrabold text-white tracking-[0.10em] sm:tracking-[0.16em] drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)] leading-tight select-none">
            PORTAFOLIO{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400 drop-shadow-[0_0_35px_rgba(34,211,238,0.7)]">
              ACADÉMICO
            </span>
          </h1>

          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-outfit)] font-semibold text-slate-100 tracking-[0.15em] sm:tracking-[0.22em] drop-shadow-[0_6px_16px_rgba(0,0,0,0.8)] select-none">
              BASE DE DATOS{" "}
              <span className="inline-block font-black text-transparent bg-clip-text bg-gradient-to-b from-cyan-200 via-cyan-400 to-blue-500 drop-shadow-[0_0_25px_rgba(34,211,238,0.8)] ml-1">
                II
              </span>
            </h2>
            {/* Línea decorativa luminosa centrada */}
            <div className="w-48 sm:w-72 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-4 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
          </div>
        </div>

      </div>
      
    </div>
  );
}
