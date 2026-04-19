import React from 'react';
import { 
  Server, 
  Shield, 
  Globe, 
  Cpu, 
  Cloud, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Database, 
  Lock,
  Network
} from 'lucide-react';
import { cn } from '../utils';
import { Button } from './header'; // Reusing the Button component exported from header

export interface ServicesPageProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ServicesPage({ className, ...props }: ServicesPageProps) {
  const navigate = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const services = [
    {
      icon: <Cloud className="h-8 w-8" />,
      title: "Managed Cloud Hosting",
      description: "Fully managed, highly available cloud environments optimized for your specific workloads. We handle the infrastructure so you can focus on code.",
      features: ["Auto-scaling groups", "Automated backups", "24/7 monitoring", "Custom OS images"]
    },
    {
      icon: <Server className="h-8 w-8" />,
      title: "Bare Metal Servers",
      description: "Single-tenant physical servers providing raw performance and complete control. Ideal for resource-intensive applications and databases.",
      features: ["Latest gen processors", "NVMe SSD storage", "Up to 10Gbps network", "IPMI access"]
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Edge CDN",
      description: "Deliver content to your users with millisecond latency. Our global network spans 12 regions to ensure your application is always fast.",
      features: ["Static asset caching", "DDoS mitigation", "Custom SSL certificates", "Real-time analytics"]
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Managed Databases",
      description: "High-performance, fully managed database clusters. We support PostgreSQL, MySQL, and Redis with automated failover and point-in-time recovery.",
      features: ["Automated failover", "Read replicas", "Daily snapshots", "End-to-end encryption"]
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Advanced Security",
      description: "Enterprise-grade security solutions to protect your infrastructure from modern threats, including L3/L4 and L7 DDoS attacks.",
      features: ["Web Application Firewall", "Malware scanning", "Vulnerability assessments", "Compliance reporting"]
    },
    {
      icon: <Network className="h-8 w-8" />,
      title: "Private Networking",
      description: "Secure, isolated networks for your infrastructure. Connect your servers and databases without exposing them to the public internet.",
      features: ["VPC peering", "IPsec VPNs", "Custom routing", "Bandwidth pooling"]
    }
  ];

  return (
    <div className={cn("flex flex-col min-h-screen pt-20", className)} {...props}>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
              <Cpu className="mr-2 h-4 w-4" />
              Infrastructure Solutions
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight lg:text-7xl">
              Services engineered for <span className="text-gradient">scale</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              From high-performance bare metal to fully managed cloud environments, we provide the foundation your applications need to thrive.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button 
                size="lg" 
                className="w-full sm:w-auto"
                onClick={(e) => navigate(e, '/pricing')}
              >
                View Pricing
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto"
                onClick={(e) => navigate(e, '/contact')}
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Grid */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Comprehensive Cloud Solutions</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to build, deploy, and scale your applications globally.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="group bg-card text-card-foreground rounded-xl border border-border p-8 shadow-sm hover:shadow-md transition-all hover:border-primary/50 flex flex-col h-full"
              >
                <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>
                <ul className="space-y-3 mt-auto pt-6 border-t border-border/50">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start text-sm">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-3 shrink-0" />
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-blue-400/20 rounded-2xl blur-2xl opacity-50" />
              <img 
                src="https://placehold.co/800x600.png?text=Server+Architecture" 
                alt="Server Architecture Diagram" 
                className="relative rounded-xl border border-border shadow-2xl object-cover w-full h-auto"
              />
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-xl p-6 shadow-xl hidden md:block">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Network Capacity</p>
                    <p className="text-2xl font-bold">100 Tbps+</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8 order-1 lg:order-2">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Built on enterprise-grade hardware.
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We don't cut corners on infrastructure. Every server is provisioned with premium components to ensure maximum performance and reliability for your mission-critical applications.
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center text-primary font-semibold mb-2">
                    <Cpu className="h-5 w-5 mr-2" />
                    Processors
                  </div>
                  <p className="text-sm text-muted-foreground">Latest generation AMD EPYC™ and Intel® Xeon® Scalable processors.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-primary font-semibold mb-2">
                    <Database className="h-5 w-5 mr-2" />
                    Storage
                  </div>
                  <p className="text-sm text-muted-foreground">100% Enterprise NVMe SSDs configured in RAID 10 for speed and redundancy.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-primary font-semibold mb-2">
                    <Network className="h-5 w-5 mr-2" />
                    Network
                  </div>
                  <p className="text-sm text-muted-foreground">Redundant 10Gbps uplinks per host with premium Tier 1 transit providers.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-primary font-semibold mb-2">
                    <Lock className="h-5 w-5 mr-2" />
                    Security
                  </div>
                  <p className="text-sm text-muted-foreground">Hardware-level isolation and automated inline DDoS mitigation up to 2Tbps.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border bg-primary/5">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Ready to upgrade your infrastructure?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Join thousands of developers and businesses who trust NexusHost for their critical applications.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto"
              onClick={(e) => navigate(e, '/pricing')}
            >
              Deploy Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto bg-background"
              onClick={(e) => navigate(e, '/contact')}
            >
              Talk to an Expert
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}