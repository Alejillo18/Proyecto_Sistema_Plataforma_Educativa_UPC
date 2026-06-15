import Redis from 'ioredis';

let redisClient = null;

const connectRedis = () => {
  const redisUrl = process.env.REDIS_URL;

  if (!redisUrl) {
    throw new Error('La variable de entorno REDIS_URL no está definida en el archivo .env');
  }

  redisClient = new Redis(redisUrl, {
    maxRetriesPerRequest: 3,
    reconnectOnError: (err) => {
      console.error('Error de reconexión en Redis:', err.message);
      return true;
    }
  });


  redisClient.on('connect', () => {
    console.log('Conexión con Redis establecida correctamente.');
  });

  redisClient.on('error', (err) => {
    console.error('Error en el cliente de Redis:', err.message);
  });

  redisClient.on('end', () => {
    console.log('Conexión con Redis finalizada.');
  });

  return redisClient;
};

const gracefulShutdown = async () => {
  if (redisClient) {
    await redisClient.quit();
    console.log('Conexión con Redis cerrada de manera segura.');
  }
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

export { connectRedis, redisClient };