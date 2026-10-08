import React from "react";
import NextImage from "next/image";

export function Presentacion() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] py-12 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Etiqueta superior */}
      <div className="inline-flex items-center justify-center px-6 py-2 border border-cyan-500/50 rounded-full mb-8 bg-[#0B1120]/60 backdrop-blur-md">
        <span className="text-cyan-400 font-bold tracking-[0.2em] text-xs uppercase flex items-center gap-2">
          <span className="text-[10px]">✦</span> PORTAFOLIO ACADÉMICO <span className="text-[10px]">✦</span>
        </span>
      </div>

      <div className="text-center space-y-6 max-w-4xl mb-12">
        <h1 className="text-6xl md:text-8xl font-serif font-bold text-white tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          BASE DE DATOS <span className="text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]">II</span>
        </h1>
        
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mt-6">
          Eduardo Fredy Ramón Puente
        </h2>
        
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light mt-4">
          Explorando el mundo de las bases de datos relacionales.
        </p>
      </div>

      {/* Botones */}
      <div className="flex flex-col sm:flex-row gap-6 mt-4">
        <button className="px-8 py-3 bg-cyan-400 text-[#0B1120] rounded-full font-bold tracking-wide hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(34,211,238,0.6)]">
          COMENZAR CURSO
        </button>
        <button className="px-8 py-3 bg-transparent border-2 border-cyan-500 text-cyan-400 rounded-full font-bold tracking-wide hover:bg-cyan-500/10 transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)]">
          CONÓCEME
        </button>
      </div>
    </div>
  );
}
