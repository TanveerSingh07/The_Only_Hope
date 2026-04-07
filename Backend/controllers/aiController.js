import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeCareer = async (req, res) => {
  try {
    const { task_metrics, user_preferences } = req.body;
    
    // STRICT CONFIGURATION: Prevents hallucinations
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.1, // Zero creativity, strict logic
        responseMimeType: "application/json" // Forces JSON output
      }
    });
    
    const prompt = `
    Act as an O*NET career mapping AI. Analyze this user telemetry from interactive cognitive tasks:
    Metrics: ${JSON.stringify(task_metrics)}
    Preferences: ${JSON.stringify(user_preferences)}
    
    Rules:
    1. Fast completion times + high accuracy = High "Analytical" and "Realistic" traits.
    2. High hesitation + correct answers = High "Investigative" but cautious traits.
    
    Calculate Analytical, Creativity, and Speed scores (out of 100).
    Suggest the 3 best-fit careers based on the RIASEC framework. 
    
    Return EXACTLY this JSON structure:
    {
      "scores": { "analytical": 85, "creativity": 70, "speed": 90 },
      "careers": [
        {
          "title": "Data Engineer",
          "confidence": 95,
          "tags": [["High Demand", "#10B981", "rgba(16,185,129,0.13)"]],
          "desc": "Matches your high analytical speed.",
          "milestones": [
            { "n": 1, "title": "Learn SQL", "body": "Master databases.", "time": "4 weeks", "ref": "Course" }
          ]
        }
      ]
    }
    `;

    const result = await model.generateContent(prompt);
    res.status(200).json(JSON.parse(result.response.text()));

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ message: "AI Engine failed to process." });
  }
};