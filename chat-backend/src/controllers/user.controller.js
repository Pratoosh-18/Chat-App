import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHnadler.js";
import { v2 as cloudinary } from 'cloudinary';
import jwt from "jsonwebtoken"

async function uploading(file, folder) {
    const options = {
        folder,
    };
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

const generateAccessToken = (userId) => {
    return jwt.sign({ _id: userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
    });
};

const registerUser = asyncHandler(async (req, res) => {
    console.log("Register called");
    const { username, email, password } = req.body;
    const avatar = req.files?.avatar;

    if (!username || !email || !password || !avatar) {
        throw new ApiError(401, "All the fields are required");
    }

    let avatarUploaded;
    try {
        avatarUploaded = await uploading(avatar, 'Users');
        console.log("Image uploaded successfully:", avatarUploaded);
    } catch (error) {
        console.error("Error uploading image:", error);
        throw new ApiError(500, 'Failed to upload image');
    }

    let user;
    try {
        user = await User.create({
            username,
            email,
            password,
            avatar: avatarUploaded.secure_url
        });
        console.log("User created......");
    } catch (error) {
        console.error("An error occurred while creating the user:", error);
        if (error.code === 11000) {
            throw new ApiError(410, 'User already registered');
        } else {
            throw new ApiError(500, 'Internal server error');
        }
    }

    const createdUser = await User.findById(user._id);
    return res.status(200).json({ createdUser });
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) throw new ApiError(401, "Invalid email");
    if (!user.password==password) throw new ApiError(401, "Invalid password");

    const accessToken = generateAccessToken(user._id);

    res.status(200).json({user: await User.findById(user._id).select("-password"),token: accessToken});
});

const logoutUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Logged out successfully" });
});

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password");
    res.status(200).json({ users });
});

export { registerUser, loginUser, logoutUser, getAllUsers }