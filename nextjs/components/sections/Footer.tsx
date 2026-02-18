import Link from 'next/link';
import Container from '@/components/ui/Container';

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Platform', href: '/platform' },
      { label: 'Features', href: '/features' },
      { label: 'Integraties', href: '/integraties' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Oplossingen',
    links: [
      { label: 'Voor Bureaus', href: '/solutions' },
      { label: 'Voor In-house', href: '/solutions' },
      { label: 'Voor Freelancers', href: '/solutions' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Cases', href: '/cases' },
      { label: 'Demo', href: '/demo' },
    ],
  },
  {
    title: 'Bedrijf',
    links: [
      { label: 'Over ons', href: '/over-ons' },
      { label: 'Contact', href: '/contact' },
      { label: 'Login', href: '/login' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-16">
      <Container>
        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-gray-900 mb-4 text-sm">{col.title}</h4>
              <ul className="space-y-2 list-none p-0">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-gray-900 transition-colors no-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 pt-6 gap-4">
          <div>
            <h3 className="font-bold text-gray-900">Elvatix</h3>
            <p className="text-sm text-gray-500">2026 Elvatix. Alle rechten voorbehouden.</p>
          </div>
          <a
            href="https://linkedin.com/company/elvatix"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-linkedin hover:text-linkedin-dark transition-colors no-underline"
          >
            LinkedIn
          </a>
        </div>
      </Container>
    </footer>
  );
}
