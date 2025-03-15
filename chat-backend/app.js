import cors from "cors";
import express from "express";
import dotenv from 'dotenv';
import fileUpload from "express-fileupload";
import userRoutes from "./src/routes/user.routes.js";
import cloudinaryConfig from "./src/config/cloudinary.js";

dotenv.config();

const app = express();

const APP_VERSION = process.env.APP_VERSION

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

cloudinaryConfig();

app.use(`/api/v${APP_VERSION}/user`, userRoutes);

export default app;