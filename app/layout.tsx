import type { Metadata } from "next"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "sycord+ — Next-generation cloud hosting for modern developers.",
  description: "Deploy, scale, and manage your applications globally with zero configuration. Experience lightning-fast edge infrastructure built for the future.",
  openGraph: {
    title: "sycord+ — Next-generation cloud hosting for modern developers.",
    description: "Deploy, scale, and manage your applications globally with zero configuration. Experience lightning-fast edge infrastructure built for the future.",
    siteName: "sycord+",
    type: "website",
  },
  icons: { icon: "https://img.pikbest.com/png-images/20241022/stealth-masked-hacker-gaming-logo-for-gamers_10991543.png!w700wp", apple: "https://img.pikbest.com/png-images/20241022/stealth-masked-hacker-gaming-logo-for-gamers_10991543.png!w700wp" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-dvh bg-background text-foreground antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
