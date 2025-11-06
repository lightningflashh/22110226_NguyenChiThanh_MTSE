import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        firstName: { type: String },
        lastName: { type: String },
        address: { type: String },
        phoneNumber: { type: String },
        gender: { type: Boolean, default: true },
        image: { type: String },
        roleId: { type: String },
        positionId: { type: String },
    },
    { timestamps: true } // tự động thêm createdAt, updatedAt
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
