import mongoose, { Connection } from 'mongoose';

// Connection options for maximum stability
const connectionOptions = {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
};

// Cluster Alpha: Public Data (Products, Catalog)
const emeraldDB: Connection = mongoose.createConnection(
    process.env.MONGO_URI_PUBLIC || '', 
    connectionOptions
);

// Cluster Omega: Secure Data (Users, Auth, Employee Dashboard)
const userDB: Connection = mongoose.createConnection(
    process.env.MONGO_URI_SECURE || '', 
    connectionOptions
);

// Logs for Engineering Control
emeraldDB.on('connected', () => console.log('🟢 Cluster Alpha (Emeralds) Connected'));
userDB.on('connected', () => console.log('🔐 Cluster Omega (Security) Connected'));

emeraldDB.on('error', (err) => console.error('🔴 Cluster Alpha Error:', err));
userDB.on('error', (err) => console.error('❌ Cluster Omega Error:', err));

export { emeraldDB, userDB };