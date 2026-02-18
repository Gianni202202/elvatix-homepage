import Container from '@/components/ui/Container';

export default function QuoteBanner() {
  return (
    <section className="py-20 bg-gradient-to-br from-linkedin via-linkedin-dark to-[#003366]">
      <Container className="text-center">
        <span className="text-5xl md:text-6xl text-white/20 font-serif leading-none block mb-4">&ldquo;</span>
        <blockquote className="text-2xl md:text-3xl font-bold text-white leading-relaxed max-w-3xl mx-auto mb-8">
          Recruitment draait niet meer om harder werken. Het draait om slimmer werken — met de juiste technologie.
        </blockquote>
        <div>
          <p className="text-white font-semibold">Gianni Linssen</p>
          <p className="text-white/60 text-sm">Founder, Elvatix</p>
        </div>
      </Container>
    </section>
  );
}
