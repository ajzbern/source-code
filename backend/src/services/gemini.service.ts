import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Get API key from environment variables
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables");
}

// Initialize the Google GenAI client
const genAIClient = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

// Model configuration
const MODEL_NAME = "gemini-2.5-flash-lite";

/**
 * Generates content using the Gemini API with a single request
 * @param prompt - The prompt to generate content from
 * @returns The generated text response
 */
export async function generateContent(prompt: string): Promise<string> {
  try {
    const response = await genAIClient.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    return response.text || "";
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}
