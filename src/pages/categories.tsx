import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowRightIcon, BatteryIcon, CogIcon, CreditCardIcon, DevicePhoneMobileIcon, EyeIcon, GamepadIcon, PhoneIcon, ShieldCheckIcon, SparklesIcon } from '@heroicons/react/24/outline'

export function Categories() {
  React.useEffect(() => { document.title = "Categories" }, [])
  const [activeTab, setActiveTab] = React.useState(false)

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2">Categories</CardTitle>
          <CardDescription>Discover phones by brand and type. Compare specs and find your perfect match.</CardDescription>
        </CardHeader>
      </Card>
      <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
        <Card className="lg:sticky lg:top-6 h-fit lg:col-span-1">
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Tabs defaultValue="iphone" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 h-auto">
                <TabsTrigger value="iphone" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground justify-start">
                  <PhoneIcon className="h-4 w-4 mr-2" />
                  <div>iPhone Series</div>
                </TabsTrigger>
                <TabsTrigger value="samsung" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground justify-start">
                  <DevicePhoneMobileIcon className="h-4 w-4 mr-2" />
                  <div>Samsung Galaxy</div>
                </TabsTrigger>
                <TabsTrigger value="pixel" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground justify-start">
                  <SparklesIcon className="h-4 w-4 mr-2" />
                  <div>Google Pixel</div>
                </TabsTrigger>
                <TabsTrigger value="budget" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground justify-start">
                  <CreditCardIcon className="h-4 w-4 mr-2" />
                  <div>Budget Phones</div>
                </TabsTrigger>
                <TabsTrigger value="gaming" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground justify-start">
                  <GamepadIcon className="h-4 w-4 mr-2" />
                  <div>Gaming Phones</div>
                </TabsTrigger>
                <TabsTrigger value="accessories" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground justify-start">
                  <CogIcon className="h-4 w-4 mr-2" />
                  <div>Accessories</div>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>
        <div className="lg:col-span-3 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="iphone">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">iPhone 15 Pro</CardTitle>
                      <Badge variant="secondary">Best Seller</Badge>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="aspect-[4/3] bg-muted rounded-md flex items-center justify-center">
                        <DevicePhoneMobileIcon className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <div className="text-2xl font-bold">$999</div>
                      <Button variant="outline" size="sm" className="w-full">
                        <EyeIcon className="h-4 w-4 mr-2" />
                        <div>Quick View</div>
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">iPhone 15</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="aspect-[4/3] bg-muted rounded-md flex items-center justify-center">
                        <DevicePhoneMobileIcon className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <div className="text-2xl font-bold">$799</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">iPhone 14 Pro</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="aspect-[4/3] bg-muted rounded-md flex items-center justify-center">
                        <DevicePhoneMobileIcon className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <div className="text-2xl font-bold">$899</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">iPhone SE</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="aspect-[4/3] bg-muted rounded-md flex items-center justify-center">
                        <DevicePhoneMobileIcon className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <div className="text-2xl font-bold">$429</div>
                    </CardContent>
                  </Card>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>iPhone Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Model</TableHead>
                          <TableHead>Camera</TableHead>
                          <TableHead>Battery</TableHead>
                          <TableHead>Price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>15 Pro</TableCell>
                          <TableCell>48MP</TableCell>
                          <TableCell>23h</TableCell>
                          <TableCell className="font-medium">$999</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>15</TableCell>
                          <TableCell>48MP</TableCell>
                          <TableCell>20h</TableCell>
                          <TableCell className="font-medium">$799</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <div>View All iPhones</div>
                      <ArrowRightIcon className="h-4 w-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="samsung">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Galaxy S24 Ultra</CardTitle>
                      <Badge variant="secondary">Best Seller</Badge>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="aspect-[4/3] bg-muted rounded-md flex items-center justify-center">
                        <DevicePhoneMobileIcon className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <div className="text-2xl font-bold">$1299</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Galaxy S24</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="aspect-[4/3] bg-muted rounded-md flex items-center justify-center">
                        <DevicePhoneMobileIcon className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <div className="text-2xl font-bold">$799</div>
                    </CardContent>
                  </Card>
                </div>
                <Card>
                  <CardFooter>
                    <Button className="w-full" variant="outline">View All Galaxy</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="pixel">
              <Card>
                <CardHeader>
                  <CardTitle>Google Pixel 8 Pro</CardTitle>
                  <Badge variant="outline">New</Badge>
                </CardHeader>
                <CardContent>Pure Android experience with amazing cameras.</CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="budget">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-primary mb-2">$199</div>
                    <h3 className="font-semibold mb-2">Moto G Stylus</h3>
                    <p className="text-sm text-muted-foreground mb-4">Great value with stylus support</p>
                    <Button size="sm">Details</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="gaming">
              <Card>
                <CardHeader>
                  <CardTitle>ROG Phone 8</CardTitle>
                </CardHeader>
                <CardContent>Ultimate gaming performance with 165Hz display.</CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="accessories">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Card className="col-span-1">
                  <CardContent className="p-4 text-center">
                    <BatteryIcon className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="font-medium">Chargers</div>
                  </CardContent>
                </Card>
                <Card className="col-span-1">
                  <CardContent className="p-4 text-center">
                    <ShieldCheckIcon className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="font-medium">Cases</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
