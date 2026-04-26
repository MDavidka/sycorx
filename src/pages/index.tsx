import React from 'react'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { ArrowRightIcon, CheckCircleIcon, DevicePhoneMobileIcon, MagnifyingGlassIcon, ShoppingBagIcon, StarIcon } from '@heroicons/react/24/outline'
import { shopNow, addToCartRoses, addToCartTulips, addToCartMixed, shopSale, subscribeNewsletter } from '@/lib/index-logic'

export function Home() {
  React.useEffect(() => { document.title = "Home" }, [])
  const [email, setEmail] = React.useState('')
  const [searchQuery, setSearchQuery] = React.useState('')

  return (
    <div>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <Carousel opts="[object Object]">
          <CarouselContent className="-ml-4 md:-ml-8">
            <CarouselItem>
              <div className="relative h-[500px] lg:h-[600px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-16 text-white">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">Home</h1>
                  <p className="text-xl md:text-2xl mb-8 max-w-md">Fresh flowers delivered daily. Shop our freshest bouquets & arrangements.</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" onClick={shopNow}>
                      <ShoppingBagIcon className="h-5 w-5 mr-2" />
                      <div>Shop Now</div>
                    </Button>
                    <Button variant="outline" size="lg" href="/shop">
                      <div>Browse All Flowers</div>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative h-[500px] lg:h-[600px] bg-gradient-to-r from-rose-500 to-orange-500 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative h-[500px] lg:h-[600px] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full" />
        </Carousel>
      </section>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">Featured Bouquets</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Our best-selling arrangements, fresh daily from local farms.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <AspectRatio ratio={1}>
                <div className="bg-gradient-to-br from-rose-400 to-pink-500 rounded-lg" />
              </AspectRatio>
              <CardTitle>Classic Roses</CardTitle>
              <CardDescription>12 premium red roses with baby's breath</CardDescription>
            </CardHeader>
            <CardContent className="pb-4 pt-0">
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-primary">$49</p>
                <Badge variant="secondary">In Stock</Badge>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button className="w-full" onClick={addToCartRoses}>
                <ShoppingBagIcon className="h-4 w-4 mr-2" />
                <div>Add to Cart</div>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <AspectRatio ratio={1}>
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg" />
              </AspectRatio>
              <CardTitle>Spring Tulips</CardTitle>
              <CardDescription>Mixed tulips in seasonal pastels</CardDescription>
            </CardHeader>
            <CardContent className="pb-4 pt-0">
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-primary">$38</p>
                <Badge variant="secondary">Limited</Badge>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button className="w-full" onClick={addToCartTulips}>
                <ShoppingBagIcon className="h-4 w-4 mr-2" />
                <div>Add to Cart</div>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <AspectRatio ratio={1}>
                <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg" />
              </AspectRatio>
              <CardTitle>Mixed Arrangement</CardTitle>
              <CardDescription>Vibrant seasonal mix in keepsake vase</CardDescription>
            </CardHeader>
            <CardContent className="pb-4 pt-0">
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-primary">$65</p>
                <Badge variant="secondary">Best Seller</Badge>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button className="w-full" onClick={addToCartMixed}>
                <ShoppingBagIcon className="h-4 w-4 mr-2" />
                <div>Add to Cart</div>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
      <section className="bg-primary/5 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-none bg-gradient-to-r from-primary to-primary-foreground/20 backdrop-blur-sm">
            <CardContent className="p-12 lg:p-20 text-center text-white">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4">🌸 Spring Sale - 20% Off All Bouquets!</h3>
              <p className="text-xl mb-8 opacity-90">Limited time only. Use code SPRING20 at checkout.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <div className="flex items-center gap-2 text-lg font-mono bg-white/20 px-4 py-2 rounded-full">
                  <div>00:04:32</div>
                  <Spinner className="h-5 w-5 animate-spin" />
                </div>
              </div>
              <Button size="lg" variant="secondary" onClick={shopSale}>
                <div>Shop Sale Now</div>
                <ArrowRightIcon className="h-5 w-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">Loved by Thousands</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Don't just take our word for it.</p>
        </div>
        <Carousel opts="[object Object]">
          <CarouselContent className="-ml-4">
            <CarouselItem>
              <Card className="max-w-md mx-auto">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex gap-1">
                    <StarIcon className="h-5 w-5 text-amber-400 fill-current" />
                    <StarIcon className="h-5 w-5 text-amber-400 fill-current" />
                    <StarIcon className="h-5 w-5 text-amber-400 fill-current" />
                    <StarIcon className="h-5 w-5 text-amber-400 fill-current" />
                    <StarIcon className="h-5 w-5 text-amber-400 fill-current" />
                  </div>
                  <p className="italic">“Absolutely stunning roses! Delivered same day and lasted over two weeks. Will definitely order again!”</p>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} />
                      <AvatarFallback>SA</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">Sarah Anderson</p>
                      <p className="text-sm text-muted-foreground">Repeat Customer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card className="max-w-md mx-auto">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex gap-1">
                    <StarIcon className="h-5 w-5 text-amber-400 fill-current" />
                    <StarIcon className="h-5 w-5 text-amber-400 fill-current" />
                    <StarIcon className="h-5 w-5 text-amber-400 fill-current" />
                    <StarIcon className="h-5 w-5 text-amber-400 fill-current" />
                    <StarIcon className="h-5 w-5 text-amber-400 fill-current" />
                  </div>
                  <p className="italic">“Perfect for our anniversary. The tulips were vibrant and beautifully arranged. Fast delivery too!”</p>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={"https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} />
                      <AvatarFallback>MM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">Michael Moore</p>
                      <p className="text-sm text-muted-foreground">Anniversary Gift</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2" />
        </Carousel>
      </section>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">Get Exclusive Deals</h2>
          <p className="text-xl text-muted-foreground mb-12">Join 50K+ flower lovers getting fresh bouquet deals weekly.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input placeholder="Enter your email" value={email} onChange={setEmail} type="email" />
            <Button onClick={subscribeNewsletter}>Subscribe</Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">$state.subscribeStatus</p>
        </div>
      </section>
      <div className="w-full bg-muted py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 items-center justify-between">
          <div className="flex flex-wrap gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <ShoppingBagIcon className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm font-medium text-center max-w-[100px]">Fresh Daily</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <DevicePhoneMobileIcon className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm font-medium text-center max-w-[100px]">Same Day Delivery</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <CheckCircleIcon className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm font-medium text-center max-w-[100px]">100% Satisfaction</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Input placeholder="Search roses, lilies..." value={searchQuery} onChange={setSearchQuery} className="max-w-xs" />
              <MagnifyingGlassIcon className="h-5 w-5 text-muted-foreground" />
            </div>
            <Button variant="outline" href="/shop">View All Flowers</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
