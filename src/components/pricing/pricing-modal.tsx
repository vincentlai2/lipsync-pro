'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { PricingTable } from './pricing-table';
import { useTranslations } from 'next-intl';

interface PricingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  successCallbackUrl?: string;
  cancelCallbackUrl?: string;
}

export function PricingModal({
  open,
  onOpenChange,
  successCallbackUrl,
  cancelCallbackUrl,
}: PricingModalProps) {
  const t = useTranslations('PricingPage');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-6xl max-h-[90vh] overflow-y-auto p-6 md:p-8 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold text-center text-zinc-950 dark:text-zinc-50">
            {t('title')}
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500 dark:text-zinc-400">
            {t('description')}
          </DialogDescription>
        </DialogHeader>
        <PricingTable
          successCallbackUrl={successCallbackUrl}
          cancelCallbackUrl={cancelCallbackUrl}
        />
      </DialogContent>
    </Dialog>
  );
}
