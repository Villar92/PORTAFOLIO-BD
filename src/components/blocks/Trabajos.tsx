"use client";

import React, { useState, useEffect } from "react";
import { Server, Database, ShieldCheck, Gauge, Upload, FileText, CheckCircle2, Eye, X, ChevronDown, ChevronUp } from "lucide-react";

export function Trabajos({ isAdmin = false }: { isAdmin?: boolean }) {
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, any[]>>({});
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  
  // Tab control
  const [activeTab, setActiveTab] = useState<string>("u1");
  // Accordion control for weeks inside the active unit
  const [openWeeks, setOpenWeeks] = useState<Record<string, boolean>>({});

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
    <div className="max-w-5xl mx-auto py-12 px-4 animate-in fade-in zoom-in-95 duration-500">
      
      {/* HEADER BANNER */}
      <div className="text-center mb-10">
        <span className="text-cyan-400 font-bold tracking-[0.2em] text-xs uppercase flex items-center justify-center gap-2 mb-4">
          <span className="text-[10px]">✦</span> BASE DE DATOS II
        </span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] tracking-wide">
          UNIDADES DEL CURSO
        </h2>
      </div>

      {/* Tabs / Botones de Unidad */}
      <div className="flex w-full border-b border-slate-600/30 mb-10 overflow-x-auto scrollbar-hide">
        {unidades.map((u) => (
          <button
            key={u.id}
            onClick={() => setActiveTab(u.id)}
            className={`flex-1 py-4 text-xs md:text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300 whitespace-nowrap min-w-[120px] relative ${
              activeTab === u.id
                ? "text-cyan-400"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {u.tabTitle}
            {/* Línea indicadora activa */}
            {activeTab === u.id && (
              <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
            )}
          </button>
        ))}
      </div>

      {/* Main Unit Card */}
      <div className="bg-[#0f172a] rounded-xl border-l-4 border-l-cyan-400 shadow-2xl p-8 mb-8 animate-in slide-in-from-right-4 duration-500">
        <div className="flex items-start gap-6">
          <span className="text-6xl md:text-8xl font-serif font-bold text-slate-700/50 leading-none select-none">
            {activeData.numero}
          </span>
          <div className="pt-2">
            <span className="text-cyan-400 font-bold tracking-[0.2em] text-[10px] uppercase flex items-center gap-2 mb-2">
              <span className="text-[8px]">✦</span> {activeData.tabTitle}
            </span>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
              {activeData.titulo}
            </h3>
            <p className="text-cyan-400/80 text-xs md:text-sm tracking-widest uppercase font-semibold leading-relaxed max-w-2xl">
              {activeData.concepto}
            </p>
          </div>
        </div>
      </div>

      {/* Weeks Accordion */}
      <div className="space-y-4">
        {activeData.actividades.map((act, index) => {
          const isOpen = openWeeks[act.id];
          const filesForAct = uploadedFiles[act.id] || [];

          return (
            <div key={act.id} className="bg-[#0f172a] rounded-xl overflow-hidden border border-[#1e293b] transition-all">
              {/* Accordion Header */}
              <button 
                onClick={() => toggleWeek(act.id)}
                className="w-full flex items-center justify-between p-5 hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xs font-bold">
                    S{index + 1}
                  </div>
                  <span className="text-white font-semibold text-sm text-left">
                    {act.nombre}
                  </span>
                </div>
                {isOpen ? <ChevronUp className="w-5 h-5 text-cyan-400" /> : <ChevronDown className="w-5 h-5 text-cyan-400" />}
              </button>

              {/* Accordion Content */}
              {isOpen && (
                <div className="p-5 pt-0 bg-slate-900/30 border-t border-[#1e293b]">
                  <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <p className="text-sm text-slate-400">Archivos adjuntos para esta semana.</p>
                    {isAdmin && (
                      <label className="cursor-pointer inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-[#0B1120] px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                        <Upload className="w-4 h-4" />
                        SUBIR ARCHIVO
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

                  {filesForAct.length > 0 ? (
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {filesForAct.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-[#0B1120] p-3 rounded-lg border border-white/5">
                          <div className="flex items-center gap-3 truncate pr-2">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                            <span className="text-xs text-slate-300 truncate">{file.name}</span>
                            {uploading[`${act.id}-${file.name}`] && (
                              <span className="text-[10px] text-cyan-400 animate-pulse ml-2">Subiendo...</span>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <a 
                              href={file.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="p-1.5 hover:bg-cyan-500/20 text-cyan-400 rounded-md transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </a>
                            {isAdmin && (
                              <button 
                                onClick={() => handleRemoveFile(act.id, idx)}
                                className="p-1.5 hover:bg-red-500/20 text-red-400 rounded-md transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-4 p-4 border border-dashed border-[#1e293b] rounded-lg text-center text-xs text-slate-500">
                      No hay archivos subidos todavía.
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
