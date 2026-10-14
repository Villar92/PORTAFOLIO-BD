"use client";

import React, { useState, useEffect, useRef } from "react";
import { Server, Database, ShieldCheck, Gauge, Upload, FileText, CheckCircle2, Eye, X, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Download, Code, FileCode, Copy, Check, Globe } from "lucide-react";

export function Trabajos({ isAdmin = false }: { isAdmin?: boolean }) {
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, any[]>>({});
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  
  // Selected unit for the modal
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);
  
  // Preview file modal
  const [previewFile, setPreviewFile] = useState<{url: string, name: string} | null>(null);
  const [codeContent, setCodeContent] = useState<string | null>(null);
  const [loadingCode, setLoadingCode] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [htmlViewMode, setHtmlViewMode] = useState<'render' | 'code'>('render');

  useEffect(() => {
    if (!previewFile) {
      setCodeContent(null);
      setCopiedCode(false);
      setHtmlViewMode('render');
      return;
    }
    const ext = previewFile.name.split('.').pop()?.toLowerCase() || '';
    const textExts = ['sql', 'html', 'htm', 'txt', 'json', 'js', 'ts', 'css', 'py', 'java', 'cs', 'cpp', 'c', 'php', 'xml', 'md'];

    if (textExts.includes(ext)) {
      setLoadingCode(true);
      const localFile = (previewFile as any).file;
      if (localFile && typeof localFile.text === 'function') {
        localFile.text().then((text: string) => {
          setCodeContent(text);
          setLoadingCode(false);
        }).catch(() => {
          setCodeContent("No se pudo leer el archivo local.");
          setLoadingCode(false);
        });
      } else {
        fetch(previewFile.url)
          .then(res => res.text())
          .then(text => {
            setCodeContent(text);
            setLoadingCode(false);
          })
          .catch(() => {
            setCodeContent("No se pudo cargar el contenido del archivo.");
            setLoadingCode(false);
          });
      }
    }
  }, [previewFile]);

  const handleCopyCode = () => {
    if (codeContent) {
      navigator.clipboard.writeText(codeContent);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const getFileBadge = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase() || '';
    if (ext === 'sql') {
      return {
        icon: <Database className="w-4 h-4 text-cyan-300" />,
        bg: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40',
        label: 'SQL'
      };
    }
    if (ext === 'html' || ext === 'htm') {
      return {
        icon: <Code className="w-4 h-4 text-amber-400" />,
        bg: 'bg-amber-500/20 text-amber-300 border border-amber-500/40',
        label: 'HTML'
      };
    }
    if (['js', 'ts', 'json', 'css', 'py', 'java', 'cs', 'cpp', 'c', 'php', 'xml', 'md'].includes(ext)) {
      return {
        icon: <FileCode className="w-4 h-4 text-purple-400" />,
        bg: 'bg-purple-500/20 text-purple-300 border border-purple-500/40',
        label: ext.toUpperCase()
      };
    }
    if (ext === 'pdf') {
      return {
        icon: <FileText className="w-4 h-4 text-red-400" />,
        bg: 'bg-red-500/20 text-red-300 border border-red-500/40',
        label: 'PDF'
      };
    }
    if (['doc', 'docx'].includes(ext)) {
      return {
        icon: <FileText className="w-4 h-4 text-blue-400" />,
        bg: 'bg-blue-500/20 text-blue-300 border border-blue-500/40',
        label: 'DOC'
      };
    }
    if (['zip', 'rar', '7z'].includes(ext)) {
      return {
        icon: <FileText className="w-4 h-4 text-emerald-400" />,
        bg: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40',
        label: 'ZIP'
      };
    }
    return {
      icon: <FileText className="w-4 h-4 text-cyan-400" />,
      bg: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
      label: ext.toUpperCase() || 'FILE'
    };
  };

  // Close modal on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPreviewFile(prev => {
          if (prev) return null;
          setSelectedUnitId(null);
          return null;
        });
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

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

  const handleRemoveFile = async (actividadId: string, index: number) => {
    const fileToDelete = uploadedFiles[actividadId]?.[index];
    if (!fileToDelete) return;

    // If it's a file from GitHub, we need to delete it from there
    if (!fileToDelete.isLocal && fileToDelete.path && fileToDelete.sha) {
      if (!confirm(`¿Estás seguro de que quieres eliminar ${fileToDelete.name}?`)) return;
      
      try {
        const res = await fetch('/api/files', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            path: fileToDelete.path,
            sha: fileToDelete.sha
          })
        });

        if (!res.ok) {
          const errorData = await res.json();
          alert(`Error eliminando el archivo: ${errorData.error || 'Error desconocido'}`);
          return;
        }
      } catch (err) {
        console.error("Error al eliminar", err);
        alert('Error de red al eliminar el archivo.');
        return;
      }
    }

    setUploadedFiles(prev => {
      const updatedFiles = [...(prev[actividadId] || [])];
      updatedFiles.splice(index, 1);
      return {
        ...prev,
        [actividadId]: updatedFiles
      };
    });
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
        { id: "u1_s2", nombre: "Semana 2 — Despliegue y Configuración de Monitoreo de Datos (DBMS)" },
        { id: "u1_s3", nombre: "Semana 3 — Modelamiento Físico y Mecanismos de Integración" },
        { id: "u1_s4", nombre: "Semana 4 — Sustentación y Validación de la Infraestructura de Datos" }
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

  const selectedUnitData = unidades.find(u => u.id === selectedUnitId);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 animate-in fade-in zoom-in-95 duration-500 relative">
      
      {/* HEADER BANNER ANIMADO */}
      <div className="text-center mb-14 relative">
        <div className="absolute inset-0 bg-cyan-500/10 blur-[100px] rounded-full animate-pulse"></div>
        <p className="text-cyan-400 font-bold tracking-[0.3em] text-xs uppercase flex items-center justify-center gap-3 mb-4 animate-in slide-in-from-top-4 fade-in duration-700 delay-150">
          <span className="text-[10px] animate-spin-slow">✦</span> 
          BASE DE DATOS II 
          <span className="text-[10px] animate-spin-slow">✦</span>
        </p>
        <h2 className="relative text-4xl md:text-6xl font-[family-name:var(--font-bodoni)] font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-white mb-2 tracking-widest drop-shadow-[0_0_25px_rgba(34,211,238,0.4)] animate-in slide-in-from-bottom-8 fade-in zoom-in-95 duration-1000 hover:scale-105 transition-transform cursor-default">
          UNIDADES DEL CURSO
        </h2>
        <div className="w-24 h-1 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full animate-in fade-in zoom-in duration-1000 delay-300"></div>
      </div>

      {/* Grid de Unidades */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {unidades.map((unidad, index) => (
          <div 
            key={unidad.id}
            onClick={() => setSelectedUnitId(unidad.id)}
            className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0f172a]/95 to-[#0B1120]/95 border border-cyan-500/20 shadow-[0_0_30px_rgba(34,211,238,0.05)] p-6 sm:p-10 backdrop-blur-md group cursor-pointer hover:border-cyan-400/50 hover:shadow-[0_0_50px_rgba(34,211,238,0.15)] transition-all duration-500 animate-in slide-in-from-bottom-4"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Glow de fondo dinámico */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] group-hover:bg-cyan-400/20 transition-all duration-700"></div>
            
            {/* Marca de agua gigante */}
            <div className="absolute -bottom-4 -right-4 text-[8rem] font-black text-white/[0.03] select-none pointer-events-none leading-none font-sans tracking-tighter">
              {unidad.numero}
            </div>

            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex items-center gap-6">
                {/* Anillo circular animado */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 p-[2px] flex-shrink-0 shadow-[0_0_20px_rgba(34,211,238,0.2)] group-hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-shadow duration-500">
                  <div className="w-full h-full bg-[#0B1120] rounded-full flex items-center justify-center">
                    <span className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      U{unidad.numero}
                    </span>
                  </div>
                </div>
                
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 mb-2 shadow-inner">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                    <span className="text-cyan-300 text-[10px] font-bold tracking-[0.2em] uppercase">{unidad.tabTitle}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md">
                    {unidad.titulo}
                  </h3>
                </div>
              </div>
              
              <div className="flex-1">
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                  {unidad.concepto}
                </p>
              </div>

              <div className="mt-2 flex items-center text-cyan-400 text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                <span>Ver Semanas ({unidad.actividades.length})</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Flotante de Semanas */}
      {selectedUnitData && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#020617]/85 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setSelectedUnitId(null)}
        >
          <div 
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#0f172a] to-[#0B1120] rounded-[2.5rem] border border-cyan-500/30 shadow-[0_0_80px_rgba(34,211,238,0.2)] p-6 sm:p-10 hide-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón Cerrar */}
            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedUnitId(null); }}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-cyan-900/30 border border-cyan-500/20 flex items-center justify-center text-cyan-400 hover:bg-cyan-500 hover:text-white hover:border-transparent transition-all z-10 shadow-lg"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="mb-10 pr-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 mb-4">
                <span className="text-cyan-300 text-xs font-bold tracking-[0.2em] uppercase">{selectedUnitData.tabTitle}</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-md">
                Semanas de la {selectedUnitData.titulo}
              </h3>
              <p className="text-cyan-300/80 text-base md:text-lg font-light max-w-3xl">
                {selectedUnitData.concepto}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {selectedUnitData.actividades.map((act, index) => {
                const filesForAct = uploadedFiles[act.id] || [];
                const parts = act.nombre.split(' — ');
                const weekLabel = parts[0];
                const weekDesc = parts[1] || "";

                return (
                  <div key={act.id} className="group relative bg-[#0f172a]/80 backdrop-blur-xl rounded-[2rem] border border-cyan-900/50 hover:border-cyan-400/60 transition-all duration-500 overflow-hidden shadow-xl hover:shadow-[0_10px_40px_rgba(34,211,238,0.2)] flex flex-col">
                    {/* Línea de brillo superior */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-400/80 transition-all duration-700"></div>
                    
                    <div className="p-6 sm:p-8 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-6 gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#0B1120] border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-black text-lg sm:text-xl group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-cyan-400 group-hover:text-white group-hover:border-transparent transition-all duration-500 flex-shrink-0 shadow-inner">
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
                              accept=".html,.htm,.sql,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.json,.js,.ts,.css,.py,.java,.cs,.cpp,.c,.php,.xml,.md,.zip,.rar,.7z,.png,.jpg,.jpeg,.webp"
                            />
                          </label>
                        )}
                      </div>

                      {/* Área de Archivos */}
                      <div className="mt-auto bg-[#0B1120]/80 rounded-2xl p-4 sm:p-5 border border-white/5 shadow-inner min-h-[100px] flex flex-col justify-center">
                        {filesForAct.length > 0 ? (
                          <div className="flex flex-col gap-3">
                            {filesForAct.map((file, idx) => {
                              const badge = getFileBadge(file.name);
                              return (
                                <div key={idx} className="flex items-center justify-between bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/5 transition-colors">
                                  <div className="flex items-center gap-3 overflow-hidden pr-2">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${badge.bg}`}>
                                      {badge.icon}
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                      <span className="text-sm text-slate-200 truncate font-medium">{file.name}</span>
                                      <span className="text-[10px] text-cyan-400/80 font-bold tracking-wider">{badge.label}</span>
                                    </div>
                                    {uploading[`${act.id}-${file.name}`] && (
                                      <span className="text-xs text-cyan-400 animate-pulse ml-2 whitespace-nowrap">Subiendo...</span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2 flex-shrink-0">
                                    <button 
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setPreviewFile(file);
                                      }}
                                      className="w-8 h-8 flex items-center justify-center bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 rounded-lg transition-colors"
                                      title="Ver archivo"
                                    >
                                      <Eye className="w-4 h-4" />
                                    </button>
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
                              );
                            })}
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
          </div>
        </div>
      )}

      {/* Modal de previsualización de archivo */}
      {previewFile && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
            onClick={() => setPreviewFile(null)}
          ></div>
          <div className="relative w-full max-w-5xl h-[85vh] bg-[#0f172a] rounded-2xl shadow-2xl flex flex-col border border-cyan-500/20 animate-in fade-in zoom-in-95 duration-300 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#0f172a]">
              <div className="flex items-center gap-3 overflow-hidden pr-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${getFileBadge(previewFile.name).bg}`}>
                  {getFileBadge(previewFile.name).icon}
                </div>
                <div className="flex items-center gap-2 min-w-0">
                  <h3 className="text-white font-medium truncate">{previewFile.name}</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-500/30 flex-shrink-0">
                    {getFileBadge(previewFile.name).label}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {/* HTML Toggle View */}
                {(previewFile.name.endsWith('.html') || previewFile.name.endsWith('.htm')) && (
                  <div className="flex items-center bg-[#0B1120] rounded-lg p-0.5 border border-cyan-500/30 mr-1 sm:mr-2">
                    <button
                      onClick={() => setHtmlViewMode('render')}
                      className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded text-xs font-semibold transition-all ${
                        htmlViewMode === 'render' ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Vista</span> Web
                    </button>
                    <button
                      onClick={() => setHtmlViewMode('code')}
                      className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded text-xs font-semibold transition-all ${
                        htmlViewMode === 'code' ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Code className="w-3.5 h-3.5" />
                      Código
                    </button>
                  </div>
                )}

                {/* Copy button for code/sql files */}
                {codeContent !== null && (
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded-lg transition-colors text-xs font-medium border border-cyan-500/30"
                    title="Copiar código"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-green-400 hidden sm:inline">¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Copiar</span>
                      </>
                    )}
                  </button>
                )}

                <a 
                  href={previewFile.url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 rounded-lg transition-colors text-xs sm:text-sm font-medium"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Descargar</span>
                </a>
                <button 
                  onClick={() => setPreviewFile(null)}
                  className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 w-full relative rounded-b-2xl overflow-hidden flex items-center justify-center">
              {(() => {
                const ext = previewFile.name.split('.').pop()?.toLowerCase() || '';
                const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'];
                const codeExts = ['sql', 'html', 'htm', 'txt', 'json', 'js', 'ts', 'css', 'py', 'java', 'cs', 'cpp', 'c', 'php', 'xml', 'md'];
                const docExts = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'rtf', 'csv'];

                if (imageExts.includes(ext)) {
                  return (
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#0f172a] p-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={previewFile.url} 
                        alt={previewFile.name} 
                        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                      />
                    </div>
                  );
                }

                if (ext === 'html' || ext === 'htm') {
                  if (htmlViewMode === 'render') {
                    return (
                      <iframe 
                        srcDoc={codeContent || undefined}
                        src={!codeContent ? previewFile.url : undefined}
                        className="w-full h-full border-0 bg-white" 
                        title={previewFile.name}
                        sandbox="allow-scripts allow-same-origin"
                      />
                    );
                  }
                  // If code view, fall through to code container below
                }

                if (codeExts.includes(ext)) {
                  return (
                    <div className="w-full h-full bg-[#070d17] p-5 overflow-auto select-text font-mono text-xs sm:text-sm text-cyan-200 leading-relaxed">
                      {loadingCode ? (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-3">
                          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                          <p className="text-xs">Cargando código...</p>
                        </div>
                      ) : (
                        <pre className="whitespace-pre font-mono selection:bg-cyan-500/30 selection:text-white">
                          <code>{codeContent || "Archivo sin contenido."}</code>
                        </pre>
                      )}
                    </div>
                  );
                }

                if (ext === 'pdf') {
                  return (
                    <iframe 
                      src={previewFile.url} 
                      className="absolute inset-0 w-full h-full border-0 bg-slate-900" 
                      title={previewFile.name}
                    />
                  );
                }

                if (docExts.includes(ext)) {
                  return (
                    <iframe 
                      src={`https://docs.google.com/gview?url=${encodeURIComponent(previewFile.url)}&embedded=true`} 
                      className="absolute inset-0 w-full h-full border-0 bg-slate-100"
                      title={previewFile.name}
                    />
                  );
                }

                return (
                  <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-slate-100">
                    <FileText className="w-16 h-16 text-slate-400 mb-4" />
                    <p className="text-slate-600 font-medium text-lg">Sin vista previa disponible</p>
                    <p className="text-slate-500 mt-2 text-sm">El formato <b>.{ext}</b> no admite previsualización en línea.</p>
                    <p className="text-slate-500 text-sm">Por favor, usa el botón "Descargar" en la esquina superior derecha.</p>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
