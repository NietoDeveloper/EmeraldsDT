import 'dotenv/config';
import http from 'http';
import app from './app';
import { dbManager } from './config/database';
import { socketService } from './shared/services/socket.service';

/**
 * 🛰️ EMERALD DT - 
const bold = '\x1b[1m';

const startServer = async ()s hacia los Cluster
         */
        const server = httpServer.listen(PORT, HOST, () => {
            const doubleLine = '═'.repeat(65);
            const singleLine = '─'.repeat(65);

            console.log(`\n${gold}${doubleLine}${reset}`);
            console.log(`${green}${bold}   🛰️  EMERALD DT CORE - INFRAESTRUCTURA NIVEL S+ ACTIVA${reset}`);
            console.log(`${gold}${doubleLine}${reset}`);
            console.log(`   ${cyan}👤 ARCHITECT${reset}   : Manuel Nieto (Committers #1 Colombia)`);
            console.log(`   ${cyan}🌐 NETWORK${reset}     : Protocolo HTTP/WS | Host: ${HOST} | Port: ${PORT}`);
            console.log(`   ${cyan}🛡️  SECURITY${reset}    : JWT-Bearer & Multi-Cluster L6 Enabled`);
            console.log(`${gold}${singleLine}${reset}`);
            console.log(`   ${gold}📊 DATACENTERS STATUS (BOGOTÁ):${reset}`);
            console.log(`     ├─ 💎 Cluster Alpha (Public) : [${publicDB.readyState === 1 ? green + 'CONNECTED' + reset : gold + 'CONNECTING' + reset}]`);
            console.log(`     └─ 🛡️ Cluster Omega (Secure) : [${secureDB.readyState === 1 ? green + 'CONNECTED' + reset : gold + 'CONNECTING' + reset}]`);
            console.log(`${gold}${doubleLine}${reset}\n`);
        });

        /**
         * ⚠️ EVENT LISTENERS: INFRASTRUCTURE HEALTH
         */
        publicDB.on('error', err => console.error(`\n${red}❌ Cluster Alpha Error:${reset}`, err));
        secureDB.on('error', err => console.error(`\n${red}❌ Cluster Omega Error:${reset}`, err));

        // Captura de errores asíncronos fuera de los bloques try-catch
        process.on('unhandledRejection', (reason) => {
            console.error(`\n${red}⚠️  SDT Async Rejection Encountered:${reset}`, reason);
        });

        process.on('uncaugh
        };

        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
        process.on('SIGINT', () => gracefulShutdown('SIGINT'));
