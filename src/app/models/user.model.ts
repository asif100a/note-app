import { model, Schema } from "mongoose";
import { type IUser } from "../interfaces/user.interface";
import validator from 'validator';

const userSchema = new Schema<IUser>({
    name: {
        type: String, 
        required: [true, "Please provide the user name"], 
        trim: true,
        minlength: [5, "Min Length must be greater than or equal 5, but got '{VALUE}'"],
        maxlength: 10
    },
    email: {
        type: String, 
        required: true, 
        unique: [true, "Please send a unique email"],
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, "The provided \"{VALUE}\" is not a valid email."]
        // validate: {
        //     validator: function(v) {
        //         return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(v)
        //     },
        //     message: function(props) {
        //         return `"${props.value}" is a valid email address`
        //     }
        // }
    },
    password: {
        type: String, required: true
    },
    role: {
        type: String,
        uppercase: true,
        enum: {
            values: ['USER', 'ADMIN'],
            message: "The \"{VALUE}\" is not a valid role.",
           default: 'USER'
        }
    },
    age: {
        type: Number,
        required: true,
        min: [18, "Age must be greater than or equal of 10, but got {VALUE}"],
        max: [40, "Age must be less than or equal of 40, but got {VALUE}"]
    }
});

export const User = model("User", userSchema);