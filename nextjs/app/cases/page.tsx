import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies \u2014 Elvatix',
  description: 'Ontdek hoe recruitmentbureaus zoals Manpower en Vibe Group hun outreach transformeerden met Elvatix.',
};

const cases = [
  {
    company: 'Manpower',
    industry: 'Uitzenden & Detachering',
    logo: '\uD83C\uDFE2',
    challenge: 'Het team van 40+ recruiters verstuurde handmatig InMails die te generiek waren. Response rates lagen onder de 15% en de doorlooptijd van vacatures liep op.',
    solution: 'Manpower implementeerde Elvatix voor het volledige recruitment team. Elke recruiter genereert nu gepersonaliseerde berichten op basis van LinkedIn profieldata, met follow-up reminders en analytics per medewerker.',
    results: [
      { metric: 'Response rate', before: '14%', after: '41%' },
      { metric: 'Time-to-fill', before: '34 dagen', after: '21 dagen' },
      { metric: 'Tijd per bericht', before: '8 min', after: '30 sec' },
    ],
    quote: 'Elvatix heeft de manier waarop ons team kandidaten benadert compleet veranderd. De berichten voelen echt persoonlijk \u2014 kandidaten merken niet dat AI meehielp.',
    quoteName: 'Lisa van der Berg',
    quoteRole: 'Head of Talent Acquisition, Manpower Nederland',
  },
  {
    company: 'Vibe Group',
    industry: 'IT Recruitment & Detachering',
    logo: '\u26A1',
    challenge: 'Als snelgroeiend IT-recruitmentbureau had Vibe Group moeite om de outreach-kwaliteit te bewaken bij schaalvergroting. Nieuwe recruiters hadden weken nodig om het niveau van seniors te bereiken.',
    solution: 'Met Elvatix kregen juniors direct toegang tot AI-gestuurde berichten die het niveau van senior recruiters evenaarden. Custom GPT werd getraind op de Vibe Group schrijfstijl.',
    results: [
      { metric: 'Onboarding-tijd recruiters', before: '6 weken', after: '1 week' },
      { metric: 'Connectie-acceptatie', before: '23%', after: '52%' },
      { metric: 'Berichten per dag p.p.', before: '15', after: '60+' },
    ],
    quote: 'De impact was direct zichtbaar. Onze juniors presteerden binnen een week op senior niveau. Dat had ik niet voor mogelijk gehouden.',
    quoteName: 'Mark de Vries',
    quoteRole: 'COO, Vibe Group',
  },
];

export default function CasesPage() {
  return (
    <main className="pt-32 pb-0">
      <Container className="text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-linkedin-light text-linkedin text-sm font-semibold mb-4">Case Studies</span>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">Resultaten die voor zich spreken</h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Ontdek hoe toonaangevende recruitmentbureaus hun outreach transformeerden met Elvatix.
        </p>
      </Container>

      {cases.map((c) => (
        <section key={c.company} className="mb-16">
          <Container className="max-w-4xl">
            <div className="bg-gray-50 rounded-card p-8 md:p-12 border border-gray-200">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-5xl">{c.logo}</span>
                <div>
                  <h2 className="text-3xl font-extrabold text-gray-900">{c.company}</h2>
                  <p className="text-sm text-gray-500">{c.industry}</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-base font-bold text-gray-900 mb-2">De uitdaging</h3>
                <p className="text-gray-600 leading-relaxed">{c.challenge}</p>
              </div>

              <div className="mb-8">
                <h3 className="text-base font-bold text-gray-900 mb-2">De oplossing</h3>
                <p className="text-gray-600 leading-relaxed">{c.solution}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {c.results.map((r) => (
                  <div key={r.metric} className="bg-white rounded-card p-6 text-center border border-gray-200">
                    <p className="text-xs text-gray-500 mb-2">{r.metric}</p>
                    <p className="text-sm text-gray-400 line-through mb-1">{r.before}</p>
                    <p className="text-3xl font-extrabold text-linkedin">{r.after}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-card p-8 border-l-4 border-linkedin">
                <p className="text-gray-700 leading-relaxed italic mb-4">&ldquo;{c.quote}&rdquo;</p>
                <p className="text-sm font-semibold text-gray-900">{c.quoteName}</p>
                <p className="text-xs text-gray-500">{c.quoteRole}</p>
              </div>
            </div>
          </Container>
        </section>
      ))}

      <section className="bg-gradient-to-br from-linkedin via-linkedin-dark to-[#003366] py-20">
        <Container className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Word de volgende success story</h2>
          <p className="text-white/70 mb-8">Ontdek wat Elvatix voor jouw team kan betekenen.</p>
          <Button variant="white" href="/demo">Boek een demo</Button>
        </Container>
      </section>
    </main>
  );
}
