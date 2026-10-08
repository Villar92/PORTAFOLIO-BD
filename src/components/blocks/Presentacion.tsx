import React from "react";
import { ArrowRight, Database, Code, BookOpen } from "lucide-react";

export function Presentacion({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] py-12 px-4 animate-in fade-in duration-700">
      
      {/* Etiqueta superior */}
      <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-slate-200 shadow-sm backdrop-blur-md">
        <Database className="w-4 h-4 text-blue-600" />
        <span className="text-sm font-semibold text-slate-700">Universidad Peruana Los Andes</span>
      </div>

      <div className="text-center space-y-6 max-w-4xl mb-12">
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight drop-shadow-sm">
          BASE DE DATOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">II</span>
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight mt-6">
          Jorge Luis Curo Villar
        </h2>
        
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium mt-4">
          Explorando el mundo de las bases de datos relacionales, la optimización de consultas y la administración de datos con SQL Server.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <button 
          onClick={() => setActiveTab("trabajos")}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold shadow-lg shadow-blue-600/30 transition-all duration-300 flex items-center justify-center group"
        >
          <BookOpen className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
          Ver Unidades
        </button>
        <button 
          onClick={() => setActiveTab("informacion")}
          className="px-8 py-4 bg-white/80 hover:bg-white text-slate-800 border border-slate-200 rounded-full font-bold shadow-sm transition-all duration-300 flex items-center justify-center group backdrop-blur-md"
        >
          Sobre Mí
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform text-blue-600" />
        </button>
      </div>
      
    </div>
  );
}
