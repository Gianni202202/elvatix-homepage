import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Smart Reminders \u2014 Elvatix',
  description: 'Automatische follow-ups afgestemd op eerdere interacties. Nooit meer een kandidaat vergeten op te volgen.',
};

const features = [
  { icon: '\uD83D\uDCC5', title: 'Slim plannen', desc: 'Stel in na hoeveel dagen je wilt opvolgen. Elvatix herinnert je op het juiste moment.' },
  { icon: '\u270D\uFE0F', title: 'AI follow-up berichten', desc: "Geen 'Ik wilde even checken'. Elvatix genereert een follow-up die verwijst naar je vorige bericht." },
  { icon: '\uD83D\uDD14', title: 'Dashboard notificaties', desc: 'Zie al je openstaande follow-ups in \u00E9\u00E9n overzicht. Prioriteit op basis van urgentie en response-kans.' },
  { icon: '\uD83D\uDCC8', title: 'Hogere response rate', desc: 'Kandidaten die een relevante follow-up krijgen reageren 3x vaker dan bij een cold InMail.' },
];

export default function RemindersPage() {
  return (
    <main className="pt-32 pb-0">
      <Container className="text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-linkedin-light text-linkedin text-sm font-semibold mb-4">Reminders</span>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">Follow-ups die vanzelf gaan</h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-10">
          80% van de plaatsingen komt na het tweede of derde contact. Elvatix zorgt dat je nooit meer een follow-up mist.
        </p>
        <div className="text-8xl mb-10">\u23F0</div>
      </Container>

      <Container className="max-w-4xl mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((item) => (
            <div key={item.title} className="bg-gray-50 rounded-card p-8 border border-gray-200">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Container>

      <section className="bg-gradient-to-br from-linkedin via-linkedin-dark to-[#003366] py-20">
        <Container className="text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Klaar om te starten?</h2>
          <p className="text-white/70 mb-8">Smart Reminders zijn beschikbaar in het Pro-plan.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="white" href="/pricing">Bekijk pricing</Button>
            <Button variant="outline" href="/demo" className="border-white text-white hover:bg-white/10">Boek een demo</Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
