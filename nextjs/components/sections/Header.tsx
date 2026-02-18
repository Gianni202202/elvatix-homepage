'use client';

import Link from 'next/link';
import { useState } from 'react';
import Button from '@/components/ui/Button';

const links = [
  { label: 'Platform', href: '/platform' },
  { label: 'Features', href: '/features' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Cases', href: '/cases' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-[1200px] z-50 bg-white/95 backdrop-blur-xl rounded-full px-6 py-3 flex items-center justify-between shadow-[0_2px_20px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.04)]">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-900 no-underline">
          Elvatix
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors no-underline"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="outline" href="/start">Start gratis</Button>
          <Button variant="primary" href="/demo">Boek een demo</Button>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1 bg-transparent border-none cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className={`block w-5 h-0.5 bg-gray-800 transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-gray-800 transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-gray-800 transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile Nav */}
      {open && (
        <div className="fixed top-[72px] left-3 right-3 bg-white rounded-2xl p-4 shadow-[0_8px_40px_rgba(0,0,0,0.12)] z-50 flex flex-col gap-2 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-3 text-base font-medium text-gray-700 border-b border-gray-100 last:border-b-0 no-underline"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 flex flex-col gap-2">
            <Button variant="outline" href="/start">Start gratis</Button>
            <Button variant="primary" href="/demo">Boek een demo</Button>
          </div>
        </div>
      )}
    </>
  );
}
