import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connection successful!");
    } catch (err) {
        console.error("MongoDB connection failed:", err);
    }
};

export default connectDB;
