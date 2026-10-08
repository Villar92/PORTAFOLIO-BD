import React from "react";
import { ArrowRight, Database, BookOpen } from "lucide-react";

export function Presentacion({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] py-12 px-4 animate-in fade-in duration-700">
      
      <div className="bg-[#0B1120] rounded-[2.5rem] p-10 md:p-16 border border-cyan-400/50 shadow-[0_0_40px_rgba(34,211,238,0.2)] max-w-5xl w-full flex flex-col items-center text-center relative overflow-hidden">
        
        {/* Glow de fondo en la tarjeta */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-400/20 blur-[100px] pointer-events-none"></div>

        {/* Etiqueta superior */}
        <div className="mb-8 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0f172a] border border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
          <Database className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-bold text-cyan-50 tracking-wide">Universidad Peruana Los Andes</span>
        </div>

        <div className="space-y-6 max-w-4xl mb-12">
          <h1 className="text-5xl md:text-7xl font-sans font-black text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] leading-tight">
            BASE DE DATOS <span className="text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.8)] font-serif italic">II</span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide mt-6">
            JORGE LUIS <span className="text-xl md:text-2xl text-cyan-100/80">CURO VILLAR</span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light mt-4 leading-relaxed">
            Explorando el mundo de las bases de datos relacionales, la optimización de consultas y la administración de datos con SQL Server.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
          <button 
            onClick={() => setActiveTab("trabajos")}
            className="px-8 py-4 bg-cyan-400 hover:bg-cyan-300 text-[#0B1120] rounded-full font-extrabold tracking-widest shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300 flex items-center justify-center group"
          >
            <BookOpen className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
            VER UNIDADES
          </button>
          <button 
            onClick={() => setActiveTab("informacion")}
            className="px-8 py-4 bg-transparent hover:bg-white/5 text-cyan-400 border border-cyan-400/50 rounded-full font-bold tracking-widest transition-all duration-300 flex items-center justify-center group"
          >
            SOBRE MÍ
            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
      
    </div>
  );
}
