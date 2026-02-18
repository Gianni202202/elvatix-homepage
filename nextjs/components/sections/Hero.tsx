import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white pt-32 pb-20 overflow-hidden">
      {/* Background decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-linkedin/5 rounded-full blur-3xl" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-linkedin/3 rounded-full blur-3xl" />

      <Container className="relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Tag */}
          <span className="inline-block px-4 py-1.5 rounded-full bg-linkedin-light text-linkedin text-sm font-semibold mb-6">
            #1 AI Recruitment Copilot
          </span>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Jouw complete recruitment workflow.{' '}
            <span className="text-linkedin">Een easy-to-use, AI-native platform.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Geen losse tools meer. Personaliseer je LinkedIn outreach, automatiseer InMails en
            connectieverzoeken — allemaal vanuit een AI-copilot.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button variant="primary" href="/demo">Boek een demo</Button>
            <Button variant="outline" href="/start">Start gratis</Button>
          </div>

          {/* Trust line */}
          <p className="text-sm text-gray-500">
            Vertrouwd door 500+ recruiters in Nederland en Belgie
          </p>
        </div>
      </Container>
    </section>
  );
}
