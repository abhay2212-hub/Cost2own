import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(req: Request) {
  try {
    const { country, query } = await req.json()

    if (!country || !query || query.length < 2) {
      return Response.json({ suggestions: [] })
    }

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      // Basic fallback if no API key
      const standardCities: Record<string, string[]> = {
        "India": ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Pune", "Chennai"],
        "United States": ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "San Francisco"],
        "United Kingdom": ["London", "Birmingham", "Manchester", "Glasgow", "Liverpool"],
      }
      const cities = standardCities[country] || []
      const filtered = cities.filter(c => c.toLowerCase().startsWith(query.toLowerCase()))
      return Response.json({ suggestions: filtered })
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `
      List 5 major cities or states in "${country}" that start with or match "${query}".
      Return ONLY a JSON array of strings.
      Example: ["Mumbai", "Munnar", "Mussoorie"]
    `

    const result = await model.generateContent(prompt)
    const text = result.response.text()
    const suggestions = JSON.parse(text.replace(/```json|```/g, "").trim())

    return Response.json({ suggestions })
  } catch (error) {
    console.error("Location suggestion error:", error)
    return Response.json({ suggestions: [] })
  }
}
