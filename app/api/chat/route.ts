import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: openai("gpt-4-turbo"),
    system: `You are a helpful college application assistant. You help students with:
    - Application requirements and deadlines
    - Essay writing tips and feedback
    - Document preparation guidance
    - Scholarship information
    - University selection advice
    - Application status inquiries
    
    Be encouraging, informative, and provide specific actionable advice. Keep responses concise but helpful.`,
    messages,
  })

  return result.toDataStreamResponse()
}
