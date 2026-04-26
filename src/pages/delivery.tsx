import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { ArrowRightIcon, CheckCircleIcon, MagnifyingGlassIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline'
import { checkCoverage } from '@/lib/delivery-logic'

export function Delivery() {
  React.useEffect(() => { document.title = "Delivery" }, [])
  const [zipCode, setZipCode] = React.useState('')
  const [selectedSlot, setSelectedSlot] = React.useState('')
  const [specialInstructions, setSpecialInstructions] = React.useState('')

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
      <Card className="max-w-4xl mx-auto mb-16">
        <CardHeader>
          <CardTitle className="text-4xl lg:text-5xl font-heading">Delivery</CardTitle>
          <CardDescription className="text-xl text-muted-foreground">Fast, reliable delivery across our service area with freshness guaranteed.</CardDescription>
        </CardHeader>
      </Card>
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Coverage Map</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input placeholder="Enter ZIP code to check coverage" value={zipCode} onChange={setZipCode} className="flex-1 max-w-md" />
            <Button onClick={checkCoverage}>
              <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
              <div>Check Coverage</div>
            </Button>
          </div>
          <div className="h-64 bg-gradient-to-br from-primary/10 to-secondary/20 rounded-lg flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p>Interactive map showing service radius</p>
              <div className="mt-2 font-medium" />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Delivery Slots</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedSlot} onValueChange={setSelectedSlot}>
              <SelectTrigger>
                <SelectValue placeholder="Choose delivery time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today-morning">Today - Morning (8AM-12PM)</SelectItem>
                <SelectItem value="today-afternoon">Today - Afternoon (12PM-5PM)</SelectItem>
                <SelectItem value="tomorrow">Tomorrow - All Day</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Delivery Pricing</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Same Day</TableCell>
                  <TableCell className="font-medium">$12.99</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="secondary">Limited</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Next Day</TableCell>
                  <TableCell className="font-medium">$8.99</TableCell>
                  <TableCell className="text-right" />
                </TableRow>
                <TableRow>
                  <TableCell>Scheduled</TableCell>
                  <TableCell className="font-medium">$6.99</TableCell>
                  <TableCell className="text-right" />
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Guarantee Badges</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Badge variant="secondary" className="text-lg px-4 py-2 cursor-pointer">
            <CheckCircleIcon className="h-5 w-5 mr-2" />
            <div>Freshness Guaranteed</div>
          </Badge>
          <Badge variant="secondary" className="text-lg px-4 py-2 cursor-pointer">
            <PuzzlePieceIcon className="h-5 w-5 mr-2" />
            <div>On-Time Delivery</div>
          </Badge>
        </CardContent>
      </Card>
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Special Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea placeholder="Leave special delivery instructions (max 200 chars)" value={specialInstructions} onChange={setSpecialInstructions} rows={4} />
          <div className="mt-4 p-4 bg-muted/50 rounded-md text-sm">$state.specialInstructionsPreview</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="weekends" className="w-full">
            <TabsList>
              <TabsTrigger value="weekends">Weekends</TabsTrigger>
              <TabsTrigger value="apartments">Apartments</TabsTrigger>
              <TabsTrigger value="large-orders">Large Orders</TabsTrigger>
              <TabsTrigger value="holidays">Holidays</TabsTrigger>
            </TabsList>
            <TabsContent value="weekends">We deliver Saturday 9AM-4PM, Sunday 12PM-5PM with $2 weekend surcharge.</TabsContent>
            <TabsContent value="apartments">Provide apartment/buzzer code in special instructions. We'll call if access unclear.</TabsContent>
            <TabsContent value="large-orders">Orders over 10 stems split across multiple vases if needed. Contact us for events.</TabsContent>
            <TabsContent value="holidays">Holiday delivery requires 48hr advance notice. Check availability calendar.</TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <div className="text-center pt-12">
        <Button size="lg" className="text-lg px-8">
          <div>Start Shopping</div>
          <ArrowRightIcon className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </div>
  )
}
