'use server';

/**
 * Ultra-compatible Direct Fetch implementation.
 * Uses gemini-2.5-flash - the current 2026 stable baseline model.
 */
export async function analyzeTORAction(fileContent: string) {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  // 1. Updated to the current active model
  const model = "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const prompt = `
    Analyze this Swiss Transcript of Records (TOR). 
    Return ONLY a raw JSON object.
    
    JSON Structure:
    {
      "categories": [
        { "id": 1, "category": "Name", "pro": 80, "contra": 20, "ects": 10, "averageGrade": "5.2", "summary": "Short summary" }
      ],
      "bestCategory": "Name",
      "weakestCategory": "Name",
      "averageFit": 75,
      "skills": ["Skill1", "Skill2"],
      "recommendedFields": ["Field1", "Field2"]
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

    return { success: true, data };

  } catch (error: any) {
    console.error("Analysis Error:", error.message);
    return {
      success: false,
      error: `AI Error: ${error.message}. Please try again.`
    };
  }
}