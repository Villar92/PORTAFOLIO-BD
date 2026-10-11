"use client";

import React, { useEffect, useState } from "react";
import { Database, BookOpen, User, Sparkles } from "lucide-react";
import { AntigravityTransition } from "./AntigravityTransition";

export function Presentacion({ setActiveTab, activeTab = "inicio" }: { setActiveTab: (tab: string) => void, activeTab?: string }) {
  const [mounted, setMounted] = useState(false);
  const [transitionActive, setTransitionActive] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (activeTab === "inicio" || activeTab === "presentacion") {
      setTransitionActive(true);
      const timer = setTimeout(() => {
        setTransitionActive(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] py-10 px-4 relative overflow-hidden">
      
      {/* 1. Transición de Portal y Ondas Gravitacionales Antigravity */}
      <AntigravityTransition active={transitionActive} />

      {/* 2. Contenedor principal con efecto de gravedad cero */}
      <div className={`max-w-4xl w-full flex flex-col items-center text-center relative p-4 sm:p-8 z-10 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-10 blur-sm'}`}>

        {/* Etiqueta superior con levitación sutil */}
        <div 
          className="mb-6 inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#0B1120]/80 border border-cyan-400/30 shadow-[0_0_20px_rgba(6,182,212,0.25)] backdrop-blur-md animate-antigravity-levitate hover:border-cyan-400/60 transition-colors"
          style={{ animationDuration: "5s" }}
        >
          <Database className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-semibold text-cyan-50 tracking-widest uppercase">
            Universidad Peruana Los Andes
          </span>
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
        </div>

        {/* Título Principal con resplandor Antigravity y levitación */}
        <div className="space-y-4 max-w-3xl mb-10">
          <div className="relative inline-block">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-[family-name:var(--font-outfit)] font-semibold text-white tracking-[0.12em] sm:tracking-[0.16em] drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] leading-tight select-none">
              BASE DE DATOS{" "}
              <span className="inline-block font-black text-transparent bg-clip-text bg-gradient-to-b from-cyan-200 via-cyan-400 to-blue-500 drop-shadow-[0_0_30px_rgba(34,211,238,0.8)] animate-antigravity-levitate ml-1" style={{ animationDuration: "3.5s" }}>
                II
              </span>
            </h1>
            {/* Resplandor de línea horizontal sutil bajo el título */}
            <div className="w-3/4 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-3 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
          </div>
          
          <h2 className="text-xl sm:text-2xl font-medium text-slate-200 tracking-[0.2em] mt-5 sm:mt-7 drop-shadow-md">
            JORGE LUIS{" "}
            <span className="font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">
              CURO VILLAR
            </span>
          </h2>
          
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light mt-6 leading-relaxed drop-shadow px-2">
            Dominando el diseño, la optimización y la consulta avanzada en SQL Server. Utilizando los retos de Base de Datos II como trampolín para construir soluciones reales, escalables y listas para la industria.
          </p>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto items-center justify-center">
          <button 
            onClick={() => setActiveTab("trabajos")}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-blue-700 hover:from-cyan-400 hover:via-blue-500 hover:to-blue-600 text-white rounded-full font-bold text-sm tracking-widest shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.7)] hover:-translate-y-1.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group"
          >
            <BookOpen className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6" />
            <span>VER UNIDADES</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("informacion")}
            className="w-full sm:w-auto px-8 py-3.5 bg-white/[0.08] hover:bg-white/[0.16] text-white border border-cyan-400/30 hover:border-cyan-400/70 rounded-full font-bold text-sm tracking-widest backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] hover:-translate-y-1.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group"
          >
            <User className="w-5 h-5 text-cyan-400 transition-transform duration-300 group-hover:scale-110" />
            <span>SOBRE MÍ</span>
          </button>
        </div>

      </div>
      
    </div>
  );
}
