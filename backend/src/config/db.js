import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import dotenv from 'dotenv';


dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('La variable de entorno DATABASE_URL no está definida en el archivo .env');
}


const pool = new pg.Pool({
  connectionString,
});


const adapter = new PrismaPg(pool);


const prisma = new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

const gracefulShutdown = async () => {
  await prisma.$disconnect();
  await pool.end();
  console.log('Conexión con PostgreSQL (Prisma y Pool nativo) cerrada de manera segura.');
  process.exit(0);
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

export { prisma };