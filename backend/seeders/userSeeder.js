import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../src/models/User.js"; // Đường dẫn model

dotenv.config();

const users = [
    {
        email: "admin@gmail.com",
        password: "123456",
        firstName: "Admin",
        lastName: "System",
        address: "TP. Hồ Chí Minh",
        phoneNumber: "0123456789",
        gender: true,
        roleId: "R1",
        positionId: "P1",
    },
    {
        email: "user1@gmail.com",
        password: "123456",
        firstName: "Nguyễn",
        lastName: "A",
        address: "Đà Nẵng",
        phoneNumber: "0987654321",
        gender: false,
        roleId: "R2",
        positionId: "P2",
    },
    {
        email: "user2@gmail.com",
        password: "123456",
        firstName: "Trần",
        lastName: "B",
        address: "Hà Nội",
        phoneNumber: "0933221122",
        gender: true,
        roleId: "R2",
        positionId: "P2",
    },
];

const seedUsers = async () => {
    try {
        // ✅ Kết nối DB
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB");

        // ✅ Xóa toàn bộ user cũ
        await User.deleteMany({});
        console.log("🧹 Old users removed");

        // ✅ Thêm user mới
        await User.insertMany(users);
        console.log("🌱 User seeding completed!");

        process.exit(0);
    } catch (err) {
        console.error("❌ Error seeding users:", err);
        process.exit(1);
    }
};

seedUsers();
