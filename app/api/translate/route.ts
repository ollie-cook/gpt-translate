import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const phrase = searchParams.get('phrase')
  const context = searchParams.get('context')

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "Translate the following sentence in to French: " + phrase + ". Use the following as context: " + context }],
    model: "gpt-3.5-turbo",
  });

  const message = completion.choices[0].message.content;

  return Response.json({ message })
}