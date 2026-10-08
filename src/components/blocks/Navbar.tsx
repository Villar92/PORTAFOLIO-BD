import React from "react";

export function Navbar({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) {
  const tabs = [
    { id: "inicio", label: "Inicio" },
    { id: "informacion", label: "Sobre Mí" },
    { id: "trabajos", label: "Unidades" },
    { id: "login", label: "Acceso" }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#0B1120]/95 border-b border-cyan-400/30 shadow-[0_4px_30px_rgba(34,211,238,0.15)]">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <div className="relative h-12 w-36">
              <img 
                src="/upla-logo.png" 
                alt="Logo UPLA" 
                className="object-contain w-full h-full drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
              />
            </div>
          </div>
          <span className="text-cyan-400 font-serif font-bold tracking-widest text-lg sm:text-xl hidden sm:inline-block uppercase drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
            Mi Portafolio Académico
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-6 bg-[#0f172a] p-1.5 rounded-full border border-cyan-900/50 shadow-inner">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === tab.id
                  ? "text-[#0B1120] bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                  : "text-slate-400 hover:text-cyan-300 hover:bg-white/5"
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
