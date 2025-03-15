import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    username : {
        type:String,
        required:true,
        trim:true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    avatar: {
        type: String,
    },
    refreshToken: {
        type: String
    }
},{timestamps : true}) 

export const User = mongoose.model("User", UserSchema) 