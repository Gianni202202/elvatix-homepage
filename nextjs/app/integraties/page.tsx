import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Integraties \u2014 Elvatix',
  description: 'Elvatix integreert naadloos met LinkedIn, populaire ATS-systemen en je bestaande recruitment workflow.',
};

const integrations = [
  { name: 'LinkedIn', desc: 'Directe integratie met LinkedIn profielen. Plak een URL en Elvatix haalt alle relevante data op.', category: 'Platform', icon: '\uD83D\uDD17' },
  { name: 'Bullhorn', desc: 'Synchroniseer kandidaten en berichten rechtstreeks met je Bullhorn ATS.', category: 'ATS', icon: '\uD83C\uDFAF' },
  { name: 'Recruitee', desc: 'Koppel Elvatix aan Recruitee voor een naadloze workflow van sourcing tot plaatsing.', category: 'ATS', icon: '\uD83D\uDCCB' },
  { name: 'Greenhouse', desc: 'Push kandidaatinformatie en outreach data naar je Greenhouse pipeline.', category: 'ATS', icon: '\uD83C\uDF31' },
  { name: 'HubSpot', desc: 'Gebruik Elvatix-data in je HubSpot CRM voor betere candidate relationship management.', category: 'CRM', icon: '\uD83E\uDDE1' },
  { name: 'Slack', desc: 'Ontvang notificaties over responses en follow-ups direct in je Slack kanaal.', category: 'Communicatie', icon: '\uD83D\uDCAC' },
  { name: 'Zapier', desc: 'Verbind Elvatix met 5.000+ apps via Zapier. Automatiseer elke stap van je workflow.', category: 'Automatisering', icon: '\u26A1' },
  { name: 'Google Sheets', desc: 'Exporteer analytics, kandidaatlijsten en performance data naar Google Sheets.', category: 'Data', icon: '\uD83D\uDCCA' },
];

export default function IntegratiesPage() {
  return (
    <main className="pt-32 pb-0">
      <Container className="text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-linkedin-light text-linkedin text-sm font-semibold mb-4">Integraties</span>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">Werkt met je bestaande tools</h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Elvatix past in je huidige workflow. Integreer met je ATS, CRM of communicatie-tools \u2014 zonder je proces te veranderen.
        </p>
      </Container>

      <Container className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {integrations.map((integ) => (
            <div key={integ.name} className="bg-white rounded-card p-8 border border-gray-200 flex gap-5 items-start hover:shadow-lg hover:border-linkedin transition-all">
              <div className="text-4xl shrink-0">{integ.icon}</div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{integ.name}</h3>
                  <span className="text-xs font-semibold text-linkedin bg-linkedin-light px-2 py-0.5 rounded">{integ.category}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{integ.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <section className="bg-gray-50 py-16">
        <Container className="text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Mis je een integratie?</h2>
          <p className="text-gray-600 mb-6">Laat het ons weten! We bouwen actief nieuwe integraties op basis van klantvragen.</p>
          <Button variant="primary" href="/contact">Stel een integratie voor</Button>
        </Container>
      </section>
    </main>
  );
}
