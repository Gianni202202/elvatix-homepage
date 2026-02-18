import Container from '@/components/ui/Container';

const stats = [
  { value: '10x', label: 'Snellere outreach' },
  { value: '85%', label: 'Hogere response rate' },
  { value: '500+', label: 'Actieve recruiters' },
  { value: '2M+', label: 'Berichten verzonden' },
];

export default function Stats() {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            De cijfers liegen niet
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-8 bg-white rounded-card border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <p className="text-4xl md:text-5xl font-black text-linkedin mb-2">{stat.value}</p>
              <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
