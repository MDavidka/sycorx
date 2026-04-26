import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { ArrowRightIcon, ClockIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { applyDiscount, claimDeal1, claimDeal2, toggleBundlePhone, toggleBundleCase, toggleBundleCharger, addBundleToCart, buyRefurbished1, buyRefurbished2, applyTradein } from '@/lib/deals-logic'

export function Deals() {
  React.useEffect(() => { document.title = "Deals" }, [])
  const [sortBy, setSortBy] = React.useState('')
  const [discountCode, setDiscountCode] = React.useState(0)
  const [bundleIncomplete, setBundleIncomplete] = React.useState('')
  const [tradeinModel, setTradeinModel] = React.useState('')
  const [tradeinCondition, setTradeinCondition] = React.useState('')

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active Deals</CardTitle>
          </CardHeader>
          <CardContent className="p-2 text-2xl font-bold text-primary">
            <div>$state.activeDeals</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Savings</CardTitle>
          </CardHeader>
          <CardContent className="p-2 text-2xl font-bold text-primary">
            <div>$state.totalSavings</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Avg Discount</CardTitle>
          </CardHeader>
          <CardContent className="p-2 text-2xl font-bold text-primary">
            <div>$state.avgDiscount</div>
            <span className="text-sm text-muted-foreground">%</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Expiring Soon</CardTitle>
          </CardHeader>
          <CardContent className="p-2 text-2xl font-bold text-destructive">
            <div>$state.expiringSoon</div>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/4 space-y-4 sticky top-8 self-start">
          <Card>
            <CardHeader>
              <CardTitle>Sort Deals</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discount-desc">Discount % (High → Low)</SelectItem>
                  <SelectItem value="discount-asc">Discount % (Low → High)</SelectItem>
                  <SelectItem value="expires-soon">Expires Soonest</SelectItem>
                  <SelectItem value="price-low">Price (Low → High)</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Discount Code</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Input placeholder="Enter code" value={discountCode} onChange={setDiscountCode} />
              <div className="text-sm text-muted-foreground">$state.discountPreview</div>
              <Button size="sm" onClick={applyDiscount}>
                <span>Apply</span>
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-3/4 space-y-6">
          <Tabs defaultValue="flash" className="w-full">
            <TabsList>
              <TabsTrigger value="flash">Flash Deals</TabsTrigger>
              <TabsTrigger value="bundles">Bundles</TabsTrigger>
              <TabsTrigger value="refurbished">Refurbished</TabsTrigger>
              <TabsTrigger value="tradein">Trade-in</TabsTrigger>
            </TabsList>
            <TabsContent value="flash">
              <Card>
                <CardHeader>
                  <CardTitle>Deals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex -space-x-1">
                            <div className="w-3 h-3 bg-yellow-400 rounded-full border-2 border-background" />
                            <div className="w-3 h-3 bg-yellow-400 rounded-full border-2 border-background" />
                            <div className="w-3 h-3 bg-yellow-400 rounded-full border-2 border-background" />
                            <div className="w-3 h-3 bg-yellow-400 rounded-full border-2 border-background" />
                            <div className="w-3 h-3 bg-yellow-400 rounded-full border-2 border-background" />
                          </div>
                          <Badge>iPhone 15 Pro</Badge>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <ClockIcon className="h-3 w-3" />
                          <span>$state.deal1Timer</span>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-2">
                        <div className="text-2xl font-bold">$499</div>
                        <div className="text-sm line-through text-muted-foreground">$999</div>
                        <Badge variant="secondary">50% OFF</Badge>
                        <Button className="w-full mt-3" onClick={claimDeal1}>
                          <span>Claim Deal</span>
                          <ArrowRightIcon className="h-4 w-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <Badge>Galaxy S24 Ultra</Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <ClockIcon className="h-3 w-3" />
                          <span>$state.deal2Timer</span>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-2">
                        <div className="text-2xl font-bold">$899</div>
                        <div className="text-sm line-through text-muted-foreground">$1,299</div>
                        <Badge variant="secondary">31% OFF</Badge>
                        <Button className="w-full mt-3" onClick={claimDeal2}>
                          <span>Claim Deal</span>
                          <ArrowRightIcon className="h-4 w-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Model</TableHead>
                        <TableHead>Original</TableHead>
                        <TableHead>Deal Price</TableHead>
                        <TableHead>Discount</TableHead>
                        <TableHead>Expires</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>iPhone 15</TableCell>
                        <TableCell>$799</TableCell>
                        <TableCell className="font-bold text-primary">$399</TableCell>
                        <TableCell>
                          <Badge variant="secondary">50%</Badge>
                        </TableCell>
                        <TableCell>$state.expires1</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="bundles">
              <Card>
                <CardHeader>
                  <CardTitle>Bundle Builder</CardTitle>
                  <CardDescription>Save 20% when buying phone + case + charger</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Checkbox id="phone" checked="$state.bundle.phone" onCheckedChange={toggleBundlePhone} />
                    <Label htmlFor="phone">iPhone 15 (Required)</Label>
                    <Checkbox id="case" checked="$state.bundle.case" onCheckedChange={toggleBundleCase} />
                    <Label htmlFor="case">Protective Case (+$29)</Label>
                    <Checkbox id="charger" checked="$state.bundle.charger" onCheckedChange={toggleBundleCharger} />
                    <Label htmlFor="charger">65W Fast Charger (+$49)</Label>
                  </div>
                  <Separator />
                  <div className="text-2xl font-bold text-primary p-4 bg-accent rounded-lg">
                    <span>$state.bundleTotal</span>
                  </div>
                  <Button className="w-full" onClick={addBundleToCart} disabled={bundleIncomplete}>
                    <ShoppingCartIcon className="h-4 w-4 mr-2" />
                    <span>Add Bundle to Cart</span>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="refurbished">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Refurbished</Badge>
                      <Badge>1 Year Warranty</Badge>
                    </div>
                    <CardTitle>iPhone 14 Pro Max</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-2xl font-bold">$699</div>
                    <div className="text-sm line-through text-muted-foreground">$1,099</div>
                    <Button variant="outline" className="w-full" onClick={buyRefurbished1}>Buy Refurbished</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Refurbished</Badge>
                      <Badge>2 Year Warranty</Badge>
                    </div>
                    <CardTitle>Pixel 8 Pro</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-2xl font-bold">$599</div>
                    <div className="text-sm line-through text-muted-foreground">$999</div>
                    <Button variant="outline" className="w-full" onClick={buyRefurbished2}>Buy Refurbished</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="tradein">
              <Card>
                <CardHeader>
                  <CardTitle>Trade-in Calculator</CardTitle>
                  <CardDescription>Get instant trade-in value for your old phone</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Phone Model</Label>
                    <Select value={tradeinModel} onValueChange={setTradeinModel}>
                      <SelectTrigger />
                      <SelectContent>
                        <SelectItem value="iphone-13">iPhone 13</SelectItem>
                        <SelectItem value="iphone-14">iPhone 14</SelectItem>
                        <SelectItem value="galaxy-s23">Galaxy S23</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Condition</Label>
                    <ToggleGroup type="single" value={tradeinCondition} onValueChange={setTradeinCondition}>
                      <ToggleGroupItem value="excellent" className="flex-1">Excellent</ToggleGroupItem>
                      <ToggleGroupItem value="good" className="flex-1">Good</ToggleGroupItem>
                      <ToggleGroupItem value="fair" className="flex-1">Fair</ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                  <Separator />
                  <div className="p-6 bg-accent rounded-lg text-center">
                    <div className="text-3xl font-bold text-primary mb-1">$state.tradeinValue</div>
                    <div className="text-sm text-muted-foreground">Trade-in Credit</div>
                  </div>
                  <Button className="w-full" onClick={applyTradein}>
                    <span>Apply Trade-in Credit</span>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
