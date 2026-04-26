import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.conrocess.env.MONGO_URI || '');
    console.log(`📡 Cluster Alphnectado: ${conn.connion.host}`);
  } catch
