import React, { useEffect, useState } from 'react';
import { 
  Button, 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter, 
  Chip, 
  Divider,
  Link
} from '@heroui/react';
import { HostingPlan } from '../types';
import { getHostingPlans, IS_DB_CONNECTED } from '../db';
import { formatCurrency } from '../utils';

export interface HomePageProps {
  onNavigate: (path: string) => void;
}

// Static fallback data to keep the UI functional when the database is not connected
const fallbackPlans: HostingPlan[] = [
  {
    id: 'plan_shared_1',
    name: 'Starter',
    type: 'Shared',
    priceMonthly: 5.99,
    priceYearly: 59.99,
    description: 'Perfect for personal blogs and small projects.',
    features: ['1 Website', '10GB NVMe Storage', 'Free SSL', 'Unmetered Bandwidth'],
    specs: { cpu: '1 Core', ram: '1 GB', storage: '10 GB', bandwidth: 'Unmetered' }
  },
  {
    id: 'plan_vps_1',
    name: 'Professional',
    type: 'VPS',
    priceMonthly: 19.99,
    priceYearly: 199.99,
    description: 'Dedicated resources for growing businesses.',
    features: ['Unlimited Websites', '50GB NVMe Storage', 'Dedicated IP', 'Root Access'],
    specs: { cpu: '2 Cores', ram: '4 GB', storage: '50 GB', bandwidth: '2 TB' },
    isPopular: true
  },
  {
    id: 'plan_dedi_1',
    name: 'Enterprise',
    type: 'Dedicated',
    priceMonthly: 99.99,
    priceYearly: 999.99,
    description: 'Bare metal performance for mission-critical apps.',
    features: ['Full Server Control', '500GB NVMe Storage', 'Advanced DDoS Protection', '24/7 Priority Support'],
    specs: { cpu: '8 Cores', ram: '32 GB', storage: '500 GB', bandwidth: '10 TB' }
  }
];

const features = [
  {
    title: 'Lightning Fast NVMe',
    description: 'Experience up to 20x faster read/write speeds with our enterprise-grade NVMe storage arrays.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: '99.99% Uptime SLA',
    description: 'Our redundant infrastructure ensures your applications stay online, backed by a strict SLA.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: 'Global Edge Network',
    description: 'Deploy your applications closer to your users with our strategically located global data centers.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )
  },
  {
    title: '24/7 Expert Support',
    description: 'Our team of cloud engineers is available around the clock to help you resolve any issues.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  }
];

export function HomePage({ onNavigate }: HomePageProps): JSX.Element {
  const [plans, setPlans] = useState<HostingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPlans() {
      setIsLoading(true);
      if (IS_DB_CONNECTED) {
        try {
          const response = await getHostingPlans();
          if (response.documents && response.documents.length > 0) {
            // Take top 3 plans for the homepage
            setPlans(response.documents.slice(0, 3));
          } else {
            setPlans(fallbackPlans);
          }
        } catch (error) {
          console.error("Failed to load plans:", error);
          setPlans(fallbackPlans);
        }
      } else {
        // Use static fallback data if DB is not connected
        setPlans(fallbackPlans);
      }
      setIsLoading(false);
    }

    loadPlans();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#64FFDA]/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Chip 
            color="primary" 
            variant="flat" 
            className="mb-8 bg-[#64FFDA]/10 text-[#64FFDA] border border-[#64FFDA]/20"
          >
            New: Global Edge Network Now Live
          </Chip>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-[#CCD6F6]">
            Infrastructure for the <br className="hidden md:block" />
            <span className="text-gradient">Modern Web</span>
          </h1>
          
          <p className="text-xl text-[#8892B0] max-w-2xl mx-auto mb-10 leading-relaxed">
            High-performance, reliable, and secure hosting infrastructure for developers and businesses of all sizes. Deploy in seconds, scale infinitely.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              color="primary" 
              className="w-full sm:w-auto font-semibold bg-[#64FFDA] text-[#0A192F] px-8"
              onPress={() => onNavigate('/pricing')}
            >
              View Pricing
            </Button>
            <Button 
              size="lg" 
              variant="bordered" 
              className="w-full sm:w-auto font-medium text-[#CCD6F6] border-[#233554] hover:bg-[#112240] px-8"
              onPress={() => onNavigate('/about')}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#112240]/30 border-y border-[#233554]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#CCD6F6] mb-4">
              Built for Performance & Reliability
            </h2>
            <p className="text-[#8892B0] max-w-2xl mx-auto text-lg">
              Everything you need to run your applications smoothly, without the headache of managing complex infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-[#112240] border-none shadow-none">
                <CardHeader className="flex gap-3 pt-6 px-6">
                  <div className="w-12 h-12 rounded-lg bg-[#64FFDA]/10 flex items-center justify-center text-[#64FFDA]">
                    {feature.icon}
                  </div>
                </CardHeader>
                <CardBody className="px-6 pb-6 pt-2">
                  <h3 className="text-xl font-semibold text-[#CCD6F6] mb-2">{feature.title}</h3>
                  <p className="text-[#8892B0] leading-relaxed">{feature.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Preview Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#CCD6F6] mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-[#8892B0] max-w-2xl mx-auto text-lg mb-6">
              Choose the perfect plan for your needs. No hidden fees, cancel anytime.
            </p>
            
            {!IS_DB_CONNECTED && (
              <div className="inline-block bg-[#233554]/50 border border-[#f1c40f]/30 rounded-lg p-4 max-w-2xl mx-auto mb-8">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#f1c40f] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-left">
                    <h4 className="text-[#CCD6F6] font-semibold mb-1">Database Not Connected</h4>
                    <p className="text-[#8892B0] text-sm">
                      You are currently viewing static preview data. To enable live pricing and dynamic plans, please connect your MongoDB integration in the Integrations tab.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`bg-[#112240] border ${plan.isPopular ? 'border-[#64FFDA]' : 'border-[#233554]'} relative overflow-visible`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Chip color="primary" className="bg-[#64FFDA] text-[#0A192F] font-bold shadow-lg">
                      Most Popular
                    </Chip>
                  </div>
                )}
                <CardHeader className="flex flex-col items-start px-8 pt-8 pb-0">
                  <p className="text-sm font-semibold text-[#64FFDA] uppercase tracking-wider mb-2">{plan.type}</p>
                  <h3 className="text-2xl font-bold text-[#CCD6F6] mb-2">{plan.name}</h3>
                  <p className="text-[#8892B0] text-sm h-10">{plan.description}</p>
                </CardHeader>
                <CardBody className="px-8 py-6">
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-bold text-[#CCD6F6]">{formatCurrency(plan.priceMonthly)}</span>
                    <span className="text-[#8892B0]">/mo</span>
                  </div>
                  <Divider className="bg-[#233554] mb-6" />
                  <ul className="space-y-4">
                    {plan.features.slice(0, 4).map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-[#CCD6F6]">
                        <svg className="w-5 h-5 text-[#64FFDA] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardBody>
                <CardFooter className="px-8 pb-8 pt-0">
                  <Button 
                    className={`w-full font-semibold ${plan.isPopular ? 'bg-[#64FFDA] text-[#0A192F]' : 'bg-[#233554] text-[#CCD6F6] hover:bg-[#2a4066]'}`}
                    size="lg"
                    onPress={() => onNavigate('/pricing')}
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              className="text-[#64FFDA] hover:text-[#52e0c4] font-medium cursor-pointer inline-flex items-center gap-2"
              onPress={() => onNavigate('/pricing')}
            >
              Compare all plans and features
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-[#0A192F] to-[#112240]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#CCD6F6] mb-6">
            Ready to deploy your next project?
          </h2>
          <p className="text-xl text-[#8892B0] mb-10">
            Join thousands of developers who trust nivle for their hosting needs. Get started in minutes.
          </p>
          <Button 
            size="lg" 
            color="primary" 
            className="font-bold bg-[#64FFDA] text-[#0A192F] px-10 py-6 text-lg shadow-[0_0_30px_rgba(100,255,218,0.3)] hover:shadow-[0_0_40px_rgba(100,255,218,0.5)] transition-shadow"
            onPress={() => onNavigate('/pricing')}
          >
            Create Your Account
          </Button>
        </div>
      </section>
    </div>
  );
}