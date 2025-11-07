import User from "../models/User.js";
import {
    getAllUser,
    createNewUser,
    getUserInfoById,
    updateUser,
    deleteUser,
} from "../services/CRUDService.js";

//Lấy danh sách user và render ra homepage
export const getHomePage = async (req, res) => {
    try {
        let data = await User.find().lean();
        console.log('✅ Users:', data);
        return res.render('findAllUser.ejs', { datalist: data });
    } catch (e) {
        console.error('❌ Error loading homepage:', e);
        res.status(500).send('Internal Server Error');
    }
};


// Trang About (test)
export const getAboutPage = (req, res) => {
    res.render("test/about.ejs");
};

// Tạo user mới
export const postCreateUser = async (req, res) => {
    try {
        // Tạo user mới
        await createNewUser(req.body);

        // Lấy lại toàn bộ danh sách user sau khi thêm
        const allUsers = await getAllUser();

        // Render lại trang, hiển thị danh sách + toast thành công
        return res.render("findAllUser.ejs", {
            datalist: allUsers,
            showToast: true,   // dùng trong EJS để hiển thị toast
            showModal: false   // đảm bảo modal không bật lại
        });

    } catch (e) {
        console.error("Error creating user:", e);

        // ✅ Lấy lại danh sách hiện tại (để vẫn hiển thị bảng)
        const allUsers = await getAllUser();

        // ✅ Render lại trang, mở lại modal khi lỗi
        return res.render("findAllUser.ejs", {
            datalist: allUsers,
            showToast: false,
            showModal: true,   //tự bật modal lại cho user nhập lại
            errorMessage: "Tạo người dùng thất bại. Vui lòng thử lại."
        });
    }
};


export const getEditUser = async (req, res) => {
    try {
        let userId = req.query.id;
        if (userId) {
            const userData = await getUserInfoById(userId);
            return res.render("updateUser.ejs", { user: userData });
        } else {
            return res.send("User not found!");
        }
    } catch (e) {
        console.error(e);
        res.status(500).send("Error getting user info");
    }
};


// Cập nhật user
export const putUpdateUser = async (req, res) => {
    try {
        await updateUser(req.body);
        const allUsers = await getAllUser();
        res.render("findAllUser.ejs", { datalist: allUsers });
    } catch (err) {
        console.error("Update failed:", err);
        res.status(500).send("Update failed");
    }
};


// 👉 Xóa user
export const deleteUserById = async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) {
            return res.status(400).send("User ID is required!");
        }

        // Xóa user
        const deleted = await deleteUser(id);
        if (!deleted) {
            return res.status(404).send("User not found or already deleted");
        }

        // Lấy lại danh sách user mới
        const allUsers = await getAllUser();
        res.render("findAllUser.ejs", { datalist: allUsers });
    } catch (e) {
        console.error("Error deleting user:", e);
        res.status(500).send("Delete failed");
    }
};

