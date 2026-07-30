import { Button } from '@/components/ui/button';
import { Routes } from '@/routes';
import { ArrowRightIcon, CheckCircle2Icon } from 'lucide-react';
import Link from 'next/link';

interface LipSyncContentPageProps {
  eyebrow: string;
  title: string;
  description: string;
  sections: Array<{
    title: string;
    body: string;
  }>;
  bullets?: string[];
  relatedLinks?: Array<{
    href: string;
    title: string;
    description: string;
  }>;
}

export function LipSyncContentPage({
  eyebrow,
  title,
  description,
  sections,
  bullets = [],
  relatedLinks = [],
}: LipSyncContentPageProps) {
  return (
    <article className="min-h-screen bg-background text-foreground">
      <section className="border-b bg-zinc-50 py-16 dark:bg-zinc-950/20 md:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <span className="inline-flex rounded-md border border-primary/20 bg-primary/10 px-3 py-1 font-medium text-primary text-xs">
            {eyebrow}
          </span>
          <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-zinc-950 dark:text-white md:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-muted-foreground text-lg leading-relaxed">
            {description}
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href={Routes.LipSyncAI}>
                Try Lip Sync AI
                <ArrowRightIcon className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 md:grid-cols-[1fr_0.75fr] md:items-start">
          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-2xl font-semibold tracking-tight">
                  {section.title}
                </h2>
                {section.body.split('\n\n').map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-4 text-muted-foreground leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <aside className="space-y-4">
            {bullets.length > 0 && (
              <div className="rounded-md border p-5">
                <h2 className="font-semibold">Key points</h2>
                <div className="mt-4 space-y-3">
                  {bullets.map((bullet) => (
                    <div key={bullet} className="flex gap-2 text-sm">
                      <CheckCircle2Icon className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {relatedLinks.length > 0 && (
              <div className="rounded-md border p-5">
                <h2 className="font-semibold">Related guides</h2>
                <div className="mt-4 space-y-4">
                  {relatedLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block rounded-md border p-4 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900"
                    >
                      <h3 className="font-medium text-sm">{link.title}</h3>
                      <p className="mt-1 text-muted-foreground text-xs leading-relaxed">
                        {link.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    </article>
  );
}
