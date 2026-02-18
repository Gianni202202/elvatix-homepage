'use client';

import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

const checklist = [
  'Persoonlijke walkthrough van het platform',
  'Advies op maat voor jouw workflow',
  'Live voorbeeld met een LinkedIn profiel',
  'Q&A met ons team',
];

export default function DemoPage() {
  return (
    <main className="pt-32 pb-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-linkedin-light text-linkedin text-sm font-semibold mb-4">Demo</span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Zie Elvatix in actie</h1>
            <p className="text-gray-600 leading-relaxed mb-8">
              Boek een persoonlijke demo van 30 minuten. We laten je zien hoe Elvatix werkt voor jouw specifieke situatie — of je nu solo recruiter bent of een team van 50+ aanstuurt.
            </p>
            <div className="flex flex-col gap-4">
              {checklist.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="text-linkedin font-bold">&#10003;</span>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-card p-8 md:p-10 border border-gray-200 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Plan je demo</h2>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Voornaam</label>
                  <input type="text" placeholder="Jan" className="w-full px-4 py-3 rounded-xl border border-gray-300 text-base outline-none focus:border-linkedin focus:ring-1 focus:ring-linkedin transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Achternaam</label>
                  <input type="text" placeholder="De Vries" className="w-full px-4 py-3 rounded-xl border border-gray-300 text-base outline-none focus:border-linkedin focus:ring-1 focus:ring-linkedin transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Zakelijk e-mailadres</label>
                <input type="email" placeholder="jan@bedrijf.nl" className="w-full px-4 py-3 rounded-xl border border-gray-300 text-base outline-none focus:border-linkedin focus:ring-1 focus:ring-linkedin transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Bedrijfsnaam</label>
                <input type="text" placeholder="Recruitment BV" className="w-full px-4 py-3 rounded-xl border border-gray-300 text-base outline-none focus:border-linkedin focus:ring-1 focus:ring-linkedin transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Teamgrootte</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-300 text-base outline-none focus:border-linkedin focus:ring-1 focus:ring-linkedin transition-colors bg-white">
                  <option>1-5 recruiters</option>
                  <option>6-20 recruiters</option>
                  <option>21-50 recruiters</option>
                  <option>50+ recruiters</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Bericht (optioneel)</label>
                <textarea placeholder="Vertel ons over je huidige workflow..." rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-300 text-base outline-none focus:border-linkedin focus:ring-1 focus:ring-linkedin transition-colors resize-y font-[inherit]" />
              </div>
              <Button variant="primary" type="submit">Demo aanvragen</Button>
            </form>
          </div>
        </div>
      </Container>
    </main>
  );
}
