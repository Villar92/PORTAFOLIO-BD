USE CadenaEditorial;
GO

-- INSERCIÓN EN SECCIONFIJA
INSERT INTO SeccionFija (Titulo, Extension, IdRevista) VALUES
('Editorial', 2, 1), ('Noticias Tech', 8, 1), ('Investigacion Digital', 10, 1),
('Editorial', 2, 2), ('Artículos Principales', 12, 2),
('Editorial', 2, 3), ('Noticias de Ciencia', 6, 3), ('Avances Médicos', 9, 3),
('Editorial', 2, 4), ('Economía Nacional', 5, 4),
('Editorial', 2, 5), ('Cuidado e Higiene', 4, 5);
GO

-- INSERCIÓN EN EJEMPLAR
INSERT INTO Ejemplar (Fecha, NumeroPaginas, EjemplaresVendidos, IdRevista) VALUES
('2026-01-05', 80, 5200, 1),
('2026-02-05', 84, 5600, 1),
('2026-03-05', 88, 5900, 1),
('2026-01-10', 60, 4800, 2),
('2026-02-10', 64, 5100, 2),
('2026-01-15', 70, 4300, 3),
('2026-02-15', 72, 4600, 3),
('2026-01-20', 50, 6000, 4),
('2026-02-20', 52, 6200, 4),
('2026-01-25', 65, 3900, 5);
GO