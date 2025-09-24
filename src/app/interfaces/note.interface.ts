import type { Types } from "mongoose";

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