import 'dotenv/config';
import app from './app';
import { dbManager } from './config/database';

const PORT = Number(process.env.PORT) || 4000;
const HOST = '0.0.0.0'; // Estándar para despliegues en Railway/AWS

/**
 * 🚀 ARRANQUE DE INFRAESTRUCTURA CORE S+ - EMERALD DT
 */
const startServer = async () => {
    try {
        // Estabilización de Clusters Alpha y Omega
        const { public: publicDB, secure: secureDB } = await dbManager.connect();

        const server = app.listen(PORT, HOST, () => {
            const gold = '\x1b[33m';
            const green = '\x1b[32m';
            const cyan = '\x1b[36m';
            const reset = '\x1b[0m';
            const bold = '\x1b[1m';
            
            const doubleLine = '═'.repeat(65);
            const singleLine = '─'.repeat(65);

            console.log(`\n${gold}${doubleLine}${reset}`);
            console.log(`${green}${bold}  🛰️  EMERALD DT CORE - INFRAESTRUCTURA NIVEL S+ ACTIVA${reset}`);
            console.log(`${gold}${doubleLine}${reset}`);
            console.log(`  ${cyan}👤 ARCHITECT${reset}  : Manuel Nieto (Committers #1 Colombia)`);
            console.log(`  ${cyan}🌐 NETWORK${reset}    : Protocolo HTTP | Host: ${HOST} | Port: ${PORT}`);
            console.log(`  ${cyan}🛡️  SECURITY${reset}   : JWT-Bearer & Multi-Cluster Enabled`);
            console.log(`${gold}${singleLine}${reset}`);
            console.log(`  ${gold}📊 DATACENTERS STATUS (BOGOTÁ):${reset}`);
            console.log(`     ├─ 💎 Cluster Alpha (Public) : [${publicDB.readyState === 1 ? green+'CONNECTED'+reset : gold+'CONNECTING'+reset}]`);
            console.log(`     └─ 🛡️ Cluster Omega (Secure) : [${secureDB.readyState === 1 ? green+'CONNECTED'+reset : gold+'CONNECTING'+reset}]`);
            console.log(`${gold}${doubleLine}${reset}\n`);
        });

        /**
         * ⚠️ GESTIÓN DE ERRORES DE CLUSTER Y REJECTIONS
         */
        publicDB.on('error', err => console.error('\n❌ Cluster Alpha Error:', err));
        secureDB.on('error', err => console.error('\n❌ Cluster Omega Error:', err));

        process.on('unhandledRejection', (reason) => {
            console.error('\n⚠️ SDT Async Rejection:', reason);
        });

        /**
         * 💓 HEARTBEAT (Software DT Standard)
         */
        setInterval(() => {
            if (server.listening) {
                const timestamp = new Date().toLocaleTimeString();
                process.stdout.write(`\r \x1b[33m💓\x1b[0m [${timestamp}] Emerald DT Core: Sincronizado`);
            }
        }, 60000);

    } catch (err: any) {
        console.error('\n💥 CRITICAL INFRASTRUCTURE FAILURE:', err.message);
        process.exit(1);
    }
};

startServer();