import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only for development
});

export interface AnalysisResult {
  mainInsight: string;
  confidence: number;
  tone: string;
  perception: string;
  evidence: string[];
  betterVersion: string;
  riskScore: number;
  predictedOutcome: {
    responseChance: number;
    responseTime: string;
    emotionalImpact: string;
    relationshipImpact: number;
  };
}

export const analyzeMessage = async (message: string): Promise<AnalysisResult> => {
  const prompt = `You are Mirror, an AI communication coach. Analyze this message and provide insights.

MESSAGE:
"${message}"

Provide your analysis in this exact JSON format:
{
  "mainInsight": "One sentence summary of main issue (e.g., 'This message sounds defensive')",
  "confidence": 85,
  "tone": "defensive/aggressive/friendly/neutral/passive-aggressive",
  "perception": "How the recipient will likely perceive this (2-3 sentences)",
  "evidence": ["Specific phrase 1 that causes the issue", "Specific phrase 2", "Specific phrase 3"],
  "betterVersion": "Rewritten version of the message that fixes the issues",
  "riskScore": 67,
  "predictedOutcome": {
    "responseChance": 45,
    "responseTime": "4+ hours (vs typical 20 min)",
    "emotionalImpact": "Likely to feel dismissed and defensive",
    "relationshipImpact": -12
  }
}

IMPORTANT:
- Be brutally honest but constructive
- Confidence is 0-100 (how sure you are)
- Risk score is 0-100 (0=safe, 100=disaster)
- Response chance is 0-100 (% they'll respond positively)
- Relationship impact is -50 to +50 (points)
- Evidence should be SPECIFIC phrases from the message
- Better version should sound natural, not robotic`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are Mirror, a brutally honest but caring communication coach. Always respond with valid JSON only.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error('No response from OpenAI');

    const result = JSON.parse(content);
    return result;
  } catch (error) {
    console.error('OpenAI Error:', error);
    throw new Error('Failed to analyze message. Please try again.');
  }
};

export const chatWithMirror = async (messages: { role: string; content: string }[]) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `You are Mirror, a communication coach. You're honest, direct, but caring. 
          You help people understand how they're perceived and improve their communication.
          Use a conversational tone. Be specific with examples. Challenge users when needed.
          Keep responses concise (2-3 paragraphs max).`
        },
        ...messages as any
      ],
      temperature: 0.8,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Chat Error:', error);
    throw new Error('Failed to chat with Mirror');
  }
};