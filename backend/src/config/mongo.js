import mongoose from 'mongoose';


const connectMongo = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    
    if (!mongoUri) {
      throw new Error('La variable de entorno MONGO_URI no está definida en el archivo .env');
    }

    mongoose.connection.on('connected', () => {
      console.log('Conexión con MongoDB establecida correctamente.');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Error crítico en la conexión de MongoDB:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Conexión con MongoDB interrumpida.');
    });

    await mongoose.connect(mongoUri);
  } catch (error) {
    console.error('No se pudo inicializar la conexión a MongoDB:', error.message);
    process.exit(1);
  }
};

const gracefulShutdown = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
    console.log('Conexión con MongoDB cerrada de manera segura.');
  }
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

export { connectMongo };