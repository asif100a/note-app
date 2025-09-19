import {Server} from "http";
import app from "./app";
import "colors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

let server: Server;

const port = 5000;
const uri = process.env.MONGODB_URI;

async function main() {
    try {
        await mongoose.connect(uri || "");
        server = app.listen(port, () => {
            console.log(`App is listening on http://localhost:${port}`.green.bold);
        })
    } catch (error) {
        console.error("❌ Failed to start server: ".red.bold, error);
    }
}

main();