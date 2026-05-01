import type { Metadata } from "next"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "sycord+ — Next-generation hosting for Discord bots and apps.",
  description: "High-performance, always-on hosting tailored for Discord developers. Deploy Node.js, Python, and Rust bots in seconds with zero server configuration.",
  openGraph: {
    title: "sycord+ — Next-generation hosting for Discord bots and apps.",
    description: "High-performance, always-on hosting tailored for Discord developers. Deploy Node.js, Python, and Rust bots in seconds with zero server configuration.",
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
