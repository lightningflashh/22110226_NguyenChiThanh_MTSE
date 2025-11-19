import dotenv from 'dotenv';
import { importUsers, destroyUsers } from './userSeeder.js';
import { importProducts, destroyProducts } from './productSeeder.js';
import { connectDB } from '../config/mongodb.js';

dotenv.config();
connectDB(); // Kết nối database

const importData = async () => {
    try {
        console.log('--- Bắt đầu Xóa Dữ liệu cũ ---');
        await destroyUsers();
        await destroyProducts();

        console.log('--- Bắt đầu Import Dữ liệu mới ---');
        await importUsers();
        await importProducts();

        console.log('✅ Quá trình Import hoàn tất!');
        process.exit();
    } catch (error) {
        console.error(`🚨 LỖI: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await destroyUsers();
        await destroyProducts();

        console.log('🗑️ Quá trình Xóa hoàn tất!');
        process.exit();
    } catch (error) {
        console.error(`🚨 LỖI: ${error.message}`);
        process.exit(1);
    }
};

// Lệnh chạy seeder qua command line
if (process.argv[2] === '-d') {
    destroyData(); // Nếu chạy lệnh "node dataSeeder.js -d"
} else {
    importData(); // Nếu chạy lệnh "node dataSeeder.js"
}