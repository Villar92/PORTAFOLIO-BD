import React from "react";
import { GraduationCap } from "lucide-react";

export function Navbar({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) {
  const tabs = [
    { id: "presentacion", label: "Presentación" },
    { id: "informacion", label: "Información" },
    { id: "trabajos", label: "Trabajos" },
    { id: "contacto", label: "Contacto" },
    { id: "login", label: "Login" }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-black/40 border-b border-white/10 shadow-2xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 text-white font-bold text-xl tracking-tighter">
          <GraduationCap className="h-7 w-7 text-indigo-400" />
          <span>UPLA <span className="text-white/40 font-light hidden sm:inline-block">| Portafolio</span></span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] border border-white/20"
                  : "text-white/60 hover:bg-white/5 hover:text-white border border-transparent"
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
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-white/10 text-white border border-white/20"
                  : "text-white/60"
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
