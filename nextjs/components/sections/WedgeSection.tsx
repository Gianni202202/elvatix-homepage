import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Link from 'next/link';

const items = [
  { icon: '&#9889;', label: '10x sneller outreach' },
  { icon: '&#127919;', label: 'Hogere response rates' },
  { icon: '&#128640;', label: 'Geautomatiseerde follow-ups' },
  { icon: '&#128161;', label: 'AI-gepersonaliseerde berichten' },
  { icon: '&#128202;', label: 'Realtime analytics' },
];

export default function WedgeSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <Container>
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-linkedin-light text-linkedin text-sm font-semibold mb-4">
            De kloof wordt groter
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Recruitment verandert. Snel.
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Wie blijft vasthouden aan de oude manier, loopt achter. Met de Elvatix AI Copilot ben je altijd een stap voor.
          </p>
          <Button variant="primary" href="/platform">
            Ontdek de AI Copilot &rarr;
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-16">
          {items.map((item, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-card bg-white border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <p className="text-3xl mb-3" dangerouslySetInnerHTML={{ __html: item.icon }} />
              <p className="text-sm font-semibold text-gray-700">{item.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
