import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are an expert career strategist who helps job seekers stand out by building proactive projects before interviews.

Your task is to analyze a job posting and provide actionable insights that will help the candidate demonstrate initiative and land the role.

Respond in the following JSON format ONLY (no markdown, no code blocks, just pure JSON):
{
  "companyInsights": {
    "name": "Company name if identifiable",
    "industry": "Industry/sector",
    "stage": "Startup/Growth/Enterprise",
    "techStack": ["Identified technologies"]
  },
  "gapAnalysis": {
    "identifiedGap": "A specific gap or need you identified that the company likely has but didn't explicitly state",
    "evidence": "What in the job posting suggests this gap exists",
    "opportunity": "Why filling this gap would make the candidate stand out"
  },
  "projectIdeas": [
    {
      "title": "Project name",
      "description": "2-3 sentence description of what to build",
      "whyItWorks": "How this addresses the gap and demonstrates relevant skills",
      "complexity": "Weekend Project / 1-2 Weeks / 1 Month",
      "techStack": ["Recommended technologies based on job requirements"]
    }
  ],
  "talkingPoints": [
    "Specific talking point for the interview that references the project"
  ],
  "interviewStrategy": "1-2 sentences on how to present this project in the interview"
}

Focus on:
1. Reading between the lines - what problems does this company REALLY need solved?
2. Suggesting projects that are impressive but achievable in 1-2 weeks
3. Projects that directly demonstrate the skills mentioned in the job posting
4. Unique angles that other candidates won't think of`;

export async function POST(request: NextRequest) {
  try {
    const { jobPosting } = await request.json();

    if (!jobPosting || typeof jobPosting !== 'string') {
      return NextResponse.json(
        { error: 'Job posting text is required' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `${SYSTEM_PROMPT}

Here is the job posting to analyze:

${jobPosting}

Respond with ONLY the JSON object, no additional text or formatting.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    const text = response.text || '';

    // Parse the JSON response
    let analysis;
    try {
      // Remove any potential markdown code blocks
      const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
      analysis = JSON.parse(cleanedText);
    } catch {
      // If parsing fails, return the raw text for debugging
      return NextResponse.json(
        { error: 'Failed to parse AI response', raw: text },
        { status: 500 }
      );
    }

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Gemini API error:', error);

    // Check for rate limit / quota errors
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('429') || errorMessage.includes('quota') || errorMessage.includes('RESOURCE_EXHAUSTED')) {
      return NextResponse.json(
        { error: 'API rate limit reached. Please try again in a few minutes.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to analyze job posting. Please try again.' },
      { status: 500 }
    );
  }
}
