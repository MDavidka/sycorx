import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Button, 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter, 
  Chip, 
  Divider, 
  Spinner,
  Image
} from '@heroui/react';
import { 
  Zap, 
  Shield, 
  Globe, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Server,
  Cpu
} from 'lucide-react';
import { getHostingPlans } from '../db';
import { HostingPlan } from '../types';
import { formatCurrency } from '../utils';

export function HomePage(): JSX.Element {
  const [plans, setPlans] = useState<HostingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getHostingPlans();
        setPlans(data.slice(0, 3)); // Only show top 3 plans on home page
      } catch (error) {
        console.error("Failed to fetch plans:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const features = [
    {
      icon: <Zap className="text-warning" size={28} />,
      title: "Lightning Fast NVMe",
      description: "Experience up to 10x faster read/write speeds with our enterprise-grade NVMe storage arrays."
    },
    {
      icon: <Shield className="text-success" size={28} />,
      title: "Advanced DDoS Protection",
      description: "Always-on mitigation keeps your applications online and secure against malicious traffic."
    },
    {
      icon: <Globe className="text-primary" size={28} />,
      title: "Global Edge Network",
      description: "Deploy your instances in 15+ regions worldwide for minimal latency to your users."
    },
    {
      icon: <Clock className="text-secondary" size={28} />,
      title: "99.99% Uptime SLA",
      description: "We guarantee your services stay online with our financially backed service level agreement."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-50 dark:opacity-20"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-50 dark:opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <Chip 
            color="primary" 
            variant="flat" 
            className="mb-8"
            startContent={<Zap size={14} />}
          >
            New: Gen 4 EPYC Processors Now Available
          </Chip>
          
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold tracking-tight mb-6 text-foreground">
            Cloud Hosting Built for <br className="hidden md:block" />
            <span className="text-gradient">Maximum Performance</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            Deploy scalable, secure, and blazing-fast infrastructure in seconds. 
            Nivle provides the foundation your applications need to thrive globally.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              as={RouterLink} 
              to="/pricing" 
              color="primary" 
              size="lg" 
              variant="shadow"
              className="w-full sm:w-auto font-semibold px-8"
              endContent={<ArrowRight size={18} />}
            >
              View Pricing
            </Button>
            <Button 
              as={RouterLink} 
              to="/contact" 
              color="secondary" 
              size="lg" 
              variant="bordered"
              className="w-full sm:w-auto font-semibold px-8 bg-background/50 backdrop-blur-sm"
            >
              Talk to Sales
            </Button>
          </div>

          {/* Dashboard Preview Image Placeholder */}
          <div className="mt-20 relative mx-auto max-w-5xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-20"></div>
            <Card className="relative bg-background/80 backdrop-blur-xl border border-border shadow-2xl">
              <CardBody className="p-2">
                <Image 
                  src="https://placehold.co/1200x600.png?text=Nivle+Dashboard+Preview" 
                  alt="Nivle Dashboard Interface" 
                  className="rounded-lg w-full object-cover"
                />
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-surface/50 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Everything you need to scale</h2>
            <p className="text-muted max-w-2xl mx-auto">
              Our platform is engineered from the ground up to provide unmatched reliability, 
              security, and speed for your mission-critical workloads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-background border-none shadow-sm hover:shadow-md transition-shadow">
                <CardBody className="p-6 flex flex-col gap-4">
                  <div className="bg-surface w-14 h-14 rounded-xl flex items-center justify-center border border-border">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Plans Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-muted max-w-2xl mx-auto">
              Choose the perfect plan for your needs. No hidden fees, no surprise renewals.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Spinner size="lg" color="primary" label="Loading plans..." />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan) => (
                <Card 
                  key={plan._id} 
                  className={`flex flex-col relative ${plan.isPopular ? 'border-primary shadow-lg shadow-primary/10 scale-105 z-10' : 'border-border'}`}
                >
                  {plan.isPopular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <Chip color="primary" variant="shadow" className="font-semibold px-4">
                        Most Popular
                      </Chip>
                    </div>
                  )}
                  
                  <CardHeader className="flex flex-col items-start p-6 pb-0 gap-2">
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <p className="text-muted text-sm">{plan.description}</p>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold">{formatCurrency(plan.price)}</span>
                      <span className="text-muted">/mo</span>
                    </div>
                  </CardHeader>
                  
                  <CardBody className="p-6">
                    <Divider className="mb-6" />
                    
                    <div className="flex flex-col gap-4 mb-6">
                      <div className="flex items-center gap-3 text-sm">
                        <Cpu size={18} className="text-muted" />
                        <span className="font-medium">{plan.cpu}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Server size={18} className="text-muted" />
                        <span className="font-medium">{plan.ram} RAM</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Zap size={18} className="text-muted" />
                        <span className="font-medium">{plan.storage}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Globe size={18} className="text-muted" />
                        <span className="font-medium">{plan.bandwidth} Bandwidth</span>
                      </div>
                    </div>

                    <Divider className="mb-6" />

                    <ul className="flex flex-col gap-3">
                      {plan.features.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm">
                          <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardBody>
                  
                  <CardFooter className="p-6 pt-0 mt-auto">
                    <Button 
                      as={RouterLink}
                      to="/pricing"
                      color={plan.isPopular ? "primary" : "default"} 
                      variant={plan.isPopular ? "shadow" : "flat"}
                      className="w-full font-semibold"
                      size="lg"
                    >
                      Select Plan
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Button 
              as={RouterLink} 
              to="/pricing" 
              variant="light" 
              color="primary"
              endContent={<ArrowRight size={16} />}
            >
              Compare all features and plans
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://placehold.co/1920x1080.png?text=Pattern')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-white">
            Ready to deploy your next big idea?
          </h2>
          <p className="text-primary-100 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of developers and businesses who trust Nivle for their critical infrastructure. 
            Get started in less than 60 seconds.
          </p>
          <Button 
            as={RouterLink} 
            to="/pricing" 
            size="lg" 
            className="bg-white text-primary font-bold px-10 hover:bg-gray-100"
          >
            Create Free Account
          </Button>
        </div>
      </section>
    </div>
  );
}