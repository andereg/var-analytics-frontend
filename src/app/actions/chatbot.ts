'use server';

import fs from 'fs';
import path from 'path';

/**
 * Chatbot Action for Studyond.
 * Uses gemini-2.5-flash for the 2026 stable baseline.
 */
export async function chatAction(messages: { role: string; content: string }[], torData?: any) {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  const model = "gemini-3.1-flash-lite-preview";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  // Read knowledge bases
  const topicsPath = path.join(process.cwd(), 'mock-data/topics.json');
  const supervisorsPath = path.join(process.cwd(), 'mock-data/supervisors.json');
  const companiesPath = path.join(process.cwd(), 'mock-data/companies.json');

  const allTopics = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));
  const allSupervisors = JSON.parse(fs.readFileSync(supervisorsPath, 'utf8'));
  const allCompanies = JSON.parse(fs.readFileSync(companiesPath, 'utf8'));

  const topicKnowledge = allTopics.map((t: any) => `- ${t.id}: ${t.title}`).join('\n');
  const supervisorKnowledge = allSupervisors.map((s: any) => `- ${s.id}: ${s.title} ${s.firstName} ${s.lastName} (Interests: ${s.researchInterests.join(", ")})`).join('\n');
  const companyKnowledge = allCompanies.map((c: any) => `- ${c.id}: ${c.name} (${c.domains.join(", ")})`).join('\n');

  // Build a system prompt based on TOR data
  let systemPrompt = `You are the Studyond Thesis Assistant. Your goal is to help students find thesis topics, supervisors, and companies.

    GUIDELINES:
    1. BE EXTREMELY CONCISE. 2-3 short paragraphs max.
    2. ALWAYS use Markdown.
    3. Use the student profile to personalize advice.
    4. DETECT MATCHING PHASE: 
       - If they need a TOPIC, suggest IDs from TOPICS.
       - If they have a topic but need a COMPANY, suggest IDs from COMPANIES.
       - If they have a topic/company but need a SUPERVISOR, suggest IDs from SUPERVISORS.

    KNOWLEDGE BASE:

    [TOPICS]
    ${topicKnowledge}

    [SUPERVISORS]
    ${supervisorKnowledge}

    [COMPANIES]
    ${companyKnowledge}

    OUTPUT FORMAT:
    You MUST return a JSON object:
    {
      "message": "Your response text. Briefly mention the names of what you are recommending.",
      "recommendedTopicIds": ["id-1", "id-2"] (Use this field for ANY recommendation - topic, company, or supervisor IDs)
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
