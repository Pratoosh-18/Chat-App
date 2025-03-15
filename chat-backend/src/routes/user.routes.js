import { Router } from "express";
import { getAllUsers, getUser, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";

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
userRoutes.route("/getAllUsers").get(
    getAllUsers
)
userRoutes.route("/:id").get(
    getUser
);

export default userRoutes;