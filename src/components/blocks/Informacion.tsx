import React from "react";
import NextImage from "next/image";

export function Informacion() {
  const data = [
    { label: "UNIVERSIDAD", value: "UPLA" },
    { label: "CARRERA", value: "Ingeniería de Sistemas" },
    { label: "CICLO", value: "V Ciclo" },
    { label: "AÑO ACADÉMICO", value: "2024" },
    { label: "DOCENTE", value: "Raul Enrique Fernandez Bejarano" }
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 animate-in fade-in zoom-in-95 duration-500">
      <div className="text-center mb-16 mt-8">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-cyan-400 mb-4 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] tracking-widest">
          SOBRE MÍ
        </h2>
        <p className="text-slate-300 font-light">Conoce más acerca de mi trayectoria académica</p>
      </div>

      {/* Grid: 1 columna en móvil, 2 en PC (Izquierda foto, Derecha texto) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#0B1120] p-8 md:p-12 rounded-3xl border border-white/5">
        
        {/* Lado Izquierdo: Foto */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center">
          <div className="w-56 h-56 md:w-64 md:h-64 rounded-full p-1 bg-[#0B1120] relative border-4 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.6)] mb-6">
            <NextImage 
              src="/JORGE CV.jpg" 
              alt="Jorge Luis Curo Villar" 
              fill
              className="object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <span className="px-4 py-1.5 bg-[#0B1120] border border-cyan-500/50 text-cyan-400 rounded-full text-sm font-bold flex items-center gap-2 shadow-[0_0_10px_rgba(34,211,238,0.3)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Estudiante activo
          </span>
        </div>

        {/* Lado Derecho: Contenido */}
        <div className="lg:col-span-8 flex flex-col">
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)] tracking-wide mb-2">
            EDUARDO FREDY RAMÓN PUENTE
          </h3>
          <p className="text-slate-300 mb-6 font-medium tracking-wide">
            Estudiante de Ingeniería de Sistemas · V Ciclo
          </p>
          
          <p className="text-slate-300 leading-relaxed font-light mb-10 text-sm md:text-base">
            Soy estudiante de la carrera de Ingeniería de Sistemas en la Universidad Peruana Los Andes. 
            Actualmente curso el V ciclo y este portafolio documenta mi aprendizaje en Base de Datos II. 
            Me apasiona entender cómo funcionan los sistemas de información y cómo las bases de datos son 
            el corazón de cualquier aplicación moderna.
          </p>

          {/* Cards de Datos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.map((item, index) => (
              <div 
                key={index} 
                className="bg-[#0f172a]/80 p-5 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-all duration-300"
              >
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                <p className="text-white font-semibold text-sm md:text-base">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
