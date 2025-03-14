import cors from "cors";
import express from "express";
import dotenv from 'dotenv';
import userRoutes from "./src/routes/user.routes.js";

dotenv.config();

const app = express();

const APP_VERSION = process.env.APP_VERSION

app.use(cors());

app.use(`/api/v${APP_VERSION}/user`, userRoutes);

export default app;