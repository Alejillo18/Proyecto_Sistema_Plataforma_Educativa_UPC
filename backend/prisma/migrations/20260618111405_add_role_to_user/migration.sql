-- CreateEnum
CREATE TYPE "roles" AS ENUM ('PROFESOR', 'ESTUDIANTE');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "roles" NOT NULL DEFAULT 'ESTUDIANTE';
