import { Router, type Request, type Response } from "express";
import { type ParsedQs } from "qs";
import { User } from "../models/user.model";
import z from "zod";

type QueryType = {
    email?: string | ParsedQs | (string | ParsedQs)[]
}

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

        //! Built in and Custom instance method
        // const user = new User(data);

        // const password = await user.hashPassword(data.password)
        // user.password = password

        // await user.save()

        //! Build in and Custom static method
        // const password = await User.hashPassword(data.password);
        // console.log("Password: ", password)

        // data.password = password

        const user = await User.create(data)

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
    // Query Filtering
    const {email} = req.query;
    const query: QueryType = {}
    if(email) query.email = email

    // Sorting
    // const users = await User.find(query).sort({'email': 'asc'});
    // const users = await User.find(query).sort({'email': 'ascending'});
    // const users = await User.find(query).sort({'email': 'desc'});
    // const users = await User.find(query).sort({'email': 'descending'});
    // const users = await User.find(query).sort({'email': 1}); // Ascending
    // const users = await User.find(query).sort({'email': -1}); // Descending

    // Skipping
    // const users = await User.find(query).skip(6);

    // Limiting
    const users = await User.find(query).limit(2);

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

    // const user = await User.findByIdAndDelete(id);
    // const User = await User.findOneAndDelete({_id: id});
    // const User = await User.deleteOne({_id: id});

    const user = await User.findOneAndDelete({_id: id})

    res.status(200).json({
        success: true,
        message: "User deleted successfully",
        user
    });
});