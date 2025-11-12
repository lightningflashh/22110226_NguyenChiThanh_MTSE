import { UserModel, IUser } from "../models/user.model";

export const userService = {
  createUser: async (data: Partial<IUser>): Promise<IUser> => {
    return await UserModel.create(data);
  },

  getAllUsers: async (): Promise<IUser[]> => {
    return await UserModel.find().sort({ createdAt: -1 });
  },

  getUserById: async (id: string): Promise<IUser | null> => {
    return await UserModel.findById(id);
  },

  updateUser: async (id: string, data: Partial<IUser>): Promise<IUser | null> => {
    return await UserModel.findByIdAndUpdate(id, data, { new: true });
  },

  deleteUser: async (id: string): Promise<IUser | null> => {
    return await UserModel.findByIdAndDelete(id);
  },
};