import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const geminiClient = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function getResponse(userMessage: string) {
  try {
    const response = await geminiClient.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: userMessage,
    });

    return response;
  } catch (err) {
    console.error("Oops! Something went wrong with Gemini:", err);
    throw err;
  }
}