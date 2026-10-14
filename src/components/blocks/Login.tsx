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
      <div className="animate-in fade-in zoom-in duration-500 w-full min-h-[80vh] flex flex-col">
        <div className="max-w-7xl mx-auto py-8 px-4 w-full">
          {/* Header Premium Admin */}
          <div className="relative rounded-[2.5rem] bg-gradient-to-r from-[#0f172a]/95 to-[#0B1120]/95 border border-cyan-500/20 shadow-[0_0_50px_rgba(34,211,238,0.15)] p-8 md:p-10 backdrop-blur-xl flex flex-col md:flex-row justify-between items-center gap-8 overflow-hidden group">
            {/* Glow de fondo dinámico */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none animate-pulse group-hover:bg-cyan-400/20 transition-all duration-700"></div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10 text-center md:text-left">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 p-[2px] shadow-[0_0_30px_rgba(34,211,238,0.3)] flex-shrink-0">
                <div className="w-full h-full bg-[#0B1120] rounded-3xl flex items-center justify-center">
                  <User className="w-10 h-10 text-cyan-400" />
                </div>
              </div>
              
              <div className="flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/30 mb-3 mx-auto md:mx-0 shadow-inner w-fit">
                  <div className="relative flex h-2.5 w-2.5 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400"></span>
                  </div>
                  <span className="text-cyan-300 text-[10px] font-bold tracking-[0.25em] uppercase">Modo Administrador</span>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-100 tracking-tight mb-2 drop-shadow-md">
                  PANEL DE CONTROL
                </h2>
                <p className="text-slate-400 text-sm md:text-base font-light max-w-xl leading-relaxed">
                  Gestiona, sube o elimina los recursos académicos y archivos de cada unidad del portafolio.
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => setSuccess(false)}
              className="relative z-10 px-8 py-3.5 bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white rounded-2xl font-bold tracking-widest text-xs uppercase transition-all duration-300 shadow-[0_0_20px_rgba(239,68,68,0.1)] hover:shadow-[0_0_40px_rgba(239,68,68,0.4)] hover:-translate-y-1"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
        
        <div className="flex-1 w-full mt-4">
          <Trabajos isAdmin={true} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] py-12 px-4 animate-in fade-in duration-500">
      
      {/* Tarjeta principal estilo corporativo nuevo */}
      <div className="w-full max-w-[380px] bg-[#2A3441] rounded-[1.5rem] overflow-hidden shadow-2xl flex flex-col">
        
        {/* Mitad superior: Imagen */}
        <div className="h-40 w-full relative">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url("/sql-server.jpg")' }}
          ></div>
          {/* Overlay sutil para la imagen */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#2A3441]/80"></div>
        </div>

        {/* Círculo central con flecha */}
        <div className="relative flex justify-center -mt-5 z-10">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer">
            <ChevronDown className="w-5 h-5 text-[#2A3441] stroke-[3]" />
          </div>
        </div>

        {/* Mitad inferior: Formulario */}
        <div className="px-8 pb-8 pt-4">
          <div className="text-center mb-6">
            <h3 className="text-lg font-sans font-bold text-white tracking-wide">
              INICIAR SESIÓN
            </h3>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-full text-red-200 text-xs text-center animate-in shake">
                {error}
              </div>
            )}
            
            {/* Input Usuario */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-[#1E252F] border border-[#1E252F] rounded-full text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-all text-sm font-medium"
                placeholder="CORREO INSTITUCIONAL"
                required
              />
            </div>

            {/* Input Contraseña */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-[#1E252F] border border-[#1E252F] rounded-full text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-all text-sm font-medium tracking-widest"
                placeholder="CONTRASEÑA"
                required
              />
            </div>

            {/* Checkbox y Forgot Password */}
            <div className="flex items-center justify-between pt-2 pb-4 px-2">
              <button 
                type="button" 
                onClick={() => setKeepLogged(!keepLogged)}
                className="flex items-center gap-2 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
              >
                {keepLogged ? (
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-500"></div>
                )}
                Mantener sesión iniciada
              </button>
              
              <a href="#" className="text-xs text-slate-400 hover:text-cyan-400 transition-colors">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Botón de Login */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="px-10 py-2.5 bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-white rounded-full font-bold text-sm tracking-widest shadow-lg transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  "INGRESAR"
                )}
              </button>
            </div>
            
            {/* Texto oculto para demo */}
            <div className="text-center pt-4 opacity-50 hover:opacity-100 transition-opacity">
               <p className="text-[10px] text-slate-500">Demo: admin@ms.upla.edu.pe / 123</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
