import { Router } from "express";
import { loginUser } from "../controllers/user.controller.js";

const userRoutes = Router()

userRoutes.route("/login").get(
    loginUser
)

export default userRoutes;