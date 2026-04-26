import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Products() {
  React.useEffect(() => { document.title = "Products" }, [])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Products</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">The product catalog serves shoppers ready to browse inventory, displaying all available phones with filters and sorting. Content includes a sortable table/grid of phones showing model, price, storage options, camera specs, battery life, and stock status; sidebar filters for brand (Apple, Samsung, Google), price range, and screen size; product comparison modal; and pagination for 50+ items. Primary CTA is 'Add to Cart' buttons linking to /cart.</p>
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
              <CardTitle>Filter sidebar with brand/price/screen size sliders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Filter sidebar with brand/price/screen size sliders</p>
            </CardContent>
          </Card>
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Sortable product table (price, rating, newest)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Sortable product table (price, rating, newest)</p>
            </CardContent>
          </Card>
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Product comparison modal (select up to 4 phones)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Product comparison modal (select up to 4 phones)</p>
            </CardContent>
          </Card>
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Stock status badges (In Stock, Low Stock, Sold Out)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Stock status badges (In Stock, Low Stock, Sold Out)</p>
            </CardContent>
          </Card>
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Quick view modal with full specs and buy button</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Quick view modal with full specs and buy button</p>
            </CardContent>
          </Card>
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Pagination with 12/24/48 items per page</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Pagination with 12/24/48 items per page</p>
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
