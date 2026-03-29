"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Sparkles } from "lucide-react"
import { AssetAnalysisForm } from "@/components/asset-analysis-form"
import { AnalysisResults, type AnalysisResult } from "@/components/analysis-results"
import { Button } from "@/components/ui/button"

export default function AnalyzePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async (data: {
    assetType: string
    assetName: string
    price: number
    location: string
    loanTerm: number
    country: string
    currency: string
  }) => {
    setIsLoading(true)
    setError(null)
    setResults(null)

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Analysis failed. Please try again.")
      }

      const result = await response.json()
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setResults(null)
    setError(null)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-linear-to-tr from-primary to-accent flex items-center justify-center p-0.5 shadow-lg shadow-primary/20">
              <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                <span className="text-foreground font-black text-[10px]">C2O</span>
              </div>
            </div>
            <span className="font-bold text-lg tracking-tight text-foreground">Cost2own</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Side - Form */}
          <div>
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-4">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm text-foreground/80">AI-Powered Analysis</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Analyze Your Asset
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                Enter the details of the asset you want to purchase and get instant AI-powered insights on affordability, 
                recommended income, down payments, and more.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <AssetAnalysisForm onAnalyze={handleAnalyze} isLoading={isLoading} />
            </div>
          </div>

          {/* Right Side - Results */}
          <div>
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 text-center">
                <p className="text-destructive font-medium">{error}</p>
                <Button variant="outline" size="sm" className="mt-4" onClick={handleReset}>
                  Try Again
                </Button>
              </div>
            )}

            {!results && !error && !isLoading && (
              <div className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center h-full flex flex-col items-center justify-center min-h-[500px]">
                <div className="w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center mb-6">
                  <Sparkles className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Your Analysis Will Appear Here
                </h3>
                <p className="text-muted-foreground max-w-sm">
                  Fill out the form on the left to get a comprehensive AI-powered affordability analysis for your asset.
                </p>
              </div>
            )}

            {isLoading && (
              <div className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center h-full flex flex-col items-center justify-center min-h-[500px]">
                <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 animate-pulse">
                  <Sparkles className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Analyzing with AI...
                </h3>
                <p className="text-muted-foreground max-w-sm">
                  Our AI is calculating income requirements, interest rates, maintenance costs, and generating personalized recommendations.
                </p>
              </div>
            )}

            {results && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">
                    Analysis Results
                  </h2>
                  <Button variant="outline" size="sm" onClick={handleReset}>
                    New Analysis
                  </Button>
                </div>
                <AnalysisResults results={results} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
