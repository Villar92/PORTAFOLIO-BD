import React from "react";
import { Home, LogIn } from "lucide-react";

export function Navbar({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) {

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#0B1120]/90 border-b border-cyan-400/20 shadow-[0_2px_20px_rgba(34,211,238,0.1)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-13 sm:h-14 flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-8">
          <div className="flex items-center">
            <div className="relative h-6 w-18 sm:h-7 sm:w-24 bg-white rounded-lg px-2 py-0.5 flex items-center justify-center shadow-[0_0_12px_rgba(34,211,238,0.15)] border border-cyan-400/20">
              <img 
                src="/upla-logo.png" 
                alt="Logo UPLA" 
                className="object-contain w-full h-full"
              />
            </div>
          </div>

          {activeTab !== "login" && (
            <div className="hidden md:flex items-center gap-5 text-xs font-medium text-slate-300">
              <a href="#inicio" className="hover:text-cyan-400 transition-colors">Inicio</a>
              <a href="#sobre-mi" className="hover:text-cyan-400 transition-colors">Sobre Mí</a>
              <a href="#unidades" className="hover:text-cyan-400 transition-colors">Unidades</a>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {activeTab === "login" ? (
            <button
              onClick={() => setActiveTab("inicio")}
              className="flex items-center pr-3.5 sm:pr-4 pl-1 py-1 rounded-full font-semibold text-xs tracking-wide transition-all duration-300 group bg-[#0f172a] text-slate-300 hover:text-white border border-cyan-900/50 hover:border-cyan-400/50 cursor-pointer shadow-md hover:shadow-cyan-500/15"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border flex items-center justify-center mr-2 transition-transform group-hover:scale-105 border-slate-500/50 group-hover:border-cyan-400/50">
                <Home className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-300" />
              </div>
              <span>Volver</span>
            </button>
          ) : (
            <button
              onClick={() => setActiveTab("login")}
              className="flex items-center pr-3.5 sm:pr-4 pl-1 py-1 rounded-full font-semibold text-xs tracking-wide transition-all duration-300 group bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-md shadow-cyan-500/20 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-white/80 flex items-center justify-center mr-2 transition-transform group-hover:scale-105">
                <LogIn className="w-3.5 h-3.5 text-white" />
              </div>
              <span>Acceso</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
