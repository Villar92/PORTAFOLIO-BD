import { CLAUSULAS_DATABASE } from "./clausulasData";

export interface ApuntePersonal {
  id: string;
  titulo: string;
  clausula: string;
  nota: string;
  codigo: string;
  fecha: string;
  autoGenerado?: boolean;
  semana?: number;
}

// Banco maestro de apuntes organizados por temas y semanas de clase
export const BANCO_APUNTES_MAESTROS: {
  semana: number;
  titulo: string;
  clausula: string;
  nota: string;
  codigo: string;
}[] = [
  // Semana 1: Fundamentos y Búsqueda
  {
    semana: 1,
    titulo: "TOP determinista con ORDER BY y WITH TIES",
    clausula: "TOP / ORDER BY",
    nota: "El docente recalcó que un SELECT TOP sin ORDER BY devuelve resultados no deterministas que varían según el plan de ejecución. Con WITH TIES se garantiza incluir empates en la última posición.",
    codigo: `-- Apunte Semana 1: Consulta de mejores ventas garantizando empates\nSELECT TOP (5) WITH TIES \n    id_vendedor, \n    nombre,\n    ventas_totales\nFROM Vendedores\nORDER BY ventas_totales DESC;`
  },
  {
    semana: 1,
    titulo: "Predicados SARGable para Index Seek",
    clausula: "WHERE",
    nota: "Evitar envolver columnas indexadas en funciones dentro del WHERE (ej. YEAR(fecha) = 2024). Esto convierte una búsqueda eficiente (Seek) en un escaneo total de tabla (Scan). Usar rangos con BETWEEN o >= y <.",
    codigo: `-- Apunte Semana 1: Forma óptima SARGable compatible con índices\nSELECT id_orden, total, fecha\nFROM Facturas\nWHERE fecha >= '2026-01-01' AND fecha < '2027-01-01';`
  },
  {
    semana: 1,
    titulo: "Lógica Trivaluada y Evaluación con IS NULL",
    clausula: "IS NULL",
    nota: "En SQL Server el valor NULL no equivale a nada, ni siquiera a otro NULL (UNKNOWN). Por eso la sintaxis '= NULL' siempre falla silenciosamente. Se debe usar obligatoriamente IS NULL o IS NOT NULL.",
    codigo: `-- Apunte Semana 1: Búsqueda segura de clientes sin confirmación\nSELECT id_cliente, nombres, telefono\nFROM Clientes\nWHERE telefono IS NULL;`
  },
  {
    semana: 1,
    titulo: "Subconsultas ultra-rápidas con EXISTS vs IN",
    clausula: "EXISTS",
    nota: "EXISTS realiza short-circuit: en cuanto halla la primera coincidencia en la subconsulta detiene la búsqueda y retorna TRUE. Es significativamente más veloz que IN cuando la subconsulta maneja miles de registros.",
    codigo: `-- Apunte Semana 1: Validación de clientes activos con compras recientes\nSELECT c.id_cliente, c.nombre\nFROM Clientes c\nWHERE EXISTS (\n    SELECT 1 FROM Pedidos p \n    WHERE p.id_cliente = c.id_cliente AND p.total > 500\n);`
  },
  {
    semana: 1,
    titulo: "Operadores Lógicos: Precedencia de AND sobre OR",
    clausula: "AND / OR",
    nota: "La regla de precedencia en SQL evalúa los operadores AND antes que los OR. Si combinamos ambos sin paréntesis, la condición devolverá datos no deseados por ambigüedad lógica.",
    codigo: `-- Apunte Semana 1: Agrupación explícita con paréntesis requerida\nSELECT * FROM Productos\nWHERE (categoria = 'Laptops' OR categoria = 'Servidores')\n  AND stock > 0 \n  AND precio < 3500;`
  },

  // Semana 2: Agrupación y Ventana
  {
    semana: 2,
    titulo: "Paginación Eficiente en Servidor con ROW_NUMBER()",
    clausula: "ROW_NUMBER()",
    nota: "La función de ventana ROW_NUMBER() combinada con una CTE es el estándar de alto rendimiento para paginar miles de registros sin provocar bloqueos ni transferencias de red innecesarias.",
    codigo: `-- Apunte Semana 2: Paginador T-SQL para página 2 (10 registros por página)\nWITH PaginacionCTE AS (\n    SELECT id, nombre, precio, fecha_creacion,\n           ROW_NUMBER() OVER(ORDER BY id ASC) AS FilaNumero\n    FROM Productos\n)\nSELECT * FROM PaginacionCTE\nWHERE FilaNumero BETWEEN 11 AND 20;`
  },
  {
    semana: 2,
    titulo: "Diferencia Clave entre WHERE y HAVING",
    clausula: "HAVING",
    nota: "WHERE filtra filas individuales antes de que se produzca la fase de agrupamiento. HAVING filtra los grupos resultantes una vez consolidadas las funciones de agregación (COUNT, SUM, AVG).",
    codigo: `-- Apunte Semana 2: Filtrado por departamento con más de 5 contrataciones\nSELECT depto_id, COUNT(*) AS TotalEmpleados\nFROM Empleados\nWHERE activo = 1 -- Filtra filas individuales primero\nGROUP BY depto_id\nHAVING COUNT(*) >= 5; -- Filtra los grupos calculados`
  },
  {
    semana: 2,
    titulo: "Subtotales Jerárquicos en Reportes con ROLLUP",
    clausula: "ROLLUP",
    nota: "ROLLUP genera de forma automática los subtotales por cada dimensión y el gran total general en una sola consulta, reduciendo drásticamente la carga de cálculo en el servidor de reportes.",
    codigo: `-- Apunte Semana 2: Matriz con subtotales por región y ciudad\nSELECT region, ciudad, SUM(monto) AS TotalVentas\nFROM VentasSucursales\nGROUP BY ROLLUP (region, ciudad);`
  },
  {
    semana: 2,
    titulo: "Prevención de Truncamiento en Promedios (AVG)",
    clausula: "AVG()",
    nota: "Si la columna evaluada en AVG() es de tipo entero (INT), SQL Server trunca los decimales del resultado a un entero. Se debe convertir explícitamente con CAST a DECIMAL o FLOAT.",
    codigo: `-- Apunte Semana 2: Cálculo con decimales exactos\nSELECT depto_id, \n       AVG(CAST(calificacion AS DECIMAL(5,2))) AS PromedioExacto\nFROM EvaluacionesDesempenio\nGROUP BY depto_id;`
  },
  {
    semana: 2,
    titulo: "Manejo de Empates Académicos con DENSE_RANK()",
    clausula: "DENSE_RANK()",
    nota: "A diferencia de RANK() que deja huecos numéricos tras empates (1, 1, 3), DENSE_RANK() mantiene una secuencia correlativa continua (1, 1, 2), ideal para puestos de mérito académico.",
    codigo: `-- Apunte Semana 2: Cuadro de mérito estudiantil\nSELECT id_alumno, nombres, promedio,\n       DENSE_RANK() OVER(ORDER BY promedio DESC) AS PuestoMerito\nFROM RegistroNotasFinales;`
  },

  // Semana 3: Joins, CTEs y JSON
  {
    semana: 3,
    titulo: "Detección de Huérfanos mediante LEFT JOIN y NULL",
    clausula: "LEFT JOIN",
    nota: "Patrón clásico de integridad: al hacer LEFT JOIN contra la tabla hija y aplicar WHERE tabla_hija.id IS NULL se detectan al instante registros padre que nunca tuvieron actividad asociada.",
    codigo: `-- Apunte Semana 3: Proveedores sin ningún pedido registrado\nSELECT p.id_proveedor, p.razon_social\nFROM Proveedores p\nLEFT JOIN OrdenesCompra o ON p.id_proveedor = o.id_proveedor\nWHERE o.id_orden IS NULL;`
  },
  {
    semana: 3,
    titulo: "CTEs Recursivas para Organigramas Jerárquicos",
    clausula: "WITH (CTE)",
    nota: "Una CTE recursiva consta de un miembro ancla (Anchor) y un miembro recursivo unidos con UNION ALL. Permite consultar estructuras jerárquicas como jefes y subordinados de forma elegante.",
    codigo: `-- Apunte Semana 3: Jerarquía de puestos de mando\nWITH JerarquiaCTE AS (\n    SELECT id, nombre, jefe_id, 1 AS Nivel\n    FROM Empleados WHERE jefe_id IS NULL -- Nivel raíz\n    UNION ALL\n    SELECT e.id, e.nombre, e.jefe_id, j.Nivel + 1\n    FROM Empleados e\n    INNER JOIN JerarquiaCTE j ON e.jefe_id = j.id\n)\nSELECT * FROM JerarquiaCTE ORDER BY Nivel;`
  },
  {
    semana: 3,
    titulo: "Concatenación Limpia con STRING_AGG",
    clausula: "STRING_AGG()",
    nota: "STRING_AGG() simplifica la agregación de múltiples filas de texto en una sola celda separada por comas, admitiendo además la cláusula WITHIN GROUP (ORDER BY) para garantizar el orden alfabético.",
    codigo: `-- Apunte Semana 3: Lista de habilidades por cada ingeniero\nSELECT id_empleado,\n       STRING_AGG(habilidad, ', ') WITHIN GROUP (ORDER BY habilidad ASC) AS Competencias\nFROM EmpleadoHabilidades\nGROUP BY id_empleado;`
  },
  {
    semana: 3,
    titulo: "Deserialización de Payloads JSON con OPENJSON",
    clausula: "OPENJSON()",
    nota: "OPENJSON con cláusula WITH permite transformar documentos JSON de APIs REST directamente en filas y columnas relacionales fuertemente tipadas sin salir del motor de bases de datos.",
    codigo: `-- Apunte Semana 3: Procesamiento de JSON entrante\nDECLARE @json NVARCHAR(MAX) = N'[{\"id\": 10, \"monto\": 150.50}, {\"id\": 20, \"monto\": 320.00}]';\nSELECT * FROM OPENJSON(@json)\nWITH (\n    id_transaccion INT '$.id',\n    monto DECIMAL(10,2) '$.monto'\n);`
  },
  {
    semana: 3,
    titulo: "Transformación Matricial con Cláusula PIVOT",
    clausula: "PIVOT",
    nota: "PIVOT rota datos de filas a columnas para generar reportes ejecutivos resumidos por períodos sin requerir múltiples consultas separadas.",
    codigo: `-- Apunte Semana 3: Ventas por trimestre como columnas\nSELECT Producto, [Q1], [Q2], [Q3], [Q4]\nFROM (\n    SELECT Producto, Trimestre, TotalVenta FROM VentasTrimestrales\n) AS Origen\nPIVOT (\n    SUM(TotalVenta) FOR Trimestre IN ([Q1], [Q2], [Q3], [Q4])\n) AS Matriz;`
  },

  // Semana 4: Modificación CRUD y Concurrencia
  {
    semana: 4,
    titulo: "Operación Atómica Upsert con MERGE",
    clausula: "MERGE",
    nota: "MERGE consolida INSERT, UPDATE y DELETE en un solo paso atómico. Reduce el tiempo de bloqueo en tablas de sincronización de inventario. Recordar siempre terminar con punto y coma (;).",
    codigo: `-- Apunte Semana 4: Sincronización de catálogo diario\nMERGE Inventario AS dest\nUSING CargaDiaria AS orig ON dest.codigo = orig.codigo\nWHEN MATCHED THEN\n    UPDATE SET dest.stock = dest.stock + orig.stock\nWHEN NOT MATCHED THEN\n    INSERT (codigo, stock) VALUES (orig.codigo, orig.stock);`
  },
  {
    semana: 4,
    titulo: "Auditoría en Caliente con la Cláusula OUTPUT",
    clausula: "OUTPUT",
    nota: "OUTPUT permite capturar los datos eliminados o modificados hacia una tabla de auditoría en la misma sentencia DML, consumiendo las tablas del sistema inserted y deleted sin necesidad de triggers.",
    codigo: `-- Apunte Semana 4: Captura de registros dados de baja\nDELETE FROM UsuariosInactivos\nOUTPUT deleted.id, deleted.correo, GETDATE()\nINTO AuditoriaBajas (id_usuario, correo, fecha_eliminacion)\nWHERE dias_sin_login > 365;`
  },
  {
    semana: 4,
    titulo: "Colas Concurrentes sin Bloqueos con READPAST",
    clausula: "READPAST",
    nota: "En sistemas de procesamiento en segundo plano con múltiples workers, la pista WITH (READPAST, UPDLOCK) salta filas que ya están siendo atendidas por otro hilo, evitando cuellos de botella y deadlocks.",
    codigo: `-- Apunte Semana 4: Extracción de siguiente tarea sin colisiones\nSELECT TOP (1) id_tarea, payload\nFROM ColaTareas WITH (READPAST, UPDLOCK)\nWHERE procesado = 0\nORDER BY id_tarea ASC;`
  },
  {
    semana: 4,
    titulo: "TRUNCATE vs DELETE: Eficiencia y Registro Mínimo",
    clausula: "TRUNCATE TABLE",
    nota: "DELETE registra cada fila borrada en el Log de Transacciones y no resetea IDENTITY. TRUNCATE desasigna páginas enteras de almacenamiento, resetea la semilla IDENTITY y es órdenes de magnitud más rápido.",
    codigo: `-- Apunte Semana 4: Limpieza masiva de staging\nTRUNCATE TABLE StagingImportacionTemp;`
  },
  {
    semana: 4,
    titulo: "Inserción Masiva de Archivos con BULK INSERT",
    clausula: "BULK INSERT",
    nota: "BULK INSERT lee directamente archivos de texto plano (CSV o TSV) hacia una tabla con registro mínimo. Es la herramienta preferida en procesos ETL locales de gran escala.",
    codigo: `-- Apunte Semana 4: Carga masiva delimitada por punto y coma\nBULK INSERT RegistroVentas2026\nFROM 'D:\\Cargas\\ventas_semana.csv'\nWITH (\n    FIELDTERMINATOR = ';',\n    ROWTERMINATOR = '\\n',\n    FIRSTROW = 2\n);`
  },

  // Semana 5: DDL, Restricciones e Índices
  {
    semana: 5,
    titulo: "Índices Cubrientes con INCLUDE para eliminar Key Lookups",
    clausula: "CREATE INDEX",
    nota: "Un índice que incluye en su definición columnas complementarias con INCLUDE permite al motor responder la consulta leyendo únicamente el árbol B del índice, sin gastar I/O en acceder a la tabla física.",
    codigo: `-- Apunte Semana 5: Índice de clientes altamente optimizado\nCREATE NONCLUSTERED INDEX IX_Clientes_DNI\nON Clientes(dni ASC)\nINCLUDE (nombres, apellidos, telefono, correo);`
  },
  {
    semana: 5,
    titulo: "Reglas de Integridad con Restricciones CHECK",
    clausula: "CHECK",
    nota: "Las restricciones CHECK garantizan a nivel de base de datos que los datos cumplan fórmulas válidas (ej. sueldo >= salario mínimo o fecha_fin >= fecha_inicio), protegiendo contra errores del frontend.",
    codigo: `-- Apunte Semana 5: Restricción de rango salarial\nALTER TABLE Contratos\nADD CONSTRAINT CK_Contrato_SueldoValido \nCHECK (salario_mensual >= 1025.00 AND salario_mensual <= 50000.00);`
  },
  {
    semana: 5,
    titulo: "Integridad Referencial y Borrado en Cascada",
    clausula: "FOREIGN KEY",
    nota: "Definir ON DELETE CASCADE en claves foráneas permite eliminar automáticamente los registros hijos dependientes al borrar el padre. Debe usarse con precaución para no ocasionar borrados accidentales masivos.",
    codigo: `-- Apunte Semana 5: Vínculo referencial con cascada controlada\nALTER TABLE DetalleFactura\nADD CONSTRAINT FK_Detalle_Factura\nFOREIGN KEY (id_factura) REFERENCES Facturas(id)\nON DELETE CASCADE;`
  },
  {
    semana: 5,
    titulo: "Valores por Defecto con Funciones de Sistema (DEFAULT)",
    clausula: "DEFAULT",
    nota: "Asignar DEFAULT con funciones como SYSDATETIME() o NEWID() delega la generación de auditoría temporal o identificadores únicos al motor sin necesidad de enviarlos desde el backend.",
    codigo: `-- Apunte Semana 5: Auditoría automática en creación\nALTER TABLE Usuarios\nADD CONSTRAINT DF_Usuario_FechaRegistro \nDEFAULT SYSDATETIME() FOR fecha_registro;`
  },
  {
    semana: 5,
    titulo: "Claves Primarias Clustered y Orden Físico",
    clausula: "PRIMARY KEY",
    nota: "La clave primaria agrupada (CLUSTERED) define el orden secuencial físico en que las filas se almacenan en el disco. Es vital elegir claves de incremento secuencial para evitar fragmentación de páginas (Page Splits).",
    codigo: `-- Apunte Semana 5: Tabla estructurada con índice clustered\nCREATE TABLE BitacoraAccesos (\n    id BIGINT IDENTITY(1,1) NOT NULL,\n    usuario_id INT NOT NULL,\n    ip_origen VARCHAR(45) NOT NULL,\n    fecha_ingreso DATETIME2 DEFAULT SYSDATETIME(),\n    CONSTRAINT PK_Bitacora PRIMARY KEY CLUSTERED (id)\n);`
  },

  // Semana 6: Transacciones ACID y Alta Disponibilidad
  {
    semana: 6,
    titulo: "Control Transaccional con Puntos de Salvado (SAVE TRAN)",
    clausula: "SAVE TRAN",
    nota: "Los savepoints permiten revertir parcialmente operaciones dentro de una transacción sin descartar los pasos previos exitosos. Útil en flujos de pago o procesamiento por etapas complejas.",
    codigo: `-- Apunte Semana 6: Reversión selectiva ante error parcial\nBEGIN TRANSACTION;\nINSERT INTO Transacciones (monto) VALUES (500);\nSAVE TRANSACTION PuntoGuardado1;\n\n-- Intento riesgoso secundario\n-- Si falla:\nROLLBACK TRANSACTION PuntoGuardado1; -- Cancela solo el segundo intento\nCOMMIT TRANSACTION; -- Confirma el primer insert`
  },
  {
    semana: 6,
    titulo: "Manejo Estructurado de Excepciones con TRY...CATCH",
    clausula: "TRY...CATCH",
    nota: "El bloque CATCH en T-SQL captura cualquier error de severidad > 10. Se debe consultar @@TRANCOUNT para asegurar que no queden transacciones huérfanas en el servidor antes de lanzar ROLLBACK.",
    codigo: `-- Apunte Semana 6: Patrón transaccional seguro contra deadlocks\nBEGIN TRY\n    BEGIN TRANSACTION;\n        UPDATE Cuentas SET saldo = saldo - 200 WHERE id = 1;\n        UPDATE Cuentas SET saldo = saldo + 200 WHERE id = 2;\n    COMMIT TRANSACTION;\nEND TRY\nBEGIN CATCH\n    IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;\n    SELECT ERROR_NUMBER() AS Codigo, ERROR_MESSAGE() AS MensajeError;\nEND CATCH;`
  },
  {
    semana: 6,
    titulo: "Optimización de Conexiones de Red con SET NOCOUNT ON",
    clausula: "SET NOCOUNT ON",
    nota: "Suprime el envío del mensaje '(1 fila afectada)' de vuelta a la aplicación cliente por cada sentencia ejecutada, reduciendo de manera considerable el tráfico de red en procedimientos almacenados con múltiples DML.",
    codigo: `-- Apunte Semana 6: Plantilla base de SP de alto rendimiento\nCREATE PROCEDURE sp_ProcesarLiquidacion\n    @id_lote INT\nAS\nBEGIN\n    SET NOCOUNT ON;\n    -- Lógica del lote\nEND;`
  },
  {
    semana: 6,
    titulo: "Separador de Lotes GO y Variables Locales",
    clausula: "GO",
    nota: "GO no es una palabra clave del motor relacional, sino un comando interpretado por SSMS y clientes SQL para enviar un lote completo de sentencias. Las variables locales declaradas dejan de existir al cruzar un GO.",
    codigo: `-- Apunte Semana 6: Creación de objetos en lotes aislados\nCREATE VIEW VistaAuditoria AS \nSELECT id, fecha, usuario FROM RegistroAuditoria;\nGO\n-- Nuevo lote independiente\nSELECT * FROM VistaAuditoria;\nGO`
  },
  {
    semana: 6,
    titulo: "Estrategias de Backup Empresarial y Política DRP",
    clausula: "BACKUP DATABASE",
    nota: "La política de respaldos estándar combina un BACKUP FULL semanal, BACKUP DIFFERENTIAL diario y BACKUP LOG cada 15 minutos para minimizar la pérdida de datos (RPO) y tiempo de restauración (RTO).",
    codigo: `-- Apunte Semana 6: Copia de seguridad completa con compresión y checksum\nBACKUP DATABASE PortafolioBD\nTO DISK = 'D:\\Backups\\PortafolioBD_Full.bak'\nWITH FORMAT,\n     COMPRESSION,\n     CHECKSUM,\n     NAME = 'Backup Completo Semanal';`
  }
];

const SIETE_DIAS_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Genera un lote de 5 nuevos apuntes de clase garantizando que no se repitan
 * con los existentes, utilizando el banco maestro y procedimentalmente las 100 cláusulas.
 */
export function generarLote5Apuntes(apuntesActuales: ApuntePersonal[]): ApuntePersonal[] {
  const fechaHoy = new Date().toLocaleDateString("es-PE", { 
    day: "2-digit", 
    month: "short", 
    year: "numeric" 
  });

  const titulosExistentes = new Set(apuntesActuales.map(a => a.titulo.toLowerCase().trim()));
  const clausulasExistentes = new Set(apuntesActuales.map(a => a.clausula.toLowerCase().trim()));

  // 1. Filtrar candidatos disponibles del banco maestro que no hayan sido agregados
  const candidatosMaestros = BANCO_APUNTES_MAESTROS.filter(
    item => !titulosExistentes.has(item.titulo.toLowerCase().trim())
  );

  const nuevos: ApuntePersonal[] = [];
  const numeroLote = Math.floor(apuntesActuales.filter(a => a.autoGenerado).length / 5) + 1;

  // Tomar hasta 5 del banco maestro
  for (let i = 0; i < candidatosMaestros.length && nuevos.length < 5; i++) {
    const item = candidatosMaestros[i];
    nuevos.push({
      id: `auto_${Date.now()}_${i}_${Math.random().toString(36).substring(2, 6)}`,
      titulo: item.titulo,
      clausula: item.clausula,
      nota: item.nota,
      codigo: item.codigo,
      fecha: fechaHoy,
      autoGenerado: true,
      semana: item.semana || numeroLote
    });
  }

  // 2. Si se agotaron los del banco maestro, generar procedimentalmente a partir de las 100 cláusulas SQL
  if (nuevos.length < 5) {
    const clausulasDisponibles = CLAUSULAS_DATABASE.filter(
      c => !clausulasExistentes.has(c.nombre.toLowerCase().trim())
    );

    const pool = clausulasDisponibles.length > 0 ? clausulasDisponibles : CLAUSULAS_DATABASE;

    for (let i = 0; nuevos.length < 5; i++) {
      const c = pool[i % pool.length];
      const idUnico = `auto_proc_${Date.now()}_${nuevos.length}`;
      nuevos.push({
        id: idUnico,
        titulo: `Análisis Técnico y Buenas Prácticas: ${c.nombre}`,
        clausula: c.nombre,
        nota: `Apunte tomado en sesión de laboratorio sobre "${c.nombre}": ${c.resumen} Regla del docente: ${c.tip}`,
        codigo: `-- Script de Laboratorio para ${c.nombre}\n-- Bloque: ${c.bloque}\n${c.ejemplo}`,
        fecha: fechaHoy,
        autoGenerado: true,
        semana: numeroLote
      });
    }
  }

  return nuevos;
}

/**
 * Verifica el ciclo de 7 días. Si han transcurrido 7 días desde la última generación,
 * genera automáticamente 5 nuevos apuntes y actualiza el timestamp.
 */
export function verificarCicloAutoGeneracion(apuntesActuales: ApuntePersonal[]): {
  apuntesActualizados: ApuntePersonal[];
  seGeneraron: boolean;
  cantidadNuevos: number;
  diasRestantes: number;
} {
  if (typeof window === "undefined") {
    return { apuntesActualizados: apuntesActuales, seGeneraron: false, cantidadNuevos: 0, diasRestantes: 7 };
  }

  const ahora = Date.now();
  const lastGenStr = localStorage.getItem("upla_apuntes_last_gen");
  const lastGenTime = lastGenStr ? parseInt(lastGenStr, 10) : 0;

  // Si no hay fecha de última generación, inicializamos el ciclo
  if (!lastGenTime) {
    // Si no hay apuntes o hay menos de 5, generamos el primer lote semanal
    const necesitaLoteInicial = apuntesActuales.filter(a => a.autoGenerado).length === 0;
    if (necesitaLoteInicial) {
      const loteInicial = generarLote5Apuntes(apuntesActuales);
      const combinados = [...loteInicial, ...apuntesActuales];
      localStorage.setItem("upla_apuntes_last_gen", ahora.toString());
      localStorage.setItem("upla_apuntes_db2", JSON.stringify(combinados));
      return {
        apuntesActualizados: combinados,
        seGeneraron: true,
        cantidadNuevos: loteInicial.length,
        diasRestantes: 7
      };
    } else {
      localStorage.setItem("upla_apuntes_last_gen", ahora.toString());
      return { apuntesActualizados: apuntesActuales, seGeneraron: false, cantidadNuevos: 0, diasRestantes: 7 };
    }
  }

  const tiempoTranscurrido = ahora - lastGenTime;

  // Si han pasado 7 días o más
  if (tiempoTranscurrido >= SIETE_DIAS_MS) {
    const nuevos = generarLote5Apuntes(apuntesActuales);
    const combinados = [...nuevos, ...apuntesActuales];
    localStorage.setItem("upla_apuntes_last_gen", ahora.toString());
    localStorage.setItem("upla_apuntes_db2", JSON.stringify(combinados));
    return {
      apuntesActualizados: combinados,
      seGeneraron: true,
      cantidadNuevos: nuevos.length,
      diasRestantes: 7
    };
  }

  // Si aún no han pasado 7 días, calcular días restantes
  const tiempoRestante = SIETE_DIAS_MS - tiempoTranscurrido;
  const diasRestantes = Math.max(1, Math.ceil(tiempoRestante / (24 * 60 * 60 * 1000)));

  return {
    apuntesActualizados: apuntesActuales,
    seGeneraron: false,
    cantidadNuevos: 0,
    diasRestantes
  };
}
