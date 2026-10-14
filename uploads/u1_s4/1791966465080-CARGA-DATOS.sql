USE CadenaEditorial;
GO

-- INSERCIÓN EN SUCURSAL (20 Registros)
INSERT INTO Sucursal (CodigoSucursal, Domicilio, Telefono) VALUES
('SUC001', 'Av. Arequipa 1010, Lima', '01-4101001'),
('SUC002', 'Av. Brasil 1250, Lima', '01-4101002'),
('SUC003', 'Av. Javier Prado 2200, Lima', '01-4101003'),
('SUC004', 'Av. La Marina 1500, Lima', '01-4101004'),
('SUC005', 'Av. Angamos 1800, Lima', '01-4101005'),
('SUC006', 'Av. Colonial 1450, Callao', '01-4101006'),
('SUC007', 'Av. Universitaria 3200, Lima', '01-4101007'),
('SUC008', 'Av. Primavera 450, Lima', '01-4101008'),
('SUC009', 'Av. Benavides 1750, Lima', '01-4101009'),
('SUC010', 'Av. Alfonso Ugarte 950, Lima', '01-4101010'),
('SUC011', 'Av. Grau 850, Lima', '01-4101011'),
('SUC012', 'Av. Tacna 720, Lima', '01-4101012'),
('SUC013', 'Av. Canadá 1250, Lima', '01-4101013'),
('SUC014', 'Av. República de Panamá 3300, Lima', '01-4101014'),
('SUC015', 'Av. Tomás Marsano 1800, Lima', '01-4101015'),
('SUC016', 'Av. Caminos del Inca 650, Lima', '01-4101016'),
('SUC017', 'Av. Petit Thouars 1450, Lima', '01-4101017'),
('SUC018', 'Av. Prolongación Iquitos 900, Lima', '01-4101018'),
('SUC019', 'Av. Nicolás de Piérola 1100, Lima', '01-4101019'),
('SUC020', 'Av. Elmer Faucett 1200, Callao', '01-4101020');
GO

-- INSERCIÓN EN EMPLEADO
INSERT INTO Empleado (Nombre, Apellidos, NIF, Telefono, IdSucursal) VALUES
('Carlos', 'Ramirez Torres', 'NIF100001', '999100001', 1),
('Ana', 'Flores Mendoza', 'NIF100002', '999100002', 1),
('Luis', 'Gonzales Perez', 'NIF100003', '999100003', 2),
('Maria', 'Quispe Rojas', 'NIF100004', '999100004', 2),
('Jorge', 'Castillo Vargas', 'NIF100005', '999100005', 3),
('Lucia', 'Fernandez Diaz', 'NIF100006', '999100006', 3),
('Pedro', 'Sanchez Leon', 'NIF100007', '999100007', 4),
('Rosa', 'Torres Silva', 'NIF100008', '999100008', 4),
('Miguel', 'Herrera Campos', 'NIF100009', '999100009', 5),
('Carmen', 'Vega Salazar', 'NIF100010', '999100010', 5),
('Jose', 'Mendoza Ruiz', 'NIF100011', '999100011', 6),
('Elena', 'Paredes Soto', 'NIF100012', '999100012', 7),
('Daniel', 'Morales Castro', 'NIF100013', '999100013', 8),
('Patricia', 'Navarro Cruz', 'NIF100014', '999100014', 9),
('Fernando', 'Vargas Medina', 'NIF100015', '999100015', 10),
('Silvia', 'Ramos Ortiz', 'NIF100016', '999100016', 11),
('Ricardo', 'Salinas Peña', 'NIF100017', '999100017', 12),
('Claudia', 'Molina Reyes', 'NIF100018', '999100018', 13),
('Andres', 'Campos Herrera', 'NIF100019', '999100019', 14),
('Gabriela', 'Ruiz Delgado', 'NIF100020', '999100020', 15);
GO

-- INSERCIÓN EN REVISTA (20 Registros)
INSERT INTO Revista (Titulo, NumeroRegistro, Periodicidad, Tipo) VALUES
('Tecnologia Hoy', 'REG001', 'Mensual', 'Tecnologia'),
('Mundo Digital', 'REG002', 'Mensual', 'Tecnologia'),
('Ciencia Actual', 'REG003', 'Mensual', 'Ciencia'),
('Economia Global', 'REG004', 'Semanal', 'Economia'),
('Salud y Vida', 'REG005', 'Mensual', 'Salud'),
('Cultura Peruana', 'REG006', 'Mensual', 'Cultura'),
('Actualidad Nacional', 'REG007', 'Semanal', 'Actualidad'),
('Negocios 360', 'REG008', 'Quincenal', 'Negocios'),
('Innovacion Tech', 'REG009', 'Mensual', 'Tecnologia'),
('Educacion Hoy', 'REG010', 'Mensual', 'Educacion'),
('Viajes y Turismo', 'REG011', 'Mensual', 'Turismo'),
('Deportes Total', 'REG012', 'Semanal', 'Deportes'),
('Historia Viva', 'REG013', 'Mensual', 'Historia'),
('Arte y Diseño', 'REG014', 'Mensual', 'Arte'),
('Finanzas Personales', 'REG015', 'Quincenal', 'Finanzas'),
('Cocina Peruana', 'REG016', 'Mensual', 'Gastronomia'),
('Mundo Empresarial', 'REG017', 'Semanal', 'Empresarial'),
('Ciencia y Futuro', 'REG018', 'Mensual', 'Ciencia'),
('Sociedad Hoy', 'REG019', 'Quincenal', 'Sociedad'),
('Programacion Web', 'REG020', 'Mensual', 'Tecnologia');
GO

-- INSERCIÓN EN SUCURSALREVISTA
INSERT INTO SucursalRevista (IdSucursal, IdRevista) VALUES
(1, 1), (1, 2), (2, 3), (2, 4), (3, 5), (3, 6), (4, 7), (4, 8), (5, 9), (5, 10),
(6, 11), (7, 12), (8, 13), (9, 14), (10, 15), (11, 16), (12, 17), (13, 18), (14, 19), (15, 20);
GO

-- INSERCIÓN EN PERIODISTA (20 Registros)
INSERT INTO Periodista (Nombre, Apellidos, NIF, Telefono, Especialidad) VALUES
('Alberto', 'Navarro Ruiz', 'NIF200001', '998200001', 'Tecnologia'),
('Beatriz', 'Castro Leon', 'NIF200002', '998200002', 'Economia'),
('Carlos', 'Mendoza Silva', 'NIF200003', '998200003', 'Politica'),
('Diana', 'Flores Torres', 'NIF200004', '998200004', 'Ciencia'),
('Eduardo', 'Ramirez Soto', 'NIF200005', '998200005', 'Deportes'),
('Fabiola', 'Quispe Ramos', 'NIF200006', '998200006', 'Cultura'),
('Gustavo', 'Herrera Diaz', 'NIF200007', '998200007', 'Salud'),
('Helena', 'Vargas Cruz', 'NIF200008', '998200008', 'Educacion'),
('Ivan', 'Morales Perez', 'NIF200009', '998200009', 'Tecnologia'),
('Julia', 'Salazar Medina', 'NIF200010', '998200010', 'Turismo'),
('Kevin', 'Paredes Leon', 'NIF200011', '998200011', 'Negocios'),
('Laura', 'Sanchez Castro', 'NIF200012', '998200012', 'Arte'),
('Manuel', 'Torres Vargas', 'NIF200013', '998200013', 'Historia'),
('Natalia', 'Rojas Mendoza', 'NIF200014', '998200014', 'Gastronomia'),
('Oscar', 'Vega Campos', 'NIF200015', '998200015', 'Finanzas'),
('Paola', 'Molina Reyes', 'NIF200016', '998200016', 'Sociedad'),
('Rafael', 'Ortega Ruiz', 'NIF200017', '998200017', 'Tecnologia'),
('Sandra', 'Delgado Silva', 'NIF200018', '998200018', 'Ciencia'),
('Tomas', 'Medina Flores', 'NIF200019', '998200019', 'Deportes'),
('Veronica', 'Cruz Navarro', 'NIF200020', '998200020', 'Educacion');
GO

-- INSERCIÓN EN ARTICULO
INSERT INTO Articulo (Titulo, FechaPublicacion, IdPeriodista, IdRevista) VALUES
('El futuro de la inteligencia artificial', '2026-01-10', 1, 1),
('Transformacion digital empresarial', '2026-01-15', 2, 4),
('Nuevos avances cientificos', '2026-02-05', 4, 3),
('Tecnologia y sociedad moderna', '2026-02-12', 9, 2),
('Innovacion en las empresas', '2026-02-20', 11, 8),
('El desarrollo de la ciencia peruana', '2026-03-01', 18, 18),
('Educacion digital en el siglo XXI', '2026-03-08', 8, 10),
('Turismo sostenible en el Peru', '2026-03-15', 10, 11),
('Nuevas tendencias deportivas', '2026-03-20', 5, 12),
('La cultura peruana contemporanea', '2026-03-25', 6, 6),
('Historia de Lima moderna', '2026-04-01', 13, 13),
('Diseño y creatividad digital', '2026-04-05', 12, 14),
('Consejos para mejorar las finanzas', '2026-04-10', 15, 15),
('Gastronomia peruana internacional', '2026-04-15', 14, 16),
('Retos de la sociedad actual', '2026-04-20', 16, 19),
('Programacion web moderna', '2026-05-01', 17, 20),
('Salud y tecnologia', '2026-05-10', 7, 5),
('Actualidad nacional', '2026-05-15', 3, 7),
('Nuevos modelos de negocios', '2026-05-20', 2, 17),
('Tecnologias emergentes', '2026-05-25', 20, 9);
GO