'use client';

import { useState } from 'react';
import Container from '@/components/ui/Container';
import Link from 'next/link';

const tabs = [
  {
    label: 'AI InMail Writer',
    title: 'Schrijf gepersonaliseerde InMails in seconden',
    desc: 'Onze AI analyseert het LinkedIn profiel en schrijft een op maat gemaakte InMail. Geen templates, geen generieke berichten - elke outreach voelt persoonlijk.',
    link: '/features',
  },
  {
    label: 'Smart Sequences',
    title: 'Automatiseer je follow-up flows',
    desc: 'Stel slimme sequences in die automatisch follow-ups sturen op basis van gedrag. Meer antwoorden, minder handmatig werk.',
    link: '/features',
  },
  {
    label: 'LinkedIn Automation',
    title: 'Automatiseer connectieverzoeken en profiel bezoeken',
    desc: 'Laat Elvatix voor je werken: automatische profielbezoeken, connectieverzoeken en engagement - alles binnen de limieten van LinkedIn.',
    link: '/features',
  },
  {
    label: 'Analytics',
    title: 'Inzicht in je recruitment performance',
    desc: 'Realtime dashboards tonen je responspercentage, best presterende berichten en campagne resultaten. Data-gedreven recruiten wordt de norm.',
    link: '/features',
  },
];

export default function Features() {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <section className="py-20 bg-white">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Neem je recruitment workflow van losse tools naar een krachtig platform
          </h2>
          <p className="text-gray-600 text-lg">
            Bekijk de features die Elvatix uniek maken - elk onderdeel is een volwaardig product bij andere aanbieders.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-0 mb-12 border-b border-gray-200 overflow-x-auto">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setActive(i)}
              className={`px-6 py-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 -mb-px bg-transparent cursor-pointer ${
                active === i
                  ? 'text-linkedin border-linkedin'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{tab.title}</h3>
            <p className="text-gray-600 leading-relaxed mb-6">{tab.desc}</p>
            <Link
              href={tab.link}
              className="text-linkedin font-semibold hover:text-linkedin-dark transition-colors no-underline"
            >
              Meer over {tab.label} &rarr;
            </Link>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-linkedin-light rounded-card p-8 min-h-[280px] flex items-center justify-center">
            <p className="text-gray-500 italic">Feature preview - {tab.label}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
