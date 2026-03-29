"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { 
  DollarSign, 
  TrendingUp, 
  Wallet, 
  PiggyBank,
  AlertCircle,
  CheckCircle,
  Calendar,
  Percent,
  Wrench,
  Shield
} from "lucide-react"

export interface AnalysisResult {
  assetName: string
  assetType: string
  price: number
  currency?: string // Added currency support
  summary: string
  monthlyIncomeRequired: number
  recommendedDownPayment: number
  downPaymentPercent: number
  estimatedInterestRate: number
  monthlyPayment: number
  totalInterest: number
  totalCost: number
  annualMaintenance: number
  taxesAndInsurance: number
  affordabilityScore: number
  recommendations: string[]
  warnings: string[]
  breakdown: {
    principal: number
    interest: number
    taxes: number
    insurance: number
    maintenance: number
  }
}

interface AnalysisResultsProps {
  results: AnalysisResult
}

function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-600"
  if (score >= 60) return "text-yellow-600"
  return "text-red-600"
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent"
  if (score >= 60) return "Good"
  if (score >= 40) return "Fair"
  return "Challenging"
}

export function AnalysisResults({ results }: AnalysisResultsProps) {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: results.currency || "USD",
      maximumFractionDigits: 0,
    }).format(value)
  }
  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card className="border-accent/30 bg-accent/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl ${
              results.affordabilityScore >= 60 ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
            }`}>
              {results.affordabilityScore}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-foreground mb-1">
                Affordability Score: <span className={getScoreColor(results.affordabilityScore)}>{getScoreLabel(results.affordabilityScore)}</span>
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {results.summary}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Wallet className="w-5 h-5 text-accent" />
              </div>
              <div className="text-sm text-muted-foreground">Monthly Income Needed</div>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(results.monthlyIncomeRequired)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Based on 28/36 rule
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <PiggyBank className="w-5 h-5 text-accent" />
              </div>
              <div className="text-sm text-muted-foreground">Recommended Down Payment</div>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(results.recommendedDownPayment)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {results.downPaymentPercent}% of asset price
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-accent" />
              </div>
              <div className="text-sm text-muted-foreground">Monthly Payment</div>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(results.monthlyPayment)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Principal + Interest
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Percent className="w-5 h-5 text-accent" />
              </div>
              <div className="text-sm text-muted-foreground">Interest Rate</div>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {results.estimatedInterestRate.toFixed(2)}%
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Estimated APR
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-accent" />
            Total Cost Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Principal</span>
              <span className="font-medium">{formatCurrency(results.breakdown.principal)}</span>
            </div>
            <Progress value={(results.breakdown.principal / results.totalCost) * 100} className="h-2" />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Interest</span>
              <span className="font-medium">{formatCurrency(results.breakdown.interest)}</span>
            </div>
            <Progress value={(results.breakdown.interest / results.totalCost) * 100} className="h-2" />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Taxes (Lifetime)</span>
              <span className="font-medium">{formatCurrency(results.breakdown.taxes)}</span>
            </div>
            <Progress value={(results.breakdown.taxes / results.totalCost) * 100} className="h-2" />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Insurance (Lifetime)</span>
              <span className="font-medium">{formatCurrency(results.breakdown.insurance)}</span>
            </div>
            <Progress value={(results.breakdown.insurance / results.totalCost) * 100} className="h-2" />
          </div>

          <div className="pt-4 border-t border-border">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-foreground">Total Cost of Ownership</span>
              <span className="font-bold text-xl text-foreground">{formatCurrency(results.totalCost)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Annual Costs */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Wrench className="w-5 h-5 text-accent" />
              </div>
              <div className="text-sm text-muted-foreground">Annual Maintenance</div>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(results.annualMaintenance)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Estimated yearly cost
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <div className="text-sm text-muted-foreground">Taxes & Insurance</div>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(results.taxesAndInsurance)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Annual estimate
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      {results.recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {results.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm text-foreground">{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Warnings */}
      {results.warnings.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              Things to Consider
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {results.warnings.map((warning, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                  </div>
                  <span className="text-sm text-foreground">{warning}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
