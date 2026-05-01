import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Simple, Transparent Pricing | sycord+",
  description: "Choose the perfect plan for your Discord bot. From free hobby tiers to powerful dedicated resources for verified bots.",
}

export default function PricingPage() {
  return (
    <>
<section className="relative w-full overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-primary/10 to-transparent" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2 lg:px-8">
        <div className="space-y-6">
          
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">Ship something people remember.</h1>
          <p className="max-w-xl text-pretty text-lg text-muted-foreground">Whether you're testing a new idea or running a verified bot in 100,000 servers, we have a plan that fits your needs.</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button asChild size="lg"><Link href="#plans">View Plans</Link></Button>
        
      </div>
          
          
        </div>
        <div className="relative rounded-3xl border bg-card p-6 shadow-2xl shadow-primary/10">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-primary/30 via-accent/30 to-transparent blur-2xl" aria-hidden="true" />
            <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-primary/15 via-accent/10 to-card flex items-end p-6">
              <div className="space-y-2">
                <span className="inline-flex items-center rounded-full bg-background/80 backdrop-blur px-3 py-1 text-xs font-medium text-foreground border">Live preview</span>
                <p className="text-sm text-muted-foreground">Whether you're testing a new idea or running a verified bot in 100,000 servers, we have a plan that fits your needs.</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
              <div className="rounded-xl border bg-background/60 p-3">
                <p className="text-xl font-semibold tracking-tight">10x</p>
                <p className="text-xs text-muted-foreground">Faster</p>
              </div>
              <div className="rounded-xl border bg-background/60 p-3">
                <p className="text-xl font-semibold tracking-tight">99.9%</p>
                <p className="text-xs text-muted-foreground">Uptime</p>
              </div>
              <div className="rounded-xl border bg-background/60 p-3">
                <p className="text-xl font-semibold tracking-tight">4.9/5</p>
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
            </div>
          </div>
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Pricing built for every stage</h2>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">Upgrade instantly as your bot grows.</p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Card className="relative ">
            
            <CardHeader>
              <CardTitle className="text-xl">Pro</CardTitle>
              <CardDescription></CardDescription>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight">$5</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <Separator className="mb-6" />
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />1GB Dedicated RAM</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />1 vCPU Core</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />Always On</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />Automated Backups</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />Community Support</li>
              </ul>
              <Button asChild variant="outline" className="mt-6 w-full"><Link href="/contact">Get Pro</Link></Button>
            </CardContent>
          </Card>
          <Card className="relative ring-2 ring-primary shadow-xl shadow-primary/10 scale-[1.02]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Badge>Most popular</Badge></div>
            <CardHeader>
              <CardTitle className="text-xl">Scale</CardTitle>
              <CardDescription></CardDescription>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight">$15</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <Separator className="mb-6" />
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />4GB Dedicated RAM</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />2 vCPU Cores</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />Custom Domains</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />Advanced Analytics</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />Priority 24/7 Support</li>
              </ul>
              <Button asChild variant="default" className="mt-6 w-full"><Link href="/contact">Start Scaling</Link></Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="text-center space-y-4">
          
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Frequently asked</h2>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">Common questions about billing and limits.</p>
        </div>
        <Accordion type="single" collapsible className="mt-12 w-full">
          <AccordionItem value="item-0">
            <AccordionTrigger className="text-left text-base">Can I upgrade or downgrade at any time?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">Yes, your billing is prorated. If you upgrade halfway through the month, you only pay the difference for the remaining days.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left text-base">Are there any hidden bandwidth fees?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">No. All plans include unmetered bandwidth for standard Discord bot operations. If you are hosting a high-traffic API, fair use policies apply.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left text-base">Do you offer refunds?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">We offer a 7-day money-back guarantee on all paid plans. If you're not satisfied, just let us know.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
    </>
  )
}
