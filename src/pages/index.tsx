import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Home() {
  React.useEffect(() => { document.title = "Home" }, [])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Home</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">The landing page targets first-time visitors browsing for phones, showcasing top-selling smartphones and promotions to drive quick purchases. It features a hero banner with a featured phone deal and buy-now CTA, a grid of 6 best-selling phones with prices and ratings, customer testimonials carousel, category quick-links (iPhones, Androids, Accessories), and a newsletter signup for deals. The primary CTA scrolls to featured products or links to /products for full catalog.</p>
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
              <CardTitle>Hero banner with countdown timer for flash sale</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Hero banner with countdown timer for flash sale</p>
            </CardContent>
          </Card>
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Featured products grid with add-to-cart buttons</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Featured products grid with add-to-cart buttons</p>
            </CardContent>
          </Card>
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Testimonials carousel with 5-star reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Testimonials carousel with 5-star reviews</p>
            </CardContent>
          </Card>
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Category filter chips linking to /products</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Category filter chips linking to /products</p>
            </CardContent>
          </Card>
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Newsletter signup form with email validation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Newsletter signup form with email validation</p>
            </CardContent>
          </Card>
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Live deal ticker showing current discounts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Live deal ticker showing current discounts</p>
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
