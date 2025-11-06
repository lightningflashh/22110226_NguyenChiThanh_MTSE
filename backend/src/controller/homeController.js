import User from '../models/User.js';
import {
    getAllUser,
    createNewUser,
    getUserInfoById,
    updateUser,
    deleteUser
} from '../services/CRUDService.js';

// 👉 Lấy danh sách user và render ra homepage
export const getHomePage = async (req, res) => {
    try {
        let data = await User.find().lean();
        console.log('✅ Users:', data);
        return res.render('findAllUser.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.error('❌ Error loading homepage:', e);
        res.status(500).send('Internal Server Error');
    }
};

// 👉 Trang About (test)
export const getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
};

// 👉 API tạo user
export const postCreateUser = async (req, res) => {
    try {
        await createNewUser(req.body);
        let allUsers = await getAllUser();
        return res.render('findAllUser.ejs', {
            data: JSON.stringify(allUsers)
        });
    } catch (e) {
        console.error(e);
        res.status(500).send('Create user failed');
    }
};

// 👉 API edit user
export const getEditUser = async (req, res) => {
    try {
        let userId = req.query.id;
        if (userId) {
            let userData = await getUserInfoById(userId);
            return res.render('updateUser.ejs', { user: userData });
        } else {
            return res.send('User not found!');
        }
    } catch (e) {
        res.status(500).send('Error getting user info');
    }
};

// 👉 API cập nhật user
export const putUpdateUser = async (req, res) => {
    try {
        let allUsers = await updateUser(req.body);
        return res.render('findAllUser.ejs', {
            data: JSON.stringify(allUsers)
        });
    } catch (e) {
        res.status(500).send('Update failed');
    }
};

// 👉 API xóa user
export const deleteUserById = async (req, res) => {
    try {
        let id = req.query.id;
        if (id) {
            let allUsers = await deleteUser(id);
            return res.render('findAllUser.ejs', {
                data: JSON.stringify(allUsers)
            });
        } else {
            return res.send('User not found!');
        }
    } catch (e) {
        res.status(500).send('Delete failed');
    }
};
