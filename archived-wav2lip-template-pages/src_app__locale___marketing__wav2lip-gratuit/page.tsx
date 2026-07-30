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
    title: 'Wav2Lip gratuit - Essayez la synchronisation labiale IA',
    description:
      'Testez Wav2Lip gratuitement en ligne avant de passer a un forfait avec credits.',
    locale,
    pathname: '/wav2lip-gratuit',
  });
}

export default function Wav2LipFreePage() {
  return (
    <Wav2LipContentPage
      eyebrow="Wav2Lip gratuit"
      title="Wav2Lip gratuit : tester le lip-sync IA en ligne avant de passer en Pro"
      description="Découvrez notre offre d'essai gratuit de Wav2Lip. Obtenez des crédits dès l'inscription pour tester l'algorithme sur vos propres fichiers vidéo et valider la qualité du rendu."
      sections={[
        {
          title: 'Pourquoi proposer un essai gratuit ?',
          body: "La technologie de synchronisation labiale par intelligence artificielle est novatrice et suscite beaucoup de curiosité.\n\nLes créateurs de contenu, traducteurs et formateurs souhaitent naturellement évaluer la fidélité et la fluidité des mouvements générés par l'IA avant de s'engager. C'est pourquoi nous offrons des crédits d'essai gratuits dès la création de votre compte, vous permettant de tester le service sans aucune contrainte financière.",
        },
        {
          title: 'Ce que vous pouvez tester avec la version gratuite',
          body: "Notre version d'essai gratuite vous donne accès à la puissance totale de l'algorithme Wav2Lip standard. Vous pouvez :\n\n• Importer une vidéo de face et y associer la voix off de votre choix.\n\n• Lancer la génération et visionner le rendu pour juger de la précision du lip-sync.\n\n• Constater la simplicité du flux de travail 100% en ligne sans code.\n\nL'offre gratuite vous permet d'obtenir un rendu d'évaluation avec un filigrane discret. Les crédits initiaux sont renouvelés via des bonus quotidiens pour vous permettre de tester différents réglages.",
        },
        {
          title: 'Quand passer à la version supérieure Pro',
          body: "L'essai gratuit est idéal pour valider le concept sur de courtes séquences. Cependant, si vos besoins s'intensifient (génération de vidéos plus longues, absence de filigrane, traitement prioritaire sur nos serveurs H100 ou stockage cloud persistant), le passage à un pack de crédits ou à un abonnement Pro s'avère indispensable.\n\nLes forfaits payants vous permettent de supprimer définitivement le filigrane et d'obtenir des vitesses de traitement maximales.",
        },
      ]}
      bullets={[
        "Essai 100% gratuit, aucune carte de crédit requise lors de l'inscription.",
        'Crédits de test offerts immédiatement pour démarrer votre premier projet.',
        "Accès à l'algorithme de synchronisation standard pour évaluer la qualité.",
        'Bonus de connexion quotidiens pour prolonger vos tests gratuitement.',
        'Mise à niveau simple et flexible vers les forfaits Pro à tout moment.',
      ]}
    />
  );
}
