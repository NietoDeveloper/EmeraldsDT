import 'dotenv/config';
import http from 'http';
import app from './app';
import { dbManager } from './config/database';
import { socketService } from './shared/services/socket.service';

const PORT = Number(process.env.PORT) || 4000;
const HOST = '0.0.0.0';

/**
 * 🚀 ARRANQUE DE INFRAESTRUCTURA CORE S+ - EMERALD DT
 * Versión L6: Implementación de S WebSockets)
 */
const startServer = async () => {
    try {
    lusters Alpha y Omega
        const { public: publicDB, secure: secureDB } = await dbManager.connect();

        // 2. Creación del Servidor HTTP (Requerido para Sockets L6)
        const httpServer = http.createServer(app);

        // 3. Inicialización del Motor de Sockets (La Constrictor Engine)
        socketService.init(httpServer);

        // 4. Apertura de Canales de Comunicación
        httpServer.listen(PORT, HOST, () => {
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
            console.log(`  ${cyan}🌐 NETWORK${reset}    : Protocolo HTTP/WS | Host: ${HOST} | Port: ${PORT}`);
            console.log(`  ${cyan}🛡️  SECURITY${reset}   : JWT-Bearer & Multi-Cluster Enabled`);
            console.log(`${gold}${singleLine}${reset}`);
            console.log(`  ${gold}📊 DATACENTERS STATUS (BOGOTÁ):${reset}`);
            console.log(`    ├─ 💎 Cluster Alpha (Public) : [${publicDB.readyState === 1 ? green+'CONNECTED'+reset : gold+'CONNECTING'+reset}]`);
            console.log(`    └─ 🛡️ Cluster Omega (Secure) : [${secureDB.readyState === 1 ? green+'CONNECTED'+reset : gold+'CONNECTING'+reset}]`);
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

        // Manejo de apagado gracioso (Graceful Shutdown) - Práctica L6
        process.on('SIGTERM', () => {
            console.log('\n🛑 SIGTERM RECIBIDO: Cerrando infraestructura...');
            httpServer.close(() => {
                dbManager.getConnections().public.close();
                dbManager.getConnections().secure.close();
                process.exit(0);
            });
        });

        /**
         * 💓 HEARTBEAT (Software DT Standard)
         */
        setInterval(() => {
            // Verificamos si el servidor HTTP está activo
            const timestamp = new Date().toLocaleTimeString();
            process.stdout.write(`\r \x1b[33m💓\x1b[0m [${timestamp}] Emerald DT Core: Sincronizado`);
        }, 60000);

    } catch (err: any) {
        console.error('\n💥 CRITICAL INFRASTRUCTURE FAILURE:', err.message);
        process.exit(1);
    }
};

startServer();