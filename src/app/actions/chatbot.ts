'use server';

import fs from 'fs';
import path from 'path';

export async function chatAction(messages: { role: string; content: string }[], torData?: any, studentId: string = "student-01") {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  const model = "gemini-3-flash-preview"; // this works relaiably
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  // 1. Read Knowledge Bases
  const topicsPath = path.join(process.cwd(), 'mock-data/topics.json');
  const supervisorsPath = path.join(process.cwd(), 'mock-data/supervisors.json');
  const companiesPath = path.join(process.cwd(), 'mock-data/companies.json');
  
  const allTopics = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));
  const allSupervisors = JSON.parse(fs.readFileSync(supervisorsPath, 'utf8'));
  const allCompanies = JSON.parse(fs.readFileSync(companiesPath, 'utf8'));

  const topicKnowledge = allTopics.map((t: any) => `- ${t.id}: ${t.title}`).join('\n');
  const supervisorKnowledge = allSupervisors.map((s: any) => `- ${s.id}: ${s.title} ${s.firstName} ${s.lastName} (Interests: ${s.researchInterests.join(", ")})`).join('\n');
  const companyKnowledge = allCompanies.map((c: any) => `- ${c.id}: ${c.name} (${c.domains.join(", ")})`).join('\n');

  // 2. Read Student Memory
  const memoriesDir = path.join(process.cwd(), 'memories');
  const memoryPath = path.join(memoriesDir, `${studentId}.md`);
  let fullFileContent = "";
  if (fs.existsSync(memoryPath)) {
      fullFileContent = fs.readFileSync(memoryPath, 'utf8');
  }

  // Build a system prompt
  let systemPrompt = `You are the Studyond Thesis Assistant. 

    GUIDELINES:
    1. BE EXTREMELY CONCISE.
    2. Use the [FULL STUDENT MEMORY] which includes their raw transcript and academic biography.
    3. DETECT MATCHING PHASE: Topic, Company, or Supervisor.
    4. CONTINUOUS MEMORY: Rewrite the [NARRATIVE PROFILE] section of the student memory.
       - Integrate new findings: "The student ${studentId} is interested in... Recently, they mentioned...".
       - Keep it detailed and narrative.

    KNOWLEDGE BASE:
    [TOPICS]
    ${topicKnowledge}
    [SUPERVISORS]
    ${supervisorKnowledge}
    [COMPANIES]
    ${companyKnowledge}
    
    [FULL STUDENT MEMORY]
    ${fullFileContent || "No existing memory found."}`;

  if (torData) {
    systemPrompt += `\n\n[STUDENT TOR ANALYSIS]
    - Degree: ${torData.degree}
    - Strongest: ${torData.bestCategory}
    - Fields: ${torData.recommendedFields?.join(", ")}`;
  }

  systemPrompt += `\n\nOUTPUT FORMAT:
    JSON object:
    {
      "message": "Response text",
      "recommendedTopicIds": ["id-1", "id-2"],
      "fullUpdatedNarrative": "The complete, revised version of ONLY the 'Narrative Profile' section."
    }`;

  const contents = [
    {
      role: "user",
      parts: [{ text: systemPrompt + "\n\nPlease acknowledge and wait for my question." }]
    },
    {
      role: "model",
      parts: [{ text: "{\"message\": \"Understood. I have access to the full student memory and transcript. How can I help?\", \"recommendedTopicIds\": [], \"fullUpdatedNarrative\": \"\"}" }]
    },
    ...messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.role === 'assistant' ? JSON.stringify({ message: m.content, recommendedTopicIds: [], fullUpdatedNarrative: "" }) : m.content }]
    }))
  ];

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents, generationConfig: { responseMimeType: "application/json" } })
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error?.message || `API Error: ${response.status}`);

    if (!result.candidates || !result.candidates[0]) {
      throw new Error("No candidates returned from AI.");
    }

    const textResponse = result.candidates[0].content.parts[0].text;
    const data = JSON.parse(textResponse);
    
    // 3. Selective Persist
    if (data.fullUpdatedNarrative && data.fullUpdatedNarrative.trim().length > 0 && fullFileContent) {
        // Find everything after the Narrative Profile section
        const anchor = "## Academic Metadata";
        const parts = fullFileContent.split(anchor);
        
        if (parts.length >= 2) {
            const footer = parts.slice(1).join(anchor);
            const updatedContent = `# Student Memory: ${studentId}\n\n## Narrative Profile\n${data.fullUpdatedNarrative.trim()}\n\n## Academic Metadata${footer}`;
            fs.writeFileSync(memoryPath, updatedContent, 'utf8');
        } else {
            // Fallback if structure is broken
             fs.writeFileSync(memoryPath, `# Student Memory: ${studentId}\n\n## Narrative Profile\n${data.fullUpdatedNarrative.trim()}\n\n${fullFileContent}`, 'utf8');
        }
    }
    
    return { success: true, content: data.message, recommendedTopicIds: data.recommendedTopicIds || [] };

  } catch (error: any) {
    console.error("Chat Error:", error.message);
    return { success: false, error: `AI Error: ${error.message}` };
  }
}
