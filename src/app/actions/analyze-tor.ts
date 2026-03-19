'use server';

import fs from 'fs';
import path from 'path';

/**
 * Ultra-compatible Direct Fetch implementation.
 * Uses gemini-2.5-flash - the current 2026 stable baseline model.
 */
export async function analyzeTORAction(fileContent: string, studentId: string = "student-01") {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  // 1. Updated to the current active model
  const model = "gemini-3.1-flash-lite-preview";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const prompt = `
    Analyze this Swiss Transcript of Records (TOR) for Studyond, a platform connecting Students, Companies, and Universities for thesis projects.
    
    Studyond Context:
    - Swiss grades range from 1.0 to 6.0 (6.0 is best, 4.0 is passing).
    - Match performance to these official "recommendedFields": Computer Science, Data Science, Artificial Intelligence, Business Administration, Finance, Marketing, Supply Chain Management, Sustainability, Mechanical Engineering, Electrical Engineering, Biotechnology, Healthcare & Medicine, Economics, Law, Communication & Media, Psychology, Environmental Science, Architecture & Design, Education, Public Policy.
    - Extract skills relevant for research and industry (e.g., Python, Statistical Analysis, CAD, Project Management).
    - Group academic modules into 4-6 high-level "categories" (e.g., Mathematics, Programming, Management).

    Return ONLY a raw JSON object.
    
    JSON Structure:
    {
      "categories": [
        { 
          "id": 1, 
          "category": "Broad category name", 
          "pro": 0-100 (matching strength), 
          "contra": 0-100 (weaknesses), 
          "ects": number (total ECTS), 
          "averageGrade": "string (e.g. 5.2)", 
          "summary": "Short analysis of performance in this area" 
        }
      ],
      "bestCategory": "Name",
      "weakestCategory": "Name",
      "averageFit": 0-100,
      "skills": ["Skill1", "Skill2"],
      "recommendedFields": ["Field Name from the official list above"],
      "degree": "bsc" | "msc" | "phd" (infer from courses),
      "narrativeMemory": "A LONG, detailed narrative description of the student's academic profile. Start with 'The student ${studentId} is interested in...'. Describe their strengths, potential thesis directions based on their grades, and academic personality. This will be the base of their long-term memory."
    }

    TOR CONTENT:
    ${fileContent}
  `;

  try {
    console.log(`Sending request to Gemini API (${model})...`);

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        // 2. Force the AI to return guaranteed JSON without markdown blocks
        generationConfig: {
          responseMimeType: "application/json",
        }
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error?.message || `API Error: ${response.status}`);
    }

    if (!result.candidates || !result.candidates[0]) {
      throw new Error("No response from AI.");
    }

    // Because of responseMimeType, this is guaranteed to be a clean JSON string
    const textResponse = result.candidates[0].content.parts[0].text;
    const data = JSON.parse(textResponse);

    // Persist the narrative memory
    if (data.narrativeMemory) {
        const memoriesDir = path.join(process.cwd(), 'memories');
        const memoryPath = path.join(memoriesDir, `${studentId}.md`);
        
        if (!fs.existsSync(memoriesDir)) {
            fs.mkdirSync(memoriesDir, { recursive: true });
        }
        
        fs.writeFileSync(memoryPath, data.narrativeMemory, 'utf8');
    }

    return { success: true, data };

  } catch (error: any) {
    console.error("Analysis Error:", error.message);
    return {
      success: false,
      error: `AI Error: ${error.message}. Please try again.`
    };
  }
}
