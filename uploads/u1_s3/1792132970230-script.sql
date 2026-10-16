-- 1. PREPARACIÓN: BORRAR LA BASE DE DATOS SI YA EXISTE PARA REEMPLAZARLA
USE master;
GO

IF EXISTS (SELECT * FROM sys.databases WHERE name = 'EmpresaMaterialInformatico')
BEGIN
    ALTER DATABASE EmpresaMaterialInformatico SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE EmpresaMaterialInformatico;
END
GO

-- 2. CREAR LA BASE DE DATOS
CREATE DATABASE EmpresaMaterialInformatico;
GO

USE EmpresaMaterialInformatico;
GO

-- 3. CREAR LA ESTRUCTURA DE TABLAS (ESQUEMA)

CREATE TABLE Seccion (
    IdSeccion INT IDENTITY(1,1) PRIMARY KEY,
    NombreSeccion VARCHAR(100) NOT NULL
);

CREATE TABLE Empleado (
    NIF VARCHAR(20) PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Apellidos VARCHAR(100) NOT NULL,
    IdSeccion INT,
    FOREIGN KEY (IdSeccion) REFERENCES Seccion(IdSeccion)
);

CREATE TABLE Cliente (
    NIF VARCHAR(20) PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Apellidos VARCHAR(100) NOT NULL,
    Domicilio VARCHAR(200),
    Ciudad VARCHAR(100),
    Provincia VARCHAR(100),
    Telefono VARCHAR(20)
);

CREATE TABLE Componente (
    CodigoComponente VARCHAR(20) PRIMARY KEY,
    Descripcion VARCHAR(200) NOT NULL,
    Precio DECIMAL(10,2) NOT NULL,
    Stock INT NOT NULL
);

CREATE TABLE Equipo (
    CodigoEquipo VARCHAR(20) PRIMARY KEY,
    Descripcion VARCHAR(200) NOT NULL,
    Precio DECIMAL(10,2) NOT NULL,
    Stock INT NOT NULL
);

CREATE TABLE EquipoComponente (
    CodigoEquipo VARCHAR(20),
    CodigoComponente VARCHAR(20),
    Cantidad INT NOT NULL,
    PRIMARY KEY (CodigoEquipo, CodigoComponente),
    FOREIGN KEY (CodigoEquipo) REFERENCES Equipo(CodigoEquipo),
    FOREIGN KEY (CodigoComponente) REFERENCES Componente(CodigoComponente)
);

CREATE TABLE Compra (
    IdCompra INT IDENTITY(1,1) PRIMARY KEY,
    NIFCliente VARCHAR(20) NOT NULL,
    NIFEmpleado VARCHAR(20) NOT NULL,
    FechaCompra DATE NOT NULL,
    FOREIGN KEY (NIFCliente) REFERENCES Cliente(NIF),
    FOREIGN KEY (NIFEmpleado) REFERENCES Empleado(NIF)
);

CREATE TABLE CompraEquipo (
    IdCompra INT,
    CodigoEquipo VARCHAR(20),
    Cantidad INT NOT NULL,
    PRIMARY KEY (IdCompra, CodigoEquipo),
    FOREIGN KEY (IdCompra) REFERENCES Compra(IdCompra),
    FOREIGN KEY (CodigoEquipo) REFERENCES Equipo(CodigoEquipo)
);

CREATE TABLE CompraComponente (
    IdCompra INT,
    CodigoComponente VARCHAR(20),
    Cantidad INT NOT NULL,
    PRIMARY KEY (IdCompra, CodigoComponente),
    FOREIGN KEY (IdCompra) REFERENCES Compra(IdCompra),
    FOREIGN KEY (CodigoComponente) REFERENCES Componente(CodigoComponente)
);
GO

-- 4. INSERTAR LOS DATOS

INSERT INTO dbo.Seccion (NombreSeccion) VALUES
('Ventas'), ('Almacen'), ('Atencion al cliente'), ('Soporte Tecnico'), 
('Compras'), ('Administracion'), ('Sistemas'), ('Logistica'), 
('Marketing'), ('Recursos Humanos');
GO

INSERT INTO dbo.Empleado (NIF, Nombre, Apellidos, IdSeccion) VALUES
('11111111A', 'Ana',   'Lopez Garcia', 1),
('22222222B', 'Luis',  'Perez Ruiz',   1),
('33333333C', 'Marta', 'Sanchez Gil',  3),
('44444444D', 'Pablo', 'Diaz Torres',  2),
('55555555E', 'Carla', 'Morales Vega', 4),
('66666666F', 'Jorge', 'Castillo Ruiz', 5),
('77777777G', 'Elena', 'Navarro Cruz', 6),
('12121212L', 'Mario', 'Herrera Soto', 7),
('13131313M', 'Lucia', 'Ramos Perez',  1),
('14141414N', 'Andres','Vega Molina',  3);
GO

INSERT INTO dbo.Cliente (NIF, Nombre, Apellidos, Domicilio, Ciudad, Provincia, Telefono) VALUES
('88888888H', 'Javier', 'Ortiz Ramos', 'Calle Alcala 20',          'Madrid',   'Madrid',   '600888888'),
('99999999J', 'Sofia',  'Blanco Lara', 'Avenida Constitucion 8',   'Sevilla',  'Sevilla',  '600999999'),
('10101010K', 'Diego',  'Vidal Paz',   'Calle Colon 3',            'Valencia', 'Valencia', NULL),
('15151515P', 'Alberto','Garcia Leon', 'Calle Sol 14',             'Madrid',   'Madrid',   '611151515'),
('16161616Q', 'Maria',  'Torres Diaz', 'Calle Luna 22',            'Barcelona','Barcelona','611161616'),
('17171717R', 'Pedro',  'Mendoza Gil', 'Avenida Peru 45',          'Lima',     'Lima',     '611171717'),
('18181818S', 'Rosa',   'Castro Vera', 'Calle Norte 8',            'Bilbao',   'Vizcaya',  '611181818'),
('19191919T', 'Daniel', 'Ruiz Mora',   'Avenida Central 31',       'Valencia', 'Valencia', '611191919'),
('20202020U', 'Paula',  'Santos Rey',  'Calle Real 7',             'Sevilla',  'Sevilla',  '611202020'),
('21212121V', 'Hugo',   'Flores Paz',  'Calle Comercio 19',        'Zaragoza', 'Zaragoza', '611212121');
GO

INSERT INTO dbo.Componente (CodigoComponente, Descripcion, Precio, Stock) VALUES
('CP001', 'Procesador 8 nucleos',         250.00,  40),
('CP002', 'Memoria RAM 8GB',               45.00, 120),
('CP003', 'Disco SSD 512GB',               60.00,  80),
('CP004', 'Placa base',                   120.00,  35),
('CP005', 'Fuente de alimentacion 550W',   50.00,  60),
('CP006', 'Tarjeta grafica 8GB',          400.00,  20),
('CP007', 'Teclado mecanico',              85.00,  50),
('CP008', 'Mouse inalambrico',             35.00,  70),
('CP009', 'Monitor 24 pulgadas',          180.00,  30),
('CP010', 'Gabinete ATX',                  95.00,  25);
GO

INSERT INTO dbo.Equipo (CodigoEquipo, Descripcion, Precio, Stock) VALUES
('EQ001', 'PC de oficina',        650.00, 15),
('EQ002', 'PC gamer',            1400.00,  8),
('EQ003', 'Laptop empresarial',   950.00, 12),
('EQ004', 'PC de diseno',        1250.00, 10),
('EQ005', 'Servidor basico',     2200.00,  5),
('EQ006', 'Estacion de trabajo', 1800.00,  7),
('EQ007', 'PC economica',         520.00, 20),
('EQ008', 'Laptop gamer',        1650.00,  6),
('EQ009', 'Mini PC',              480.00, 15),
('EQ010', 'PC oficina avanzada',  780.00, 11);
GO

INSERT INTO dbo.EquipoComponente (CodigoEquipo, CodigoComponente, Cantidad) VALUES
('EQ001', 'CP001', 1), ('EQ001', 'CP002', 2), ('EQ001', 'CP003', 1),
('EQ001', 'CP004', 1), ('EQ001', 'CP005', 1), ('EQ002', 'CP001', 1),
('EQ002', 'CP002', 4), ('EQ002', 'CP003', 2), ('EQ002', 'CP004', 1),
('EQ002', 'CP005', 1), ('EQ002', 'CP006', 1), ('EQ003', 'CP001', 1),
('EQ003', 'CP002', 2), ('EQ003', 'CP003', 1), ('EQ004', 'CP001', 1),
('EQ004', 'CP006', 1), ('EQ004', 'CP009', 1), ('EQ005', 'CP001', 2),
('EQ005', 'CP002', 4), ('EQ006', 'CP006', 1), ('EQ007', 'CP008', 1);
GO

INSERT INTO dbo.Compra (NIFCliente, NIFEmpleado, FechaCompra) VALUES
('88888888H', '11111111A', '2026-03-10'),
('88888888H', '11111111A', '2026-06-15'),
('99999999J', '22222222B', '2026-04-02'),
('10101010K', '33333333C', '2026-05-20'),
('15151515P', '44444444D', '2026-07-01'),
('16161616Q', '55555555E', '2026-07-03'),
('17171717R', '66666666F', '2026-07-05'),
('18181818S', '77777777G', '2026-07-07'),
('19191919T', '12121212L', '2026-07-10'),
('20202020U', '13131313M', '2026-07-12'),
('21212121V', '14141414N', '2026-07-15'),
('88888888H', '11111111A', '2026-07-18'),
('99999999J', '22222222B', '2026-07-20'),
('10101010K', '33333333C', '2026-07-22');
GO

INSERT INTO dbo.CompraEquipo (IdCompra, CodigoEquipo, Cantidad) VALUES
(1, 'EQ001', 1), (2, 'EQ001', 1), (3, 'EQ002', 1),
(5, 'EQ003', 1), (6, 'EQ004', 1), (7, 'EQ005', 1),
(8, 'EQ006', 1), (9, 'EQ007', 2), (10, 'EQ008', 1),
(11, 'EQ009', 1), (12, 'EQ010', 1);
GO

INSERT INTO dbo.CompraComponente (IdCompra, CodigoComponente, Cantidad) VALUES
(2, 'CP006', 1), (4, 'CP002', 2), (4, 'CP003', 1),
(5, 'CP007', 1), (6, 'CP008', 2), (7, 'CP009', 2),
(8, 'CP010', 1), (9, 'CP007', 1), (10, 'CP008', 1),
(11, 'CP009', 1), (12, 'CP010', 2);
GO

-- 5. CONSULTAS DE COMPROBACION

SELECT c.NIF, c.Nombre, co.FechaCompra, ce.CodigoEquipo, ce.Cantidad
FROM dbo.Cliente c
JOIN dbo.Compra co        ON co.NIFCliente = c.NIF
JOIN dbo.CompraEquipo ce  ON ce.IdCompra = co.IdCompra
ORDER BY c.NIF, co.FechaCompra;
GO

SELECT e.CodigoEquipo, e.Descripcion AS Equipo, c.Descripcion AS Componente, ec.Cantidad
FROM dbo.Equipo e
JOIN dbo.EquipoComponente ec ON ec.CodigoEquipo = e.CodigoEquipo
JOIN dbo.Componente c        ON c.CodigoComponente = ec.CodigoComponente
ORDER BY e.CodigoEquipo, c.CodigoComponente;
GO

PRINT 'BASE DE DATOS EmpresaMaterialInformatico CREADA Y POBLADA CORRECTAMENTE.';
GO