import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function About() {
  React.useEffect(() => { document.title = "About" }, [])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">About</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">The about page builds trust with potential customers by sharing the flower shop's story, expertise, and sustainability practices. It includes a timeline of the shop's history (founded 2010, expansions), team bios with photos, farm-to-vase sourcing map showing local growers, sustainability badges (eco-friendly packaging, water conservation), and customer impact stats (10K+ happy deliveries). Primary CTA 'See Our Flowers' links back to /shop.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button size="lg">
            <span>Get started</span>
          </Button>
          <Button size="lg" variant="outline">
            <span>Learn more</span>
          </Button>
        </div>
      </section>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 border-t border-border">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">What you'll find here</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Interactive timeline slider of shop milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Interactive timeline slider of shop milestones</p>
            </CardContent>
          </Card>
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Team member cards with hover bios and contact links</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Team member cards with hover bios and contact links</p>
            </CardContent>
          </Card>
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Interactive map pins for flower farms/partners</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Interactive map pins for flower farms/partners</p>
            </CardContent>
          </Card>
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Stats counter animations (deliveries, trees planted)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Stats counter animations (deliveries, trees planted)</p>
            </CardContent>
          </Card>
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Sustainability FAQ accordion with 5 entries</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Sustainability FAQ accordion with 5 entries</p>
            </CardContent>
          </Card>
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Video embed of flower arrangement process</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Video embed of flower arrangement process</p>
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <Card className="p-8 md:p-12 text-center">
          <CardTitle className="text-2xl md:text-3xl">Ready to start?</CardTitle>
          <p className="mt-3 text-muted-foreground">Reach out and we'll get back to you.</p>
          <div className="mt-6 flex justify-center">
            <Button size="lg">
              <span>Contact us</span>
            </Button>
          </div>
        </Card>
      </section>
    </main>
  )
}
