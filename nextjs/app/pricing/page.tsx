import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing — Elvatix',
  description: 'Transparante prijzen, geen verrassingen. Begin gratis, upgrade wanneer je klaar bent.',
};

const tiers = [
  {
    name: 'Starter',
    price: 'Gratis',
    period: '',
    desc: 'Perfect om te beginnen',
    features: ['5 gegenereerde berichten per maand', 'InMails + connectieverzoeken', 'LinkedIn profiel-analyse', 'Nederlands en Engels'],
    cta: 'Start gratis',
    href: '/start',
    primary: false,
  },
  {
    name: 'Pro',
    price: '\u20AC49',
    period: '/mnd',
    desc: 'Voor actieve recruiters',
    features: ['Onbeperkt berichten', 'Smart follow-up reminders', 'Analytics dashboard', 'Custom tone-of-voice', 'Template bibliotheek', 'Prioriteit support'],
    cta: 'Start 14 dagen gratis',
    href: '/start',
    primary: true,
    badge: 'Populairste keuze',
  },
  {
    name: 'Enterprise',
    price: 'Op maat',
    period: '',
    desc: 'Voor teams & bureaus',
    features: ['Alles uit Pro', 'Custom GPT op jouw schrijfstijl', 'Team analytics & rapportages', 'Onboarding & training', 'Dedicated account manager', 'SSO & API toegang', 'SLA garantie'],
    cta: 'Neem contact op',
    href: '/contact',
    primary: false,
  },
];

export default function PricingPage() {
  return (
    <main className="pt-32 pb-16">
      <Container>
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-linkedin-light text-linkedin text-sm font-semibold mb-4">Pricing</span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">Transparante prijzen, geen verrassingen</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Begin gratis. Upgrade wanneer je klaar bent. Geen contracten, geen verborgen kosten.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`bg-white rounded-card p-10 flex flex-col relative ${
                t.primary
                  ? 'border-2 border-linkedin shadow-[0_8px_32px_rgba(10,102,194,0.15)]'
                  : 'border border-gray-200'
              }`}
            >
              {t.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-linkedin text-white text-xs font-semibold px-4 py-1 rounded-full">
                  {t.badge}
                </span>
              )}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.name}</h3>
              <div className="mb-2">
                <span className="text-4xl font-black text-gray-900">{t.price}</span>
                {t.period && <span className="text-gray-500 ml-1">{t.period}</span>}
              </div>
              <p className="text-sm text-gray-500 mb-6">{t.desc}</p>
              <ul className="list-none p-0 m-0 flex-1 space-y-0">
                {t.features.map((f) => (
                  <li key={f} className="text-sm text-gray-700 py-2 border-b border-gray-100 flex items-center gap-2">
                    <span className="text-linkedin font-bold">&#10003;</span> {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button variant={t.primary ? 'primary' : 'outline'} href={t.href}>{t.cta}</Button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500">
          Vragen over pricing? <Link href="/contact" className="text-linkedin font-semibold no-underline hover:text-linkedin-dark transition-colors">Neem contact op &rarr;</Link>
        </p>
      </Container>
    </main>
  );
}
