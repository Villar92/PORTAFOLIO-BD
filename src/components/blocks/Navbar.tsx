import React from "react";
import { GraduationCap } from "lucide-react";

export function Navbar({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) {
  const tabs = [
    { id: "presentacion", label: "Inicio" },
    { id: "informacion", label: "Sobre mí" },
    { id: "trabajos", label: "Unidades" },
    { id: "login", label: "Iniciar Sesión" }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#0B1120]/90 border-b border-cyan-900/50 shadow-lg">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-white font-bold text-2xl tracking-tighter">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              {/* Aproximación al logo UPLA con ícono */}
              <GraduationCap className="h-7 w-7 text-[#0B1120]" />
            </div>
            <span className="text-xl">UPLA</span>
          </div>
          <span className="text-cyan-400 font-serif font-bold tracking-widest text-lg sm:text-xl hidden sm:inline-block uppercase drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
            Mi Portafolio Académico
          </span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                  : "text-white/80 hover:text-cyan-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex gap-2 overflow-x-auto pb-2 -mb-2 scrollbar-hide w-full max-w-[60%] justify-end">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                activeTab === tab.id
                  ? "bg-cyan-400 text-black shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                  : "text-white/80"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
