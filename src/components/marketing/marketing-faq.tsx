'use client';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircleIcon } from 'lucide-react';

export interface FaqItem {
  question: string;
  answer: string;
}

interface MarketingFaqProps {
  title?: string;
  subtitle?: string;
  items: FaqItem[];
}

export function MarketingFaq({
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know about LipSync.pro',
  items,
}: MarketingFaqProps) {
  // Generate Google Schema JSON-LD for FAQPage
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white/60 via-zinc-50/40 to-white/80 dark:from-zinc-950 dark:via-zinc-900/50 dark:to-zinc-950 border-t border-zinc-200/80 dark:border-zinc-800/80">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Valid JSON-LD schema
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center space-y-2 mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-bold text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/50 dark:text-blue-300">
            <HelpCircleIcon className="size-3.5" />
            <span>FAQ & Assistance</span>
          </div>
          <h2 className="text-3xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
            {title}
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-lg mx-auto font-medium">
            {subtitle}
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-200/90 bg-white/90 p-6 md:p-8 shadow-sm backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/90">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {items.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`item-${index}`}
                className="border border-zinc-200/80 dark:border-zinc-800 rounded-2xl px-5 py-1 transition-all data-[state=open]:bg-zinc-50/80 dark:data-[state=open]:bg-zinc-800/50"
              >
                <AccordionTrigger className="text-left font-bold text-zinc-950 dark:text-white text-sm md:text-base hover:no-underline cursor-pointer py-3.5">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-600 dark:text-zinc-400 text-xs md:text-sm leading-relaxed pb-4 font-normal">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
