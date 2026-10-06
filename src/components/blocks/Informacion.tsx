import React from "react";
import { Building2, GraduationCap, BookMarked, UserCircle } from "lucide-react";

export function Informacion() {
  const data = [
    {
      icon: <Building2 className="w-8 h-8 text-blue-600" />,
      label: "Universidad",
      value: "Universidad Peruana Los Andes (UPLA)"
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
      label: "Carrera",
      value: "Ingeniería de Sistemas y Computación"
    },
    {
      icon: <BookMarked className="w-8 h-8 text-blue-600" />,
      label: "Asignatura",
      value: "Base de datos II"
    },
    {
      icon: <UserCircle className="w-8 h-8 text-blue-600" />,
      label: "Docente",
      value: "Raul Enrique Fenandez Bejarano"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in zoom-in-95 duration-500">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">IDENTIFICACIÓN</h2>
        <div className="h-1.5 w-24 bg-blue-500 mx-auto rounded-full"></div>
      </div>

      <div className="bg-slate-900/70 backdrop-blur-xl rounded-3xl shadow-lg border border-white/20 p-8 md:p-12">
        <h3 className="text-xl font-bold text-white mb-8 border-b border-white/10 pb-4">INFORMACIÓN ACADÉMICA</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((item, index) => (
            <div 
              key={index} 
              className="group flex items-start gap-4 p-6 rounded-2xl bg-slate-800/40 hover:bg-slate-800/60 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-300 shadow-sm"
            >
              <div className="p-3 bg-slate-800 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-lg font-medium text-slate-100">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
