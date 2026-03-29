import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Cost2own - Smart Asset Affordability Analysis',
  description: 'AI-powered financial planning tool to help you understand if you can afford your dream assets',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/1.png',
      },
      {
        url: '/1.png',
      },
      {
        url: '/1.png',
        type: 'image/png',
      },
    ],
    apple: '/1.png',
  },
}

import SoftAurora from '@/components/SoftAurora'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased text-foreground">
        <div className="fixed inset-0 -z-10 bg-background">
          <div className="absolute inset-0 opacity-60">
            <SoftAurora
              speed={0.6}
              scale={1.5}
              brightness={1}
              color1="#f7f7f7"
              color2="#e100ff"
              noiseFrequency={2.5}
              noiseAmplitude={1}
              bandHeight={0.5}
              bandSpread={1}
              octaveDecay={0.1}
              layerOffset={0}
              colorSpeed={1}
              enableMouseInteraction
              mouseInfluence={0.25}
            />
          </div>
          {/* Subtle noise overlay for texture */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
        </div>
        <div className="relative z-0 min-h-screen">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
}
