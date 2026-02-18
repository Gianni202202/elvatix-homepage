import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

const solutions = [
  {
    title: 'Bureau Recruiters',
    desc: 'Manage meerdere klanten, automatiseer outreach per vacature, en meet performance per consultant.',
    link: '/solutions',
  },
  {
    title: 'In-house Recruiters',
    desc: 'Vind talent voor je eigen organisatie met gepersonaliseerde outreach en slimme follow-ups.',
    link: '/solutions',
  },
  {
    title: 'Freelance Recruiters',
    desc: 'Werk sneller als solist. Alle tools die je nodig hebt in een betaalbaar platform.',
    link: '/solutions',
  },
];

export default function Solutions() {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-linkedin-light text-linkedin text-sm font-semibold mb-4">
            Oplossingen
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Gebouwd voor elk type recruiter
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Of je nu voor een bureau werkt, in-house zit, of freelance opereert — Elvatix past zich aan jouw workflow aan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((sol, i) => (
            <div
              key={i}
              className="bg-white rounded-card p-8 border border-gray-200 hover:shadow-lg hover:border-linkedin transition-all group"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-linkedin transition-colors">
                {sol.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">{sol.desc}</p>
              <Button variant="outline" href={sol.link}>
                Meer info &rarr;
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
