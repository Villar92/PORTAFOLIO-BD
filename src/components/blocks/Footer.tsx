import React from "react";
import { GraduationCap } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900/90 backdrop-blur-md text-slate-400 py-8 border-t border-white/10 mt-auto">
      <div className="container mx-auto px-4 flex flex-col items-center gap-4">
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
          <div className="flex items-center gap-2 text-slate-300 font-medium">
            <span className="text-sm tracking-wider">JORGE LUIS CURO VILLAR</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <GraduationCap className="w-4 h-4 text-blue-400" />
            <span className="text-white font-medium">BASE DE DATOS II <span className="mx-1 text-slate-600">|</span> UPLA</span>
          </div>
        </div>
        
        <div className="text-xs text-slate-500 mt-2 text-center border-t border-white/5 pt-4 w-full">
          &copy; {new Date().getFullYear()} Jorge Luis Curo Villar. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
