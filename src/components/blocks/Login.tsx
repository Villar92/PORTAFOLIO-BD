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
        <div className="max-w-7xl mx-auto py-8 px-4 flex justify-between items-center w-full">
          <div>
            <h2 className="text-2xl font-sans font-bold text-slate-800 flex items-center gap-3">
              <User className="w-8 h-8 text-blue-600" />
              PANEL DE ADMINISTRACIÓN
            </h2>
            <p className="text-slate-500 mt-1 font-medium">Aquí puedes gestionar (subir/eliminar) los archivos de tu portafolio.</p>
          </div>
          <button 
            onClick={() => setSuccess(false)}
            className="px-6 py-2 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 rounded-full font-bold transition-all"
          >
            Cerrar Sesión
          </button>
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
