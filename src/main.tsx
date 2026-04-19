import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  HeroUIProvider, 
  Button, 
  Spinner, 
  Tabs, 
  Tab,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input
} from '@heroui/react';
import './style.css';

// Component Imports
import { Header } from './components/header';
import { Footer } from './components/footer';
import { PlanCard } from './components/plan-card';
import { StatusTable } from './components/status-table';

// Data & Types Imports
import { getHostingPlans, IS_DB_CONNECTED } from './db';
import { HostingPlan } from './types';

// Fallback Mock Data
const MOCK_PLANS: HostingPlan[] = [
  {
    id: 'p1',
    name: 'Shared Starter',
    type: 'shared',
    priceMonthly: 4.99,
    priceYearly: 49.90,
    description: 'Perfect for personal blogs and small portfolios.',
    features: ['1 Website', '10GB SSD Storage', 'Free SSL Certificate', '24/7 Support'],
    specs: { cpu: '1 Core', ram: '1 GB', storage: '10 GB SSD', bandwidth: 'Unmetered' },
    isPopular: false
  },
  {
    id: 'p2',
    name: 'VPS Pro',
    type: 'vps',
    priceMonthly: 19.99,
    priceYearly: 199.90,
    description: 'Dedicated resources for growing businesses.',
    features: ['Unlimited Websites', '50GB NVMe Storage', 'Dedicated IP', 'Root Access'],
    specs: { cpu: '2 Cores', ram: '4 GB', storage: '50 GB NVMe', bandwidth: '2 TB' },
    isPopular: true
  },
  {
    id: 'p3',
    name: 'Cloud Enterprise',
    type: 'cloud',
    priceMonthly: 49.99,
    priceYearly: 499.90,
    description: 'High availability and auto-scaling for demanding apps.',
    features: ['Auto-scaling', '200GB NVMe Storage', 'Load Balancer', 'Priority Support'],
    specs: { cpu: '4 Cores', ram: '8 GB', storage: '200 GB NVMe', bandwidth: '5 TB' },
    isPopular: false
  }
];

function App(): JSX.Element {
  const [plans, setPlans] = useState<HostingPlan[]>([]);
  const [isLoadingPlans, setIsLoadingPlans] = useState<boolean>(true);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  
  // Checkout Modal State
  const [selectedPlan, setSelectedPlan] = useState<HostingPlan | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchPlans() {
      if (!IS_DB_CONNECTED) {
        // Simulate network delay for mock data
        setTimeout(() => {
          if (isMounted) {
            setPlans(MOCK_PLANS);
            setIsLoadingPlans(false);
          }
        }, 600);
        return;
      }

      try {
        setIsLoadingPlans(true);
        const response = await getHostingPlans();
        if (isMounted) {
          if (response.data && response.data.length > 0) {
            setPlans(response.data);
          } else {
            setPlans(MOCK_PLANS); // Fallback if DB is empty
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error("Failed to fetch plans:", error);
          setPlans(MOCK_PLANS); // Fallback on error
        }
      } finally {
        if (isMounted) {
          setIsLoadingPlans(false);
        }
      }
    }

    fetchPlans();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSelectPlan = (plan: HostingPlan) => {
    setSelectedPlan(plan);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)] font-body selection:bg-[var(--color-primary)] selection:text-white">
      <Header />
      
      <main className="flex-grow flex flex-col">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto text-center w-full overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--color-primary)]/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-[var(--color-text)] tracking-tight mb-6 leading-tight">
            Cloud Hosting for <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
              Modern Teams
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
            Deploy your applications globally in seconds. Experience unmatched performance, reliability, and scale with Nivle's next-generation infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button 
              color="primary" 
              size="lg" 
              className="font-semibold w-full sm:w-auto px-8 shadow-lg shadow-[var(--color-primary)]/20"
              onPress={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Pricing
            </Button>
            <Button 
              variant="bordered" 
              size="lg" 
              className="font-semibold w-full sm:w-auto px-8 border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-border)]/30"
            >
              Read Documentation
            </Button>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">Simple, Transparent Pricing</h2>
            <p className="text-[var(--color-secondary)] mb-8 max-w-2xl mx-auto">
              Choose the perfect plan for your needs. Upgrade or downgrade at any time with prorated billing.
            </p>
            
            <div className="flex justify-center">
              <Tabs 
                selectedKey={billingCycle} 
                onSelectionChange={(key) => setBillingCycle(key as 'monthly' | 'yearly')}
                color="primary"
                variant="solid"
                radius="full"
                classNames={{
                  tabList: "bg-[var(--color-border)]/50 p-1",
                  cursor: "bg-[var(--color-primary)] shadow-sm",
                  tab: "px-6 py-4 h-auto",
                  tabContent: "group-data-[selected=true]:text-white text-[var(--color-text)] font-medium"
                }}
              >
                <Tab key="monthly" title="Monthly Billing" />
                <Tab 
                  key="yearly" 
                  title={
                    <div className="flex items-center gap-2">
                      <span>Yearly Billing</span>
                      <span className="text-[10px] uppercase tracking-wider bg-[var(--color-success)]/20 text-[var(--color-success)] px-2 py-0.5 rounded-full font-bold">
                        Save 20%
                      </span>
                    </div>
                  } 
                />
              </Tabs>
            </div>
          </div>

          {isLoadingPlans ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Spinner size="lg" color="primary" />
              <p className="text-[var(--color-secondary)] text-sm animate-pulse">Loading hosting plans...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {plans.map(plan => (
                <PlanCard 
                  key={plan.id} 
                  plan={plan} 
                  billingCycle={billingCycle} 
                  onSelect={handleSelectPlan} 
                />
              ))}
            </div>
          )}
        </section>

        {/* Status Section */}
        <section id="status" className="py-20 px-6 lg:px-8 max-w-7xl mx-auto w-full bg-[var(--color-bg)] border-t border-[var(--color-border)]/50 scroll-mt-20">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-[var(--color-text)] mb-2">System Status</h2>
              <p className="text-[var(--color-secondary)]">Real-time monitoring of our global infrastructure and core services.</p>
            </div>
            <Button 
              variant="flat" 
              color="default" 
              className="font-medium bg-[var(--color-border)]/50 text-[var(--color-text)]"
              startContent={
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--color-success)]"></span>
                </span>
              }
            >
              Subscribe to Updates
            </Button>
          </div>
          <StatusTable />
        </section>
      </main>

      <Footer />

      {/* Checkout Modal */}
      <Modal 
        isOpen={isCheckoutOpen} 
        onOpenChange={setIsCheckoutOpen}
        placement="center"
        backdrop="blur"
        classNames={{
          base: "bg-[var(--color-bg)] border border-[var(--color-border)]",
          header: "border-b border-[var(--color-border)]",
          footer: "border-t border-[var(--color-border)]"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-[var(--color-text)]">
                Complete your order
              </ModalHeader>
              <ModalBody className="py-6">
                <div className="bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 rounded-lg p-4 mb-4">
                  <p className="text-sm text-[var(--color-text)]">
                    You are subscribing to the <span className="font-bold text-[var(--color-primary)]">{selectedPlan?.name}</span> plan on a <span className="font-bold">{billingCycle}</span> billing cycle.
                  </p>
                </div>
                
                <div className="flex flex-col gap-4">
                  <Input 
                    autoFocus
                    label="Email Address" 
                    placeholder="Enter your email" 
                    variant="bordered" 
                    classNames={{
                      inputWrapper: "border-[var(--color-border)] hover:border-[var(--color-primary)]",
                      label: "text-[var(--color-text)]"
                    }}
                  />
                  <Input 
                    label="Full Name" 
                    placeholder="John Doe" 
                    variant="bordered" 
                    classNames={{
                      inputWrapper: "border-[var(--color-border)] hover:border-[var(--color-primary)]",
                      label: "text-[var(--color-text)]"
                    }}
                  />
                  <Input 
                    label="Card Details" 
                    placeholder="0000 0000 0000 0000" 
                    variant="bordered" 
                    classNames={{
                      inputWrapper: "border-[var(--color-border)] hover:border-[var(--color-primary)]",
                      label: "text-[var(--color-text)]"
                    }}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose} className="font-semibold shadow-md shadow-[var(--color-primary)]/20">
                  Subscribe Now
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

// Mount the application
export function init() {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('Failed to find the root element');
    return;
  }
  
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <HeroUIProvider>
        <App />
      </HeroUIProvider>
    </React.StrictMode>
  );
}

// Auto-initialize if we are in a browser environment
if (typeof window !== 'undefined') {
  init();
}