import React, { useState } from 'react';
import { 
  Search, 
  Book, 
  CreditCard, 
  Server, 
  Globe, 
  MessageSquare, 
  Mail, 
  Phone, 
  FileText,
  ChevronDown,
  CheckCircle2,
  Database,
  AlertCircle
} from 'lucide-react';
import { cn } from '../utils';
import { IS_DB_CONNECTED } from '../db';
import { Button } from './header';

// ============================================================================
// SYNTHESIZED SHADCN/UI COMPONENTS
// ============================================================================

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("rounded-xl border bg-card text-card-foreground shadow-sm", className)} {...props} />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("font-semibold leading-none tracking-tight", className)} {...props} />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
      {...props}
    />
  )
);
Label.displayName = "Label";

// ============================================================================
// PAGE COMPONENT
// ============================================================================

export interface SupportPageProps {
  onNavigate: (path: string) => void;
}

const HELP_CATEGORIES = [
  {
    title: "Getting Started",
    description: "Learn the basics of deploying your first server.",
    icon: Book,
    articleCount: 12
  },
  {
    title: "Billing & Accounts",
    description: "Manage your payment methods and invoices.",
    icon: CreditCard,
    articleCount: 8
  },
  {
    title: "Server Management",
    description: "Configure, scale, and monitor your instances.",
    icon: Server,
    articleCount: 24
  },
  {
    title: "Domains & DNS",
    description: "Register domains and manage DNS records.",
    icon: Globe,
    articleCount: 15
  }
];

const FAQS = [
  {
    question: "How do I reset my server's root password?",
    answer: "You can reset your root password from the Dashboard. Navigate to your server instance, click on 'Settings', and select 'Reset Password'. The server will need to be restarted for the changes to take effect."
  },
  {
    question: "What happens if I exceed my bandwidth limit?",
    answer: "If you exceed your monthly bandwidth allocation, your server will remain online but your connection speed may be throttled. You can upgrade your plan or purchase additional bandwidth add-ons from your billing dashboard."
  },
  {
    question: "Can I transfer an existing domain to NexusHost?",
    answer: "Yes! You can transfer any supported TLD to us. Go to the Domains tab in your dashboard, click 'Transfer Domain', and follow the instructions. You'll need an authorization code (EPP code) from your current registrar."
  },
  {
    question: "Do you offer automated backups?",
    answer: "Yes, automated backups are available on all Pro and Enterprise plans. Starter plans can add automated daily backups for a small additional monthly fee."
  }
];

export function SupportPage({ onNavigate }: SupportPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  
  // Form State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="bg-primary/5 border-b border-border pt-24 pb-16 md:pt-32 md:pb-20 px-4 md:px-6 text-center">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6">
            How can we help you today?
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Search our knowledge base or get in touch with our support team.
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input 
              type="text" 
              placeholder="Search for articles, guides, or error codes..." 
              className="pl-12 h-14 text-base rounded-full shadow-sm border-border/80 focus-visible:ring-primary/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button className="absolute right-1.5 top-1.5 h-11 rounded-full px-6">
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 md:px-6 py-16 max-w-6xl">
        
        {/* Categories Grid */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold tracking-tight mb-8">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HELP_CATEGORIES.map((category, idx) => (
              <Card key={idx} className="hover:border-primary/50 transition-colors cursor-pointer group">
                <CardHeader>
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <category.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                  <CardDescription className="mt-2">{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium text-primary flex items-center">
                    <FileText className="h-4 w-4 mr-1.5" />
                    {category.articleCount} articles
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Form Section */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-2">Contact Support</h2>
              <p className="text-muted-foreground">
                Can't find what you're looking for? Open a ticket and our team will get back to you.
              </p>
            </div>

            {!IS_DB_CONNECTED && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-700 dark:text-yellow-400 p-4 rounded-lg flex items-start gap-3">
                <Database className="h-5 w-5 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold">Database Integration Not Connected</p>
                  <p className="text-sm opacity-90">
                    Support tickets cannot be saved. Connect a database from the Integrations tab to enable real ticket submission. The form below will simulate a successful submission.
                  </p>
                </div>
              </div>
            )}

            <Card>
              <CardContent className="p-6">
                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                    <div className="h-16 w-16 bg-green-500/15 rounded-full flex items-center justify-center mb-2">
                      <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold">Ticket Submitted!</h3>
                    <p className="text-muted-foreground max-w-md">
                      We've received your request and will get back to you as soon as possible. Your ticket reference is <span className="font-mono text-foreground">#NX-{Math.floor(Math.random() * 10000)}</span>.
                    </p>
                    <Button variant="outline" className="mt-4" onClick={() => setIsSuccess(false)}>
                      Submit Another Ticket
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          placeholder="John Doe" 
                          required 
                          value={formData.name}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          placeholder="john@example.com" 
                          required 
                          value={formData.email}
                          onChange={handleFormChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input 
                        id="subject" 
                        name="subject" 
                        placeholder="Brief description of your issue" 
                        required 
                        value={formData.subject}
                        onChange={handleFormChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        name="message" 
                        placeholder="Please provide as much detail as possible..." 
                        className="min-h-[150px] resize-y" 
                        required 
                        value={formData.message}
                        onChange={handleFormChange}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Submit Ticket
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar: FAQs & Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Quick Contact Info */}
            <Card className="bg-primary/5 border-primary/10">
              <CardHeader>
                <CardTitle>Other ways to reach us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center shrink-0 border border-border">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email Support</p>
                    <a href="mailto:support@nexushost.example.com" className="text-sm text-primary hover:underline">
                      support@nexushost.example.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center shrink-0 border border-border">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Phone Support (Enterprise)</p>
                    <a href="tel:+18005550199" className="text-sm text-primary hover:underline">
                      +1 (800) 555-0199
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQs */}
            <div>
              <h3 className="text-xl font-bold tracking-tight mb-4">Frequently Asked Questions</h3>
              <div className="space-y-3">
                {FAQS.map((faq, index) => (
                  <div 
                    key={index} 
                    className="border border-border rounded-lg overflow-hidden transition-colors hover:border-border/80 bg-card"
                  >
                    <button
                      type="button"
                      className="flex items-center justify-between w-full p-4 text-left hover:bg-muted/30 transition-colors focus:outline-none"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={openFaqIndex === index}
                    >
                      <span className="font-medium text-sm text-foreground pr-8">{faq.question}</span>
                      <ChevronDown 
                        className={cn(
                          "h-4 w-4 text-muted-foreground transition-transform duration-200 shrink-0",
                          openFaqIndex === index ? "rotate-180" : ""
                        )} 
                      />
                    </button>
                    <div 
                      className={cn(
                        "overflow-hidden transition-all duration-200 ease-in-out",
                        openFaqIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      )}
                    >
                      <div className="p-4 pt-0 text-muted-foreground text-sm leading-relaxed border-t border-border/50">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="link" className="mt-4 px-0 text-primary" onClick={() => onNavigate('/pricing')}>
                View all FAQs &rarr;
              </Button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}