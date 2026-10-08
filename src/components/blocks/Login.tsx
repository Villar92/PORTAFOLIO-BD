"use client";

import React, { useState } from "react";
import { Lock, Mail, ArrowRight, UserCircle2 } from "lucide-react";
import { Trabajos } from "./Trabajos";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
            <h2 className="text-2xl font-serif font-bold text-cyan-400 flex items-center gap-3 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
              <UserCircle2 className="w-8 h-8 text-cyan-400" />
              PANEL DE ADMINISTRACIÓN
            </h2>
            <p className="text-slate-400 mt-1 font-light tracking-wide">Aquí puedes gestionar (subir/eliminar) los archivos de tu portafolio.</p>
          </div>
          <button 
            onClick={() => setSuccess(false)}
            className="px-6 py-2 bg-transparent border-2 border-red-500/50 hover:bg-red-500/10 text-red-400 rounded-full font-bold transition-all shadow-[0_0_10px_rgba(239,68,68,0.2)]"
          >
            Cerrar Sesión
          </button>
        </div>
        
        {/* Render Trabajos con permisos de administrador */}
        <div className="flex-1 w-full mt-4">
          <Trabajos isAdmin={true} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] py-12 px-4 animate-in fade-in duration-500">
      
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-cyan-400 tracking-widest drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]">
          ACCESO ADMINISTRATIVO
        </h2>
      </div>

      <div className="w-full max-w-md bg-[#0B1120] rounded-[2rem] border border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.2)] p-10 relative">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-serif font-bold text-cyan-400 flex items-center justify-center gap-3 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
            <span className="text-3xl">🔐</span> INICIAR SESIÓN
          </h3>
          <p className="text-slate-400 text-sm mt-3 font-light tracking-wide">Panel exclusivo para administradores</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-900/30 border border-red-500/50 rounded-xl text-red-200 text-sm text-center animate-in shake">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-cyan-400 flex items-center gap-2">
              <Mail className="w-4 h-4" /> Correo institucional
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#f1f5f9] border-none rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all font-medium"
              placeholder="admin@upla.edu.pe"
              required
            />
          </div>

          <div className="space-y-2 pb-4">
            <label className="text-sm font-bold text-cyan-400 flex items-center gap-2">
              <Lock className="w-4 h-4" /> Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#f1f5f9] border-none rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all font-medium tracking-[0.2em]"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-cyan-400 hover:bg-cyan-300 text-[#0B1120] rounded-full font-extrabold tracking-widest shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="w-6 h-6 border-2 border-[#0B1120]/30 border-t-[#0B1120] rounded-full animate-spin"></span>
            ) : (
              "INGRESAR"
            )}
          </button>

          <div className="pt-6 mt-6 border-t border-white/5 border-dashed text-center">
            <p className="text-xs text-slate-500 font-light">
              <span className="text-cyan-400 font-bold">Demo:</span> admin@ms.upla.edu.pe / 123
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
