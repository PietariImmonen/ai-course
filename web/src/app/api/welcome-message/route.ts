import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { generateWelcomeMessagePrompt } from "@/src/lib/prompts";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { firstName, jobRole, hobbies, aiKnowledge } = await request.json();

    const prompt = generateWelcomeMessagePrompt({
      firstName,
      jobRole,
      hobbies,
      aiKnowledge,
    });

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4o-mini",
      temperature: 0.7,
      max_tokens: 1000,
    });

    const welcomeMessage = completion.choices[0].message.content;

    return NextResponse.json({ message: welcomeMessage });
  } catch (error) {
    console.error("Error generating welcome message:", error);
    return NextResponse.json(
      { error: "Failed to generate welcome message" },
      { status: 500 },
    );
  }
}
