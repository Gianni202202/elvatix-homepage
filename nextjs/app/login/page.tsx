'use client';

import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center pt-32 pb-16">
      <div className="max-w-[420px] w-full px-6">
        <div className="bg-white rounded-card p-10 border border-gray-200 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Welkom terug</h1>
            <p className="text-gray-500">Log in op je Elvatix account</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">E-mailadres</label>
              <input type="email" placeholder="naam@bedrijf.nl" className="w-full px-4 py-3 rounded-xl border border-gray-300 text-base outline-none focus:border-linkedin focus:ring-1 focus:ring-linkedin transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Wachtwoord</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-gray-300 text-base outline-none focus:border-linkedin focus:ring-1 focus:ring-linkedin transition-colors" />
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-1.5 text-gray-500 cursor-pointer">
                <input type="checkbox" className="rounded" /> Onthoud mij
              </label>
              <Link href="#" className="text-linkedin font-medium no-underline hover:text-linkedin-dark transition-colors">Wachtwoord vergeten?</Link>
            </div>

            <Button variant="primary" type="submit">Inloggen</Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Nog geen account? <Link href="/start" className="text-linkedin font-semibold no-underline hover:text-linkedin-dark transition-colors">Start gratis &rarr;</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
