import React from "react";
import { Home, LogIn } from "lucide-react";

export function Navbar({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) {

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#0B1120]/95 border-b border-cyan-400/30 shadow-[0_4px_30px_rgba(34,211,238,0.15)]">
      <div className="container mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="flex items-center">
            <div className="relative h-7 w-20 sm:h-8 sm:w-28 bg-white rounded-xl px-2 py-1 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.15)] border border-cyan-400/20">
              <img 
                src="/upla-logo.png" 
                alt="Logo UPLA" 
                className="object-contain w-full h-full"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {activeTab === "login" ? (
            <button
              onClick={() => setActiveTab("inicio")}
              className="flex items-center pr-4 sm:pr-6 pl-1.5 py-1.5 rounded-full font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 group bg-[#0f172a] text-slate-300 hover:text-white border border-cyan-900/50 hover:border-cyan-400/50 cursor-pointer shadow-lg hover:shadow-cyan-500/20"
            >
              <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center mr-2 sm:mr-3 transition-transform group-hover:scale-105 border-slate-500/50 group-hover:border-cyan-400/50">
                <Home className="w-4 h-4 text-slate-400 group-hover:text-cyan-300" />
              </div>
              <span>Volver</span>
            </button>
          ) : (
            <button
              onClick={() => setActiveTab("login")}
              className="flex items-center pr-4 sm:pr-6 pl-1.5 py-1.5 rounded-full font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 group bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-cyan-500/25 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
            >
              <div className="w-8 h-8 rounded-full border-2 border-white/80 flex items-center justify-center mr-2 sm:mr-3 transition-transform group-hover:scale-105">
                <LogIn className="w-4 h-4 text-white" />
              </div>
              <span>Acceso</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
