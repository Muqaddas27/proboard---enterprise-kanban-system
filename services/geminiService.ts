
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSmartDescription = async (cardTitle: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a professional project manager. Provide a concise, bulleted description of tasks and goals for a project management card titled: "${cardTitle}". Keep it professional and focused on action items.`,
    });
    return response.text || 'No description generated.';
  } catch (error) {
    console.error('Gemini Error:', error);
    return 'Failed to generate AI description. Please try again.';
  }
};
