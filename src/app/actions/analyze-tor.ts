'use server';

import fs from 'fs';
import path from 'path';

/**
 * Ultra-compatible Direct Fetch implementation.
 * Uses gemini-3.1-flash-lite-preview for the 2026 stable baseline.
 */
export async function analyzeTORAction(fileContent: string, studentId: string = "student-01") {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  const model = "gemini-3.1-flash-lite-preview";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const prompt = `
    Analyze this Swiss Transcript of Records (TOR) for Studyond.
    
    Studyond Context:
    - Swiss grades range from 1.0 to 6.0 (6.0 is best, 4.0 is passing).
    - Match performance to official categories.
    - Extract skills and recommended fields.

    Return ONLY a raw JSON object.
    
    JSON Structure:
    {
      "categories": [...],
      "bestCategory": "Name",
      "weakestCategory": "Name",
      "averageFit": 0-100,
      "skills": ["Skill1", "Skill2"],
      "recommendedFields": ["Field Name"],
      "degree": "bsc" | "msc" | "phd",
      "narrativeMemory": "A LONG, detailed narrative description starting with 'The student ${studentId} is interested in...'. Describe their academic personality and potential."
    }

    TOR CONTENT:
    ${fileContent}
  `;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error?.message || `API Error: ${response.status}`);

    const data = JSON.parse(result.candidates[0].content.parts[0].text);

    // Persist structured memory
    const memoriesDir = path.join(process.cwd(), 'memories');
    const memoryPath = path.join(memoriesDir, `${studentId}.md`);
    
    if (!fs.existsSync(memoriesDir)) fs.mkdirSync(memoriesDir, { recursive: true });

    const structuredContent = `# Student Memory: ${studentId}

## Narrative Profile
${data.narrativeMemory}

## Academic Metadata
- **Degree:** ${data.degree.toUpperCase()}
- **Best Category:** ${data.bestCategory}
- **Weakest Category:** ${data.weakestCategory}
- **Average Fit:** ${data.averageFit}%
- **Skills:** ${data.skills.join(", ")}
- **Recommended Fields:** ${data.recommendedFields.join(", ")}

## Raw Transcript (1-to-1 Copy)
\`\`\`text
${fileContent}
\`\`\`
`;

    fs.writeFileSync(memoryPath, structuredContent, 'utf8');

    return { success: true, data };

  } catch (error: any) {
    console.error("Analysis Error:", error.message);
    return { success: false, error: `AI Error: ${error.message}` };
  }
}
