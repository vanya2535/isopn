import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import authRouter from './routers/authRouter.js';

config();

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
    exposedHeaders: '*',
};

const app = express();

const PORT = process.env.PORT || 3000;
const DB_URL =
  `mongodb+srv://vanya2535:${process.env.DB_PASSWORD}@cluster0.mcapsor.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

app.use(express.json());
app.use(cors(corsOptions));

app.use('/auth', authRouter);

async function start() {
    try {
        await mongoose.connect(DB_URL);

        app.listen(PORT, () => {
            console.log(`Server listen on http://localhost:${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start();
