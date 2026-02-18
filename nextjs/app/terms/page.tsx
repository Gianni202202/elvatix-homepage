import Container from '@/components/ui/Container';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Algemene Voorwaarden \u2014 Elvatix',
  description: 'Lees de algemene voorwaarden van Elvatix.',
};

const sections = [
  { title: '1. Definities', content: '"Elvatix" verwijst naar het AI-powered recruitmentplatform beschikbaar op elvatix.com. "Gebruiker" verwijst naar elke persoon die een account aanmaakt of de dienst gebruikt. "Dienst" verwijst naar alle functionaliteiten die Elvatix aanbiedt.' },
  { title: '2. Gebruik van de dienst', content: 'Door gebruik te maken van Elvatix ga je akkoord met deze voorwaarden. Je bent verantwoordelijk voor het gebruik van je account en de berichten die je verstuurt via ons platform. Elvatix is een hulpmiddel \u2014 je blijft zelf verantwoordelijk voor de inhoud van je berichten.' },
  { title: '3. Account en beveiliging', content: 'Je bent verantwoordelijk voor het vertrouwelijk houden van je inloggegevens. Meld ongeautoriseerd gebruik direct bij ons. Wij behouden het recht om accounts te blokkeren bij misbruik.' },
  { title: '4. Intellectueel eigendom', content: 'Alle content, software en technologie van Elvatix blijft eigendom van Elvatix. De berichten die je genereert zijn je eigen eigendom en mogen door jou vrij gebruikt worden.' },
  { title: '5. Beperkingen', content: 'Het is niet toegestaan om Elvatix te gebruiken voor spam, misleidende communicatie of activiteiten die in strijd zijn met de gebruiksvoorwaarden van LinkedIn. Wij behouden het recht om de dienst te beperken bij misbruik.' },
  { title: '6. Abonnementen en betaling', content: 'Pro- en Enterprise-abonnementen worden maandelijks of jaarlijks gefactureerd. Je kunt op elk moment opzeggen. Bij opzegging behoud je toegang tot het einde van de betaalde periode.' },
  { title: '7. Aansprakelijkheid', content: "Elvatix is een AI-tool die berichten genereert als suggestie. Wij zijn niet aansprakelijk voor de gevolgen van het gebruik van gegenereerde berichten. De dienst wordt aangeboden 'as is' zonder garanties op beschikbaarheid of resultaten." },
  { title: '8. Wijzigingen', content: 'Wij behouden het recht om deze voorwaarden te wijzigen. Significante wijzigingen worden gecommuniceerd via e-mail. Voortgezet gebruik na wijzigingen geldt als acceptatie.' },
  { title: '9. Toepasselijk recht', content: 'Op deze voorwaarden is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in Nederland.' },
  { title: '10. Contact', content: 'Voor vragen over deze voorwaarden kun je contact opnemen via legal@elvatix.com.' },
];

export default function TermsPage() {
  return (
    <main className="pt-32 pb-16">
      <Container className="max-w-3xl">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Algemene Voorwaarden</h1>
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
