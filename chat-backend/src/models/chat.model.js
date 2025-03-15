import mongoose, { Schema } from "mongoose";

const ChatSchema = new Schema({
    isGroupChat: {
        type: Boolean,
        default: false
    },
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    chatName: {
        type: String,
        trim: true,
        default: ""
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
}, { timestamps: true })


export const Chat = mongoose.model("Chat", ChatSchema) 