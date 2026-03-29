"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6">
      <div className="w-full max-w-5xl bg-background/95 backdrop-blur-xl border border-border/50 rounded-full h-14 flex items-center justify-between px-6 shadow-xl shadow-black/5 dark:shadow-white/5">
        <Link href="/" className="flex items-center gap-3 active:scale-95 transition-transform group">
          <div className="w-10 h-10 overflow-hidden rounded-full shadow-lg shadow-primary/20 ring-1 ring-white/10 group-hover:ring-primary/40 transition-all">
            <img src="/1.png" alt="Cost2own Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-bold text-lg tracking-tight text-foreground group-hover:text-primary transition-colors">Cost2own</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-10">
          <Link href="#features" className="text-foreground/80 hover:text-foreground active:scale-95 transition-all text-sm font-medium">
            What we do
          </Link>
          <Link href="#how-it-works" className="text-foreground/80 hover:text-foreground active:scale-95 transition-all text-sm font-medium">
            Our approach
          </Link>
          <Link href="#pricing" className="text-foreground/80 hover:text-foreground active:scale-95 transition-all text-sm font-medium">
            About us
          </Link>
        </nav>

        <div className="flex items-center">
          <Button className="rounded-full px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/25 active:scale-95 transition-transform">
            Contact
          </Button>
        </div>
      </div>
    </header>
  )
}
