import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connectieverzoeken \u2014 Elvatix',
  description: 'Schrijf LinkedIn connectieverzoeken die geaccepteerd worden. Kort, persoonlijk en altijd binnen de 300 karakters.',
};

const features = [
  { title: 'Altijd binnen 300 karakters', desc: "LinkedIn's harde limiet. Elvatix telt mee en optimaliseert elke letter." },
  { title: 'Specifiek en relevant', desc: 'Elke connectieverzoek noemt iets concreets uit het profiel \u2014 een recente stap, een specifieke skill, of een opvallend bedrijf.' },
  { title: 'Geen formele afsluiting', desc: "Geen 'Met vriendelijke groet'. Kort, direct, en uitnodigend om te reageren." },
];

export default function ConnectionsPage() {
  return (
    <main className="pt-32 pb-0">
      <Container className="text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-linkedin-light text-linkedin text-sm font-semibold mb-4">Connectieverzoeken</span>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">Connectieverzoeken die opvallen</h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-10">
          LinkedIn geeft je maar 300 karakters. Elvatix maakt daar het meeste van \u2014 met een persoonlijke hook die laat zien dat je je hebt verdiept.
        </p>
        <div className="text-8xl mb-10">\uD83E\uDD1D</div>
      </Container>

      <Container className="max-w-4xl mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-red-50 rounded-card p-8 border border-red-200">
            <h3 className="text-base font-bold text-red-600 mb-4">\u274C Zonder Elvatix</h3>
            <div className="bg-white rounded-xl p-5 text-sm text-gray-700 leading-relaxed">
              "Hallo, ik wil je graag toevoegen aan mijn netwerk. Ik ben recruiter en heb een interessante vacature die bij je zou passen."
            </div>
            <p className="text-xs font-medium text-red-600 mt-3">\uD83D\uDD34 15% acceptatiegraad</p>
          </div>
          <div className="bg-green-50 rounded-card p-8 border border-green-200">
            <h3 className="text-base font-bold text-green-600 mb-4">\u2705 Met Elvatix</h3>
            <div className="bg-white rounded-xl p-5 text-sm text-gray-700 leading-relaxed">
              "Mooie stap van backend development naar platform architecture, Lisa. We zoeken iemand met precies die brug-ervaring. Benieuwd?"
            </div>
            <p className="text-xs font-medium text-green-600 mt-3">\uD83D\uDFE2 52% acceptatiegraad</p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {features.map((item) => (
            <div key={item.title} className="bg-gray-50 rounded-card p-8 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Container>

      <section className="bg-gradient-to-br from-linkedin via-linkedin-dark to-[#003366] py-20">
        <Container className="text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Probeer het zelf</h2>
          <p className="text-white/70 mb-8">Genereer een connectieverzoek met de gratis tool op onze homepage.</p>
          <Button variant="white" href="/#lead-magnet">Probeer gratis &rarr;</Button>
        </Container>
      </section>
    </main>
  );
}
