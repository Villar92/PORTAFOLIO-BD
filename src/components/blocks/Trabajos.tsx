"use client";

import React, { useState, useEffect, useRef } from "react";
import { Server, Database, ShieldCheck, Gauge, Upload, FileText, CheckCircle2, Eye, X, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";

export function Trabajos({ isAdmin = false }: { isAdmin?: boolean }) {
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, any[]>>({});
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  
  // Tab control
  const [activeTab, setActiveTab] = useState<string>("u1");
  // Accordion control for the unit itself
  const [isUnitOpen, setIsUnitOpen] = useState<boolean>(false);

  // Close the unit weeks grid whenever the tab changes
  useEffect(() => {
    setIsUnitOpen(false);
  }, [activeTab]);

  // Accordion control for weeks inside the active unit
  const [openWeeks, setOpenWeeks] = useState<Record<string, boolean>>({});

  const handlePrevTab = () => {
    const currentIndex = unidades.findIndex(u => u.id === activeTab);
    if (currentIndex > 0) setActiveTab(unidades[currentIndex - 1].id);
  };

  const handleNextTab = () => {
    const currentIndex = unidades.findIndex(u => u.id === activeTab);
    if (currentIndex < unidades.length - 1) setActiveTab(unidades[currentIndex + 1].id);
  };

  // Scroll reference for tabs
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadFiles = async () => {
      try {
        const res = await fetch('/api/files');
        if (res.ok) {
          const data = await res.json();
          if (data.files) setUploadedFiles(data.files);
        }
      } catch (e) {
        console.error("Error loading files", e);
      }
    };
    loadFiles();
  }, []);

  const handleFileUpload = async (actividadId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);

      for (const file of newFiles) {
        setUploading(prev => ({ ...prev, [`${actividadId}-${file.name}`]: true }));
        try {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('actividadId', actividadId);

          const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData
          });
          
          if (!res.ok) {
             let errorMsg = 'Verifica tu Token en Vercel';
             try {
               const errorData = await res.json();
               if (errorData.error) errorMsg = errorData.error;
             } catch (e) {
               if (res.status === 413) {
                 errorMsg = 'El archivo es demasiado grande (máx 4.5MB).';
               }
             }
             alert(`Error al subir ${file.name}: ${errorMsg}`);
          } else {
             const newFileObj = {
               name: file.name,
               isLocal: true,
               file: file,
               url: URL.createObjectURL(file)
             };
             setUploadedFiles(prev => ({
               ...prev,
               [actividadId]: [...(prev[actividadId] || []), newFileObj]
             }));
          }
        } catch (error: any) {
          console.error("Error de red:", error);
          alert(`Error de red al subir ${file.name}`);
        } finally {
          setUploading(prev => ({ ...prev, [`${actividadId}-${file.name}`]: false }));
        }
      }
    }
  };

  const handleRemoveFile = (actividadId: string, index: number) => {
    setUploadedFiles(prev => {
      const updatedFiles = [...(prev[actividadId] || [])];
      updatedFiles.splice(index, 1);
      return {
        ...prev,
        [actividadId]: updatedFiles
      };
    });
  };

  const toggleWeek = (weekId: string) => {
    setOpenWeeks(prev => ({ ...prev, [weekId]: !prev[weekId] }));
  };

  const unidades = [
    {
      id: "u1",
      tabTitle: "UNIDAD I",
      numero: "01",
      titulo: "UNIDAD 01",
      concepto: "ARQUITECTURAS DE BASES DE DATOS Y CONFIGURACIÓN DEL ENTORNO CORPORATIVO.",
      actividades: [
        { id: "u1_s1", nombre: "Semana 1 — Formulación del Proyecto y Selección de la Arquitectura" },
        { id: "u1_s2", nombre: "Semana 2 — Diseño conceptual" },
        { id: "u1_s3", nombre: "Semana 3 — Normalización" },
        { id: "u1_s4", nombre: "Semana 4 — Despliegue inicial" }
      ]
    },
    {
      id: "u2",
      tabTitle: "UNIDAD II",
      numero: "02",
      titulo: "UNIDAD 02",
      concepto: "DESPLIEGUE Y CONFIGURACIÓN DE MOTORES DE DATOS",
      actividades: [
        { id: "u2_s5", nombre: "Semana 5 — Instalación DBMS" },
        { id: "u2_s6", nombre: "Semana 6 — Configuración" },
        { id: "u2_s7", nombre: "Semana 7 — Permisos" },
        { id: "u2_s8", nombre: "Semana 8 — Evaluaciones parciales" }
      ]
    },
    {
      id: "u3",
      tabTitle: "UNIDAD III",
      numero: "03",
      titulo: "UNIDAD 03",
      concepto: "SEGURIDAD CORPORATIVA, CONECTIVIDAD DE RED Y ALTA DISPONIBILIDAD",
      actividades: [
        { id: "u3_s9", nombre: "Semana 9 — Encriptación" },
        { id: "u3_s10", nombre: "Semana 10 — Backups" },
        { id: "u3_s11", nombre: "Semana 11 — Restauración" },
        { id: "u3_s12", nombre: "Semana 12 — Clusters" }
      ]
    },
    {
      id: "u4",
      tabTitle: "UNIDAD IV",
      numero: "04",
      titulo: "UNIDAD 04",
      concepto: "MONITOREO DE SERVIDORES, OPTIMIZACIÓN DEL DESEMPEÑO Y RECUPERACIÓN",
      actividades: [
        { id: "u4_s13", nombre: "Semana 13 — Monitoreo" },
        { id: "u4_s14", nombre: "Semana 14 — Profiling" },
        { id: "u4_s15", nombre: "Semana 15 — Optimización" },
        { id: "u4_s16", nombre: "Semana 16 — Entrega Final" }
      ]
    }
  ];

  const activeData = unidades.find(u => u.id === activeTab) || unidades[0];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 animate-in fade-in zoom-in-95 duration-500">
      
      {/* HEADER BANNER */}
      <div className="text-center mb-6">
        <p className="text-cyan-400 font-bold tracking-[0.2em] text-xs uppercase flex items-center justify-center gap-2 mb-2">
          <span className="text-[10px]">✦</span> BASE DE DATOS II
        </p>
        <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-bodoni)] font-medium text-white mb-6 tracking-wide drop-shadow-md">
          UNIDADES DEL CURSO
        </h2>
      </div>

      {/* Tabs / Botones de Unidad */}
      <div className="relative mb-8 flex items-center">
        {/* Botón de desplazamiento Izquierdo (Círculo Transparente) */}
        <button 
          onClick={handlePrevTab}
          disabled={unidades.findIndex(u => u.id === activeTab) === 0}
          className="absolute left-0 z-10 w-10 h-10 rounded-full border border-cyan-500/50 bg-transparent flex items-center justify-center text-cyan-400 hover:bg-cyan-500/10 hover:text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div 
          className="flex w-full overflow-hidden px-12 py-4 justify-center gap-4"
        >
          
          {unidades.map((u) => (
          <button
            key={u.id}
            onClick={() => setActiveTab(u.id)}
            className={`px-6 py-3 text-xs md:text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300 whitespace-nowrap min-w-[140px] rounded-full border ${
              activeTab === u.id
                ? "text-cyan-400 border-cyan-400 bg-cyan-500/10 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                : "text-slate-300 border-slate-600/50 bg-transparent hover:text-white hover:border-cyan-500/50"
            }`}
          >
            {u.tabTitle}
          </button>
        ))}
        </div>

        {/* Botón de desplazamiento Derecho (Círculo Transparente) */}
        <button 
          onClick={handleNextTab}
          disabled={unidades.findIndex(u => u.id === activeTab) === unidades.length - 1}
          className="absolute right-0 z-10 w-10 h-10 rounded-full border border-cyan-500/50 bg-transparent flex items-center justify-center text-cyan-400 hover:bg-cyan-500/10 hover:text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Main Unit Card (Premium Dashboard Style) - Clickable to open weeks */}
      <div 
        onClick={() => setIsUnitOpen(!isUnitOpen)}
        className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0f172a]/95 to-[#0B1120]/95 border border-cyan-500/20 shadow-[0_0_50px_rgba(34,211,238,0.1)] p-8 md:p-12 mb-12 backdrop-blur-md group animate-in slide-in-from-bottom-4 duration-700 cursor-pointer hover:border-cyan-400/50 transition-all"
      >
        {/* Glow de fondo dinámico */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] group-hover:bg-cyan-400/20 transition-all duration-700"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] group-hover:bg-blue-500/20 transition-all duration-700"></div>
        
        {/* Marca de agua gigante */}
        <div className="absolute -bottom-8 -right-4 text-[12rem] font-black text-white/[0.03] select-none pointer-events-none leading-none font-sans tracking-tighter">
          {activeData.numero}
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
          {/* Anillo circular animado */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 p-[2px] flex-shrink-0 shadow-[0_0_30px_rgba(34,211,238,0.3)] group-hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] transition-shadow duration-500">
            <div className="w-full h-full bg-[#0B1120] rounded-full flex items-center justify-center">
              <span className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                U{activeData.numero}
              </span>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 mb-4 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="text-cyan-300 text-xs font-bold tracking-[0.2em] uppercase">{activeData.tabTitle}</span>
            </div>
            <h3 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight drop-shadow-md">
              {activeData.titulo}
            </h3>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-3xl font-light">
              {activeData.concepto}
            </p>
          </div>
          </div>
          
          {/* Chevron Indicador */}
          <div className="hidden md:flex ml-auto w-12 h-12 rounded-full bg-cyan-900/30 items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 group-hover:text-white transition-all">
            {isUnitOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </div>
        </div>
      </div>

      {/* Grid de Semanas (Dashboard Cards) */}
      {isUnitOpen && (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in slide-in-from-bottom-8 duration-700 delay-150">
        {activeData.actividades.map((act, index) => {
          const filesForAct = uploadedFiles[act.id] || [];
          const parts = act.nombre.split(' — ');
          const weekLabel = parts[0];
          const weekDesc = parts[1] || "";

          return (
            <div key={act.id} className="group relative bg-[#0f172a]/60 backdrop-blur-xl rounded-[2rem] border border-cyan-900/40 hover:border-cyan-400/50 transition-all duration-500 overflow-hidden shadow-xl hover:shadow-[0_10px_40px_rgba(34,211,238,0.15)] flex flex-col">
              {/* Línea de brillo superior */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-400/80 transition-all duration-700"></div>
              
              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-6 gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#0B1120] border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-black text-lg sm:text-xl group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-cyan-400 group-hover:text-white group-hover:border-transparent transition-all duration-500 flex-shrink-0 shadow-inner">
                      S{index + 1}
                    </div>
                    <div className="pt-1">
                      <h4 className="text-white font-bold text-lg sm:text-xl tracking-wide group-hover:text-cyan-300 transition-colors mb-1">
                        {weekLabel}
                      </h4>
                      <p className="text-slate-400 text-xs sm:text-sm leading-snug">
                        {weekDesc}
                      </p>
                    </div>
                  </div>
                  
                  {isAdmin && (
                    <label className="cursor-pointer flex-shrink-0 inline-flex items-center justify-center w-10 h-10 bg-cyan-950/50 hover:bg-cyan-500 hover:text-white text-cyan-400 rounded-xl transition-all border border-cyan-500/30 hover:border-transparent group/btn">
                      <Upload className="w-5 h-5 group-hover/btn:-translate-y-1 transition-transform" />
                      <input 
                        type="file" 
                        className="hidden" 
                        multiple
                        onChange={(e) => handleFileUpload(act.id, e)}
                        accept=".pdf,.doc,.docx,.zip,.png,.jpg"
                      />
                    </label>
                  )}
                </div>

                {/* Área de Archivos */}
                <div className="mt-auto bg-[#0B1120]/80 rounded-2xl p-4 sm:p-5 border border-white/5 shadow-inner min-h-[100px] flex flex-col justify-center">
                  {filesForAct.length > 0 ? (
                    <div className="flex flex-col gap-3">
                      {filesForAct.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/5 transition-colors">
                          <div className="flex items-center gap-3 overflow-hidden pr-2">
                            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                              <FileText className="w-4 h-4 text-cyan-400" />
                            </div>
                            <span className="text-sm text-slate-200 truncate font-medium">{file.name}</span>
                            {uploading[`${act.id}-${file.name}`] && (
                              <span className="text-xs text-cyan-400 animate-pulse ml-2 whitespace-nowrap">Subiendo...</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <a 
                              href={file.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="w-8 h-8 flex items-center justify-center bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 rounded-lg transition-colors"
                              title="Ver archivo"
                            >
                              <Eye className="w-4 h-4" />
                            </a>
                            {isAdmin && (
                              <button 
                                onClick={() => handleRemoveFile(act.id, idx)}
                                className="w-8 h-8 flex items-center justify-center bg-red-500/10 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                                title="Eliminar"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center py-4 opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                      <FileText className="w-8 h-8 text-slate-500 mb-2" />
                      <span className="text-xs font-medium text-slate-400">Sin archivos adjuntos</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      )}

    </div>
  );
}
