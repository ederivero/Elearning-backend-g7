-- DropForeignKey
ALTER TABLE `trabajadores` DROP FOREIGN KEY `trabajadores_supervisor_id_fkey`;

-- AlterTable
ALTER TABLE `asistencias` MODIFY `ingreso` TIME NOT NULL,
    MODIFY `salida` TIME NOT NULL;

-- AlterTable
ALTER TABLE `trabajadores` MODIFY `supervisor_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `trabajadores` ADD CONSTRAINT `trabajadores_supervisor_id_fkey` FOREIGN KEY (`supervisor_id`) REFERENCES `trabajadores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
