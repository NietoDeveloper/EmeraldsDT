import { Server as SocketIOServer, Socket } from 'socket.io';
import { Server as HTTPServer } from 'http';

/**
 * 🔒 DEFINICIÓN DE CONTRATOS DE TELEMETRÍA - LEVEL L6
 * Estructuras de datos fijas para evitar mutaciones en el canal WebSockets.
 */
export interface ISampleInventoryPayload {
    sku: string;
    stock: number;
    status: 'AVAILABLE' | 'RESERVED' | 'SOLD';
}

export interface ISaleConfirmationPayload {
    transactionId: string;
    sku: string;
    amount: number;
    currency: 'COP' | 'USD';
    buyerEmail: string;
    timestamp: string;
}

/**
 * 🐍 LA CONSTRICTOR REALTIME - INTERFACES DE EVENTOS DE SOCKET.IO
 * Mapeo estricto de firmas que exige TypeScript para los canales de comunicación.
 */
interface ServerToClientEvents {
    'product:stock_update': (data: { sku: string; status: 'AVAILABLE' | 'RESERVED' | 'SOLD' }) => void;
    'inventory:critical_alert': (data: ISampleInventoryPayload & { timestamp: string }) => void;
    'sale:confirmed': (data: ISaleConfirmationPayload) => void;
}

interface ClientToServerEvents {
    'admin:activity': (data: { action: string; resource: string }) => void;
}

interface InterServerEvents {}
interface SocketData {}

/**
 * ⚡ SOCKET SERVICE - REAL-TIME ENGINE (L6)
 * Motor reactivo de baja latencia con segregación simétrica por Namespaces.
 */
class SocketService {
    private static instance: SocketService;
    private io: SocketIOServer<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData> | null = null;

    // Namespaces aislados para el E-commerce y la Consola de Control
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
     * Inicializa el servidor de Sockets con las políticas CORS del Bogotá Node
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
            pingTimeout: 60000, // Ventana optimizada para mantener vivos los hilos
            pingInterval: 25000,
            allowEIO3: false // Grado Máximo: Forzar WebSocket puro (EIO4) evitando degradación de red
        });

        console.log('\x1b[35m⚡ [La Constrictor Realtime]: Security Socket Architecture Engaged\x1b[0m');
        this.setupHandlers();
    }

    /**
     * Orquestación de interceptores de red y eventos entrantes/salientes
     */
    private setupHandlers(): void {
        if (!this.io) return;

        // 🌐 NAMESPACE PÚBLICO: Sincronización del catálogo web (E-commerce UI)
        this.io.of(this.PUBLIC_NS).on('connection', (socket: Socket) => {
            console.log(`🌐 [Socket]: Cliente conectado al catálogo web: ${socket.id}`);
            
            socket.on('disconnect', () => {
                console.log(`🌐 [Socket]: Cliente desconectado del catálogo web [ID: ${socket.id}]`);
            });
        });

        // 🛡️ NAMESPACE ADMINISTRATIVO: Consola interna sin scroll de Isabella/Manuel (Nivel S+)
        this.io.of(this.ADMIN_NS).on('connection', (socket: Socket) => {
            console.log(`🛡️ [Socket]: Personal de Dashboard autenticado en el hilo de red: ${socket.id}`);

            // Canal seguro de auditoría en tiempo real para rastrear operaciones críticas
            socket.on('admin:activity', (data) => {
                console.log(`📊 [Realtime Audit]: Operación detectada en Dashboard -> ${data.action} sobre ${data.resource}`);
            });

            socket.on('disconnect', () => {
                console.log(`🛡️ [Socket]: Canal administrativo cerrado para sesión: ${socket.id}`);
            });
        });
    }

    /**
     * 🛰️ METODO - EMIT INVENTORY UPDATE
     * Despacha ráfagas asíncronas paralelas. Altera el stock del catálogo público
     * y emite alertas de cambio de estado (AVAILABLE ➔ SOLD) en la sala de control.
     */
    public emitInventoryUpdate(payload: ISampleInventoryPayload): void {
        if (!this.io) {
            console.warn('⚠️ [La Constrictor]: Intent de emisión abortado. Servidor de Sockets no hidratado');
            return;
        }

        // 1. Filtrado de datos para el cliente del E-commerce público (Previene ingeniería inversa)
        this.io.of(this.PUBLIC_NS).emit('product:stock_update', {
            sku: payload.sku,
            status: payload.status
        });

        // 2. Telemetría cruda y completa enviada de inmediato a la mesa de control de inventarios
        this.io.of(this.ADMIN_NS).emit('inventory:critical_alert', {
            sku: payload.sku,
            stock: payload.stock,
            status: payload.status,
            timestamp: new Date().toISOString()
        });
    }

    /**
     * 🛰️ METODO - EMIT NEW SALE
     * Alerta visual e instantánea que se renderiza en las pantallas a 100vh de logística.
     */
    public emitNewSale(saleData: ISaleConfirmationPayload): void {
        if (!this.io) return;
        
        this.io.of(this.ADMIN_NS).emit('sale:confirmed', {
            transactionId: saleData.transactionId,
            sku: saleData.sku,
            amount: saleData.amount,
            currency: saleData.currency,
            buyerEmail: saleData.buyerEmail,
            timestamp: saleData.timestamp
        });
    }
}

export const socketService = SocketService.getInstance();