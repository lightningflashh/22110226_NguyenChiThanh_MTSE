import express from "express";
import { userController } from "../controllers/user.controller";

const router = express.Router();

router.get("/", userController.renderHome);
router.get("/users", userController.renderAllUsers);
router.get("/users/create", userController.renderCreateForm);
router.post("/users/create", userController.createUserEJS);
router.get("/users/edit/:id", userController.renderEditForm);
router.post("/users/edit/:id", userController.updateUserEJS);
router.get("/users/delete/:id", userController.deleteUserEJS);

export default router;