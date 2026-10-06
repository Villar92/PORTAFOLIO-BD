import React from "react";
import { Users, FileArchive, Settings, BarChart3, Clock, AlertCircle } from "lucide-react";

export function AdminPanel() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Panel de Administración</h2>
          <p className="text-slate-300 mt-1">Gestión de entregas y calificaciones del portafolio</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-blue-900/50 text-blue-300 rounded-full text-sm font-semibold flex items-center gap-2 border border-blue-400/20">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            Docente Mode
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-900/70 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-indigo-900/50 text-indigo-400 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-400">Total Estudiantes</p>
            <p className="text-2xl font-bold text-white">1</p>
          </div>
        </div>
        
        <div className="bg-slate-900/70 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-green-900/50 text-green-400 rounded-xl">
            <FileArchive className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-400">Entregas Recibidas</p>
            <p className="text-2xl font-bold text-white">0 / 24</p>
          </div>
        </div>
        
        <div className="bg-slate-900/70 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-amber-900/50 text-amber-400 rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-400">Pendientes de Calificar</p>
            <p className="text-2xl font-bold text-white">0</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-slate-800/40">
          <h3 className="font-bold text-white">Últimas Actividades</h3>
          <button className="text-sm text-blue-400 font-medium hover:underline">Ver todas</button>
        </div>
        
        <div className="p-12 text-center flex flex-col items-center justify-center text-slate-400 space-y-4">
          <AlertCircle className="w-12 h-12 text-slate-600" />
          <p>No hay entregas recientes para mostrar.</p>
        </div>
      </div>
    </div>
  );
}
