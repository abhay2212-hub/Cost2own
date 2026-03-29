import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-32 px-6 relative overflow-hidden bg-background">
      {/* Background Glows for CTA */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full opacity-40 dark:opacity-60" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 mb-8 bg-foreground/5 dark:bg-white/5 border border-foreground/10 dark:border-white/10 rounded-full px-4 py-1.5 shadow-sm">
          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
          <span className="text-[10px] font-black tracking-widest uppercase text-foreground/80">Growth Mindset</span>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-black text-foreground mb-8 tracking-tighter leading-tight">
          Ready to make <br />
          <span className="bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent">smarter decisions?</span>
        </h2>
        
        <p className="text-muted-foreground text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed opacity-80">
          Join thousands who use Cost2own's precision modeling to plan their future. 
          No more guesswork. Just data.
        </p>
        
        <Link href="/analyze">
          <Button size="lg" className="rounded-full px-12 h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-sm tracking-widest uppercase shadow-2xl shadow-primary/40 group">
            Start Analyzing Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
