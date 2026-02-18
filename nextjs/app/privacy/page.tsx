import Container from '@/components/ui/Container';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacybeleid \u2014 Elvatix',
  description: 'Lees hoe Elvatix omgaat met je gegevens en privacy.',
};

const sections = [
  { title: '1. Welke gegevens verzamelen wij?', content: 'Wij verzamelen de gegevens die je aan ons verstrekt bij het aanmaken van een account (naam, e-mailadres, bedrijfsnaam) en gebruiksdata om onze dienst te verbeteren. LinkedIn profieldata wordt alleen verwerkt tijdens het genereren van berichten en wordt niet permanent opgeslagen.' },
  { title: '2. Waarvoor gebruiken wij je gegevens?', content: 'Je gegevens worden uitsluitend gebruikt voor het leveren van de Elvatix-dienst, het verbeteren van onze AI-modellen (geanonimiseerd), communicatie over je account en het voldoen aan wettelijke verplichtingen.' },
  { title: '3. Delen met derden', content: 'Wij delen je persoonlijke gegevens niet met derden, tenzij dit noodzakelijk is voor het leveren van onze dienst (bijv. hosting providers) of wettelijk vereist is. Wij verkopen nooit je gegevens.' },
  { title: '4. Beveiliging', content: 'Wij nemen passende technische en organisatorische maatregelen om je gegevens te beschermen tegen ongeautoriseerde toegang, verlies of misbruik. Alle data wordt versleuteld opgeslagen en overgedragen.' },
  { title: '5. Je rechten', content: 'Je hebt het recht om je gegevens in te zien, te corrigeren of te laten verwijderen. Ook kun je bezwaar maken tegen de verwerking van je gegevens. Neem hiervoor contact op via privacy@elvatix.com.' },
  { title: '6. Cookies', content: 'Wij gebruiken functionele cookies die noodzakelijk zijn voor het functioneren van de website. Analytische cookies worden alleen geplaatst met je toestemming.' },
  { title: '7. Contact', content: 'Voor vragen over dit privacybeleid kun je contact opnemen via privacy@elvatix.com of via onze contactpagina.' },
];

export default function PrivacyPage() {
  return (
    <main className="pt-32 pb-16">
      <Container className="max-w-3xl">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Privacybeleid</h1>
        <p className="text-sm text-gray-400 mb-12">Laatst bijgewerkt: februari 2026</p>

        <div className="space-y-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h2>
              <p className="text-gray-600 leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
