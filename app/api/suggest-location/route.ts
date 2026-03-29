import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(req: Request) {
  try {
    const { country, countryCode, query } = await req.json()

    if (!query || query.length < 1) {
      return Response.json({ suggestions: [] })
    }

    // High Priority: Use Google Maps Places API if key is present
    const mapsKey = process.env.GOOGLE_MAPS_API_KEY
    if (mapsKey) {
      const countryParam = countryCode ? `&components=country:${countryCode.toUpperCase()}` : ""
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&types=(cities)${countryParam}&key=${mapsKey}`
      
      const res = await fetch(url)
      const data = await res.json()
      
      if (data.status === "OK" && data.predictions) {
        const suggestions = data.predictions.map((p: any) => p.description)
        return Response.json({ suggestions })
      }
    }

    // Fallback Priority: Use Gemini if key is present (original logic)
    if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY)
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" }
      })

      const prompt = `
        List 5 major cities or states in "${country}" that match the prefix "${query}".
        Return ONLY a JSON array of strings.
      `

      const result = await model.generateContent(prompt)
      const text = result.response.text()
      const jsonStr = text.replace(/```json|```/g, "").trim()
      const suggestions = JSON.parse(jsonStr)

      return Response.json({ suggestions: Array.isArray(suggestions) ? suggestions : [] })
    }

    // Final Fallback: Static cities list
    const standardCities: Record<string, string[]> = {
      "India": ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Pune", "Chennai"],
      "United States": ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "San Francisco"],
      "United Kingdom": ["London", "Birmingham", "Manchester", "Glasgow", "Liverpool"],
    }
    const cities = standardCities[country] || []
    const filtered = cities.filter(c => c.toLowerCase().startsWith(query.toLowerCase()))
    
    return Response.json({ suggestions: filtered })
  } catch (error) {
    console.error("Location suggestion error:", error)
    return Response.json({ suggestions: [] })
  }
}
