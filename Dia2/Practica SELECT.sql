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
