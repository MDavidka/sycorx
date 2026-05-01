import Link from "next/link"
import { Check, Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Platform Features | sycord+",
  description: "Explore the powerful features that make sycord+ the ultimate hosting platform for modern web apps.",
}

export default function FeaturesPage() {
  return (
    <>
<section className="relative w-full overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.18),_transparent_60%)]" aria-hidden="true" />
      <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 md:py-32 lg:px-8">
        
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">Ship something people remember.</h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">Discover the tools and integrations that make deploying applications a breeze.</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg"><Link href="/login">Start Building</Link></Button>
          
        </div>
        
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Built for teams who care about the details</h2>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">Everything included out of the box.</p>
        </div>
        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Sparkles className="h-5 w-5" /></div>
            <h3 className="text-lg font-semibold">Custom Domains</h3>
            <p className="text-sm text-muted-foreground">Add custom domains with automatic SSL certificate generation and renewal.</p>
          </div>
          <div className="space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Sparkles className="h-5 w-5" /></div>
            <h3 className="text-lg font-semibold">Serverless Functions</h3>
            <p className="text-sm text-muted-foreground">Deploy Node.js, Python, and Go functions that scale automatically.</p>
          </div>
          <div className="space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Sparkles className="h-5 w-5" /></div>
            <h3 className="text-lg font-semibold">Web Analytics</h3>
            <p className="text-sm text-muted-foreground">Privacy-friendly, real-time analytics built directly into your dashboard.</p>
          </div>
          <div className="space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Sparkles className="h-5 w-5" /></div>
            <h3 className="text-lg font-semibold">Environment Variables</h3>
            <p className="text-sm text-muted-foreground">Securely manage secrets across preview and production environments.</p>
          </div>
          <div className="space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Sparkles className="h-5 w-5" /></div>
            <h3 className="text-lg font-semibold">Log Drains</h3>
            <p className="text-sm text-muted-foreground">Export your application logs to Datadog, Logtail, or custom webhooks.</p>
          </div>
          <div className="space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Sparkles className="h-5 w-5" /></div>
            <h3 className="text-lg font-semibold">Team Collaboration</h3>
            <p className="text-sm text-muted-foreground">Invite team members, manage roles, and review preview deployments together.</p>
          </div>
        </div>
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">How we compare</h2>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">Why modern teams are making the switch.</p>
        </div>
        <div className="mt-10 overflow-hidden rounded-2xl border bg-card">
          <div className="grid grid-cols-3 items-center gap-4 border-b bg-muted/40 px-4 py-3 text-sm font-medium sm:px-6">
            <span>Capability</span>
            <span className="text-center">Us <Badge variant="secondary" className="ml-2 align-middle">recommended</Badge></span>
            <span className="text-center text-muted-foreground">Others</span>
          </div>
          <ul className="divide-y text-sm">
            <li className="grid grid-cols-3 items-center gap-4 px-4 py-4 sm:px-6">
              <span className="font-medium">Setup Time</span>
              <span className="flex items-center justify-center gap-2 text-foreground"><Check className="h-4 w-4 text-primary" />sycord+: 2 minutes | VPS: 2-4 hours</span>
              <span className="flex items-center justify-center gap-2 text-muted-foreground"><X className="h-4 w-4" />Limited</span>
            </li>
            <li className="grid grid-cols-3 items-center gap-4 px-4 py-4 sm:px-6">
              <span className="font-medium">SSL Management</span>
              <span className="flex items-center justify-center gap-2 text-foreground"><Check className="h-4 w-4 text-primary" />sycord+: Automatic | VPS: Manual Certbot</span>
              <span className="flex items-center justify-center gap-2 text-muted-foreground"><X className="h-4 w-4" />Limited</span>
            </li>
            <li className="grid grid-cols-3 items-center gap-4 px-4 py-4 sm:px-6">
              <span className="font-medium">Scaling</span>
              <span className="flex items-center justify-center gap-2 text-foreground"><Check className="h-4 w-4 text-primary" />sycord+: Infinite &amp; Auto | VPS: Manual Upgrades</span>
              <span className="flex items-center justify-center gap-2 text-muted-foreground"><X className="h-4 w-4" />Limited</span>
            </li>
            <li className="grid grid-cols-3 items-center gap-4 px-4 py-4 sm:px-6">
              <span className="font-medium">Global CDN</span>
              <span className="flex items-center justify-center gap-2 text-foreground"><Check className="h-4 w-4 text-primary" />sycord+: Included | VPS: Third-party add-on</span>
              <span className="flex items-center justify-center gap-2 text-muted-foreground"><X className="h-4 w-4" />Limited</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 md:py-24 lg:px-8">
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Ready when you are</h2>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">Deploy your first app in under 60 seconds.</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg"><Link href="/login">Deploy Now</Link></Button>
          
        </div>
      </div>
    </section>
    </>
  )
}
