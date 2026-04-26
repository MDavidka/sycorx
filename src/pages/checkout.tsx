import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldContent, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { CreditCardIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'

export function Checkout() {
  React.useEffect(() => { document.title = "Checkout" }, [])
  const [activeStep, setActiveStep] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [city, setCity] = React.useState('')
  const [zip, setZip] = React.useState('')
  const [paymentMethod, setPaymentMethod] = React.useState('')
  const [cardNumber, setCardNumber] = React.useState(0)
  const [expiry, setExpiry] = React.useState('')
  const [cvc, setCvc] = React.useState('')
  const [termsAccepted, setTermsAccepted] = React.useState('')
  const [promoCode, setPromoCode] = React.useState('')
  const [isSubmitting, setIsSubmitting] = React.useState('')

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-8">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <div className="w-12 h-2 bg-primary/20 rounded-full" />
                <div className="w-2 h-2 bg-muted rounded-full ml-auto" />
              </div>
              <div className="grid grid-cols-3 text-center text-sm text-muted-foreground">
                <span>Shipping</span>
                <span>Payment</span>
                <span>Review</span>
              </div>
            </div>
            <Tabs value={activeStep} onValueChange={setActiveStep} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                <TabsTrigger value="payment">Payment</TabsTrigger>
                <TabsTrigger value="review">Review</TabsTrigger>
              </TabsList>
              <TabsContent value="shipping">
                <div className="space-y-4">
                  <Field>
                    <FieldLabel>Email</FieldLabel>
                    <FieldContent>
                      <Input type="email" placeholder="your@email.com" value={email} onChange={setEmail} />
                    </FieldContent>
                  </Field>
                  <Field>
                    <FieldLabel>Shipping Address</FieldLabel>
                    <FieldContent>
                      <InputGroup>
                        <InputGroupInput placeholder="123 Flower St" value={address} onChange={setAddress} />
                        <InputGroupButton size="sm">Find ZIP</InputGroupButton>
                      </InputGroup>
                    </FieldContent>
                  </Field>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel>City</FieldLabel>
                      <FieldContent>
                        <Input value={city} onChange={setCity} />
                      </FieldContent>
                    </Field>
                    <Field>
                      <FieldLabel>ZIP Code</FieldLabel>
                      <FieldContent>
                        <Input value={zip} onChange={setZip} />
                      </FieldContent>
                    </Field>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="payment">
                <div className="space-y-6">
                  <ToggleGroup type="single" value={paymentMethod} onValueChange={setPaymentMethod}>
                    <ToggleGroupItem value="card" className="flex-1">
                      <CreditCardIcon className="h-4 w-4 mr-2" />
                      <span>Credit Card</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="paypal" className="flex-1">
                      <ShoppingBagIcon className="h-4 w-4 mr-2" />
                      <span>PayPal</span>
                    </ToggleGroupItem>
                  </ToggleGroup>
                  <div className="$state.paymentMethod === 'card' ? 'block' : 'hidden'">
                    <Field>
                      <FieldLabel>Card Number</FieldLabel>
                      <FieldContent>
                        <Input placeholder="1234 5678 9012 3456" value={cardNumber} onChange={setCardNumber} />
                      </FieldContent>
                    </Field>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <Field>
                        <FieldLabel>Expiry</FieldLabel>
                        <FieldContent>
                          <Input placeholder="MM/YY" value={expiry} onChange={setExpiry} />
                        </FieldContent>
                      </Field>
                      <Field>
                        <FieldLabel>CVC</FieldLabel>
                        <FieldContent>
                          <Input placeholder={123} value={cvc} onChange={setCvc} />
                        </FieldContent>
                      </Field>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="review">
                <Accordion type="single" collapsible>
                  <AccordionItem value="order">
                    <AccordionTrigger>Review Order Details</AccordionTrigger>
                    <AccordionContent>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Red Roses Bouquet</TableCell>
                            <TableCell className="text-right">$59.99</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Pink Tulips</TableCell>
                            <TableCell className="text-right">$39.99</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell />
                            <TableCell className="text-right font-bold">$99.98</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div className="space-y-4 mt-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" checked={termsAccepted} onCheckedChange={setTermsAccepted} />
                    <Label htmlFor="terms">I agree to the </Label>
                    <a href="#" className="underline">Terms & Conditions</a>
                  </div>
                  <Field>
                    <FieldLabel>Promo Code</FieldLabel>
                    <FieldContent>
                      <div className="flex">
                        <Input placeholder="Enter code" value={promoCode} onChange={setPromoCode} />
                        <Button type="button" size="sm" variant="outline">Apply</Button>
                      </div>
                    </FieldContent>
                  </Field>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3 pt-0">
            <Button variant="outline" className="flex-1">
              <XMarkIcon className="h-4 w-4 mr-2" />
              <span>Cancel</span>
            </Button>
            <Button className="flex-1" loading={isSubmitting}>Place Order</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-2xl font-bold">$99.98</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>$99.98</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%):</span>
                <span>$7.99</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total:</span>
                <span>$107.97</span>
              </div>
            </div>
            <Separator />
            <div className="text-xs text-muted-foreground">Includes free standard shipping</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
