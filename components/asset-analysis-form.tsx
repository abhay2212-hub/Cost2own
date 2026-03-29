"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Car, Home, Building2, Landmark, ArrowRight } from "lucide-react"

interface AssetAnalysisFormProps {
  onAnalyze: (data: {
    assetType: string
    assetName: string
    price: number
    location: string
    loanTerm: number
    country: string
    currency: string
  }) => void
  isLoading: boolean
}

const assetTypes = [
  { value: "car", label: "Car / Vehicle", icon: Car },
  { value: "house", label: "House", icon: Home },
  { value: "apartment", label: "Apartment / Flat", icon: Building2 },
  { value: "property", label: "Commercial Property", icon: Landmark },
]

const loanTerms = [
  { value: "3", label: "3 Years" },
  { value: "5", label: "5 Years" },
  { value: "7", label: "7 Years" },
  { value: "10", label: "10 Years" },
  { value: "15", label: "15 Years" },
  { value: "20", label: "20 Years" },
  { value: "30", label: "30 Years" },
]

const countries = [
  { value: "us", label: "United States", currency: "USD", symbol: "$" },
  { value: "in", label: "India", currency: "INR", symbol: "₹" },
  { value: "uk", label: "United Kingdom", currency: "GBP", symbol: "£" },
  { value: "eu", label: "European Union", currency: "EUR", symbol: "€" },
  { value: "ca", label: "Canada", currency: "CAD", symbol: "$" },
  { value: "au", label: "Australia", currency: "AUD", symbol: "$" },
  { value: "ae", label: "United Arab Emirates", currency: "AED", symbol: "د.إ" },
  { value: "sg", label: "Singapore", currency: "SGD", symbol: "S$" },
]

export function AssetAnalysisForm({ onAnalyze, isLoading }: AssetAnalysisFormProps) {
  const [assetType, setAssetType] = useState("")
  const [assetName, setAssetName] = useState("")
  const [price, setPrice] = useState("")
  const [location, setLocation] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loanTerm, setLoanTerm] = useState("15")
  const [selectedCountry, setSelectedCountry] = useState(countries[0])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!assetType || !price) return
    
    onAnalyze({
      assetType,
      assetName: assetName || `${assetType} purchase`,
      price: parseFloat(price.replace(/,/g, "")),
      location: location || "United States",
      loanTerm: parseInt(loanTerm),
      country: selectedCountry.label,
      currency: selectedCountry.currency,
    })
  }

  const formatPrice = (value: string) => {
    const number = value.replace(/[^0-9]/g, "")
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Asset Type Selection */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-foreground">Asset Type</Label>
        <div className="grid grid-cols-2 gap-3">
          {assetTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => setAssetType(type.value)}
              className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${
                assetType === type.value
                  ? "border-accent bg-accent/10 ring-1 ring-accent"
                  : "border-border bg-card hover:border-accent/30"
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                assetType === type.value ? "bg-accent text-accent-foreground" : "bg-secondary"
              }`}>
                <type.icon className="w-5 h-5" />
              </div>
              <span className="font-medium text-foreground text-sm">{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Country */}
        <div className="space-y-2">
          <Label htmlFor="country" className="text-sm font-medium text-foreground">
            Country
          </Label>
          <Select 
            value={selectedCountry.value} 
            onValueChange={(val) => {
              const country = countries.find(c => c.value === val)
              if (country) setSelectedCountry(country)
            }}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div className="space-y-2 relative">
          <Label htmlFor="location" className="text-sm font-medium text-foreground">
            City / State (Optional)
          </Label>
          <Input
            id="location"
            placeholder={selectedCountry.label === "India" ? "e.g., Mumbai, Delhi" : "e.g., New York, London"}
            value={location}
            onChange={async (e) => {
              const val = e.target.value
              setLocation(val)
              if (val.length >= 2) {
                try {
                  const res = await fetch("/api/suggest-location", {
                    method: "POST",
                    body: JSON.stringify({ country: selectedCountry.label, query: val }),
                  })
                  const data = await res.json()
                  setSuggestions(data.suggestions || [])
                  setShowSuggestions(true)
                } catch (err) {
                  console.error("Suggestion error:", err)
                }
              } else {
                setSuggestions([])
                setShowSuggestions(false)
              }
            }}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="h-12"
            autoComplete="off"
          />

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-card border border-border rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setLocation(suggestion)
                    setShowSuggestions(false)
                  }}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-accent/10 hover:text-accent transition-colors border-b border-border/50 last:border-0"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Asset Name */}
      <div className="space-y-2">
        <Label htmlFor="assetName" className="text-sm font-medium text-foreground">
          Asset Name / Description (Optional)
        </Label>
        <Input
          id="assetName"
          placeholder="e.g., Tesla Model 3, 3BHK Apartment"
          value={assetName}
          onChange={(e) => setAssetName(e.target.value)}
          className="h-12"
        />
      </div>

      {/* Price */}
      <div className="space-y-2">
        <Label htmlFor="price" className="text-sm font-medium text-foreground">
          Asset Price ({selectedCountry.currency})
        </Label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
            {selectedCountry.symbol}
          </span>
          <Input
            id="price"
            placeholder="450,000"
            value={price}
            onChange={(e) => setPrice(formatPrice(e.target.value))}
            className="h-12 pl-10"
            required
          />
        </div>
      </div>

      {/* Loan Term */}
      <div className="space-y-2">
        <Label htmlFor="loanTerm" className="text-sm font-medium text-foreground">
          Preferred Loan Term
        </Label>
        <Select value={loanTerm} onValueChange={setLoanTerm}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Select loan term" />
          </SelectTrigger>
          <SelectContent>
            {loanTerms.map((term) => (
              <SelectItem key={term.value} value={term.value}>
                {term.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full h-14 text-base gap-2"
        disabled={!assetType || !price || isLoading}
      >
        {isLoading ? (
          <>
            <Spinner className="w-5 h-5" />
            Analyzing with AI...
          </>
        ) : (
          <>
            Analyze Affordability
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </Button>
    </form>
  )
}
