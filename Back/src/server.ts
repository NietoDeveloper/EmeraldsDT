import 'dotenv/config';
import app from './app';
import { connectDB } from './config/database';

const PORT = process.env.PORT || 4000;

/**
 * Emerald DT - High-Engineering Boot System
 * Handles database stabilization and server listener
 */
const startServer = async () => {
    try {
        // 1. Estabilizar conexión a los Clusters antes de abrir puerto
        await connectDB();

        // 2. Iniciar escucha de peticiones
        app.listen(PORT, () => {
            console.log('----------------------------------------------------');
            console.log(`🚀 EMERALD DT OPERATIONAL ON PORT: ${PORT}`);
            console.log(`📈 STATUS: Atomic-Proof Start | BOGOTÁ, COLOMBIA`);
            console.log('----------------------------------------------------');
        });
    } catch (err: any) {
        console.error('----------------------------------------------------');
        console.error('💥 SYSTEM FAILURE: SERVER COULD NOT START');
        console.error(`DETAILS: ${err.message}`);
        console.error('----------------------------------------------------');
        process.exit(1);
    }
};

startServer();