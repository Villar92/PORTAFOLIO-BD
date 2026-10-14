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
    <div className="max-w-4xl mx-auto py-2 sm:py-4 px-4 animate-in fade-in zoom-in-95 duration-500">
      
      {/* Grid: 1 columna en móvil, 2 en PC (Izquierda foto, Derecha texto) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center bg-[#0f172a]/85 border border-cyan-500/25 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.6)] relative overflow-hidden">
        
        {/* Glow de fondo */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-400/10 blur-[60px] pointer-events-none rounded-full"></div>

        {/* Lado Izquierdo: Foto */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center relative z-10">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-[#0B1120] relative border border-cyan-400/30 shadow-lg mb-2.5">
            <div className="w-full h-full relative rounded-full overflow-hidden">
              <NextImage 
                src="/JORGE CV.jpg" 
                alt="Jorge Luis Curo Villar" 
                fill
                className="object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
          <span className="px-2.5 py-0.5 bg-[#0B1120] border border-cyan-400/30 text-cyan-300 rounded-full text-[10px] font-bold flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            Estudiante activo
          </span>
        </div>

        {/* Lado Derecho: Contenido */}
        <div className="lg:col-span-8 flex flex-col relative z-10">
          <p className="text-cyan-400 font-bold tracking-widest text-[10px] mb-0.5 uppercase">Sobre Mí</p>
          <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-white tracking-wide mb-0.5">
            JORGE LUIS <span className="text-base sm:text-lg md:text-xl text-cyan-200/80">CURO VILLAR</span>
          </h3>
          <p className="text-cyan-100/70 mb-2.5 font-medium tracking-wide text-[11px] sm:text-xs">
            Estudiante de Ingeniería de Sistemas · V Ciclo
          </p>
          
          <div className="bg-[#0B1120]/75 p-3 sm:p-3.5 rounded-xl border border-white/5 mb-3">
            <p className="text-slate-300 leading-relaxed font-light text-[11px] sm:text-xs">
              Bienvenidos a mi portafolio de Base de Datos II. Como estudiante del V ciclo de Ingeniería de Sistemas en la Universidad Peruana Los Andes, me apasiona entender la arquitectura detrás de los sistemas de información. Al considerar las bases de datos como el motor principal de cualquier aplicación moderna, aquí documento mi dominio en la gestión de datos relacionales, la optimización de consultas y la administración en SQL Server.
            </p>
          </div>

          {/* Cards de Datos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {data.map((item, index) => (
              <div 
                key={index} 
                className="bg-[#0B1120]/75 p-2 sm:p-2.5 rounded-lg border border-white/5 hover:border-cyan-400/30 transition-all duration-300 group"
              >
                <p className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 group-hover:text-cyan-400/70 transition-colors">{item.label}</p>
                <p className="text-white font-medium text-[11px] sm:text-xs truncate">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
