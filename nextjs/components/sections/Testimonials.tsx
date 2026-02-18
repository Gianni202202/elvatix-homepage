import Container from '@/components/ui/Container';

const testimonials = [
  {
    quote: 'Elvatix heeft onze outreach volledig getransformeerd. We sturen nu 10x meer gepersonaliseerde berichten met een hogere response rate.',
    name: 'Marie de Vries',
    role: 'Senior Recruiter, TechStaffing NL',
  },
  {
    quote: 'De AI InMail Writer is een game-changer. Elke outreach voelt nu persoonlijk, terwijl we veel minder tijd besteden per kandidaat.',
    name: 'Thomas Bakker',
    role: 'Head of Talent, ScaleUp BV',
  },
  {
    quote: 'Vroeger had ik 4 tools nodig. Nu doet Elvatix alles in een platform. Mijn team is productiever dan ooit.',
    name: 'Lisa Jansen',
    role: 'Recruitment Lead, Digital Agency',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-linkedin-light text-linkedin text-sm font-semibold mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Wat recruiters zeggen
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-8 rounded-card bg-gray-50 border border-gray-200 hover:shadow-lg transition-shadow relative"
            >
              <span className="absolute top-4 left-6 text-5xl text-linkedin/20 font-serif leading-none">&ldquo;</span>
              <blockquote className="text-gray-700 leading-relaxed mb-6 relative z-10 pt-4">
                {t.quote}
              </blockquote>
              <div className="border-t border-gray-200 pt-4">
                <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                <p className="text-gray-500 text-sm">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
