import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Oplossingen \u2014 Elvatix',
  description: 'Elvatix biedt oplossingen voor recruitmentbureaus, detacheringsbureaus, corporate recruiters, executive search en freelancers.',
};

const audiences = [
  { title: 'Recruitmentbureaus', desc: 'Schaal je outreach zonder extra headcount. Elvatix helpt je team om 3x meer gepersonaliseerde berichten te versturen met dezelfde bezetting.', stats: 'Gemiddeld 47% hogere response rate', icon: '\uD83C\uDFE2' },
  { title: 'Detacheringsbureaus', desc: 'Bouw een warme kandidatenpool op met connectieverzoeken die converteren. Ideaal voor high-volume recruitment in IT, finance en engineering.', stats: '2,3x meer geaccepteerde connectieverzoeken', icon: '\uD83D\uDD17' },
  { title: 'Corporate Recruiters', desc: 'Versterk je employer brand met berichten die je bedrijfscultuur uitstralen. Elvatix past de tone-of-voice aan op jouw organisatie.', stats: '65% tijdsbesparing op sourcing', icon: '\uD83C\uDFDB\uFE0F' },
  { title: 'Executive Search', desc: 'Voor senior rollen telt elke zin. Elvatix analyseert carri\u00E8repaden en schrijft berichten die C-level kandidaten aanspreken.', stats: 'Gemiddeld 38% response op C-level outreach', icon: '\uD83C\uDFAF' },
  { title: 'Freelance Recruiters', desc: 'Werk slimmer als je voor jezelf werkt. E\u00E9n tool die je hele outreach beheert \u2014 van eerste bericht tot follow-up.', stats: '5 uur per week bespaard', icon: '\uD83D\uDCBC' },
];

export default function SolutionsPage() {
  return (
    <main className="pt-32 pb-0">
      <Container className="text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-linkedin-light text-linkedin text-sm font-semibold mb-4">Oplossingen</span>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">Gebouwd voor elke type recruiter</h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Of je nu werkt bij een bureau, corporate, of zelfstandig bent \u2014 Elvatix past zich aan op jouw workflow.
        </p>
      </Container>

      <Container className="max-w-4xl mb-16">
        <div className="flex flex-col gap-8">
          {audiences.map((a) => (
            <div key={a.title} className="bg-gray-50 rounded-card p-8 md:p-10 border border-gray-200 flex flex-col md:flex-row gap-6 items-center">
              <div className="text-6xl md:text-7xl shrink-0">{a.icon}</div>
              <div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-3">{a.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-3">{a.desc}</p>
                <p className="text-sm font-semibold text-linkedin">{a.stats}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <section className="bg-gradient-to-br from-linkedin via-linkedin-dark to-[#003366] py-20">
        <Container className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Past Elvatix bij jou?</h2>
          <p className="text-white/70 mb-8">Boek een demo en ontdek hoe Elvatix jouw recruitment transformeert.</p>
          <Button variant="white" href="/demo">Boek een demo</Button>
        </Container>
      </section>
    </main>
  );
}
