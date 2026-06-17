import mongoose from "mongoose";

export async function connectDB() {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        console.warn("MONGO_URI is not set. Starting without MongoDB connection.");
        return false;
    }

    try {
        const conn = await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 10000,
            retryWrites: true,
        });

        console.log("Connected to MongoDB:", conn.connection.host);
        return true;
    } catch (error) {
        console.error(
            "MongoDB connection failed. Starting without database:",
            error.message
        );
        return false;
    }
}