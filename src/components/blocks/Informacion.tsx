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
    <div className="max-w-6xl mx-auto py-8 px-4 animate-in fade-in zoom-in-95 duration-500">
      
      {/* Grid: 1 columna en móvil, 2 en PC (Izquierda foto, Derecha texto) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#2A3441] p-6 md:p-8 lg:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden">
        
        {/* Glow de fondo */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 blur-[80px] pointer-events-none rounded-full"></div>

        {/* Lado Izquierdo: Foto */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center relative z-10">
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-full p-2 bg-[#1E252F] relative border border-cyan-400/30 shadow-xl mb-6">
            <div className="w-full h-full relative rounded-full overflow-hidden">
              <NextImage 
                src="/JORGE CV.jpg" 
                alt="Jorge Luis Curo Villar" 
                fill
                className="object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
          <span className="px-4 py-1.5 bg-[#1E252F] border border-cyan-400/30 text-cyan-400 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Estudiante activo
          </span>
        </div>

        {/* Lado Derecho: Contenido */}
        <div className="lg:col-span-8 flex flex-col relative z-10">
          <p className="text-cyan-400 font-bold tracking-widest text-xs mb-2 uppercase">Sobre Mí</p>
          <h3 className="text-2xl md:text-4xl font-serif font-bold text-white tracking-wide mb-2">
            JORGE LUIS <span className="text-xl md:text-3xl text-cyan-100/80">CURO VILLAR</span>
          </h3>
          <p className="text-cyan-100/70 mb-5 font-medium tracking-wide text-sm md:text-base">
            Estudiante de Ingeniería de Sistemas · V Ciclo
          </p>
          
          <div className="bg-[#1E252F] p-6 rounded-2xl border border-white/5 mb-8">
            <p className="text-slate-300 leading-relaxed font-light text-sm md:text-base">
              Bienvenidos a mi portafolio de Base de Datos II. Como estudiante del V ciclo de Ingeniería de Sistemas en la Universidad Peruana Los Andes, me apasiona entender la arquitectura detrás de los sistemas de información. Al considerar las bases de datos como el motor principal de cualquier aplicación moderna, aquí documento mi dominio en la gestión de datos relacionales, la optimización de consultas y la administración en SQL Server.
            </p>
          </div>

          {/* Cards de Datos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {data.map((item, index) => (
              <div 
                key={index} 
                className="bg-[#1E252F] p-4 rounded-xl border border-white/5 hover:border-cyan-400/30 transition-all duration-300 group"
              >
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 group-hover:text-cyan-400/70 transition-colors">{item.label}</p>
                <p className="text-white font-semibold text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
