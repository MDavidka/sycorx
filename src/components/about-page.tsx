import React from 'react';
import { 
  Server, 
  Shield, 
  Zap, 
  Users, 
  Globe, 
  Award, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { cn } from '../utils';

export interface AboutPageProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AboutPage({ className, ...props }: AboutPageProps) {
  return (
    <div className={cn("flex flex-col min-h-screen pt-20", className)} {...props}>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
              <Award className="mr-2 h-4 w-4" />
              Our Story
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight lg:text-7xl">
              Building the future of <span className="text-gradient">cloud infrastructure</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              NexusHost was founded with a simple mission: to provide developers and businesses with high-performance, reliable, and scalable hosting solutions without the complexity.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-foreground">99.99%</h3>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Uptime SLA</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-foreground">50k+</h3>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Active Servers</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-foreground">12</h3>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Global Regions</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold text-foreground">24/7</h3>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Expert Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Empowering innovators to build without limits.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that infrastructure should be invisible. You shouldn't have to worry about server maintenance, network latency, or scaling bottlenecks. Our platform is designed to handle the heavy lifting so you can focus on what matters most: writing great code and growing your business.
              </p>
              <ul className="space-y-4 pt-4">
                {[
                  "Built for developers, by developers",
                  "Enterprise-grade hardware at accessible prices",
                  "Commitment to open-source technologies",
                  "Sustainable and carbon-neutral data centers"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-primary mr-3 shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-blue-400/20 rounded-2xl blur-2xl opacity-50" />
              <img 
                src="https://placehold.co/800x600.png?text=Data+Center+Operations" 
                alt="NexusHost Data Center" 
                className="relative rounded-xl border border-border shadow-2xl object-cover w-full h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Core Values</h2>
            <p className="text-lg text-muted-foreground">
              These principles guide everything we do, from engineering our platform to supporting our customers.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Value Card 1 */}
            <div className="bg-card text-card-foreground rounded-xl border border-border p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Performance First</h3>
              <p className="text-muted-foreground leading-relaxed">
                We obsess over milliseconds. From NVMe storage to premium tier networks, every component is optimized for maximum speed.
              </p>
            </div>

            {/* Value Card 2 */}
            <div className="bg-card text-card-foreground rounded-xl border border-border p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Uncompromising Security</h3>
              <p className="text-muted-foreground leading-relaxed">
                Security isn't an afterthought. It's built into the foundation of our platform with automated DDoS protection and isolated environments.
              </p>
            </div>

            {/* Value Card 3 */}
            <div className="bg-card text-card-foreground rounded-xl border border-border p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Customer Obsession</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your success is our success. Our support team consists of actual engineers who are ready to help you solve complex problems 24/7.
              </p>
            </div>

            {/* Value Card 4 */}
            <div className="bg-card text-card-foreground rounded-xl border border-border p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Global Reach</h3>
              <p className="text-muted-foreground leading-relaxed">
                Deploy your applications closer to your users. We continuously expand our global footprint to reduce latency worldwide.
              </p>
            </div>

            {/* Value Card 5 */}
            <div className="bg-card text-card-foreground rounded-xl border border-border p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <Server className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Reliability</h3>
              <p className="text-muted-foreground leading-relaxed">
                We build for fault tolerance. Our redundant infrastructure ensures your applications stay online even when hardware fails.
              </p>
            </div>

            {/* Value Card 6 */}
            <div className="bg-card text-card-foreground rounded-xl border border-border p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center items-center text-center bg-primary/5 border-primary/20">
              <h3 className="text-xl font-semibold mb-3">Join Our Journey</h3>
              <p className="text-muted-foreground mb-6">
                Experience the difference of purpose-built cloud infrastructure.
              </p>
              <a 
                href="/pricing" 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({}, '', '/pricing');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
              >
                View Pricing <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Meet the Leadership</h2>
            <p className="text-lg text-muted-foreground">
              The experienced team driving our vision forward.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Sarah Jenkins", role: "Chief Executive Officer", img: "https://placehold.co/400x400.png?text=SJ" },
              { name: "David Chen", role: "Chief Technology Officer", img: "https://placehold.co/400x400.png?text=DC" },
              { name: "Elena Rodriguez", role: "VP of Engineering", img: "https://placehold.co/400x400.png?text=ER" },
              { name: "Marcus Johnson", role: "Head of Infrastructure", img: "https://placehold.co/400x400.png?text=MJ" }
            ].map((member, i) => (
              <div key={i} className="group flex flex-col items-center text-center space-y-4">
                <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-background shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                  <p className="text-primary font-medium">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}