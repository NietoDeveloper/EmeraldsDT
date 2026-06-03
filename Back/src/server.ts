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
            console.log(`   ${cyan}👤 ARCH