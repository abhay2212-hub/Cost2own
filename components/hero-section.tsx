"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Car, Home, Building2, Landmark } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative pt-48 pb-32 px-6 overflow-hidden min-h-screen flex items-center">
      {/* Background Cinematic Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none opacity-20 dark:opacity-40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-accent blur-[120px] rounded-full animate-glow" />
        <div className="absolute top-3/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary blur-[100px] rounded-full opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 bg-foreground/5 dark:bg-white/5 border border-foreground/10 dark:border-white/10 rounded-full px-4 py-1.5 mb-10 shadow-sm backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            <span className="text-sm font-semibold tracking-wide text-foreground uppercase">High-Touch Precision</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-foreground leading-[1.1] tracking-tight mb-8">
            Knowledge is power.<br />
            <span className="bg-linear-to-r from-primary via-accent to-primary-foreground bg-clip-text text-transparent">Commit with confidence.</span>
          </h1>
          
          <p className="mt-8 text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
            Get AI-powered insights on any asset purchase. Understand your required income, 
            ideal down payment, interest rates, and maintenance costs in seconds.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/analyze">
              <Button size="lg" className="rounded-full px-12 h-16 bg-[#0a0505] hover:bg-[#1a1515] text-white font-[900] text-sm tracking-[0.2em] uppercase shadow-2xl shadow-black/40 group transition-all hover:scale-105 active:scale-95 border border-white/5 relative overflow-hidden">
                <span className="relative z-10 [text-shadow:_1.5px_0_0_rgba(255,0,0,0.4),_-1.5px_0_0_rgba(0,0,255,0.4)]">
                  Start Analyzing Now
                </span>
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform relative z-10 stroke-[1.5]" />
                
                {/* Subtle Inner Glow */}
                <div className="absolute inset-0 bg-linear-to-tr from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Cinematic Asset Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { tag: "Cars", title: "Idea to Fleet", desc: "Scale Your Mobility", highlight: false },
            { tag: "Housing", title: "Evaluation to Keys", desc: "Unlock Ownership", highlight: true },
            { tag: "Business", title: "Request to Revenue", desc: "Maximize Yield", highlight: false },
            { tag: "Wealth", title: "Trust to Turnover", desc: "Legacy Building", highlight: false },
          ].map((item, idx) => (
            <div
              key={item.tag}
              className={`relative overflow-hidden p-8 rounded-[2rem] border transition-all duration-500 group cursor-pointer h-full min-h-[300px] flex flex-col justify-between
                ${item.highlight 
                  ? "bg-linear-to-b from-primary/20 via-background to-background border-primary/30 shadow-2xl shadow-primary/10" 
                  : "bg-background/40 backdrop-blur-2xl border-border/40 hover:border-primary/50 hover:bg-background/60 shadow-xl"
                }`}
            >
              {/* Internal Glow for highlighted card */}
              {item.highlight && (
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/20 blur-3xl rounded-full" />
              )}
              
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 mb-10">
                  <div className={`w-2 h-2 rounded-full ${item.highlight ? "bg-accent" : "bg-muted-foreground"}`} />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/60">{item.tag}</span>
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-4 leading-snug group-hover:translate-x-1 transition-transform text-balance">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground font-medium opacity-80 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-10">
                <Button 
                  variant={item.highlight ? "default" : "ghost"} 
                  className={`w-full rounded-2xl h-12 font-bold text-sm tracking-wide transition-all
                    ${item.highlight ? "shadow-lg shadow-primary/20" : "bg-foreground/5 hover:bg-foreground/10 hover:translate-y-[-2px]"}
                  `}
                >
                  {item.highlight ? "Analyze Now" : "Learn More"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
