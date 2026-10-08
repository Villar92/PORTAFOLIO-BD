import React from "react";
import { Home, User, BookOpen, LogIn } from "lucide-react";

export function Navbar({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) {
  const tabs = [
    { id: "inicio", label: "Inicio", icon: Home },
    { id: "informacion", label: "Sobre Mí", icon: User },
    { id: "trabajos", label: "Unidades", icon: BookOpen },
    { id: "login", label: "Acceso", icon: LogIn }
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

        <div className="flex items-center gap-2 sm:gap-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center pr-3 sm:pr-6 pl-1.5 py-1.5 rounded-full font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 group ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-cyan-500/20"
                    : "bg-[#0f172a] text-slate-300 hover:text-white border border-cyan-900/50 hover:border-cyan-400/50"
                }`}
              >
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-0 sm:mr-3 transition-transform group-hover:scale-105 ${
                  isActive ? "border-white/80" : "border-slate-500/50 group-hover:border-cyan-400/50"
                }`}>
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400 group-hover:text-cyan-300"}`} />
                </div>
                <span className="hidden sm:inline-block">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
