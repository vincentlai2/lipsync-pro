'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  ClockIcon,
  CoinsIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ZapIcon,
} from 'lucide-react';

interface InsufficientCreditsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenPricingModal: () => void;
  currentBalance?: number;
  creditsRequired?: number;
}

export function InsufficientCreditsModal({
  open,
  onOpenChange,
  onOpenPricingModal,
  currentBalance = 0,
  creditsRequired = 20,
}: InsufficientCreditsModalProps) {
  const handleUpgradeClick = () => {
    onOpenChange(false);
    onOpenPricingModal();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl">
        <DialogHeader className="text-center space-y-2">
          <div className="mx-auto size-12 rounded-full bg-amber-500/10 dark:bg-amber-500/20 flex items-center justify-center border border-amber-500/30 text-amber-500 mb-1">
            <CoinsIcon className="size-6 animate-pulse" />
          </div>
          <DialogTitle className="text-xl font-bold text-zinc-950 dark:text-white">
            Not enough credits for this generation
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-600 dark:text-zinc-400">
            This video requires{' '}
            <b className="text-amber-500 dark:text-amber-400">
              {creditsRequired} credits
            </b>
            . Your current balance is{' '}
            <b className="text-zinc-900 dark:text-zinc-200">
              {currentBalance} credit{currentBalance === 1 ? '' : 's'}
            </b>
            .
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-2">
          <div className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-5 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                <SparklesIcon className="size-3" />
                Recommended
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                Credits apply instantly
              </span>
            </div>

            <div>
              <h4 className="font-semibold text-zinc-950 dark:text-white text-base">
                Upgrade or add credits
              </h4>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Get more Lip Sync AI credits, unlock higher-volume workflows,
                and keep generating without interrupting the current session.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-700 dark:text-zinc-300 pt-1">
              <div className="flex items-center gap-1.5">
                <ZapIcon className="size-3.5 text-primary shrink-0" />
                <span>Fast rendering</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheckIcon className="size-3.5 text-primary shrink-0" />
                <span>Commercial-ready exports</span>
              </div>
            </div>

            <Button
              onClick={handleUpgradeClick}
              className="w-full h-11 shadow-lg shadow-primary/25 text-sm font-semibold cursor-pointer mt-2"
            >
              <SparklesIcon className="mr-2 size-4 text-yellow-300" />
              View plans and credits
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <ClockIcon className="size-3.5" />
            Failed generations are automatically refunded.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
