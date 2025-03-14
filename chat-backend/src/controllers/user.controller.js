import { asyncHandler } from "../utils/asyncHnadler.js";

const registerUser = asyncHandler(async (req, res) => {
    res.json({"Login user":"ok"});
});

const loginUser = asyncHandler(async (req, res) => {
    res.json({"Login user":"ok"});
});

export { loginUser }