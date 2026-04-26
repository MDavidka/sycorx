import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Shop() {
  React.useEffect(() => { document.title = "Shop" }, [])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Shop</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">The product catalog page serves shoppers ready to purchase, displaying all available flowers organized by category (bouquets, single stems, plants, gifts) with filtering and sorting options. It renders a filter sidebar (price range, color, occasion, delivery date), sortable product table/grid with images/prices/availability/stocks remaining badges, and product detail modals showing descriptions/add-ons (vase, card, chocolate). Primary CTA 'Add to Cart' button on each product leads to /cart for checkout.</p>
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
              <CardTitle>Sidebar filters for occasion (birthday, wedding, sympathy), color, price</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Sidebar filters for occasion (birthday, wedding, sympathy), color, price</p>
            </CardContent>
          </Card>
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Sort dropdown (price low-high, popularity, newest)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Sort dropdown (price low-high, popularity, newest)</p>
            </CardContent>
          </Card>
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Product cards with stock badges and 'Low Stock' warnings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Product cards with stock badges and 'Low Stock' warnings</p>
            </CardContent>
          </Card>
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Quick-view modal with zoomable images and add-to-cart form</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Quick-view modal with zoomable images and add-to-cart form</p>
            </CardContent>
          </Card>
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Pagination for 24+ products with page numbers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Pagination for 24+ products with page numbers</p>
            </CardContent>
          </Card>
          <Card className="p-6">
            <CardHeader>
              <CardTitle>'Out of Stock' overlay with notify-me form</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">'Out of Stock' overlay with notify-me form</p>
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
