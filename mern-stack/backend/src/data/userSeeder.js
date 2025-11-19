// data/userSeeder.js

import User from '../models/userModel.js';
import bcrypt from 'bcryptjs'; // Cần để tạo mật khẩu nếu không dùng pre('save')

// Dữ liệu mẫu
const users = [
    {
        username: 'admin',
        displayName: 'Administrator',
        email: 'admin@example.com',
        // Mật khẩu sẽ được hash bởi middleware pre('save') trong UserModel
        password: '123456',
        role: 'admin',
        isActive: true,
        _destroy: false
    },
    {
        username: 'john_doe',
        displayName: 'John Doe',
        email: 'john@example.com',
        password: '123456',
        role: 'user',
        isActive: true,
        _destroy: false
    },
    {
        username: 'seller_a',
        displayName: 'Seller A',
        email: 'seller@example.com',
        password: '123456',
        role: 'seller',
        isActive: true,
        _destroy: false
    }
];

export const importUsers = async () => {
    try {
        await User.deleteMany(); // Xóa tất cả user cũ

        // Thêm dữ liệu mẫu
        const createdUsers = await User.insertMany(users);

        console.log('✅ Dữ liệu User đã được import thành công!');
        return createdUsers;
    } catch (error) {
        console.error(`❌ Lỗi khi import User: ${error.message}`);
        process.exit(1);
    }
};

export const destroyUsers = async () => {
    try {
        await User.deleteMany();
        console.log('🗑️ Dữ liệu User đã được xóa thành công!');
    } catch (error) {
        console.error(`❌ Lỗi khi xóa User: ${error.message}`);
        process.exit(1);
    }
};