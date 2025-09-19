import { Schema } from "mongoose";

const noteSchema = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    category: {
        type: String,
        enum: ["personal", "work", 'study'],
        default: "personal"
    },
    pinned: {
        type: Boolean,
        default: false
    },
    tags: {
        label: { type: String, required: true },
        color: { type: String, default: "gray" }
    }
}, { versionKey: false, timestamps: true });

export {noteSchema};