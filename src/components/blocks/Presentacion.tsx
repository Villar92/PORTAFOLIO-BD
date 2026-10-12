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

        {/* Título Principal con resplandor Antigravity y levitación */}
        <div className="space-y-3 max-w-4xl mb-4">
          <p className="text-sm sm:text-lg md:text-xl font-medium tracking-[0.25em] sm:tracking-[0.35em] text-cyan-300 uppercase drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]">
            PORTAFOLIO ACADÉMICO
          </p>

          <div className="relative inline-block">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-[family-name:var(--font-outfit)] font-semibold text-white tracking-[0.12em] sm:tracking-[0.16em] drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] leading-tight select-none">
              BASE DE DATOS{" "}
              <span className="inline-block font-black text-transparent bg-clip-text bg-gradient-to-b from-cyan-200 via-cyan-400 to-blue-500 drop-shadow-[0_0_30px_rgba(34,211,238,0.8)] animate-antigravity-levitate ml-1" style={{ animationDuration: "3.5s" }}>
                II
              </span>
            </h1>
            {/* Resplandor de línea horizontal sutil bajo el título */}
            <div className="w-3/4 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-4 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
          </div>
        </div>

      </div>
      
    </div>
  );
}
