import prisma from "@prisma/client";

const { PrismaClient } = prisma;

// creamos la instancia para conectarnos a la BD desde express
export const PrismaConnector = new PrismaClient();
