import React from "react";
import { ArrowRight, Database, BookOpen, User } from "lucide-react";

export function Presentacion({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] py-12 px-4 animate-in fade-in duration-700">
      
      <div className="bg-[#2A3441]/95 backdrop-blur-sm rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 md:p-16 border border-cyan-400/20 shadow-2xl max-w-5xl w-full flex flex-col items-center text-center relative overflow-hidden">
        
        {/* Glow de fondo en la tarjeta */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-400/10 blur-[100px] pointer-events-none"></div>

        {/* Etiqueta superior */}
        <div className="mb-8 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1E252F] border border-cyan-400/30 shadow-sm">
          <Database className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-bold text-cyan-50 tracking-wide">Universidad Peruana Los Andes</span>
        </div>

        <div className="space-y-4 sm:space-y-6 max-w-4xl mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-[family-name:var(--font-outfit)] font-light text-white tracking-[0.1em] sm:tracking-[0.15em] drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] leading-tight">
            BASE DE DATOS <span className="text-white font-medium">II</span>
          </h1>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide mt-6 sm:mt-10 drop-shadow-md">
            JORGE LUIS <span className="text-xl md:text-2xl text-white">CURO VILLAR</span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-200 max-w-2xl mx-auto font-normal mt-6 sm:mt-8 leading-relaxed drop-shadow-md">
            Explorando el mundo de las bases de datos relacionales, la optimización de consultas y la administración de datos con SQL Server.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 md:gap-14 w-full sm:w-auto mt-2 sm:mt-4">
          <button 
            onClick={() => setActiveTab("trabajos")}
            className="pr-8 pl-2 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 hover:brightness-110 text-white rounded-full font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/20 transition-all duration-300 flex items-center justify-center group"
          >
            <div className="w-10 h-10 rounded-full border-2 border-white/80 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            VER UNIDADES
          </button>
          
          <button 
            onClick={() => setActiveTab("informacion")}
            className="pr-8 pl-2 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 hover:brightness-110 text-white rounded-full font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/20 transition-all duration-300 flex items-center justify-center group"
          >
            <div className="w-10 h-10 rounded-full border-2 border-white/80 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
              <User className="w-4 h-4 text-white" />
            </div>
            SOBRE MÍ
          </button>
        </div>
      </div>
      
    </div>
  );
}
