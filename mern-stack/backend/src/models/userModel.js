import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        password: { type: String, required: true },
        username: { type: String, required: true, trim: true },
        displayName: { type: String, required: true, trim: true },
        avatar: { type: String, default: null },
        isActive: { type: Boolean, default: false },
        role: { type: String, enum: ['user', 'admin', 'seller'], default: 'user' },
        verifyToken: { type: String, default: null },
        _destroy: { type: Boolean, default: false }
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
    }
)

// Hash password trước khi save
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// So sánh password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.model('User', userSchema)
