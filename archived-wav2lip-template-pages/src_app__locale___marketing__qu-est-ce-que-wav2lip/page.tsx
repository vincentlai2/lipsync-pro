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
    title: "Qu'est-ce que Wav2Lip ? Definition et usages",
    description:
      "Decouvrez ce qu'est Wav2Lip, comment fonctionne la synchronisation labiale IA et pourquoi l'utiliser en ligne.",
    locale,
    pathname: '/qu-est-ce-que-wav2lip',
  });
}

export default function WhatIsWav2LipPage() {
  return (
    <Wav2LipContentPage
      eyebrow="Définition Wav2Lip"
      title="Qu'est-ce que Wav2Lip ? Définition, fonctionnement et usages"
      description="Wav2Lip est une technologie d'intelligence artificielle de pointe spécialisée dans la synchronisation labiale, permettant d'aligner parfaitement les mouvements de la bouche d'une vidéo avec n'importe quelle piste audio."
      sections={[
        {
          title: 'Définition et origines de Wav2Lip',
          body: "Wav2Lip est un modèle d'apprentissage profond (Deep Learning) spécialisé dans la synchronisation labiale (lip-sync).\n\nDéveloppé à l'origine par des chercheurs universitaires, il s'est imposé comme la référence absolue dans l'industrie pour synchroniser les mouvements des lèvres de n'importe quel visage dans une vidéo avec une piste de voix off arbitraire, et ce de manière totalement indépendante de la langue parlée (français, anglais, espagnol, etc.).",
        },
        {
          title: 'Le fonctionnement technique sous le capot',
          body: "Contrairement aux méthodes d'animation traditionnelles ou aux simples filtres de morphing, Wav2Lip s'appuie sur deux composants clés entraînés conjointement :\n\n• Un discriminateur visuel de synchronisation labiale (basé sur le réseau de neurones SyncNet) qui évalue si les mouvements de la bouche correspondent au signal audio.\n\n• Un réseau générateur GAN (Generative Adversarial Network) qui reconstruit et modifie la zone inférieure du visage à chaque image.\n\nCette double architecture permet à l'IA d'apprendre des correspondances acoustiques extrêmement précises, garantissant que les phonèmes prononcés coïncident parfaitement avec la forme des lèvres.",
        },
        {
          title: 'Les limites et exigences pour un rendu optimal',
          body: "Bien que la technologie soit révolutionnaire, elle a besoin de bonnes conditions sources pour briller :\n\n• Résolution du visage : Plus le visage est net, de face et éclairé, plus l'IA saura générer des lèvres détaillées sans distorsion ni effet de flou.\n\n• Profil et inclinaison : Les visages de profil strict ou les rotations brusques de la tête peuvent perturber le discriminateur et provoquer des artefacts visuels.\n\n• Netteté de la voix : Une voix claire avec peu d'échos ou de bruits parasites aide le modèle à capter la structure des mots et à mieux caler l'animation.",
        },
      ]}
      bullets={[
        "Modèle de Deep Learning spécialisé basé sur l'architecture SyncNet-GAN.",
        'Totalement indépendant de la langue parlée (parfait pour le français).',
        'Fonctionne sur des visages en mouvement ou des images fixes de face.',
        "Post-traitement d'amélioration faciale (Face Restoration) intégré en ligne.",
        "Idéal pour le doublage de films, les avatars animés et l'e-learning.",
      ]}
    />
  );
}
