-- CreateTable
CREATE TABLE `departamentos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `departamentos_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trabajadores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,
    `apellido` VARCHAR(45) NULL,
    `email` VARCHAR(45) NOT NULL,
    `password` TEXT NOT NULL,
    `rol` ENUM('GERENTE', 'OBRERO', 'SUPERVISOR', 'PRACTICANTE') NOT NULL DEFAULT 'OBRERO',
    `departamento_id` INTEGER NOT NULL,
    `departamento_id2` INTEGER NOT NULL,
    `supervisor_id` INTEGER NOT NULL,

    UNIQUE INDEX `trabajadores_id_key`(`id`),
    UNIQUE INDEX `trabajadores_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `asistencias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATE NOT NULL,
    `ingreso` TIME NOT NULL,
    `salida` TIME NOT NULL,
    `trabajador_id` INTEGER NOT NULL,

    UNIQUE INDEX `asistencias_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `trabajadores` ADD CONSTRAINT `trabajadores_departamento_id_fkey` FOREIGN KEY (`departamento_id`) REFERENCES `departamentos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trabajadores` ADD CONSTRAINT `trabajadores_supervisor_id_fkey` FOREIGN KEY (`supervisor_id`) REFERENCES `trabajadores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asistencias` ADD CONSTRAINT `asistencias_trabajador_id_fkey` FOREIGN KEY (`trabajador_id`) REFERENCES `trabajadores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
