import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        console.log("🔍 process.env.MONGO_URI =", process.env.MONGO_URI);

        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI not found in .env file!");
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB connected successfully!");
    } catch (err) {
        console.error("❌ MongoDB connection failed:", err.message);
    }
};

export default connectDB;
