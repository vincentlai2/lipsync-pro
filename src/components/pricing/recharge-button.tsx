'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PricingModal } from './pricing-modal';

interface RechargeButtonProps {
  className?: string;
  children?: React.ReactNode;
  callbackUrl?: string;
}

export function RechargeButton({
  className,
  children,
  callbackUrl = '/lip-sync-ai',
}: RechargeButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        className={className}
        onClick={() => setIsOpen(true)}
      >
        {children || 'Buy credits'}
      </Button>
      <PricingModal
        open={isOpen}
        onOpenChange={setIsOpen}
        successCallbackUrl={callbackUrl}
        cancelCallbackUrl={callbackUrl}
      />
    </>
  );
}
