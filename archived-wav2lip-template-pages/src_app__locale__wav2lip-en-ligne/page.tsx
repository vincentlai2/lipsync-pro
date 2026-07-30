import { FaqSection } from '@/components/wav2lip/seo-sections';
import { Wav2LipUploader } from '@/components/wav2lip/wav2lip-uploader';
import { constructMetadata } from '@/lib/metadata';
import {
  BadgeCheckIcon,
  CheckCircle2Icon,
  DownloadIcon,
  FileAudioIcon,
  ImageIcon,
  ScanFaceIcon,
  ShieldCheckIcon,
  SparklesIcon,
  VideoIcon,
  ClockIcon,
  WandSparklesIcon,
  HelpCircleIcon,
  ArrowRightIcon,
} from 'lucide-react';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';

// Dashboard / Studio Imports
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUserCredits, claimDailyLoginCredits } from '@/credits/credits';
import { getSession } from '@/lib/server';
import { listUserWav2LipTasks } from '@/wav2lip/tasks';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Routes } from '@/routes';
import { LocaleLink } from '@/i18n/navigation';
import { RechargeButton } from '@/components/pricing/recharge-button';

// Marketing Layout Imports
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import type React from 'react';
import { Suspense } from 'react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return constructMetadata({
    title: 'Wav2Lip en ligne gratuit - Synchronisation labiale IA',
    description:
      'Essayez Wav2Lip en ligne: importez une vidéo avec un visage visible, ajoutez un audio et créez une vidéo avec synchronisation labiale sans Google Colab.',
    locale,
    pathname: '/wav2lip-en-ligne',
  });
}

function statusLabel(status: string) {
  switch (status) {
    case 'succeeded':
      return 'Terminee';
    case 'failed':
      return 'Echouee';
    case 'running':
      return 'En cours';
    case 'pending':
      return 'En attente';
    default:
      return 'Inconnue';
  }
}

function statusVariant(status: string) {
  if (status === 'succeeded') return 'default';
  if (status === 'failed') return 'destructive';
  return 'secondary';
}

const wav2lipGuides = [
  {
    href: '/wav2lip-en-ligne/what-is-wav2lip',
    title: 'What is Wav2Lip',
    description:
      'Comprendre le lip-sync Wav2Lip sans commencer par GitHub ou Python.',
  },
  {
    href: '/wav2lip-en-ligne/comment-utiliser-wav2lip',
    title: 'Créer votre première vidéo',
    description:
      'Choisir vos fichiers, lancer un test et corriger les erreurs courantes.',
  },
  {
    href: '/wav2lip-en-ligne/google-colab',
    title: 'Éviter Google Colab',
    description:
      'Quand le mode en ligne remplace un notebook, des quotas GPU et des erreurs Python.',
  },
  {
    href: '/wav2lip-en-ligne/troubleshooting',
    title: 'Wav2Lip ne marche pas',
    description:
      'Corriger vidéo, audio, timing ou setup local sans tout recommencer.',
  },
];

async function CreditsCard({ userId }: { userId: string }) {
  const credits = await getUserCredits(userId);

  return (
    <Card className="border border-black/5 dark:border-white/10 bg-white/80 dark:bg-black/40 shadow-xl shadow-zinc-200/40 dark:shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <WandSparklesIcon className="size-4 text-primary" />
          Credits disponibles
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-baseline justify-between">
          <p className="text-3xl font-semibold">{credits}</p>
          <RechargeButton className="cursor-pointer border-primary/30 hover:bg-primary/10 hover:text-primary transition-colors" />
        </div>
        <p className="text-muted-foreground text-sm">
          Credits utilisables pour generer des videos Wav2Lip.
        </p>
      </CardContent>
    </Card>
  );
}

async function RecentTasksCard({ userId }: { userId: string }) {
  const tasks = await listUserWav2LipTasks(userId);
  return (
    <Card className="border border-black/5 dark:border-white/10 bg-white/80 dark:bg-black/40 shadow-xl shadow-zinc-200/40 dark:shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <ClockIcon className="size-4 text-primary" />
          Taches recentes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-muted-foreground text-sm py-4 text-center">
            Aucun historique pour le moment. Les generations apparaitront ici
            apres le premier lancement.
          </p>
        ) : (
          <div className="divide-y divide-border/60 max-h-[480px] overflow-y-auto pr-1">
            {tasks.slice(0, 10).map((task) => (
              <div
                key={task.id}
                className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="truncate font-medium text-sm text-foreground flex-1">
                    {task.videoUrl
                      ? decodeURIComponent(task.videoUrl)
                          .split('/')
                          .pop()
                          ?.split('?')[0]
                      : task.providerTaskId || 'Video'}
                  </p>
                  <Badge
                    variant={statusVariant(task.status)}
                    className="shrink-0 text-[10px] px-1.5 py-0"
                  >
                    {statusLabel(task.status)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between gap-2 mt-0.5">
                  <span className="text-muted-foreground text-[10px]">
                    {task.createdAt.toLocaleString('fr-FR', {
                      month: 'numeric',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}{' '}
                    · {task.creditsUsed} credits
                  </span>
                  {task.outputUrl && (
                    <Button
                      size="xs"
                      asChild
                      className="h-6 px-2 text-[10px] cursor-pointer"
                    >
                      <a href={task.outputUrl} target="_blank" rel="noreferrer">
                        <DownloadIcon className="mr-1 size-3" />
                        Telecharger
                      </a>
                    </Button>
                  )}
                </div>
                {task.errorMessage && (
                  <p className="text-destructive text-[10px] mt-0.5 break-all">
                    {task.errorMessage}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default async function Wav2LipOnlinePage() {
  let session = null;
  try {
    session = await getSession();
  } catch (error) {
    console.error('Failed to retrieve session:', error);
  }
  const userId = session?.user?.id;

  // Render Logged-In Studio Layout
  if (userId) {
    // Claim daily login credits — fire-and-forget so it never blocks first paint
    claimDailyLoginCredits(userId)
      .then((result) => {
        if (result === 'limit_reached') {
          console.log(`Daily login free trial exhausted for user ${userId}`);
        }
      })
      .catch((err) => {
        console.error('claimDailyLoginCredits background error:', err);
      });

    return (
      <SidebarProvider
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 72)',
            '--header-height': 'calc(var(--spacing) * 12)',
          } as React.CSSProperties
        }
      >
        <DashboardSidebar variant="inset" />

        <SidebarInset>
          <DashboardHeader
            breadcrumbs={[{ label: 'Studio Wav2Lip', isCurrentPage: true }]}
          />

          <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6 bg-gradient-to-b from-slate-50/50 via-background to-background dark:from-transparent dark:to-transparent relative overflow-hidden bg-dot-pattern">
            {/* Soft background glow orb for light mode */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 dark:bg-primary/0 rounded-full blur-3xl -z-10" />

            <div className="max-w-3xl">
              <p className="font-medium text-primary text-sm">
                Espace de generation
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                Creer une nouvelle video Wav2Lip
              </h1>
              <p className="mt-3 text-muted-foreground text-sm">
                Synchronisez les lèvres de vos vidéos avec une piste audio de
                doublage ou une voix off en un clic.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] max-w-6xl w-full">
              <div className="space-y-6">
                <Wav2LipUploader />

                <Card className="border border-black/5 dark:border-white/10 bg-white/80 dark:bg-black/40 shadow-xl shadow-zinc-200/40 dark:shadow-none">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <HelpCircleIcon className="size-4 text-primary" />
                      Aide & FAQ
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-3 text-xs leading-relaxed">
                      <div className="space-y-1">
                        <h4 className="font-semibold text-foreground text-sm">
                          Format & Limites
                        </h4>
                        <p className="text-muted-foreground">
                          Format video: MP4/AVI/MOV (max. 300Mo). Format audio:
                          WAV/MP3 (max. 30Mo). Duree max: 120s.
                        </p>
                      </div>
                      <div className="space-y-1 md:border-l md:pl-6 border-border/60">
                        <h4 className="font-semibold text-foreground text-sm">
                          Qualite du rendu
                        </h4>
                        <p className="text-muted-foreground">
                          Pour un rendu optimal, utilisez une video de face,
                          bien eclairee et nette, avec une voix forte et
                          distincte.
                        </p>
                      </div>
                      <div className="space-y-1 md:border-l md:pl-6 border-border/60">
                        <h4 className="font-semibold text-foreground text-sm">
                          Echecs & Remboursement
                        </h4>
                        <p className="text-muted-foreground">
                          Si la generation de la video echoue, vos credits sont
                          automatiquement recrédités sur votre compte.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col gap-6">
                <Suspense
                  fallback={
                    <Card className="border border-black/5 dark:border-white/10 bg-white/80 dark:bg-black/40 shadow-xl shadow-zinc-200/40 dark:shadow-none p-6 animate-pulse">
                      <div className="h-6 w-32 bg-muted rounded mb-4 animate-pulse" />
                      <div className="h-10 w-24 bg-muted rounded animate-pulse" />
                    </Card>
                  }
                >
                  <CreditsCard userId={userId} />
                </Suspense>

                <Suspense
                  fallback={
                    <Card className="border border-black/5 dark:border-white/10 bg-white/80 dark:bg-black/40 shadow-xl shadow-zinc-200/40 dark:shadow-none p-6 animate-pulse">
                      <div className="h-6 w-32 bg-muted rounded mb-4 animate-pulse" />
                      <div className="h-32 w-full bg-muted rounded animate-pulse" />
                    </Card>
                  }
                >
                  <RecentTasksCard userId={userId} />
                </Suspense>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  // Render Logged-Out Guest/SEO Layout
  const quickPoints = [
    [
      BadgeCheckIcon,
      'Essai gratuit',
      'Crédits offerts pour tester un court extrait.',
    ],
    [ShieldCheckIcon, 'Sans Colab', 'Aucune installation Python à configurer.'],
    [DownloadIcon, 'Résultat vidéo', 'Téléchargez la vidéo générée en ligne.'],
  ];

  const steps = [
    [
      VideoIcon,
      'Importez une vidéo',
      'Choisissez une vidéo courte avec un visage de face, bien éclairé et visible.',
    ],
    [
      FileAudioIcon,
      'Ajoutez un audio',
      'Chargez une voix off, un doublage, un discours ou un extrait audio en MP3, WAV ou AAC.',
    ],
    [
      SparklesIcon,
      'Lancez la génération',
      'Wav2Lip synchronise les lèvres avec la voix et prépare une nouvelle vidéo.',
    ],
  ];

  const tips = [
    'Gardez la bouche visible: évitez les masques, les mains devant le visage et les profils trop marqués.',
    'Utilisez un audio clair, avec une voix bien audible et peu de bruit de fond.',
    'Commencez par une vidéo courte pour vérifier le rendu avant de lancer un fichier plus long.',
    'Pour un doublage, choisissez une voix proche du rythme de la vidéo originale.',
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar scroll={true} />
      <main className="flex-1">
        <section className="border-b border-black/5 dark:border-white/5 py-10 md:py-14 bg-zinc-50/80 dark:bg-zinc-950/20 bg-dot-pattern">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex flex-wrap items-center justify-center gap-2">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                  Wav2Lip en ligne gratuit
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 animate-pulse">
                  🎁 20 Crédits Offerts à l'Inscription
                </span>
              </div>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl text-zinc-950 dark:text-white leading-tight">
                Synchronisation Labiale{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                  Wav2Lip IA
                </span>{' '}
                en ligne
              </h1>
              <p className="mt-5 text-muted-foreground text-sm">
                Doublez, traduisez et donnez vie à vos vidéos sans
                réenregistrement coûteux. Importez une vidéo, ajoutez une voix
                off, et laissez l'IA synchroniser les lèvres en 30 secondes.
                Sans aucune ligne de code ni installation.
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild>
                  <LocaleLink href={Routes.LipSyncAI}>
                    Creer une video Wav2Lip en ligne
                    <ArrowRightIcon className="ml-2 size-4" />
                  </LocaleLink>
                </Button>
                <Button asChild variant="outline">
                  <a href="#mode-emploi">Voir comment ca marche</a>
                </Button>
              </div>
            </div>
            <div className="mx-auto mt-6 grid max-w-4xl gap-3 text-sm md:grid-cols-3">
              {quickPoints.map(([Icon, title, description]) => (
                <div
                  key={title as string}
                  className="flex items-start gap-3 rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-black/40 shadow-sm p-4 transition-all hover:border-primary/30"
                >
                  <Icon className="mt-0.5 size-4 shrink-0 text-primary" />
                  <div>
                    <p className="font-semibold text-zinc-950 dark:text-white text-xs">
                      {title as string}
                    </p>
                    <p className="mt-1 text-muted-foreground text-[11px] leading-relaxed">
                      {description as string}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="mode-emploi" className="border-b py-14 md:py-18">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="font-medium text-primary text-sm">Mode d'emploi</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Comment utiliser Wav2Lip en ligne
              </h2>
              <p className="mt-4 text-muted-foreground text-sm">
                Le principe est simple: envoyez une vidéo avec un visage,
                ajoutez la voix à synchroniser, puis laissez Wav2Lip générer le
                rendu.
              </p>
            </div>
            <div className="space-y-3">
              {steps.map(([Icon, title, description], index) => (
                <div
                  key={title as string}
                  className="flex gap-4 rounded-md border border-border/60 p-5 bg-white dark:bg-transparent shadow-sm dark:shadow-none"
                >
                  <Icon className="mt-1 size-5 shrink-0 text-primary" />
                  <div>
                    <h3 className="font-semibold text-sm text-zinc-950 dark:text-white">
                      {index + 1}. {title as string}
                    </h3>
                    <p className="mt-2 text-muted-foreground text-xs leading-relaxed">
                      {description as string}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b py-14 md:py-18">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-[0.8fr_1.2fr] md:items-start">
            <div>
              <p className="font-medium text-primary text-sm">
                Avant de lancer
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Conseils pour un meilleur résultat
              </h2>
              <p className="mt-4 text-muted-foreground text-sm">
                La qualité dépend surtout de la netteté du visage et de la
                propreté de l'audio. Ces quelques règles évitent la plupart des
                rendus ratés.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {tips.map((tip) => (
                <div
                  key={tip}
                  className="flex gap-3 rounded-md border border-border/60 p-4 text-xs text-muted-foreground leading-relaxed"
                >
                  <CheckCircle2Icon className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b py-14 md:py-18">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-[1fr_0.9fr] md:items-center">
            <div className="rounded-md border border-border/60 bg-zinc-50 dark:bg-white/[0.015] p-4">
              <div className="grid aspect-video overflow-hidden rounded-md border border-border/60 bg-white dark:bg-transparent md:grid-cols-3">
                <div className="flex flex-col items-center justify-center gap-4 border-border/60 border-b p-5 md:border-r md:border-b-0">
                  <div className="flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <ImageIcon className="size-9" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-sm text-zinc-950 dark:text-white">
                      Visage
                    </p>
                    <p className="mt-1 text-muted-foreground text-[10px]">
                      Vidéo source
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 border-border/60 border-b p-5 md:border-r md:border-b-0">
                  <div className="flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <FileAudioIcon className="size-9" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-sm text-zinc-950 dark:text-white">
                      Voix
                    </p>
                    <p className="mt-1 text-muted-foreground text-[10px]">
                      Voix cible
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 p-5">
                  <div className="flex size-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                    <ScanFaceIcon className="size-9" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-sm text-zinc-950 dark:text-white">
                      Résultat
                    </p>
                    <p className="mt-1 text-muted-foreground text-[10px]">
                      Vidéo générée
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="font-medium text-primary text-sm">
                Pour quels usages ?
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Doublez une vidéo ou faites parler un avatar
              </h2>
              <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
                Wav2Lip convient aux vidéos TikTok et YouTube, aux avatars IA,
                aux doublages, aux tutoriels et aux essais de voix. Testez
                d'abord un court extrait, puis produisez une version plus longue
                si le rendu vous convient.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b py-14 md:py-18">
          <div className="mx-auto max-w-6xl px-4">
            <div className="max-w-2xl">
              <p className="font-medium text-primary text-sm">Guides Wav2Lip</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Quelques guides utiles avant ou après votre test
              </h2>
              <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
                Gardez l'essentiel à portée de main: comprendre Wav2Lip,
                préparer vos fichiers, éviter Colab ou corriger un rendu qui ne
                marche pas.
              </p>
            </div>
            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {wav2lipGuides.map((guide) => (
                <LocaleLink
                  key={guide.href}
                  href={guide.href}
                  className="group rounded-md border border-border/60 p-5 transition-colors hover:border-primary/40 hover:bg-primary/[0.03]"
                >
                  <h3 className="text-sm font-semibold text-zinc-950 dark:text-white group-hover:text-primary">
                    {guide.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {guide.description}
                  </p>
                </LocaleLink>
              ))}
            </div>
            <LocaleLink
              href="/blog"
              className="mt-6 inline-flex text-sm font-medium text-primary hover:underline"
            >
              Voir tous les guides Wav2Lip
            </LocaleLink>
          </div>
        </section>

        <section className="border-b py-10">
          <div className="mx-auto max-w-4xl px-4">
            <div className="rounded-md border border-primary/20 bg-primary/[0.03] p-6 text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                Pret a creer votre video Wav2Lip en ligne ?
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground text-sm leading-relaxed">
                Connectez-vous, ajoutez votre video et votre voix, puis lancez
                un premier test court directement dans le navigateur.
              </p>
              <Button asChild className="mt-5">
                <LocaleLink href={Routes.LipSyncAI}>
                  Commencer la synchronisation
                  <ArrowRightIcon className="ml-2 size-4" />
                </LocaleLink>
              </Button>
            </div>
          </div>
        </section>

        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
