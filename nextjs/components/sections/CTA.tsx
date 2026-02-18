import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function CTA() {
  return (
    <section className="bg-gradient-to-br from-linkedin via-linkedin-dark to-[#003366] py-20">
      <Container className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Word een recruitment machine
        </h2>
        <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
          Klaar om te zien hoe Elvatix je recruitment workflow transformeert? Begin vandaag nog.
        </p>
        <Button variant="white" href="/demo">Boek een demo</Button>
      </Container>
    </section>
  );
}
