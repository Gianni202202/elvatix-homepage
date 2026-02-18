import Container from '@/components/ui/Container';

const pains = [
  'Uren besteden aan het handmatig schrijven van InMails',
  'Lage response rates op generieke berichten',
  'Geen inzicht in welke outreach het beste werkt',
  'Meerdere losse tools die niet samenwerken',
];

export default function PainPoints() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-16">
          {pains.map((pain, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100"
            >
              <span className="text-red-500 text-lg mt-0.5">&#10005;</span>
              <p className="text-gray-700 text-sm">{pain}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Wat als het anders kon?
          </h2>
          <p className="text-gray-600 text-lg">
            Een nieuwe manier van recruiters bereiken.
          </p>
        </div>
      </Container>
    </section>
  );
}
