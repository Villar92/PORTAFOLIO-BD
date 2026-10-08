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
      if (email === "admin@upla.edu.pe" && password === "admin") {
        setSuccess(true);
      } else {
        setError("Credenciales incorrectas. (Pista: admin@upla.edu.pe / admin)");
        setSuccess(false);
      }
      setIsLoading(false);
    }, 800);
  };

  if (success) {
    return (
      <div className="animate-in fade-in zoom-in duration-500 w-full">
        <div className="max-w-7xl mx-auto py-8 px-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <UserCircle2 className="w-8 h-8 text-emerald-400" />
              Panel de Administración
            </h2>
            <p className="text-slate-400 mt-1">Aquí puedes gestionar (subir/eliminar) los archivos de tu portafolio.</p>
          </div>
          <button 
            onClick={() => setSuccess(false)}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl font-medium transition-colors border border-red-500/30"
          >
            Cerrar Sesión
          </button>
        </div>
        
        {/* Render Trabajos con permisos de administrador */}
        <div className="-mt-8">
          <Trabajos isAdmin={true} />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-12 px-4 animate-in fade-in duration-500">
      <div className="bg-black/40 backdrop-blur-2xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/10 overflow-hidden">
        <div className="p-8 pb-6 border-b border-white/5 bg-white/5 text-center">
          <h2 className="text-2xl font-bold text-white tracking-tight">Iniciar Sesión</h2>
          <p className="text-slate-400 mt-2 text-sm">Acceso exclusivo para administración del portafolio</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-900/30 border border-red-500/30 rounded-xl text-red-200 text-sm animate-in shake">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Correo Institucional</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="ejemplo@upla.edu.pe"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Contraseña</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/25 transition-all duration-300 flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <>
                  Ingresar al Panel
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
