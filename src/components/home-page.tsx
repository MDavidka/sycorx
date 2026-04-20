x
import React, { useEffect, useState } from "react";
import { 
  Button, 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter, 
  Divider, 
  Chip, 
  Skeleton 
} from "@heroui/react";
import { 
  Check, 
  Server, 
  Zap, 
  Shield, 
  Globe, 
  Cpu, 
  HardDrive, 
  ArrowRight,
  Database
} from "lucide-react";
import { getHostingPlans, IS_DB_CONNECTED } from "../db";
import { HostingPlan } from "../types";
import { formatCurrency } from "../utils";

export function HomePage() {
  const [plans, setPlans] = useState<HostingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPlans() {
      setIsLoading(true);
      try {
        const response = await getHostingPlans();
        if (response.data) {
          setPlans(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch hosting plans:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPlans();
  }, []);

  // SPA Navigation handler
  const navigateTo = (path: string) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate"));
  };

  const features = [
    { 
      icon: <Globe className="w-6 h-6 text-primary" />, 
      title: "Global Network", 
      desc: "Deploy your instances in 15+ regions worldwide for ultra-low latency and high availability." 
    },
    { 
      icon: <Zap className="w-6 h-6 text-primary" />, 
      title: "NVMe Storage", 
      desc: "Lightning-fast read/write speeds with enterprise-grade NVMe SSDs included on all plans." 
    },
    { 
      icon: <Shield className="w-6 h-6 text-primary" />, 
      title: "DDoS Protection", 
      desc: "Always-on, automated mitigation to keep your applications online and secure from attacks." 
    },
    { 
      icon: <Server className="w-6 h-6 text-primary" />, 
      title: "99.99% Uptime", 
      desc: "Backed by our industry-leading Service Level Agreement for mission-critical workloads." 
    },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
        
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Chip 
            color="primary" 
            variant="flat" 
            className="mb-8 border-primary/20"
            startContent={<Zap className="w-4 h-4 ml-1" />}
          >
            New: Dedicated Cloud Instances Available
          </Chip>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-foreground">
            High-Performance <br className="hidden md:block" />
            <span className="text-gradient">Cloud Infrastructure</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Deploy, scale, and manage your applications with ease on our globally distributed network. Built for developers, trusted by enterprises.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              color="primary" 
              size="lg" 
              endContent={<ArrowRight className="w-4 h-4" />} 
              onClick={() => navigateTo('/login')}
              className="w-full sm:w-auto font-medium"
            >
              Deploy Now
            </Button>
            <Button 
              variant="bordered" 
              size="lg" 
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto font-medium border-border/50 hover:bg-secondary/50"
            >
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-secondary/20 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Engineered for Performance</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to run production workloads at scale, included out of the box.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-background/50 border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardBody className="p-6 text-left">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your workload. No hidden fees, cancel anytime.
            </p>
          </div>

          {!IS_DB_CONNECTED && (
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between max-w-5xl mx-auto gap-4">
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-amber-500 shrink-0" />
                <p className="text-sm text-amber-600 dark:text-amber-400">
                  <strong>Demo Mode:</strong> Database integration is not connected. Displaying mock pricing data. Connect a database in the Integrations tab to enable live data.
                </p>
              </div>
              <Button size="sm" color="warning" variant="flat" className="shrink-0 font-medium">
                Connect Database
              </Button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {isLoading ? (
              // Loading Skeletons
              Array(3).fill(0).map((_, i) => (
                <Card key={i} className="h-[550px] border-border/50 bg-background/50">
                  <CardHeader className="flex-col items-start px-6 pt-8 pb-4 gap-3">
                    <Skeleton className="w-3/4 h-8 rounded-lg" />
                    <Skeleton className="w-full h-4 rounded-lg" />
                    <Skeleton className="w-1/2 h-10 rounded-lg mt-4" />
                  </CardHeader>
                  <Divider className="opacity-50" />
                  <CardBody className="px-6 py-6 gap-4">
                    <Skeleton className="w-full h-20 rounded-lg" />
                    <Skeleton className="w-full h-4 rounded-lg" />
                    <Skeleton className="w-full h-4 rounded-lg" />
                    <Skeleton className="w-full h-4 rounded-lg" />
                  </CardBody>
                  <CardFooter className="px-6 pb-8 pt-0">
                    <Skeleton className="w-full h-12 rounded-lg" />
                  </CardFooter>
                </Card>
              ))
            ) : (
              // Actual Pricing Cards
              plans.map(plan => (
                <Card 
                  key={plan.id} 
                  className={`relative flex flex-col h-full ${
                    plan.isPopular 
                      ? 'border-primary shadow-lg shadow-primary/10 scale-100 md:scale-105 z-10' 
                      : 'border-border/50 bg-background/50'
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                      <Chip color="primary" className="font-medium shadow-sm">Most Popular</Chip>
                    </div>
                  )}
                  
                  <CardHeader className="flex-col items-start px-6 pt-8 pb-6">
                    <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm mt-2 min-h-[40px]">{plan.description}</p>
                    <div className="mt-6 flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-foreground">{formatCurrency(plan.priceMonthly)}</span>
                      <span className="text-muted-foreground font-medium">/mo</span>
                    </div>
                  </CardHeader>
                  
                  <Divider className={plan.isPopular ? "bg-primary/20" : "bg-border/50"} />
                  
                  <CardBody className="px-6 py-8 grow">
                    <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-8 p-4 rounded-lg bg-secondary/30 border border-border/50">
                      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Cpu className="w-4 h-4 text-primary" /> {plan.specs.vCpu} vCPU
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <HardDrive className="w-4 h-4 text-primary" /> {plan.specs.ramGb}GB RAM
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Server className="w-4 h-4 text-primary" /> {plan.specs.storageGb}GB NVMe
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Globe className="w-4 h-4 text-primary" /> {plan.specs.bandwidthTb}TB Transfer
                      </div>
                    </div>
                    
                    <ul className="space-y-4">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <Check className="w-5 h-5 text-primary shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardBody>
                  
                  <CardFooter className="px-6 pb-8 pt-0 mt-auto">
                    <Button 
                      color={plan.isPopular ? "primary" : "default"} 
                      variant={plan.isPopular ? "solid" : "bordered"} 
                      className={`w-full font-medium text-md h-12 ${!plan.isPopular && 'border-border/50 hover:bg-secondary/50'}`}
                      onClick={() => navigateTo('/login')}
                    >
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary/5 border-t border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://placehold.co/1920x1080/000000/111111.png?text=Grid')] opacity-5 mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">Ready to scale your infrastructure?</h2>
          <p className="text-xl text-muted-foreground mb-10">
            Join thousands of developers building the future on ModernHosting. Create an account and deploy your first instance in under 60 seconds.
          </p>
          <Button 
            color="primary" 
            size="lg" 
            className="font-medium px-8"
            onClick={() => navigateTo('/login')}
          >
            Create Free Account
          </Button>
        </div>
      </section>
    </div>
  );
}