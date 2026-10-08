import React from "react";
import { ArrowRight, Database, BookOpen, User } from "lucide-react";

export function Presentacion({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-10 px-4 animate-in fade-in zoom-in-95 duration-1000">
      
      {/* Tarjeta Glassmórfica Premium */}
      <div className="bg-[#0f172a]/40 backdrop-blur-2xl rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-10 md:p-12 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] max-w-4xl w-full flex flex-col items-center text-center relative overflow-hidden group">
        
        {/* Glow dinámico de fondo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-cyan-500/10 blur-[120px] pointer-events-none group-hover:bg-cyan-400/20 transition-colors duration-1000"></div>

        {/* Logo UPLA Transparente */}
        <div className="mb-8 relative z-10 w-28 h-28 sm:w-32 sm:h-32 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform duration-500">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/upla-logo.png" 
            alt="Logo UPLA" 
            className="w-full h-full object-contain filter brightness-110" 
          />
        </div>

        {/* Etiqueta superior */}
        <div className="mb-6 relative z-10 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 shadow-inner backdrop-blur-md">
          <Database className="w-4 h-4 text-cyan-400" />
          <span className="text-xs sm:text-sm font-semibold text-cyan-50 tracking-widest uppercase">Universidad Peruana Los Andes</span>
        </div>

        {/* Contenido principal */}
        <div className="space-y-4 max-w-3xl mb-10 relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-[family-name:var(--font-outfit)] font-light text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-300 tracking-[0.1em] sm:tracking-[0.15em] drop-shadow-sm leading-tight">
            BASE DE DATOS <span className="font-bold text-cyan-400">II</span>
          </h1>
          
          <h2 className="text-xl sm:text-2xl font-medium text-slate-300 tracking-[0.2em] mt-4 sm:mt-6">
            <span className="text-sm text-slate-400 tracking-widest mr-2 uppercase">por</span>
            JORGE LUIS <span className="font-bold text-white">CURO VILLAR</span>
          </h2>
          
          <p className="text-base sm:text-lg text-slate-300/80 max-w-2xl mx-auto font-light mt-6 leading-relaxed">
            Domina el diseño, la optimización y la consulta avanzada en SQL Server para el curso de Base de Datos II.
          </p>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto relative z-10">
          <button 
            onClick={() => setActiveTab("trabajos")}
            className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-full font-bold text-sm tracking-widest shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <BookOpen className="w-5 h-5" />
            VER UNIDADES
          </button>
          
          <button 
            onClick={() => setActiveTab("informacion")}
            className="px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full font-bold text-sm tracking-widest backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-3 hover:-translate-y-1"
          >
            <User className="w-5 h-5 text-cyan-400" />
            SOBRE MÍ
          </button>
        </div>
      </div>
      
    </div>
  );
}
