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
      <div className="container mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-10">
          <div className="flex items-center">
            <div className="relative h-10 w-32 sm:h-[3.2rem] sm:w-48 bg-white rounded-xl px-2 sm:px-3 py-1 sm:py-1.5 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.15)] border border-cyan-400/20">
              <img 
                src="/upla-logo.png" 
                alt="Logo UPLA" 
                className="object-contain w-full h-full"
              />
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            {/* Ícono de carpeta tecnológica con gradiente cyan a índigo */}
            <svg 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="url(#techGradient)" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
            >
              <defs>
                <linearGradient id="techGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#818cf8" /> {/* Indigo */}
                  <stop offset="100%" stopColor="#22d3ee" /> {/* Cyan */}
                </linearGradient>
              </defs>
              {/* Carpeta */}
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              {/* Circuitos internos */}
              <path d="M9 14h2l2-2h4" />
              <circle cx="17" cy="12" r="1" fill="#22d3ee" />
              <path d="M7 14v-2l2-2" />
              <circle cx="9" cy="10" r="1" fill="#818cf8" />
            </svg>
            
            <span className="text-white font-sans font-medium text-lg sm:text-xl tracking-wide drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
              Mi Portafolio Académico
            </span>
          </div>
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
