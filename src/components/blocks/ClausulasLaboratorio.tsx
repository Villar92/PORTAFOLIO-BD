"use client";

import React, { useState, useEffect } from "react";
import { 
  Bot, 
  Terminal, 
  Code, 
  Database, 
  Search, 
  Copy, 
  Check, 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  Trophy, 
  BookOpen, 
  Plus, 
  Trash2, 
  ArrowRight,
  Flame,
  Layers,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  RotateCcw,
  FileText,
  Download,
  Eye,
  X,
  AlertCircle,
  HelpCircle,
  Filter,
  Calendar,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Table,
  Zap
} from "lucide-react";

import { 
  CLAUSULAS_DATABASE, 
  CATEGORIAS_SQL, 
  type ClausulaItem 
} from "@/data/clausulasData";

import { 
  type ApuntePersonal, 
  generarLote5Apuntes, 
  verificarCicloAutoGeneracion 
} from "@/data/apuntesData";

interface TestQuestion {
  id: number;
  titulo: string;
  enunciado: string;
  codigoConHueco: string;
  respuestaCorrecta: string[];
  clausulaNombre: string;
  pista: string;
  explicacionTecnica: string;
  dificultad: "Básico" | "Intermedio" | "Avanzado";
  categoria: string;
}

interface SemanaDef {
  id: string;
  numero: number;
  unidad: string;
  unidadNum: string;
  nombre: string;
  temaPrincipal: string;
}

// 2. BANCO DE RETOS DEL TEST INTERACTIVO (ROBOT TRAINER)
const BANCO_TEST: TestQuestion[] = [
  {
    id: 1,
    titulo: "Filtrar Grupos con Sumatoria",
    enunciado: "Completa la cláusula requerida para filtrar los grupos de departamentos cuya suma de salarios supere 50,000.",
    codigoConHueco: `SELECT departamento_id, SUM(salario) AS GastoTotal\nFROM Empleados\nGROUP BY departamento_id\n[_____] SUM(salario) > 50000;`,
    respuestaCorrecta: ["having"],
    clausulaNombre: "HAVING",
    pista: "Cláusula que filtra condiciones sobre funciones de agregación (SUM, COUNT). No uses WHERE.",
    explicacionTecnica: "HAVING es la única cláusula válida para filtrar grupos resultantes tras un GROUP BY.",
    dificultad: "Básico",
    categoria: "DQL & Agrupación"
  },
  {
    id: 2,
    titulo: "Agrupación de Ventas por Vendedor",
    enunciado: "Escribe la cláusula para consolidar los totales por cada asesor de ventas.",
    codigoConHueco: `SELECT vendedor_id, COUNT(*) AS Total, SUM(monto) AS TotalRecaudado\nFROM Ventas\n[_____] vendedor_id;`,
    respuestaCorrecta: ["group by"],
    clausulaNombre: "GROUP BY",
    pista: "Cláusula compuesta de dos palabras para colapsar registros idénticos.",
    explicacionTecnica: "GROUP BY agrupa registros por columnas específicas para procesar funciones de agregado.",
    dificultad: "Básico",
    categoria: "DQL & Agrupación"
  },
  {
    id: 3,
    titulo: "Reversión Segura ante Error (ACID)",
    enunciado: "Dentro del bloque CATCH, cancela y anula las operaciones de la transacción.",
    codigoConHueco: `BEGIN TRY\n    BEGIN TRANSACTION;\n        UPDATE Cuentas SET saldo = saldo - 200 WHERE id = 1;\n        UPDATE Cuentas SET saldo = saldo + 200 WHERE id = 2;\n    COMMIT TRANSACTION;\nEND TRY\nBEGIN CATCH\n    [_____] TRANSACTION;\nEND CATCH;`,
    respuestaCorrecta: ["rollback"],
    clausulaNombre: "ROLLBACK",
    pista: "Operación opuesta a COMMIT que deshace los cambios no consolidados.",
    explicacionTecnica: "ROLLBACK devuelve la base de datos a su estado original garantizando la atomicidad.",
    dificultad: "Intermedio",
    categoria: "Transacciones ACID"
  },
  {
    id: 4,
    titulo: "Disparador Automático de Auditoría",
    enunciado: "Completa la sentencia para crear un disparador automático en la tabla Clientes.",
    codigoConHueco: `CREATE [_____] tr_AuditarClientes\nON Clientes\nAFTER INSERT\nAS\nBEGIN\n    INSERT INTO Logs (accion, fecha) VALUES ('Nuevo registro', GETDATE());\nEND;`,
    respuestaCorrecta: ["trigger"],
    clausulaNombre: "TRIGGER",
    pista: "Objeto de base de datos que se ejecuta automáticamente ante eventos INSERT/UPDATE/DELETE.",
    explicacionTecnica: "Los TRIGGERS responden de forma reactiva a eventos DML en el servidor.",
    dificultad: "Intermedio",
    categoria: "Programabilidad T-SQL"
  },
  {
    id: 5,
    titulo: "Expresión de Tabla Común (CTE)",
    enunciado: "Completa la palabra clave que define una vista temporal nombrada para estructurar la consulta.",
    codigoConHueco: `[_____] ClientesVIP AS (\n    SELECT cliente_id, SUM(monto) AS TotalGastado\n    FROM Pedidos\n    GROUP BY cliente_id\n    HAVING SUM(monto) > 10000\n)\nSELECT * FROM ClientesVIP;`,
    respuestaCorrecta: ["with"],
    clausulaNombre: "WITH",
    pista: "Palabra reservada de cuatro letras que encabeza las Common Table Expressions.",
    explicacionTecnica: "WITH simplifica subconsultas complejas, optimiza lectura y permite recursividad.",
    dificultad: "Intermedio",
    categoria: "Subconsultas & CTEs"
  },
  {
    id: 6,
    titulo: "Función de Ventana y Ranking",
    enunciado: "Segmenta el ranking de sueldos reiniciando la numeración por cada departamento.",
    codigoConHueco: `SELECT empleado_id, salario,\n       ROW_NUMBER() OVER([_____] BY departamento_id ORDER BY salario DESC) AS Ranking\nFROM Empleados;`,
    respuestaCorrecta: ["partition"],
    clausulaNombre: "PARTITION",
    pista: "Palabra clave que divide las filas en particiones dentro de OVER().",
    explicacionTecnica: "PARTITION BY crea subconjuntos donde la función de ventana evalúa de manera aislada.",
    dificultad: "Avanzado",
    categoria: "Subconsultas & CTEs"
  },
  {
    id: 7,
    titulo: "Cruce con Todos los Registros Base",
    enunciado: "Lista todos los proveedores de la tabla izquierda aunque aún no posean productos asociados.",
    codigoConHueco: `SELECT p.nombre_proveedor, pr.nombre_producto\nFROM Proveedores p\n[_____] JOIN Productos pr ON p.proveedor_id = pr.proveedor_id;`,
    respuestaCorrecta: ["left"],
    clausulaNombre: "LEFT",
    pista: "JOIN que preserva la totalidad de las filas de la tabla izquierda.",
    explicacionTecnica: "LEFT JOIN garantiza la presencia de todas las filas de la primera tabla y nulos en la segunda.",
    dificultad: "Básico",
    categoria: "Cruce de Tablas (JOINs)"
  },
  {
    id: 8,
    titulo: "Operación Atómica Upsert (MERGE)",
    enunciado: "Escribe la instrucción de SQL Server que sincroniza UPDATE e INSERT simultáneamente.",
    codigoConHueco: `[_____] INTO Inventario AS dest\nUSING Central AS orig ON dest.codigo = orig.codigo\nWHEN MATCHED THEN\n    UPDATE SET dest.stock = orig.stock\nWHEN NOT MATCHED THEN\n    INSERT (codigo, stock) VALUES (orig.codigo, orig.stock);`,
    respuestaCorrecta: ["merge"],
    clausulaNombre: "MERGE",
    pista: "Instrucción de 5 letras para combinar actualización e inserción condicional.",
    explicacionTecnica: "MERGE ejecuta operaciones DML combinadas de forma atómica y con alta eficiencia.",
    dificultad: "Avanzado",
    categoria: "Manipulación DML"
  },
  {
    id: 9,
    titulo: "Columna Condicional en Consulta",
    enunciado: "Cierra la evaluación lógica de la estructura condicional en la lista de selección.",
    codigoConHueco: `SELECT producto_id, precio,\n       CASE\n           WHEN precio >= 1000 THEN 'Gama Alta'\n           WHEN precio >= 400 THEN 'Gama Media'\n           ELSE 'Económico'\n       [_____] AS CategoriaPrecio\nFROM Productos;`,
    respuestaCorrecta: ["end"],
    clausulaNombre: "END",
    pista: "Palabra clave obligatoria que da por terminado un bloque CASE.",
    explicacionTecnica: "Todo bloque CASE WHEN requiere terminar con la palabra END para retornar el valor evaluado.",
    dificultad: "Básico",
    categoria: "DQL & Agrupación"
  },
  {
    id: 10,
    titulo: "Optimización con Índices Cubrientes",
    enunciado: "Agrega columnas auxiliares a un índice secundario para evitar operaciones Key Lookup.",
    codigoConHueco: `CREATE NONCLUSTERED INDEX IX_Clientes_DNI\nON Clientes(dni ASC)\n[_____] (nombre, apellido, telefono);`,
    respuestaCorrecta: ["include"],
    clausulaNombre: "INCLUDE",
    pista: "Cláusula que adjunta columnas sin incluirlas en las claves del árbol B.",
    explicacionTecnica: "INCLUDE almacena columnas en los nodos hoja para resolver consultas sin consultar la tabla física.",
    dificultad: "Avanzado",
    categoria: "Optimización & Índices"
  }
];

// 3. MAPA DE SEMANAS Y UNIDADES PARA EL APARTADO DE PDFS
const SEMANAS_CURSO: SemanaDef[] = [
  // Unidad I
  { id: "u1_s1", numero: 1, unidad: "UNIDAD I", unidadNum: "U1", nombre: "Semana 1", temaPrincipal: "Formulación del Proyecto y Selección de Arquitectura DBMS" },
  { id: "u1_s2", numero: 2, unidad: "UNIDAD I", unidadNum: "U1", nombre: "Semana 2", temaPrincipal: "Despliegue y Configuración de Monitoreo de Datos" },
  { id: "u1_s3", numero: 3, unidad: "UNIDAD I", unidadNum: "U1", nombre: "Semana 3", temaPrincipal: "Modelamiento Físico y Mecanismos de Integración" },
  { id: "u1_s4", numero: 4, unidad: "UNIDAD I", unidadNum: "U1", nombre: "Semana 4", temaPrincipal: "Sustentación y Validación de la Infraestructura" },
  // Unidad II
  { id: "u2_s5", numero: 5, unidad: "UNIDAD II", unidadNum: "U2", nombre: "Semana 5", temaPrincipal: "Instalación y Despliegue de Motores DBMS" },
  { id: "u2_s6", numero: 6, unidad: "UNIDAD II", unidadNum: "U2", nombre: "Semana 6", temaPrincipal: "Configuración de Parámetros y Gestión de Memoria" },
  { id: "u2_s7", numero: 7, unidad: "UNIDAD II", unidadNum: "U2", nombre: "Semana 7", temaPrincipal: "Gestión de Permisos, Accesos y Roles de Base de Datos" },
  { id: "u2_s8", numero: 8, unidad: "UNIDAD II", unidadNum: "U2", nombre: "Semana 8", temaPrincipal: "Evaluaciones Parciales y Consolidación de Motor" },
  // Unidad III
  { id: "u3_s9", numero: 9, unidad: "UNIDAD III", unidadNum: "U3", nombre: "Semana 9", temaPrincipal: "Encriptación de Datos y Auditoría Corporativa" },
  { id: "u3_s10", numero: 10, unidad: "UNIDAD III", unidadNum: "U3", nombre: "Semana 10", temaPrincipal: "Políticas de Backups y Respaldos Empresariales" },
  { id: "u3_s11", numero: 11, unidad: "UNIDAD III", unidadNum: "U3", nombre: "Semana 11", temaPrincipal: "Restauración ante Desastres y Pruebas DRP" },
  { id: "u3_s12", numero: 12, unidad: "UNIDAD III", unidadNum: "U3", nombre: "Semana 12", temaPrincipal: "Replicación, Clusters y Alta Disponibilidad (HA)" },
  // Unidad IV
  { id: "u4_s13", numero: 13, unidad: "UNIDAD IV", unidadNum: "U4", nombre: "Semana 13", temaPrincipal: "Monitoreo de Rendimiento y Recursos de Servidor" },
  { id: "u4_s14", numero: 14, unidad: "UNIDAD IV", unidadNum: "U4", nombre: "Semana 14", temaPrincipal: "SQL Profiler y Detección de Cuellos de Botella" },
  { id: "u4_s15", numero: 15, unidad: "UNIDAD IV", unidadNum: "U4", nombre: "Semana 15", temaPrincipal: "Optimización de Índices y Planes de Ejecución" },
  { id: "u4_s16", numero: 16, unidad: "UNIDAD IV", unidadNum: "U4", nombre: "Semana 16", temaPrincipal: "Entrega Final y Validación Integral del Portafolio" }
];

export function ClausulasLaboratorio({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  // Pestañas principales
  const [activeSubTab, setActiveSubTab] = useState<"robot" | "clausulas" | "pdfs" | "apuntes">("robot");
  
  // -------------------------------------------------------------
  // ESTADO TEST ROBOT TRAINER (CON AUTO-COMPLETADO A LOS 3 FALLOS)
  // -------------------------------------------------------------
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [evaluationState, setEvaluationState] = useState<"pending" | "correct" | "incorrect" | "autocompleted">("pending");
  const [attemptCount, setAttemptCount] = useState(0); // Contador de fallos: 0, 1, 2, 3 -> autocompleta
  const [showHint, setShowHint] = useState(false);
  const [streakCount, setStreakCount] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [robotSpeech, setRobotSpeech] = useState("¡Hola! Escribe la cláusula faltante en el reto y presiona Comprobar. Tienes 3 intentos antes del auto-completado.");

  // -------------------------------------------------------------
  // ESTADO DICCIONARIO SQL POR CATEGORÍAS
  // -------------------------------------------------------------
  const [selectedClauseId, setSelectedClauseId] = useState<string>("select");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // -------------------------------------------------------------
  // ESTADO APARTADO DE PDFS DE CADA SEMANA
  // -------------------------------------------------------------
  const [serverFiles, setServerFiles] = useState<Record<string, any[]>>({});
  const [loadingPdfs, setLoadingPdfs] = useState(false);
  const [pdfFilterUnidad, setPdfFilterUnidad] = useState("TODAS");
  const [pdfSearchQuery, setPdfSearchQuery] = useState("");
  const [previewPdfModal, setPreviewPdfModal] = useState<{ url: string; name: string; semana: string } | null>(null);
  const [downloadingName, setDownloadingName] = useState<string | null>(null);

  // -------------------------------------------------------------
  // ESTADO APUNTES PERSONALES & AUTO-GENERACIÓN CADA 7 DÍAS
  // -------------------------------------------------------------
  const [apuntes, setApuntes] = useState<ApuntePersonal[]>([]);
  const [nuevoTitulo, setNuevoTitulo] = useState("");
  const [nuevaClausula, setNuevaClausula] = useState("");
  const [nuevaNota, setNuevaNota] = useState("");
  const [nuevoCodigo, setNuevoCodigo] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [diasParaProximoCiclo, setDiasParaProximoCiclo] = useState<number>(7);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [filtroTipoApunte, setFiltroTipoApunte] = useState<"todos" | "auto" | "manual">("todos");
  const [busquedaApunte, setBusquedaApunte] = useState("");

  // Cargar archivos para el apartado de PDFs
  const loadFiles = async () => {
    setLoadingPdfs(true);
    try {
      const res = await fetch(`/api/files?t=${Date.now()}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.files) setServerFiles(data.files);
      }
    } catch (e) {
      console.error("Error al cargar archivos PDF:", e);
    } finally {
      setLoadingPdfs(false);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  // Cargar y verificar ciclo de auto-generación de 5 apuntes cada 7 días
  useEffect(() => {
    try {
      const saved = localStorage.getItem("upla_apuntes_db2");
      let baseNotes: ApuntePersonal[] = [];
      if (saved) {
        baseNotes = JSON.parse(saved);
      }
      const resultado = verificarCicloAutoGeneracion(baseNotes);
      setApuntes(resultado.apuntesActualizados);
      setDiasParaProximoCiclo(resultado.diasRestantes);
      if (resultado.seGeneraron) {
        setToastMessage(`🤖 Se han auto-generado ${resultado.cantidadNuevos} apuntes de clase para tu portafolio esta semana.`);
        setTimeout(() => setToastMessage(null), 6000);
      }
    } catch (e) {
      console.error("Error al inicializar apuntes:", e);
    }
  }, []);

  // -------------------------------------------------------------
  // LÓGICA DE VALIDACIÓN Y AUTO-COMPLETADO TRAS 3 FALLOS
  // -------------------------------------------------------------
  const currentTest = BANCO_TEST[currentTestIndex];

  const handleCheckAnswer = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userAnswer.trim()) return;

    const cleaned = userAnswer.trim().toLowerCase().replace(/\s+/g, " ");
    const isRight = currentTest.respuestaCorrecta.some(ans => ans.toLowerCase() === cleaned);

    if (isRight) {
      setEvaluationState("correct");
      setStreakCount(prev => prev + 1);
      setTotalCorrect(prev => prev + 1);
      setRobotSpeech(`¡Excelente trabajo! "${currentTest.clausulaNombre}" es exactamente la respuesta correcta.`);
    } else {
      const nextAttempts = attemptCount + 1;
      setAttemptCount(nextAttempts);

      if (nextAttempts >= 3) {
        // AUTO-COMPLETADO AUTOMÁTICO TRAS 3 INTENTOS FALLIDOS
        setEvaluationState("autocompleted");
        setUserAnswer(currentTest.clausulaNombre);
        setStreakCount(0);
        setRobotSpeech(`🤖 ¡Auto-completado activado tras 3 intentos fallidos! La cláusula correcta es "${currentTest.clausulaNombre}". Revisa la explicación técnica para afianzar el conocimiento.`);
      } else {
        setEvaluationState("incorrect");
        setStreakCount(0);
        const restantes = 3 - nextAttempts;
        setRobotSpeech(`Intento ${nextAttempts} de 3 incorrecto. Te queda${restantes === 1 ? " 1 intento" : `n ${restantes} intentos`} antes de auto-completar. ¡Pide una pista!`);
      }
    }
  };

  const handleNextQuestion = () => {
    setEvaluationState("pending");
    setUserAnswer("");
    setShowHint(false);
    setAttemptCount(0);
    const nextIdx = (currentTestIndex + 1) % BANCO_TEST.length;
    setCurrentTestIndex(nextIdx);
    setRobotSpeech(`Reto #${nextIdx + 1}: ${BANCO_TEST[nextIdx].titulo}. Completa el espacio faltante.`);
  };

  const handleRetryCurrent = () => {
    setEvaluationState("pending");
    setUserAnswer("");
    setShowHint(false);
    setAttemptCount(0);
    setRobotSpeech(`Reto #${currentTestIndex + 1}: Inténtalo nuevamente desde cero.`);
  };

  const handleSelectQuestion = (idx: number) => {
    setCurrentTestIndex(idx);
    setEvaluationState("pending");
    setUserAnswer("");
    setShowHint(false);
    setAttemptCount(0);
    setRobotSpeech(`Reto #${idx + 1}: ${BANCO_TEST[idx].titulo}.`);
  };

  // Descargar archivo de forma segura
  const handleDownloadPdf = async (fileUrl: string, fileName: string) => {
    try {
      setDownloadingName(fileName);
      const downloadEndpoint = fileUrl.includes("/api/files/raw")
        ? `${fileUrl}${fileUrl.includes("?") ? "&" : "?"}download=1`
        : fileUrl;

      const res = await fetch(downloadEndpoint);
      if (!res.ok) throw new Error("Error en descarga");
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(fileUrl, "_blank");
    } finally {
      setTimeout(() => setDownloadingName(null), 1000);
    }
  };

  // Filtrado de cláusulas
  const filteredClausulas = CLAUSULAS_DATABASE.filter(item => {
    const matchCategory = selectedCategory === "Todas" || item.categoria === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchQuery = !q || 
                       item.nombre.toLowerCase().includes(q) || 
                       item.resumen.toLowerCase().includes(q) ||
                       item.categoria.toLowerCase().includes(q) ||
                       item.bloque.toLowerCase().includes(q) ||
                       item.numero.toString() === q.replace("#", "") ||
                       item.numero.toString().includes(q.replace("#", ""));
    return matchCategory && matchQuery;
  });

  const selectedClause = CLAUSULAS_DATABASE.find(c => c.id === selectedClauseId) || CLAUSULAS_DATABASE[0];

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveApunte = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoTitulo.trim()) return;

    const newApunte: ApuntePersonal = {
      id: Date.now().toString(),
      titulo: nuevoTitulo,
      clausula: nuevaClausula || "SQL General",
      nota: nuevaNota,
      codigo: nuevoCodigo,
      fecha: new Date().toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" })
    };

    const updated = [newApunte, ...apuntes];
    setApuntes(updated);
    localStorage.setItem("upla_apuntes_db2", JSON.stringify(updated));

    setNuevoTitulo("");
    setNuevaClausula("");
    setNuevaNota("");
    setNuevoCodigo("");
    setShowAddModal(false);
  };

  const handleDeleteApunte = (id: string) => {
    const updated = apuntes.filter(a => a.id !== id);
    setApuntes(updated);
    localStorage.setItem("upla_apuntes_db2", JSON.stringify(updated));
  };

  const handleForzarGeneracion5 = () => {
    const nuevos = generarLote5Apuntes(apuntes);
    const updated = [...nuevos, ...apuntes];
    setApuntes(updated);
    localStorage.setItem("upla_apuntes_db2", JSON.stringify(updated));
    localStorage.setItem("upla_apuntes_last_gen", Date.now().toString());
    setDiasParaProximoCiclo(7);
    setToastMessage("✨ ¡Se han auto-generado 5 nuevos apuntes de clase con éxito!");
    setTimeout(() => setToastMessage(null), 5000);
  };

  const filteredApuntes = apuntes.filter(a => {
    const q = busquedaApunte.toLowerCase().trim();
    const matchQuery = !q || 
                       a.titulo.toLowerCase().includes(q) || 
                       a.clausula.toLowerCase().includes(q) || 
                       a.nota.toLowerCase().includes(q) ||
                       (a.codigo && a.codigo.toLowerCase().includes(q));
    
    if (filtroTipoApunte === "auto") return matchQuery && a.autoGenerado;
    if (filtroTipoApunte === "manual") return matchQuery && !a.autoGenerado;
    return matchQuery;
  });

  // Helper para extraer todos los PDFs de una semana
  const getPdfsForSemana = (actividadId: string) => {
    const files = serverFiles[actividadId] || [];
    return files.filter(f => {
      const ext = f.name?.split(".").pop()?.toLowerCase() || "";
      return ext === "pdf";
    });
  };

  // Recuento total de PDFs subidos
  const totalPdfsCount = Object.values(serverFiles).reduce((acc, filesList) => {
    return acc + filesList.filter(f => f.name?.toLowerCase().endsWith(".pdf")).length;
  }, 0);

  // Semanas filtradas por Unidad
  const filteredSemanas = SEMANAS_CURSO.filter(sem => {
    if (pdfFilterUnidad !== "TODAS" && sem.unidadNum !== pdfFilterUnidad) return false;
    if (!pdfSearchQuery.trim()) return true;
    const q = pdfSearchQuery.toLowerCase();
    const pdfs = getPdfsForSemana(sem.id);
    const matchesPdfName = pdfs.some(p => p.name.toLowerCase().includes(q));
    const matchesSemana = sem.nombre.toLowerCase().includes(q) || sem.temaPrincipal.toLowerCase().includes(q);
    return matchesPdfName || matchesSemana;
  });

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 animate-in fade-in duration-300 relative z-10">
      
      {/* 1. ENCABEZADO PRINCIPAL ELEGANTE */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-5 mb-6 border-b border-cyan-500/20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-400/50 p-1 flex-shrink-0 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            <img src="/BOTS.png" alt="Robot Entrenador" className="w-full h-full object-cover scale-110" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide flex items-center gap-2">
              <span>SQL LAB & APARTADOS ACADÉMICOS</span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                UPLA
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Cláusulas ordenadas por categorías, Test con auto-completado al 3er intento y repositorio de PDFs semanales
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab("inicio")}
          className="self-stretch md:self-auto px-4 py-2 bg-[#0B1120] hover:bg-cyan-950 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md hover:shadow-cyan-500/20"
        >
          <span>← Volver al Portafolio</span>
        </button>
      </div>

      {/* 2. SELECTOR DE APARTADOS (4 PESTAÑAS PRINCIPALES) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1.5 bg-[#070d17] border border-cyan-500/30 rounded-2xl mb-6 shadow-inner">
        {/* Apartado 1: Robot Trainer & Test */}
        <button
          onClick={() => {
            setActiveSubTab("robot");
            setRobotSpeech("Completa la cláusula requerida en el reto. A los 3 intentos fallidos se auto-completa.");
          }}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeSubTab === "robot"
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Bot className="w-4 h-4 text-cyan-300" />
          <span className="truncate">1. Test & Trainer</span>
          {streakCount > 0 && (
            <span className="px-1.5 py-0.2 bg-amber-500 text-white text-[10px] rounded-full font-black flex items-center gap-0.5">
              <Flame className="w-2.5 h-2.5" />
              {streakCount}
            </span>
          )}
        </button>

        {/* Apartado 2: Cláusulas por Categorías */}
        <button
          onClick={() => setActiveSubTab("clausulas")}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeSubTab === "clausulas"
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <BookOpen className="w-4 h-4 text-cyan-300" />
          <span className="truncate">2. Cláusulas SQL</span>
          <span className="px-1.5 py-0.2 bg-cyan-500/30 text-cyan-200 border border-cyan-500/40 text-[10px] rounded-full font-black">
            100
          </span>
        </button>

        {/* Apartado 3: PDFs de Cada Semana (NUEVO) */}
        <button
          onClick={() => {
            setActiveSubTab("pdfs");
            loadFiles();
          }}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeSubTab === "pdfs"
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <FileText className="w-4 h-4 text-red-400" />
          <span className="truncate">3. PDFs por Semana</span>
          {totalPdfsCount > 0 && (
            <span className="px-1.5 py-0.5 bg-red-500/30 text-red-300 border border-red-500/40 text-[10px] rounded-full font-black">
              {totalPdfsCount}
            </span>
          )}
        </button>

        {/* Apartado 4: Mis Apuntes */}
        <button
          onClick={() => setActiveSubTab("apuntes")}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeSubTab === "apuntes"
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Terminal className="w-4 h-4 text-cyan-300" />
          <span className="truncate">4. Mis Apuntes</span>
          {apuntes.length > 0 && (
            <span className="px-1.5 py-0.2 bg-cyan-500/30 text-cyan-200 border border-cyan-500/40 text-[10px] rounded-full font-black font-mono">
              {apuntes.length}
            </span>
          )}
        </button>
      </div>

      {/* ======================================================== */}
      {/* APARTADO 1: TEST INTERACTIVO (CON AUTO-COMPLETADO 3 FALLOS)*/}
      {/* ======================================================== */}
      {activeSubTab === "robot" && (
        <div className="space-y-4 animate-in fade-in duration-300">
          
          {/* Diálogo conciso del Robot y Marcador */}
          <div className="bg-[#0f172a] border border-cyan-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-400/50 p-1 flex-shrink-0 flex items-center justify-center">
                <img src="/BOTS.png" alt="Robot" className="w-full h-full object-cover scale-110" />
              </div>
              <p className="text-xs sm:text-sm text-cyan-100 font-medium leading-tight">
                &ldquo;{robotSpeech}&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-2 bg-[#070d17] px-3 py-1.5 rounded-xl border border-white/5 flex-shrink-0">
              <span className="text-[11px] text-amber-400 font-bold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" />
                Racha: {streakCount}
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-[11px] text-cyan-300 font-bold flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5" />
                Aciertos: {totalCorrect}
              </span>
            </div>
          </div>

          {/* Tarjeta del Reto Actual */}
          <div className="bg-[#0f172a] border border-cyan-500/30 rounded-2xl p-5 sm:p-6 shadow-xl">
            
            {/* Cabecera del Reto */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                    Reto {currentTestIndex + 1} de {BANCO_TEST.length}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-950 text-purple-300 border border-purple-500/30">
                    {currentTest.categoria}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    currentTest.dificultad === "Básico" ? "bg-emerald-950 text-emerald-300 border border-emerald-500/30" :
                    currentTest.dificultad === "Intermedio" ? "bg-amber-950 text-amber-300 border border-amber-500/30" :
                    "bg-red-950 text-red-300 border border-red-500/30"
                  }`}>
                    {currentTest.dificultad}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-black text-white">
                  {currentTest.titulo}
                </h2>
              </div>

              {/* Indicador visual de Intentos Fallidos (3 bolitas) y Botón Pista */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#070d17] border border-white/10 rounded-xl text-xs">
                  <span className="text-[11px] text-slate-400 font-bold mr-1">Intentos fallidos:</span>
                  <div className="flex items-center gap-1">
                    <span className={`w-3 h-3 rounded-full transition-all ${
                      attemptCount >= 1 ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" : "bg-slate-700"
                    }`} title="Intento 1" />
                    <span className={`w-3 h-3 rounded-full transition-all ${
                      attemptCount >= 2 ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" : "bg-slate-700"
                    }`} title="Intento 2" />
                    <span className={`w-3 h-3 rounded-full transition-all ${
                      attemptCount >= 3 ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] animate-pulse" : "bg-slate-700"
                    }`} title="Intento 3 (Auto-completado)" />
                  </div>
                  <span className={`text-[11px] font-bold ml-1 ${
                    attemptCount >= 3 ? "text-amber-400" : attemptCount > 0 ? "text-red-400" : "text-slate-400"
                  }`}>
                    {attemptCount}/3
                  </span>
                </div>

                <button
                  onClick={() => {
                    setShowHint(true);
                    setRobotSpeech(`💡 Pista: ${currentTest.pista}`);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Pista</span>
                </button>
              </div>
            </div>

            {/* Enunciado */}
            <p className="text-xs sm:text-sm text-slate-300 mb-4 font-light">
              {currentTest.enunciado}
            </p>

            {/* Visualizador de Código con el Hueco a Completar */}
            <div className="bg-[#070d17] border border-cyan-500/30 rounded-xl p-4 mb-4 shadow-inner">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/5 text-[10px] text-slate-400 font-mono">
                <span className="text-cyan-400 font-bold flex items-center gap-1">
                  <Code className="w-3 h-3" />
                  SQL Query (T-SQL)
                </span>
                <span>
                  {evaluationState === "autocompleted" 
                    ? "✨ Auto-completado aplicado"
                    : evaluationState === "correct" 
                    ? "✓ Respuesta correcta" 
                    : "Completa el espacio [ ? ? ? ]"}
                </span>
              </div>
              <pre className="font-mono text-xs sm:text-sm text-cyan-200 leading-relaxed whitespace-pre-wrap">
                {currentTest.codigoConHueco.split("[_____]").map((part, i, arr) => (
                  <React.Fragment key={i}>
                    <span>{part}</span>
                    {i < arr.length - 1 && (
                      <span className={`inline-block mx-1.5 px-3 py-0.5 rounded font-black text-xs sm:text-sm transition-all ${
                        evaluationState === "correct" 
                          ? "bg-green-600 text-white shadow-md shadow-green-500/50" 
                          : evaluationState === "autocompleted"
                          ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black font-extrabold shadow-[0_0_15px_rgba(245,158,11,0.6)] animate-pulse"
                          : "bg-cyan-950 border-2 border-dashed border-cyan-400 text-cyan-300 animate-pulse"
                      }`}>
                        {evaluationState === "correct" || evaluationState === "autocompleted"
                          ? currentTest.clausulaNombre 
                          : "[ ? ? ? ]"}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </pre>
            </div>

            {/* Formulario de Respuesta con soporte de Auto-completado */}
            <form onSubmit={handleCheckAnswer} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => {
                      setUserAnswer(e.target.value);
                      if (evaluationState !== "pending") setEvaluationState("pending");
                    }}
                    placeholder="Escribe aquí la cláusula (ej. HAVING, GROUP BY, TRIGGER)..."
                    disabled={evaluationState === "correct" || evaluationState === "autocompleted"}
                    className={`w-full px-4 py-2.5 bg-[#0B1120] border rounded-xl text-white font-mono text-xs sm:text-sm placeholder-slate-500 focus:outline-none transition-all ${
                      evaluationState === "autocompleted"
                        ? "border-amber-400/80 bg-amber-950/20 text-amber-200 font-bold"
                        : evaluationState === "correct"
                        ? "border-green-400 bg-green-950/20 text-green-300"
                        : evaluationState === "incorrect"
                        ? "border-red-400/80 bg-red-950/20"
                        : "border-cyan-500/40 focus:border-cyan-400"
                    }`}
                  />
                  {evaluationState === "correct" && (
                    <CheckCircle2 className="w-5 h-5 text-green-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  )}
                  {evaluationState === "autocompleted" && (
                    <Sparkles className="w-5 h-5 text-amber-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  )}
                  {evaluationState === "incorrect" && (
                    <XCircle className="w-5 h-5 text-red-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  )}
                </div>

                {evaluationState === "correct" || evaluationState === "autocompleted" ? (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleRetryCurrent}
                      className="px-4 py-2.5 bg-[#0B1120] hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      title="Reintentar este ejercicio desde cero"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Reintentar</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Siguiente Reto</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Comprobar</span>
                    <Check className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* FEEDBACK DEL RESULTADO */}
              {evaluationState === "correct" && (
                <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-300 text-xs flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span><strong>¡Completado con éxito!</strong> {currentTest.explicacionTecnica}</span>
                </div>
              )}

              {/* BANNER DE AUTO-COMPLETADO TRAS 3 FALLOS */}
              {evaluationState === "autocompleted" && (
                <div className="p-4 bg-amber-500/15 border-2 border-amber-400/50 rounded-xl text-amber-200 text-xs space-y-1.5 shadow-lg animate-in slide-in-from-top-2">
                  <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>¡Auto-completado automático tras 3 intentos fallidos!</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed font-light">
                    La cláusula requerida es: <strong className="text-amber-300 font-mono text-sm px-1.5 py-0.5 bg-amber-950/60 rounded border border-amber-500/40">{currentTest.clausulaNombre}</strong>.
                  </p>
                  <p className="text-cyan-200 font-medium">
                    💡 <strong>Justificación Técnica:</strong> {currentTest.explicacionTecnica}
                  </p>
                </div>
              )}

              {/* FEEDBACK INCORRECTO */}
              {evaluationState === "incorrect" && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-xs flex items-center justify-between gap-2 animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <span>
                      <strong>Intento {attemptCount} de 3 incorrecto.</strong> {showHint ? currentTest.pista : "Presiona 'Pista' si necesitas orientación."}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-amber-300 bg-red-950/50 px-2 py-0.5 rounded border border-red-500/30">
                    {3 - attemptCount} intento(s) restante(s)
                  </span>
                </div>
              )}
            </form>

            {/* Barra de navegación de preguntas */}
            <div className="mt-5 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-400 font-medium">Seleccionar Reto Rápido:</span>
              <div className="flex flex-wrap gap-1.5 max-w-full overflow-x-auto py-1">
                {BANCO_TEST.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectQuestion(idx)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                      currentTestIndex === idx
                        ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/30 scale-105"
                        : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                    }`}
                    title={q.titulo}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* APARTADO 2: CLÁUSULAS SQL ORDENADAS POR CATEGORÍAS        */}
      {/* ======================================================== */}
      {activeSubTab === "clausulas" && (
        <div className="space-y-4 animate-in fade-in duration-300">
          
          {/* Encabezado informativo del catálogo */}
          <div className="bg-[#0f172a]/80 border border-cyan-500/20 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-lg">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[11px] font-mono font-bold">
                  Catálogo Técnico Oficial
                </span>
                <span className="text-xs text-slate-400">
                  100 Cláusulas en 6 Bloques Progresivos
                </span>
              </div>
              <h3 className="text-base sm:text-xl font-black text-white">
                Diccionario Integral de Cláusulas SQL Server / T-SQL
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="bg-[#131d35] px-3 py-1.5 rounded-xl border border-white/5 font-mono text-slate-300">
                Mostrando <strong className="text-cyan-400 font-bold">{filteredClausulas.length}</strong> de 100
              </span>
            </div>
          </div>

          {/* Píldoras de Categorías en fila con scroll horizontal */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 text-xs scrollbar-none">
            {CATEGORIAS_SQL.map(cat => {
              const IconComp = cat.icon;
              const count = cat.id === "Todas" 
                ? CLAUSULAS_DATABASE.length 
                : CLAUSULAS_DATABASE.filter(c => c.categoria === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/30"
                      : "bg-[#0f172a] text-slate-400 hover:text-white hover:bg-[#131d35] border border-white/5"
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5 text-cyan-300" />
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat.id ? "bg-black/30 text-white font-mono" : "bg-white/10 text-slate-400 font-mono"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            
            {/* COLUMNA IZQUIERDA: LISTA ORDENADA DE CLÁUSULAS */}
            <div className="md:col-span-5 lg:col-span-4 space-y-3">
              
              {/* Buscador */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por nombre, #número o función..."
                  className="w-full pl-8 pr-8 py-2 bg-[#0f172a] border border-cyan-500/30 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Lista compacta de botones de cláusula con scroll */}
              <div className="space-y-1.5 max-h-[640px] overflow-y-auto pr-1">
                {filteredClausulas.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedClauseId(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                      selectedClause.id === item.id
                        ? "bg-cyan-950/70 border-cyan-400 text-white shadow-md shadow-cyan-500/20"
                        : "bg-[#0f172a]/60 border-white/5 text-slate-300 hover:bg-[#0f172a] hover:border-cyan-500/30"
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <p className="font-bold text-xs text-white flex items-center gap-1.5">
                        <span className="text-[10px] text-cyan-400 font-mono font-bold bg-cyan-950 px-1.5 py-0.2 rounded border border-cyan-500/30 shrink-0">
                          #{item.numero}
                        </span>
                        <span className="truncate">{item.nombre}</span>
                      </p>
                      <span className="text-[10px] text-cyan-400/70 block truncate mt-0.5">{item.categoria}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${selectedClause.id === item.id ? "text-cyan-400" : "text-slate-600"}`} />
                  </button>
                ))}

                {filteredClausulas.length === 0 && (
                  <div className="text-center py-8 text-xs text-slate-500 bg-[#0f172a]/40 rounded-xl border border-white/5">
                    No se hallaron cláusulas con ese criterio de búsqueda.
                  </div>
                )}
              </div>

            </div>

            {/* COLUMNA DERECHA: VISOR DETALLADO DE LA CLÁUSULA */}
            <div className="md:col-span-7 lg:col-span-8">
              <div className="bg-[#0f172a] border border-cyan-500/30 rounded-2xl p-5 sm:p-6 shadow-xl sticky top-20">
                
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 mb-4 border-b border-white/10">
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                        #{selectedClause.numero} de 100
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
                        {selectedClause.categoria}
                      </span>
                      <span className="text-[10px] text-slate-400 hidden xl:inline">
                        {selectedClause.bloque}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white">
                      {selectedClause.nombre}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Botones Anterior y Siguiente */}
                    <div className="flex items-center bg-[#070d17] border border-white/10 rounded-xl p-0.5">
                      <button
                        onClick={() => {
                          const currIdx = CLAUSULAS_DATABASE.findIndex(c => c.id === selectedClause.id);
                          if (currIdx > 0) {
                            setSelectedClauseId(CLAUSULAS_DATABASE[currIdx - 1].id);
                          }
                        }}
                        disabled={CLAUSULAS_DATABASE.findIndex(c => c.id === selectedClause.id) === 0}
                        title="Cláusula anterior"
                        className="p-1.5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 hover:text-white rounded-lg transition-all cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-[10px] font-mono px-1.5 text-slate-400">
                        {selectedClause.numero}/100
                      </span>
                      <button
                        onClick={() => {
                          const currIdx = CLAUSULAS_DATABASE.findIndex(c => c.id === selectedClause.id);
                          if (currIdx < CLAUSULAS_DATABASE.length - 1) {
                            setSelectedClauseId(CLAUSULAS_DATABASE[currIdx + 1].id);
                          }
                        }}
                        disabled={CLAUSULAS_DATABASE.findIndex(c => c.id === selectedClause.id) === CLAUSULAS_DATABASE.length - 1}
                        title="Cláusula siguiente"
                        className="p-1.5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 hover:text-white rounded-lg transition-all cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        setActiveSubTab("robot");
                        const matched = BANCO_TEST.find(t => t.clausulaNombre.toLowerCase().includes(selectedClause.nombre.toLowerCase().split(" ")[0])) || BANCO_TEST[0];
                        const idx = BANCO_TEST.indexOf(matched);
                        if (idx >= 0) {
                          setCurrentTestIndex(idx);
                          setAttemptCount(0);
                          setEvaluationState("pending");
                          setUserAnswer("");
                        }
                        setRobotSpeech(`Practica la cláusula ${selectedClause.nombre} en este reto.`);
                      }}
                      className="px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <Bot className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Practicar en Test</span>
                    </button>
                  </div>
                </div>

                {/* Resumen */}
                <div className="mb-4">
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                    {selectedClause.resumen}
                  </p>
                </div>

                {/* Sintaxis Oficial */}
                <div className="mb-4">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">
                    Sintaxis Estándar:
                  </span>
                  <pre className="p-3 bg-[#070d17] border border-white/5 rounded-xl font-mono text-xs text-amber-200 overflow-x-auto">
                    <code>{selectedClause.sintaxis}</code>
                  </pre>
                </div>

                {/* Ejemplo de Código */}
                <div className="mb-4">
                  <div className="flex items-center justify-between pb-1.5 mb-1.5 text-[11px]">
                    <span className="font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                      <Code className="w-3.5 h-3.5" />
                      Ejemplo T-SQL Práctico
                    </span>
                    <button
                      onClick={() => handleCopyCode(selectedClause.id, selectedClause.ejemplo)}
                      className="text-slate-400 hover:text-cyan-300 flex items-center gap-1 text-xs cursor-pointer"
                    >
                      {copiedId === selectedClause.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-400" />
                          <span className="text-green-400">Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar código</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="p-3.5 bg-[#070d17] border border-cyan-500/20 rounded-xl font-mono text-xs text-cyan-200 overflow-x-auto leading-relaxed shadow-inner">
                    <code>{selectedClause.ejemplo}</code>
                  </pre>
                </div>

                {/* Regla de Oro */}
                <div className="p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-xl text-xs text-cyan-200 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span><strong>Regla de Oro:</strong> {selectedClause.tip}</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* APARTADO 3: PDFs DE CADA SEMANA (NUEVO REPOSITORIO)       */}
      {/* ======================================================== */}
      {activeSubTab === "pdfs" && (
        <div className="space-y-5 animate-in fade-in duration-300">
          
          {/* Header del apartado con filtros */}
          <div className="bg-[#0f172a] border border-cyan-500/30 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-red-400" />
                <span>Repositorio de PDFs de Cada Semana</span>
              </h2>
              <p className="text-xs text-slate-400">
                Guías de laboratorio, infografías y documentación académica organizada por semanas lectivas
              </p>
            </div>

            {/* Filtros por Unidad */}
            <div className="flex flex-wrap items-center gap-2">
              {["TODAS", "U1", "U2", "U3", "U4"].map((u) => (
                <button
                  key={u}
                  onClick={() => setPdfFilterUnidad(u)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    pdfFilterUnidad === u
                      ? "bg-red-500 text-white shadow-md shadow-red-500/30"
                      : "bg-[#070d17] text-slate-400 hover:text-white border border-white/5"
                  }`}
                >
                  {u === "TODAS" ? "Todas las Unidades" : `Unidad ${u.replace("U", "")}`}
                </button>
              ))}
            </div>
          </div>

          {/* Buscador de PDFs */}
          <div className="relative">
            <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={pdfSearchQuery}
              onChange={(e) => setPdfSearchQuery(e.target.value)}
              placeholder="Buscar documento PDF por nombre, tema o semana..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#0f172a] border border-cyan-500/30 rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 shadow-inner"
            />
          </div>

          {/* Grid de Semanas y sus PDFs */}
          {loadingPdfs ? (
            <div className="text-center py-12 bg-[#0f172a]/50 rounded-2xl border border-white/5 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-cyan-300">Sincronizando PDFs del repositorio...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSemanas.map((sem) => {
                const pdfs = getPdfsForSemana(sem.id);
                return (
                  <div
                    key={sem.id}
                    className="bg-[#0f172a] border border-cyan-900/40 hover:border-cyan-500/40 rounded-2xl p-4 shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Cabecera de la semana */}
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                            {sem.unidad}
                          </span>
                          <span className="text-xs font-bold text-white">
                            {sem.nombre}
                          </span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          pdfs.length > 0 
                            ? "bg-red-500/20 text-red-300 border border-red-500/30" 
                            : "bg-slate-800 text-slate-500"
                        }`}>
                          {pdfs.length} PDF{pdfs.length === 1 ? "" : "s"}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 font-medium mb-3">
                        {sem.temaPrincipal}
                      </p>

                      {/* Lista de PDFs en la semana */}
                      <div className="space-y-2">
                        {pdfs.map((pdf, pIdx) => {
                          const cleanName = pdf.name.replace(/^\d+-/, "");
                          return (
                            <div
                              key={pIdx}
                              className="p-2.5 bg-[#070d17] border border-white/5 rounded-xl flex items-center justify-between gap-2 hover:border-cyan-500/30 transition-all"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className="w-7 h-7 rounded-lg bg-red-950/80 border border-red-500/40 flex items-center justify-center flex-shrink-0">
                                  <FileText className="w-4 h-4 text-red-400" />
                                </div>
                                <div className="truncate">
                                  <p className="text-xs font-bold text-slate-200 truncate" title={cleanName}>
                                    {cleanName}
                                  </p>
                                  <span className="text-[10px] text-slate-500">Documento PDF Académico</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 flex-shrink-0">
                                <button
                                  onClick={() => setPreviewPdfModal({ url: pdf.url, name: cleanName, semana: sem.nombre })}
                                  className="px-2.5 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer"
                                  title="Visualizar documento"
                                >
                                  <Eye className="w-3 h-3" />
                                  <span className="hidden sm:inline">Ver</span>
                                </button>
                                <button
                                  onClick={() => handleDownloadPdf(pdf.url, cleanName)}
                                  className="p-1 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                                  title="Descargar PDF"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          );
                        })}

                        {pdfs.length === 0 && (
                          <div className="py-3 px-3 bg-[#070d17]/50 rounded-xl border border-dashed border-white/5 text-center text-xs text-slate-500">
                            Sin PDF subido en esta semana aún.
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
      )}

      {/* ======================================================== */}
      {/* APARTADO 4: MIS APUNTES DE CLASE                           */}
      {/* ======================================================== */}
      {activeSubTab === "apuntes" && (
        <div className="space-y-4 animate-in fade-in duration-300">
          
          {/* Banner de Notificación Toast */}
          {toastMessage && (
            <div className="p-3 bg-cyan-950/90 border border-cyan-400 rounded-xl text-xs text-cyan-200 flex items-center justify-between shadow-lg shadow-cyan-500/10 animate-in fade-in duration-200">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{toastMessage}</span>
              </div>
              <button 
                onClick={() => setToastMessage(null)} 
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Encabezado y Control del Ciclo de 7 Días */}
          <div className="bg-[#0f172a]/90 border border-cyan-500/30 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-xl">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  Auto-generación Activa: 5 apuntes cada 7 días
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  Próxima entrega automática: en ~{diasParaProximoCiclo} días
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-cyan-400" />
                Mis Apuntes de Clase (UPLA)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Repositorio inteligente con notas del docente, scripts de laboratorio y tips de rendimiento.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={handleForzarGeneracion5}
                title="Generar 5 apuntes automáticos ahora mismo"
                className="px-3.5 py-2 bg-[#131d35] hover:bg-[#1a2747] text-cyan-300 hover:text-white border border-cyan-500/30 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>✨ Auto-generar 5 Ahora</span>
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-3.5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Nuevo Apunte Manual</span>
              </button>
            </div>
          </div>

          {/* Barra de Filtros y Búsqueda */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={busquedaApunte}
                onChange={(e) => setBusquedaApunte(e.target.value)}
                placeholder="Buscar en apuntes (título, cláusula, código)..."
                className="w-full pl-8 pr-8 py-2 bg-[#0f172a] border border-cyan-500/30 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
              />
              {busquedaApunte && (
                <button
                  onClick={() => setBusquedaApunte("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto text-xs scrollbar-none">
              <button
                onClick={() => setFiltroTipoApunte("todos")}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  filtroTipoApunte === "todos"
                    ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/20"
                    : "bg-[#0f172a] text-slate-400 hover:text-white border border-white/5"
                }`}
              >
                Todos ({apuntes.length})
              </button>
              <button
                onClick={() => setFiltroTipoApunte("auto")}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  filtroTipoApunte === "auto"
                    ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/20"
                    : "bg-[#0f172a] text-slate-400 hover:text-white border border-white/5"
                }`}
              >
                🤖 Auto-generados ({apuntes.filter(a => a.autoGenerado).length})
              </button>
              <button
                onClick={() => setFiltroTipoApunte("manual")}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  filtroTipoApunte === "manual"
                    ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/20"
                    : "bg-[#0f172a] text-slate-400 hover:text-white border border-white/5"
                }`}
              >
                ✍️ Manuales ({apuntes.filter(a => !a.autoGenerado).length})
              </button>
            </div>
          </div>

          {/* Grilla de Apuntes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredApuntes.map((apunte) => (
              <div 
                key={apunte.id}
                className={`bg-[#0f172a] rounded-xl p-4 shadow-lg flex flex-col justify-between transition-all border ${
                  apunte.autoGenerado 
                    ? "border-cyan-500/40 hover:border-cyan-400 shadow-cyan-950/30" 
                    : "border-white/10 hover:border-cyan-500/30"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {apunte.autoGenerado ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          Semana {apunte.semana || 1}
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-white/10">
                          ✍️ Manual
                        </span>
                      )}
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 uppercase font-mono">
                        {apunte.clausula}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-slate-400 font-mono">
                        {apunte.fecha}
                      </span>
                      <button
                        onClick={() => handleDeleteApunte(apunte.id)}
                        className="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer shrink-0"
                        title="Eliminar apunte"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-1.5">
                    {apunte.titulo}
                  </h3>

                  <p className="text-xs text-slate-300 font-light mb-3 leading-relaxed">
                    {apunte.nota}
                  </p>
                </div>

                {apunte.codigo && (
                  <div className="bg-[#070d17] border border-white/5 rounded-lg overflow-hidden mt-2">
                    <div className="flex items-center justify-between px-2.5 py-1 bg-[#0B1120] text-[10px] text-slate-400 font-mono">
                      <span>Script T-SQL</span>
                      <button
                        onClick={() => handleCopyCode(apunte.id, apunte.codigo)}
                        className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedId === apunte.id ? (
                          <>
                            <Check className="w-3 h-3 text-green-400" />
                            <span className="text-green-400">Copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copiar</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-2.5 font-mono text-[11px] text-cyan-200 overflow-x-auto leading-relaxed">
                      <code>{apunte.codigo}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredApuntes.length === 0 && (
            <div className="text-center py-10 bg-[#0f172a]/50 rounded-2xl border border-white/5">
              <p className="text-xs text-slate-400">No se hallaron apuntes con el criterio seleccionado.</p>
              <div className="mt-3 flex items-center justify-center gap-2">
                <button
                  onClick={handleForzarGeneracion5}
                  className="px-3 py-1.5 bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold rounded-xl hover:bg-cyan-900 transition-colors cursor-pointer"
                >
                  ✨ Generar lote de 5 apuntes
                </button>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-3 py-1.5 bg-white/5 border border-white/10 text-white text-xs font-bold rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                >
                  + Escribir apunte manual
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* MODAL NUEVO APUNTE */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#0f172a] rounded-2xl border border-cyan-500/30 shadow-2xl p-5">
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <Plus className="w-4 h-4 text-cyan-400" />
              Nuevo Apunte de Clase
            </h3>

            <form onSubmit={handleSaveApunte} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Título</label>
                <input
                  type="text"
                  value={nuevoTitulo}
                  onChange={(e) => setNuevoTitulo(e.target.value)}
                  placeholder="Ej: Trigger para evitar sueldos negativos"
                  required
                  className="w-full px-3 py-1.5 bg-[#0B1120] border border-cyan-500/30 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Cláusula / Tema</label>
                <input
                  type="text"
                  value={nuevaClausula}
                  onChange={(e) => setNuevaClausula(e.target.value)}
                  placeholder="Ej: TRIGGER, HAVING, CTE..."
                  className="w-full px-3 py-1.5 bg-[#0B1120] border border-cyan-500/30 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nota o Explicación</label>
                <textarea
                  value={nuevaNota}
                  onChange={(e) => setNuevaNota(e.target.value)}
                  placeholder="Escribe la explicación breve..."
                  rows={2}
                  className="w-full px-3 py-1.5 bg-[#0B1120] border border-cyan-500/30 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Script SQL (Opcional)</label>
                <textarea
                  value={nuevoCodigo}
                  onChange={(e) => setNuevoCodigo(e.target.value)}
                  placeholder="SELECT ... o CREATE PROCEDURE ..."
                  rows={3}
                  className="w-full px-3 py-1.5 bg-[#0B1120] border border-cyan-500/30 rounded-xl font-mono text-xs text-cyan-200 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg text-xs cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-white rounded-lg text-xs font-bold shadow-md cursor-pointer"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL VISUALIZADOR DE PDF INTEGRADO */}
      {previewPdfModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl h-[90vh] bg-[#0f172a] rounded-2xl border border-cyan-500/40 shadow-2xl flex flex-col overflow-hidden">
            
            {/* Barra superior del visor */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#070d17] border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-red-950 border border-red-500/40 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-red-400" />
                </div>
                <div className="truncate">
                  <h3 className="text-sm font-bold text-white truncate">
                    {previewPdfModal.name}
                  </h3>
                  <span className="text-[10px] text-cyan-400 font-semibold">
                    {previewPdfModal.semana} — Visor de Documento
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => handleDownloadPdf(previewPdfModal.url, previewPdfModal.name)}
                  className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Descargar</span>
                </button>
                <button
                  onClick={() => setPreviewPdfModal(null)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Iframe del visor de PDF */}
            <div className="flex-1 w-full bg-slate-950 relative">
              <iframe
                src={`${previewPdfModal.url}#toolbar=1&navpanes=0`}
                className="w-full h-full border-0 bg-slate-950"
                title={previewPdfModal.name}
              />
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
