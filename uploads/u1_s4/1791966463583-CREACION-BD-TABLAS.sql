-- ============================================================================
-- CURSO: BASE DE DATOS II - UPLA
-- ESTUDIANTE: JORGE LUIS CURO VILLAR
-- DOCENTE: MG. ING. RAÚL FERNÁNDEZ BEJARANO
-- TEMA: SEMANA 04 - CASO DE ESTUDIO: CADENA EDITORIAL
-- GESTOR: MICROSOFT SQL SERVER
-- ============================================================================

USE master;
GO

-- 1. CREACIÓN DE LA BASE DE DATOS
IF EXISTS (SELECT name FROM sys.databases WHERE name = N'CadenaEditorial')
BEGIN
    ALTER DATABASE CadenaEditorial SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE CadenaEditorial;
END
GO

CREATE DATABASE CadenaEditorial
ON PRIMARY (
    NAME = CadenaEditorial_Data,
    FILENAME = 'D:\BaseDatos2026\CadenaEditorial_data.mdf', -- Ajustar ruta si es necesario
    SIZE = 10MB,
    MAXSIZE = 10GB,
    FILEGROWTH = 5MB
)
LOG ON (
    NAME = CadenaEditorial_Log,
    FILENAME = 'D:\BaseDatos2026\CadenaEditorial_log.ldf',  -- Ajustar ruta si es necesario
    SIZE = 3MB,
    MAXSIZE = 3GB,
    FILEGROWTH = 1MB
);
GO

USE CadenaEditorial;
GO

-- 2. TABLA SUCURSAL
CREATE TABLE Sucursal (
    IdSucursal INT IDENTITY(1,1) NOT NULL,
    CodigoSucursal VARCHAR(10) NOT NULL,
    Domicilio VARCHAR(150) NOT NULL,
    Telefono VARCHAR(20) NOT NULL,
    CONSTRAINT PK_Sucursal PRIMARY KEY (IdSucursal),
    CONSTRAINT UQ_Sucursal_Codigo UNIQUE (CodigoSucursal)
);
GO

-- 3. TABLA EMPLEADO
CREATE TABLE Empleado (
    IdEmpleado INT IDENTITY(1,1) NOT NULL,
    Nombre VARCHAR(50) NOT NULL,
    Apellidos VARCHAR(100) NOT NULL,
    NIF VARCHAR(20) NOT NULL,
    Telefono VARCHAR(20) NOT NULL,
    IdSucursal INT NOT NULL,
    CONSTRAINT PK_Empleado PRIMARY KEY (IdEmpleado),
    CONSTRAINT UQ_Empleado_NIF UNIQUE (NIF),
    CONSTRAINT FK_Empleado_Sucursal FOREIGN KEY (IdSucursal) REFERENCES Sucursal(IdSucursal)
);
GO

-- 4. TABLA REVISTA
CREATE TABLE Revista (
    IdRevista INT IDENTITY(1,1) NOT NULL,
    Titulo VARCHAR(150) NOT NULL,
    NumeroRegistro VARCHAR(30) NOT NULL,
    Periodicidad VARCHAR(30) NOT NULL,
    Tipo VARCHAR(50) NOT NULL,
    CONSTRAINT PK_Revista PRIMARY KEY (IdRevista),
    CONSTRAINT UQ_Revista_Registro UNIQUE (NumeroRegistro)
);
GO

-- 5. TABLA SUCURSALREVISTA (Relación N:M entre Sucursal y Revista)
CREATE TABLE SucursalRevista (
    IdSucursal INT NOT NULL,
    IdRevista INT NOT NULL,
    CONSTRAINT PK_SucursalRevista PRIMARY KEY (IdSucursal, IdRevista),
    CONSTRAINT FK_SucursalRevista_Sucursal FOREIGN KEY (IdSucursal) REFERENCES Sucursal(IdSucursal),
    CONSTRAINT FK_SucursalRevista_Revista FOREIGN KEY (IdRevista) REFERENCES Revista(IdRevista)
);
GO

-- 6. TABLA PERIODISTA
CREATE TABLE Periodista (
    IdPeriodista INT IDENTITY(1,1) NOT NULL,
    Nombre VARCHAR(50) NOT NULL,
    Apellidos VARCHAR(100) NOT NULL,
    NIF VARCHAR(20) NOT NULL,
    Telefono VARCHAR(20) NOT NULL,
    Especialidad VARCHAR(100) NOT NULL,
    CONSTRAINT PK_Periodista PRIMARY KEY (IdPeriodista),
    CONSTRAINT UQ_Periodista_NIF UNIQUE (NIF)
);
GO

-- 7. TABLA ARTICULO (Relación entre Periodista y Revista)
CREATE TABLE Articulo (
    IdArticulo INT IDENTITY(1,1) NOT NULL,
    Titulo VARCHAR(200) NOT NULL,
    FechaPublicacion DATE NOT NULL,
    IdPeriodista INT NOT NULL,
    IdRevista INT NOT NULL,
    CONSTRAINT PK_Articulo PRIMARY KEY (IdArticulo),
    CONSTRAINT FK_Articulo_Periodista FOREIGN KEY (IdPeriodista) REFERENCES Periodista(IdPeriodista),
    CONSTRAINT FK_Articulo_Revista FOREIGN KEY (IdRevista) REFERENCES Revista(IdRevista)
);
GO

-- 8. TABLA SECCIONFIJA
CREATE TABLE SeccionFija (
    IdSeccion INT IDENTITY(1,1) NOT NULL,
    Titulo VARCHAR(150) NOT NULL,
    Extension INT NOT NULL,
    IdRevista INT NOT NULL,
    CONSTRAINT PK_SeccionFija PRIMARY KEY (IdSeccion),
    CONSTRAINT FK_SeccionFija_Revista FOREIGN KEY (IdRevista) REFERENCES Revista(IdRevista),
    CONSTRAINT CK_SeccionFija_Extension CHECK (Extension > 0)
);
GO

-- 9. TABLA EJEMPLAR
CREATE TABLE Ejemplar (
    IdEjemplar INT IDENTITY(1,1) NOT NULL,
    Fecha DATE NOT NULL,
    NumeroPaginas INT NOT NULL,
    EjemplaresVendidos INT NOT NULL,
    IdRevista INT NOT NULL,
    CONSTRAINT PK_Ejemplar PRIMARY KEY (IdEjemplar),
    CONSTRAINT FK_Ejemplar_Revista FOREIGN KEY (IdRevista) REFERENCES Revista(IdRevista),
    CONSTRAINT CK_Ejemplar_Paginas CHECK (NumeroPaginas > 0),
    CONSTRAINT CK_Ejemplar_Vendidos CHECK (EjemplaresVendidos >= 0)
);
GO