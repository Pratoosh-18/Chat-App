import cors from "cors";
import express from "express";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());

export default app;