import React, { useState, useEffect } from 'react';
import { 
  Server, 
  Shield, 
  Zap, 
  Globe, 
  Check, 
  ArrowRight, 
  Database,
  Cpu,
  Clock
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

export interface HomePageProps {
  onNavigate: (path: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [plans, setPlans] = useState<HostingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnnual, setIsAnnual] = useState(false);

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

  const features = [
    {
      title: "Lightning Fast NVMe",
      description: "Experience up to 10x faster read/write speeds with our enterprise-grade NVMe storage arrays.",
      icon: Zap,
    },
    {
      title: "Global Edge Network",
      description: "Deploy your applications closer to your users with our strategically located global data centers.",
      icon: Globe,
    },
    {
      title: "Advanced DDoS Protection",
      description: "Always-on mitigation keeps your infrastructure safe from volumetric and application-layer attacks.",
      icon: Shield,
    },
    {
      title: "99.99% Uptime SLA",
      description: "We guarantee your services stay online with our highly available, redundant infrastructure.",
      icon: Clock,
    },
    {
      title: "Dedicated Resources",
      description: "No noisy neighbors. Get guaranteed CPU and RAM allocation for consistent performance.",
      icon: Cpu,
    },
    {
      title: "Instant Provisioning",
      description: "Deploy new servers and services in seconds, not hours, with our automated orchestration.",
      icon: Server,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32">
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
        <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl opacity-50 translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl opacity-50 -translate-x-1/3 translate-y-1/4"></div>

        <div className="container mx-auto px-4 md:px-6 text-center">
          <Badge variant="secondary" className="mb-6 px-3 py-1 text-sm border-primary/20 bg-primary/10 text-primary">
            New: Next-Gen AMD EPYC™ Processors Available
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto mb-6">
            High-Performance <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
              Cloud Infrastructure
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Deploy, scale, and manage your applications with our developer-friendly cloud platform. Built for speed, security, and reliability.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base" onClick={() => onNavigate('/pricing')}>
              View Pricing
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base" onClick={() => onNavigate('/dashboard')}>
              Go to Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-secondary/30 border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Engineered for Excellence</h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to run production workloads at scale, included out of the box.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Choose the perfect plan for your needs. No hidden fees, cancel anytime.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-3">
              <span className={cn("text-sm font-medium", !isAnnual ? "text-foreground" : "text-muted-foreground")}>
                Monthly
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
                Annually
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5 bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/20">
                  Save 20%
                </Badge>
              </span>
            </div>
          </div>

          {/* Database Connection Warning */}
          {!IS_DB_CONNECTED && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-700 dark:text-yellow-400 p-4 rounded-lg flex items-start gap-3 mb-10 max-w-3xl mx-auto">
              <Database className="h-5 w-5 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold">Database Integration Not Connected</p>
                <p className="text-sm opacity-90">
                  The pricing plans below are using static placeholder data. To manage real hosting plans, connect a database from the Integrations tab.
                </p>
              </div>
            </div>
          )}

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                        ? "border-primary shadow-md md:-translate-y-2" 
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
                      {isAnnual && (
                        <p className="text-sm text-muted-foreground mt-2">
                          Billed {formatCurrency(plan.annualPrice)} yearly
                        </p>
                      )}
                    </CardHeader>
                    
                    <CardContent className="flex-1">
                      <ul className="space-y-3 mt-4">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-primary shrink-0" />
                            <span className="text-sm text-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        variant={plan.highlighted ? "default" : "outline"}
                        onClick={() => onNavigate('/pricing')}
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

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Ready to deploy your next big idea?
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-10">
            Join thousands of developers and businesses who trust NexusHost for their critical infrastructure.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="h-12 px-8 text-base font-semibold text-primary hover:bg-white"
            onClick={() => onNavigate('/dashboard')}
          >
            Create Free Account
          </Button>
        </div>
      </section>
    </div>
  );
}