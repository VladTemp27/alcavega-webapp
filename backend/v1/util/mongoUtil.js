import mongoose from 'mongoose';

class MongoUtil {
    static instance;

    constructor() {
        this.isConnected = false;
    }

    static getInstance() {
        if (!MongoUtil.instance) {
            MongoUtil.instance = new MongoUtil();
        }
        return MongoUtil.instance;
    }

    async connect() {
        if (this.isConnected) {
            console.log('Already connected to MongoDB');
            return;
        }

        try {
            const mongoUri = process.env.MONGO_URI || 'mongodb://admin:password123@localhost:27017/alcavega?authSource=admin';
            
            await mongoose.connect(mongoUri, {
                // Remove deprecated options in newer Mongoose versions
                maxPoolSize: 10,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
            });

            this.isConnected = true;
            console.log('✅ Connected to MongoDB successfully');
            
        } catch (error) {
            console.error('❌ MongoDB connection error:', error);
            throw error;
        }
    }

    async disconnect() {
        if (!this.isConnected) {
            return;
        }

        try {
            await mongoose.disconnect();
            this.isConnected = false;
            console.log('✅ Disconnected from MongoDB');
        } catch (error) {
            console.error('❌ Error disconnecting from MongoDB:', error);
            throw error;
        }
    }

    getConnectionStatus() {
        return this.isConnected;
    }
}

export default MongoUtil.getInstance();