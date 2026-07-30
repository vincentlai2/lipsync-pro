import { Wav2LipContentPage } from '@/components/wav2lip/content-page';
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
    title: 'Wav2Lip Pro HD - Lip-sync IA en ligne',
    description:
      'Wav2Lip Pro HD aide a creer des videos lip-sync plus stables, sans installer Python ni utiliser Google Colab.',
    locale,
    pathname: '/wav2lip-pro',
  });
}

export default function Wav2LipProPage() {
  return (
    <Wav2LipContentPage
      eyebrow="Wav2Lip Pro HD"
      title="Wav2Lip Pro HD : la solution professionnelle de synchronisation labiale"
      description="Optimisez vos créations vidéos. L'offre Wav2Lip Pro élimine les filigranes, applique un traitement de restauration faciale HD et alloue des GPU ultra-rapides sans file d'attente."
      sections={[
        {
          title: 'Pourquoi opter pour la version Wav2Lip Pro ?',
          body: "L'offre gratuite ou l'exécution locale de l'algorithme brut conviennent pour des démonstrations ponctuelles. Mais pour les vidéastes, formateurs, traducteurs et agences, les exigences de productivité et de qualité exigent un environnement robuste.\n\nLa version Pro de notre plateforme résout les problèmes de lenteur et de configuration en allouant des serveurs GPU Nvidia H100 dédiés. Elle garantit un rendu rapide et une haute disponibilité pour que vos projets avancent sans interruption.",
        },
        {
          title: "Les améliorations exclusives de l'offre Pro",
          body: "L'offre Pro intègre des traitements avancés exclusifs qui transcendent le modèle open-source standard :\n\n• Face Restoration de pointe : Wav2Lip brut a tendance à flouter la zone de la bouche. Nous appliquons un modèle de restauration faciale par IA (Face Enhancement) qui lisse la peau, redessine les lèvres et préserve l'expression faciale pour un résultat réaliste en haute définition.\n\n• File d'attente prioritaire : Vos calculs passent en priorité absolue sur nos grappes de serveurs GPU cloud, réduisant le temps d'attente à zéro.\n\n• Aucun filigrane : Vos vidéos finales sont totalement épurées, prêtes pour une diffusion commerciale.",
        },
        {
          title: 'Pour quels projets professionnels ?',
          body: "L'abonnement Pro ou les packs de crédits premium sont idéaux pour :\n\n• Le doublage multilingue automatique de cours en ligne, tutoriels et formations.\n\n• L'animation d'avatars parlants réalistes pour des démonstrations produits ou du support client interactif.\n\n• La création de campagnes publicitaires vidéo multilingues à fort taux d'engagement sur TikTok, YouTube et Instagram.",
        },
      ]}
      bullets={[
        'Génération haute fidélité avec algorithme de lissage de visage (Face Restoration).',
        'Traitement prioritaire ultra-rapide sur serveurs GPU cloud Nvidia H100.',
        'Suppression totale des filigranes pour toutes vos exploitations commerciales.',
        "Stockage cloud sécurisé et accès à l'historique de vos vidéos pendant 30 jours.",
        "Politique de remboursement de crédits 100% automatisée en cas d'échec du rendu.",
      ]}
    />
  );
}
