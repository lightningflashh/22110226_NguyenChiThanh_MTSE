import bcrypt from 'bcryptjs';
import User from '../models/user.js';

const salt = bcrypt.genSaltSync(10);

// 👉 Hàm hash password
let hashUserPassword = async (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hash(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
};

// 👉 Tạo user mới (CREATE)
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);

            const newUser = new User({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId
            });

            await newUser.save();
            resolve('✅ OK create a new user successfully!');
        } catch (e) {
            reject(e);
        }
    });
};

// 👉 Lấy tất cả user (READ - findAll)
let getAllUser = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await User.find().lean(); // lean() để trả dữ liệu gốc
            resolve(users);
        } catch (e) {
            reject(e);
        }
    });
};

// 👉 Lấy 1 user theo ID (READ - findOne)
let getUserInfoById = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findById(userId).lean();
            if (user) {
                resolve(user);
            } else {
                resolve({});
            }
        } catch (e) {
            reject(e);
        }
    });
};

// 👉 Cập nhật user (UPDATE)
let updateUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findById(data.id);
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();

                let allUsers = await User.find();
                resolve(allUsers);
            } else {
                resolve([]);
            }
        } catch (e) {
            reject(e);
        }
    });
};

// 👉 Xóa user (DELETE)
let deleteUser = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await User.findByIdAndDelete(userId);
            let allUsers = await User.find();
            resolve(allUsers);
        } catch (e) {
            reject(e);
        }
    });
};

// 👉 Export tất cả
export {
    createNewUser,
    getAllUser,
    getUserInfoById,
    updateUser,
    deleteUser
};
