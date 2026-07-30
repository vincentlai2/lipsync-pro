'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="LipSync.pro"
      title="LipSync.pro"
      width={32}
      height={32}
      className={cn('size-8 rounded-md', className)}
    />
  );
}
