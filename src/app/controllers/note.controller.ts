import { Router, type Request, type Response } from "express";
import { model } from "mongoose";
import { noteSchema } from "../models/note.model";
import { Note } from "../interfaces/note.interface";

export const noteRoute = Router();

noteRoute.post('/create-note', async (req: Request, res: Response) => {
    const data = req.body;
    console.log("Data: ", data);

    try {
        // ------------- 1st noteRouteroach ---------------
        // const myNote = new Note({
        //     title: "This is a Latest Note",
        //     tags: { label: "Database" }
        // });
        // await myNote.save();

        // ------------- 2nd noteRouteroach ---------------
        const note = await Note.create(data);

        res.status(201).json({
            success: true,
            message: "Note created successfully",
            note
        });
    } catch (error) {
        console.error("❌ Error while creating note: ", error);
        res.status(500).json({
            success: false,
            data: error
        });
    }
});
noteRoute.get('/get-all', async (req: Request, res: Response) => {
    try {
        const notes = await Note.find().populate("userId");

        res.status(200).json({
            success: true,
            message: "Note got successfully",
            notes
        });
    } catch (error) {
        console.error("❌ Error while getting all notes: ", error);
        res.status(500).json({
            success: false,
            data: error
        });
    }
});
noteRoute.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);

        res.status(200).json({
            success: true,
            message: "Note got successfully",
            note
        });
    } catch (error) {
        console.error("❌ Error while getting the single note: ", error);
        res.status(500).json({
            success: false,
            data: error
        });
    }
});
noteRoute.patch('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    console.log("Data: ", data);

    try {
        const note = await Note.findByIdAndUpdate(id, data, { new: true });
        // const note = await Note.findOneAndUpdate({_id: id}, data, {new: true});
        // const note = await Note.updateOne({_id: id}, data, {new: true});

        res.status(200).json({
            success: true,
            message: "Note updated successfully",
            note
        });
    } catch (error) {
        console.error("❌ Error while updating the note: ", error);
        res.status(500).json({
            success: false,
            data: error
        });
    }
});
noteRoute.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const note = await Note.findByIdAndDelete(id);
        // const note = await Note.findOneAndDelete({_id: id});
        // const note = await Note.deleteOne({_id: id});

        res.status(200).json({
            success: true,
            message: "Note deleted successfully",
            note
        });
    } catch (error) {
        console.error("❌ Error while deleting the note: ", error);
        res.status(500).json({
            success: false,
            data: error
        });
    }
});