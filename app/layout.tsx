import type { Metadata } from "next"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "sycord — Frictionless Hosting for Modern Apps",
  description: "Sycord delivers instant deployments, global edge caching, and zero-config scaling for your web apps, APIs, and static sites. Deploy from Git in seconds with built-in previews and rollbacks.",
  openGraph: {
    title: "sycord — Frictionless Hosting for Modern Apps",
    description: "Sycord delivers instant deployments, global edge caching, and zero-config scaling for your web apps, APIs, and static sites. Deploy from Git in seconds with built-in previews and rollbacks.",
    siteName: "sycord",
    type: "website",
  },
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
