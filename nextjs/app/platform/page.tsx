import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Platform \u2014 Elvatix',
  description: 'Ontdek het Elvatix platform: AI-powered recruitment tools voor InMails, connectieverzoeken, reminders en analytics.',
};

const features = [
  { icon: '\uD83D\uDCAC', title: 'AI InMails', desc: 'Genereer gepersonaliseerde InMails op basis van het LinkedIn-profiel van je kandidaat. E\u00E9n klik, klaar.', href: '/features/inmails' },
  { icon: '\uD83E\uDD1D', title: 'Connectieverzoeken', desc: 'Schrijf connectieverzoeken die opvallen en daadwerkelijk geaccepteerd worden. Geen standaard templates.', href: '/features/connections' },
  { icon: '\u23F0', title: 'Smart Reminders', desc: 'Automatische follow-ups afgestemd op eerdere interacties. Nooit meer een kandidaat vergeten.', href: '/features/reminders' },
  { icon: '\uD83D\uDCCA', title: 'Analytics Dashboard', desc: 'Zie welke berichten converteren, welke templates het beste werken en waar je tijd het meest oplevert.', href: '/features/analytics' },
  { icon: '\uD83E\uDD16', title: 'Custom GPT', desc: 'Train je eigen AI-model op jouw schrijfstijl, tone-of-voice en branchekennis. Uniek voor Elvatix.', href: '/platform' },
  { icon: '\uD83D\uDCDD', title: 'Templates', desc: 'Bewaar en deel je beste berichten als template. Gebruik ze als startpunt voor nieuwe outreach.', href: '/platform' },
];

const steps = [
  { num: '01', title: 'Plak een LinkedIn URL', desc: 'Voer de LinkedIn-URL van je kandidaat in. Elvatix haalt automatisch alle relevante profieldata op.' },
  { num: '02', title: 'AI analyseert het profiel', desc: 'Onze AI leest werkervaring, skills, headline en carri\u00E8repad. Binnen seconden begrijpt het wie je kandidaat is.' },
  { num: '03', title: 'Ontvang gepersonaliseerde berichten', desc: 'Je krijgt een InMail \u00E9n connectieverzoek op maat. Persoonlijk, relevant en in natuurlijk Nederlands.' },
];

export default function PlatformPage() {
  return (
    <main className="pt-32 pb-0">
      {/* Hero */}
      <Container className="text-center mb-20">
        <span className="inline-block px-4 py-1.5 rounded-full bg-linkedin-light text-linkedin text-sm font-semibold mb-4">Platform</span>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 max-w-3xl mx-auto">
          E\u00E9n platform voor al je LinkedIn recruitment
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-10">
          Elvatix combineert AI-powered messaging, slimme follow-ups en diepgaande analytics in \u00E9\u00E9n intu\u00EFtief platform. Gebouwd door recruiters, voor recruiters.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button variant="primary" href="/demo">Boek een demo</Button>
          <Button variant="outline" href="/start">Start gratis</Button>
        </div>
      </Container>

      {/* Features Grid */}
      <section className="bg-gray-50 py-20">
        <Container>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-4">Alles wat je nodig hebt</h2>
          <p className="text-center text-gray-600 max-w-lg mx-auto mb-12">
            Elk onderdeel is een volwaardig product \u2014 samen vormen ze het krachtigste recruitment platform.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <Link key={f.title} href={f.href} className="group bg-white rounded-card p-8 border border-gray-200 no-underline hover:shadow-lg hover:border-linkedin transition-all">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-linkedin transition-colors">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="py-20">
        <Container className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-14">Hoe werkt het?</h2>
          <div className="flex flex-col gap-12">
            {steps.map((s) => (
              <div key={s.num} className="flex gap-8 items-start">
                <div className="text-5xl font-black text-gray-200 leading-none min-w-[60px]">{s.num}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-linkedin via-linkedin-dark to-[#003366] py-20">
        <Container className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Klaar om te starten?</h2>
          <p className="text-white/70 mb-8">Probeer Elvatix gratis of boek een demo met ons team.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="white" href="/demo">Boek een demo</Button>
            <Button variant="outline" href="/start" className="border-white text-white hover:bg-white/10">Start gratis</Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
