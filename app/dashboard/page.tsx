import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Overview - sycord+ Dashboard",
  description: "Manage your applications, view metrics, and configure settings.",
}

export default function DashboardPage() {
  return (
    <>
<section className="relative w-full overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[linear-gradient(180deg,_hsl(var(--primary)/0.08),_transparent)]" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 pt-20 pb-12 sm:px-6 md:pt-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center space-y-5">
          
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">Ship something people remember.</h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">Here is an overview of your current infrastructure and recent deployments.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg"><Link href="#">New Project</Link></Button>
            <Button asChild size="lg" variant="outline"><Link href="#">Account Settings</Link></Button>
          </div>
        </div>
        <div className="relative mx-auto mt-14 max-w-5xl">
          <div className="relative rounded-[1.5rem] border bg-card shadow-2xl shadow-primary/10">
            <div className="flex items-center gap-1.5 border-b px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-muted-foreground/30" />
              <span className="h-3 w-3 rounded-full bg-muted-foreground/30" />
              <span className="h-3 w-3 rounded-full bg-muted-foreground/30" />
              <span className="ml-3 text-xs text-muted-foreground">dashboard.preview</span>
            </div>
            <div className="grid gap-4 p-6 sm:grid-cols-3">
              <div className="rounded-xl border bg-background p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">MRR growth</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight">+38%</p>
              </div>
              <div className="rounded-xl border bg-background p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Active teams</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight">12k</p>
              </div>
              <div className="rounded-xl border bg-background p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Avg response</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight">&lt;200ms</p>
              </div>
            </div>
            <div className="border-t px-6 py-4 text-xs text-muted-foreground">Live, customizable, and ready in minutes.</div>
          </div>
        </div>
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        
        <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border bg-card p-6 text-center">
            <dd className="text-3xl font-semibold tracking-tight sm:text-4xl">124GB</dd>
            <dt className="mt-2 text-sm text-muted-foreground">Bandwidth Used</dt>
          </div>
          <div className="rounded-2xl border bg-card p-6 text-center">
            <dd className="text-3xl font-semibold tracking-tight sm:text-4xl">45min</dd>
            <dt className="mt-2 text-sm text-muted-foreground">Build Minutes</dt>
          </div>
          <div className="rounded-2xl border bg-card p-6 text-center">
            <dd className="text-3xl font-semibold tracking-tight sm:text-4xl">12</dd>
            <dt className="mt-2 text-sm text-muted-foreground">Active Projects</dt>
          </div>
        </dl>
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Shop the collection</h2>
        <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">Your latest active applications and their status.</p>
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <div className="aspect-square w-full overflow-hidden rounded-2xl border bg-gradient-to-br from-accent/30 via-primary/10 to-background"></div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">api-gateway-prod</p>
                <p className="text-xs text-muted-foreground">Production</p>
              </div>
              <p className="font-semibold"></p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="aspect-square w-full overflow-hidden rounded-2xl border bg-gradient-to-br from-accent/30 via-primary/10 to-background"></div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">marketing-site-v2</p>
                <p className="text-xs text-muted-foreground">Preview</p>
              </div>
              <p className="font-semibold"></p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="aspect-square w-full overflow-hidden rounded-2xl border bg-gradient-to-br from-accent/30 via-primary/10 to-background"></div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">internal-admin-tool</p>
                <p className="text-xs text-muted-foreground">Production</p>
              </div>
              <p className="font-semibold"></p>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
