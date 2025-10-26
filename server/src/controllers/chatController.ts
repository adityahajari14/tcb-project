import { Request, Response } from "express";
import { getResponse } from "../services/gemini.js";

export async function handleChat(req: Request, res: Response) {
  try {
    const { message: userMessage } = req.body;

    if (!userMessage || typeof userMessage !== "string") {
      res.status(400).json({ error: "Hey! Please send me a message to chat" });
      return;
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const aiResponse = await getResponse(userMessage);

    for await (const textChunk of aiResponse) {
      res.write(`data: ${JSON.stringify({ text: textChunk.text })}\n\n`);
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err) {
    console.error("Uh oh, chat failed:", err);
    
    if (!res.headersSent) {
      res.status(500).json({ 
        error: "Sorry, couldn't get a response right now",
        details: err instanceof Error ? err.message : "Something went wrong"
      });
    } else {
      res.write(`data: ${JSON.stringify({ error: "Connection lost" })}\n\n`);
      res.end();
    }
  }
}
