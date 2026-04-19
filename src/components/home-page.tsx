x
import React from 'react';
import { ArrowRight, CheckCircle2, Cloud, Cpu, Globe, Shield, Zap, Server, Activity } from 'lucide-react';
import { cn } from '../utils';
import { Button } from './header';

// --- Inline shadcn/ui Primitives ---
// Defining these inline ensures the component is fully functional and styled correctly
// without relying on external UI files that may not exist in the current tree.

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

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
      secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
      destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
      outline: "text-foreground",
    };
    
    return (
      <div 
        ref={ref} 
        className={cn(
          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", 
          variants[variant],
          className
        )} 
        {...props} 
      />
    );
  }
);
Badge.displayName = "Badge";

// --- Main Component ---

export interface HomePageProps {
  onNavigate?: (path: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const features = [
    {
      title: "Global Edge Network",
      description: "Deploy your applications closer to your users with our strategically located data centers across 15+ regions worldwide.",
      icon: <Globe className="h-6 w-6 text-primary" />,
    },
    {
      title: "High-Performance Compute",
      description: "Powered by the latest generation AMD EPYC™ processors and NVMe SSDs for unparalleled speed and reliability.",
      icon: <Cpu className="h-6 w-6 text-primary" />,
    },
    {
      title: "99.99% Uptime SLA",
      description: "We guarantee your services stay online. Our redundant infrastructure ensures maximum availability for mission-critical apps.",
      icon: <Activity className="h-6 w-6 text-primary" />,
    },
    {
      title: "Advanced DDoS Protection",
      description: "Enterprise-grade mitigation included free with all plans. We automatically detect and block malicious traffic.",
      icon: <Shield className="h-6 w-6 text-primary" />,
    },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$5",
      description: "Perfect for personal projects and small websites.",
      features: ["1 vCPU", "1 GB RAM", "25 GB NVMe SSD", "1 TB Bandwidth", "Automated Backups"],
      isPopular: false,
    },
    {
      name: "Professional",
      price: "$20",
      description: "Ideal for growing businesses and production apps.",
      features: ["2 vCPUs", "4 GB RAM", "80 GB NVMe SSD", "4 TB Bandwidth", "Priority Support"],
      isPopular: true,
    },
    {
      name: "Enterprise",
      price: "$80",
      description: "Dedicated resources for high-traffic applications.",
      features: ["8 vCPUs", "16 GB RAM", "320 GB NVMe SSD", "10 TB Bandwidth", "24/7 Phone Support"],
      isPopular: false,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 lg:pt-36 lg:pb-28">
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
          <div className="w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50"></div>
        </div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3">
          <div className="w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-50"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 text-center">
          <Badge variant="outline" className="mb-6 border-primary/30 bg-primary/5 text-primary px-4 py-1.5 text-sm">
            <Zap className="w-4 h-4 mr-2 inline-block" />
            New: Global Edge Network Now Live
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto">
            High-Performance <br className="hidden md:block" />
            <span className="text-gradient">Cloud Infrastructure</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Deploy, scale, and manage your applications with our lightning-fast global network. Built for developers who demand reliability, speed, and simplicity.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              className="w-full sm:w-auto h-12 px-8 text-base font-medium shadow-lg shadow-primary/25" 
              onClick={() => onNavigate?.('/pricing')}
            >
              Deploy Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              className="w-full sm:w-auto h-12 px-8 text-base font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground" 
              onClick={() => onNavigate?.('/about')}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30 border-y border-border/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Everything you need to scale</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Our platform provides all the tools and infrastructure required to run production workloads with absolute confidence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors duration-300">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Simple, transparent pricing</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              No hidden fees. Predictable costs as you scale your infrastructure from side project to enterprise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={cn(
                  "relative flex flex-col",
                  plan.isPopular ? "border-primary shadow-md shadow-primary/10 scale-105 z-10" : "border-border/50"
                )}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Badge className="bg-primary text-primary-foreground px-3 py-1 text-xs uppercase tracking-wider font-bold">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8 pt-8">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-extrabold">{plan.price}</span>
                    <span className="text-muted-foreground font-medium">/mo</span>
                  </div>
                  <CardDescription className="mt-4">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-4">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-3 text-sm font-medium">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-6 pb-8">
                  <Button 
                    className={cn(
                      "w-full h-12 text-base font-medium",
                      !plan.isPopular && "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    )}
                    onClick={() => onNavigate?.('/pricing')}
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Ready to deploy your next big idea?</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg md:text-xl mb-10">
            Join thousands of developers building the future on NexusHost. Create an account today and get $100 in free credits.
          </p>
          <Button 
            className="bg-background text-foreground hover:bg-background/90 h-14 px-10 text-lg font-semibold shadow-xl"
            onClick={() => onNavigate?.('/dashboard')}
          >
            Create Free Account
          </Button>
        </div>
      </section>
    </div>
  );
}