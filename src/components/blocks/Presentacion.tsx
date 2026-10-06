import React from "react";
import NextImage from "next/image";
import { BookOpen, User, Building, GraduationCap, LayoutGrid } from "lucide-react";

export function Presentacion() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-12 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-6 max-w-3xl mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-2xl mb-4 shadow-sm">
          <LayoutGrid className="w-8 h-8 text-blue-700" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          BASE DE DATOS II
        </h1>
        <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto font-light">
          Portafolio integral de evidencias y proyectos desarrollados en Base de Datos II. Presenta de manera sistemática el avance teórico-práctico del semestre, categorizado por unidades formativas y entregas semanales.
        </p>
      </div>

      <div className="w-full max-w-md bg-slate-900/70 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="h-32 bg-gradient-to-r from-blue-700 to-blue-500"></div>
        <div className="px-8 pb-8">
          <div className="relative -mt-16 mb-6 flex justify-center">
            <div className="w-32 h-32 bg-slate-800/80 backdrop-blur-sm rounded-full p-2 shadow-lg relative overflow-hidden border border-white/20">
              <NextImage 
                src="/JORGE CV.jpg" 
                alt="Jorge Luis Curo Villar" 
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover rounded-full"
              />
            </div>
          </div>
          
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-2xl font-bold text-white">Jorge Luis Curo Villar</h2>
            <p className="text-blue-400 font-medium">Código: H14203C</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 text-slate-300 bg-slate-800/60 p-3 rounded-xl border border-white/10">
              <Building className="w-5 h-5 text-blue-400" />
              <span className="font-medium text-sm">Universidad Peruana Los Andes · UPLA</span>
            </div>
            <div className="flex items-center gap-4 text-slate-300 bg-slate-800/60 p-3 rounded-xl border border-white/10">
              <GraduationCap className="w-5 h-5 text-blue-400" />
              <span className="font-medium text-sm">Ingeniería de Sistemas y Computación</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
