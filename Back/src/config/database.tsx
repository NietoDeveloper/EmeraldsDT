import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || '');
    console.log(`📡 Cluster Alpha Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error de Conexión: ${error}`);
    process.exit
  }
};