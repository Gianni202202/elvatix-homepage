import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function LeadMagnet() {
  return (
    <section className="py-20 bg-gradient-to-br from-linkedin via-linkedin-dark to-[#003366]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-semibold mb-4">
              Gratis tool
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Probeer onze AI InMail Generator
            </h2>
            <p className="text-lg text-white/80 leading-relaxed mb-8">
              Voer een LinkedIn profiel URL in en onze AI schrijft direct een gepersonaliseerde InMail.
              Geen account nodig, geen kosten.
            </p>
            <Button variant="white" href="/start">
              Probeer nu gratis &rarr;
            </Button>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-card p-8 border border-white/20">
            <div className="space-y-4">
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-white/60 text-sm mb-2">LinkedIn profiel URL</p>
                <div className="h-3 bg-white/20 rounded-full w-3/4" />
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-white/60 text-sm mb-2">Gegenereerde InMail</p>
                <div className="space-y-2">
                  <div className="h-3 bg-white/20 rounded-full" />
                  <div className="h-3 bg-white/20 rounded-full w-5/6" />
                  <div className="h-3 bg-white/20 rounded-full w-4/5" />
                  <div className="h-3 bg-white/20 rounded-full w-2/3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
