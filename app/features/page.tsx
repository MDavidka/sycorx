import Link from "next/link"
import { Lock, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "All Sycord Features",
  description: "Explore instant deployments, global edge caching, preview URLs, and everything else Sycord offers.",
}

export default function FeaturesPage() {
  return (
    <>
<section className="relative w-full overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.18),_transparent_60%)]" aria-hidden="true" />
      <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 md:py-32 lg:px-8">
        
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">Ship something people remember.</h1>
        
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg"><Link href="#">Get started</Link></Button>
          
        </div>
        
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Built for teams who care about the details</h2>
          
        </div>
        <div className="mt-16 space-y-16 sm:space-y-24">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className=" space-y-4">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Sparkles className="h-5 w-5" /></div>
              <h3 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">Git-Based CI/CD</h3>
              <p className="text-pretty text-muted-foreground">Connect GitHub, GitLab, or Bitbucket. Deploy on push. Rollback with one click.</p>
              
            </div>
            <div className=" aspect-[4/3] rounded-2xl border bg-gradient-to-br from-accent/30 via-primary/10 to-background" aria-hidden="true"></div>
          </div>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="lg:order-2 space-y-4">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Sparkles className="h-5 w-5" /></div>
              <h3 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">Framework Auto-Detection</h3>
              <p className="text-pretty text-muted-foreground">Next.js, Nuxt, SvelteKit, Astro, Remix. No build config needed.</p>
              
            </div>
            <div className="lg:order-1 aspect-[4/3] rounded-2xl border bg-gradient-to-br from-accent/30 via-primary/10 to-background" aria-hidden="true"></div>
          </div>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className=" space-y-4">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Sparkles className="h-5 w-5" /></div>
              <h3 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">Preview Every PR</h3>
              <p className="text-pretty text-muted-foreground">Unique URLs for every pull request. Share with team or clients.</p>
              
            </div>
            <div className=" aspect-[4/3] rounded-2xl border bg-gradient-to-br from-accent/30 via-primary/10 to-background" aria-hidden="true"></div>
          </div>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="lg:order-2 space-y-4">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Sparkles className="h-5 w-5" /></div>
              <h3 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">Global Edge Caching</h3>
              <p className="text-pretty text-muted-foreground">Smart caching at 200+ edge locations. Invalidate on deploy.</p>
              
            </div>
            <div className="lg:order-1 aspect-[4/3] rounded-2xl border bg-gradient-to-br from-accent/30 via-primary/10 to-background" aria-hidden="true"></div>
          </div>
        </div>
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">How it works</h2>
          
        </div>
        <ol className="relative mt-12 space-y-10 border-l border-border pl-8">
          <li>
            <span className="absolute -left-[11px] mt-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">1</span>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Step 01</p>
            <h3 className="mt-1 text-lg font-semibold">Connect Git</h3>
            <p className="mt-1 text-sm text-muted-foreground">Authorize your repo. Sycord detects framework and sets up build.</p>
          </li>
          <li>
            <span className="absolute -left-[11px] mt-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">2</span>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Step 02</p>
            <h3 className="mt-1 text-lg font-semibold">Deploy Preview</h3>
            <p className="mt-1 text-sm text-muted-foreground">Push to any branch. Get instant preview URL in 12 seconds.</p>
          </li>
          <li>
            <span className="absolute -left-[11px] mt-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">3</span>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Step 03</p>
            <h3 className="mt-1 text-lg font-semibold">Promote to Production</h3>
            <p className="mt-1 text-sm text-muted-foreground">Merge to main. Deploy goes live globally in under 2 seconds.</p>
          </li>
        </ol>
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Built for teams who care about the details</h2>
          
        </div>
        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Sparkles className="h-5 w-5" /></div>
            <h3 className="text-lg font-semibold">CLI Deployments</h3>
            <p className="text-sm text-muted-foreground">sycord deploy from anywhere</p>
          </div>
          <div className="space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Lock className="h-5 w-5" /></div>
            <h3 className="text-lg font-semibold">Environment Variables</h3>
            <p className="text-sm text-muted-foreground">Encrypted at rest. Preview &amp; prod environments</p>
          </div>
          <div className="space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Sparkles className="h-5 w-5" /></div>
            <h3 className="text-lg font-semibold">Custom Domains</h3>
            <p className="text-sm text-muted-foreground">SSL included. DNS propagation in 60s</p>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
