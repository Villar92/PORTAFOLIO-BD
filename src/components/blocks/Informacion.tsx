import React from "react";
import NextImage from "next/image";

export function Informacion() {
  const data = [
    { label: "UNIVERSIDAD", value: "UPLA" },
    { label: "CARRERA", value: "Ingeniería de Sistemas" },
    { label: "CICLO", value: "V Ciclo" },
    { label: "AÑO ACADÉMICO", value: "2026" },
    { label: "DOCENTE", value: "Raul Enrique Fernandez Bejarano" }
  ];

  return (
    <div className="max-w-5xl mx-auto py-4 sm:py-6 px-4 animate-in fade-in zoom-in-95 duration-500">
      
      {/* Grid: 1 columna en móvil, 2 en PC (Izquierda foto, Derecha texto) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center bg-[#1e2735]/90 border border-cyan-500/20 backdrop-blur-md p-5 sm:p-7 rounded-2xl md:rounded-3xl shadow-xl relative overflow-hidden">
        
        {/* Glow de fondo */}
        <div className="absolute top-0 right-0 w-52 h-52 bg-cyan-400/10 blur-[70px] pointer-events-none rounded-full"></div>

        {/* Lado Izquierdo: Foto */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center relative z-10">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1 bg-[#131b26] relative border border-cyan-400/30 shadow-lg mb-3 sm:mb-4">
            <div className="w-full h-full relative rounded-full overflow-hidden">
              <NextImage 
                src="/JORGE CV.jpg" 
                alt="Jorge Luis Curo Villar" 
                fill
                className="object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
          <span className="px-3 py-1 bg-[#131b26] border border-cyan-400/30 text-cyan-400 rounded-full text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            Estudiante activo
          </span>
        </div>

        {/* Lado Derecho: Contenido */}
        <div className="lg:col-span-8 flex flex-col relative z-10">
          <p className="text-cyan-400 font-bold tracking-widest text-[11px] mb-1 uppercase">Sobre Mí</p>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white tracking-wide mb-1">
            JORGE LUIS <span className="text-lg sm:text-xl md:text-2xl text-cyan-200/80">CURO VILLAR</span>
          </h3>
          <p className="text-cyan-100/70 mb-3 sm:mb-4 font-medium tracking-wide text-xs sm:text-sm">
            Estudiante de Ingeniería de Sistemas · V Ciclo
          </p>
          
          <div className="bg-[#131b26]/80 p-3.5 sm:p-4 rounded-xl border border-white/5 mb-4 sm:mb-5">
            <p className="text-slate-300 leading-relaxed font-light text-xs sm:text-sm">
              Bienvenidos a mi portafolio de Base de Datos II. Como estudiante del V ciclo de Ingeniería de Sistemas en la Universidad Peruana Los Andes, me apasiona entender la arquitectura detrás de los sistemas de información. Al considerar las bases de datos como el motor principal de cualquier aplicación moderna, aquí documento mi dominio en la gestión de datos relacionales, la optimización de consultas y la administración en SQL Server.
            </p>
          </div>

          {/* Cards de Datos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {data.map((item, index) => (
              <div 
                key={index} 
                className="bg-[#131b26]/80 p-2.5 sm:p-3 rounded-lg border border-white/5 hover:border-cyan-400/30 transition-all duration-300 group"
              >
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 group-hover:text-cyan-400/70 transition-colors">{item.label}</p>
                <p className="text-white font-medium text-xs sm:text-sm truncate">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
