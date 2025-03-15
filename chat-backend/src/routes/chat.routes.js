import { Router } from "express";
import { createChat, deleteChat, deleteMessage, fetchMessages, fetchUserChats } from "../controllers/chats.controller.js";

const chatRoutes = Router()

chatRoutes.post("/", createChat);
chatRoutes.get("/:userId", fetchUserChats);
chatRoutes.delete("/:chatId", deleteChat);

chatRoutes.get("/messages/:chatId", fetchMessages);
chatRoutes.delete("/messages/:messageId", deleteMessage);

export default chatRoutes;