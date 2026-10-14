import React from "react";
import { GraduationCap } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950/90 backdrop-blur-md text-slate-400 py-5 sm:py-6 border-t border-cyan-500/10 mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-3">
        <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3">
          <div className="flex items-center gap-2 text-slate-300 font-medium">
            <span className="text-xs sm:text-sm tracking-wider">JORGE LUIS CURO VILLAR</span>
          </div>
          
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span className="text-white font-medium">BASE DE DATOS II <span className="mx-1 text-slate-600">|</span> UPLA</span>
          </div>
        </div>
        
        <div className="text-[11px] text-slate-500 text-center border-t border-white/5 pt-3 w-full">
          &copy; {new Date().getFullYear()} Jorge Luis Curo Villar. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
