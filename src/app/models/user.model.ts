import { model, Schema } from "mongoose";
import { type IUser } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>({
    name: {
        type: String, 
        required: true, 
        trim: true,
        minlength: [5, "Min Length must be greater than or equal 5, but got '{VALUE}'"],
        maxlength: 10
    },
    email: {
        type: String, 
        required: true, 
        trim: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String, required: true
    },
    role: {
        type: String,
        uppercase: true,
        enum: ['USER', 'ADMIN'], 
        default: 'USER'
    },
    age: {
        type: Number,
        required: true,
        min: [18, "Age must be greater than or equal of 10, but got {VALUE}"],
        max: [40, "Age must be less than or equal of 40, but got {VALUE}"]
    }
});

export const User = model("User", userSchema);