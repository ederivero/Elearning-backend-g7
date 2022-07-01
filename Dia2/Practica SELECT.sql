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


INSERT INTO vacunatorios (id, direccion, numero, atencion_preferencial, latitud, longitud, vacuna_id) VALUES
						 (default, 'CALLE SIN NUMERO', 123, False, 10.00, 10.00, null);
                         
-- JOINS 
-- TODAS LAS COLUMNAS DE LA TABLA VACUNAS CUYA INTERSECCION CON LA TABLA VACUNATORIOS Y TENGAN UNA COLUMNA EN COMUN SEGUN EL ID Y VACUNA_ID
SELECT * FROM vacunas INNER JOIN vacunatorios ON vacunas.id = vacunatorios.vacuna_id;


-- LEFT JOIN 
-- traera todo lo de la izquierda y si es que hay alguna coincidencia con lo de la derecha
SELECT * FROM vacunas LEFT JOIN vacunatorios ON vacunas.id = vacunatorios.vacuna_id;

-- RIGHT JOIN
-- Traera todo lo de la derecha y si es que hay alguna coincidencia con lo de la izquierda
SELECT * FROM vacunas RIGHT JOIN vacunatorios ON vacunas.id = vacunatorios.vacuna_id;


SELECT vacunas.id, vacunatorios.id FROM vacunas INNER JOIN vacunatorios ON vacunas.id = vacunatorios.vacuna_id;

SELECT A.id as 'ID de las vacunas', B.id AS 'ID de los vacunatorios' 
FROM vacunas AS A INNER JOIN vacunatorios AS B ON A.id = B.vacuna_id;






-- 
CREATE TABLE campanias(
 id INT PRIMARY KEY AUTO_INCREMENT,
 nombre VARCHAR(100),
 fecha DATE,
 descripcion TEXT -- es como el varchar (dependiendo de cuantos caracteres guardemos separaremos el espacion de memoria PERO no tiene limite
);



--
CREATE TABLE vacunatorios_campanias(
	id INT PRIMARY KEY AUTO_INCREMENT,
	vacunatorio_id INT NOT NULL,
	campania_id INT NOT NULL,

	-- CREACION DE RELACIONES
	FOREIGN KEY (vacunatorio_id) REFERENCES vacunatorios(id),
    FOREIGN KEY (campania_id)    REFERENCES campanias(id)
);


INSERT INTO campanias (id, nombre, fecha, descripcion) VALUES 
					  (DEFAULT, 'PONGO EL HOMBRO', '2022-01-01', 'Campaña de vacunacion para personas adultas'),
                      (DEFAULT, 'VACUNA WARMA', '2022-03-10', 'Campaña de vacunacion para niños menores de 18 años'),
                      (DEFAULT, 'MAYORCITOS', '2021-11-04', 'Campaña de vacunacion para personas mayores a 65 años');

INSERT INTO vacunatorios_campanias (id, vacunatorio_id, campania_id) VALUES
									(DEFAULT, 1, 1),
                                    (DEFAULT, 2, 1),
                                    (DEFAULT, 3, 1),
                                    (DEFAULT, 2, 2),
                                    (DEFAULT, 1, 2),
                                    (DEFAULT, 3, 3),
                                    (DEFAULT, 4, 3),
                                    (DEFAULT, 5, 3);


-- Desde la campaña hacia el vacunatorio_campana
SELECT * FROM campanias as C INNER JOIN vacunatorios_campanias as VC ON C.id = VC.campania_id;
 

