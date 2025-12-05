import { GoogleGenAI } from "@google/genai";
import { ProjectDetails } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateReadme = async (details: ProjectDetails): Promise<string> => {
  const model = "gemini-2.5-flash";

  const prompt = `
    Act as a world-class Developer Advocate and Technical Writer.
    Create a professional, comprehensive, and aesthetically pleasing README.md file for a software project based on the following details.

    **Project Details:**
    - Name: ${details.projectName}
    - Tagline: ${details.tagline}
    - Type: ${details.projectType}
    - Description (Raw): ${details.description}
    - Key Features: ${details.features}
    - Technologies Used: ${details.technologies}
    - Demo URL: ${details.demoUrl || "N/A"}
    - Installation Hints: ${details.installationSteps || "Standard installation"}
    - License: ${details.license}
    - Author: ${details.authorName} (${details.githubUsername})

    **Requirements:**
    1. **Bilingual Support**: The README must include sections in both English and Arabic.
       - Start with a centered header, logo (use a placeholder), and badges.
       - Provide a generic "About" section in English, followed by its Arabic translation.
       - List features in both languages (side-by-side or sequential).
    2. **Structure**:
       - Title & Badges (License, Build Status, etc.)
       - Table of Contents
       - Project Overview (English & Arabic)
       - Live Demo link (if provided)
       - Key Features (English & Arabic)
       - Tech Stack (Icons/Badges preferred)
       - Installation & Getting Started
       - Usage
       - Contributing
       - License (Include the full text summary of the ${details.license} license).
    3. **Formatting**:
       - Use Markdown tables for features if it looks cleaner.
       - Use emojis effectively but professionally.
       - Use standard placeholder images for screenshots (e.g., https://picsum.photos/800/400).
    4. **Tone**: Professional, encouraging, and open-source friendly.

    Output ONLY the raw Markdown code.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      }
    });

    return response.text || "# Error generating README";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate README. Please check your API key and try again.");
  }
};
