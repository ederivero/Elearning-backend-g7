-- AlterTable
ALTER TABLE `asistencias` MODIFY `ingreso` TIME NOT NULL,
    MODIFY `salida` TIME NOT NULL;

-- AlterTable
ALTER TABLE `trabajadores` ADD COLUMN `validado` BOOLEAN NOT NULL DEFAULT false;
