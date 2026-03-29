import { Calculator, TrendingUp, Shield, Zap } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Calculator,
    title: "Secures",
    description: "Income requirements based on the 28/36 rule and industry standard debt ratios.",
  },
  {
    icon: TrendingUp,
    title: "Aligns",
    description: "Stakeholder expectations with market conditions and projected interest rates.",
  },
  {
    icon: Shield,
    title: "Validates",
    description: "The completeness and coherence of your financial profile and asset risk.",
  },
  {
    icon: Zap,
    title: "Curates",
    description: "The best possible pathways for acquisition with no more information overload.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-32 px-6 relative overflow-hidden bg-background">
      {/* Decorative Wavy Element (Simulated with CSS) */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent shadow-[0_0_100px_rgba(var(--primary),0.1)]" />
      
      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <div className="inline-flex items-center gap-2 mb-10 px-4 py-1.5 rounded-full border border-foreground/10 bg-foreground/5 dark:bg-white/5 cursor-default hover:bg-white/10 transition-colors">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-[10px] font-black tracking-widest uppercase text-foreground/80">Collaborative Analysis</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-10 tracking-tight text-balance">
          A predictive and intuitive <br /> 
          <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">partner you can count on</span>
        </h2>
        
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-20 leading-relaxed font-medium">
          Our interactions always take you forward. For every asset you choose, we secure, align, 
          validate and curate exactly what you need.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connecting Line Pattern */}
          <div className="absolute top-1/3 left-0 right-0 h-[100px] border-t-2 border-primary/5 rounded-[50%] hidden md:block" />
          
          {features.map((feature, idx) => (
            <Link key={feature.title} href="/analyze" className="block relative group">
              <div
                className="relative text-left flex flex-col items-center p-6 rounded-3xl border border-transparent hover:border-primary/10 hover:bg-white/[0.02] active:scale-95 transition-all duration-300 md:items-start cursor-pointer h-full"
              >
                <div className="relative mb-8">
                  <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center shadow-lg group-hover:border-primary/50 group-hover:shadow-primary/10 transition-all z-20 relative">
                    <div className="w-4 h-4 rounded-full bg-primary/20 group-hover:bg-primary/40 flex items-center justify-center transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </div>
                  </div>
                  {/* Vertical Step Number */}
                  <div className="absolute -top-6 -right-6 text-[48px] font-black text-foreground/5 select-none transition-all group-hover:text-primary/10">
                    {idx + 1}
                  </div>
                </div>

                <h3 className="text-sm font-black text-foreground mb-3 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <div className="w-full text-left">
                  <p className="text-xs text-muted-foreground leading-[2] font-semibold uppercase opacity-60 group-hover:opacity-100 transition-opacity">
                    {feature.description}
                  </p>
                </div>
                
                {/* Tactical Indicator */}
                <div className="mt-auto pt-6 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  <span className="text-[10px] font-black tracking-widest uppercase text-primary flex items-center gap-2">
                    Start Analysis <span className="text-lg">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
