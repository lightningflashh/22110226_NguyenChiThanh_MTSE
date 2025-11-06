import express from "express";
import {
    getHomePage,
    getAboutPage,
    postCreateUser,
    getEditUser,
    putUpdateUser,
    deleteUserById
} from "../controller/homeController.js"; // import theo dạng named exports

let router = express.Router();

let initWebRoutes = (app) => {
    // ✅ Trang chủ test
    router.get("/", (req, res) =>
        res.send("Nguyễn Chí Thanh - MongoDB Edition 🚀")
    );

    // ✅ Các route chính
    router.get("/home", getHomePage);
    router.get("/about", getAboutPage);

    // ✅ CRUD routes
    router.post("/add-user", postCreateUser);
    router.get("/edit-user", getEditUser);
    router.post("/update-user", putUpdateUser);
    router.get("/delete-user", deleteUserById);

    return app.use("/", router);
};

export default initWebRoutes;
