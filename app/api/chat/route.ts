import { consumeStream, convertToModelMessages, streamText, type UIMessage } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { messages } = body as { messages?: UIMessage[] }

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Missing or invalid `messages` array in request body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const systemPrompt = `You are a helpful learning assistant for a personalized learning path generator app.\nYour role is to:\n- Help users choose the right learning topics and paths\n- Provide guidance on learning strategies and best practices\n- Answer questions about different subjects and skills\n- Recommend resources and study techniques\n- Motivate and encourage learners\n- Suggest career paths and skill combinations\n\nBe friendly, encouraging, and provide actionable advice. Keep responses concise but informative.`

    const prompt = convertToModelMessages([
      { id: "system", role: "system", parts: [{ type: "text", text: systemPrompt }] },
      ...messages,
    ])

    const result = streamText({
      model: "openai/gpt-4o-mini",
      prompt,
      abortSignal: req.signal,
      maxOutputTokens: 1000,
    })

    return result.toUIMessageStreamResponse({
      consumeSseStream: consumeStream,
    })
  } catch (err) {
    // Log server-side error for debugging
    // eslint-disable-next-line no-console
    console.error("/api/chat error:", err)
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
