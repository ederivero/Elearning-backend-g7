/*
  Warnings:

  - You are about to drop the column `departamento_id2` on the `trabajadores` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `asistencias` MODIFY `ingreso` TIME NOT NULL,
    MODIFY `salida` TIME NOT NULL;

-- AlterTable
ALTER TABLE `trabajadores` DROP COLUMN `departamento_id2`;
