"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6">
      <div className="w-full max-w-5xl bg-background/95 backdrop-blur-xl border border-border/50 rounded-full h-14 flex items-center justify-between px-6 shadow-xl shadow-black/5 dark:shadow-white/5">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-linear-to-tr from-primary to-accent flex items-center justify-center p-0.5 shadow-lg shadow-primary/20">
            <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
              <span className="text-foreground font-black text-xs">C2O</span>
            </div>
          </div>
          <span className="font-bold text-lg tracking-tight text-foreground">Cost2own</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-10">
          <Link href="#features" className="text-foreground/80 hover:text-foreground transition-all text-sm font-medium">
            What we do
          </Link>
          <Link href="#how-it-works" className="text-foreground/80 hover:text-foreground transition-all text-sm font-medium">
            Our approach
          </Link>
          <Link href="#pricing" className="text-foreground/80 hover:text-foreground transition-all text-sm font-medium">
            About us
          </Link>
        </nav>

        <div className="flex items-center">
          <Button className="rounded-full px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/25">
            Contact
          </Button>
        </div>
      </div>
    </header>
  )
}
