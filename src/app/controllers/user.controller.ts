import { Router, type Request, type Response } from "express";
import { User } from "../models/user.model";
import z from "zod";

export const userRoute = Router();

const CreateUserZodSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    role: z.string().optional(),
    age: z.number(),
});

// For Dropping the Collection
userRoute.delete('/drop-collection', async (req: Request, res: Response) => {
    try {
        const result = await User.collection.drop();

        res.status(200).json({
            success: true,
            message: "User collection dropped successfully",
            result
        })
    } catch (error) {
        console.error("❌ Error while dropping User collection: ", error);
        res.status(500).json({
            success: false,
            data: error
        });
    }
});

userRoute.post('/create-user', async (req: Request, res: Response) => {
    const data = req.body;
    // console.log("Data: ", data);

    // ------------- 1st userRouteroach ---------------
    // const myUser = new User({
    //     title: "This is a Latest User",
    //     tags: { label: "Database" }
    // });
    // await myUser.save();

    // ------------- 2nd userRouteroach ---------------
    try {
        // const body = CreateUserZodSchema.parse(data);
        // console.log("Zod Body: ", body, '\n<-------------------');

        const user = new User(data);

        const password = await user.hashPassword(data.password)
        user.password = password

        await user.save()

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user
        });
    } catch (error: any) {
        console.error("❌ Error while creating user: ", error);
        res.status(500).json({
            success: false,
            data: error?.message
        });
    }
});
userRoute.get('/get-all', async (req: Request, res: Response) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        message: "User got successfully",
        users
    });
});
userRoute.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).json({
        success: true,
        message: "User got successfully",
        user
    });
});
userRoute.patch('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    console.log("Data: ", data);

    const user = await User.findByIdAndUpdate(id, data, { new: true });
    // const User = await User.findOneAndUpdate({_id: id}, data, {new: true});
    // const User = await User.updateOne({_id: id}, data, {new: true});

    res.status(200).json({
        success: true,
        message: "User updated successfully",
        user
    });
});
userRoute.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    // const User = await User.findOneAndDelete({_id: id});
    // const User = await User.deleteOne({_id: id});

    res.status(200).json({
        success: true,
        message: "User deleted successfully",
        user
    });
});