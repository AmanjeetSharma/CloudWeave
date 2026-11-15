
import { prisma } from "./prisma.js";

export async function connectDatabase(): Promise<void> {
    await prisma.$connect();

    console.log("PostgreSQL connected successfully");
}

export async function disconnectDatabase(): Promise<void> {
    await prisma.$disconnect();

    console.log("PostgreSQL disconnected successfully");
}
