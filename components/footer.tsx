import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-20 px-6 border-t border-border/40 bg-background relative overflow-hidden">
      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-primary/30 to-transparent shadow-[0_0_50px_rgba(var(--primary),0.2)]" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 rounded-full bg-linear-to-tr from-primary to-accent flex items-center justify-center p-0.5 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                  <span className="text-foreground font-black text-xs">C2O</span>
                </div>
              </div>
              <span className="font-black text-xl tracking-tighter text-foreground group-hover:text-primary transition-colors">Cost2own</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed font-semibold opacity-60 max-w-xs">
              AI-powered financial planning for smarter, data-driven purchase decisions. Every commit matters.
            </p>
          </div>
          
          <div>
            <h4 className="font-black text-foreground mb-6 text-xs uppercase tracking-[0.2em] opacity-80">Product</h4>
            <ul className="space-y-4">
              <li><Link href="#features" className="text-sm text-muted-foreground hover:text-primary transition-all font-bold">What we do</Link></li>
              <li><Link href="#pricing" className="text-sm text-muted-foreground hover:text-primary transition-all font-bold">Pricing</Link></li>
              <li><Link href="/analyze" className="text-sm text-muted-foreground hover:text-primary transition-all font-bold">Analyze Asset</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-black text-foreground mb-6 text-xs uppercase tracking-[0.2em] opacity-80">Company</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-all font-bold">About us</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-all font-bold">Blog</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-all font-bold">Careers</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-black text-foreground mb-6 text-xs uppercase tracking-[0.2em] opacity-80">Connect</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-all font-bold">Twitter</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-all font-bold">LinkedIn</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-all font-bold">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-border/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-muted-foreground font-bold tracking-widest uppercase opacity-40">
            &copy; {new Date().getFullYear()} Cost2own Inc. All rights reserved.
          </p>
          <div className="flex gap-10">
             <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground opacity-50 transition-opacity">Privacy Policy</Link>
             <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground opacity-50 transition-opacity">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
