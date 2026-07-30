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
    title: 'Comment utiliser Wav2Lip - Tutoriel en ligne',
    description:
      'Tutoriel simple pour utiliser Wav2Lip en ligne: importer une video, ajouter un audio et generer une synchronisation labiale IA.',
    locale,
    pathname: '/comment-utiliser-wav2lip',
  });
}

export default function HowToUseWav2LipPage() {
  return (
    <Wav2LipContentPage
      eyebrow="Tutoriel Wav2Lip"
      title="Comment utiliser Wav2Lip en ligne : guide et tutoriel complet"
      description="Suivez ce guide étape par étape pour réussir la synchronisation labiale de vos vidéos avec notre outil de traitement en ligne, sans aucune ligne de code."
      sections={[
        {
          title: 'Étape 1 : Choisir et préparer votre vidéo source',
          body: "Pour obtenir un résultat convaincant, le choix de la vidéo est l'élément le plus important. Privilégiez une séquence de courte durée (entre 5 et 60 secondes) mettant en scène une personne seule, filmée de face, avec un bon éclairage et une bouche clairement visible.\n\nÉvitez les obstacles physiques comme des mains passant devant le visage, des microphones trop proches de la bouche ou des boissons. De plus, les mouvements de tête trop brusques ou les profils marqués peuvent perturber la détection faciale opérée par l'IA.",
        },
        {
          title: 'Étape 2 : Préparer et importer le fichier audio',
          body: "L'audio est le signal de référence qui guidera la déformation des lèvres par l'algorithme. Vous pouvez téléverser un fichier vocal au format MP3 ou WAV. Pour un rendu naturel :\n\n• Assurez-vous que la voix est nette, sans bruit de fond persistant, souffle excessif ou musique forte.\n\n• Si vous effectuez un doublage (par exemple, traduire une vidéo de l'anglais vers le français), essayez de calquer le rythme de la voix française sur le débit de parole d'origine. Un rythme similaire évite les décalages visuels inesthétiques.",
        },
        {
          title: 'Étape 3 : Lancer la génération et télécharger le résultat',
          body: "Une fois vos deux fichiers téléversés dans notre espace de travail, cliquez sur le bouton de génération. L'algorithme va analyser le rythme acoustique de la voix et animer la bouche de la vidéo correspondante image par image.\n\nNos serveurs cloud appliquent automatiquement un modèle de restauration faciale pour lisser la zone inférieure du visage et éliminer le flou. Dès que le traitement est terminé, vous pouvez visionner l'aperçu directement en ligne et télécharger votre vidéo finale en un clic.",
        },
      ]}
      bullets={[
        'Étape 1 : Téléverser une vidéo de face nette avec visage visible et éclairé.',
        'Étape 2 : Ajouter un fichier audio de voix off ou de doublage propre.',
        'Étape 3 : Lancer la génération de synchronisation labiale automatisée.',
        "Étape 4 : Visionner l'aperçu généré et télécharger la vidéo finale en HD.",
        "Politique de remboursement automatique en cas d'erreur de traitement.",
      ]}
    />
  );
}
