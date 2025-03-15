import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHnadler.js";

async function uploading(file, folder) {
    const options = {
        folder,
    };
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

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
    res.json({"Login user":"ok"});
});

export { registerUser,loginUser }