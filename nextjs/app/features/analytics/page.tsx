import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Analytics \u2014 Elvatix',
  description: 'Inzicht in je outreach performance. Zie welke berichten converteren en optimaliseer je recruitment strategie.',
};

const stats = [
  { label: 'Berichten verstuurd', value: '1.247', change: '+23%' },
  { label: 'Response rate', value: '41%', change: '+12%' },
  { label: 'Connectie-acceptatie', value: '52%', change: '+8%' },
  { label: 'Gesprekken gepland', value: '89', change: '+31%' },
];

const features = [
  { title: 'Response tracking', desc: 'Zie welke berichten reacties opleveren en welke niet. Leer van je beste prestaties.' },
  { title: 'Template vergelijking', desc: 'A/B test verschillende tonen en aanpakken. Data vertelt je wat werkt voor jouw doelgroep.' },
  { title: 'Team performance', desc: 'Vergelijk resultaten binnen je team. Identificeer best practices en deel ze eenvoudig.' },
  { title: 'Export & rapportages', desc: 'Download je data als CSV of PDF. Ideaal voor management rapportages en klantpresentaties.' },
];

export default function AnalyticsPage() {
  return (
    <main className="pt-32 pb-0">
      <Container className="text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-linkedin-light text-linkedin text-sm font-semibold mb-4">Analytics</span>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">Data-gedreven recruitment</h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Stop met gokken. Zie precies welke berichten, templates en aanpakken de beste resultaten opleveren.
        </p>
      </Container>

      <Container className="max-w-4xl mb-16">
        <div className="bg-gray-50 rounded-card p-8 md:p-10 border border-gray-200 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Performance overzicht</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-white rounded-xl p-5 border border-gray-200">
                <p className="text-xs text-gray-500 mb-2">{s.label}</p>
                <p className="text-3xl font-extrabold text-gray-900 mb-1">{s.value}</p>
                <p className="text-sm font-semibold text-green-600">{s.change}</p>
              </div>
            ))}
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
          <h2 className="text-3xl font-extrabold text-white mb-4">Klaar om je resultaten te meten?</h2>
          <p className="text-white/70 mb-8">Analytics is beschikbaar in het Pro-plan.</p>
          <Button variant="white" href="/pricing">Bekijk pricing</Button>
        </Container>
      </section>
    </main>
  );
}
