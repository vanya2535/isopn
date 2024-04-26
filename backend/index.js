import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import config from './config.js';
import { jsonInterceptor } from './utils/jsonInterceptor.js';

import authRouter from './routers/authRouter.js';

const corsOptions = {
    origin: config.FRONTEND_URL,
    credentials: true,
    optionSuccessStatus: 200,
    exposedHeaders: '*',
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(jsonInterceptor);

app.use('/auth', authRouter);

const DB_URL =
  `mongodb+srv://vanya2535:${config.DB_PASSWORD}@cluster0.mcapsor.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

async function start() {
    try {
        await mongoose.connect(DB_URL);

        app.listen(config.BACKEND_PORT, () => {
            console.log(`Server listen on http://localhost:${config.BACKEND_PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start();
