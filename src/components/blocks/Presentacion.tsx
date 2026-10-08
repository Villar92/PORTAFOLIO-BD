import React from "react";
import NextImage from "next/image";
import { BookOpen, User, Building, GraduationCap, LayoutGrid } from "lucide-react";

export function Presentacion() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-12 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-6 max-w-3xl mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-white/5 border border-white/10 rounded-2xl mb-4 shadow-lg backdrop-blur-md">
          <LayoutGrid className="w-8 h-8 text-indigo-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 tracking-tight leading-tight mb-4">
          BASE DE DATOS II
        </h1>
        <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto font-light">
          Portafolio integral de evidencias y proyectos desarrollados en Base de Datos II. Presenta de manera sistemática el avance teórico-práctico del semestre, categorizado por unidades formativas y entregas semanales.
        </p>
      </div>

      <div className="w-full max-w-md bg-black/40 backdrop-blur-2xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden border border-white/10 hover:border-white/20 hover:shadow-[0_8px_30px_rgba(255,255,255,0.05)] transition-all duration-500 transform hover:-translate-y-1 group">
        <div className="h-32 bg-gradient-to-r from-indigo-900/50 via-purple-900/30 to-black relative">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>
        <div className="px-8 pb-8">
          <div className="relative -mt-16 mb-6 flex justify-center">
            <div className="w-32 h-32 bg-black/60 backdrop-blur-xl rounded-full p-1.5 shadow-2xl relative overflow-hidden border border-white/20 group-hover:border-indigo-400/50 transition-colors duration-500">
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
            <h2 className="text-2xl font-bold text-white tracking-tight">Jorge Luis Curo Villar</h2>
            <p className="text-indigo-400/90 font-medium tracking-wide text-sm">CÓDIGO: H14203C</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-4 text-white/70 bg-white/5 hover:bg-white/10 transition-colors p-3.5 rounded-2xl border border-white/5">
              <Building className="w-5 h-5 text-indigo-400/80" />
              <span className="font-medium text-sm">Universidad Peruana Los Andes · UPLA</span>
            </div>
            <div className="flex items-center gap-4 text-white/70 bg-white/5 hover:bg-white/10 transition-colors p-3.5 rounded-2xl border border-white/5">
              <GraduationCap className="w-5 h-5 text-indigo-400/80" />
              <span className="font-medium text-sm">Ingeniería de Sistemas y Computación</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
