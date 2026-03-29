const stats = [
  { value: "50K+", label: "Assets Analyzed", description: "Every month" },
  { value: "99.2%", label: "Accuracy Rate", description: "In predictions" },
  { value: "$2.3B", label: "Savings Identified", description: "For our users" },
  { value: "4.9/5", label: "User Rating", description: "On all platforms" },
]

export function StatsSection() {
  return (
    <section className="py-24 px-6 relative bg-background overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat, idx) => (
            <div key={stat.label} className="text-center group">
              <div className="text-4xl md:text-5xl font-black text-foreground mb-3 tracking-tighter group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="font-bold text-foreground text-xs uppercase tracking-[0.2em] mb-1">{stat.label}</div>
              <div className="text-muted-foreground text-xs font-semibold opacity-60 uppercase">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
