import React, { useEffect, useState } from 'react';
import { 
  Button, 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter, 
  Chip, 
  Divider,
  Switch,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Accordion,
  AccordionItem,
  Spinner
} from '@heroui/react';
import { HostingPlan } from '../types';
import { getHostingPlans, IS_DB_CONNECTED } from '../db';
import { formatCurrency } from '../utils';

export interface PricingPageProps {
  onNavigate: (path: string) => void;
}

// Comprehensive fallback data for the pricing page
const fallbackPlans: HostingPlan[] = [
  {
    id: 'plan_shared_1',
    name: 'Starter',
    type: 'Shared',
    priceMonthly: 5.99,
    priceYearly: 59.99,
    description: 'Perfect for personal blogs and small projects.',
    features: ['1 Website', '10GB NVMe Storage', 'Free SSL', 'Unmetered Bandwidth', 'Weekly Backups'],
    specs: { cpu: '1 Core', ram: '1 GB', storage: '10 GB', bandwidth: 'Unmetered' }
  },
  {
    id: 'plan_vps_1',
    name: 'Professional',
    type: 'VPS',
    priceMonthly: 19.99,
    priceYearly: 199.99,
    description: 'Dedicated resources for growing businesses.',
    features: ['Unlimited Websites', '50GB NVMe Storage', 'Dedicated IP', 'Root Access', 'Daily Backups'],
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
    features: ['Full Server Control', '500GB NVMe Storage', 'Advanced DDoS Protection', '24/7 Priority Support', 'Real-time Backups'],
    specs: { cpu: '8 Cores', ram: '32 GB', storage: '500 GB', bandwidth: '10 TB' }
  }
];

const faqs = [
  {
    question: "Can I upgrade or downgrade my plan later?",
    answer: "Yes, you can scale your resources up or down at any time directly from your dashboard. Prorated charges or credits will be applied automatically to your account."
  },
  {
    question: "Do you offer a money-back guarantee?",
    answer: "We offer a 30-day money-back guarantee on all Shared and VPS hosting plans. If you're not satisfied, simply cancel within the first 30 days for a full refund."
  },
  {
    question: "What kind of support do you provide?",
    answer: "All plans include 24/7 ticket-based support. Professional and Enterprise plans include priority routing, and Enterprise includes dedicated account management."
  },
  {
    question: "Where are your data centers located?",
    answer: "We have data centers in New York, London, Frankfurt, Singapore, and Tokyo. You can choose your preferred region during the deployment process."
  }
];

export function PricingPage({ onNavigate }: PricingPageProps): JSX.Element {
  const [plans, setPlans] = useState<HostingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isYearly, setIsYearly] = useState(false);

  useEffect(() => {
    async function loadPlans() {
      setIsLoading(true);
      if (IS_DB_CONNECTED) {
        try {
          const response = await getHostingPlans();
          if (response.documents && response.documents.length > 0) {
            setPlans(response.documents);
          } else {
            setPlans(fallbackPlans);
          }
        } catch (error) {
          console.error("Failed to load plans:", error);
          setPlans(fallbackPlans);
        }
      } else {
        setPlans(fallbackPlans);
      }
      setIsLoading(false);
    }

    loadPlans();
  }, []);

  // Helper to render checkmarks or text for the comparison table
  const renderFeatureCell = (plan: HostingPlan, featureName: string) => {
    const hasFeature = plan.features.some(f => f.toLowerCase().includes(featureName.toLowerCase()));
    if (hasFeature) {
      return (
        <svg className="w-5 h-5 text-[#64FFDA] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    }
    return <span className="text-[#8892B0]">-</span>;
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#0A192F]">
      {/* Header Section */}
      <section className="pt-32 pb-16 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-[#CCD6F6]">
          Simple, transparent pricing
        </h1>
        <p className="text-xl text-[#8892B0] mb-10 leading-relaxed">
          No hidden fees. No surprise charges. Choose the plan that best fits your needs and scale as you grow.
        </p>

        {!IS_DB_CONNECTED && (
          <div className="inline-block bg-[#233554]/50 border border-[#f1c40f]/30 rounded-lg p-4 mb-10 text-left">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-[#f1c40f] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="text-[#CCD6F6] font-semibold mb-1">Database Not Connected</h4>
                <p className="text-[#8892B0] text-sm">
                  Viewing static preview data. Connect your MongoDB integration to enable live pricing management.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-center gap-4 mb-16">
          <span className={`text-lg font-medium ${!isYearly ? 'text-[#CCD6F6]' : 'text-[#8892B0]'}`}>Monthly</span>
          <Switch 
            isSelected={isYearly} 
            onValueChange={setIsYearly}
            color="primary"
            classNames={{
              wrapper: "bg-[#233554] group-data-[selected=true]:bg-[#64FFDA]",
            }}
            aria-label="Toggle yearly billing"
          />
          <div className="flex items-center gap-2">
            <span className={`text-lg font-medium ${isYearly ? 'text-[#CCD6F6]' : 'text-[#8892B0]'}`}>Yearly</span>
            <Chip color="primary" variant="flat" size="sm" className="bg-[#64FFDA]/10 text-[#64FFDA] border border-[#64FFDA]/20">
              Save 20%
            </Chip>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-6 pb-24 max-w-7xl mx-auto w-full">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Spinner size="lg" color="primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`bg-[#112240] border ${plan.isPopular ? 'border-[#64FFDA] shadow-[0_0_30px_rgba(100,255,218,0.1)]' : 'border-[#233554]'} relative overflow-visible flex flex-col h-full`}
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
                <CardBody className="px-8 py-6 flex-grow">
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-5xl font-bold text-[#CCD6F6]">
                      {formatCurrency(isYearly ? plan.priceYearly / 12 : plan.priceMonthly)}
                    </span>
                    <span className="text-[#8892B0]">/mo</span>
                  </div>
                  {isYearly && (
                    <p className="text-[#64FFDA] text-sm mb-4 font-medium">
                      Billed {formatCurrency(plan.priceYearly)} yearly
                    </p>
                  )}
                  {!isYearly && <div className="h-5 mb-4" /> /* Spacer to keep cards aligned */}
                  
                  <Divider className="bg-[#233554] mb-6" />
                  
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-[#CCD6F6]">
                      <svg className="w-5 h-5 text-[#64FFDA] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-medium">{plan.specs?.cpu} CPU</span>
                    </li>
                    <li className="flex items-center gap-3 text-[#CCD6F6]">
                      <svg className="w-5 h-5 text-[#64FFDA] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-medium">{plan.specs?.ram} RAM</span>
                    </li>
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-[#CCD6F6]">
                        <svg className="w-5 h-5 text-[#64FFDA] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardBody>
                <CardFooter className="px-8 pb-8 pt-0 mt-auto">
                  <Button 
                    className={`w-full font-semibold ${plan.isPopular ? 'bg-[#64FFDA] text-[#0A192F]' : 'bg-[#233554] text-[#CCD6F6] hover:bg-[#2a4066]'}`}
                    size="lg"
                    onPress={() => onNavigate('/register')}
                  >
                    Deploy Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Detailed Comparison Table */}
      {!isLoading && plans.length > 0 && (
        <section className="py-24 bg-[#112240]/30 border-y border-[#233554]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#CCD6F6] mb-4">Compare Features</h2>
              <p className="text-[#8892B0]">A detailed breakdown of what's included in each plan.</p>
            </div>

            <Table 
              aria-label="Detailed feature comparison table"
              classNames={{
                base: "max-w-full overflow-x-auto",
                table: "min-w-full",
                wrapper: "bg-[#112240] border border-[#233554] p-0 rounded-xl overflow-hidden shadow-none",
                th: "bg-[#0A192F] text-[#CCD6F6] font-semibold text-sm py-4 px-6 border-b border-[#233554]",
                td: "py-4 px-6 border-b border-[#233554]/50 text-[#8892B0]",
              }}
            >
              <TableHeader>
                <TableColumn className="w-1/4">Overview</TableColumn>
                {plans.map(plan => (
                  <TableColumn key={plan.id} className="text-center w-1/4">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-lg text-[#CCD6F6]">{plan.name}</span>
                      <span className="text-xs text-[#64FFDA] font-normal">{plan.type}</span>
                    </div>
                  </TableColumn>
                ))}
              </TableHeader>
              <TableBody>
                {/* Hardware Specs */}
                <TableRow key="header-hardware" className="bg-[#0A192F]/50">
                  <TableCell className="font-semibold text-[#CCD6F6]">Hardware</TableCell>
                  {plans.map(plan => <TableCell key={`hw-${plan.id}`} />)}
                </TableRow>
                <TableRow key="cpu">
                  <TableCell>CPU Cores</TableCell>
                  {plans.map(plan => <TableCell key={`cpu-${plan.id}`} className="text-center font-medium text-[#CCD6F6]">{plan.specs?.cpu || '-'}</TableCell>)}
                </TableRow>
                <TableRow key="ram">
                  <TableCell>Memory (RAM)</TableCell>
                  {plans.map(plan => <TableCell key={`ram-${plan.id}`} className="text-center font-medium text-[#CCD6F6]">{plan.specs?.ram || '-'}</TableCell>)}
                </TableRow>
                <TableRow key="storage">
                  <TableCell>NVMe Storage</TableCell>
                  {plans.map(plan => <TableCell key={`storage-${plan.id}`} className="text-center font-medium text-[#CCD6F6]">{plan.specs?.storage || '-'}</TableCell>)}
                </TableRow>
                <TableRow key="bandwidth">
                  <TableCell>Bandwidth</TableCell>
                  {plans.map(plan => <TableCell key={`bw-${plan.id}`} className="text-center font-medium text-[#CCD6F6]">{plan.specs?.bandwidth || '-'}</TableCell>)}
                </TableRow>

                {/* Features */}
                <TableRow key="header-features" className="bg-[#0A192F]/50">
                  <TableCell className="font-semibold text-[#CCD6F6]">Features</TableCell>
                  {plans.map(plan => <TableCell key={`feat-${plan.id}`} />)}
                </TableRow>
                <TableRow key="ssl">
                  <TableCell>Free SSL Certificate</TableCell>
                  {plans.map(plan => <TableCell key={`ssl-${plan.id}`} className="text-center">{renderFeatureCell(plan, 'SSL')}</TableCell>)}
                </TableRow>
                <TableRow key="ip">
                  <TableCell>Dedicated IP</TableCell>
                  {plans.map(plan => <TableCell key={`ip-${plan.id}`} className="text-center">{renderFeatureCell(plan, 'Dedicated IP')}</TableCell>)}
                </TableRow>
                <TableRow key="root">
                  <TableCell>Root Access</TableCell>
                  {plans.map(plan => <TableCell key={`root-${plan.id}`} className="text-center">{renderFeatureCell(plan, 'Root Access') || renderFeatureCell(plan, 'Full Server Control')}</TableCell>)}
                </TableRow>
                <TableRow key="ddos">
                  <TableCell>DDoS Protection</TableCell>
                  {plans.map(plan => <TableCell key={`ddos-${plan.id}`} className="text-center">
                    <svg className="w-5 h-5 text-[#64FFDA] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </TableCell>)}
                </TableRow>
                <TableRow key="backups">
                  <TableCell>Automated Backups</TableCell>
                  {plans.map(plan => (
                    <TableCell key={`backup-${plan.id}`} className="text-center text-[#CCD6F6]">
                      {plan.features.find(f => f.toLowerCase().includes('backup')) || 'Add-on'}
                    </TableCell>
                  ))}
                </TableRow>
                
                {/* Support */}
                <TableRow key="header-support" className="bg-[#0A192F]/50">
                  <TableCell className="font-semibold text-[#CCD6F6]">Support</TableCell>
                  {plans.map(plan => <TableCell key={`sup-${plan.id}`} />)}
                </TableRow>
                <TableRow key="sla">
                  <TableCell>Uptime SLA</TableCell>
                  {plans.map(plan => <TableCell key={`sla-${plan.id}`} className="text-center text-[#CCD6F6]">99.99%</TableCell>)}
                </TableRow>
                <TableRow key="support-tier">
                  <TableCell>Support Tier</TableCell>
                  {plans.map(plan => (
                    <TableCell key={`suptier-${plan.id}`} className="text-center text-[#CCD6F6]">
                      {plan.type === 'Dedicated' ? 'Priority 24/7' : 'Standard 24/7'}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-24 max-w-3xl mx-auto px-6 w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#CCD6F6] mb-4">Frequently Asked Questions</h2>
          <p className="text-[#8892B0]">Everything you need to know about our hosting plans.</p>
        </div>

        <Accordion variant="splitted" className="gap-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              aria-label={faq.question} 
              title={<span className="text-[#CCD6F6] font-medium">{faq.question}</span>}
              className="bg-[#112240] border border-[#233554] shadow-none"
            >
              <p className="text-[#8892B0] pb-4 leading-relaxed">
                {faq.answer}
              </p>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 text-center px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#CCD6F6] mb-6">Still have questions?</h2>
        <p className="text-[#8892B0] mb-8 max-w-xl mx-auto">
          Our cloud experts are available 24/7 to help you choose the perfect infrastructure for your specific needs.
        </p>
        <Button 
          variant="bordered" 
          size="lg" 
          className="border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA]/10 font-medium"
          onPress={() => onNavigate('/contact')}
        >
          Contact Sales
        </Button>
      </section>
    </div>
  );
}