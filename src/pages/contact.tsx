import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { ChatBubbleLeftIcon, ChatBubbleLeftRightIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { submitForm, openLiveChat } from '@/lib/contact-logic'

export function Contact() {
  React.useEffect(() => { document.title = "Contact" }, [])
  const [formName, setFormName] = React.useState('')
  const [formEmail, setFormEmail] = React.useState('')
  const [formReason, setFormReason] = React.useState('')
  const [formMessage, setFormMessage] = React.useState('')
  const [selectedDate, setSelectedDate] = React.useState('')
  const [faqSearch, setFaqSearch] = React.useState('')
  const [faqCategory, setFaqCategory] = React.useState('')
  const [activeFaq, setActiveFaq] = React.useState(false)

  return (
    <div className="container mx-auto px-4 py-12 lg:px-8 max-w-7xl">
      <Card className="w-full mb-12">
        <CardHeader>
          <CardTitle className="text-3xl lg:text-4xl font-bold tracking-tight">Contact</CardTitle>
          <CardDescription>Get in touch with our team for support, quotes, or repair bookings. We're here to help 24/7.</CardDescription>
        </CardHeader>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Contact Form</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="w-full bg-gradient-to-r from-primary/10 to-primary/5 rounded-full h-2 mb-6">
              <div className="bg-primary h-2 rounded-full transition-all duration-300" style="[object Object]" />
            </div>
            <Form className="space-y-6">
              <FormField>
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" value={formName} onChange={setFormName} />
                  </FormControl>
                </FormItem>
              </FormField>
              <FormField>
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your@email.com" value={formEmail} onChange={setFormEmail} />
                  </FormControl>
                </FormItem>
              </FormField>
              <FormField>
                <FormItem>
                  <FormLabel>Reason for contact</FormLabel>
                  <FormControl>
                    <Select value={formReason} onValueChange={setFormReason}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="quote">Get a Quote</SelectItem>
                        <SelectItem value="repair">Repair Booking</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              </FormField>
              <FormField>
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your issue or request" value={formMessage} onChange={setFormMessage} />
                  </FormControl>
                </FormItem>
              </FormField>
              <Button className="w-full" onClick={submitForm}>
                <PhoneIcon className="h-4 w-4 mr-2" />
                <div>Send Message</div>
              </Button>
            </Form>
          </CardContent>
        </Card>
        <div className="space-y-6 lg:col-span-1">
          <Card>
            <CardHeader className="flex flex-row items-center space-x-2 pb-2">
              <PhoneIcon className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">24/7 Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <ChatBubbleLeftRightIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Live Chat</p>
                  <p className="text-sm text-muted-foreground">Start chat now</p>
                </div>
                <Button variant="outline" size="sm" onClick={openLiveChat}>
                  <ChatBubbleLeftIcon className="h-4 w-4 mr-2" />
                  <div>Chat</div>
                </Button>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <PhoneIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">+1 (555) 123-4567</p>
                  <p className="text-sm text-muted-foreground">24/7 Support</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Book Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Store Hours</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Location</TableHead>
                    <TableHead>Hours</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Downtown</TableCell>
                    <TableCell>Mon-Sat 9AM-8PM, Sun 11AM-6PM</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mall Store</TableCell>
                    <TableCell>Mon-Sun 10AM-9PM</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
      <Card className="mt-12">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-2 mb-6">
            <Input placeholder="Search FAQs..." value={faqSearch} onChange={setFaqSearch} className="flex-1" />
            <Select value={faqCategory} onValueChange={setFaqCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="warranty">Warranty & Repairs</SelectItem>
                <SelectItem value="orders">Orders & Shipping</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Accordion type="single" collapsible value={activeFaq} onValueChange={setActiveFaq} className="w-full">
            <AccordionItem value="warranty">
              <AccordionTrigger>What is your warranty policy?</AccordionTrigger>
              <AccordionContent>All phones come with a 2-year warranty covering manufacturing defects. Accidental damage coverage available for $5/month.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping">
              <AccordionTrigger>How long does shipping take?</AccordionTrigger>
              <AccordionContent>Standard shipping: 2-5 business days. Express: 1-2 business days. Free shipping on orders over $500.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="returns">
              <AccordionTrigger>What is your return policy?</AccordionTrigger>
              <AccordionContent>30-day returns on unopened products. 14-day returns on opened phones with original packaging.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
