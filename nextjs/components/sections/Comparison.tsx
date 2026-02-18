import Container from '@/components/ui/Container';

const rows = [
  {
    category: 'InMail schrijven',
    old: { text: 'Handmatig per kandidaat', time: '15 min/InMail' },
    new_: { text: 'AI schrijft gepersonaliseerd', time: '10 sec/InMail' },
  },
  {
    category: 'Follow-ups',
    old: { text: 'Handmatig bijhouden in Excel', time: '30 min/dag' },
    new_: { text: 'Automatische sequences', time: '0 min/dag' },
  },
  {
    category: 'Connectieverzoeken',
    old: { text: 'Handmatig versturen', time: '20 min/dag' },
    new_: { text: 'Geautomatiseerd', time: '0 min/dag' },
  },
  {
    category: 'Analytics',
    old: { text: 'Geen inzicht', time: '—' },
    new_: { text: 'Realtime dashboards', time: 'Altijd' },
  },
];

export default function Comparison() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            De oude manier vs. De nieuwe manier
          </h2>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-hidden rounded-card border border-gray-200">
          <div className="grid grid-cols-[1fr_200px_1fr] bg-gray-50 border-b border-gray-200">
            <div className="p-4 text-sm font-bold text-red-600 text-center">De oude manier</div>
            <div className="p-4 text-sm font-bold text-gray-500 text-center">Categorie</div>
            <div className="p-4 text-sm font-bold text-linkedin text-center">De nieuwe manier</div>
          </div>
          {rows.map((row, i) => (
            <div key={i} className="grid grid-cols-[1fr_200px_1fr] border-b border-gray-100 last:border-b-0">
              <div className="p-4 text-center">
                <p className="text-gray-700 text-sm">{row.old.text}</p>
                <p className="text-gray-400 text-xs mt-1">{row.old.time}</p>
              </div>
              <div className="p-4 flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-700">{row.category}</span>
              </div>
              <div className="p-4 text-center bg-linkedin-light/30">
                <p className="text-gray-700 text-sm">{row.new_.text}</p>
                <p className="text-linkedin text-xs font-semibold mt-1">{row.new_.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {rows.map((row, i) => (
            <div key={i} className="rounded-card border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 text-sm font-bold text-gray-700">{row.category}</div>
              <div className="grid grid-cols-2">
                <div className="p-4 border-r border-gray-100">
                  <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1">Oud</p>
                  <p className="text-gray-700 text-sm">{row.old.text}</p>
                  <p className="text-gray-400 text-xs mt-1">{row.old.time}</p>
                </div>
                <div className="p-4 bg-linkedin-light/30">
                  <p className="text-xs font-bold text-linkedin uppercase tracking-wider mb-1">Nieuw</p>
                  <p className="text-gray-700 text-sm">{row.new_.text}</p>
                  <p className="text-linkedin text-xs font-semibold mt-1">{row.new_.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
