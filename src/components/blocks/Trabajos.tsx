"use client";

import React, { useState, useEffect } from "react";
import { Server, Database, ShieldCheck, Gauge, Upload, FileText, CheckCircle2, Eye, X } from "lucide-react";

export function Trabajos() {
  // Store an array of files for each activity/week
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, any[]>>({});
  // State to track uploading status for files
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  // State for full-screen modal
  const [selectedUnidad, setSelectedUnidad] = useState<string | null>(null);

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
             const errorData = await res.json();
             console.error("Error al subir a GitHub:", errorData);
             alert(`Error al subir ${file.name}: ${errorData.error || 'Verifica tu Token en Vercel y que el archivo no sea mayor a 4MB'}`);
          } else {
             // Success, add it to the view
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
        } catch (error) {
          console.error("Error de red:", error);
          alert(`Error de conexión al subir ${file.name}`);
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

  const unidadesBento = [
    {
      id: "u1",
      titulo: "UNIDAD I: Introducción a la administración de base de datos",
      etiqueta: "Fase 01 | Introducción",
      concepto: "",
      icon: <Server className="w-8 h-8 text-blue-400" />,
      tags: [],
      color: "from-blue-600/20 to-blue-900/40",
      borderColor: "border-blue-500/30",
      actividades: [
        { id: "u1_s1", nombre: "Unidad-1" },
        { id: "u1_s2", nombre: "Unidad-2" },
        { id: "u1_s3", nombre: "Unidad-3" },
        { id: "u1_s4", nombre: "Unidad-4" }
      ]
    },
    {
      id: "u2",
      titulo: "UNIDAD II: Despliegue y Configuración de Motores de Datos",
      etiqueta: "Fase 02 | Gestión",
      concepto: "",
      icon: <Database className="w-8 h-8 text-emerald-400" />,
      tags: [],
      color: "from-emerald-600/20 to-emerald-900/40",
      borderColor: "border-emerald-500/30",
      actividades: [
        { id: "u2_s5", nombre: "Unidad-5" },
        { id: "u2_s6", nombre: "Unidad-6" },
        { id: "u2_s7", nombre: "Unidad-7" },
        { id: "u2_s8", nombre: "Unidad-8" }
      ]
    },
    {
      id: "u3",
      titulo: "UNIDAD III (Seguridad Corporativa, Conectividad de Red y Alta Disponibilidad de Datos)",
      etiqueta: "Fase 03 | Continuidad",
      concepto: "",
      icon: <ShieldCheck className="w-8 h-8 text-purple-400" />,
      tags: [],
      color: "from-purple-600/20 to-purple-900/40",
      borderColor: "border-purple-500/30",
      actividades: [
        { id: "u3_s9", nombre: "Unidad-9" },
        { id: "u3_s10", nombre: "Unidad-10" },
        { id: "u3_s11", nombre: "Unidad-11" },
        { id: "u3_s12", nombre: "Unidad-12" }
      ]
    },
    {
      id: "u4",
      titulo: "UNIDAD IV (Monitoreo de Servidores, Optimización del Desempeño y Recuperación)",
      etiqueta: "Fase 04 | Optimización",
      concepto: "",
      icon: <Gauge className="w-8 h-8 text-amber-400" />,
      tags: [],
      color: "from-amber-600/20 to-amber-900/40",
      borderColor: "border-amber-500/30",
      actividades: [
        { id: "u4_s13", nombre: "Unidad-13" },
        { id: "u4_s14", nombre: "Unidad-14" },
        { id: "u4_s15", nombre: "Unidad-15" },
        { id: "u4_s16", nombre: "Unidad-16" }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 animate-in fade-in zoom-in-95 duration-500">
      
      {/* HEADER BANNER */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
          TRABAJOS POR UNIDADES <span className="text-blue-500">—</span> BASE DE DATOS II
        </h2>
        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"></div>
          <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed">
            Identificación de arquitecturas y gestión avanzada en motores DBMS para el almacenamiento, organización e integración masiva de datos.
          </p>
        </div>
      </div>

      {/* BENTO GRID 2x2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {unidadesBento.map((unidad, index) => (
          <div 
            key={unidad.id} 
            className={`flex flex-col bg-slate-900/70 backdrop-blur-xl border ${unidad.borderColor} rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group`}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${unidad.color} opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
            
            <div className="relative z-10 flex-1">
              <div className="flex justify-between items-start mb-6">
                <span className="px-4 py-1.5 bg-slate-950/50 border border-white/10 rounded-full text-xs font-bold text-white tracking-widest uppercase">
                  {unidad.etiqueta}
                </span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setSelectedUnidad(unidad.id)}
                    className="p-3 bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 hover:text-white rounded-2xl border border-blue-500/30 shadow-lg transition-colors group/expand"
                    title="Ver unidad en pantalla completa"
                  >
                    <Eye className="w-6 h-6 group-hover/expand:scale-110 transition-transform" />
                  </button>
                  <div className="p-3 bg-slate-950/50 rounded-2xl border border-white/10 shadow-lg">
                    {unidad.icon}
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 leading-tight">{unidad.titulo}</h3>
              {unidad.concepto && (
                <p className="text-slate-300 text-sm md:text-base mb-6 leading-relaxed">
                  {unidad.concepto}
                </p>
              )}
              
              {unidad.tags && unidad.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {unidad.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Upload Section (Integrated) */}
            <div className="relative z-10 mt-auto pt-6 border-t border-white/10 flex flex-col flex-1 min-h-[200px]">
              <h4 className="text-sm font-bold text-white mb-3">Semana-{index + 1}</h4>
              <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1 max-h-[320px]">
                {unidad.actividades.map((act) => {
                  const filesForAct = uploadedFiles[act.id] || [];
                  return (
                    <div key={act.id} className="flex flex-col gap-3 bg-slate-950/40 p-4 rounded-xl border border-white/5">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-slate-400 flex-shrink-0" />
                          <span className="text-base text-white font-bold leading-tight">{act.nombre}</span>
                        </div>
                        
                        <label className="cursor-pointer flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap w-full lg:w-auto">
                          <Upload className="w-4 h-4" />
                          ☁️ Subir a GitHub
                          <input 
                            type="file" 
                            className="hidden" 
                            multiple
                            onChange={(e) => handleFileUpload(act.id, e)}
                            accept=".pdf,.doc,.docx,.zip,.png,.jpg"
                          />
                        </label>
                      </div>

                      {/* Mostrar Archivos Subidos */}
                      {filesForAct.length > 0 && (
                        <div className="flex flex-col gap-2 mt-2 pt-3 border-t border-white/5">
                          <p className="text-xs text-slate-400 font-medium">Archivos subidos:</p>
                          <div className="flex flex-col gap-2">
                            {filesForAct.map((file, idx) => {
                              // Generar una URL temporal para visualizar el archivo local en otra pestaña
                              const fileUrl = file.url;
                              return (
                                <div key={idx} className="flex items-center justify-between bg-slate-900/60 p-2 rounded-md border border-white/10 group/file">
                                  <div className="flex items-center gap-2 truncate pr-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                    <span className="text-xs text-slate-300 truncate">{file.name}</span>
                                    {uploading[`${act.id}-${file.name}`] && (
                                      <span className="text-[10px] text-blue-400 animate-pulse ml-2">Subiendo...</span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-1 opacity-100 lg:opacity-0 lg:group-hover/file:opacity-100 transition-opacity">
                                    <a 
                                      href={fileUrl} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="p-1.5 hover:bg-blue-500/20 text-blue-400 rounded-md transition-colors"
                                      title="Ver archivo"
                                    >
                                      <Eye className="w-4 h-4" />
                                    </a>
                                    <button 
                                      onClick={() => handleRemoveFile(act.id, idx)}
                                      className="p-1.5 hover:bg-red-500/20 text-red-400 rounded-md transition-colors"
                                      title="Quitar archivo"
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FULL SCREEN MODAL */}
      {selectedUnidad && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-white/20 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative animate-in zoom-in-95 duration-300">
            {(() => {
              const u = unidadesBento.find(x => x.id === selectedUnidad);
              if (!u) return null;
              return (
                <>
                  <div className={`p-6 border-b border-white/10 bg-gradient-to-r ${u.color} flex justify-between items-center sticky top-0 z-10`}>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-slate-950/50 rounded-2xl shadow-lg border border-white/10">
                        {u.icon}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white/70 tracking-widest uppercase mb-1 block">
                          {u.etiqueta}
                        </span>
                        <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">
                          {u.titulo}
                        </h2>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedUnidad(null)}
                      className="p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
                      title="Cerrar"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1">
                    {u.concepto && (
                      <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                        {u.concepto}
                      </p>
                    )}
                    
                    <h4 className="text-lg font-bold text-white mb-4">Semanas de la Unidad</h4>
                    <div className="space-y-4">
                      {u.actividades.map((act, index) => {
                        const filesForAct = uploadedFiles[act.id] || [];
                        return (
                          <div key={act.id} className="bg-slate-950/50 p-5 rounded-2xl border border-white/10 shadow-sm">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold border border-blue-500/30">
                                  {index + 1}
                                </div>
                                <span className="text-lg text-white font-bold">{act.nombre}</span>
                              </div>
                              
                              <label className="cursor-pointer inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-blue-500/25">
                                <Upload className="w-5 h-5" />
                                ☁️ Subir a GitHub
                                <input 
                                  type="file" 
                                  className="hidden" 
                                  multiple
                                  onChange={(e) => handleFileUpload(act.id, e)}
                                  accept=".pdf,.doc,.docx,.zip,.png,.jpg"
                                />
                              </label>
                            </div>

                            {/* Mostrar Archivos Subidos en el Modal */}
                            {filesForAct.length > 0 && (
                              <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {filesForAct.map((file, idx) => {
                                  const fileUrl = file.url;
                                  return (
                                    <div key={idx} className="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-white/5 group/file">
                                      <div className="flex items-center gap-3 truncate pr-2">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                        <span className="text-sm text-slate-300 truncate" title={file.name}>{file.name}</span>
                                        {uploading[`${act.id}-${file.name}`] && (
                                          <span className="text-[10px] text-blue-400 animate-pulse ml-2">Subiendo...</span>
                                        )}
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <a 
                                          href={fileUrl} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="p-2 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors"
                                          title="Ver archivo"
                                        >
                                          <Eye className="w-4 h-4" />
                                        </a>
                                        <button 
                                          onClick={() => handleRemoveFile(act.id, idx)}
                                          className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                                          title="Quitar archivo"
                                        >
                                          <X className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
