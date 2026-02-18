'use client';

import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function StartPage() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center pt-32 pb-16">
      <div className="max-w-[480px] w-full px-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-gray-900 mb-3">Start gratis met Elvatix</h1>
          <p className="text-gray-600 leading-relaxed">
            Maak een account aan en verstuur je eerste gepersonaliseerde InMail binnen 60 seconden.
          </p>
        </div>

        <div className="bg-white rounded-card p-8 md:p-10 border border-gray-200 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
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
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Wachtwoord</label>
              <input type="password" placeholder="Min. 8 tekens" className="w-full px-4 py-3 rounded-xl border border-gray-300 text-base outline-none focus:border-linkedin focus:ring-1 focus:ring-linkedin transition-colors" />
            </div>
            <Button variant="primary" type="submit">Account aanmaken</Button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-4 leading-relaxed">
            Door je aan te melden ga je akkoord met onze <Link href="/terms" className="text-linkedin no-underline">voorwaarden</Link> en <Link href="/privacy" className="text-linkedin no-underline">privacybeleid</Link>.
          </p>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Al een account? <Link href="/login" className="text-linkedin font-semibold no-underline hover:text-linkedin-dark transition-colors">Log in &rarr;</Link>
        </p>
      </div>
    </main>
  );
}
