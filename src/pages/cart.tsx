import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Link } from 'react-router-dom'
import { ArrowRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { decrementQuantity, incrementQuantity, moveToWishlist, removeItem, decrementQuantity2, incrementQuantity2, moveToWishlist2, removeItem2, updateDiscountCode, applyDiscount, toggleDatePicker, selectDeliveryDate } from '@/lib/cart-logic'

export function Cart() {
  React.useEffect(() => { document.title = "Cart" }, [])
  const [discountCode, setDiscountCode] = React.useState(0)
  const [datePickerOpen, setDatePickerOpen] = React.useState(false)
  const [selectedDate, setSelectedDate] = React.useState('')

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-8 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
      <h1 className="col-span-full text-3xl font-bold tracking-tight lg:col-span-3">Cart</h1>
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Your Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 border rounded-lg">
              <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">🌹</div>
              <div className="flex-1 min-w-0">
                <p className="font-medium">Red Roses Bouquet</p>
                <p className="text-sm text-muted-foreground">$49.99</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={decrementQuantity}>
                  <XMarkIcon className="h-4 w-4" />
                </Button>
                <div className="w-12 text-center font-mono font-medium">$state.quantity</div>
                <Button variant="ghost" size="sm" onClick={incrementQuantity}>
                  <XMarkIcon className="h-4 w-4 rotate-45" />
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={moveToWishlist}>Save for later</Button>
                <Button variant="ghost" size="sm" onClick={removeItem}>
                  <XMarkIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Separator />
            <div className="flex items-center space-x-4 p-4 border rounded-lg">
              <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">🌷</div>
              <div className="flex-1 min-w-0">
                <p className="font-medium">Pink Tulips Arrangement</p>
                <p className="text-sm text-muted-foreground">$39.99</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={decrementQuantity2}>
                  <XMarkIcon className="h-4 w-4" />
                </Button>
                <div className="w-12 text-center font-mono font-medium">$state.quantity2</div>
                <Button variant="ghost" size="sm" onClick={incrementQuantity2}>
                  <XMarkIcon className="h-4 w-4 rotate-45" />
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={moveToWishlist2}>Save for later</Button>
                <Button variant="ghost" size="sm" onClick={removeItem2}>
                  <XMarkIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="space-y-4 pt-6">
            <div className="flex items-center justify-between">
              <Label>Discount code</Label>
              <Badge variant="outline">$state.appliedDiscount</Badge>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Input placeholder="Enter code" value={discountCode} onChange={updateDiscountCode} />
              <Button onClick={applyDiscount}>Apply</Button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-medium">$state.subtotal</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Tax</span>
                <span className="font-medium">$state.tax</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Shipping</span>
                <span className="font-medium">$state.shipping</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="space-y-4 lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-lg font-bold">
              <span>Total</span>
              <span>$state.total</span>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Delivery date</Label>
              <Popover open={datePickerOpen} onOpenChange={toggleDatePicker}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <span>$state.selectedDate || 'Select date'</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar mode="single" selected={selectedDate} onSelect={selectDeliveryDate} defaultMonth="new Date()" />
                </PopoverContent>
              </Popover>
            </div>
            <Button size="lg" className="w-full">
              <Link to="/checkout">
                <span>Proceed to Checkout</span>
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full" asChild>
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
