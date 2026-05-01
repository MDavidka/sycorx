import Link from "next/link"
import { Check, Quote, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "sycord+ | High-Performance Discord Bot Hosting",
  description: "Deploy your Discord bot in seconds. Zero downtime, infinite scalability, and native support for Node.js, Python, and Go.",
}

export default function HomePage() {
  return (
    <>
<section className="relative w-full overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[linear-gradient(180deg,_hsl(var(--primary)/0.08),_transparent)]" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 pt-20 pb-12 sm:px-6 md:pt-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center space-y-5">
          
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">Ship something people remember.</h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">Push your code to GitHub and we handle the rest. Get your Discord bot online 24/7 with auto-scaling, built-in DDoS protection, and zero configuration.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg"><Link href="/pricing">Start for Free</Link></Button>
            <Button asChild size="lg" variant="outline"><Link href="/features">Explore Features</Link></Button>
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
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">Trusted by teams everywhere</p>
        <div className="mt-8 grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
          <div className="text-base font-semibold tracking-tight text-muted-foreground/70 transition hover:text-foreground">Node.js</div>
          <div className="text-base font-semibold tracking-tight text-muted-foreground/70 transition hover:text-foreground">Python</div>
          <div className="text-base font-semibold tracking-tight text-muted-foreground/70 transition hover:text-foreground">Rust</div>
          <div className="text-base font-semibold tracking-tight text-muted-foreground/70 transition hover:text-foreground">Go</div>
          <div className="text-base font-semibold tracking-tight text-muted-foreground/70 transition hover:text-foreground">Docker</div>
        </div>
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Built for teams who care about the details</h2>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">We stripped away the complexity of traditional VPS hosting so you can focus on writing commands, not configuring firewalls.</p>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2 relative overflow-hidden border-border/60">
            <CardHeader>
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Sparkles className="h-5 w-5" /></div>
              <CardTitle className="text-xl">1-Click GitHub Deploys</CardTitle>
              <CardDescription className="text-base">Connect your repository and we'll automatically build and deploy your bot every time you push to main.</CardDescription>
            </CardHeader>
            
          </Card>
          <Card className="lg:col-span-1 relative overflow-hidden border-border/60">
            <CardHeader>
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Sparkles className="h-5 w-5" /></div>
              <CardTitle className="text-xl">Always-On Reliability</CardTitle>
              <CardDescription className="text-base">99.99% uptime guarantee with automatic process restarts if your bot crashes.</CardDescription>
            </CardHeader>
            
          </Card>
          <Card className="lg:col-span-1 relative overflow-hidden border-border/60">
            <CardHeader>
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Sparkles className="h-5 w-5" /></div>
              <CardTitle className="text-xl">Enterprise DDoS Protection</CardTitle>
              <CardDescription className="text-base">Keep your community online. Our edge network absorbs malicious traffic before it reaches your app.</CardDescription>
            </CardHeader>
            
          </Card>
          <Card className="lg:col-span-2 relative overflow-hidden border-border/60">
            <CardHeader>
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Sparkles className="h-5 w-5" /></div>
              <CardTitle className="text-xl">Real-time Log Streaming</CardTitle>
              <CardDescription className="text-base">Debug issues instantly with a live, searchable stream of your application's console output.</CardDescription>
            </CardHeader>
            
          </Card>
        </div>
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">How it works</h2>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">No SSH keys, no Linux tutorials. Just pure deployment speed.</p>
        </div>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">1</div>
            <h3 className="text-lg font-semibold">Connect GitHub</h3>
            <p className="text-sm text-muted-foreground">Authorize sycord+ to access your bot's repository with read-only permissions.</p>
          </div>
          <div className="space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">2</div>
            <h3 className="text-lg font-semibold">Set Environment Variables</h3>
            <p className="text-sm text-muted-foreground">Securely paste your Discord token and API keys into our encrypted vault.</p>
          </div>
          <div className="space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">3</div>
            <h3 className="text-lg font-semibold">Deploy &amp; Scale</h3>
            <p className="text-sm text-muted-foreground">Click deploy. We provision the container, install dependencies, and start your bot.</p>
          </div>
        </div>
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Loved by people who care about quality</h2>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">Join thousands of developers hosting their communities on sycord+.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-border/60">
            <CardContent className="p-6">
              <Quote className="h-6 w-6 text-primary/40" />
              <p className="mt-4 text-pretty text-base leading-relaxed">"Switching to sycord+ saved me 10 hours a week in server maintenance. The auto-deploy feature is absolute magic for my workflow."</p>
              <div className="mt-6 flex items-center gap-3">
                <Avatar className="h-9 w-9"><AvatarFallback>AC</AvatarFallback></Avatar>
                <div>
                  <p className="text-sm font-semibold">Alex Chen</p>
                  <p className="text-xs text-muted-foreground">Creator of ModerationBot</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/60">
            <CardContent className="p-6">
              <Quote className="h-6 w-6 text-primary/40" />
              <p className="mt-4 text-pretty text-base leading-relaxed">"We serve over 2M users across 50,000 servers. sycord+ handles our traffic spikes effortlessly without breaking a sweat."</p>
              <div className="mt-6 flex items-center gap-3">
                <Avatar className="h-9 w-9"><AvatarFallback>SJ</AvatarFallback></Avatar>
                <div>
                  <p className="text-sm font-semibold">Sarah Jenkins</p>
                  <p className="text-xs text-muted-foreground">Lead Dev, RPG-Cord</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/60">
            <CardContent className="p-6">
              <Quote className="h-6 w-6 text-primary/40" />
              <p className="mt-4 text-pretty text-base leading-relaxed">"The best hosting platform for Discord bots, period. The real-time logs and environment variable management are top tier."</p>
              <div className="mt-6 flex items-center gap-3">
                <Avatar className="h-9 w-9"><AvatarFallback>MT</AvatarFallback></Avatar>
                <div>
                  <p className="text-sm font-semibold">Marcus Thorne</p>
                  <p className="text-xs text-muted-foreground">Indie Hacker</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Pricing built for every stage</h2>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">Start for free, upgrade when your community demands it.</p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Card className="relative ">
            
            <CardHeader>
              <CardTitle className="text-xl">Hobby</CardTitle>
              <CardDescription></CardDescription>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight">$0</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <Separator className="mb-6" />
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />512MB RAM</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />Shared CPU</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />Community Support</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />Sleeps after 24h inactivity</li>
              </ul>
              <Button asChild variant="outline" className="mt-6 w-full"><Link href="/pricing">Deploy Free</Link></Button>
            </CardContent>
          </Card>
          <Card className="relative ring-2 ring-primary shadow-xl shadow-primary/10 scale-[1.02]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Badge>Most popular</Badge></div>
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
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />Always On (No Sleeping)</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />Priority Email Support</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />Automated Backups</li>
              </ul>
              <Button asChild variant="default" className="mt-6 w-full"><Link href="/pricing">Get Pro</Link></Button>
            </CardContent>
          </Card>
          <Card className="relative ">
            
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
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />Custom Domains for APIs</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />Advanced Analytics</li>
                <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />24/7 Discord Support</li>
              </ul>
              <Button asChild variant="outline" className="mt-6 w-full"><Link href="/pricing">Start Scaling</Link></Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 md:py-24 lg:grid-cols-3 lg:px-8">
        <div className="space-y-4">
          
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Frequently asked</h2>
          <p className="text-pretty text-muted-foreground">Everything you need to know about hosting on sycord+.</p>
        </div>
        <dl className="lg:col-span-2 divide-y rounded-2xl border bg-card">
          <div className="px-6 py-5">
            <dt className="font-semibold">Do I need to know Docker to use sycord+?</dt>
            <dd className="mt-2 text-sm text-muted-foreground">Not at all. We automatically detect your language (Node.js, Python, etc.) and build the container for you. If you prefer, you can provide your own Dockerfile.</dd>
          </div>
          <div className="px-6 py-5">
            <dt className="font-semibold">Is my bot token secure?</dt>
            <dd className="mt-2 text-sm text-muted-foreground">Yes. Environment variables are encrypted at rest using AES-256 and are only decrypted at runtime inside your isolated container.</dd>
          </div>
          <div className="px-6 py-5">
            <dt className="font-semibold">Can I host a database here?</dt>
            <dd className="mt-2 text-sm text-muted-foreground">sycord+ is optimized for stateless application hosting. We recommend using managed database providers like MongoDB Atlas or Supabase alongside our platform.</dd>
          </div>
          <div className="px-6 py-5">
            <dt className="font-semibold">What happens if I exceed my RAM limit?</dt>
            <dd className="mt-2 text-sm text-muted-foreground">Your bot will automatically restart to prevent system instability. We'll send you an alert so you can optimize your code or upgrade your plan.</dd>
          </div>
        </dl>
      </div>
    </section>

<section className="relative w-full ">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:px-8">
        <div className="space-y-3">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Ready when you are</h2>
          <p className="text-pretty text-muted-foreground">Join 10,000+ developers building the future of Discord communities.</p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <Button asChild size="lg"><Link href="/pricing">Create Account</Link></Button>
          <Button asChild size="lg" variant="outline"><Link href="/features">Read Documentation</Link></Button>
        </div>
      </div>
    </section>
    </>
  )
}
