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
    <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-blue-900/90 border-b border-blue-800 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
          <GraduationCap className="h-8 w-8 text-blue-300" />
          <span>UPLA <span className="text-blue-300 font-light hidden sm:inline-block">| Portafolio</span></span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow"
                  : "text-blue-100 hover:bg-blue-800/50 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu (simplified for now, using horizontal scroll) */}
        <div className="md:hidden flex gap-2 overflow-x-auto pb-2 -mb-2 scrollbar-hide w-full max-w-[60%] justify-end">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "text-blue-100"
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
