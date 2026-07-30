import Container from '@/components/layout/container';
import { PricingTable } from '@/components/pricing/pricing-table';
import { constructMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: 'Prix Wav2Lip - Credits et abonnements',
    description:
      'Comprendre le prix Wav2Lip, les credits et les forfaits pour creer des videos avec synchronisation labiale IA.',
    locale,
    pathname: '/prix-wav2lip',
  });
}

export default function Wav2LipPricePage() {
  const sections = [
    {
      title: 'Essai gratuit',
      body: "L'essai gratuit sert a verifier le flux et la qualite sur un court exemple avant de produire davantage de videos. Des credits de test gratuits sont offerts a la creation de compte sans aucune carte de credit demandee.",
    },
    {
      title: 'Credits de generation',
      body: "Les credits permettent de relier le cout reel de generation a l'usage. Une video plus longue consomme plus de ressources qu'un court test. Si une generation echoue, vos credits vous sont rembourses automatiquement.",
    },
    {
      title: 'Abonnement mensuel',
      body: 'Pour un usage regulier, un abonnement mensuel simplifie la creation de plusieurs videos sans repasser par un achat ponctuel. Les abonnements sont sans engagement et adaptables a vos besoins.',
    },
  ];

  return (
    <Container className="mt-8 max-w-6xl px-4 flex flex-col gap-16">
      {/* Real Pricing subscription cards */}
      <PricingTable />

      {/* SEO / FAQ Section */}
      <section className="border-t border-white/5 pt-16 max-w-3xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-center tracking-tight text-zinc-950 dark:text-white mb-12">
          Comprendre nos Tarifs et Abonnements
        </h2>
        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h3 className="text-xl font-semibold text-zinc-950 dark:text-white">
                {section.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
