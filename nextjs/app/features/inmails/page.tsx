import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI InMails \u2014 Elvatix',
  description: 'Genereer gepersonaliseerde LinkedIn InMails op basis van profieldata. Elke keer uniek, relevant en in natuurlijk Nederlands.',
};

const features = [
  { title: 'Profiel-gebaseerde personalisatie', desc: 'Elvatix leest werkervaring, headline, skills en carri\u00E8repad. Het bericht refereert aan specifieke details \u2014 geen generieke zinnen.' },
  { title: 'Chronologisch bewust', desc: 'AI onderscheidt huidige en vorige functies. Iemand die nu CEO is en eerder developer was? Het bericht klopt altijd.' },
  { title: 'Tone-of-voice controle', desc: 'Kies tussen formeel en informeel. Of train Custom GPT op jouw eigen schrijfstijl voor maximale consistentie.' },
  { title: 'Nederlands \u00E9n Engels', desc: 'Native kwaliteit in beide talen. Geen vertaaltaal of stijve constructies \u2014 gewoon hoe een mens het zou schrijven.' },
];

export default function InMailsPage() {
  return (
    <main className="pt-32 pb-0">
      <Container className="text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-linkedin-light text-linkedin text-sm font-semibold mb-4">InMails</span>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">InMails die gelezen worden</h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-10">
          Geen copy-paste templates meer. Elvatix analyseert het volledige LinkedIn profiel en schrijft een bericht dat aansluit op de werkervaring, skills en carri\u00E8re van je kandidaat.
        </p>
        <div className="text-8xl mb-10">\uD83D\uDCAC</div>
      </Container>

      <Container className="max-w-4xl mb-16">
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
          <p className="text-white/70 mb-8">Ga naar de homepage en test de InMail generator met een LinkedIn URL.</p>
          <Button variant="white" href="/#lead-magnet">Probeer gratis &rarr;</Button>
        </Container>
      </section>
    </main>
  );
}
