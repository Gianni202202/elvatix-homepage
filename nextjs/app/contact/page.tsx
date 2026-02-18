'use client';

import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <main className="pt-32 pb-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-linkedin-light text-linkedin text-sm font-semibold mb-4">Contact</span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Laten we praten</h1>
            <p className="text-gray-600 leading-relaxed mb-10">
              Heb je een vraag, wil je een demo plannen, of ben je benieuwd of Elvatix bij jouw organisatie past? Laat het ons weten.
            </p>
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">E-mail</h3>
                <a href="mailto:hello@elvatix.com" className="text-linkedin no-underline hover:text-linkedin-dark transition-colors">hello@elvatix.com</a>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">LinkedIn</h3>
                <a href="https://linkedin.com/company/elvatix" target="_blank" rel="noopener noreferrer" className="text-linkedin no-underline hover:text-linkedin-dark transition-colors">linkedin.com/company/elvatix</a>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">Locatie</h3>
                <p className="text-gray-500">Nederland</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-card p-8 md:p-10 border border-gray-200 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Naam</label>
                <input type="text" placeholder="Je naam" className="w-full px-4 py-3 rounded-xl border border-gray-300 text-base outline-none focus:border-linkedin focus:ring-1 focus:ring-linkedin transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">E-mailadres</label>
                <input type="email" placeholder="naam@bedrijf.nl" className="w-full px-4 py-3 rounded-xl border border-gray-300 text-base outline-none focus:border-linkedin focus:ring-1 focus:ring-linkedin transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Onderwerp</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-300 text-base outline-none focus:border-linkedin focus:ring-1 focus:ring-linkedin transition-colors bg-white">
                  <option>Algemene vraag</option>
                  <option>Demo aanvragen</option>
                  <option>Pricing informatie</option>
                  <option>Technische support</option>
                  <option>Partnership</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Bericht</label>
                <textarea placeholder="Waar kunnen we je mee helpen?" rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-300 text-base outline-none focus:border-linkedin focus:ring-1 focus:ring-linkedin transition-colors resize-y font-[inherit]" />
              </div>
              <Button variant="primary" type="submit">Verstuur bericht</Button>
            </form>
          </div>
        </div>
      </Container>
    </main>
  );
}
