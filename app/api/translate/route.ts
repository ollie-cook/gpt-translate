import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const phrase = searchParams.get('phrase')
  const context = searchParams.get('context')
  let from: string | null | undefined = searchParams.get('from')
  let to = searchParams.get('to')

  from = (from?.charAt(0).toUpperCase() || "") + (from?.slice(1).toLowerCase() || "")
  to = (to?.charAt(0).toUpperCase() || "") + (to?.slice(1).toLowerCase() || "")


  const prompt = "Translate the following phrase from " + from + " to " + to + " : \"" + phrase + "\". Use the following as context: \"" + context + "\""

  console.log(prompt)

  
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompt }],
    model: "gpt-3.5-turbo",
  });
  

  const message = completion.choices[0].message.content;
  

  //const message = "dev mode"

  return Response.json({ message })
}