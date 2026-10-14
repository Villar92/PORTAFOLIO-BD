"use client";

import React, { useState, useEffect } from "react";
import { 
  Bot, 
  Sparkles, 
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
  RotateCcw, 
  ArrowRight,
  Flame,
  Layers,
  HelpCircle
} from "lucide-react";

interface ClausulaItem {
  id: string;
  nombre: string;
  categoria: string;
  proposito: string;
  sintaxis: string;
  ejemplo: string;
  explicacion: string;
}

interface TestQuestion {
  id: number;
  titulo: string;
  enunciado: string;
  codigoConHueco: string; // usar [_____] como hueco
  respuestaCorrecta: string[]; // respuestas validas en minusculas
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

// 1. BANCO DE CLÁUSULAS FUNDAMENTALES Y AVANZADAS DE BASE DE DATOS II
const CLAUSULAS_DATABASE: ClausulaItem[] = [
  {
    id: "group-by",
    nombre: "GROUP BY",
    categoria: "Consultas & Agrupación",
    proposito: "Agrupa filas con valores idénticos en filas de resumen (totales, conteos, promedios).",
    sintaxis: "SELECT columna, COUNT(*) \nFROM tabla \nGROUP BY columna;",
    ejemplo: `-- Contar número de empleados en cada departamento
SELECT departamento_id, COUNT(*) AS TotalEmpleados, AVG(salario) AS SalarioPromedio
FROM Empleados
GROUP BY departamento_id;`,
    explicacion: "Toda columna en el SELECT que no esté en una función de agregación (SUM, AVG, COUNT, etc.) DEBE estar en la cláusula GROUP BY."
  },
  {
    id: "having",
    nombre: "HAVING",
    categoria: "Consultas & Agrupación",
    proposito: "Filtra grupos ya calculados por GROUP BY. Funciona como un WHERE pero sobre agregaciones.",
    sintaxis: "SELECT columna, COUNT(*) \nFROM tabla \nGROUP BY columna \nHAVING COUNT(*) > valor;",
    ejemplo: `-- Mostrar solo departamentos con más de 5 empleados y salario promedio > 3000
SELECT departamento_id, COUNT(*) AS Cantidad, AVG(salario) AS Promedio
FROM Empleados
GROUP BY departamento_id
HAVING COUNT(*) > 5 AND AVG(salario) > 3000;`,
    explicacion: "WHERE filtra filas individuales antes de agrupar; HAVING filtra los grupos resultantes después de agrupar."
  },
  {
    id: "inner-join",
    nombre: "INNER JOIN",
    categoria: "Cruce de Tablas",
    proposito: "Devuelve registros que tienen valores coincidentes en ambas tablas relacionadas mediante una clave foránea.",
    sintaxis: "SELECT * \nFROM TablaA \nINNER JOIN TablaB ON TablaA.id = TablaB.a_id;",
    ejemplo: `-- Consultar órdenes con los datos del cliente que las emitió
SELECT o.orden_id, c.nombre_cliente, o.fecha_pedido, o.total
FROM Ordenes o
INNER JOIN Clientes c ON o.cliente_id = c.cliente_id;`,
    explicacion: "Solo aparecen las filas donde existe coincidencia exacta en ambas tablas. Si una orden no tiene cliente, no sale en el resultado."
  },
  {
    id: "left-join",
    nombre: "LEFT JOIN",
    categoria: "Cruce de Tablas",
    proposito: "Devuelve todos los registros de la tabla izquierda y las filas coincidentes de la tabla derecha (con NULL si no hay match).",
    sintaxis: "SELECT * \nFROM TablaA \nLEFT JOIN TablaB ON TablaA.id = TablaB.a_id;",
    ejemplo: `-- Listar TODOS los clientes, incluso si nunca han realizado una compra
SELECT c.cliente_id, c.nombre_cliente, o.orden_id, ISNULL(o.total, 0) AS Total
FROM Clientes c
LEFT JOIN Ordenes o ON c.cliente_id = o.cliente_id;`,
    explicacion: "Ideal para detectar registros huérfanos o usuarios sin actividad (evaluando WHERE o.orden_id IS NULL)."
  },
  {
    id: "with-cte",
    nombre: "WITH (CTE - Common Table Expression)",
    categoria: "Subconsultas & CTEs",
    proposito: "Crea un conjunto de resultados temporal con nombre que se puede consultar en la misma sentencia.",
    sintaxis: "WITH NombreCTE AS (\n    SELECT ...\n)\nSELECT * FROM NombreCTE;",
    ejemplo: `-- CTE para calcular ventas anuales y luego filtrar las mejores
WITH VentasPorCliente AS (
    SELECT cliente_id, SUM(total) AS TotalGastado, COUNT(orden_id) AS CantidadPedidos
    FROM Ordenes
    GROUP BY cliente_id
)
SELECT v.*, c.nombre_cliente
FROM VentasPorCliente v
INNER JOIN Clientes c ON v.cliente_id = c.cliente_id
WHERE v.TotalGastado > 10000;`,
    explicacion: "Hace que el código sea mucho más limpio que usar subconsultas anidadas y permite recursividad (jerarquías organizacionales)."
  },
  {
    id: "row-number",
    nombre: "ROW_NUMBER() OVER(PARTITION BY...)",
    categoria: "Subconsultas & CTEs",
    proposito: "Función de ventana que numera las filas secuencialmente dentro de una partición específica.",
    sintaxis: "SELECT ROW_NUMBER() OVER(PARTITION BY categoria ORDER BY precio DESC) AS Ranking \nFROM Productos;",
    ejemplo: `-- Obtener los 2 productos más caros de cada categoría
WITH ProductosRankeados AS (
    SELECT producto_id, nombre, categoria_id, precio,
           ROW_NUMBER() OVER(PARTITION BY categoria_id ORDER BY precio DESC) AS Posicion
    FROM Productos
)
SELECT * FROM ProductosRankeados WHERE Posicion <= 2;`,
    explicacion: "PARTITION BY divide las filas en particiones (como un mini-grupo) y numera cada partición reiniciando el conteo en 1."
  },
  {
    id: "stored-procedure",
    nombre: "CREATE PROCEDURE",
    categoria: "Programabilidad T-SQL",
    proposito: "Bloque de código SQL precompilado que se guarda en el motor de base de datos para ejecutar operaciones complejas con parámetros.",
    sintaxis: "CREATE PROCEDURE sp_Nombre\n    @Param1 INT,\n    @Param2 VARCHAR(50)\nAS\nBEGIN\n    -- Instrucciones SQL\nEND;",
    ejemplo: `-- Procedimiento para registrar un pago y actualizar estado
CREATE PROCEDURE sp_RegistrarPago
    @p_orden_id INT,
    @p_monto DECIMAL(10,2)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;
        INSERT INTO Pagos (orden_id, monto, fecha_pago)
        VALUES (@p_orden_id, @p_monto, GETDATE());

        UPDATE Ordenes
        SET estado = 'PAGADO'
        WHERE orden_id = @p_orden_id;
    COMMIT TRANSACTION;
END;`,
    explicacion: "Aumenta la seguridad (previene SQL Injection), reduce el tráfico de red y mejora el rendimiento al estar precompilado en el DBMS."
  },
  {
    id: "trigger",
    nombre: "CREATE TRIGGER (AFTER / INSTEAD OF)",
    categoria: "Programabilidad T-SQL",
    proposito: "Disparador automático que se ejecuta en respuesta a un evento DML (INSERT, UPDATE o DELETE) en una tabla.",
    sintaxis: "CREATE TRIGGER tr_Nombre\nON Tabla\nAFTER INSERT, UPDATE\nAS\nBEGIN\n    -- Lógica con tablas virtuales inserted o deleted\nEND;",
    ejemplo: `-- Trigger de auditoría para registrar cada cambio de precio
CREATE TRIGGER tr_AuditoriaPrecio
ON Productos
AFTER UPDATE
AS
BEGIN
    IF UPDATE(precio)
    BEGIN
        INSERT INTO HistorialPrecios (producto_id, precio_anterior, precio_nuevo, fecha_modificacion)
        SELECT d.producto_id, d.precio, i.precio, GETDATE()
        FROM deleted d
        INNER JOIN inserted i ON d.producto_id = i.producto_id;
    END
END;`,
    explicacion: "Utiliza las tablas virtuales 'inserted' (datos nuevos o recién agregados) y 'deleted' (datos antiguos o eliminados)."
  },
  {
    id: "transaction",
    nombre: "BEGIN TRANSACTION / COMMIT / ROLLBACK",
    categoria: "Transacciones & ACID",
    proposito: "Garantiza el principio ACID (Atomicidad, Consistencia, Aislamiento, Durabilidad). Todo se ejecuta o nada se aplica.",
    sintaxis: "BEGIN TRANSACTION;\n    -- operaciones DML\n    IF @@ERROR = 0\n        COMMIT TRANSACTION;\n    ELSE\n        ROLLBACK TRANSACTION;",
    ejemplo: `-- Transferencia bancaria segura entre dos cuentas
BEGIN TRY
    BEGIN TRANSACTION;
        -- 1. Descontar saldo cuenta origen
        UPDATE Cuentas SET saldo = saldo - 500 WHERE cuenta_id = 101;

        -- 2. Abonar saldo cuenta destino
        UPDATE Cuentas SET saldo = saldo + 500 WHERE cuenta_id = 202;

        -- 3. Confirmar transacción
        COMMIT TRANSACTION;
        PRINT 'Transferencia exitosa.';
END TRY
BEGIN CATCH
    -- 4. Revertir ante cualquier fallo
    ROLLBACK TRANSACTION;
    PRINT 'Error detectado. Se revirtieron los cambios: ' + ERROR_MESSAGE();
END CATCH;`,
    explicacion: "Si ocurre una falla entre el descuento y el abono, ROLLBACK cancela todo para evitar perder dinero."
  },
  {
    id: "case-when",
    nombre: "CASE WHEN ... THEN ... ELSE ... END",
    categoria: "Consultas & Agrupación",
    proposito: "Añade lógica condicional (IF-THEN-ELSE) directamente dentro de una consulta SELECT o UPDATE.",
    sintaxis: "CASE \n    WHEN condicion1 THEN resultado1\n    ELSE resultadoDefecto\nEND",
    ejemplo: `-- Clasificación de riesgo de crédito de clientes
SELECT cliente_id, nombre, saldo_deuda,
    CASE 
        WHEN saldo_deuda = 0 THEN 'Sin Deuda'
        WHEN saldo_deuda <= 1000 THEN 'Riesgo Bajo'
        WHEN saldo_deuda <= 5000 THEN 'Riesgo Medio'
        ELSE 'Riesgo Alto - Bloquear Crédito'
    END AS CategoriaRiesgo
FROM Clientes;`,
    explicacion: "Permite transformar valores crudos en categorías legibles directamente en el motor de base de datos."
  },
  {
    id: "clustered-index",
    nombre: "CREATE CLUSTERED INDEX",
    categoria: "Índices & Optimización",
    proposito: "Define el orden físico en el que se almacenan las filas en el disco (solo puede existir 1 por tabla).",
    sintaxis: "CREATE CLUSTERED INDEX IX_Tabla_Columna \nON Tabla(columna ASC);",
    ejemplo: `-- Optimizar búsquedas masivas por fecha de emisión
CREATE CLUSTERED INDEX IX_Facturas_FechaEmision
ON Facturas(fecha_emision ASC);`,
    explicacion: "Por defecto, la clave primaria (PRIMARY KEY) crea automáticamente un índice Clustered a menos que se especifique lo contrario."
  },
  {
    id: "merge",
    nombre: "MERGE INTO (Upsert)",
    categoria: "Manipulación DML",
    proposito: "Inserta, actualiza o elimina filas en una tabla de destino según los resultados de una unión con una tabla de origen en un solo paso.",
    sintaxis: "MERGE INTO Destino AS d\nUSING Origen AS o ON d.id = o.id\nWHEN MATCHED THEN UPDATE ...\nWHEN NOT MATCHED THEN INSERT ...;",
    ejemplo: `-- Sincronizar catálogo diario de productos
MERGE INTO ProductosCatalogo AS dest
USING ProductosNuevos AS orig ON dest.codigo = orig.codigo
WHEN MATCHED THEN
    UPDATE SET dest.precio = orig.precio, dest.stock = orig.stock
WHEN NOT MATCHED THEN
    INSERT (codigo, nombre, precio, stock)
    VALUES (orig.codigo, orig.nombre, orig.precio, orig.stock);`,
    explicacion: "Reemplaza la necesidad de hacer primero un IF EXISTS con UPDATE y luego un INSERT separado, siendo mucho más atómico y veloz."
  }
];

// 2. BANCO DE EJERCICIOS PARA EL ROBOT TRAINER
const BANCO_TEST: TestQuestion[] = [
  {
    id: 1,
    titulo: "Filtrar Grupos con Sumatoria",
    enunciado: "Se necesita obtener los departamentos cuyo gasto total en salarios sea mayor a 50,000. Completa la cláusula que filtra el grupo ya formado.",
    codigoConHueco: `SELECT departamento_id, SUM(salario) AS GastoTotal
FROM Empleados
GROUP BY departamento_id
[_____] SUM(salario) > 50000;`,
    respuestaCorrecta: ["having"],
    clausulaNombre: "HAVING",
    pista: "No puedes usar WHERE aquí porque SUM() es una función de agregación. ¿Qué cláusula filtra después del GROUP BY?",
    explicacionTecnica: "¡Exacto! La cláusula HAVING se utiliza exclusivamente para filtrar condiciones basadas en funciones de agregación (SUM, COUNT, AVG) sobre grupos generados.",
    dificultad: "Básico"
  },
  {
    id: 2,
    titulo: "Agrupación de Ventas por Vendedor",
    enunciado: "El gerente solicita el total vendido por cada asesor. Completa la cláusula requerida para resumir los registros por vendedor.",
    codigoConHueco: `SELECT vendedor_id, COUNT(*) AS TotalVentas, SUM(monto) AS TotalRecaudado
FROM Ventas
[_____] vendedor_id;`,
    respuestaCorrecta: ["group by"],
    clausulaNombre: "GROUP BY",
    pista: "Debes consolidar o reunir las filas que tengan el mismo vendedor_id.",
    explicacionTecnica: "¡Correcto! GROUP BY consolida múltiples filas con valores idénticos en filas únicas de resumen para calcular métricas agregadas.",
    dificultad: "Básico"
  },
  {
    id: 3,
    titulo: "Reversión Segura en Caso de Error",
    enunciado: "En un bloque de control de errores (TRY...CATCH), si una instrucción falla, se debe anular y deshacer todos los cambios realizados en la transacción.",
    codigoConHueco: `BEGIN TRY
    BEGIN TRANSACTION;
        UPDATE Cuentas SET saldo = saldo - 200 WHERE id = 1;
        UPDATE Cuentas SET saldo = saldo + 200 WHERE id = 2;
    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    -- Cancelar y revertir toda la operación
    [_____] TRANSACTION;
    PRINT 'Transacción abortada correctamente.';
END CATCH;`,
    respuestaCorrecta: ["rollback"],
    clausulaNombre: "ROLLBACK",
    pista: "Es el comando opuesto a COMMIT. Vuelve la base de datos al estado exacto antes de que iniciara la transacción.",
    explicacionTecnica: "¡Brillante! ROLLBACK TRANSACTION restaura todos los datos modificados al punto inicial antes del BEGIN TRANSACTION, garantizando la Atomicidad (ACID).",
    dificultad: "Intermedio"
  },
  {
    id: 4,
    titulo: "Disparador Automático de Auditoría",
    enunciado: "Se requiere crear un disparador que se active inmediatamente después de que un nuevo cliente haya sido insertado en la tabla Clientes.",
    codigoConHueco: `CREATE [_____] tr_AuditarNuevoCliente
ON Clientes
AFTER INSERT
AS
BEGIN
    INSERT INTO Logs (accion, fecha) VALUES ('Nuevo cliente registrado', GETDATE());
END;`,
    respuestaCorrecta: ["trigger"],
    clausulaNombre: "TRIGGER",
    pista: "Es un objeto de programabilidad que 'dispara' una acción automática ante eventos DML.",
    explicacionTecnica: "¡Muy bien! Un TRIGGER es un objeto que reside en la base de datos y se ejecuta automáticamente ante instrucciones INSERT, UPDATE o DELETE.",
    dificultad: "Intermedio"
  },
  {
    id: 5,
    titulo: "Expresión de Tabla Común (CTE)",
    enunciado: "Completa la cláusula con la que se declara una CTE (Common Table Expression) antes de ejecutar la consulta principal.",
    codigoConHueco: `[_____] ClientesVIP AS (
    SELECT cliente_id, SUM(monto) AS TotalGastado
    FROM Pedidos
    GROUP BY cliente_id
    HAVING SUM(monto) > 10000
)
SELECT c.nombre, vip.TotalGastado
FROM ClientesVIP vip
INNER JOIN Clientes c ON vip.cliente_id = c.cliente_id;`,
    respuestaCorrecta: ["with"],
    clausulaNombre: "WITH",
    pista: "Palabra reservada en inglés de 4 letras que inicia la definición de una expresión temporal con nombre.",
    explicacionTecnica: "¡Excelente! La palabra clave WITH define un CTE, simplificando subconsultas complejas y mejorando la legibilidad del código SQL.",
    dificultad: "Intermedio"
  },
  {
    id: 6,
    titulo: "Función de Ventana y Partición",
    enunciado: "Queremos asignar un ranking de sueldos (del más alto al más bajo) reiniciando la numeración dentro de cada departamento.",
    codigoConHueco: `SELECT empleado_id, nombre, departamento_id, salario,
       ROW_NUMBER() OVER([_____] BY departamento_id ORDER BY salario DESC) AS RankingDepto
FROM Empleados;`,
    respuestaCorrecta: ["partition"],
    clausulaNombre: "PARTITION",
    pista: "Divide el conjunto de resultados en particiones de ventana sin usar GROUP BY tradicional.",
    explicacionTecnica: "¡Genial! PARTITION BY divide las filas en particiones para que la función de ventana ROW_NUMBER() se aplique de forma independiente en cada grupo.",
    dificultad: "Avanzado"
  },
  {
    id: 7,
    titulo: "Unir Todos los Registros de la Izquierda",
    enunciado: "Necesitamos un listado de todos los proveedores, e incluir los productos que suministran si los tienen (los que no tienen productos deben salir con NULL).",
    codigoConHueco: `SELECT p.nombre_proveedor, pr.nombre_producto
FROM Proveedores p
[_____] JOIN Productos pr ON p.proveedor_id = pr.proveedor_id;`,
    respuestaCorrecta: ["left"],
    clausulaNombre: "LEFT",
    pista: "Indica que se prioriza la tabla situada a la izquierda (Proveedores).",
    explicacionTecnica: "¡Correcto! LEFT JOIN preserva todas las filas de la tabla izquierda independientemente de si existen coincidencias en la tabla derecha.",
    dificultad: "Básico"
  },
  {
    id: 8,
    titulo: "Sincronización Atómica de Tablas",
    enunciado: "Completa la cláusula especial de SQL Server que permite hacer UPDATE en registros existentes e INSERT en nuevos registros en una sola sentencia.",
    codigoConHueco: `[_____] INTO InventarioLocal AS dest
USING InventarioCentral AS orig ON dest.codigo = orig.codigo
WHEN MATCHED THEN
    UPDATE SET dest.cantidad = orig.cantidad
WHEN NOT MATCHED THEN
    INSERT (codigo, cantidad) VALUES (orig.codigo, orig.cantidad);`,
    respuestaCorrecta: ["merge"],
    clausulaNombre: "MERGE",
    pista: "Operación comúnmente llamada 'Upsert' (Update + Insert) en SQL Server.",
    explicacionTecnica: "¡Fantástico! La instrucción MERGE INTO evalúa condiciones de cruce y ejecuta UPDATE, INSERT o DELETE atómicamente en un solo ciclo.",
    dificultad: "Avanzado"
  }
];

export function ClausulasLaboratorio({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const [activeSubTab, setActiveSubTab] = useState<"clausulas" | "robot" | "apuntes">("clausulas");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Estados del Robot Trainer
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [evaluationState, setEvaluationState] = useState<"pending" | "correct" | "incorrect">("pending");
  const [showHint, setShowHint] = useState(false);
  const [streakCount, setStreakCount] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [robotSpeech, setRobotSpeech] = useState("¡Hola Jorge! Soy tu Robot Entrenador de Base de Datos II. Pon a prueba tus habilidades completando las cláusulas en los ejercicios. ¿Listo para el reto?");

  // Estados de Apuntes Personales
  const [apuntes, setApuntes] = useState<ApuntePersonal[]>([]);
  const [nuevoTitulo, setNuevoTitulo] = useState("");
  const [nuevaClausula, setNuevaClausula] = useState("");
  const [nuevaNota, setNuevaNota] = useState("");
  const [nuevoCodigo, setNuevoCodigo] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // Cargar apuntes desde localStorage al montar
  useEffect(() => {
    try {
      const saved = localStorage.getItem("upla_apuntes_db2");
      if (saved) {
        setApuntes(JSON.parse(saved));
      } else {
        // Ejemplos por defecto
        const defaultNotes: ApuntePersonal[] = [
          {
            id: "1",
            titulo: "Optimización con Non-Clustered Indexes",
            clausula: "CREATE NONCLUSTERED INDEX",
            nota: "El docente Raul Fernandez explicó que los índices no agrupados crean una estructura B-Tree separada con punteros a las filas reales. Ideal para columnas en WHERE y ORDER BY.",
            codigo: `-- Índice para búsquedas frecuentes de clientes por DNI
CREATE NONCLUSTERED INDEX IX_Clientes_DNI
ON Clientes(dni ASC)
INCLUDE (nombre, apellido);`,
            fecha: "12 Oct 2026"
          },
          {
            id: "2",
            titulo: "Regla de oro de Transacciones ACID",
            clausula: "SET XACT_ABORT ON",
            nota: "Siempre colocar SET XACT_ABORT ON antes de BEGIN TRANSACTION para asegurar que si ocurre un error en tiempo de ejecución, la transacción se cancele automáticamente sin dejar bloqueos colgados.",
            codigo: `SET XACT_ABORT ON;
BEGIN TRANSACTION;
    -- Operaciones críticas
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
    if (confirm("¿Deseas eliminar este apunte?")) {
      const updated = apuntes.filter(a => a.id !== id);
      setApuntes(updated);
      localStorage.setItem("upla_apuntes_db2", JSON.stringify(updated));
    }
  };

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Robot Trainer Logic
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
      setRobotSpeech(`🎉 ¡Excelente Jorge! Has acertado la cláusula ${currentTest.clausulaNombre}. ${currentTest.explicacionTecnica}`);
    } else {
      setEvaluationState("incorrect");
      setStreakCount(0);
      setRobotSpeech(`⚠️ Cerca pero no es correcto. Observa la pista o revisa la sintaxis requerida para este caso.`);
    }
  };

  const handleNextQuestion = () => {
    setEvaluationState("pending");
    setUserAnswer("");
    setShowHint(false);
    const nextIdx = (currentTestIndex + 1) % BANCO_TEST.length;
    setCurrentTestIndex(nextIdx);
    setRobotSpeech(`Reto #${nextIdx + 1}: ${BANCO_TEST[nextIdx].titulo}. Lee con atención el enunciado y completa el fragmento de código.`);
  };

  // Filtrado de cláusulas
  const categories = ["Todas", "Consultas & Agrupación", "Cruce de Tablas", "Subconsultas & CTEs", "Programabilidad T-SQL", "Transacciones & ACID", "Índices & Optimización", "Manipulación DML"];

  const filteredClausulas = CLAUSULAS_DATABASE.filter(item => {
    const matchCategory = selectedCategory === "Todas" || item.categoria === selectedCategory;
    const matchQuery = item.nombre.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       item.proposito.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       item.ejemplo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchQuery;
  });

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative z-10">
      
      {/* 1. ENCABEZADO PRINCIPAL CON ROBOT ASISTENTE */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#0f172a]/95 via-[#0B1120]/95 to-[#082f49]/90 border border-cyan-500/30 shadow-[0_0_50px_rgba(34,211,238,0.15)] p-6 sm:p-8 backdrop-blur-xl mb-8 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-cyan-400/10 blur-[90px] rounded-full pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            {/* Avatar Robot */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-cyan-950/80 border-2 border-cyan-400/50 p-1 flex-shrink-0 shadow-[0_0_25px_rgba(34,211,238,0.4)] flex items-center justify-center overflow-hidden">
              <img 
                src="/BOTS.png" 
                alt="Robot Entrenador" 
                className="w-full h-full object-cover scale-110"
              />
              <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0B1120] animate-pulse"></span>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/40 mb-2">
                <Database className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-cyan-300 text-xs font-bold tracking-widest uppercase">Laboratorio de Base de Datos II</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                CLÁUSULAS, APUNTES <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">& ROBOT TRAINER</span>
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl font-light">
                Repositorio interactivo para consultar sintaxis, registrar apuntes de clase y poner a prueba tus conocimientos con ejercicios de código guiados por el robot.
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab("inicio")}
            className="flex-shrink-0 px-5 py-2.5 bg-cyan-950/40 hover:bg-cyan-500 hover:text-white text-cyan-300 border border-cyan-500/40 rounded-xl text-xs font-bold tracking-wider transition-all shadow-md cursor-pointer flex items-center gap-2"
          >
            <span>Volver al Portafolio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* SELECTOR DE SUBPESTAÑAS */}
        <div className="flex flex-wrap gap-2.5 mt-8 pt-6 border-t border-cyan-500/20">
          <button
            onClick={() => setActiveSubTab("clausulas")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeSubTab === "clausulas"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 border border-cyan-300/40"
                : "bg-[#0B1120]/60 text-slate-300 hover:text-white hover:bg-white/5 border border-white/5"
            }`}
          >
            <BookOpen className="w-4 h-4 text-cyan-300" />
            <span>Biblioteca de Cláusulas ({CLAUSULAS_DATABASE.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveSubTab("robot");
              setRobotSpeech(`¡Excelente elección! Vamos a practicar con retos de código reales. Completa el hueco y presiona Enter.`);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeSubTab === "robot"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 border border-cyan-300/40"
                : "bg-[#0B1120]/60 text-slate-300 hover:text-white hover:bg-white/5 border border-white/5"
            }`}
          >
            <Bot className="w-4 h-4 text-cyan-300" />
            <span>Robot Trainer: Test de Cláusulas</span>
            {streakCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-black animate-pulse flex items-center gap-1">
                <Flame className="w-3 h-3" />
                {streakCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveSubTab("apuntes")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeSubTab === "apuntes"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 border border-cyan-300/40"
                : "bg-[#0B1120]/60 text-slate-300 hover:text-white hover:bg-white/5 border border-white/5"
            }`}
          >
            <Terminal className="w-4 h-4 text-cyan-300" />
            <span>Mis Apuntes de Clase ({apuntes.length})</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. PESTAÑA 1: BIBLIOTECA DE CLÁUSULAS & EJEMPLOS SQL    */}
      {/* ======================================================== */}
      {activeSubTab === "clausulas" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Barra de Búsqueda y Filtros */}
          <div className="bg-[#0f172a]/90 border border-cyan-500/20 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-md flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar cláusula (ej. HAVING, TRIGGER, JOIN, CTE)..."
                className="w-full pl-10 pr-4 py-2 bg-[#0B1120] border border-cyan-500/30 rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 hide-scrollbar">
              <span className="text-xs text-slate-400 font-medium whitespace-nowrap mr-1 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                Categoría:
              </span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-[#0B1120] text-cyan-300 border border-cyan-500/30 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                {categories.map((cat, i) => (
                  <option key={i} value={cat} className="bg-[#0f172a] text-white">{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid de Cláusulas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredClausulas.map((item) => (
              <div 
                key={item.id}
                className="group relative bg-[#0f172a]/80 border border-cyan-900/50 hover:border-cyan-400/60 rounded-2xl p-5 sm:p-6 backdrop-blur-md shadow-xl hover:shadow-[0_8px_30px_rgba(34,211,238,0.15)] transition-all duration-300 flex flex-col overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-400/80 transition-all duration-500"></div>
                
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold tracking-wider uppercase mb-1.5">
                      {item.categoria}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide group-hover:text-cyan-300 transition-colors">
                      {item.nombre}
                    </h3>
                  </div>

                  <button
                    onClick={() => {
                      setActiveSubTab("robot");
                      const matchedTest = BANCO_TEST.find(t => t.clausulaNombre.toLowerCase() === item.nombre.toLowerCase()) || BANCO_TEST[0];
                      const idx = BANCO_TEST.indexOf(matchedTest);
                      if (idx >= 0) setCurrentTestIndex(idx);
                      setRobotSpeech(`¡Hora de practicar la cláusula ${item.nombre}! Completa el ejercicio.`);
                    }}
                    className="flex-shrink-0 px-3 py-1.5 bg-cyan-950/60 hover:bg-cyan-500 hover:text-white text-cyan-300 border border-cyan-500/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                    title="Probar en el Robot Trainer"
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>Practicar</span>
                  </button>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm font-light mb-4 leading-relaxed">
                  {item.proposito}
                </p>

                {/* Explicación Técnica */}
                <div className="p-3 bg-cyan-950/30 border border-cyan-500/20 rounded-xl mb-4 text-xs text-cyan-200/90 leading-relaxed">
                  <span className="font-bold text-cyan-300 mr-1">💡 Regla clave:</span>
                  {item.explicacion}
                </div>

                {/* Bloque de Código de Ejemplo */}
                <div className="mt-auto bg-[#070d17] border border-cyan-500/20 rounded-xl overflow-hidden shadow-inner">
                  <div className="flex items-center justify-between px-3 py-2 bg-[#0B1120] border-b border-white/5 text-[11px] text-slate-400">
                    <span className="font-mono text-cyan-400 font-bold flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5" />
                      Ejemplo SQL Server (T-SQL)
                    </span>
                    <button
                      onClick={() => handleCopyCode(item.id, item.ejemplo)}
                      className="flex items-center gap-1 text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-400" />
                          <span className="text-green-400">Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 overflow-x-auto font-mono text-xs text-cyan-200 leading-relaxed selection:bg-cyan-500/30">
                    <code>{item.ejemplo}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>

          {filteredClausulas.length === 0 && (
            <div className="text-center py-12 bg-[#0f172a]/50 rounded-2xl border border-white/5">
              <Database className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">No se encontraron cláusulas para &quot;{searchQuery}&quot;</p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedCategory("Todas"); }}
                className="mt-3 text-cyan-400 text-xs font-bold hover:underline"
              >
                Limpiar búsqueda
              </button>
            </div>
          )}

        </div>
      )}

      {/* ======================================================== */}
      {/* 3. PESTAÑA 2: ROBOT TRAINER (TEST DE COMPLETAR CLÁUSULA) */}
      {/* ======================================================== */}
      {activeSubTab === "robot" && (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
          
          {/* Diálogo del Robot con Avatar */}
          <div className="relative bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border border-cyan-400/40 rounded-2xl p-5 shadow-[0_0_30px_rgba(34,211,238,0.15)] flex flex-col sm:flex-row items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-950 border border-cyan-400/50 p-1 flex-shrink-0 flex items-center justify-center shadow-lg">
              <img src="/BOTS.png" alt="Robot Entrenador" className="w-full h-full object-cover scale-110" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest flex items-center gap-1">
                  <Bot className="w-3.5 h-3.5" />
                  Entrenador SQL AI
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              </div>
              <p className="text-sm text-cyan-50 font-medium leading-relaxed">
                &ldquo;{robotSpeech}&rdquo;
              </p>
            </div>

            {/* Scorecard */}
            <div className="flex items-center gap-3 bg-[#0B1120]/80 px-4 py-2 rounded-xl border border-cyan-500/30 flex-shrink-0">
              <div className="text-center">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Racha</p>
                <p className="text-base font-black text-amber-400 flex items-center justify-center gap-1">
                  <Flame className="w-3.5 h-3.5" />
                  {streakCount}
                </p>
              </div>
              <div className="w-[1px] h-6 bg-white/10"></div>
              <div className="text-center">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Aciertos</p>
                <p className="text-base font-black text-cyan-400 flex items-center justify-center gap-1">
                  <Trophy className="w-3.5 h-3.5" />
                  {totalCorrect}
                </p>
              </div>
            </div>
          </div>

          {/* Tarjeta del Ejercicio Actual */}
          <div className="bg-[#0f172a] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            
            {/* Header del Reto */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-500/30 text-[10px] font-bold">
                    Reto {currentTestIndex + 1} de {BANCO_TEST.length}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    currentTest.dificultad === "Básico" ? "bg-emerald-950 text-emerald-300 border border-emerald-500/30" :
                    currentTest.dificultad === "Intermedio" ? "bg-amber-950 text-amber-300 border border-amber-500/30" :
                    "bg-red-950 text-red-300 border border-red-500/30"
                  }`}>
                    {currentTest.dificultad}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  {currentTest.titulo}
                </h2>
              </div>

              {/* Botón de Pista */}
              <button
                onClick={() => {
                  setShowHint(true);
                  setRobotSpeech(`💡 Pista para Jorge: ${currentTest.pista}`);
                }}
                className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-semibold transition-all cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Pedir Pista al Robot</span>
              </button>
            </div>

            {/* Enunciado del Problema */}
            <div className="mb-6">
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-light">
                {currentTest.enunciado}
              </p>
            </div>

            {/* Código con el Espacio a Completar */}
            <div className="bg-[#070d17] border border-cyan-500/30 rounded-2xl p-5 mb-6 font-mono text-xs sm:text-sm text-cyan-200 leading-loose shadow-inner relative">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2 flex items-center justify-between border-b border-white/5 pb-1">
                <span>SQL Server Management Studio Query</span>
                <span>Completa la palabra clave faltante</span>
              </div>
              <pre className="whitespace-pre-wrap">
                {currentTest.codigoConHueco.split("[_____]").map((part, i, arr) => (
                  <React.Fragment key={i}>
                    <span>{part}</span>
                    {i < arr.length - 1 && (
                      <span className="inline-block mx-1.5 px-3 py-0.5 bg-cyan-950 border-2 border-dashed border-cyan-400 text-white rounded font-bold animate-pulse text-xs sm:text-sm">
                        {evaluationState === "correct" ? currentTest.clausulaNombre : "[ ? ? ? ]"}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </pre>
            </div>

            {/* Formulario de Respuesta */}
            <form onSubmit={handleCheckAnswer} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => {
                      setUserAnswer(e.target.value);
                      if (evaluationState !== "pending") setEvaluationState("pending");
                    }}
                    placeholder="Escribe la cláusula aquí (ej. GROUP BY, HAVING, TRIGGER)..."
                    disabled={evaluationState === "correct"}
                    className="w-full px-4 py-3 bg-[#0B1120] border-2 border-cyan-500/40 focus:border-cyan-400 rounded-xl text-white font-mono text-sm placeholder-slate-500 focus:outline-none transition-all"
                  />
                  {evaluationState === "correct" && (
                    <CheckCircle2 className="w-5 h-5 text-green-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  )}
                  {evaluationState === "incorrect" && (
                    <XCircle className="w-5 h-5 text-red-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  )}
                </div>

                {evaluationState === "correct" ? (
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-green-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Siguiente Reto</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Comprobar</span>
                    <Check className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Feedback del Test */}
              {evaluationState === "correct" && (
                <div className="p-4 bg-green-500/10 border border-green-500/40 rounded-xl text-green-200 text-xs sm:text-sm animate-in fade-in duration-300 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-green-300">¡Respuesta Correcta: {currentTest.clausulaNombre}!</p>
                    <p className="mt-1 text-slate-300 leading-relaxed font-light">{currentTest.explicacionTecnica}</p>
                  </div>
                </div>
              )}

              {evaluationState === "incorrect" && (
                <div className="p-4 bg-red-500/10 border border-red-500/40 rounded-xl text-red-200 text-xs sm:text-sm animate-in shake duration-300 flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-red-300">Respuesta Incorrecta. Inténtalo de nuevo.</p>
                    <p className="mt-1 text-slate-300 leading-relaxed font-light">
                      {showHint ? currentTest.pista : "Presiona el botón de 'Pedir Pista' arriba para que el robot te oriente."}
                    </p>
                  </div>
                </div>
              )}
            </form>

            {/* Controles de Navegación de Preguntas */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => {
                  const prev = (currentTestIndex - 1 + BANCO_TEST.length) % BANCO_TEST.length;
                  setCurrentTestIndex(prev);
                  setEvaluationState("pending");
                  setUserAnswer("");
                  setShowHint(false);
                }}
                className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg text-xs font-semibold transition-colors"
              >
                ← Anterior
              </button>

              <div className="flex gap-1.5">
                {BANCO_TEST.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentTestIndex(idx);
                      setEvaluationState("pending");
                      setUserAnswer("");
                      setShowHint(false);
                    }}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                      currentTestIndex === idx
                        ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/40 scale-105"
                        : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNextQuestion}
                className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg text-xs font-semibold transition-colors"
              >
                Siguiente →
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. PESTAÑA 3: MIS APUNTES PERSONALES & SNIPPETS           */}
      {/* ======================================================== */}
      {activeSubTab === "apuntes" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Header de Apuntes */}
          <div className="bg-[#0f172a]/90 border border-cyan-500/20 rounded-2xl p-5 shadow-xl backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-cyan-400" />
                Mis Notas y Ejercicios de Clase
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Guarda tus propios scripts, tips del profesor Raul Fernandez y ejercicios desarrollados en el aula.
              </p>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all cursor-pointer flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>+ Nuevo Apunte</span>
            </button>
          </div>

          {/* Grid de Apuntes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {apuntes.map((apunte) => (
              <div 
                key={apunte.id}
                className="bg-[#0f172a]/80 border border-cyan-900/50 hover:border-cyan-400/50 rounded-2xl p-5 backdrop-blur-md shadow-xl flex flex-col transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold uppercase">
                        {apunte.clausula}
                      </span>
                      <span className="text-[10px] text-slate-500">{apunte.fecha}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      {apunte.titulo}
                    </h3>
                  </div>

                  <button
                    onClick={() => handleDeleteApunte(apunte.id)}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/30 text-red-400 transition-colors"
                    title="Eliminar apunte"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 font-light">
                  {apunte.nota}
                </p>

                {/* Código */}
                {apunte.codigo && (
                  <div className="mt-auto bg-[#070d17] border border-white/5 rounded-xl overflow-hidden shadow-inner">
                    <div className="flex items-center justify-between px-3 py-1.5 bg-[#0B1120] border-b border-white/5 text-[10px] text-slate-400 font-mono">
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
                    <pre className="p-3.5 overflow-x-auto font-mono text-xs text-cyan-200 leading-relaxed selection:bg-cyan-500/30">
                      <code>{apunte.codigo}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>

          {apuntes.length === 0 && (
            <div className="text-center py-12 bg-[#0f172a]/50 rounded-2xl border border-white/5">
              <Terminal className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">Aún no has registrado apuntes personalizados.</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="mt-3 text-cyan-400 text-xs font-bold hover:underline"
              >
                + Crear mi primer apunte
              </button>
            </div>
          )}

        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL PARA AGREGAR NUEVO APUNTE                         */}
      {/* ======================================================== */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#0f172a] rounded-2xl border border-cyan-500/30 shadow-[0_0_50px_rgba(34,211,238,0.2)] p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-cyan-400" />
              Registrar Nuevo Apunte de Clase
            </h3>

            <form onSubmit={handleSaveApunte} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Título del Apunte / Ejercicio</label>
                <input
                  type="text"
                  value={nuevoTitulo}
                  onChange={(e) => setNuevoTitulo(e.target.value)}
                  placeholder="Ej: Trigger para evitar sueldos negativos..."
                  required
                  className="w-full px-3.5 py-2 bg-[#0B1120] border border-cyan-500/30 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Cláusula o Tema Principal</label>
                <input
                  type="text"
                  value={nuevaClausula}
                  onChange={(e) => setNuevaClausula(e.target.value)}
                  placeholder="Ej: TRIGGER, STORED PROCEDURE, HAVING, CTE..."
                  className="w-full px-3.5 py-2 bg-[#0B1120] border border-cyan-500/30 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">¿Qué aprendí en clase? / Explicación</label>
                <textarea
                  value={nuevaNota}
                  onChange={(e) => setNuevaNota(e.target.value)}
                  placeholder="Escribe la explicación del profesor o la lógica aplicada..."
                  rows={3}
                  className="w-full px-3.5 py-2 bg-[#0B1120] border border-cyan-500/30 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Script de Código SQL (Opcional)</label>
                <textarea
                  value={nuevoCodigo}
                  onChange={(e) => setNuevoCodigo(e.target.value)}
                  placeholder="SELECT ... o CREATE PROCEDURE ..."
                  rows={4}
                  className="w-full px-3.5 py-2 bg-[#0B1120] border border-cyan-500/30 rounded-xl font-mono text-xs text-cyan-200 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
                >
                  Guardar Apunte
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
