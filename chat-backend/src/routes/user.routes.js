import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";

const userRoutes = Router()

userRoutes.route("/register").post(
    registerUser
)
userRoutes.route("/login").post(
    loginUser
)
userRoutes.route("/logout").post(
    logoutUser
)

export default userRoutes;