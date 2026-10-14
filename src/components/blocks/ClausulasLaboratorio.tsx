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
  Sparkles,
  RotateCcw
} from "lucide-react";

interface ClausulaItem {
  id: string;
  nombre: string;
  categoria: string;
  resumen: string;
  sintaxis: string;
  ejemplo: string;
  tip: string;
}

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
}

interface ApuntePersonal {
  id: string;
  titulo: string;
  clausula: string;
  nota: string;
  codigo: string;
  fecha: string;
}

// 1. BANCO DE CLÁUSULAS CON TEXTOS CONCISOS Y ORDENADOS
const CLAUSULAS_DATABASE: ClausulaItem[] = [
  {
    id: "group-by",
    nombre: "GROUP BY",
    categoria: "Consultas & Agrupación",
    resumen: "Agrupa filas idénticas para realizar resúmenes (SUM, COUNT, AVG).",
    sintaxis: "SELECT columna, COUNT(*)\nFROM tabla\nGROUP BY columna;",
    ejemplo: `SELECT departamento_id, COUNT(*) AS TotalEmpleados, AVG(salario) AS SalarioPromedio
FROM Empleados
GROUP BY departamento_id;`,
    tip: "Toda columna del SELECT sin función de agregado debe ir obligatoriamente en GROUP BY."
  },
  {
    id: "having",
    nombre: "HAVING",
    categoria: "Consultas & Agrupación",
    resumen: "Filtra grupos ya calculados por GROUP BY tras aplicar funciones agregadas.",
    sintaxis: "SELECT columna, COUNT(*)\nFROM tabla\nGROUP BY columna\nHAVING COUNT(*) > valor;",
    ejemplo: `SELECT departamento_id, COUNT(*) AS Cantidad
FROM Empleados
GROUP BY departamento_id
HAVING COUNT(*) > 5;`,
    tip: "WHERE filtra filas antes de agrupar; HAVING filtra los grupos resultantes."
  },
  {
    id: "inner-join",
    nombre: "INNER JOIN",
    categoria: "Cruce de Tablas",
    resumen: "Devuelve registros con coincidencia exacta en ambas tablas relacionadas.",
    sintaxis: "SELECT *\nFROM TablaA\nINNER JOIN TablaB ON TablaA.id = TablaB.a_id;",
    ejemplo: `SELECT o.orden_id, c.nombre_cliente, o.total
FROM Ordenes o
INNER JOIN Clientes c ON o.cliente_id = c.cliente_id;`,
    tip: "Solo incluye filas donde la clave primaria y foránea coinciden exactamente."
  },
  {
    id: "left-join",
    nombre: "LEFT JOIN",
    categoria: "Cruce de Tablas",
    resumen: "Devuelve todos los registros de la izquierda y los coincidentes de la derecha.",
    sintaxis: "SELECT *\nFROM TablaA\nLEFT JOIN TablaB ON TablaA.id = TablaB.a_id;",
    ejemplo: `SELECT c.cliente_id, c.nombre_cliente, o.orden_id
FROM Clientes c
LEFT JOIN Ordenes o ON c.cliente_id = o.cliente_id;`,
    tip: "Útil para hallar registros sin transacciones (evaluando WHERE o.orden_id IS NULL)."
  },
  {
    id: "with-cte",
    nombre: "WITH (CTE)",
    categoria: "Subconsultas & CTEs",
    resumen: "Crea una vista temporal con nombre para estructurar consultas complejas.",
    sintaxis: "WITH NombreCTE AS (\n    SELECT ...\n)\nSELECT * FROM NombreCTE;",
    ejemplo: `WITH VentasPorCliente AS (
    SELECT cliente_id, SUM(total) AS TotalGastado
    FROM Ordenes
    GROUP BY cliente_id
)
SELECT v.*, c.nombre_cliente
FROM VentasPorCliente v
INNER JOIN Clientes c ON v.cliente_id = c.cliente_id
WHERE v.TotalGastado > 5000;`,
    tip: "Reemplaza subconsultas anidadas y permite consultas recursivas en árbol."
  },
  {
    id: "row-number",
    nombre: "ROW_NUMBER() OVER",
    categoria: "Subconsultas & CTEs",
    resumen: "Función de ventana que numera filas secuencialmente dentro de particiones.",
    sintaxis: "SELECT ROW_NUMBER() OVER(PARTITION BY grupo ORDER BY valor DESC) AS Ranking\nFROM tabla;",
    ejemplo: `WITH RankingPrecios AS (
    SELECT producto_id, categoria_id, precio,
           ROW_NUMBER() OVER(PARTITION BY categoria_id ORDER BY precio DESC) AS Posicion
    FROM Productos
)
SELECT * FROM RankingPrecios WHERE Posicion <= 3;`,
    tip: "PARTITION BY divide las filas en grupos; la numeración se reinicia en cada partición."
  },
  {
    id: "stored-procedure",
    nombre: "CREATE PROCEDURE",
    categoria: "Programabilidad",
    resumen: "Rutina SQL precompilada con parámetros que se almacena en el DBMS.",
    sintaxis: "CREATE PROCEDURE sp_Nombre\n    @Parametro INT\nAS\nBEGIN\n    -- Instrucciones SQL\nEND;",
    ejemplo: `CREATE PROCEDURE sp_ActualizarSaldo
    @p_cuenta_id INT,
    @p_monto DECIMAL(10,2)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Cuentas
    SET saldo = saldo + @p_monto
    WHERE cuenta_id = @p_cuenta_id;
END;`,
    tip: "Optimiza el rendimiento, reduce tráfico de red y previene inyecciones SQL."
  },
  {
    id: "trigger",
    nombre: "CREATE TRIGGER",
    categoria: "Programabilidad",
    resumen: "Disparador automático ejecutado ante eventos INSERT, UPDATE o DELETE.",
    sintaxis: "CREATE TRIGGER tr_Nombre\nON Tabla\nAFTER INSERT, UPDATE\nAS\nBEGIN\n    -- Tablas virtuales inserted y deleted\nEND;",
    ejemplo: `CREATE TRIGGER tr_AuditoriaSalarios
ON Empleados
AFTER UPDATE
AS
BEGIN
    IF UPDATE(salario)
    BEGIN
        INSERT INTO LogsSalario (empleado_id, anterior, nuevo, fecha)
        SELECT d.empleado_id, d.salario, i.salario, GETDATE()
        FROM deleted d
        INNER JOIN inserted i ON d.empleado_id = i.empleado_id;
    END
END;`,
    tip: "Utiliza las tablas virtuales 'inserted' (nuevos) y 'deleted' (anteriores)."
  },
  {
    id: "transaction",
    nombre: "BEGIN TRANSACTION / COMMIT",
    categoria: "Transacciones ACID",
    resumen: "Asegura la atomicidad: o se ejecutan todas las operaciones o se cancela todo.",
    sintaxis: "BEGIN TRANSACTION;\n    -- operaciones DML\nCOMMIT TRANSACTION;\n-- ROLLBACK ante fallos",
    ejemplo: `BEGIN TRY
    BEGIN TRANSACTION;
        UPDATE Cuentas SET saldo = saldo - 500 WHERE cuenta_id = 1;
        UPDATE Cuentas SET saldo = saldo + 500 WHERE cuenta_id = 2;
    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
END CATCH;`,
    tip: "ROLLBACK restaura la base de datos al estado previo si ocurre un error."
  },
  {
    id: "case-when",
    nombre: "CASE WHEN",
    categoria: "Consultas & Agrupación",
    resumen: "Evalúa condiciones lógicas (IF-THEN-ELSE) dentro de sentencias SELECT o UPDATE.",
    sintaxis: "CASE\n    WHEN condicion THEN resultado\n    ELSE defecto\nEND",
    ejemplo: `SELECT orden_id, total,
    CASE 
        WHEN total > 5000 THEN 'ALTO VALOR'
        WHEN total > 1000 THEN 'MEDIO'
        ELSE 'ESTÁNDAR'
    END AS CategoriaVenta
FROM Ordenes;`,
    tip: "Siempre debe cerrarse con la palabra clave END."
  },
  {
    id: "merge",
    nombre: "MERGE INTO",
    categoria: "Manipulación DML",
    resumen: "Operación Upsert: actualiza filas existentes e inserta nuevas en un solo paso.",
    sintaxis: "MERGE INTO Destino AS d\nUSING Origen AS o ON d.id = o.id\nWHEN MATCHED THEN UPDATE ...\nWHEN NOT MATCHED THEN INSERT ...;",
    ejemplo: `MERGE INTO Inventario AS dest
USING NuevosLotes AS orig ON dest.codigo = orig.codigo
WHEN MATCHED THEN
    UPDATE SET dest.stock = dest.stock + orig.stock
WHEN NOT MATCHED THEN
    INSERT (codigo, stock) VALUES (orig.codigo, orig.stock);`,
    tip: "Es atómico y mucho más eficiente que validar con IF EXISTS por separado."
  },
  {
    id: "index",
    nombre: "CREATE NONCLUSTERED INDEX",
    categoria: "Optimización",
    resumen: "Crea un árbol B de búsqueda rápida sin alterar el orden físico de la tabla.",
    sintaxis: "CREATE NONCLUSTERED INDEX IX_Tabla_Columna\nON Tabla(columna ASC)\nINCLUDE (otras_columnas);`,",
    ejemplo: `CREATE NONCLUSTERED INDEX IX_Clientes_DNI
ON Clientes(dni ASC)
INCLUDE (nombre, apellido, telefono);`,
    tip: "INCLUDE almacena columnas auxiliares en el nivel hoja evitando lecturas extra a la tabla."
  }
];

// 2. BANCO DE RETOS DEL ROBOT TRAINER
const BANCO_TEST: TestQuestion[] = [
  {
    id: 1,
    titulo: "Filtrar Grupos con Sumatoria",
    enunciado: "Completa la cláusula requerida para filtrar los grupos cuya suma de salarios supere 50,000.",
    codigoConHueco: `SELECT departamento_id, SUM(salario) AS GastoTotal
FROM Empleados
GROUP BY departamento_id
[_____] SUM(salario) > 50000;`,
    respuestaCorrecta: ["having"],
    clausulaNombre: "HAVING",
    pista: "Filtra sobre funciones agregadas (SUM, COUNT). No uses WHERE.",
    explicacionTecnica: "HAVING filtra grupos calculados tras el GROUP BY.",
    dificultad: "Básico"
  },
  {
    id: 2,
    titulo: "Agrupación de Ventas por Asesor",
    enunciado: "Completa la cláusula para consolidar las filas por cada vendedor_id.",
    codigoConHueco: `SELECT vendedor_id, COUNT(*) AS Total, SUM(monto) AS TotalRecaudado
FROM Ventas
[_____] vendedor_id;`,
    respuestaCorrecta: ["group by"],
    clausulaNombre: "GROUP BY",
    pista: "Cláusula de dos palabras para reunir registros por columna.",
    explicacionTecnica: "GROUP BY resume filas idénticas para funciones agregadas.",
    dificultad: "Básico"
  },
  {
    id: 3,
    titulo: "Reversión Segura de Transacción",
    enunciado: "Dentro del bloque CATCH, cancela y deshace las operaciones de la transacción.",
    codigoConHueco: `BEGIN TRY
    BEGIN TRANSACTION;
        UPDATE Cuentas SET saldo = saldo - 200 WHERE id = 1;
        UPDATE Cuentas SET saldo = saldo + 200 WHERE id = 2;
    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    [_____] TRANSACTION;
END CATCH;`,
    respuestaCorrecta: ["rollback"],
    clausulaNombre: "ROLLBACK",
    pista: "Opuesto a COMMIT. Restaura la BD al estado inicial.",
    explicacionTecnica: "ROLLBACK deshace cambios no confirmados (Atomicidad ACID).",
    dificultad: "Intermedio"
  },
  {
    id: 4,
    titulo: "Disparador Automático",
    enunciado: "Completa la sentencia para crear un disparador en la tabla Clientes.",
    codigoConHueco: `CREATE [_____] tr_AuditarClientes
ON Clientes
AFTER INSERT
AS
BEGIN
    INSERT INTO Logs (accion, fecha) VALUES ('Nuevo registro', GETDATE());
END;`,
    respuestaCorrecta: ["trigger"],
    clausulaNombre: "TRIGGER",
    pista: "Objeto que se activa automáticamente ante eventos DML.",
    explicacionTecnica: "Los TRIGGERS responden a INSERT, UPDATE o DELETE.",
    dificultad: "Intermedio"
  },
  {
    id: 5,
    titulo: "Expresión de Tabla Común (CTE)",
    enunciado: "Completa la palabra clave que define una consulta temporal nombrada.",
    codigoConHueco: `[_____] ClientesVIP AS (
    SELECT cliente_id, SUM(monto) AS TotalGastado
    FROM Pedidos
    GROUP BY cliente_id
    HAVING SUM(monto) > 10000
)
SELECT * FROM ClientesVIP;`,
    respuestaCorrecta: ["with"],
    clausulaNombre: "WITH",
    pista: "Palabra reservada de 4 letras que inicia una CTE.",
    explicacionTecnica: "WITH simplifica subconsultas complejas y permite recursividad.",
    dificultad: "Intermedio"
  },
  {
    id: 6,
    titulo: "Partición en Función de Ventana",
    enunciado: "Asigna un ranking de sueldos reiniciando la numeración por cada departamento.",
    codigoConHueco: `SELECT empleado_id, salario,
       ROW_NUMBER() OVER([_____] BY departamento_id ORDER BY salario DESC) AS Ranking
FROM Empleados;`,
    respuestaCorrecta: ["partition"],
    clausulaNombre: "PARTITION",
    pista: "Divide el conjunto de resultados en grupos de ventana.",
    explicacionTecnica: "PARTITION BY segmenta las filas para evaluar funciones de ventana.",
    dificultad: "Avanzado"
  },
  {
    id: 7,
    titulo: "Cruce con Todos los Registros Principales",
    enunciado: "Lista todos los proveedores aunque aún no tengan productos registrados.",
    codigoConHueco: `SELECT p.nombre_proveedor, pr.nombre_producto
FROM Proveedores p
[_____] JOIN Productos pr ON p.proveedor_id = pr.proveedor_id;`,
    respuestaCorrecta: ["left"],
    clausulaNombre: "LEFT",
    pista: "Prioriza conservar todas las filas de la tabla de la izquierda.",
    explicacionTecnica: "LEFT JOIN devuelve toda la tabla izquierda y nulos si no hay coincidencia.",
    dificultad: "Básico"
  },
  {
    id: 8,
    titulo: "Operación Atómica Upsert (MERGE)",
    enunciado: "Completa la cláusula de SQL Server que sincroniza UPDATE e INSERT en un solo comando.",
    codigoConHueco: `[_____] INTO Inventario AS dest
USING Central AS orig ON dest.codigo = orig.codigo
WHEN MATCHED THEN
    UPDATE SET dest.stock = orig.stock
WHEN NOT MATCHED THEN
    INSERT (codigo, stock) VALUES (orig.codigo, orig.stock);`,
    respuestaCorrecta: ["merge"],
    clausulaNombre: "MERGE",
    pista: "Instrucción de 5 letras para combinar actualización e inserción.",
    explicacionTecnica: "MERGE realiza operaciones DML atómicas según coincidencia.",
    dificultad: "Avanzado"
  }
];

export function ClausulasLaboratorio({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  // Pestaña activa por defecto: "robot" para acceso inmediato al test
  const [activeSubTab, setActiveSubTab] = useState<"robot" | "clausulas" | "apuntes">("robot");
  
  // Explorador de cláusulas (Master-Detail)
  const [selectedClauseId, setSelectedClauseId] = useState<string>("group-by");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Robot Trainer
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [evaluationState, setEvaluationState] = useState<"pending" | "correct" | "incorrect">("pending");
  const [showHint, setShowHint] = useState(false);
  const [streakCount, setStreakCount] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [robotSpeech, setRobotSpeech] = useState("¡Hola Jorge! Escribe la cláusula faltante en la consulta y presiona Comprobar.");

  // Apuntes Personales
  const [apuntes, setApuntes] = useState<ApuntePersonal[]>([]);
  const [nuevoTitulo, setNuevoTitulo] = useState("");
  const [nuevaClausula, setNuevaClausula] = useState("");
  const [nuevaNota, setNuevaNota] = useState("");
  const [nuevoCodigo, setNuevoCodigo] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // Cargar apuntes al montar
  useEffect(() => {
    try {
      const saved = localStorage.getItem("upla_apuntes_db2");
      if (saved) {
        setApuntes(JSON.parse(saved));
      } else {
        const defaultNotes: ApuntePersonal[] = [
          {
            id: "1",
            titulo: "Índices No Agrupados con INCLUDE",
            clausula: "CREATE NONCLUSTERED INDEX",
            nota: "Usar columnas INCLUDE en índices no agrupados evita lecturas lookup en la tabla física y acelera búsquedas WHERE.",
            codigo: `CREATE NONCLUSTERED INDEX IX_Clientes_DNI
ON Clientes(dni ASC)
INCLUDE (nombre, apellido);`,
            fecha: "12 Oct 2026"
          },
          {
            id: "2",
            titulo: "Transacciones ACID Seguras",
            clausula: "SET XACT_ABORT ON",
            nota: "SET XACT_ABORT ON cancela y revierte la transacción automáticamente ante errores en tiempo de ejecución.",
            codigo: `SET XACT_ABORT ON;
BEGIN TRANSACTION;
    -- Operaciones DML críticas
COMMIT TRANSACTION;`,
            fecha: "14 Oct 2026"
          }
        ];
        setApuntes(defaultNotes);
        localStorage.setItem("upla_apuntes_db2", JSON.stringify(defaultNotes));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Validación del Robot Trainer
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
      setRobotSpeech(`¡Excelente! "${currentTest.clausulaNombre}" es la respuesta correcta.`);
    } else {
      setEvaluationState("incorrect");
      setStreakCount(0);
      setRobotSpeech(`Incorrecto. Pide una pista con el botón amarillo.`);
    }
  };

  const handleNextQuestion = () => {
    setEvaluationState("pending");
    setUserAnswer("");
    setShowHint(false);
    const nextIdx = (currentTestIndex + 1) % BANCO_TEST.length;
    setCurrentTestIndex(nextIdx);
    setRobotSpeech(`Reto #${nextIdx + 1}: ${BANCO_TEST[nextIdx].titulo}. Completa el espacio faltante.`);
  };

  const handleSelectQuestion = (idx: number) => {
    setCurrentTestIndex(idx);
    setEvaluationState("pending");
    setUserAnswer("");
    setShowHint(false);
    setRobotSpeech(`Reto #${idx + 1}: ${BANCO_TEST[idx].titulo}.`);
  };

  // Filtrado de cláusulas
  const categories = ["Todas", "Consultas & Agrupación", "Cruce de Tablas", "Subconsultas & CTEs", "Programabilidad", "Transacciones ACID", "Manipulación DML", "Optimización"];

  const filteredClausulas = CLAUSULAS_DATABASE.filter(item => {
    const matchCategory = selectedCategory === "Todas" || item.categoria === selectedCategory;
    const matchQuery = item.nombre.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       item.resumen.toLowerCase().includes(searchQuery.toLowerCase());
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

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 animate-in fade-in duration-300 relative z-10">
      
      {/* 1. ENCABEZADO COMPACTO Y ORDENADO */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-5 mb-6 border-b border-cyan-500/20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-400/50 p-1 flex-shrink-0 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            <img src="/BOTS.png" alt="Robot Entrenador" className="w-full h-full object-cover scale-110" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide flex items-center gap-2">
              <span>SQL LAB & ROBOT TRAINER</span>
            </h1>
            <p className="text-xs text-slate-400">
              Práctica interactiva de cláusulas y registro de apuntes de clase
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab("inicio")}
          className="self-stretch sm:self-auto px-4 py-2 bg-[#0B1120] hover:bg-cyan-950 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
        >
          <span>← Volver al Portafolio</span>
        </button>
      </div>

      {/* 2. SELECTOR DE PESTAÑAS (SEGMENTED CONTROL LIMPIO) */}
      <div className="flex items-center gap-2 p-1.5 bg-[#070d17] border border-cyan-500/30 rounded-2xl mb-6 shadow-inner max-w-xl">
        <button
          onClick={() => {
            setActiveSubTab("robot");
            setRobotSpeech("Completa la cláusula en el ejercicio para validar tu conocimiento.");
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeSubTab === "robot"
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Bot className="w-4 h-4 text-cyan-300" />
          <span>Robot Trainer</span>
          {streakCount > 0 && (
            <span className="px-1.5 py-0.2 bg-amber-500 text-white text-[10px] rounded-full font-black flex items-center gap-0.5">
              <Flame className="w-2.5 h-2.5" />
              {streakCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveSubTab("clausulas")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeSubTab === "clausulas"
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <BookOpen className="w-4 h-4 text-cyan-300" />
          <span>Diccionario SQL</span>
        </button>

        <button
          onClick={() => setActiveSubTab("apuntes")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeSubTab === "apuntes"
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Terminal className="w-4 h-4 text-cyan-300" />
          <span>Mis Apuntes</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* SECCIÓN 1: ROBOT TRAINER (TEST INTERACTIVO LIMPIO)       */}
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

          {/* Tarjeta del Ejercicio Actual */}
          <div className="bg-[#0f172a] border border-cyan-500/30 rounded-2xl p-5 sm:p-6 shadow-xl">
            
            {/* Cabecera del Reto con selector de números */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                    Reto {currentTestIndex + 1} de {BANCO_TEST.length}
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

              {/* Botón Pista */}
              <button
                onClick={() => {
                  setShowHint(true);
                  setRobotSpeech(`💡 Pista: ${currentTest.pista}`);
                }}
                className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-semibold transition-all cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Pedir Pista</span>
              </button>
            </div>

            {/* Enunciado en una sola línea clara */}
            <p className="text-xs sm:text-sm text-slate-300 mb-4 font-light">
              {currentTest.enunciado}
            </p>

            {/* Visualizador de Código con el Hueco a Completar */}
            <div className="bg-[#070d17] border border-cyan-500/30 rounded-xl p-4 mb-4 shadow-inner">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/5 text-[10px] text-slate-400 font-mono">
                <span className="text-cyan-400 font-bold">SQL Query (T-SQL)</span>
                <span>Completa el espacio [ ? ? ? ]</span>
              </div>
              <pre className="font-mono text-xs sm:text-sm text-cyan-200 leading-relaxed whitespace-pre-wrap">
                {currentTest.codigoConHueco.split("[_____]").map((part, i, arr) => (
                  <React.Fragment key={i}>
                    <span>{part}</span>
                    {i < arr.length - 1 && (
                      <span className={`inline-block mx-1.5 px-2.5 py-0.5 rounded font-black text-xs sm:text-sm transition-all ${
                        evaluationState === "correct" 
                          ? "bg-green-600 text-white shadow-md shadow-green-500/50" 
                          : "bg-cyan-950 border-2 border-dashed border-cyan-400 text-cyan-300 animate-pulse"
                      }`}>
                        {evaluationState === "correct" ? currentTest.clausulaNombre : "[ ? ? ? ]"}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </pre>
            </div>

            {/* Formulario de Respuesta */}
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
                    disabled={evaluationState === "correct"}
                    className="w-full px-4 py-2.5 bg-[#0B1120] border border-cyan-500/40 focus:border-cyan-400 rounded-xl text-white font-mono text-xs sm:text-sm placeholder-slate-500 focus:outline-none transition-all"
                  />
                  {evaluationState === "correct" && (
                    <CheckCircle2 className="w-5 h-5 text-green-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  )}
                  {evaluationState === "incorrect" && (
                    <XCircle className="w-5 h-5 text-red-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  )}
                </div>

                {evaluationState === "correct" ? (
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Siguiente Reto</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
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

              {/* Feedback conciso */}
              {evaluationState === "correct" && (
                <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span><strong>¡Correcto!</strong> {currentTest.explicacionTecnica}</span>
                </div>
              )}

              {evaluationState === "incorrect" && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-xs flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span><strong>Incorrecto.</strong> {showHint ? currentTest.pista : "Presiona 'Pedir Pista' para recibir una orientación."}</span>
                </div>
              )}
            </form>

            {/* Barra de navegación de preguntas */}
            <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Seleccionar Reto:</span>
              <div className="flex gap-1.5 overflow-x-auto py-1">
                {BANCO_TEST.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectQuestion(idx)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      currentTestIndex === idx
                        ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/30"
                        : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                    }`}
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
      {/* SECCIÓN 2: DICCIONARIO DE CLÁUSULAS (MASTER - DETAIL)     */}
      {/* ======================================================== */}
      {activeSubTab === "clausulas" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 animate-in fade-in duration-300">
          
          {/* COLUMNA IZQUIERDA: LISTA ORDENADA DE CLÁUSULAS (4/12) */}
          <div className="md:col-span-5 lg:col-span-4 space-y-3">
            
            {/* Buscador */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filtrar cláusula..."
                className="w-full pl-8 pr-3 py-2 bg-[#0f172a] border border-cyan-500/30 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Selector de categoría compacto */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] hide-scrollbar">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#0f172a] text-cyan-300 border border-cyan-500/30 rounded-xl px-2.5 py-1.5 text-xs focus:outline-none cursor-pointer"
              >
                {categories.map((c, i) => (
                  <option key={i} value={c} className="bg-[#0B1120] text-white">{c}</option>
                ))}
              </select>
            </div>

            {/* Lista compacta de botones de cláusula */}
            <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
              {filteredClausulas.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedClauseId(item.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                    selectedClause.id === item.id
                      ? "bg-cyan-950/70 border-cyan-400 text-white shadow-md shadow-cyan-500/20"
                      : "bg-[#0f172a]/60 border-white/5 text-slate-300 hover:bg-[#0f172a] hover:border-cyan-500/30"
                  }`}
                >
                  <div>
                    <p className="font-bold text-xs text-white flex items-center gap-1.5">
                      <span>{item.nombre}</span>
                    </p>
                    <span className="text-[10px] text-cyan-400/80">{item.categoria}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 ${selectedClause.id === item.id ? "text-cyan-400" : "text-slate-600"}`} />
                </button>
              ))}
            </div>

          </div>

          {/* COLUMNA DERECHA: VISOR DETALLADO Y LIMPIO (7/12) */}
          <div className="md:col-span-7 lg:col-span-8">
            <div className="bg-[#0f172a] border border-cyan-500/30 rounded-2xl p-5 sm:p-6 shadow-xl sticky top-20">
              
              <div className="flex items-start justify-between gap-3 pb-3 mb-4 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
                    {selectedClause.categoria}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                    {selectedClause.nombre}
                  </h2>
                </div>

                <button
                  onClick={() => {
                    setActiveSubTab("robot");
                    const matchedTest = BANCO_TEST.find(t => t.clausulaNombre.toLowerCase().includes(selectedClause.nombre.toLowerCase().split(" ")[0])) || BANCO_TEST[0];
                    const idx = BANCO_TEST.indexOf(matchedTest);
                    if (idx >= 0) setCurrentTestIndex(idx);
                    setRobotSpeech(`Practica la cláusula ${selectedClause.nombre} aquí.`);
                  }}
                  className="px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer flex-shrink-0"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Entrenar en Robot</span>
                </button>
              </div>

              {/* Resumen conciso */}
              <div className="mb-4">
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                  {selectedClause.resumen}
                </p>
              </div>

              {/* Sintaxis Oficial Compacta */}
              <div className="mb-4">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">
                  Sintaxis Estándar:
                </span>
                <pre className="p-3 bg-[#070d17] border border-white/5 rounded-xl font-mono text-xs text-amber-200 overflow-x-auto">
                  <code>{selectedClause.sintaxis}</code>
                </pre>
              </div>

              {/* Ejemplo de Código con botón Copiar */}
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

              {/* Tip clave en 1 línea */}
              <div className="p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-xl text-xs text-cyan-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span><strong>Regla de Oro:</strong> {selectedClause.tip}</span>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* SECCIÓN 3: MIS APUNTES DE CLASE                           */}
      {/* ======================================================== */}
      {activeSubTab === "apuntes" && (
        <div className="space-y-4 animate-in fade-in duration-300">
          
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                Mis Apuntes Personales de Clase
              </h2>
              <p className="text-xs text-slate-400">
                Registra códigos, tips y apuntes explicados por el docente
              </p>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Nuevo Apunte</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {apuntes.map((apunte) => (
              <div 
                key={apunte.id}
                className="bg-[#0f172a] border border-cyan-900/50 hover:border-cyan-400/40 rounded-xl p-4 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 uppercase">
                        {apunte.clausula}
                      </span>
                      <h3 className="text-sm font-bold text-white mt-1">
                        {apunte.titulo}
                      </h3>
                    </div>
                    <button
                      onClick={() => handleDeleteApunte(apunte.id)}
                      className="p-1 rounded text-red-400 hover:bg-red-500/20 transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 font-light mb-3 leading-relaxed">
                    {apunte.nota}
                  </p>
                </div>

                {apunte.codigo && (
                  <div className="bg-[#070d17] border border-white/5 rounded-lg overflow-hidden mt-2">
                    <div className="flex items-center justify-between px-2.5 py-1 bg-[#0B1120] text-[10px] text-slate-400 font-mono">
                      <span>Script SQL</span>
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
                    <pre className="p-2.5 font-mono text-[11px] text-cyan-200 overflow-x-auto">
                      <code>{apunte.codigo}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>

          {apuntes.length === 0 && (
            <div className="text-center py-10 bg-[#0f172a]/50 rounded-2xl border border-white/5">
              <p className="text-xs text-slate-400">No hay apuntes registrados aún.</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="mt-2 text-cyan-400 text-xs font-bold hover:underline"
              >
                + Registrar mi primer apunte
              </button>
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
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg text-xs"
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

    </div>
  );
}
