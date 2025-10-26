import { Router } from "express";
import { handleChat } from "../controllers/chatController.js";

const router = Router();

// Main chat endpoint - send a message, get a streamed response
router.post("/", handleChat);

export default router;
