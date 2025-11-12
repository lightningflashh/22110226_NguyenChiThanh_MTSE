import { Request, Response } from "express";
import { userService } from "../services/user.service";

export const userController = {
  createUser: async (req: Request, res: Response) => {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: "Error creating user", error });
    }
  },

  getAllUsers: async (_: Request, res: Response) => {
    const users = await userService.getAllUsers();
    res.json(users);
  },

  getUserById: async (req: Request, res: Response) => {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  },

  updateUser: async (req: Request, res: Response) => {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  },

  deleteUser: async (req: Request, res: Response) => {
    const user = await userService.deleteUser(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  },

  // View (EJS)
  renderHome: (_: Request, res: Response) => {
    res.render("index");
  },

  renderAllUsers: async (_: Request, res: Response) => {
    const users = await userService.getAllUsers();
    res.render("users/list", { users });
  },

  renderCreateForm: (_: Request, res: Response) => {
    res.render("users/create");
  },

  createUserEJS: async (req: Request, res: Response) => {
    await userService.createUser(req.body);
    res.redirect("/users");
  },

  renderEditForm: async (req: Request, res: Response) => {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.redirect("/users");
    res.render("users/edit", { user });
  },

  updateUserEJS: async (req: Request, res: Response) => {
    await userService.updateUser(req.params.id, req.body);
    res.redirect("/users");
  },

  deleteUserEJS: async (req: Request, res: Response) => {
    await userService.deleteUser(req.params.id);
    res.redirect("/users");
  },
};