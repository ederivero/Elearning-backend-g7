CREATE DATABASE vacunaciones;

USE vacunaciones;

-- Crear una tabla llamada vacunas en la cual tengamos las siguientes columnas:
-- el id que sera numerico y sera auto incrementable y primary key
-- nombre de la vacuna que sera hasta 100 characters 
-- procedencia que sera hasta 20 characters
-- lote que sera de 6 caracteres

CREATE TABLE vacunas(
	id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL, -- UNIQUE TOGETHER ( conjuncion de dos o mas columnas que sean unicas)
    procedencia VARCHAR(20) NOT NULL,
    lote CHAR(6)
);

INSERT INTO vacunas (id, nombre, procedencia, lote) VALUES 
					(DEFAULT, 'PFIZER', 'EEUU', '123abc'),
                    (DEFAULT, 'SPUTNIK', 'RUSA', '3d3afg'),
                    (DEFAULT, 'ASTRAZENECA', 'CHINA', '5d8jh5'),
                    (DEFAULT, 'CHINOPHARM', 'CHINA', 'n8gg84'),
                    (DEFAULT, 'JHONSON & JHONSON', 'EEUU', 'b55b47');


-- DEVOLVER TODAS LAS VACUNAS QUE tengan el id 3
SELECT * FROM vacunas WHERE id=3;
-- DEVOLVER TODAS LAS VACUNAS QUE SEAN HECHAS EN CHINA
SELECT * FROM vacunas WHERE procedencia='CHINA';
-- DEVOLVER TODAS LAS VACUNAS QUE EN SU NOMBRE TENGAN UN ESPACIO
SELECT * FROM vacunas WHERE nombre LIKE '% %';
-- DEVOLVER TODAS LAS VACUNAS QUE TENGAN COMO TERCER CARACTER LA LETRA 'I' Y COMO 5to LA LETRA 'O'
SELECT * FROM vacunas WHERE nombre LIKE '__I_O%';


-- id primary key entero
-- direccion hasta 100 caracteres
-- numero numeral no puede ser nulo
-- atencion_preferencial boolean no puede ser nulo
-- latitud decimal de 2 enteros y 2 flotantes
-- longitud decimal de 2 enteros y 2 flotantes

CREATE TABLE vacunatorios (
-- las columnas propias de la tabla
	id INT PRIMARY KEY,
    direccion VARCHAR(100) ,
    numero INT NOT NULL,
    atencion_preferencial BOOLEAN NOT NULL DEFAULT TRUE ,
    latitud FLOAT(4,2) , -- a futuro la declaracion del punto flotante en los tipos de datos FLOAT no servira
    longitud FLOAT(4,2),
    
    -- las columnas que van a cumplir como relaciones
    -- las columnas que van a ser relaciones es una buena practica usar el siguiente formato:
    -- nombre_de_la_tabla_columna
    vacuna_id INT,
    -- RELACIONES
    FOREIGN KEY (vacuna_id) REFERENCES  vacunas(id)
);

-- DDL > ALTER (modificar la configuracion de la tabla)
-- SE ELIMINA LA COLUMNA ID 
ALTER TABLE vacunatorios DROP COLUMN id; 

-- AGREGAMOS LA COLUMNA ID con sus propiedas y al comienzo de la tabla
ALTER TABLE vacunatorios ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY FIRST; 



INSERT INTO VACUNATORIOS (id, direccion, numero, atencion_preferencial, latitud, longitud, vacuna_id) VALUES 
						 (DEFAULT, 'CALLE LOS PALITOS', 123, TRUE, 10.53, 14.80, 1),
                         (DEFAULT, 'AV GIRASOL', 1213, FALSE, 12.53, 19.80, 1),
                         (DEFAULT, 'HOSP. GNRAL.', 111, DEFAULT, 12.49, 80.15, 2),
                         (DEFAULT, 'POSTA CERRO 7 COLORES', 1485, DEFAULT, 10.53, 14.80, 3),
                         (DEFAULT, 'ESTADIO LOS AGUATEROS', 1489, FALSE, 20.52, 18.10, 4),
                         (DEFAULT, 'PLAZA DE ARMAS', 1256, FALSE, 12.54, 17.26, 4);



-- Devolver las direcciones y sus numeros que tengan atencion preferencial
SELECT direccion, numero FROM vacunatorios WHERE atencion_preferencial = true;

-- Devolver las direcciones que se encuentren entre lat > 20.00 y long < 20.00
SELECT direccion FROM vacunatorios WHERE latitud > 20.00 AND longitud < 20.00;

-- Devolver las direcciones que sean pfizer (1) y que tengan atencion_preferencial
SELECT direccion FROM vacunatorios WHERE vacuna_id = 1 AND atencion_preferencial = True;

-- Devolver las direcciones cuya vacuna no sea pfizer (1) (diferente que != ) o tengan atencion preferencial
SELECT direccion FROM vacunatorios WHERE vacuna_id != 1 OR atencion_preferencial = True;







