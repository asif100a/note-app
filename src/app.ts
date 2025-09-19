import express, { type Application, type Request, type Response } from "express";
import { noteRoute } from "./app/controllers/note.controller";
import { userRoute } from "./app/controllers/user.controller";
import mongoose from "mongoose";

const app: Application = express();

// Middlewares
app.use(express.json());
app.use('/note', noteRoute);
app.use('/user', userRoute);

app.get('/', (req: Request, res: Response) => {
    res.send("Yap❗ The server is running.....");
});

export default app;