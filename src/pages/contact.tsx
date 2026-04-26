import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { Link } from 'react-router-dom'
import { CheckCircleIcon, MagnifyingGlassIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { submitContactForm, setFiles, toggleChat } from '@/lib/contact-logic'

export function Contact() {
  React.useEffect(() => { document.title = "Contact" }, [])
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [faqQuery, setFaqQuery] = React.useState('')
  const [successOpen, setSuccessOpen] = React.useState(false)

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        <Card >
          <CardHeader>
            <CardTitle>Contact</CardTitle>
            <CardDescription>Get in touch for custom orders, support, or questions. We'll respond within 2 hours.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submitContactForm} className="space-y-4">
              <Field>
                <FieldLabel>Name</FieldLabel>
                <div>
                  <Input placeholder="John Doe" value={name} onChange={setName} />
                </div>
                <div />
              </Field>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <div>
                  <Input type="email" placeholder="john@example.com" value={email} onChange={setEmail} />
                </div>
                <div />
              </Field>
              <Field>
                <FieldLabel>Order Number (optional)</FieldLabel>
                <div>
                  <Select >
                    <SelectTrigger>
                      <SelectValue placeholder="Select order..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ORD-123">ORD-123</SelectItem>
                      <SelectItem value="ORD-124">ORD-124</SelectItem>
                      <SelectItem value="">No order</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </Field>
              <Field>
                <FieldLabel>Message</FieldLabel>
                <div>
                  <Textarea placeholder="Tell us about your custom order or question..." rows={4} value={message} onChange={setMessage} />
                </div>
                <div />
              </Field>
              <Field>
                <FieldLabel>Upload images (optional)</FieldLabel>
                <div>
                  <Input type="file" multiple accept="image/*" onChange={setFiles} />
                </div>
              </Field>
              <div className="pt-2">
                <Button type="submit" className="w-full">
                  <PhoneIcon className="h-4 w-4 mr-2" />
                  <div>Send Message</div>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="space-y-6 lg:sticky lg:top-8 lg:h-fit">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Live Chat</CardTitle>
              <Badge variant="outline">$state.chatStatus</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">Connect instantly with our floral experts.</p>
              <Button variant="secondary" size="lg" className="w-full" onClick={toggleChat}>
                <PhoneIcon className="h-4 w-4 mr-2" />
                <div>$state.chatOpen ? 'End Chat' : 'Start Live Chat'</div>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Our Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Store</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Hours</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Downtown</TableCell>
                    <TableCell>123 Flower St</TableCell>
                    <TableCell className="text-right font-medium">9AM - 7PM</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Uptown</TableCell>
                    <TableCell>456 Petal Ave</TableCell>
                    <TableCell className="text-right font-medium">10AM - 6PM</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Customer Service Stats</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">98%</div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Satisfaction</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">{"<2h"}</div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Avg Response</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Support FAQs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Input placeholder="Search support articles..." value={faqQuery} onChange={setFaqQuery} className="pl-10" />
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message Sent!</DialogTitle>
            <DialogDescription>Your ticket has been created. We'll respond within 2 hours.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-center p-4 bg-green-50 rounded-lg border border-green-200">
              <CheckCircleIcon className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <p className="font-semibold">Ticket #</p>
                <p className="font-mono text-lg">$state.ticketId</p>
              </div>
            </div>
            <Button asChild>
              <Link to="/orders">View Order Status</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
