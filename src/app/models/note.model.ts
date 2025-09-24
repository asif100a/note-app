import { Schema } from "mongoose";
import { type INote } from "../interfaces/note.interface";

const noteSchema = new Schema<INote>({
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
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, { versionKey: false, timestamps: true });

export { noteSchema };