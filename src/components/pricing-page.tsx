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
  Tabs,
  Tab,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Accordion,
  AccordionItem
} from '@heroui/react';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, Server, Cpu, Zap, Globe } from 'lucide-react';
import { getHostingPlans } from '../db';
import { HostingPlan, BillingCycle } from '../types';
import { formatCurrency } from '../utils';

export function PricingPage(): JSX.Element {
  const [plans, setPlans] = useState<HostingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getHostingPlans();
        // Sort plans by price to ensure logical ordering
        const sortedPlans = [...data].sort((a, b) => a.price - b.price);
        setPlans(sortedPlans);
      } catch (error) {
        console.error("Failed to fetch plans:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // Calculate price based on billing cycle (assume 2 months free for yearly)
  const getDisplayPrice = (basePrice: number) => {
    if (billingCycle === 'yearly') {
      return (basePrice * 10) / 12; // Monthly equivalent when billed yearly
    }
    return basePrice;
  };

  const comparisonFeatures = [
    { id: 'vcpu', feature: 'vCPU Cores', starter: '1 Core', pro: '4 Cores', enterprise: '8+ Cores' },
    { id: 'ram', feature: 'RAM', starter: '2 GB', pro: '8 GB', enterprise: '32+ GB' },
    { id: 'storage', feature: 'NVMe Storage', starter: '50 GB', pro: '200 GB', enterprise: '1 TB+' },
    { id: 'bandwidth', feature: 'Bandwidth', starter: '1 TB', pro: '5 TB', enterprise: 'Unmetered' },
    { id: 'ddos', feature: 'DDoS Protection', starter: 'Standard', pro: 'Advanced (L7)', enterprise: 'Enterprise Custom' },
    { id: 'backups', feature: 'Daily Backups', starter: false, pro: true, enterprise: true },
    { id: 'sla', feature: 'Uptime SLA', starter: '99.9%', pro: '99.99%', enterprise: '99.999%' },
    { id: 'support', feature: 'Support', starter: 'Ticket System', pro: 'Priority 24/7', enterprise: 'Dedicated Manager' },
  ];

  const faqs = [
    {
      question: "Can I upgrade or downgrade my plan later?",
      answer: "Yes, you can scale your resources up or down at any time directly from your dashboard. Prorated charges or credits will be applied automatically to your account."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and cryptocurrency (Bitcoin, Ethereum) for annual plans."
    },
    {
      question: "Is there a money-back guarantee?",
      answer: "We offer a 30-day money-back guarantee on all shared and VPS hosting plans. If you're not satisfied, cancel within the first 30 days for a full refund."
    },
    {
      question: "Do you provide automated backups?",
      answer: "Daily automated backups are included in our Pro and Enterprise plans. Starter plans include weekly backups, with the option to purchase daily backups as an add-on."
    }
  ];

  const renderFeatureValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <CheckCircle2 size={20} className="text-success mx-auto" />
      ) : (
        <XCircle size={20} className="text-muted mx-auto opacity-50" />
      );
    }
    return <span className="text-sm font-medium">{value}</span>;
  };

  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* Header Section */}
      <section className="pt-24 pb-16 px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
        <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-6">
          Transparent pricing for <br className="hidden md:block" />
          <span className="text-gradient">every stage of growth</span>
        </h1>
        <p className="text-lg text-muted max-w-2xl mx-auto mb-10">
          No hidden fees, no surprise renewals. Choose the perfect infrastructure 
          for your project and scale seamlessly as your traffic grows.
        </p>

        <div className="flex justify-center items-center mb-12">
          <Tabs 
            aria-label="Billing Cycle" 
            size="lg" 
            color="primary" 
            variant="bordered"
            selectedKey={billingCycle}
            onSelectionChange={(key) => setBillingCycle(key as BillingCycle)}
            classNames={{
              tabList: "bg-surface/50 backdrop-blur-md border-border",
              cursor: "bg-primary",
              tab: "px-6",
              tabContent: "group-data-[selected=true]:text-primary-foreground"
            }}
          >
            <Tab key="monthly" title="Monthly Billing" />
            <Tab 
              key="yearly" 
              title={
                <div className="flex items-center gap-2">
                  Annual Billing
                  <Chip size="sm" color="success" variant="flat" className="h-5 text-[10px] uppercase font-bold tracking-wider">
                    Save 20%
                  </Chip>
                </div>
              } 
            />
          </Tabs>
        </div>

        {/* Pricing Cards */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Spinner size="lg" color="primary" label="Loading pricing plans..." />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
            {plans.map((plan) => (
              <Card 
                key={plan._id} 
                className={`flex flex-col relative transition-all duration-300 ${
                  plan.isPopular 
                    ? 'border-primary shadow-2xl shadow-primary/10 scale-105 z-10' 
                    : 'border-border hover:border-primary/50 hover:shadow-lg'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Chip color="primary" variant="shadow" className="font-semibold px-4 py-1">
                      Most Popular
                    </Chip>
                  </div>
                )}
                
                <CardHeader className="flex flex-col items-start p-8 pb-0 gap-2">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className="text-muted text-sm h-10">{plan.description}</p>
                  <div className="mt-4 flex items-end gap-1">
                    <span className="text-5xl font-extrabold tracking-tight">
                      {formatCurrency(getDisplayPrice(plan.price))}
                    </span>
                    <span className="text-muted font-medium mb-1">/mo</span>
                  </div>
                  {billingCycle === 'yearly' && (
                    <p className="text-success text-sm font-medium mt-1">
                      Billed {formatCurrency(plan.price * 10)} yearly
                    </p>
                  )}
                  {billingCycle === 'monthly' && (
                    <p className="text-transparent text-sm font-medium mt-1 select-none">
                      Spacer
                    </p>
                  )}
                </CardHeader>
                
                <CardBody className="p-8">
                  <Button 
                    as={RouterLink}
                    to="/dashboard"
                    color={plan.isPopular ? "primary" : "default"} 
                    variant={plan.isPopular ? "shadow" : "bordered"}
                    className="w-full font-semibold mb-8"
                    size="lg"
                  >
                    Get Started
                  </Button>

                  <div className="flex flex-col gap-4 mb-8 bg-surface/50 p-4 rounded-xl border border-border/50">
                    <div className="flex items-center gap-3 text-sm">
                      <Cpu size={18} className="text-primary" />
                      <span className="font-medium">{plan.cpu}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Server size={18} className="text-primary" />
                      <span className="font-medium">{plan.ram} RAM</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Zap size={18} className="text-primary" />
                      <span className="font-medium">{plan.storage}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Globe size={18} className="text-primary" />
                      <span className="font-medium">{plan.bandwidth} Bandwidth</span>
                    </div>
                  </div>

                  <p className="font-semibold text-sm mb-4 uppercase tracking-wider text-muted">Included Features</p>
                  <ul className="flex flex-col gap-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 size={18} className="text-success shrink-0 mt-0.5" />
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Comparison Table Section */}
      <section className="py-24 bg-surface/30 border-y border-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">Compare plans in detail</h2>
            <p className="text-muted">Find the exact specifications you need for your workload.</p>
          </div>

          <Table 
            aria-label="Detailed feature comparison table"
            className="bg-background shadow-sm border border-border rounded-2xl overflow-hidden"
            shadow="none"
          >
            <TableHeader>
              <TableColumn className="bg-surface text-foreground font-semibold text-sm w-1/4">FEATURE</TableColumn>
              <TableColumn className="bg-surface text-center font-semibold text-sm w-1/4">STARTER</TableColumn>
              <TableColumn className="bg-surface text-center font-semibold text-sm w-1/4 text-primary">PRO</TableColumn>
              <TableColumn className="bg-surface text-center font-semibold text-sm w-1/4">ENTERPRISE</TableColumn>
            </TableHeader>
            <TableBody>
              {comparisonFeatures.map((row) => (
                <TableRow key={row.id} className="border-b border-border/50 last:border-none hover:bg-surface/50 transition-colors">
                  <TableCell className="font-medium text-muted-foreground py-4">{row.feature}</TableCell>
                  <TableCell className="text-center py-4">{renderFeatureValue(row.starter)}</TableCell>
                  <TableCell className="text-center py-4 bg-primary/5">{renderFeatureValue(row.pro)}</TableCell>
                  <TableCell className="text-center py-4">{renderFeatureValue(row.enterprise)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 max-w-3xl mx-auto px-6 lg:px-8 w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4 text-primary">
            <HelpCircle size={28} />
          </div>
          <h2 className="text-3xl font-heading font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted">Everything you need to know about the product and billing.</p>
        </div>

        <Accordion variant="splitted" className="gap-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              aria-label={faq.question} 
              title={<span className="font-semibold text-foreground">{faq.question}</span>}
              className="bg-background border border-border shadow-sm"
            >
              <p className="text-muted leading-relaxed pb-2">
                {faq.answer}
              </p>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 w-full text-center mt-8">
        <Card className="bg-gradient-to-br from-primary/10 via-background to-accent/10 border-primary/20 shadow-lg">
          <CardBody className="py-12 px-8 flex flex-col items-center text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Still not sure which plan is right for you?</h3>
            <p className="text-muted mb-8 max-w-xl">
              Our cloud architects are available 24/7 to help you design the perfect infrastructure for your specific requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                as={RouterLink} 
                to="/contact" 
                color="primary" 
                size="lg"
                endContent={<ArrowRight size={18} />}
              >
                Contact Sales
              </Button>
              <Button 
                as={RouterLink} 
                to="/contact" 
                variant="bordered" 
                size="lg"
              >
                Read Documentation
              </Button>
            </div>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}