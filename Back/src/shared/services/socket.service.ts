import { Server as SocketIOServer, Socket } from 'socket.io';
import { Server as HTTPServer } from 'http';

/**
 * ⚡ SOCKET SERVICE - REAL-TIME ENGINE (L6)
 * Arquitectura de Namespaces para Emerald DT
 */
class SocketService {
    private static instance: SocketService;
    private io: SocketIOServer | null = null;

    // Namespaces
    private readonly ADMIN_NS = '/dashboard-internal';
    private readonly PUBLIC_NS = '/catalog-updates';

    private constructor() {}

    public static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }

    /**
     * Inicializa el servidor de Sockets con la configuración de CORS de Software DT
     */
    public init(httpServer: HTTPServer): void {
        this.io = new SocketIOServer(httpServer, {
            cors: {
                origin: [
                    process.env.FRONTEND_URL || 'http://localhost:3000',
                    process.env.DASHBOARD_URL || 'http://localhost:3001'
                ],
                methods: ['GET', 'POST'],
                credentials: true
            },
            pingTimeout: 60000,
            allowEIO3: true
        });

        console.log('\x1b[35m⚡ [Socket S+]: Engine Inicializado y Protegido\x1b[0m');
        this.setupHandlers();
    }

    private setupHandlers(): void {
        if (!this.io) return;

        // 🟢 NAMESPACE PÚBLICO: Actualizaciones de Catálogo
        this.io.of(this.PUBLIC_NS).on('connection', (socket: Socket) => {
            console.log(`🌐 [Socket]: Cliente conectado al Catálogo: ${socket.id}`);
            
            socket.on('disconnect', () => {
                console.log('🌐 [Socket]: Cliente desconectado del Catálogo');
            });
        });

        // 🔴 NAMESPACE ADMIN: Dashboard de Isabella/Manuel (Nivel S+)
        this.io.of(this.ADMIN_NS).on('connection', (socket: Socket) => {
            console.log(`🛡️ [Socket]: Personal de Dashboard conectado: ${socket.id}`);

            // Evento de Auditoría: El dashboard reporta actividad
            socket.on('admin:activity', (data) => {
                console.log(`📊 [Audit]: Actividad en Dashboard: ${data.action}`);
            });

            socket.on('disconnect', () => {
                console.log('🛡️ [Socket]: Personal de Dashboard desconectado');
            });
        });
    }

    /**
     * @method emitInventoryUpdate
     * Notifica a ambos mundos que una esmeralda ha cambiado su estado.
     */
    public emitInventoryUpdate(payload: { sku: string; stock: number; status: string }): void {
        if (!this.io) return;

        // Al público solo enviamos lo necesario
        this.io.of(this.PUBLIC_NS).emit('product:stock_update', {
            sku: payload.sku,
            status: payload.status
        });

        // Al Dashboard enviamos la telemetría completa
        this.io.of(this.ADMIN_NS).emit('inventory:critical_alert', {
            ...payload,
            timestamp: new Date().toISOString()
        });
    }

    /**
     * @method emitNewSale
     * Alerta inmediata de venta para el equipo de logística.
     */
    public emitNewSale(saleData: any): void {
        if (!this.io) return;
        this.io.of(this.ADMIN_NS).emit('sale:confirmed', saleData);
    }
}

export const socketService = SocketService.getInstance();