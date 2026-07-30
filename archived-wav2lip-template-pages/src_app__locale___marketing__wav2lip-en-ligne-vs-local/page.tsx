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
    title: 'Wav2Lip en ligne vs Version locale Python - Comparatif',
    description:
      "Comparez les avantages de Wav2Lip en ligne (SaaS Web) face à l'installation locale en Python. Choisissez la solution la plus rapide pour vos créations.",
    locale,
    pathname: '/wav2lip-en-ligne-vs-local',
  });
}

export default function Wav2LipAlternativePage() {
  return (
    <Wav2LipContentPage
      eyebrow="Comparatif Wav2Lip"
      title="Wav2Lip en ligne vs Version locale Python"
      description="L'utilisation du code source local de Wav2Lip offre une flexibilité de développement, tandis que notre version cloud en ligne (SaaS) supprime le besoin de GPU dédiés et de configurations logicielles complexes."
      sections={[
        {
          title:
            'Pourquoi chercher une alternative à l’installation locale de Wav2Lip ?',
          body: "L'algorithme open source original de Wav2Lip disponible sur GitHub est puissant, mais sa mise en œuvre locale constitue un véritable parcours du combattant pour la majorité des créateurs, traducteurs et professionnels du marketing.\n\nL'installation requiert des compétences techniques poussées : configuration des pilotes Nvidia CUDA, gestion des versions spécifiques de Python, et résolution des conflits de bibliothèques de Deep Learning (PyTorch). Notre outil en ligne (SaaS) se présente comme l'alternative moderne et sans code idéale, déportant toute la complexité et la puissance de calcul GPU dans le cloud.",
        },
        {
          title: 'Comparatif : Wav2Lip en ligne vs Script Python Github',
          body: "• Version GitHub Locale : Conçue pour les chercheurs en IA et les développeurs. Elle nécessite une carte graphique Nvidia haut de gamme, du temps d'installation et une maintenance technique constante. De plus, la qualité de sortie brute est souvent floue.\n\n• Notre Version Cloud Web : Conçue pour la productivité et la vitesse. Vous déposez simplement votre vidéo et votre fichier audio, et nos serveurs génèrent le résultat instantanément. Notre plateforme intègre également un modèle de restauration faciale (Face Restoration) qui corrige le flou des lèvres pour un rendu haute définition.",
        },
        {
          title:
            'L’alternative Web Cloud : Plus rapide, plus nette, sans limites',
          body: "En choisissant notre alternative SaaS, vous profitez d'avantages impossibles à obtenir avec le script de base :\n\n• Restauration faciale HD : Reconstruction intelligente du visage pour un rendu ultra-réaliste.\n\n• Zéro file d'attente : Traitement parallèle immédiat sur notre infrastructure cloud.\n\n• Confidentialité absolue : Tous vos fichiers médias sont automatiquement et définitivement effacés après 30 jours pour garantir la sécurité de vos données.",
        },
      ]}
      bullets={[
        'Une alternative 100% en ligne : Aucun script Python ni pilote CUDA à installer.',
        'Économique : Pas besoin d’acheter de carte graphique Nvidia coûteuse ou de louer des serveurs GPU.',
        'Qualité supérieure : Algorithme de lissage de visage HD intégré pour un rendu réaliste.',
        'Traitement instantané : Rendu cloud ultra-rapide en quelques secondes.',
        'Sécurité garantie : Suppression automatique de vos fichiers après 30 jours.',
      ]}
    />
  );
}
