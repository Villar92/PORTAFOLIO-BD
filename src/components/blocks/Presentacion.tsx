import React from "react";
import { ArrowRight, Database, BookOpen, User } from "lucide-react";

export function Presentacion({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] py-6 px-4 animate-in fade-in duration-700">
      
      <div className="bg-[#0B1120] rounded-3xl sm:rounded-[2rem] p-6 sm:p-6 md:p-8 border border-cyan-400/50 shadow-[0_0_40px_rgba(34,211,238,0.2)] max-w-4xl w-full flex flex-col items-center text-center relative overflow-hidden">
        
        {/* Glow de fondo en la tarjeta */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-400/20 blur-[100px] pointer-events-none"></div>

        {/* Etiqueta superior */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0f172a] border border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
          <Database className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-xs font-bold text-cyan-50 tracking-wide">Universidad Peruana Los Andes</span>
        </div>

        <div className="space-y-3 max-w-3xl mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-[family-name:var(--font-outfit)] font-light text-white tracking-[0.1em] sm:tracking-[0.15em] drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] leading-tight">
            BASE DE DATOS <span className="text-white font-medium">II</span>
          </h1>
          
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide mt-3 sm:mt-4 drop-shadow-md">
            JORGE LUIS <span className="text-base md:text-lg text-white">CURO VILLAR</span>
          </h2>
          
          <p className="text-sm sm:text-base md:text-[17px] text-slate-200 max-w-xl mx-auto font-normal mt-3 sm:mt-4 leading-relaxed drop-shadow-md">
            Aprende a manejar bases de datos y hacer consultas más rápidas en SQL Server.
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
