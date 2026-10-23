import { 
  Search, 
  Table, 
  Database, 
  Zap, 
  Code, 
  ShieldCheck, 
  Layers 
} from "lucide-react";

export interface ClausulaItem {
  id: string;
  numero: number;
  bloque: string;
  nombre: string;
  categoria: string;
  resumen: string;
  sintaxis: string;
  ejemplo: string;
  tip: string;
}

export const CATEGORIAS_SQL = [
  { 
    id: "Todas", 
    label: "Todas (100)", 
    icon: Layers, 
    desc: "Catálogo completo y ordenado de 100 cláusulas SQL" 
  },
  { 
    id: "Consultas Básicas y Filtrado", 
    label: "1. Búsqueda y Filtro (1-20)", 
    icon: Search, 
    desc: "Bloque 1: Consultas Básicas y Filtrado (1 a 20)" 
  },
  { 
    id: "Agregación, Agrupamiento y Conjuntos", 
    label: "2. Agregación y Grupos (21-40)", 
    icon: Table, 
    desc: "Bloque 2: Agregación, Agrupamiento y Conjuntos (21 a 40)" 
  },
  { 
    id: "Uniones (Joins) y Subconsultas", 
    label: "3. JOINs y Subconsultas (41-55)", 
    icon: Database, 
    desc: "Bloque 3: Uniones (Joins) y Subconsultas (41 a 55)" 
  },
  { 
    id: "Modificación de Datos (CRUD)", 
    label: "4. Modificación DML (56-70)", 
    icon: Zap, 
    desc: "Bloque 4: Modificación de Datos (CRUD) (56 a 70)" 
  },
  { 
    id: "Definición y Estructura de Datos (DDL)", 
    label: "5. Estructura DDL (71-85)", 
    icon: Code, 
    desc: "Bloque 5: Definición y Estructura de Datos (DDL) (71 a 85)" 
  },
  { 
    id: "Control de Flujo, Transacciones y Administración", 
    label: "6. Flujo y Transacciones (86-100)", 
    icon: ShieldCheck, 
    desc: "Bloque 6: Control de Flujo, Transacciones y Administración (86 a 100)" 
  }
];

export const CLAUSULAS_DATABASE: ClausulaItem[] = [
  // =========================================================================
  // BLOQUE 1: Consultas Básicas y Filtrado (1 a 20)
  // =========================================================================
  {
    id: "select",
    numero: 1,
    bloque: "Bloque 1: Consultas Básicas y Filtrado",
    nombre: "SELECT",
    categoria: "Consultas Básicas y Filtrado",
    resumen: "Especifica las columnas que se recuperarán de una consulta.",
    sintaxis: "SELECT columna1, columna2, ...\nFROM nombre_tabla;",
    ejemplo: "SELECT id_empleado, nombre, apellido, salario\nFROM Empleados;",
    tip: "Evita utilizar SELECT * en entornos productivos para optimizar el ancho de banda y aprovechar al máximo los índices cubrientes."
  },
  {
    id: "from",
    numero: 2,
    bloque: "Bloque 1: Consultas Básicas y Filtrado",
    nombre: "FROM",
    categoria: "Consultas Básicas y Filtrado",
    resumen: "Indica la tabla o vista de origen de los datos.",
    sintaxis: "SELECT columnas\nFROM [esquema.]tabla [AS alias];",
    ejemplo: "SELECT c.nombre, c.email\nFROM dbo.Clientes AS c;",
    tip: "Especificar el esquema explícito (por ejemplo dbo.Tabla) evita que el motor pierda ciclos resolviendo la ruta del objeto."
  },
  {
    id: "where",
    numero: 3,
    bloque: "Bloque 1: Consultas Básicas y Filtrado",
    nombre: "WHERE",
    categoria: "Consultas Básicas y Filtrado",
    resumen: "Filtra las filas basándose en una o más condiciones lógicas.",
    sintaxis: "SELECT columnas\nFROM tabla\nWHERE condicion_logica;",
    ejemplo: "SELECT * FROM Productos\nWHERE precio > 100.00 AND stock > 0;",
    tip: "Diseña predicados SARGable (Search Argument Able): evita funciones sobre columnas indexadas en el WHERE para no forzar Index Scans."
  },
  {
    id: "distinct",
    numero: 4,
    bloque: "Bloque 1: Consultas Básicas y Filtrado",
    nombre: "DISTINCT",
    categoria: "Consultas Básicas y Filtrado",
    resumen: "Elimina filas duplicadas del conjunto de resultados.",
    sintaxis: "SELECT DISTINCT columna1, columna2\nFROM tabla;",
    ejemplo: "SELECT DISTINCT ciudad, pais\nFROM Proveedores;",
    tip: "DISTINCT aplica un operador Sort o Hash Aggregate en TempDB; úsalo conscientemente solo cuando la duplicidad no pueda resolverse en el modelado."
  },
  {
    id: "top",
    numero: 5,
    bloque: "Bloque 1: Consultas Básicas y Filtrado",
    nombre: "TOP",
    categoria: "Consultas Básicas y Filtrado",
    resumen: "Limita el número o porcentaje de filas devueltas.",
    sintaxis: "SELECT TOP (n) [PERCENT] columnas\nFROM tabla\n[ORDER BY columna_orden];",
    ejemplo: "SELECT TOP (10) nombre, fecha_ingreso\nFROM Empleados\nORDER BY fecha_ingreso DESC;",
    tip: "Acompaña siempre TOP de una cláusula ORDER BY determinista; de lo contrario, el conjunto devuelto será arbitrario e inconsistente."
  },
  {
    id: "order-by",
    numero: 6,
    bloque: "Bloque 1: Consultas Básicas y Filtrado",
    nombre: "ORDER BY",
    categoria: "Consultas Básicas y Filtrado",
    resumen: "Ordena el conjunto de resultados de manera ascendente o descendente.",
    sintaxis: "SELECT columnas\nFROM tabla\nORDER BY columna1 [ASC | DESC], columna2 [ASC | DESC];",
    ejemplo: "SELECT nombre, apellido, fecha_registro\nFROM Usuarios\nORDER BY fecha_registro DESC, apellido ASC;",
    tip: "Es el paso final del procesamiento lógico de SQL; un índice con la misma clave de ordenamiento permite al motor omitir la costosa operación Sort."
  },
  {
    id: "asc",
    numero: 7,
    bloque: "Bloque 1: Consultas Básicas y Filtrado",
    nombre: "ASC",
    categoria: "Consultas Básicas y Filtrado",
    resumen: "Define un ordenamiento ascendente (por defecto).",
    sintaxis: "SELECT columnas\nFROM tabla\nORDER BY columna ASC;",
    ejemplo: "SELECT codigo, descripcion, precio\nFROM Articulos\nORDER BY precio ASC;",
    tip: "Si no especificas ASC o DESC en el ORDER BY, SQL Server asume ASC por omisión."
  },
  {
    id: "desc",
    numero: 8,
    bloque: "Bloque 1: Consultas Básicas y Filtrado",
    nombre: "DESC",
    categoria: "Consultas Básicas y Filtrado",
    resumen: "Define un ordenamiento descendente.",
    sintaxis: "SELECT columnas\nFROM tabla\nORDER BY columna DESC;",
    ejemplo: "SELECT estudiante, calificacion\nFROM Evaluaciones\nORDER BY calificacion DESC;",
    tip: "Esencial para rankings de mayor a menor y para consultar las fechas o transacciones más recientes."
  },
  {
    id: "as",
    numero: 9,
    bloque: "Bloque 1: Consultas Básicas y Filtrado",
    nombre: "AS",
    categoria: "Consultas Básicas y Filtrado",
    resumen: "Crea un alias temporal para columnas o tablas.",
    sintaxis: "SELECT col AS alias_col\nFROM tabla AS alias_tabla;",
    ejemplo: "SELECT e.nombre AS NombreEmpleado, d.nombre AS Departamento\nFROM Empleados AS e\nJOIN Departamentos AS d ON e.depto_id = d.id;",
    tip: "Mejora la legibilidad del código y permite renombrar cálculos o columnas resultantes para su consumo en la aplicación."
  },
  {
    id: "in",
    numero: 10,
    bloque: "Bloque 1: Consultas Básicas y Filtrado",
    nombre: "IN",
    categoria: "Consultas Básicas y Filtrado",
    resumen: "Comprueba si un valor coincide con cualquier valor de una lista.",
    sintaxis: "SELECT columnas\nFROM tabla\nWHERE columna IN (val1, val2, ... | subconsulta);",
    ejemplo: "SELECT id, cliente, estado\nFROM Pedidos\nWHERE estado IN ('Pendiente', 'En Proceso', 'Enviado');",
    tip: "Funciona como una concatenación lógica de comparaciones OR; también acepta subconsultas correlacionadas."
  },
  {
    id: "between",
    numero: 11,
    bloque: "Bloque 1: Consultas Básicas y Filtrado",
    nombre: "BETWEEN",
    categoria: "Consultas Básicas y Filtrado",
    resumen: "Filtra valores dentro de un rango específico (inclusivo).",
    sintaxis: "SELECT columnas\nFROM tabla\nWHERE columna BETWEEN limite_inferior AND limite_superior;",
    ejemplo: "SELECT id_factura, total, fecha\nFROM Facturas\nWHERE fecha BETWEEN '2024-01-01' AND '2024-03-31';",
    tip: "Es inclusivo en ambos extremos: equivale exactamente a (columna >= lim_inf AND columna <= lim_sup)."
  },
  {
    id: "like",
    numero: 12,
    bloque: "Bloque 1: Consultas Básicas y Filtrado",
    nombre: "LIKE",
    categoria: "Consultas Básicas y Filtrado",
    resumen: "Realiza búsquedas de patrones utilizando comodines (%, _).",
    sintaxis: "SELECT columnas\nFROM tabla\nWHERE columna LIKE 'patron';",
    ejemplo: "SELECT id, cliente, correo\nFROM Clientes\nWHERE correo LIKE '%@gmail.com' AND nombre LIKE 'J_an%';",
    tip: "Colocar el comodín % al principio ('%texto') inhabilita el uso de índices convencionales y fuerza un escaneo completo de la tabla."
  },
  {
    id: "is-null",
    numero: 13,
    bloque: "Bloque 1: Consultas Básicas y Filtrado",
    nombre: "IS NULL",
    categoria: "Consultas Básicas y Filtrado",
    resumen: "Comprueba si un valor es nulo (NULL).",
    sintaxis: "SELECT columnas\nFROM tabla\nWHERE columna IS NULL;",
    ejemplo: "SELECT id, nombre, telefono\nFROM Contactos\nWHERE telefono IS NULL;",
    tip: "Nunca utilices '= NULL' debido a que en la lógica trivaluada de SQL la comparación NULL = NULL evalúa siempre como UNKNOWN."
  },
  {
    id: "is-not-null",
    numero: 14,
    bloque: "Bloque 1: Consultas Básicas y Filtrado",
    nombre: "IS NOT NULL",
    categoria: "Consultas Básicas y Filtrado",
    resumen: "Comprueba si un valor no es nulo.",
    sintaxis: "SELECT columnas\nFROM tabla\nWHERE columna IS NOT NULL;",
    ejemplo: "SELECT id_usuario, correo, fecha_verificacion\nFROM Usuarios\nWHERE fecha_verificacion IS NOT NULL;",
    tip: "Ideal para filtrar registros completos y excluir filas con datos incompletos en columnas opcionales."
  },
  {
    id: "and",
    numero: 15,
    bloque: "Bloque 1: Consultas Básicas y Filtrado",
    nombre: "AND",
    categoria: "Consultas Básicas y Filtrado",
    resumen: "Operador lógico que requiere que todas las condiciones sean verdaderas.",
    sintaxis: "SELECT columnas\nFROM tabla\nWHERE cond1 AND cond2;",
    ejemplo: "SELECT * FROM Inventario\nWHERE categoria = 'Laptops' AND precio < 2500 AND stock > 0;",
    tip: "En el orden de precedencia lógica de SQL Server, AND tiene mayor prioridad que OR."
  },
  {
    id: "or",
    numero: 16,
    bloque: "Bloque 1: Consultas Básicas y Filtrado",
    nombre: "OR",
    categoria: "Consultas Básicas y Filtrado",
    resumen: "Operador lógico que requiere que al menos una condición sea verdadera.",
    sintaxis: "SELECT columnas\nFROM tabla\nWHERE cond1 OR cond2;",
    ejemplo: "SELECT * FROM Clientes\nWHERE ciudad = 'Lima' OR ciudad = 'Huancayo';",
    tip: "Agrupa siempre las condiciones con paréntesis cuando combines operadores AND y OR para evitar evaluaciones ambiguas."
  },
  {
    id: "not",
    numero: 17,
    bloque: "Bloque 1: Consultas Básicas y Filtrado",
    nombre: "NOT",
    categoria: "Consultas Básicas y Filtrado",
    resumen: "Niega una condición lógica.",
    sintaxis: "SELECT columnas\nFROM tabla\nWHERE NOT (condicion);",
    ejemplo: "SELECT * FROM Empleados\nWHERE NOT (departamento = 'Ventas' OR salario < 1800);",
    tip: "Se combina habitualmente con operadores relacionales: NOT IN, NOT LIKE, NOT EXISTS y NOT BETWEEN."
  },
  {
    id: "all",
    numero: 18,
    bloque: "Bloque 1: Consultas Básicas y Filtrado",
    nombre: "ALL",
    categoria: "Consultas Básicas y Filtrado",
    resumen: "Compara un valor con todos los valores de un conjunto.",
    sintaxis: "SELECT columnas\nFROM tabla\nWHERE valor operador ALL (subconsulta);",
    ejemplo: "SELECT nombre, salario\nFROM Empleados\nWHERE salario > ALL (\n    SELECT salario FROM Empleados WHERE depto_id = 3\n);",
    tip: "La condición debe cumplirse contra cada uno de los valores devueltos por la subconsulta para retornar verdadero."
  },
  {
    id: "any-some",
    numero: 19,
    bloque: "Bloque 1: Consultas Básicas y Filtrado",
    nombre: "ANY / SOME",
    categoria: "Consultas Básicas y Filtrado",
    resumen: "Compara un valor con al menos uno de los valores de un conjunto.",
    sintaxis: "SELECT columnas\nFROM tabla\nWHERE valor operador ANY (subconsulta);",
    ejemplo: "SELECT producto, precio\nFROM Productos\nWHERE precio > ANY (\n    SELECT precio FROM Productos WHERE categoria = 'Accesorios'\n);",
    tip: "ANY y SOME son sinónimos idénticos en el estándar ANSI SQL; evalúa como verdadero con solo una coincidencia válida."
  },
  {
    id: "exists",
    numero: 20,
    bloque: "Bloque 1: Consultas Básicas y Filtrado",
    nombre: "EXISTS",
    categoria: "Consultas Básicas y Filtrado",
    resumen: "Comprueba la existencia de filas en una subconsulta.",
    sintaxis: "SELECT columnas\nFROM tabla\nWHERE EXISTS (subconsulta);",
    ejemplo: "SELECT c.id, c.nombre\nFROM Clientes c\nWHERE EXISTS (\n    SELECT 1 FROM Pedidos p WHERE p.cliente_id = c.id AND p.total > 1000\n);",
    tip: "Aplica cortocircuito (short-circuit): detiene la ejecución interna en cuanto halla la primera fila coincidente, siendo sumamente rápido."
  },

  // =========================================================================
  // BLOQUE 2: Agregación, Agrupamiento y Conjuntos (21 a 40)
  // =========================================================================
  {
    id: "group-by",
    numero: 21,
    bloque: "Bloque 2: Agregación, Agrupamiento y Conjuntos",
    nombre: "GROUP BY",
    categoria: "Agregación, Agrupamiento y Conjuntos",
    resumen: "Agrupa filas que comparten los mismos valores en columnas resumidas.",
    sintaxis: "SELECT col_grupo, COUNT(*), SUM(col_valor)\nFROM tabla\nGROUP BY col_grupo;",
    ejemplo: "SELECT depto_id, COUNT(*) AS TotalEmpleados, AVG(salario) AS SueldoPromedio\nFROM Empleados\nGROUP BY depto_id;",
    tip: "Toda columna presente en el SELECT que no forme parte de una función de agregación debe figurar explícitamente en el GROUP BY."
  },
  {
    id: "having",
    numero: 22,
    bloque: "Bloque 2: Agregación, Agrupamiento y Conjuntos",
    nombre: "HAVING",
    categoria: "Agregación, Agrupamiento y Conjuntos",
    resumen: "Filtra grupos después de aplicar una función de agregación (GROUP BY).",
    sintaxis: "SELECT col_grupo, COUNT(*)\nFROM tabla\nGROUP BY col_grupo\nHAVING COUNT(*) > valor;",
    ejemplo: "SELECT depto_id, COUNT(*) AS Cantidad\nFROM Empleados\nGROUP BY depto_id\nHAVING COUNT(*) >= 5;",
    tip: "WHERE descarta filas antes de agrupar; HAVING descarta los grupos generados después del cálculo de agregación."
  },
  {
    id: "sum",
    numero: 23,
    bloque: "Bloque 2: Agregación, Agrupamiento y Conjuntos",
    nombre: "SUM()",
    categoria: "Agregación, Agrupamiento y Conjuntos",
    resumen: "Función de agregación para calcular la suma total.",
    sintaxis: "SELECT SUM(columna_numerica)\nFROM tabla\n[WHERE condicion];",
    ejemplo: "SELECT SUM(monto_total) AS TotalRecaudado\nFROM Facturas\nWHERE YEAR(fecha) = 2024;",
    tip: "Ignora los valores nulos durante la suma; si toda la columna es nula retornará NULL a menos que utilices ISNULL(SUM(col), 0)."
  },
  {
    id: "count",
    numero: 24,
    bloque: "Bloque 2: Agregación, Agrupamiento y Conjuntos",
    nombre: "COUNT()",
    categoria: "Agregación, Agrupamiento y Conjuntos",
    resumen: "Cuenta el número de filas o elementos.",
    sintaxis: "SELECT COUNT(* | columna | DISTINCT columna)\nFROM tabla;",
    ejemplo: "SELECT COUNT(*) AS FilasTotales, COUNT(telefono) AS ConTelefono, COUNT(DISTINCT pais) AS PaisesUnicos\nFROM Clientes;",
    tip: "COUNT(*) cuenta todas las filas incluso si contienen valores NULL, mientras que COUNT(columna) contabiliza únicamente las filas no nulas."
  },
  {
    id: "avg",
    numero: 25,
    bloque: "Bloque 2: Agregación, Agrupamiento y Conjuntos",
    nombre: "AVG()",
    categoria: "Agregación, Agrupamiento y Conjuntos",
    resumen: "Calcula el promedio aritmético.",
    sintaxis: "SELECT AVG(columna_numerica)\nFROM tabla;",
    ejemplo: "SELECT AVG(CAST(calificacion AS DECIMAL(5,2))) AS PromedioNotas\nFROM Evaluaciones;",
    tip: "Si calculas el promedio de columnas de tipo entero (INT), SQL trunca los decimales; convierte con CAST(col AS FLOAT/DECIMAL) para evitar pérdida de precisión."
  },
  {
    id: "max",
    numero: 26,
    bloque: "Bloque 2: Agregación, Agrupamiento y Conjuntos",
    nombre: "MAX()",
    categoria: "Agregación, Agrupamiento y Conjuntos",
    resumen: "Obtiene el valor máximo de un conjunto.",
    sintaxis: "SELECT MAX(columna)\nFROM tabla;",
    ejemplo: "SELECT MAX(precio) AS PrecioMaximo, MAX(fecha_registro) AS UltimoRegistro\nFROM Productos;",
    tip: "Funciona tanto con tipos numéricos como con fechas y cadenas alfanuméricas respetando el orden de intercalación (Collation)."
  },
  {
    id: "min",
    numero: 27,
    bloque: "Bloque 2: Agregación, Agrupamiento y Conjuntos",
    nombre: "MIN()",
    categoria: "Agregación, Agrupamiento y Conjuntos",
    resumen: "Obtiene el valor mínimo de un conjunto.",
    sintaxis: "SELECT MIN(columna)\nFROM tabla;",
    ejemplo: "SELECT MIN(precio) AS MenorPrecio, MIN(fecha_ingreso) AS EmpleadoMasAntiguo\nFROM Empleados;",
    tip: "Si existe un índice no agrupado sobre la columna, MIN() se resuelve en O(1) tiempo constante mediante un Index Seek sobre el primer nodo."
  },
  {
    id: "union",
    numero: 28,
    bloque: "Bloque 2: Agregación, Agrupamiento y Conjuntos",
    nombre: "UNION",
    categoria: "Agregación, Agrupamiento y Conjuntos",
    resumen: "Combina los resultados de dos consultas eliminando duplicados.",
    sintaxis: "SELECT col1, col2 FROM tabla1\nUNION\nSELECT col1, col2 FROM tabla2;",
    ejemplo: "SELECT email FROM ClientesActivos\nUNION\nSELECT email FROM Proveedores;",
    tip: "Aplica una operación de ordenamiento u orden hash implícita para descartar duplicados, lo cual tiene costo en CPU y memoria."
  },
  {
    id: "union-all",
    numero: 29,
    bloque: "Bloque 2: Agregación, Agrupamiento y Conjuntos",
    nombre: "UNION ALL",
    categoria: "Agregación, Agrupamiento y Conjuntos",
    resumen: "Combina los resultados de dos consultas incluyendo duplicados.",
    sintaxis: "SELECT col1, col2 FROM tabla1\nUNION ALL\nSELECT col1, col2 FROM tabla2;",
    ejemplo: "SELECT id, monto, 'Local' AS Origen FROM VentasTienda\nUNION ALL\nSELECT id, monto, 'Web' AS Origen FROM VentasOnline;",
    tip: "Es significativamente más rápido que UNION puesto que no realiza la fase de desduplicación de datos."
  },
  {
    id: "intersect",
    numero: 30,
    bloque: "Bloque 2: Agregación, Agrupamiento y Conjuntos",
    nombre: "INTERSECT",
    categoria: "Agregación, Agrupamiento y Conjuntos",
    resumen: "Devuelve solo los valores comunes entre dos consultas.",
    sintaxis: "SELECT columna FROM consulta1\nINTERSECT\nSELECT columna FROM consulta2;",
    ejemplo: "SELECT cliente_id FROM Compras2023\nINTERSECT\nSELECT cliente_id FROM Compras2024;",
    tip: "Ambas consultas deben poseer el mismo número de columnas y tipos de datos compatibles entre sí."
  },
  {
    id: "except",
    numero: 31,
    bloque: "Bloque 2: Agregación, Agrupamiento y Conjuntos",
    nombre: "EXCEPT",
    categoria: "Agregación, Agrupamiento y Conjuntos",
    resumen: "Devuelve las filas de la primera consulta que no están en la segunda.",
    sintaxis: "SELECT columna FROM consulta1\nEXCEPT\nSELECT columna FROM consulta2;",
    ejemplo: "SELECT producto_id FROM CatalogoGeneral\nEXCEPT\nSELECT producto_id FROM ProductosVendidos;",
    tip: "En otros motores como Oracle o PostgreSQL es conocido como MINUS; halla registros no coincidentes de forma atómica."
  },
  {
    id: "rollup",
    numero: 32,
    bloque: "Bloque 2: Agregación, Agrupamiento y Conjuntos",
    nombre: "ROLLUP",
    categoria: "Agregación, Agrupamiento y Conjuntos",
    resumen: "Genera subtotales y un total general dentro de GROUP BY.",
    sintaxis: "SELECT col1, col2, SUM(total)\nFROM tabla\nGROUP BY ROLLUP (col1, col2);",
    ejemplo: "SELECT categoria, subcategoria, SUM(ventas) AS VentasTotales\nFROM ReporteVentas\nGROUP BY ROLLUP (categoria, subcategoria);",
    tip: "Sigue una jerarquía estricta de derecha a izquierda, ideal para estructuras contables de año > mes > día."
  },
  {
    id: "cube",
    numero: 33,
    bloque: "Bloque 2: Agregación, Agrupamiento y Conjuntos",
    nombre: "CUBE",
    categoria: "Agregación, Agrupamiento y Conjuntos",
    resumen: "Genera todas las combinaciones posibles de agregaciones en GROUP BY.",
    sintaxis: "SELECT col1, col2, SUM(total)\nFROM tabla\nGROUP BY CUBE (col1, col2);",
    ejemplo: "SELECT anio, region, SUM(monto) AS Total\nFROM Facturacion\nGROUP BY CUBE (anio, region);",
    tip: "Genera 2^N combinaciones de subtotales; excelente para reportería multidimensional de inteligencia de negocios (OLAP)."
  },
  {
    id: "grouping-sets",
    numero: 34,
    bloque: "Bloque 2: Agregación, Agrupamiento y Conjuntos",
    nombre: "GROUPING SETS",
    categoria: "Agregación, Agrupamiento y Conjuntos",
    resumen: "Permite definir múltiples agrupaciones personalizadas en una sola consulta.",
    sintaxis: "SELECT col1, col2, COUNT(*)\nFROM tabla\nGROUP BY GROUPING SETS ((col1), (col2), ());",
    ejemplo: "SELECT sede, cargo, AVG(sueldo) AS SueldoPromedio\nFROM Empleados\nGROUP BY GROUPING SETS ((sede, cargo), (sede), ());",
    tip: "Reemplaza eficientemente la necesidad de unir múltiples consultas individuales mediante UNION ALL."
  },
  {
    id: "over",
    numero: 35,
    bloque: "Bloque 2: Agregación, Agrupamiento y Conjuntos",
    nombre: "OVER()",
    categoria: "Agregación, Agrupamiento y Conjuntos",
    resumen: "Define una ventana de filas para aplicar funciones analíticas.",
    sintaxis: "SELECT col, FUNCION() OVER([PARTITION BY ...] [ORDER BY ...])\nFROM tabla;",
    ejemplo: "SELECT id, cliente_id, total,\n       SUM(total) OVER(PARTITION BY cliente_id) AS GastoTotalCliente\nFROM Pedidos;",
    tip: "Permite calcular totales acumulados y promedios grupales sin colapsar las filas individuales del SELECT."
  },
  {
    id: "partition-by",
    numero: 36,
    bloque: "Bloque 2: Agregación, Agrupamiento y Conjuntos",
    nombre: "PARTITION BY",
    categoria: "Agregación, Agrupamiento y Conjuntos",
    resumen: "Divide el conjunto de resultados en particiones para funciones de ventana.",
    sintaxis: "OVER (PARTITION BY col1, col2 ORDER BY col3)",
    ejemplo: "SELECT id_alumno, curso_id, nota,\n       AVG(nota) OVER(PARTITION BY curso_id) AS PromedioDelCurso\nFROM Calificaciones;",
    tip: "El cálculo analítico se restablece a cero cada vez que cambia el valor de la columna de partición."
  },
  {
    id: "row-number",
    numero: 37,
    bloque: "Bloque 2: Agregación, Agrupamiento y Conjuntos",
    nombre: "ROW_NUMBER()",
    categoria: "Agregación, Agrupamiento y Conjuntos",
    resumen: "Asigna un número secuencial único a cada fila dentro de una partición.",
    sintaxis: "ROW_NUMBER() OVER ([PARTITION BY col] ORDER BY col_orden [ASC|DESC])",
    ejemplo: "SELECT id, nombre, salario,\n       ROW_NUMBER() OVER(ORDER BY salario DESC) AS RankingGeneral\nFROM Empleados;",
    tip: "Nunca genera empates en la numeración; es el método estándar para paginación de resultados de alto rendimiento."
  },
  {
    id: "rank",
    numero: 38,
    bloque: "Bloque 2: Agregación, Agrupamiento y Conjuntos",
    nombre: "RANK()",
    categoria: "Agregación, Agrupamiento y Conjuntos",
    resumen: "Asigna un rango a cada fila con saltos en caso de empates.",
    sintaxis: "RANK() OVER ([PARTITION BY col] ORDER BY col_orden)",
    ejemplo: "SELECT atleta, tiempo,\n       RANK() OVER(ORDER BY tiempo ASC) AS Posicion\nFROM ResultadosCarrera;",
    tip: "Si dos filas empatan en la posición 1, la siguiente fila recibirá la posición 3, reflejando el salto real."
  },
  {
    id: "dense-rank",
    numero: 39,
    bloque: "Bloque 2: Agregación, Agrupamiento y Conjuntos",
    nombre: "DENSE_RANK()",
    categoria: "Agregación, Agrupamiento y Conjuntos",
    resumen: "Asigna un rango a cada fila sin saltos en caso de empates.",
    sintaxis: "DENSE_RANK() OVER ([PARTITION BY col] ORDER BY col_orden)",
    ejemplo: "SELECT estudiante, promedio,\n       DENSE_RANK() OVER(ORDER BY promedio DESC) AS PuestoMeritorio\nFROM CalificacionesFinales;",
    tip: "A diferencia de RANK(), no deja huecos tras empates: si hay empate en el puesto 1, el siguiente será el 2."
  },
  {
    id: "ntile",
    numero: 40,
    bloque: "Bloque 2: Agregación, Agrupamiento y Conjuntos",
    nombre: "NTILE()",
    categoria: "Agregación, Agrupamiento y Conjuntos",
    resumen: "Distribuye las filas de una partición en un número especificado de grupos.",
    sintaxis: "NTILE(numero_de_cubos) OVER (ORDER BY col_orden)",
    ejemplo: "SELECT cliente_id, monto_anual,\n       NTILE(4) OVER(ORDER BY monto_anual DESC) AS CuartilCliente\nFROM VentasAnuales;",
    tip: "Herramienta analítica indispensable para calcular cuartiles (4), deciles (10) o percentiles (100) en marketing y finanzas."
  },

  // =========================================================================
  // BLOQUE 3: Uniones (Joins) y Subconsultas (41 a 55)
  // =========================================================================
  {
    id: "inner-join",
    numero: 41,
    bloque: "Bloque 3: Uniones (Joins) y Subconsultas",
    nombre: "INNER JOIN",
    categoria: "Uniones (Joins) y Subconsultas",
    resumen: "Devuelve registros que tienen valores coincidentes en ambas tablas.",
    sintaxis: "SELECT columnas\nFROM TablaA\nINNER JOIN TablaB ON TablaA.id = TablaB.a_id;",
    ejemplo: "SELECT o.id_orden, c.nombre, o.fecha\nFROM Ordenes o\nINNER JOIN Clientes c ON o.cliente_id = c.id;",
    tip: "Excluye todas las filas huérfanas que no satisfacen la igualdad del predicado ON en ambos lados."
  },
  {
    id: "left-join",
    numero: 42,
    bloque: "Bloque 3: Uniones (Joins) y Subconsultas",
    nombre: "LEFT JOIN (LEFT OUTER JOIN)",
    categoria: "Uniones (Joins) y Subconsultas",
    resumen: "Devuelve todos los registros de la tabla izquierda y los coincidentes de la derecha.",
    sintaxis: "SELECT columnas\nFROM TablaA\nLEFT JOIN TablaB ON TablaA.id = TablaB.a_id;",
    ejemplo: "SELECT c.id, c.nombre, p.id_pedido\nFROM Clientes c\nLEFT JOIN Pedidos p ON c.id = p.cliente_id\nWHERE p.id_pedido IS NULL; -- Halla clientes sin compras",
    tip: "Si no existe coincidencia en la tabla derecha, sus columnas se rellenan con NULL. Ideal para auditoría de ausencias."
  },
  {
    id: "right-join",
    numero: 43,
    bloque: "Bloque 3: Uniones (Joins) y Subconsultas",
    nombre: "RIGHT JOIN (RIGHT OUTER JOIN)",
    categoria: "Uniones (Joins) y Subconsultas",
    resumen: "Devuelve todos los registros de la tabla derecha y los coincidentes de la izquierda.",
    sintaxis: "SELECT columnas\nFROM TablaA\nRIGHT JOIN TablaB ON TablaA.id = TablaB.a_id;",
    ejemplo: "SELECT e.nombre, d.nombre_depto\nFROM Empleados e\nRIGHT JOIN Departamentos d ON e.depto_id = d.id;",
    tip: "Es la operación inversa simétrica de LEFT JOIN; suele sustituirse por LEFT JOIN invirtiendo el orden de las tablas."
  },
  {
    id: "full-join",
    numero: 44,
    bloque: "Bloque 3: Uniones (Joins) y Subconsultas",
    nombre: "FULL JOIN (FULL OUTER JOIN)",
    categoria: "Uniones (Joins) y Subconsultas",
    resumen: "Devuelve todos los registros cuando hay coincidencia en cualquiera de las tablas.",
    sintaxis: "SELECT columnas\nFROM TablaA\nFULL OUTER JOIN TablaB ON TablaA.id = TablaB.a_id;",
    ejemplo: "SELECT p.nombre_producto, v.id_venta\nFROM Productos p\nFULL OUTER JOIN VentasDetalle v ON p.id = v.producto_id;",
    tip: "Combina los efectos de LEFT JOIN y RIGHT JOIN de forma integral, completando con NULL en ambas direcciones."
  },
  {
    id: "cross-join",
    numero: 45,
    bloque: "Bloque 3: Uniones (Joins) y Subconsultas",
    nombre: "CROSS JOIN",
    categoria: "Uniones (Joins) y Subconsultas",
    resumen: "Produce un producto cartesiano entre dos tablas.",
    sintaxis: "SELECT columnas\nFROM TablaA\nCROSS JOIN TablaB;",
    ejemplo: "SELECT t.talla, c.color\nFROM Tallas t\nCROSS JOIN Colores c;",
    tip: "Si la tabla A tiene N filas y la tabla B tiene M filas, el resultado tendrá N x M filas. Emplear con prudencia en tablas extensas."
  },
  {
    id: "apply",
    numero: 46,
    bloque: "Bloque 3: Uniones (Joins) y Subconsultas",
    nombre: "APPLY (CROSS / OUTER)",
    categoria: "Uniones (Joins) y Subconsultas",
    resumen: "Permite evaluar una función de valor de tabla por cada fila de una tabla exterior.",
    sintaxis: "SELECT columnas\nFROM TablaExterior t\nCROSS APPLY fn_ValoresTabla(t.id) AS f;",
    ejemplo: "SELECT c.nombre, top_pedidos.*\nFROM Clientes c\nCROSS APPLY (\n    SELECT TOP (2) id, total FROM Pedidos p\n    WHERE p.cliente_id = c.id ORDER BY total DESC\n) AS top_pedidos;",
    tip: "CROSS APPLY simula un INNER JOIN con expresiones parametrizadas y OUTER APPLY emula un LEFT JOIN."
  },
  {
    id: "with-cte",
    numero: 47,
    bloque: "Bloque 3: Uniones (Joins) y Subconsultas",
    nombre: "WITH (CTE - Common Table Expression)",
    categoria: "Uniones (Joins) y Subconsultas",
    resumen: "Define un conjunto de resultados con nombre temporal para usar en una consulta principal.",
    sintaxis: "WITH NombreCTE AS (\n    SELECT ...\n)\nSELECT * FROM NombreCTE;",
    ejemplo: "WITH VentasPorCliente AS (\n    SELECT cliente_id, SUM(total) AS TotalGastado\n    FROM Ordenes\n    GROUP BY cliente_id\n)\nSELECT v.*, c.nombre\nFROM VentasPorCliente v\nJOIN Clientes c ON v.cliente_id = c.id\nWHERE v.TotalGastado > 5000;",
    tip: "Aumenta la legibilidad frente a subconsultas profundamente anidadas y permite algoritmos jerárquicos recursivos."
  },
  {
    id: "pivot",
    numero: 48,
    bloque: "Bloque 3: Uniones (Joins) y Subconsultas",
    nombre: "PIVOT",
    categoria: "Uniones (Joins) y Subconsultas",
    resumen: "Convierte filas en columnas.",
    sintaxis: "SELECT * FROM (\n    SELECT col_fila, col_rotar, col_valor FROM tabla\n) AS src\nPIVOT (\n    SUM(col_valor) FOR col_rotar IN ([Val1], [Val2])\n) AS pvt;",
    ejemplo: "SELECT Anio, [1] AS Enero, [2] AS Febrero, [3] AS Marzo\nFROM (\n    SELECT YEAR(fecha) AS Anio, MONTH(fecha) AS Mes, monto FROM Ventas\n) AS Fuente\nPIVOT (\n    SUM(monto) FOR Mes IN ([1], [2], [3])\n) AS TablaPivot;",
    tip: "Ideal para preparar matrices contables, hojas de cálculo y tableros de mando ejecutivos directamente en el motor."
  },
  {
    id: "unpivot",
    numero: 49,
    bloque: "Bloque 3: Uniones (Joins) y Subconsultas",
    nombre: "UNPIVOT",
    categoria: "Uniones (Joins) y Subconsultas",
    resumen: "Convierte columnas en filas.",
    sintaxis: "SELECT * FROM TablaPivotada\nUNPIVOT (\n    valor FOR nueva_columna IN (col1, col2, ...)\n) AS unpvt;",
    ejemplo: "SELECT Producto, Trimestre, Ventas\nFROM VentasTrimestrales\nUNPIVOT (\n    Ventas FOR Trimestre IN (Q1, Q2, Q3, Q4)\n) AS Despivotado;",
    tip: "Normaliza estructuras tabulares desnormalizadas para reintegrarlas a modelos entidad-relación transaccionales."
  },
  {
    id: "string-agg",
    numero: 50,
    bloque: "Bloque 3: Uniones (Joins) y Subconsultas",
    nombre: "STRING_AGG()",
    categoria: "Uniones (Joins) y Subconsultas",
    resumen: "Concatena cadenas de texto de varias filas separadas por un delimitador.",
    sintaxis: "SELECT STRING_AGG(columna, ', ') [WITHIN GROUP (ORDER BY col)]\nFROM tabla;",
    ejemplo: "SELECT depto_id,\n       STRING_AGG(nombre, '; ') WITHIN GROUP (ORDER BY apellido ASC) AS ListaEmpleados\nFROM Empleados\nGROUP BY depto_id;",
    tip: "Nativo desde SQL Server 2017, sustituye los complejos trucos históricos con FOR XML PATH('') y STUFF."
  },
  {
    id: "json-value",
    numero: 51,
    bloque: "Bloque 3: Uniones (Joins) y Subconsultas",
    nombre: "JSON_VALUE()",
    categoria: "Uniones (Joins) y Subconsultas",
    resumen: "Extrae un escalar de una cadena JSON.",
    sintaxis: "SELECT JSON_VALUE(columna_json, '$.ruta.propiedad')\nFROM tabla;",
    ejemplo: "SELECT id, JSON_VALUE(payload_json, '$.cliente.telefono') AS Telefono\nFROM LogTransacciones;",
    tip: "Solo extrae valores primitivos escalares (texto, número, booleanos); retorna NULL si la ruta apunta a un array u objeto."
  },
  {
    id: "json-query",
    numero: 52,
    bloque: "Bloque 3: Uniones (Joins) y Subconsultas",
    nombre: "JSON_QUERY()",
    categoria: "Uniones (Joins) y Subconsultas",
    resumen: "Extrae un objeto o matriz JSON.",
    sintaxis: "SELECT JSON_QUERY(columna_json, '$.ruta_objeto')\nFROM tabla;",
    ejemplo: "SELECT id, JSON_QUERY(payload_json, '$.items_comprados') AS ArrayItems\nFROM OrdenesCompra;",
    tip: "A diferencia de JSON_VALUE, JSON_QUERY extrae subfragmentos estructurados válidos (JSON completo) sin desarmarlos."
  },
  {
    id: "for-json",
    numero: 53,
    bloque: "Bloque 3: Uniones (Joins) y Subconsultas",
    nombre: "FOR JSON",
    categoria: "Uniones (Joins) y Subconsultas",
    resumen: "Convierte los resultados de una consulta a formato JSON.",
    sintaxis: "SELECT columnas\nFROM tabla\nFOR JSON AUTO | PATH [, ROOT('NombreRaiz')];",
    ejemplo: "SELECT id, nombre, email\nFROM Clientes\nFOR JSON PATH, ROOT('Clientes');",
    tip: "Con FOR JSON PATH puedes anidar propiedades fácilmente utilizando puntos en el alias de la columna (ej: 'cliente.direccion')."
  },
  {
    id: "for-xml",
    numero: 54,
    bloque: "Bloque 3: Uniones (Joins) y Subconsultas",
    nombre: "FOR XML",
    categoria: "Uniones (Joins) y Subconsultas",
    resumen: "Convierte los resultados de una consulta a formato XML.",
    sintaxis: "SELECT columnas\nFROM tabla\nFOR XML RAW | AUTO | PATH('Elemento') [, ROOT('Raiz')];",
    ejemplo: "SELECT id AS '@id', nombre AS 'Datos/Nombre'\nFROM Empleados\nFOR XML PATH('Empleado'), ROOT('Empresa');",
    tip: "El prefijo '@' en el alias de la columna transforma ese valor en un atributo XML del elemento contenedor."
  },
  {
    id: "openjson",
    numero: 55,
    bloque: "Bloque 3: Uniones (Joins) y Subconsultas",
    nombre: "OPENJSON()",
    categoria: "Uniones (Joins) y Subconsultas",
    resumen: "Analiza texto JSON y expone los datos en formato de filas y columnas.",
    sintaxis: "SELECT * FROM OPENJSON(@variable_json) WITH (col tipo '$.ruta', ...);",
    ejemplo: "DECLARE @json NVARCHAR(MAX) = N'{\"items\": [{\"id\": 1, \"precio\": 10.5}, {\"id\": 2, \"precio\": 20.0}]}';\nSELECT * FROM OPENJSON(@json, '$.items')\nWITH (id INT '$.id', precio DECIMAL(10,2) '$.precio');",
    tip: "Función de conjunto de filas de alto desempeño para deserializar payloads recibidos de servicios REST y Microservicios."
  },

  // =========================================================================
  // BLOQUE 4: Modificación de Datos (CRUD) (56 a 70)
  // =========================================================================
  {
    id: "insert-into",
    numero: 56,
    bloque: "Bloque 4: Modificación de Datos (CRUD)",
    nombre: "INSERT INTO",
    categoria: "Modificación de Datos (CRUD)",
    resumen: "Inserta nuevas filas en una tabla.",
    sintaxis: "INSERT INTO tabla (col1, col2, ...)\nVALUES (val1, val2, ...);",
    ejemplo: "INSERT INTO Empleados (nombre, apellido, email, salario)\nVALUES ('Jorge', 'Villar', 'jorge@ejemplo.com', 4500.00);",
    tip: "Especifica siempre la lista explícita de columnas destino para blindar tus scripts contra cambios futuros en el orden de las columnas."
  },
  {
    id: "values",
    numero: 57,
    bloque: "Bloque 4: Modificación de Datos (CRUD)",
    nombre: "VALUES",
    categoria: "Modificación de Datos (CRUD)",
    resumen: "Especifica los valores que se van a insertar.",
    sintaxis: "VALUES (val1, val2), (val3, val4), ...;",
    ejemplo: "INSERT INTO Categorias (nombre, activo)\nVALUES \n    ('Hardware', 1),\n    ('Software', 1),\n    ('Redes', 0);",
    tip: "Permite inserciones multi-fila (Row Value Constructor) en una sola sentencia con un límite de hasta 1,000 tuplas por comando."
  },
  {
    id: "update",
    numero: 58,
    bloque: "Bloque 4: Modificación de Datos (CRUD)",
    nombre: "UPDATE",
    categoria: "Modificación de Datos (CRUD)",
    resumen: "Modifica los datos existentes en una tabla.",
    sintaxis: "UPDATE tabla\nSET col1 = val1, col2 = val2\nWHERE condicion;",
    ejemplo: "UPDATE Productos\nSET precio = precio * 1.10, fecha_modificacion = GETDATE()\nWHERE categoria_id = 5;",
    tip: "¡Precaución! Ejecutar un UPDATE sin cláusula WHERE actualizará de manera irreversible cada una de las filas de la tabla."
  },
  {
    id: "set",
    numero: 59,
    bloque: "Bloque 4: Modificación de Datos (CRUD)",
    nombre: "SET",
    categoria: "Modificación de Datos (CRUD)",
    resumen: "Asigna nuevos valores a columnas en operaciones de actualización.",
    sintaxis: "SET columna = nuevo_valor, ...",
    ejemplo: "UPDATE Cuentas\nSET estado = 'Bloqueada', intentos_fallidos = 0\nWHERE id = 1045;",
    tip: "En T-SQL también se utiliza para asignar valores a variables locales escalares: SET @total = 1000;"
  },
  {
    id: "delete-from",
    numero: 60,
    bloque: "Bloque 4: Modificación de Datos (CRUD)",
    nombre: "DELETE FROM",
    categoria: "Modificación de Datos (CRUD)",
    resumen: "Elimina filas de una tabla.",
    sintaxis: "DELETE FROM tabla\nWHERE condicion;",
    ejemplo: "DELETE FROM SesionesUsuario\nWHERE fecha_expiracion < GETDATE();",
    tip: "Cada fila eliminada se escribe individualmente en el Transaction Log; en tablas con millones de registros es más eficiente eliminar en lotes (TOP)."
  },
  {
    id: "truncate-table",
    numero: 61,
    bloque: "Bloque 4: Modificación de Datos (CRUD)",
    nombre: "TRUNCATE TABLE",
    categoria: "Modificación de Datos (CRUD)",
    resumen: "Vacía una tabla rápidamente eliminando todas las filas sin registrar los deletes individuales.",
    sintaxis: "TRUNCATE TABLE nombre_tabla;",
    ejemplo: "TRUNCATE TABLE LogsTemporales;",
    tip: "Desasigna las páginas completas de datos de disco, restablece el contador de columnas IDENTITY a su valor inicial y registra mínimamente."
  },
  {
    id: "merge",
    numero: 62,
    bloque: "Bloque 4: Modificación de Datos (CRUD)",
    nombre: "MERGE",
    categoria: "Modificación de Datos (CRUD)",
    resumen: "Realiza operaciones de inserción, actualización y eliminación condicionales de forma simultánea (Upsert).",
    sintaxis: "MERGE Destino AS d\nUSING Origen AS o ON d.id = o.id\nWHEN MATCHED THEN UPDATE SET ...\nWHEN NOT MATCHED THEN INSERT ...;",
    ejemplo: "MERGE Inventario AS d\nUSING LoteLlegada AS o ON d.sku = o.sku\nWHEN MATCHED THEN\n    UPDATE SET d.stock = d.stock + o.stock\nWHEN NOT MATCHED THEN\n    INSERT (sku, stock) VALUES (o.sku, o.stock);",
    tip: "Es requisito obligatorio por el estándar ANSI SQL terminar siempre la instrucción MERGE con un punto y coma (;)."
  },
  {
    id: "output",
    numero: 63,
    bloque: "Bloque 4: Modificación de Datos (CRUD)",
    nombre: "OUTPUT",
    categoria: "Modificación de Datos (CRUD)",
    resumen: "Devuelve información de las filas afectadas por operaciones DML (INSERT, UPDATE, DELETE).",
    sintaxis: "INSERT / UPDATE / DELETE ...\nOUTPUT inserted.col, deleted.col\n[INTO @TablaTemp];",
    ejemplo: "DELETE FROM ClientesInactivos\nOUTPUT deleted.id, deleted.nombre, GETDATE()\nINTO HistorialBajas (cliente_id, nombre, fecha_baja)\nWHERE dias_inactivo > 365;",
    tip: "Brinda acceso directo a las pseudotablas inserted y deleted dentro de una sola transacción sin necesidad de triggers adicionales."
  },
  {
    id: "default-values",
    numero: 64,
    bloque: "Bloque 4: Modificación de Datos (CRUD)",
    nombre: "DEFAULT VALUES",
    categoria: "Modificación de Datos (CRUD)",
    resumen: "Inserta los valores predeterminados definidos en la estructura de la tabla.",
    sintaxis: "INSERT INTO nombre_tabla DEFAULT VALUES;",
    ejemplo: "INSERT INTO RegistroAuditoria DEFAULT VALUES;",
    tip: "Requiere que cada una de las columnas de la tabla tenga definida una restricción DEFAULT, admita NULL o sea una columna IDENTITY."
  },
  {
    id: "identity-insert",
    numero: 65,
    bloque: "Bloque 4: Modificación de Datos (CRUD)",
    nombre: "IDENTITY_INSERT",
    categoria: "Modificación de Datos (CRUD)",
    resumen: "Permite insertar valores explícitos en una columna de identidad.",
    sintaxis: "SET IDENTITY_INSERT tabla ON;\n-- Sentencias INSERT\nSET IDENTITY_INSERT tabla OFF;",
    ejemplo: "SET IDENTITY_INSERT Clientes ON;\nINSERT INTO Clientes (id, nombre) VALUES (999, 'Cliente Migrado Especial');\nSET IDENTITY_INSERT Clientes OFF;",
    tip: "Solo una única tabla por sesión puede tener activada la opción IDENTITY_INSERT ON de manera simultánea."
  },
  {
    id: "bulk-insert",
    numero: 66,
    bloque: "Bloque 4: Modificación de Datos (CRUD)",
    nombre: "BULK INSERT",
    categoria: "Modificación de Datos (CRUD)",
    resumen: "Importa un archivo de datos directamente en una tabla de manera eficiente.",
    sintaxis: "BULK INSERT tabla FROM 'ruta_archivo.csv'\nWITH (FIELDTERMINATOR = ',', ROWTERMINATOR = '\\n');",
    ejemplo: "BULK INSERT ClientesImportados\nFROM 'D:\\Datos\\clientes_2024.csv'\nWITH (\n    FIELDTERMINATOR = ';',\n    ROWTERMINATOR = '\\n',\n    FIRSTROW = 2\n);",
    tip: "Permite cargas masivas ultra-rápidas gracias al registro mínimo (minimal logging) al configurarse bajo el modelo BULK_LOGGED."
  },
  {
    id: "top-with-ties",
    numero: 67,
    bloque: "Bloque 4: Modificación de Datos (CRUD)",
    nombre: "TOP (...) WITH TIES",
    categoria: "Modificación de Datos (CRUD)",
    resumen: "Devuelve filas adicionales que empatan con el último valor del límite TOP.",
    sintaxis: "SELECT TOP (n) WITH TIES columnas\nFROM tabla\nORDER BY columna_orden;",
    ejemplo: "SELECT TOP 3 WITH TIES nombre, puntaje\nFROM Postulantes\nORDER BY puntaje DESC;",
    tip: "Exige estrictamente la presencia de ORDER BY; si el 3° y 4° puesto tienen el mismo puntaje, ambos serán devueltos sin exclusiones."
  },
  {
    id: "readpast",
    numero: 68,
    bloque: "Bloque 4: Modificación de Datos (CRUD)",
    nombre: "READPAST",
    categoria: "Modificación de Datos (CRUD)",
    resumen: "Pista de bloqueo para omitir filas bloqueadas en transacciones concurrentes.",
    sintaxis: "SELECT columnas\nFROM tabla WITH (READPAST)\nWHERE condicion;",
    ejemplo: "SELECT TOP (1) id, tarea\nFROM ColaProcesamiento WITH (READPAST, UPDLOCK)\nWHERE estado = 'Pendiente'\nORDER BY id ASC;",
    tip: "Patrón clave en colas asíncronas de alto rendimiento (Worker Queues); previene bloqueos mutuos (Deadlocks) entre hilos paralelos."
  },
  {
    id: "tablock",
    numero: 69,
    bloque: "Bloque 4: Modificación de Datos (CRUD)",
    nombre: "TABLOCK",
    categoria: "Modificación de Datos (CRUD)",
    resumen: "Aplica un bloqueo exclusivo a nivel de tabla durante una operación.",
    sintaxis: "SELECT * FROM tabla WITH (TABLOCK); | INSERT INTO tabla WITH (TABLOCK) ...",
    ejemplo: "INSERT INTO FacturacionHistorico WITH (TABLOCK)\nSELECT * FROM Facturacion2024;",
    tip: "Minimiza la sobrecarga del Gestor de Bloqueos al evitar la adquisición y escalamiento individual de miles de locks por fila."
  },
  {
    id: "nolock",
    numero: 70,
    bloque: "Bloque 4: Modificación de Datos (CRUD)",
    nombre: "NOLOCK (Hint)",
    categoria: "Modificación de Datos (CRUD)",
    resumen: "Permite leer datos sucios sin bloqueos (equivalente a READ UNCOMMITTED).",
    sintaxis: "SELECT columnas\nFROM tabla WITH (NOLOCK);",
    ejemplo: "SELECT COUNT(*) AS ConteoAproximado\nFROM TransaccionesBancarias WITH (NOLOCK);",
    tip: "Evita que consultas pesadas de reportes queden bloqueadas por transacciones activas, pero puede leer filas pendientes de ROLLBACK."
  },

  // =========================================================================
  // BLOQUE 5: Definición y Estructura de Datos (DDL) (71 a 85)
  // =========================================================================
  {
    id: "create-database",
    numero: 71,
    bloque: "Bloque 5: Definición y Estructura de Datos (DDL)",
    nombre: "CREATE DATABASE",
    categoria: "Definición y Estructura de Datos (DDL)",
    resumen: "Crea una nueva base de datos en el motor.",
    sintaxis: "CREATE DATABASE NombreBaseDatos\n[ON PRIMARY (NAME = ..., FILENAME = ..., SIZE = ...)];",
    ejemplo: "CREATE DATABASE EmpresaLogistica\nON PRIMARY (\n    NAME = Empresa_Data,\n    FILENAME = 'D:\\SQLData\\EmpresaLogistica.mdf',\n    SIZE = 50MB\n);",
    tip: "Genera internamente el archivo de datos principal (.mdf) y el archivo de log transaccional (.ldf) a partir del modelo 'model'."
  },
  {
    id: "alter-database",
    numero: 72,
    bloque: "Bloque 5: Definición y Estructura de Datos (DDL)",
    nombre: "ALTER DATABASE",
    categoria: "Definición y Estructura de Datos (DDL)",
    resumen: "Modifica las propiedades o archivos de una base de datos.",
    sintaxis: "ALTER DATABASE NombreBaseDatos SET propiedad;",
    ejemplo: "ALTER DATABASE EmpresaLogistica SET RECOVERY FULL;\nALTER DATABASE EmpresaLogistica MODIFY FILE (NAME = Empresa_Data, SIZE = 100MB);",
    tip: "Permite ajustar parámetros críticos como el Recovery Model, habilitar READ_COMMITTED_SNAPSHOT o agregar grupos de archivos (Filegroups)."
  },
  {
    id: "drop-database",
    numero: 73,
    bloque: "Bloque 5: Definición y Estructura de Datos (DDL)",
    nombre: "DROP DATABASE",
    categoria: "Definición y Estructura de Datos (DDL)",
    resumen: "Elimina una base de datos existente.",
    sintaxis: "DROP DATABASE [IF EXISTS] NombreBaseDatos;",
    ejemplo: "ALTER DATABASE PruebasBD SET SINGLE_USER WITH ROLLBACK IMMEDIATE;\nDROP DATABASE PruebasBD;",
    tip: "No es posible eliminar una base de datos si existen conexiones abiertas; ponla en modo SINGLE_USER con ROLLBACK IMMEDIATE previamente."
  },
  {
    id: "create-table",
    numero: 74,
    bloque: "Bloque 5: Definición y Estructura de Datos (DDL)",
    nombre: "CREATE TABLE",
    categoria: "Definición y Estructura de Datos (DDL)",
    resumen: "Define una nueva tabla estructurada.",
    sintaxis: "CREATE TABLE nombre_tabla (\n    columna1 tipo_dato [restricciones],\n    columna2 tipo_dato,\n    ...\n);",
    ejemplo: "CREATE TABLE Productos (\n    id INT IDENTITY(1,1) PRIMARY KEY,\n    codigo VARCHAR(20) NOT NULL UNIQUE,\n    nombre NVARCHAR(100) NOT NULL,\n    precio DECIMAL(10,2) CHECK (precio >= 0),\n    fecha_creacion DATETIME2 DEFAULT SYSDATETIME()\n);",
    tip: "Elegir los tipos de datos exactos más compactos ahorra almacenamiento en disco y optimiza sustancialmente el Buffer Pool en RAM."
  },
  {
    id: "alter-table",
    numero: 75,
    bloque: "Bloque 5: Definición y Estructura de Datos (DDL)",
    nombre: "ALTER TABLE",
    categoria: "Definición y Estructura de Datos (DDL)",
    resumen: "Modifica la estructura de una tabla existente (añadir/quitar columnas).",
    sintaxis: "ALTER TABLE tabla ADD col tipo; | ALTER TABLE tabla DROP COLUMN col;",
    ejemplo: "ALTER TABLE Empleados ADD fecha_nacimiento DATE NULL;\nALTER TABLE Empleados ALTER COLUMN correo VARCHAR(150) NOT NULL;",
    tip: "Añadir columnas con la restricción NOT NULL en tablas con datos existentes requiere obligatoriamente definir una cláusula DEFAULT."
  },
  {
    id: "drop-table",
    numero: 76,
    bloque: "Bloque 5: Definición y Estructura de Datos (DDL)",
    nombre: "DROP TABLE",
    categoria: "Definición y Estructura de Datos (DDL)",
    resumen: "Elimina permanentemente una tabla.",
    sintaxis: "DROP TABLE [IF EXISTS] nombre_tabla;",
    ejemplo: "DROP TABLE IF EXISTS TemporalesImportacion;",
    tip: "Si la tabla está vinculada por restricciones FOREIGN KEY desde otra tabla, la sentencia fallará hasta eliminar la clave foránea previamente."
  },
  {
    id: "add-constraint",
    numero: 77,
    bloque: "Bloque 5: Definición y Estructura de Datos (DDL)",
    nombre: "ADD CONSTRAINT",
    categoria: "Definición y Estructura de Datos (DDL)",
    resumen: "Agrega una restricción (como PRIMARY KEY o FOREIGN KEY).",
    sintaxis: "ALTER TABLE tabla ADD CONSTRAINT NombreRestriccion TIPO (columna);",
    ejemplo: "ALTER TABLE Pedidos\nADD CONSTRAINT FK_Pedidos_Clientes\nFOREIGN KEY (cliente_id) REFERENCES Clientes(id);",
    tip: "Bautizar tus restricciones con nombres explícitos y estándar simplifica enormemente las migraciones y tareas de mantenimiento."
  },
  {
    id: "drop-constraint",
    numero: 78,
    bloque: "Bloque 5: Definición y Estructura de Datos (DDL)",
    nombre: "DROP CONSTRAINT",
    categoria: "Definición y Estructura de Datos (DDL)",
    resumen: "Elimina una restricción existente.",
    sintaxis: "ALTER TABLE tabla DROP CONSTRAINT NombreRestriccion;",
    ejemplo: "ALTER TABLE Pedidos DROP CONSTRAINT FK_Pedidos_Clientes;",
    tip: "Paso mandatorio previo para poder modificar o eliminar columnas que están enlazadas a claves foráneas o reglas de verificación."
  },
  {
    id: "primary-key",
    numero: 79,
    bloque: "Bloque 5: Definición y Estructura de Datos (DDL)",
    nombre: "PRIMARY KEY",
    categoria: "Definición y Estructura de Datos (DDL)",
    resumen: "Define la clave primaria que identifica unívocamente cada fila.",
    sintaxis: "CONSTRAINT PK_Nombre PRIMARY KEY [CLUSTERED | NONCLUSTERED] (col);",
    ejemplo: "CREATE TABLE Departamentos (\n    depto_id INT NOT NULL,\n    nombre VARCHAR(60) NOT NULL,\n    CONSTRAINT PK_Departamentos PRIMARY KEY CLUSTERED (depto_id)\n);",
    tip: "Por defecto genera un índice agrupado (CLUSTERED), determinando el orden físico exacto de almacenamiento de los registros en disco."
  },
  {
    id: "foreign-key",
    numero: 80,
    bloque: "Bloque 5: Definición y Estructura de Datos (DDL)",
    nombre: "FOREIGN KEY",
    categoria: "Definición y Estructura de Datos (DDL)",
    resumen: "Establece integridad referencial entre dos tablas.",
    sintaxis: "FOREIGN KEY (col_local) REFERENCES TablaDestino(col_destino) [ON DELETE CASCADE];",
    ejemplo: "ALTER TABLE DetalleFactura\nADD CONSTRAINT FK_Detalle_Factura\nFOREIGN KEY (factura_id) REFERENCES Facturas(id)\nON DELETE CASCADE;",
    tip: "Garantiza la integridad de datos impidiendo registrar claves inexistentes y permite cascadas automáticas con ON DELETE CASCADE."
  },
  {
    id: "check",
    numero: 81,
    bloque: "Bloque 5: Definición y Estructura de Datos (DDL)",
    nombre: "CHECK",
    categoria: "Definición y Estructura de Datos (DDL)",
    resumen: "Asegura que los valores de una columna cumplan una condición específica.",
    sintaxis: "ALTER TABLE tabla ADD CONSTRAINT CK_Nombre CHECK (condicion);",
    ejemplo: "ALTER TABLE Empleados\nADD CONSTRAINT CK_Empleado_SueldoMinimo CHECK (salario >= 1025.00);",
    tip: "Se valida en cada INSERT y UPDATE; si la condición evalúa en FALSE, el motor rechaza de inmediato la transacción."
  },
  {
    id: "default",
    numero: 82,
    bloque: "Bloque 5: Definición y Estructura de Datos (DDL)",
    nombre: "DEFAULT",
    categoria: "Definición y Estructura de Datos (DDL)",
    resumen: "Asigna un valor por defecto si no se especifica ninguno.",
    sintaxis: "ALTER TABLE tabla ADD CONSTRAINT DF_Nombre DEFAULT valor FOR columna;",
    ejemplo: "ALTER TABLE Clientes\nADD CONSTRAINT DF_Clientes_Pais DEFAULT 'Perú' FOR pais;",
    tip: "Puede ser un valor estático literal o una llamada a funciones de sistema dinámicas como GETDATE() o NEWSEQUENTIALID()."
  },
  {
    id: "unique",
    numero: 83,
    bloque: "Bloque 5: Definición y Estructura de Datos (DDL)",
    nombre: "UNIQUE",
    categoria: "Definición y Estructura de Datos (DDL)",
    resumen: "Garantiza que todos los valores de una columna sean únicos.",
    sintaxis: "ALTER TABLE tabla ADD CONSTRAINT UQ_Nombre UNIQUE (columna);",
    ejemplo: "ALTER TABLE Usuarios\nADD CONSTRAINT UQ_Usuarios_DNI UNIQUE (numero_dni);",
    tip: "A diferencia de la clave primaria, en SQL Server una restricción UNIQUE permite almacenar un único valor NULL."
  },
  {
    id: "create-index",
    numero: 84,
    bloque: "Bloque 5: Definición y Estructura de Datos (DDL)",
    nombre: "CREATE INDEX",
    categoria: "Definición y Estructura de Datos (DDL)",
    resumen: "Crea un índice para acelerar la recuperación de datos.",
    sintaxis: "CREATE [NONCLUSTERED] INDEX IX_Nombre ON tabla(col ASC) [INCLUDE (col2)];",
    ejemplo: "CREATE NONCLUSTERED INDEX IX_Pedidos_Fecha\nON Pedidos(fecha_pedido DESC)\nINCLUDE (cliente_id, total);",
    tip: "Los índices con columnas INCLUDE (cubrientes) resuelven la consulta leyendo solo el índice B-Tree sin hacer costosos Key Lookups."
  },
  {
    id: "drop-index",
    numero: 85,
    bloque: "Bloque 5: Definición y Estructura de Datos (DDL)",
    nombre: "DROP INDEX",
    categoria: "Definición y Estructura de Datos (DDL)",
    resumen: "Elimina un índice existente.",
    sintaxis: "DROP INDEX IX_Nombre ON nombre_tabla;",
    ejemplo: "DROP INDEX IX_Pedidos_Fecha ON Pedidos;",
    tip: "Eliminar índices redundantes o que no son utilizados acelera drásticamente las operaciones de escritura (INSERT, UPDATE, DELETE)."
  },

  // =========================================================================
  // BLOQUE 6: Control de Flujo, Transacciones y Administración (86 a 100)
  // =========================================================================
  {
    id: "begin-tran",
    numero: 86,
    bloque: "Bloque 6: Control de Flujo, Transacciones y Administración",
    nombre: "BEGIN TRAN",
    categoria: "Control de Flujo, Transacciones y Administración",
    resumen: "Inicia una transacción explícita.",
    sintaxis: "BEGIN TRANSACTION [nombre_transaccion];",
    ejemplo: "BEGIN TRANSACTION Tran_Transferencia;\nUPDATE Cuentas SET saldo = saldo - 500 WHERE id = 1;\nUPDATE Cuentas SET saldo = saldo + 500 WHERE id = 2;\nCOMMIT TRANSACTION Tran_Transferencia;",
    tip: "Incrementa en 1 la variable de sistema @@TRANCOUNT; asegura que los pasos intermedios no se hagan públicos hasta el COMMIT."
  },
  {
    id: "commit-tran",
    numero: 87,
    bloque: "Bloque 6: Control de Flujo, Transacciones y Administración",
    nombre: "COMMIT TRAN",
    categoria: "Control de Flujo, Transacciones y Administración",
    resumen: "Confirma y guarda los cambios de la transacción actual.",
    sintaxis: "COMMIT TRANSACTION [nombre_transaccion];",
    ejemplo: "IF @@ERROR = 0\n    COMMIT TRANSACTION;\nELSE\n    ROLLBACK TRANSACTION;",
    tip: "Persiste de forma durable (ACID) los cambios en el log de transacciones y libera los bloqueos retenidos durante la operación."
  },
  {
    id: "rollback-tran",
    numero: 88,
    bloque: "Bloque 6: Control de Flujo, Transacciones y Administración",
    nombre: "ROLLBACK TRAN",
    categoria: "Control de Flujo, Transacciones y Administración",
    resumen: "Revierte los cambios realizados durante la transacción activa.",
    sintaxis: "ROLLBACK TRANSACTION [nombre | savepoint];",
    ejemplo: "BEGIN CATCH\n    IF @@TRANCOUNT > 0\n        ROLLBACK TRANSACTION;\nEND CATCH;",
    tip: "Deshace todas las modificaciones efectuadas desde el BEGIN TRAN y restablece la variable @@TRANCOUNT a cero."
  },
  {
    id: "save-tran",
    numero: 89,
    bloque: "Bloque 6: Control de Flujo, Transacciones y Administración",
    nombre: "SAVE TRAN",
    categoria: "Control de Flujo, Transacciones y Administración",
    resumen: "Establece un punto de salvado (savepoint) dentro de una transacción.",
    sintaxis: "SAVE TRANSACTION nombre_savepoint;",
    ejemplo: "BEGIN TRANSACTION;\nINSERT INTO Log VALUES ('Paso 1 completado');\nSAVE TRANSACTION PuntoGuardado1;\n-- Intento de paso 2 riesgoso:\nROLLBACK TRANSACTION PuntoGuardado1; -- Revierte solo el paso 2\nCOMMIT TRANSACTION; -- Confirma el paso 1",
    tip: "Permite reversiones parciales y controladas sin cancelar la totalidad de la transacción principal."
  },
  {
    id: "if-else",
    numero: 90,
    bloque: "Bloque 6: Control de Flujo, Transacciones y Administración",
    nombre: "IF / ELSE",
    categoria: "Control de Flujo, Transacciones y Administración",
    resumen: "Estructura de control condicional en T-SQL.",
    sintaxis: "IF condicion\nBEGIN\n    -- bloque verdadero\nEND\nELSE\nBEGIN\n    -- bloque falso\nEND;",
    ejemplo: "IF EXISTS (SELECT 1 FROM Productos WHERE stock < 5)\nBEGIN\n    PRINT 'Alerta: Hay productos con bajo stock';\nEND\nELSE\nBEGIN\n    PRINT 'Inventario en nivel óptimo';\nEND;",
    tip: "Cuando un bloque contiene más de una sentencia SQL, es imperativo encerrarlo entre palabras BEGIN y END."
  },
  {
    id: "while",
    numero: 91,
    bloque: "Bloque 6: Control de Flujo, Transacciones y Administración",
    nombre: "WHILE",
    categoria: "Control de Flujo, Transacciones y Administración",
    resumen: "Bucle iterativo basado en condiciones.",
    sintaxis: "WHILE condicion\nBEGIN\n    -- instrucciones\nEND;",
    ejemplo: "DECLARE @i INT = 1;\nWHILE @i <= 5\nBEGIN\n    PRINT 'Ejecución lote #' + CAST(@i AS VARCHAR(2));\n    SET @i += 1;\nEND;",
    tip: "Verifica siempre que la condición de parada sea alcanzable en cada ciclo para evitar bucles infinitos en el servidor."
  },
  {
    id: "break",
    numero: 92,
    bloque: "Bloque 6: Control de Flujo, Transacciones y Administración",
    nombre: "BREAK",
    categoria: "Control de Flujo, Transacciones y Administración",
    resumen: "Sale anticipadamente de un bucle WHILE.",
    sintaxis: "IF condicion BREAK;",
    ejemplo: "WHILE @contador < 1000\nBEGIN\n    IF @contador = 50 BREAK; -- Detiene el bucle de inmediato\n    SET @contador += 1;\nEND;",
    tip: "Transfiere la ejecución inmediatamente a la sentencia siguiente después del END del bucle contenedor."
  },
  {
    id: "continue",
    numero: 93,
    bloque: "Bloque 6: Control de Flujo, Transacciones y Administración",
    nombre: "CONTINUE",
    categoria: "Control de Flujo, Transacciones y Administración",
    resumen: "Salta a la siguiente iteración de un bucle WHILE.",
    sintaxis: "IF condicion CONTINUE;",
    ejemplo: "WHILE @num < 20\nBEGIN\n    SET @num += 1;\n    IF @num % 2 = 0 CONTINUE; -- Omite los números pares\n    PRINT @num;\nEND;",
    tip: "Omite el resto del código del cuerpo del bucle en la iteración actual y vuelve a evaluar la condición del WHILE."
  },
  {
    id: "try-catch",
    numero: 94,
    bloque: "Bloque 6: Control de Flujo, Transacciones y Administración",
    nombre: "TRY...CATCH",
    categoria: "Control de Flujo, Transacciones y Administración",
    resumen: "Bloque estructurado para el manejo de excepciones y errores.",
    sintaxis: "BEGIN TRY\n    -- código protegido\nEND TRY\nBEGIN CATCH\n    -- manejo de errores\nEND CATCH;",
    ejemplo: "BEGIN TRY\n    INSERT INTO Usuarios (id, nombre) VALUES (1, 'Admin');\nEND TRY\nBEGIN CATCH\n    SELECT ERROR_NUMBER() AS CodigoError, ERROR_MESSAGE() AS Mensaje;\nEND CATCH;",
    tip: "Permite usar funciones del sistema como ERROR_MESSAGE(), ERROR_LINE() y ERROR_SEVERITY() para diagnosticar fallos."
  },
  {
    id: "raiserror-throw",
    numero: 95,
    bloque: "Bloque 6: Control de Flujo, Transacciones y Administración",
    nombre: "RAISERROR / THROW",
    categoria: "Control de Flujo, Transacciones y Administración",
    resumen: "Genera un mensaje de error personalizado en tiempo de ejecución.",
    sintaxis: "THROW 50001, 'Mensaje de error personalizado', 1;",
    ejemplo: "IF @montoRetiro > @saldoDisponible\nBEGIN\n    THROW 51000, 'Saldo insuficiente para completar la transacción.', 1;\nEND;",
    tip: "THROW es la instrucción moderna recomendada en T-SQL; transfiere el control directamente al bloque CATCH respetando el número de línea exacto."
  },
  {
    id: "exec",
    numero: 96,
    bloque: "Bloque 6: Control de Flujo, Transacciones y Administración",
    nombre: "EXEC / EXECUTE",
    categoria: "Control de Flujo, Transacciones y Administración",
    resumen: "Ejecuta procedimientos almacenados o SQL dinámico.",
    sintaxis: "EXEC sp_Procedimiento @param = valor; | EXEC (@cadenaSQL);",
    ejemplo: "EXEC sp_helpdb 'EmpresaLogistica';\nEXEC sp_executesql N'SELECT * FROM Clientes WHERE id = @id', N'@id INT', @id = 10;",
    tip: "Para SQL dinámico utiliza siempre sp_executesql con parámetros en lugar de concatenar cadenas para evitar inyecciones SQL."
  },
  {
    id: "set-nocount-on",
    numero: 97,
    bloque: "Bloque 6: Control de Flujo, Transacciones y Administración",
    nombre: "SET NOCOUNT ON",
    categoria: "Control de Flujo, Transacciones y Administración",
    resumen: "Suprime el mensaje del número de filas afectadas para optimizar rendimiento en scripts.",
    sintaxis: "SET NOCOUNT ON; [o OFF]",
    ejemplo: "CREATE PROCEDURE sp_ActualizarPrecios\nAS\nBEGIN\n    SET NOCOUNT ON;\n    UPDATE Productos SET precio = precio * 1.05;\nEND;",
    tip: "Reduce el tráfico de red de ida y vuelta (network round-trips) entre SQL Server y los servidores de aplicaciones web."
  },
  {
    id: "use",
    numero: 98,
    bloque: "Bloque 6: Control de Flujo, Transacciones y Administración",
    nombre: "USE",
    categoria: "Control de Flujo, Transacciones y Administración",
    resumen: "Cambia el contexto de la base de datos activa.",
    sintaxis: "USE NombreBaseDatos;",
    ejemplo: "USE PortafolioBD;\nSELECT DB_NAME() AS BaseDatosActiva;",
    tip: "No se puede parametrizar dinámicamente ni emplear dentro de funciones o procedimientos almacenados de usuario."
  },
  {
    id: "go",
    numero: 99,
    bloque: "Bloque 6: Control de Flujo, Transacciones y Administración",
    nombre: "GO",
    categoria: "Control de Flujo, Transacciones y Administración",
    resumen: "Separador de lotes (batch separator) en las herramientas de SQL Server.",
    sintaxis: "GO [numero_repeticiones]",
    ejemplo: "CREATE VIEW VistaEmpleados AS SELECT * FROM Empleados;\nGO\nSELECT * FROM VistaEmpleados;\nGO",
    tip: "GO no es una palabra clave del motor T-SQL, sino un comando interpretado por SSMS, Azure Data Studio y sqlcmd."
  },
  {
    id: "backup-database",
    numero: 100,
    bloque: "Bloque 6: Control de Flujo, Transacciones y Administración",
    nombre: "BACKUP DATABASE",
    categoria: "Control de Flujo, Transacciones y Administración",
    resumen: "Genera una copia de seguridad completa o diferencial de la base de datos.",
    sintaxis: "BACKUP DATABASE NombreBD TO DISK = 'ruta\\archivo.bak' WITH FORMAT;",
    ejemplo: "BACKUP DATABASE PortafolioBD\nTO DISK = 'D:\\Backups\\PortafolioBD_Full.bak'\nWITH FORMAT, MEDIANAME = 'SQLServerBackups', NAME = 'Backup Completo PortafolioBD';",
    tip: "Pilar esencial de las políticas de continuidad de negocio (BCP) y recuperación ante desastres (DRP) para asegurar RTO y RPO."
  }
];
