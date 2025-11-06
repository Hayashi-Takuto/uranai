import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  console.warn("OPENAI_API_KEY が設定されていません。");
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
