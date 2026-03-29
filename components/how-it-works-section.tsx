const steps = [
  {
    step: "01",
    title: "Select Your Asset",
    description: "Choose from cars, houses, apartments, or any other asset type you want to analyze.",
  },
  {
    step: "02",
    title: "Enter the Price",
    description: "Input the purchase price and any additional details you have about the asset.",
  },
  {
    step: "03",
    title: "Get AI Analysis",
    description: "Our AI processes your data and provides comprehensive affordability insights.",
  },
  {
    step: "04",
    title: "Make Smart Decisions",
    description: "Use the detailed breakdown to make informed financial decisions with confidence.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Four simple steps to understand your financial readiness for any major purchase.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div key={item.step} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-border -translate-x-1/2" />
              )}
              <div className="text-5xl font-bold text-accent/20 mb-4">{item.step}</div>
              <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
