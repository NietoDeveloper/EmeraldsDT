import mongoose, { Connection } from 'mongoose';

/**
 * Emerald DT - Double Cluster Architecture
 * Protocol: Atomic-Proof Connection
 */

interface ClusterConnections {
  public: Connection;
  secure: Connection;
}

class DatabaseManager {
  private static instance: DatabaseManager;
  private connections: Partial<ClusterConnections> = {};

  private constructor() {}

  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  private async createConnection(uri: string, clusterName: string): Promise<Connection> {
    const conn = mongoose.createConnection(uri, {
      // Configuraciones de robustez moderna
      maxPoolSize: 10,           // Mantiene 10 conexiones listas para alta demanda
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,                // Fuerza el uso de IPv4 para evitar delays de DNS
    });

    conn.on('connected', () => console.log(`📡 [${clusterName}] Operational: ${conn.host}`));
    conn.on('error', (err) => console.error(`❌ [${clusterName}] Critical Failure: ${err}`));
    conn.on('disconnected', () => console.warn(`⚠️ [${clusterName}] Connection Lost. Retrying...`));

    return conn.asPromise();
  }

  public async connect(): Promise<ClusterConnections> {
    const PUBLIC_URI = process.env.MONGO_PUBLIC_URI || process.env.MONGO_URI || '';
    const SECURE_URI = process.env.MONGO_SECURE_URI || '';

    try {
      // Conexión Paralela (Algoritmo de Carrera) para máxima velocidad de arranque
      const [publicConn, secureConn] = await Promise.all([
        this.createConnection(PUBLIC_URI, 'Cluster Alpha - Public'),
        this.createConnection(SECURE_URI || PUBLIC_URI, 'Cluster Beta - Secure')
      ]);

      this.connections = { public: publicConn, secure: secureConn };
      return this.connections as ClusterConnections;
    } catch (error) {
      console.error('💥 SYSTEM HALTED: Failed to stabilize Double Cluster');
      process.exit(1);
    }
  }

  public getConnections(): ClusterConnections {
    if (!this.connections.public || !this.connections.secure) {
      throw new Error("Clusters not initialized");
    }
    return this.connections as ClusterConnections;
  }
}

export const dbManager = DatabaseManager.getInstance();
export const connectDB = () => dbManager.connect();