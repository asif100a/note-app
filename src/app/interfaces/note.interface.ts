import { model, type Types } from "mongoose";
import { noteSchema } from "../models/note.model";

export interface INote {
    title: string;
    description: string;
    category: "personal" | "work" | "study";
    pinned: boolean;
    tags: {
        label: string;
        color: string
    },
    userId: Types.ObjectId
}

export const Note = model("Note", noteSchema);