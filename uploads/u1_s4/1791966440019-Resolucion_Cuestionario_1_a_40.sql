USE CadenaEditorial;
GO

-- 1. ¿Cuáles son todas las sucursales de la cadena editorial?
SELECT IdSucursal, CodigoSucursal, Domicilio, Telefono 
FROM Sucursal;

-- 2. ¿Cuáles son las revistas registradas y cuál es su periodicidad?
SELECT Titulo, Periodicidad 
FROM Revista 
ORDER BY Titulo;

-- 3. ¿Qué revistas tienen periodicidad mensual?
SELECT Titulo, NumeroRegistro 
FROM Revista 
WHERE Periodicidad = 'Mensual';

-- 4. ¿Qué empleados trabajan en la sucursal número 1?
SELECT Nombre, Apellidos 
FROM Empleado 
WHERE IdSucursal = 1;

-- 5. ¿Qué periodistas tienen especialidad en tecnología?
SELECT Nombre, Apellidos, Especialidad 
FROM Periodista 
WHERE Especialidad = 'Tecnologia';

-- 6. ¿Cómo se pueden listar las revistas ordenadas alfabéticamente?
SELECT Titulo 
FROM Revista 
ORDER BY Titulo ASC;

-- 7. ¿Qué ejemplares registraron más de 5 000 unidades vendidas?
SELECT r.Titulo, e.Fecha, e.EjemplaresVendidos 
FROM Ejemplar e
INNER JOIN Revista r ON r.IdRevista = e.IdRevista
WHERE e.EjemplaresVendidos > 5000;

-- 8. ¿Qué secciones fijas tienen una extensión superior a 7 páginas?
SELECT r.Titulo AS Revista, s.Titulo AS Seccion, s.Extension 
FROM SeccionFija s
INNER JOIN Revista r ON r.IdRevista = s.IdRevista
WHERE s.Extension > 7;

-- 9. ¿Qué empleados trabajan en cada sucursal?
SELECT s.CodigoSucursal, e.Nombre, e.Apellidos 
FROM Sucursal s
INNER JOIN Empleado e ON e.IdSucursal = s.IdSucursal
ORDER BY s.CodigoSucursal;

-- 10. ¿Qué revistas publica cada sucursal?
SELECT s.CodigoSucursal, r.Titulo 
FROM Sucursal s
INNER JOIN SucursalRevista sr ON sr.IdSucursal = s.IdSucursal
INNER JOIN Revista r ON r.IdRevista = sr.IdRevista
ORDER BY s.CodigoSucursal;

-- 11. ¿Quién escribió cada artículo y para qué revista?
SELECT a.Titulo AS Articulo, p.Nombre + ' ' + p.Apellidos AS Periodista, r.Titulo AS Revista
FROM Articulo a
INNER JOIN Periodista p ON p.IdPeriodista = a.IdPeriodista
INNER JOIN Revista r ON r.IdRevista = a.IdRevista;

-- 12. ¿Cuántos empleados tiene cada sucursal?
SELECT s.CodigoSucursal, COUNT(e.IdEmpleado) AS TotalEmpleados 
FROM Sucursal s
LEFT JOIN Empleado e ON e.IdSucursal = s.IdSucursal
GROUP BY s.CodigoSucursal
ORDER BY s.CodigoSucursal;

-- 13. ¿Cuántas revistas publica cada sucursal?
SELECT s.CodigoSucursal, COUNT(sr.IdRevista) AS TotalRevistas 
FROM Sucursal s
LEFT JOIN SucursalRevista sr ON sr.IdSucursal = s.IdSucursal
GROUP BY s.CodigoSucursal
ORDER BY s.CodigoSucursal;

-- 14. ¿Cuál es el promedio de ejemplares vendidos por revista?
SELECT r.Titulo, AVG(e.EjemplaresVendidos) AS PromedioVentas
FROM Revista r
INNER JOIN Ejemplar e ON e.IdRevista = r.IdRevista
GROUP BY r.Titulo;

-- 15. ¿Cuántos ejemplares se han vendido en total de cada revista?
SELECT r.Titulo, SUM(e.EjemplaresVendidos) AS TotalVendido
FROM Revista r
INNER JOIN Ejemplar e ON e.IdRevista = r.IdRevista
GROUP BY r.Titulo;

-- 16. ¿Cuántos artículos ha escrito cada periodista?
SELECT p.Nombre + ' ' + p.Apellidos AS Periodista, COUNT(a.IdArticulo) AS TotalArticulos
FROM Periodista p
LEFT JOIN Articulo a ON a.IdPeriodista = p.IdPeriodista 
GROUP BY p.IdPeriodista, p.Nombre, p.Apellidos
ORDER BY TotalArticulos DESC;

-- 17. ¿Qué revistas tienen un promedio de ventas superior a 5 000 ejemplares?
SELECT r.Titulo, AVG(e.EjemplaresVendidos) AS Promedio
FROM Revista r
INNER JOIN Ejemplar e ON e.IdRevista = r.IdRevista
GROUP BY r.Titulo
HAVING AVG(e.EjemplaresVendidos) > 5000;

-- 18. ¿Qué secciones fijas pertenecen a cada revista?
SELECT r.Titulo AS Revista, s.Titulo AS Seccion, s.Extension
FROM Revista r
INNER JOIN SeccionFija s ON s.IdRevista = r.IdRevista
ORDER BY r.Titulo;

-- 19. ¿Cuál es el total de páginas destinadas a las secciones fijas de cada revista?
SELECT r.Titulo, SUM(s.Extension) AS TotalPaginasFijas
FROM Revista r
INNER JOIN SeccionFija s ON s.IdRevista = r.IdRevista
GROUP BY r.Titulo;

-- 20. ¿Cuántos ejemplares se han vendido en total en toda la cadena editorial?
SELECT SUM(EjemplaresVendidos) AS TotalCadena 
FROM Ejemplar;

-- 21. ¿Cuál es la revista que registra la mayor cantidad total de ejemplares vendidos?
SELECT TOP 1 r.Titulo, SUM(e.EjemplaresVendidos) AS TotalVendido
FROM Revista r
INNER JOIN Ejemplar e ON e.IdRevista = r.IdRevista
GROUP BY r.Titulo
ORDER BY TotalVendido DESC;

-- 22. ¿Cuál es la revista que registra la menor cantidad total de ejemplares vendidos?
SELECT TOP 1 r.Titulo, SUM(e.EjemplaresVendidos) AS TotalVendido
FROM Revista r
INNER JOIN Ejemplar e ON e.IdRevista = r.IdRevista
GROUP BY r.Titulo
ORDER BY TotalVendido ASC;

-- 23. ¿Qué revistas tienen un promedio de ventas superior al promedio general de todos los ejemplares?
SELECT r.Titulo, AVG(e.EjemplaresVendidos) AS Promedio
FROM Revista r
INNER JOIN Ejemplar e ON e.IdRevista = r.IdRevista
GROUP BY r.Titulo
HAVING AVG(e.EjemplaresVendidos) > (SELECT AVG(EjemplaresVendidos) FROM Ejemplar);

-- 24. ¿Qué periodistas han escrito más de un artículo?
SELECT p.Nombre + ' ' + p.Apellidos AS Periodista, COUNT(a.IdArticulo) AS TotalArticulos
FROM Periodista p
INNER JOIN Articulo a ON a.IdPeriodista = p.IdPeriodista 
GROUP BY p.IdPeriodista, p.Nombre, p.Apellidos
HAVING COUNT(a.IdArticulo) > 1;

-- 25. ¿Qué revistas no tienen ningún artículo registrado?
SELECT r.Titulo
FROM Revista r
LEFT JOIN Articulo a ON a.IdRevista = r.IdRevista
WHERE a.IdArticulo IS NULL;

-- 26. ¿Qué periodistas todavía no tienen artículos registrados?
SELECT p.Nombre + ' ' + p.Apellidos AS Periodista
FROM Periodista p
LEFT JOIN Articulo a ON a.IdPeriodista = p.IdPeriodista
WHERE a.IdArticulo IS NULL;

-- 27. ¿Qué sucursales no tienen empleados asignados?
SELECT s.CodigoSucursal, s.Domicilio
FROM Sucursal s
LEFT JOIN Empleado e ON e.IdSucursal = s.IdSucursal
WHERE e.IdEmpleado IS NULL;

-- 28. ¿Qué sucursales publican más de una revista?
SELECT s.CodigoSucursal, COUNT(*) AS TotalRevistas
FROM Sucursal s
INNER JOIN SucursalRevista sr ON sr.IdSucursal = s.IdSucursal
GROUP BY s.CodigoSucursal
HAVING COUNT(*) > 1;

-- 29. ¿Cuál es la posición de cada revista según sus ventas totales?
SELECT r.Titulo, SUM(e.EjemplaresVendidos) AS TotalVendido, 
       RANK() OVER (ORDER BY SUM(e.EjemplaresVendidos) DESC) AS Posicion
FROM Revista r
INNER JOIN Ejemplar e ON e.IdRevista = r.IdRevista
GROUP BY r.Titulo;

-- 30. ¿Qué porcentaje de las ventas totales representa cada revista?
SELECT r.Titulo, 
       CAST(100.0 * SUM(e.EjemplaresVendidos) / (SELECT SUM(EjemplaresVendidos) FROM Ejemplar) AS DECIMAL(5,2)) AS Porcentaje
FROM Revista r
INNER JOIN Ejemplar e ON e.IdRevista = r.IdRevista 
GROUP BY r.Titulo
ORDER BY Porcentaje DESC;

-- 31. Clasifique las revistas según su volumen total de ventas
SELECT r.Titulo, SUM(e.EjemplaresVendidos) AS TotalVendido,
       CASE NTILE(3) OVER (ORDER BY SUM(e.EjemplaresVendidos) DESC)
            WHEN 1 THEN 'Alto' 
            WHEN 2 THEN 'Medio' 
            ELSE 'Bajo'
       END AS Volumen
FROM Revista r
INNER JOIN Ejemplar e ON e.IdRevista = r.IdRevista
GROUP BY r.Titulo;

-- 32. ¿Cuál es la evolución acumulada de ejemplares vendidos por fecha?
SELECT Fecha, SUM(EjemplaresVendidos) AS VentasDelDia,
       SUM(SUM(EjemplaresVendidos)) OVER (ORDER BY Fecha) AS Acumulado
FROM Ejemplar
GROUP BY Fecha
ORDER BY Fecha;

-- 33. Muestre las revistas cuyo promedio de ventas supera 4 500 ejemplares
SELECT r.Titulo, AVG(e.EjemplaresVendidos) AS Promedio
FROM Revista r
INNER JOIN Ejemplar e ON e.IdRevista = r.IdRevista
GROUP BY r.Titulo
HAVING AVG(e.EjemplaresVendidos) > 4500;

-- 34. ¿Cuál es la revista cuyo ejemplar tiene el mayor número de páginas?
SELECT TOP 1 r.Titulo, e.Fecha, e.NumeroPaginas
FROM Ejemplar e
INNER JOIN Revista r ON r.IdRevista = e.IdRevista
ORDER BY e.NumeroPaginas DESC;

-- 35. Muestre cada revista y determine si sus ventas están por encima, igual o por debajo del promedio general
SELECT r.Titulo, AVG(e.EjemplaresVendidos) AS Promedio,
       CASE 
            WHEN AVG(e.EjemplaresVendidos) > (SELECT AVG(EjemplaresVendidos) FROM Ejemplar) THEN 'Por encima'
            WHEN AVG(e.EjemplaresVendidos) = (SELECT AVG(EjemplaresVendidos) FROM Ejemplar) THEN 'Igual'
            ELSE 'Por debajo' 
       END AS Comparacion
FROM Revista r
INNER JOIN Ejemplar e ON e.IdRevista = r.IdRevista
GROUP BY r.Titulo;

-- 36. ¿Qué periodistas tienen especialidad en tecnología o ciencia?
SELECT Nombre, Apellidos, Especialidad
FROM Periodista
WHERE Especialidad = 'Tecnologia' OR Especialidad = 'Ciencia';

-- 37. Obtenga los periodistas cuya especialidad sea tecnología, ciencia, educación o economía
SELECT Nombre, Apellidos, Especialidad
FROM Periodista
WHERE Especialidad IN ('Tecnologia', 'Ciencia', 'Educacion', 'Economia')
ORDER BY Especialidad;

-- 38. ¿Cuál es la revista que posee mayor cantidad de secciones fijas?
SELECT TOP 1 r.Titulo, COUNT(s.IdSeccion) AS TotalSecciones
FROM Revista r
INNER JOIN SeccionFija s ON s.IdRevista = r.IdRevista
GROUP BY r.Titulo
ORDER BY TotalSecciones DESC;

-- 39. ¿Cuántos ejemplares se vendieron durante cada mes?
SELECT YEAR(Fecha) AS Anio, MONTH(Fecha) AS Mes, SUM(EjemplaresVendidos) AS TotalVendido
FROM Ejemplar
GROUP BY YEAR(Fecha), MONTH(Fecha)
ORDER BY Anio, Mes;

-- 40. INFORME POR REVISTA:
-- Genere un informe que muestre por cada revista: cantidad de artículos, cantidad de secciones, total de ventas y promedio de ventas.
SELECT r.Titulo AS Revista,
    (SELECT COUNT(*) FROM Articulo a WHERE a.IdRevista = r.IdRevista) AS CantidadArticulos,
    (SELECT COUNT(*) FROM SeccionFija s WHERE s.IdRevista = r.IdRevista) AS CantidadSecciones,
    ISNULL((SELECT SUM(e.EjemplaresVendidos) FROM Ejemplar e WHERE e.IdRevista = r.IdRevista), 0) AS TotalVentas,
    ISNULL((SELECT AVG(e.EjemplaresVendidos) FROM Ejemplar e WHERE e.IdRevista = r.IdRevista), 0) AS PromedioVentas
FROM Revista r
ORDER BY r.Titulo;