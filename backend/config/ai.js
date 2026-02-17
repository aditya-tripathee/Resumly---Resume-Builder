import OpenAI from "openai";

const ai = new OpenAI({
    apiKey: process.env.GOOGLE_GEMINI_KEY,
    baseURL: process.env.GOOGLE_GEMINI_AI_URL,
});

export default ai;


