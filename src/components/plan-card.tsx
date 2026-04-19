import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter, 
  Button, 
  Chip, 
  Divider 
} from '@heroui/react';
import { PlanCardProps } from '../types';
import { formatCurrency } from '../utils';

// --- Icons ---
const CheckIcon = () => (
  <svg className="w-5 h-5 text-[var(--color-success)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const CpuIcon = () => (
  <svg className="w-4 h-4 text-[var(--color-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
  </svg>
);

const RamIcon = () => (
  <svg className="w-4 h-4 text-[var(--color-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const StorageIcon = () => (
  <svg className="w-4 h-4 text-[var(--color-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
  </svg>
);

const BandwidthIcon = () => (
  <svg className="w-4 h-4 text-[var(--color-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);

export function PlanCard({ plan, onSelect, billingCycle = 'monthly' }: PlanCardProps): JSX.Element {
  const isYearly = billingCycle === 'yearly';
  const displayPrice = isYearly ? plan.priceYearly : plan.priceMonthly;
  const periodText = isYearly ? '/year' : '/mo';
  
  // Calculate monthly equivalent for yearly plans to show savings
  const monthlyEquivalent = isYearly ? plan.priceYearly / 12 : plan.priceMonthly;
  const showSavings = isYearly && (plan.priceYearly < plan.priceMonthly * 12);

  return (
    <Card 
      className={`w-full flex flex-col h-full transition-all duration-300 hover:-translate-y-1 ${
        plan.isPopular 
          ? 'border-2 border-[var(--color-primary)] shadow-xl shadow-[var(--color-primary)]/10' 
          : 'border border-[var(--color-border)] shadow-md hover:shadow-lg'
      }`}
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <CardHeader className="flex flex-col items-start px-6 pt-6 pb-4 gap-2">
        <div className="flex justify-between items-center w-full">
          <h3 className="text-xl font-bold text-[var(--color-text)]">{plan.name}</h3>
          {plan.isPopular && (
            <Chip color="primary" variant="flat" size="sm" className="font-medium">
              Most Popular
            </Chip>
          )}
        </div>
        <p className="text-sm text-[var(--color-secondary)] min-h-[40px]">
          {plan.description}
        </p>
      </CardHeader>

      <CardBody className="px-6 py-0 flex-grow flex flex-col gap-6">
        {/* Pricing Section */}
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-extrabold text-[var(--color-text)] tracking-tight">
              {formatCurrency(displayPrice)}
            </span>
            <span className="text-[var(--color-secondary)] font-medium">
              {periodText}
            </span>
          </div>
          {showSavings && (
            <p className="text-xs text-[var(--color-success)] font-medium mt-1">
              Equivalent to {formatCurrency(monthlyEquivalent)}/mo
            </p>
          )}
        </div>

        <Divider className="bg-[var(--color-border)]" />

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-2">
          <div className="flex items-center gap-2">
            <CpuIcon />
            <span className="text-sm text-[var(--color-text)] font-medium">{plan.specs.cpu}</span>
          </div>
          <div className="flex items-center gap-2">
            <RamIcon />
            <span className="text-sm text-[var(--color-text)] font-medium">{plan.specs.ram}</span>
          </div>
          <div className="flex items-center gap-2">
            <StorageIcon />
            <span className="text-sm text-[var(--color-text)] font-medium">{plan.specs.storage}</span>
          </div>
          <div className="flex items-center gap-2">
            <BandwidthIcon />
            <span className="text-sm text-[var(--color-text)] font-medium">{plan.specs.bandwidth}</span>
          </div>
        </div>

        <Divider className="bg-[var(--color-border)]" />

        {/* Features List */}
        <ul className="flex flex-col gap-3 flex-grow">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckIcon />
              <span className="text-sm text-[var(--color-text)] leading-tight pt-0.5">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </CardBody>

      <CardFooter className="px-6 pb-6 pt-4">
        <Button 
          color={plan.isPopular ? "primary" : "default"}
          variant={plan.isPopular ? "solid" : "bordered"}
          className={`w-full font-semibold text-sm ${
            !plan.isPopular ? 'border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]' : ''
          }`}
          size="lg"
          onPress={() => onSelect?.(plan)}
        >
          Select {plan.name}
        </Button>
      </CardFooter>
    </Card>
  );
}