import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHnadler.js";

const createChat = asyncHandler(async (req, res) => {
    const { participants, isGroupChat, chatName, groupAdmin } = req.body;

    if (!participants || participants.length < 2) {
        throw new ApiError(400, "At least 2 participants are required");
    }

    if (isGroupChat && (!chatName || !groupAdmin)) {
        throw new ApiError(400, "Group name and admin are required for group chats");
    }

    // Check if all participants exist
    const users = await User.find({ _id: { $in: participants } });
    if (users.length !== participants.length) {
        throw new ApiError(404, "One or more participants not found");
    }

    // Create the chat
    const chat = await Chat.create({
        isGroupChat,
        participants,
        chatName: isGroupChat ? chatName : "",
        groupAdmin: isGroupChat ? groupAdmin : null,
    });

    res.status(201).json(chat);
});

const fetchUserChats = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    // Find all chats where the user is a participant
    const chats = await Chat.find({ participants: { $in: [userId] } })
        .populate("participants", "-password")
        .populate("groupAdmin", "-password")
        .sort({ updatedAt: -1 });

    res.status(200).json(chats);
});

const deleteChat = asyncHandler(async (req, res) => {
    const { chatId } = req.params;

    const chat = await Chat.findByIdAndDelete(chatId);
    if (!chat) {
        throw new ApiError(404, "Chat not found");
    }

    // Delete all messages in the chat
    await Message.deleteMany({ chat: chatId });

    res.status(200).json({ message: "Chat deleted successfully" });
});

// Logic yet to be written with sockets
const fetchMessages = asyncHandler(async (req, res) => {
    const { chatId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const messages = await Message.find({ chat: chatId })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("sender", "-password");

    res.status(200).json(messages);
});

// Logic yet to be written with sockets
const deleteMessage = asyncHandler(async (req, res) => {
    const { messageId } = req.params;

    const message = await Message.findByIdAndDelete(messageId);
    if (!message) {
        throw new ApiError(404, "Message not found");
    }

    res.status(200).json({ message: "Message deleted successfully" });
});

export { createChat, deleteChat, deleteMessage, fetchMessages, fetchUserChats }