"use client";

import React, { useState } from "react";
import { Lock, User, ChevronDown, CheckCircle2 } from "lucide-react";
import { Trabajos } from "./Trabajos";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [keepLogged, setKeepLogged] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    setTimeout(() => {
      if (email === "admin@ms.upla.edu.pe" && password === "123") {
        setSuccess(true);
      } else if (email === "admin@upla.edu.pe" && password === "admin") {
        setSuccess(true);
      } else {
        setError("Credenciales incorrectas.");
        setSuccess(false);
      }
      setIsLoading(false);
    }, 800);
  };

  if (success) {
    return (
      <div className="animate-in fade-in zoom-in duration-500 w-full min-h-[75vh] flex flex-col">
        <div className="max-w-5xl mx-auto py-6 px-4 w-full">
          {/* Header Premium Admin */}
          <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#0f172a]/95 to-[#0B1120]/95 border border-cyan-500/20 shadow-[0_4px_30px_rgba(34,211,238,0.12)] p-6 sm:p-7 backdrop-blur-xl flex flex-col md:flex-row justify-between items-center gap-6 overflow-hidden group">
            {/* Glow de fondo dinámico */}
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none animate-pulse group-hover:bg-cyan-400/20 transition-all duration-500"></div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 relative z-10 text-center md:text-left">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 p-[2px] shadow-[0_0_20px_rgba(34,211,238,0.25)] flex-shrink-0">
                <div className="w-full h-full bg-[#0B1120] rounded-2xl flex items-center justify-center">
                  <User className="w-7 h-7 text-cyan-400" />
                </div>
              </div>
              
              <div className="flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 mb-2 mx-auto md:mx-0 shadow-inner w-fit">
                  <div className="relative flex h-2 w-2 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1 w-1 bg-cyan-400"></span>
                  </div>
                  <span className="text-cyan-300 text-[9px] font-bold tracking-[0.2em] uppercase">Modo Administrador</span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-100 tracking-tight mb-1 drop-shadow-sm">
                  PANEL DE CONTROL
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm font-light max-w-xl leading-relaxed">
                  Gestiona, sube o elimina los recursos académicos y archivos de cada unidad del portafolio.
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => setSuccess(false)}
              className="relative z-10 px-5 py-2.5 bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white rounded-xl font-bold tracking-widest text-[11px] uppercase transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:shadow-[0_0_30px_rgba(239,68,68,0.35)] hover:-translate-y-0.5"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
        
        <div className="flex-1 w-full mt-2">
          <Trabajos isAdmin={true} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-8 px-4 animate-in fade-in duration-500">
      
      {/* Tarjeta principal estilo corporativo nuevo */}
      <div className="w-full max-w-[340px] bg-[#1e2735]/90 border border-cyan-500/20 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        
        {/* Mitad superior: Imagen */}
        <div className="h-32 w-full relative">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url("/sql-server.jpg")' }}
          ></div>
          {/* Overlay sutil para la imagen */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1e2735]/90"></div>
        </div>

        {/* Círculo central con flecha */}
        <div className="relative flex justify-center -mt-4 z-10">
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer">
            <ChevronDown className="w-4 h-4 text-[#1e2735] stroke-[3]" />
          </div>
        </div>

        {/* Mitad inferior: Formulario */}
        <div className="px-6 pb-6 pt-3">
          <div className="text-center mb-4">
            <h3 className="text-base font-sans font-bold text-white tracking-wide">
              INICIAR SESIÓN
            </h3>
          </div>

          <form onSubmit={handleLogin} className="space-y-3">
            {error && (
              <div className="p-2.5 bg-red-500/20 border border-red-500/50 rounded-full text-red-200 text-xs text-center animate-in shake">
                {error}
              </div>
            )}
            
            {/* Input Usuario */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2 bg-[#131b26] border border-cyan-500/20 rounded-full text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-all text-xs sm:text-sm font-medium"
                placeholder="CORREO INSTITUCIONAL"
                required
              />
            </div>

            {/* Input Contraseña */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2 bg-[#131b26] border border-cyan-500/20 rounded-full text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-all text-xs sm:text-sm font-medium tracking-wider"
                placeholder="CONTRASEÑA"
                required
              />
            </div>

            {/* Checkbox y Forgot Password */}
            <div className="flex items-center justify-between pt-1 pb-2 px-1">
              <button 
                type="button" 
                onClick={() => setKeepLogged(!keepLogged)}
                className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-cyan-400 transition-colors"
              >
                {keepLogged ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border border-slate-500"></div>
                )}
                Recordarme
              </button>
              
              <a href="#" className="text-[11px] text-slate-400 hover:text-cyan-400 transition-colors">
                ¿Olvidaste clave?
              </a>
            </div>

            {/* Botón de Login */}
            <div className="flex justify-center pt-1">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-white rounded-full font-bold text-xs tracking-wider shadow-md transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  "INGRESAR"
                )}
              </button>
            </div>
            
            {/* Texto oculto para demo */}
            <div className="text-center pt-2 opacity-50 hover:opacity-100 transition-opacity">
               <p className="text-[10px] text-slate-500">Demo: admin@ms.upla.edu.pe / 123</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
