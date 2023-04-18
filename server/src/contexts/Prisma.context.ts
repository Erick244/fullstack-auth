import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export interface PrismaContext {
    prisma: PrismaClient
}