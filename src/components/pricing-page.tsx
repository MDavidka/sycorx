import React, { useState, useEffect } from 'react';
import { 
  Check, 
  Minus, 
  HelpCircle, 
  ArrowRight, 
  Database,
  Server,
  Shield,
  Zap,
  ChevronDown
} from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn, formatCurrency } from '../utils';
import type { HostingPlan } from '../types';
import { getHostingPlans, IS_DB_CONNECTED } from '../db';
import { Button } from './header';

// ============================================================================
// SYNTHESIZED SHADCN/UI COMPONENTS
// ============================================================================

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto rounded-md border border-border">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b bg-muted/50", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  );
}

// ============================================================================
// PAGE COMPONENT
// ============================================================================

export interface PricingPageProps {
  onNavigate: (path: string) => void;
}

// Static comparison data for the detailed table
const COMPARISON_FEATURES = [
  {
    category: "Core Resources",
    features: [
      { name: "vCPU Cores", starter: "1 Core", pro: "4 Cores", enterprise: "16 Cores" },
      { name: "RAM", starter: "2 GB", pro: "8 GB", enterprise: "32 GB" },
      { name: "NVMe Storage", starter: "50 GB", pro: "200 GB", enterprise: "1 TB" },
      { name: "Bandwidth", starter: "1 TB", pro: "5 TB", enterprise: "Unlimited" },
    ]
  },
  {
    category: "Performance & Security",
    features: [
      { name: "DDoS Protection", starter: "Standard", pro: "Advanced (L7)", enterprise: "Enterprise (Always-on)" },
      { name: "Global CDN", starter: true, pro: true, enterprise: true },
      { name: "Dedicated IP", starter: false, pro: true, enterprise: "Up to 5" },
      { name: "Automated Backups", starter: "Weekly", pro: "Daily", enterprise: "Hourly" },
    ]
  },
  {
    category: "Support & SLA",
    features: [
      { name: "Uptime Guarantee", starter: "99.9%", pro: "99.99%", enterprise: "99.999%" },
      { name: "Support Level", starter: "Community & Email", pro: "Priority 24/7", enterprise: "Dedicated Account Manager" },
      { name: "Response Time", starter: "< 24 hours", pro: "< 1 hour", enterprise: "< 15 minutes" },
      { name: "Migration Assistance", starter: false, pro: true, enterprise: true },
    ]
  }
];

const FAQS = [
  {
    question: "Can I upgrade or downgrade my plan later?",
    answer: "Yes, you can scale your resources up or down at any time directly from your dashboard. Prorated charges or credits will be applied automatically to your account."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and wire transfers for annual Enterprise plans."
  },
  {
    question: "Is there a money-back guarantee?",
    answer: "We offer a 30-day money-back guarantee for all new Shared and VPS hosting plans. If you're not satisfied, simply cancel within the first 30 days for a full refund."
  },
  {
    question: "Do you provide free migrations?",
    answer: "Yes, our Pro and Enterprise plans include free managed migrations. Our expert team will handle moving your sites and databases with zero downtime."
  },
  {
    question: "What kind of support do you offer?",
    answer: "All plans include access to our extensive knowledge base and community forums. Pro plans include 24/7 priority ticket support, and Enterprise plans come with a dedicated account manager and Slack channel."
  }
];

export function PricingPage({ onNavigate }: PricingPageProps) {
  const [plans, setPlans] = useState<HostingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnnual, setIsAnnual] = useState(true); // Default to annual for better perceived value
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    let isMounted = true;
    
    async function fetchPlans() {
      try {
        setIsLoading(true);
        const data = await getHostingPlans();
        if (isMounted) {
          setPlans(data);
        }
      } catch (error) {
        console.error("Failed to fetch hosting plans:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchPlans();

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header Section */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-20 px-4 md:px-6 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-6">
            Plans that scale with your business
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Whether you're hosting a personal blog or a high-traffic enterprise application, we have a plan tailored to your needs.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-3 mb-12">
            <span className={cn("text-sm font-medium", !isAnnual ? "text-foreground" : "text-muted-foreground")}>
              Monthly billing
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={isAnnual}
              onClick={() => setIsAnnual(!isAnnual)}
              className={cn(
                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isAnnual ? "bg-primary" : "bg-input"
              )}
            >
              <span
                className={cn(
                  "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
                  isAnnual ? "translate-x-5" : "translate-x-0"
                )}
              />
            </button>
            <span className={cn("text-sm font-medium flex items-center gap-1.5", isAnnual ? "text-foreground" : "text-muted-foreground")}>
              Annual billing
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5 bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/20">
                Save 20%
              </Badge>
            </span>
          </div>

          {/* Database Connection Warning */}
          {!IS_DB_CONNECTED && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-700 dark:text-yellow-400 p-4 rounded-lg flex items-start gap-3 mb-10 text-left">
              <Database className="h-5 w-5 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold">Database Integration Not Connected</p>
                <p className="text-sm opacity-90">
                  The pricing plans below are using static placeholder data. To manage real hosting plans, connect a database from the Integrations tab.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 md:px-6 pb-24">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isLoading ? (
              // Loading Skeletons
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="flex flex-col h-full">
                  <CardHeader className="space-y-4">
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-10 w-1/3 mt-4" />
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-10 w-full" />
                  </CardFooter>
                </Card>
              ))
            ) : (
              // Actual Pricing Cards
              plans.map((plan) => {
                const price = isAnnual ? plan.annualPrice / 12 : plan.monthlyPrice;
                
                return (
                  <Card 
                    key={plan.id} 
                    className={cn(
                      "flex flex-col h-full relative transition-all duration-200",
                      plan.highlighted 
                        ? "border-primary shadow-lg md:-translate-y-2 ring-1 ring-primary/20" 
                        : "hover:border-border/80"
                    )}
                  >
                    {plan.highlighted && plan.badge && (
                      <div className="absolute -top-3 left-0 right-0 flex justify-center">
                        <Badge className="bg-primary text-primary-foreground px-3 py-1 text-xs uppercase tracking-wider font-bold shadow-sm">
                          {plan.badge}
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <CardDescription className="min-h-[40px]">{plan.description}</CardDescription>
                      <div className="mt-6 flex items-baseline text-5xl font-extrabold">
                        {formatCurrency(price)}
                        <span className="ml-1 text-xl font-medium text-muted-foreground">/mo</span>
                      </div>
                      {isAnnual ? (
                        <p className="text-sm text-muted-foreground mt-2">
                          Billed {formatCurrency(plan.annualPrice)} yearly
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground mt-2">
                          Billed monthly
                        </p>
                      )}
                    </CardHeader>
                    
                    <CardContent className="flex-1">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                          <Server className="h-4 w-4 text-primary" />
                          <span>Included Resources:</span>
                        </div>
                        <ul className="space-y-3">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <Check className="h-5 w-5 text-primary shrink-0" />
                              <span className="text-sm text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <Button 
                        className="w-full h-12 text-base" 
                        variant={plan.highlighted ? "default" : "outline"}
                        onClick={() => onNavigate('/dashboard')}
                      >
                        {plan.ctaText}
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Detailed Comparison Table */}
      <section className="py-24 bg-secondary/30 border-y border-border px-4 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Compare Features</h2>
            <p className="text-muted-foreground text-lg">
              A detailed breakdown of what's included in each tier.
            </p>
          </div>

          <Table className="bg-background">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[30%] text-base font-semibold text-foreground">Features</TableHead>
                <TableHead className="w-[23%] text-center text-base font-semibold text-foreground">Starter</TableHead>
                <TableHead className="w-[23%] text-center text-base font-semibold text-primary">Pro</TableHead>
                <TableHead className="w-[23%] text-center text-base font-semibold text-foreground">Enterprise</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {COMPARISON_FEATURES.map((category, idx) => (
                <React.Fragment key={idx}>
                  <TableRow className="bg-muted/30 hover:bg-muted/30">
                    <TableCell colSpan={4} className="font-semibold text-foreground py-3">
                      {category.category}
                    </TableCell>
                  </TableRow>
                  {category.features.map((feature, fIdx) => (
                    <TableRow key={fIdx}>
                      <TableCell className="font-medium text-muted-foreground">
                        {feature.name}
                      </TableCell>
                      <TableCell className="text-center">
                        {typeof feature.starter === 'boolean' ? (
                          feature.starter ? <Check className="h-5 w-5 text-primary mx-auto" /> : <Minus className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                        ) : (
                          <span className="text-sm">{feature.starter}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center bg-primary/5">
                        {typeof feature.pro === 'boolean' ? (
                          feature.pro ? <Check className="h-5 w-5 text-primary mx-auto" /> : <Minus className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                        ) : (
                          <span className="text-sm font-medium text-foreground">{feature.pro}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {typeof feature.enterprise === 'boolean' ? (
                          feature.enterprise ? <Check className="h-5 w-5 text-primary mx-auto" /> : <Minus className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                        ) : (
                          <span className="text-sm">{feature.enterprise}</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to know about the product and billing.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div 
                key={index} 
                className="border border-border rounded-lg overflow-hidden transition-colors hover:border-border/80"
              >
                <button
                  className="flex items-center justify-between w-full p-5 text-left bg-card hover:bg-muted/30 transition-colors focus:outline-none"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaqIndex === index}
                >
                  <span className="font-medium text-foreground pr-8">{faq.question}</span>
                  <ChevronDown 
                    className={cn(
                      "h-5 w-5 text-muted-foreground transition-transform duration-200 shrink-0",
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
                  <div className="p-5 pt-0 text-muted-foreground text-sm leading-relaxed bg-card border-t border-border/50">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center p-8 bg-muted/50 rounded-xl border border-border">
            <HelpCircle className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
            <p className="text-muted-foreground mb-6">
              Can't find the answer you're looking for? Please chat to our friendly team.
            </p>
            <Button variant="outline" onClick={() => onNavigate('/support')}>
              Contact Support
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Start building your infrastructure today
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-10">
            Join thousands of developers and businesses who trust NexusHost for their critical applications.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              variant="secondary" 
              className="w-full sm:w-auto h-12 px-8 text-base font-semibold text-primary hover:bg-white"
              onClick={() => onNavigate('/dashboard')}
            >
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}