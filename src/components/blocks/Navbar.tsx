import React from "react";

export function Navbar({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) {
  const tabs = [
    { id: "inicio", label: "Inicio" },
    { id: "informacion", label: "Sobre Mí" },
    { id: "trabajos", label: "Unidades" },
    { id: "login", label: "Acceso" }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/85 border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <div className="relative h-12 w-36">
              <img 
                src="/upla-logo.png" 
                alt="Logo UPLA" 
                className="object-contain w-full h-full drop-shadow-sm"
              />
            </div>
          </div>
          <span className="text-slate-800 font-bold tracking-tight text-lg sm:text-xl hidden sm:inline-block">
            Mi Portafolio
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-6 bg-slate-100/50 p-1.5 rounded-full border border-slate-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? "text-white bg-blue-600 shadow-md"
                  : "text-slate-600 hover:text-blue-600 hover:bg-white/50"
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
