import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { prisma } from './config/db.js';
import { connectMongo } from './config/mongo.js';
import { connectRedis } from './config/redis.js';
import authRoutes from './routes/authRoutes.js';
import careerRoutes from './routes/careerRoutes.js';
import filesRoutes from './routes/filesRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:4200',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());
/* 
app.use('/uploads', express.static('public/uploads')); 
*/
app.use(morgan('dev'));
app.use('/api/auth', authRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/files', filesRoutes);
app.use('/api/comments', commentRoutes);

app.get('/api/health', async (req, res) => {
  try {

    await prisma.$queryRaw`SELECT 1`;
    
    res.status(200).json({
      status: 'success',
      message: 'Servidor y bases de datos activos y respondiendo correctamente',
      services: {
        postgres: 'Conectado',
        mongo: 'Conectado',
        redis: 'Conectado'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'El servidor está activo pero uno de los servicios no responde',
      error: error.message
    });
  }
});

//middlewares
app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: 'La ruta solicitada no existe en este servidor'
  });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Ocurrió un error interno en el servidor'
  });
});

const startServer = async () => {
  try {
    // Conectar a MongoDB
    await connectMongo();

    // Conectar a Redis
    connectRedis();


    app.listen(PORT, () => {
      console.log(`Servidor inicializado correctamente en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Fallo crítico al iniciar el servidor:', error.message);
    process.exit(1);
  }
};

startServer();