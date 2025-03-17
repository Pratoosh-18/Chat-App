import { Router } from "express";
import { createChat, deleteChat, deleteMessage, fetchMessages, fetchUserChats } from "../controllers/chats.controller.js";

const chatRoutes = Router()

chatRoutes.post("/create", createChat);
chatRoutes.get("/chats/:userId", fetchUserChats);
chatRoutes.delete("/delete/:chatId", deleteChat);

chatRoutes.get("/messages/:chatId", fetchMessages);
chatRoutes.delete("/messages/:messageId", deleteMessage);

export default chatRoutes;