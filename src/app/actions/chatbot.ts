'use server';

import fs from 'fs';
import path from 'path';

/**
 * Chatbot Action for Studyond.
 * Uses gemini-2.5-flash for the 2026 stable baseline.
 */
export async function chatAction(messages: { role: string; content: string }[], torData?: any) {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  const model = "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  // Read all topics from mock data to give AI knowledge
  const topicsPath = path.join(process.cwd(), 'mock-data/topics.json');
  const allTopics = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));
  const topicKnowledge = allTopics.map((t: any) => `- ${t.id}: ${t.title} (${t.description.substring(0, 100)}...)`).join('\n');

  // Build a system prompt based on TOR data
  let systemPrompt = `You are the Studyond Thesis Assistant. Your goal is to help students find thesis topics, supervisors, and companies.
    
    GUIDELINES:
    1. BE EXTREMELY CONCISE. Never write more than 2-3 short paragraphs.
    2. ALWAYS use Markdown for formatting (bold, lists, etc.).
    3. Be professional and encouraging.
    4. Use the provided student profile data to personalize your advice.
    5. DETECT INTEREST SHIFTS: If the user indicates they are interested in something else, or if the current topics don't fit, suggest NEW topic IDs from the list below.
    6. Swiss grading system: 6.0 is best, 4.0 is pass.
    
    AVAILABLE TOPICS KNOWLEDGE:
    ${topicKnowledge}
    
    OUTPUT FORMAT:
    You MUST return a JSON object with this exact structure:
    {
      "message": "Your markdown-formatted response text here. If suggesting topics, mention their titles briefly.",
      "recommendedTopicIds": ["topic-id-1", "topic-id-2"] (Pick 2-4 most relevant IDs from the list above based on current interests and transcript)
    }`;

  if (torData) {
    systemPrompt += `\n\nStudent Profile Analysis:
    - Detected Degree: ${torData.degree}
    - Best Category: ${torData.bestCategory}
    - Weakest Category: ${torData.weakestCategory}
    - Recommended Fields: ${torData.recommendedFields.join(", ")}
    - Extracted Skills: ${torData.skills.join(", ")}`;
  }

  // Format messages for Gemini API
  const contents = [
    {
      role: "user",
      parts: [{ text: systemPrompt + "\n\nPlease acknowledge this profile and wait for my first question." }]
    },
    {
      role: "model",
      parts: [{ text: "{\"message\": \"Understood. I have analyzed the student profile and am ready to assist. How can I help today?\", \"recommendedTopicIds\": []}" }]
    },
    ...messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.role === 'assistant' ? JSON.stringify({ message: m.content, recommendedTopicIds: [] }) : m.content }]
    }))
  ];

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        contents,
        generationConfig: {
          responseMimeType: "application/json"
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

    const textResponse = result.candidates[0].content.parts[0].text;
    const data = JSON.parse(textResponse);
    
    return { 
      success: true, 
      content: data.message, 
      recommendedTopicIds: data.recommendedTopicIds || [] 
    };

  } catch (error: any) {
    console.error("Chat Error:", error.message);
    return {
      success: false,
      error: `AI Error: ${error.message}`
    };
  }
}
