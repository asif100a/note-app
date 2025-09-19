import { Router, type Request, type Response } from "express";
import { model } from "mongoose";
import { noteSchema } from "../models/note.model";

export const noteRoute = Router();

const Note = model("Note", noteSchema);

noteRoute.post('/create-note', async (req: Request, res: Response) => {
    const data = req.body;
    console.log("Data: ", data);

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
});
noteRoute.get('/get-all', async (req: Request, res: Response) => {
    const notes = await Note.find();

    res.status(200).json({
        success: true,
        message: "Note got successfully",
        notes
    });
});
noteRoute.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const note = await Note.findById(id);

    res.status(200).json({
        success: true,
        message: "Note got successfully",
        note
    });
});
noteRoute.patch('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    console.log("Data: ", data);

    const note = await Note.findByIdAndUpdate(id, data, { new: true });
    // const note = await Note.findOneAndUpdate({_id: id}, data, {new: true});
    // const note = await Note.updateOne({_id: id}, data, {new: true});

    res.status(200).json({
        success: true,
        message: "Note updated successfully",
        note
    });
});
noteRoute.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    const note = await Note.findByIdAndDelete(id);
    // const note = await Note.findOneAndDelete({_id: id});
    // const note = await Note.deleteOne({_id: id});

    res.status(200).json({
        success: true,
        message: "Note deleted successfully",
        note
    });
});