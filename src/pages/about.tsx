import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Link } from 'react-router-dom'
import { CalendarIcon, ClockIcon, EnvelopeIcon, MapIcon, MapPinIcon, PhoneIcon, TrophyIcon, UsersIcon } from '@heroicons/react/24/outline'

export function About() {
  React.useEffect(() => { document.title = "About" }, [])

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
      <div className="mb-12 lg:mb-20">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent mb-6">About</h1>
        <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">Discover the story behind your trusted phone shop. From humble beginnings to serving 100K+ customers with 4.9⭐ rating.</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2 space-y-12">
          <Card className="overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <ClockIcon className="h-6 w-6" />
                <div>Our Journey</div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-0">
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                  <CalendarIcon className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1">2018</h4>
                    <p className="text-muted-foreground">Started as a small repair shop in downtown.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                  <CalendarIcon className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1">2021</h4>
                    <p className="text-muted-foreground">Expanded to 10+ locations across the region.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                  <CalendarIcon className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1">2024</h4>
                    <p className="text-muted-foreground">Reached 100K phones sold milestone!</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UsersIcon className="h-6 w-6" />
                <div>Meet Our Team</div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Carousel opts="[object Object]">
                <CarouselContent className="-ml-1">
                  <CarouselItem>
                    <div className="p-1">
                      <Card className="flex h-[250px]">
                        <Avatar className="h-20 w-20 mt-4 ml-4">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="p-6 space-y-2">
                          <h3 className="font-semibold">John Doe</h3>
                          <p className="text-sm text-muted-foreground">Lead Technician</p>
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="secondary">Apple Certified</Badge>
                            <Badge variant="secondary">Samsung Pro</Badge>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="p-1">
                      <Card className="flex h-[250px]">
                        <Avatar className="h-20 w-20 mt-4 ml-4">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>SJ</AvatarFallback>
                        </Avatar>
                        <div className="p-6 space-y-2">
                          <h3 className="font-semibold">Sarah Johnson</h3>
                          <p className="text-sm text-muted-foreground">Store Manager</p>
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="secondary">Customer Service Expert</Badge>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </CardContent>
          </Card>
          <Accordion type="single" collapsible defaultValue="warranty">
            <AccordionItem value="warranty">
              <AccordionTrigger>📜 Warranty Policy</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <ul className="space-y-2 ml-4 list-disc">
                  <li>1-year standard warranty on all new phones</li>
                  <li>30-day no-questions-asked returns</li>
                  <li>Lifetime screen protection included</li>
                  <li>Express replacement within 48 hours</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="repair">
              <AccordionTrigger>🔧 Repair Services</AccordionTrigger>
              <AccordionContent>Authorized service center for Apple, Samsung, Google. Same-day repairs for most common issues.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="lg:sticky lg:top-24 space-y-8 lg:self-start">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-center">
                <TrophyIcon className="h-6 w-6" />
                <div>Our Success</div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-0 px-6">
              <div className="space-y-4 text-center">
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-primary">$state.phonesSold</div>
                  <p className="text-sm text-muted-foreground">Phones Sold</p>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-primary">4.9</div>
                  <p className="text-sm text-muted-foreground">★ Customer Rating</p>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-primary">$state.locations</div>
                  <p className="text-sm text-muted-foreground">Store Locations</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardHeader className="pb-4 text-center">
              <CardTitle className="flex flex-col items-center gap-2">
                <MapPinIcon className="h-6 w-6" />
                <div>Store Locator</div>
              </CardTitle>
              <CardDescription>Find your nearest store</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-muted-foreground text-sm text-center">
                  <MapIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <div>Interactive map</div>
                  <p className="text-xs">(10+ locations)</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0 pb-4 px-6">
              <Button variant="outline" size="sm" className="w-full">
                <MapPinIcon className="h-4 w-4 mr-2" />
                <div>Find Store</div>
              </Button>
            </CardFooter>
          </Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Service</TableHead>
                <TableHead>Price</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Screen Repair</TableCell>
                <TableCell>$49</TableCell>
                <TableCell className="text-right">
                  <Badge variant="secondary">1 Day</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Battery</TableCell>
                <TableCell>$29</TableCell>
                <TableCell className="text-right">
                  <Badge variant="secondary">2 Hours</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Software</TableCell>
                <TableCell>Free</TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline">Express</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="space-y-3 pt-6">
            <Button size="lg" className="w-full">
              <PhoneIcon className="h-5 w-5 mr-2" />
              <div>Shop Products</div>
              <Link to="/products" />
            </Button>
            <Button variant="outline" size="lg" className="w-full">
              <EnvelopeIcon className="h-5 w-5 mr-2" />
              <div>Get Support</div>
              <Link to="/contact" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
