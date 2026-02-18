import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Over ons \u2014 Elvatix',
  description: 'Elvatix is gebouwd door recruiters die gefrustreerd waren door generieke outreach. Ontdek ons verhaal.',
};

const stats = [
  { value: '2024', label: 'Opgericht' },
  { value: '500+', label: 'Actieve gebruikers' },
  { value: '250K+', label: 'Berichten gegenereerd' },
];

const values = [
  { title: 'Persoonlijk boven alles', desc: 'Technologie moet menselijke interacties versterken, niet vervangen. Elk bericht moet aanvoelen alsof het met de hand geschreven is.' },
  { title: 'Transparantie', desc: 'Geen black boxes. Je ziet altijd wat onze AI genereert en je hebt volledige controle over het eindresultaat.' },
  { title: 'Gebouwd voor recruiters', desc: 'Geen generiek AI-product. Elke feature is ontworpen op basis van feedback van werkende recruiters.' },
];

export default function OverOnsPage() {
  return (
    <main className="pt-32 pb-16">
      <Container className="max-w-4xl">
        {/* Hero */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-linkedin-light text-linkedin text-sm font-semibold mb-4">Over ons</span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">Wij geloven dat recruitment persoonlijk moet zijn</h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Elvatix is ontstaan uit frustratie. Frustratie over copy-paste templates, lage response rates en uren handmatig werk dat beter kan.
          </p>
        </div>

        {/* Story */}
        <div className="bg-gray-50 rounded-card p-8 md:p-12 border border-gray-200 mb-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-4">Ons verhaal</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>Als recruiters weten we hoe het voelt: je stuurt tientallen InMails per dag, maar de meeste worden niet eens geopend. Niet omdat de vacature niet interessant is, maar omdat het bericht te generiek is.</p>
            <p>We vroegen ons af: wat als AI het LinkedIn-profiel van een kandidaat kon lezen en daar een echt persoonlijk bericht van kon maken? Niet een template met een naam erin, maar een bericht dat laat zien dat je je hebt verdiept.</p>
            <p>Dat werd Elvatix. Een AI copilot die recruiters helpt om betere berichten te schrijven, sneller op te volgen en slimmer te werken. Gebouwd in Nederland, voor de Nederlandse recruitmentmarkt.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-16">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-card p-8 border border-gray-200 text-center">
              <p className="text-4xl font-black text-linkedin mb-2">{s.value}</p>
              <p className="text-sm text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Onze waarden</h2>
        <div className="flex flex-col gap-6 mb-16">
          {values.map((v) => (
            <div key={v.title} className="bg-gray-50 rounded-card p-8 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{v.title}</h3>
              <p className="text-gray-600 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* CTA */}
      <section className="bg-gradient-to-br from-linkedin via-linkedin-dark to-[#003366] py-20">
        <Container className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Laten we kennismaken</h2>
          <p className="text-white/70 mb-8">Benieuwd wat Elvatix voor jou kan betekenen?</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="white" href="/demo">Boek een demo</Button>
            <Button variant="outline" href="/contact" className="border-white text-white hover:bg-white/10">Contact &rarr;</Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
