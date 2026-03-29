import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { assetType, assetName, price, location, loanTerm, country, currency = "USD" } = body

    if (!assetType || !price) {
      return Response.json({ error: "Asset type and price are required" }, { status: 400 })
    }

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      // Fallback to basic calculation if no API key
      const monthlyRate = 0.07 / 12 // 7% annual estimate
      const numPayments = loanTerm * 12
      const principalAmount = price * 0.8 // 20% down payment
      const monthlyPayment = (principalAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
      
      return Response.json({
        assetName: assetName || `${assetType} Purchase`,
        assetType,
        price,
        currency,
        summary: `Analysis for ${assetName} in ${country}. (Note: Gemini API key not found, using baseline estimates).`,
        monthlyIncomeRequired: Math.round(monthlyPayment / 0.28),
        recommendedDownPayment: Math.round(price * 0.2),
        downPaymentPercent: 20,
        estimatedInterestRate: 7,
        monthlyPayment: Math.round(monthlyPayment),
        totalInterest: Math.round((monthlyPayment * numPayments) - principalAmount),
        totalCost: Math.round(price * 1.4),
        annualMaintenance: Math.round(price * 0.02),
        taxesAndInsurance: Math.round(price * 0.015),
        affordabilityScore: 75,
        recommendations: ["Consider local financing options", "Check regional tax incentives"],
        warnings: ["Baseline estimates shown - connect Gemini API for precision analysis"],
        breakdown: {
          principal: Math.round(principalAmount),
          interest: Math.round((monthlyPayment * numPayments) - principalAmount),
          taxes: Math.round(price * 0.1),
          insurance: Math.round(price * 0.05),
          maintenance: Math.round(price * 0.08),
        },
      })
    }

    // Initialize Gemini only when the key is available
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    })

    const prompt = `
      You are a specialized financial analysis AI for "Cost2own". 
      Analyze the following asset purchase in detail for the specific country and local market:
      - Asset Type: ${assetType}
      - Asset Name: ${assetName}
      - Price: ${price} ${currency}
      - Country: ${country}
      - City/Location: ${location}
      - Loan Term: ${loanTerm} years

      Consider local interest rates, property/luxury taxes, insurance premiums, and maintenance costs specific to ${country} and ${location}.
      If ${currency} is not USD, perform all calculations in ${currency}.

      Return ONLY a JSON object with this exact structure:
      {
        "assetName": "Asset Name",
        "assetType": "${assetType}",
        "price": ${price},
        "summary": "A 2-3 sentence financial summary including if it's a good time to buy in ${location}",
        "monthlyIncomeRequired": number (monthly gross income needed for 'good' affordability),
        "recommendedDownPayment": number (based on local standards),
        "downPaymentPercent": number,
        "estimatedInterestRate": number (annual percentage),
        "monthlyPayment": number (Principal + Interest only),
        "totalInterest": number (over the life of the loan),
        "totalCost": number (Price + Interest + Taxes + Insurance + Maintenance over ${loanTerm} years),
        "annualMaintenance": number (per year),
        "taxesAndInsurance": number (per year combined),
        "affordabilityScore": number (0-100),
        "recommendations": ["string", "string", "string"],
        "warnings": ["string", "string"],
        "breakdown": {
          "principal": number,
          "interest": number,
          "taxes": number (total over ${loanTerm} years),
          "insurance": number (total over ${loanTerm} years),
          "maintenance": number (total over ${loanTerm} years)
        }
      }
    `

    const result = await model.generateContent(prompt)
    const responseText = result.response.text()
    const analysisData = JSON.parse(responseText.replace(/```json|```/g, "").trim())

    return Response.json({
      ...analysisData,
      currency, // Include the currency code for formatting
    })
  } catch (error) {
    console.error("ANALYSIS_API_ERROR:", error)
    return Response.json(
      { error: "Failed to analyze asset. Please ensure all fields are filled correctly." },
      { status: 500 }
    )
  }
}
