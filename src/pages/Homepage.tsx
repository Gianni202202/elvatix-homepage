import { useState, useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════
   ELVATIX HOMEPAGE — Loxo-style redesign
   ═══════════════════════════════════════════ */

// ── Data ──────────────────────────────────
const cyclingTexts = [
  'Persoonlijke InMails genereren',
  'Connectieverzoeken op schaal versturen',
  'Slimme follow-ups automatiseren',
  'Jouw tone of voice leren',
  'Direct vanuit LinkedIn Recruiter werken',
];

const painPoints = [
  '10-15 minuten per profiel besteden aan berichten schrijven.',
  'Kopiëren uit ChatGPT, plakken in LinkedIn, weer handmatig bijschaven…',
  'Honderden InMails versturen die allemaal hetzelfde klinken.',
];

const comparisons = [
  {
    task: 'InMails schrijven',
    oldWay: 'Handmatig persoonlijke berichten typen',
    oldTime: '10-15 min / kandidaat',
    newWay: 'AI-gegenereerde persoonlijke InMails',
    newTime: '30 sec / kandidaat',
  },
  {
    task: 'Tone of voice',
    oldWay: 'Kopiëren uit ChatGPT zonder context',
    oldTime: 'Onpersoonlijk resultaat',
    newWay: 'Elvatix leert jouw unieke stijl',
    newTime: '100% jouw stem',
  },
  {
    task: 'Follow-ups versturen',
    oldWay: 'Handmatig bijhouden en opnieuw schrijven',
    oldTime: 'Vaak vergeten',
    newWay: 'Slimme automatische follow-ups',
    newTime: '0 sec extra werk',
  },
  {
    task: 'Tool-switching',
    oldWay: 'Schakelen tussen LinkedIn, ChatGPT, spreadsheets',
    oldTime: '5+ min / kandidaat',
    newWay: 'Direct in LinkedIn Recruiter',
    newTime: '0 extra stappen',
  },
];

const testimonials = [
  '"Elvatix heeft ons recruitmentproces volledig getransformeerd."',
  '"260 persoonlijke InMails in 1,7 uur — ongelooflijk."',
  '"Eindelijk een tool die écht Nederlands klinkt."',
  '"Onze respons is verdubbeld sinds we Elvatix gebruiken."',
  '"De beste investering die we dit jaar hebben gedaan."',
  '"Het voelt alsof ik een extra recruiter erbij heb."',
];

const testimonials2 = [
  '"Ik bespaar elke week minimaal 5 uur met Elvatix."',
  '"Kandidaten reageren vaker omdat berichten echt persoonlijk zijn."',
  '"Geen gedoe meer met ChatGPT copy-paste workflows."',
  '"Manpower case: 63+ uur bespaard op één project."',
  '"De Chrome-extensie werkt naadloos in LinkedIn Recruiter."',
  '"Game changer voor ons detacheringsbureau."',
];

const features = [
  {
    id: 'inmail',
    label: 'InMail Copilot',
    title: 'Schrijf perfecte InMails in seconden',
    description:
      'Upload jouw beste templates en laat Elvatix AI-gepersonaliseerde InMails genereren voor elke kandidaat. De AI analyseert LinkedIn-profielen en combineert dit met jouw tone of voice voor berichten die écht persoonlijk klinken.',
    quote:
      '"260 persoonlijke InMails in 1,7 uur in plaats van de geschatte 43-65 uur."',
    author: 'Manpower Recruiter',
    icon: '✉️',
  },
  {
    id: 'followup',
    label: 'Smart Follow-ups',
    title: 'Automatische, relevante follow-ups',
    description:
      'Elvatix stuurt slim getimede follow-up berichten die voortbouwen op je eerste InMail. Geen generieke "nog even checken" berichten, maar contextbewuste opvolging die de conversatie natuurlijk voortzet.',
    quote: '"Onze follow-up respons is met 40% gestegen dankzij de slimme opvolging."',
    author: 'Senior Recruiter, Staffing Bureau',
    icon: '🔄',
  },
  {
    id: 'templates',
    label: 'Template Learning',
    title: 'De AI leert jouw unieke stijl',
    description:
      'Upload jouw meest succesvolle templates en Elvatix leert jouw specifieke schrijfstijl, woordkeuze en aanpak. Elk gegenereerd bericht klinkt alsof jij het zelf hebt geschreven — want dat is precies de bedoeling.',
    quote: '"Het klinkt echt alsof ik elk bericht zelf heb geschreven. Kandidaten merken het verschil niet."',
    author: 'Corporate Recruiter',
    icon: '🧠',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn Integratie',
    title: 'Direct in jouw LinkedIn Recruiter',
    description:
      'Geen tool-switching meer. Elvatix werkt als Chrome-extensie direct in LinkedIn Recruiter. Importeer tot 25 kandidaten tegelijk, genereer berichten en verstuur ze — allemaal zonder LinkedIn te verlaten.',
    quote: '"Eindelijk hoef ik niet meer tussen 5 tools te schakelen. Alles zit in LinkedIn."',
    author: 'Tech Recruiter',
    icon: '💼',
  },
];

const solutions = [
  {
    title: 'Detacheringsbureaus',
    description: 'Schaal je outreach zonder kwaliteit te verliezen',
    icon: '🏢',
  },
  {
    title: 'Corporate Recruiters',
    description: 'Vind de beste kandidaten sneller dan ooit',
    icon: '👔',
  },
  {
    title: 'Recruitmentbureaus',
    description: 'Meer plaatsingen met minder handmatig werk',
    icon: '🎯',
  },
  {
    title: 'IT & Tech Recruitment',
    description: 'Bereik schaars tech-talent met persoonlijke outreach',
    icon: '💻',
  },
  {
    title: 'Executive Search',
    description: 'Premium, op maat gemaakte berichten voor C-level kandidaten',
    icon: '⭐',
  },
  {
    title: 'High-Volume Recruitment',
    description: 'Schaal op zonder in te leveren op personalisatie',
    icon: '📈',
  },
];

// ── Scroll-reveal hook ────────────────────
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('visible');
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ── Section wrapper ───────────────────────
function Section({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useFadeIn();
  return (
    <section id={id} ref={ref} className={`fade-in-section ${className}`}>
      {children}
    </section>
  );
}

// ═══════════════════════════════════════════
//  1. NAVBAR
// ═══════════════════════════════════════════
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'navbar-glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <span className="text-2xl font-extrabold tracking-tight">
            <span className="gradient-text">ELVATIX</span>
          </span>
        </a>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-8">
          {['Modules', 'Voor Wie', 'Case Studies', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, '-')}`}
              className="text-sm font-medium text-gray-700 hover:text-violet-600 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden sm:inline text-sm font-medium text-gray-600 hover:text-violet-600 transition-colors"
          >
            Inloggen
          </a>
          <a
            href="#cta"
            className="px-5 py-2.5 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 shadow-lg shadow-violet-500/25 transition-all duration-300 hover:shadow-violet-500/40"
          >
            Plan Demo
          </a>
        </div>
      </div>
    </nav>
  );
}

// ═══════════════════════════════════════════
//  2. HERO
// ═══════════════════════════════════════════
function Hero() {
  const [idx, setIdx] = useState(0);
  const [anim, setAnim] = useState('cycle-text-enter');

  useEffect(() => {
    const interval = setInterval(() => {
      setAnim('cycle-text-exit');
      setTimeout(() => {
        setIdx((p) => (p + 1) % cyclingTexts.length);
        setAnim('cycle-text-enter');
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-violet-200/40 to-blue-200/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-blue-200/30 to-violet-200/20 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 border border-violet-200 mb-8">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm font-medium text-violet-700">
            #1 Recruitment InMail & Invite Copilot
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6">
          Jouw volledige recruitment outreach.{' '}
          <span className="gradient-text">Eén AI-native Copilot.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Stop met uren besteden aan handmatige InMails. Elvatix schrijft
          persoonlijke berichten die klinken alsof jij ze zelf hebt geschreven —
          direct vanuit LinkedIn Recruiter.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <a
            href="#cta"
            className="px-8 py-4 text-base font-semibold text-white rounded-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 shadow-xl shadow-violet-500/25 transition-all duration-300 hover:shadow-violet-500/40 hover:scale-105"
          >
            Plan een demo
          </a>
          <a
            href="#modules"
            className="px-8 py-4 text-base font-semibold text-violet-700 rounded-full border-2 border-violet-200 hover:border-violet-400 hover:bg-violet-50 transition-all duration-300"
          >
            Probeer gratis
          </a>
        </div>

        {/* Social proof */}
        <p className="text-sm text-gray-500 mb-12">
          Vertrouwd door{' '}
          <span className="font-semibold text-gray-700">500+ recruiters</span>{' '}
          in Nederland · 5.0 Chrome Store · 4.4 Trustpilot
        </p>

        {/* Cycling text */}
        <div className="h-16 flex items-center justify-center">
          <span
            key={idx}
            className={`text-3xl md:text-5xl font-bold gradient-text ${anim}`}
          >
            {cyclingTexts[idx]}
          </span>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
//  3. PAIN POINTS
// ═══════════════════════════════════════════
function PainPoints() {
  return (
    <Section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        {painPoints.map((t, i) => (
          <p key={i} className="text-lg md:text-xl text-gray-600 mb-4 leading-relaxed">
            {t}
          </p>
        ))}

        <div className="flex items-center justify-center gap-4 mt-10 mb-8 flex-wrap">
          {['Tijdverspilling', 'Geld weggooien', 'Geen persoonlijk contact'].map(
            (t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 text-lg font-semibold text-red-500"
              >
                ❌ {t}.
              </span>
            )
          )}
        </div>

        <p className="text-xl text-gray-500 mb-4">
          Elvatix is geboren uit een belangrijke vraag:
        </p>
        <p className="text-3xl md:text-4xl font-bold text-gray-900">
          Wat als het anders kan?
        </p>
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════════
//  4. GAP VISUAL
// ═══════════════════════════════════════════
function GapVisual() {
  return (
    <Section className="gap-section py-24 md:py-32 px-6">
      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white text-center mb-4">
          Recruitment verandert.
        </h2>
        <p className="text-lg text-violet-200 text-center max-w-2xl mx-auto mb-16">
          Er is een risico aan vasthouden aan de status quo: terwijl je
          concurrenten transformeren, val jij achter. Met Elvatix loop je altijd
          voorop.
        </p>

        {/* Diverging paths */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Elvatix path — going UP */}
          <div className="space-y-6">
            <div className="inline-flex px-5 py-2 rounded-full border border-green-400/40 bg-green-400/10 text-green-300 font-semibold text-sm">
              Elvatix Copilot
            </div>
            {[
              'Persoonlijke berichten in seconden',
              'Jouw tone of voice, altijd consistent',
              'Automatische follow-ups die werken',
              'Top-of-mind bij hiring needs',
            ].map((t, i) => (
              <div
                key={i}
                className="flex items-start gap-3 text-white/80"
                style={{ paddingLeft: `${i * 16}px` }}
              >
                <span className="mt-1 w-3 h-3 rounded-full bg-green-400 flex-shrink-0" />
                <span className="text-sm md:text-base">{t}</span>
              </div>
            ))}
          </div>

          {/* Status Quo path — going DOWN */}
          <div className="space-y-6">
            <div className="inline-flex px-5 py-2 rounded-full border border-red-400/40 bg-red-400/10 text-red-300 font-semibold text-sm">
              De Status Quo
            </div>
            {[
              'Handmatig typen, foutgevoelig',
              'Copy-paste uit ChatGPT, onpersoonlijk',
              'Follow-ups vergeten of te laat',
              'Kandidaten haken af, je valt achter',
            ].map((t, i) => (
              <div
                key={i}
                className="flex items-start gap-3 text-white/60"
                style={{ paddingLeft: `${i * 16}px` }}
              >
                <span className="mt-1 w-3 h-3 rounded-full bg-red-400/60 flex-shrink-0" />
                <span className="text-sm md:text-base">{t}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-violet-300 font-semibold text-lg mt-16">
          ↕ De kloof wordt groter.
        </p>
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════════
//  5. OLD vs NEW COMPARISON
// ═══════════════════════════════════════════
function Comparison() {
  return (
    <Section className="py-24 px-6 bg-gradient-to-b from-slate-50 to-white" id="modules">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-6 mb-12 flex-wrap">
          <span className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 font-semibold text-sm border border-gray-200">
            De oude manier
          </span>
          <span className="text-gray-400">vs</span>
          <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold text-sm">
            De nieuwe manier
          </span>
        </div>

        <div className="space-y-6">
          {comparisons.map((c, i) => (
            <div
              key={i}
              className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-center"
            >
              {/* Old */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <p className="font-semibold text-gray-800 mb-1">{c.oldWay}</p>
                <p className="text-sm text-gray-500 italic">{c.oldTime}</p>
              </div>

              {/* Label */}
              <div className="text-center">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wide">
                  {c.task}
                </p>
              </div>

              {/* New */}
              <div className="bg-gradient-to-r from-violet-600 to-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-violet-500/15">
                <p className="font-semibold mb-1">{c.newWay}</p>
                <p className="text-sm text-violet-100 italic">{c.newTime}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════════
//  6. KEY STATS
// ═══════════════════════════════════════════
function Stats() {
  return (
    <Section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="stats-gradient rounded-3xl p-1">
          <div className="bg-white rounded-[22px] py-14 px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                { value: '4-6 uur', label: 'Bespaard per week' },
                { value: '2×', label: 'Meer respons op InMails' },
                { value: '63+', label: 'Uur bespaard (Manpower case)' },
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-5xl md:text-6xl font-extrabold gradient-text mb-2">
                    {s.value}
                  </p>
                  <p className="text-gray-600 font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <a
            href="#cta"
            className="inline-flex px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 hover:scale-105"
          >
            Ontdek wat Elvatix voor jou kan doen
          </a>
        </div>
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════════
//  7. TESTIMONIALS MARQUEE
// ═══════════════════════════════════════════
function Testimonials() {
  const doubled1 = [...testimonials, ...testimonials];
  const doubled2 = [...testimonials2, ...testimonials2];

  return (
    <Section className="py-24 px-0 overflow-hidden">
      <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-4">
        Wat recruiters zeggen
      </h2>
      <p className="text-gray-500 text-center mb-14 text-lg">
        "Gebruikers" en "fans" zijn bij ons vaak hetzelfde.
      </p>

      {/* Row 1 — scrolls left */}
      <div className="overflow-hidden mb-6">
        <div className="marquee-track marquee-left">
          {doubled1.map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[340px] bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-hover"
            >
              <p className="text-violet-700 font-semibold text-base leading-relaxed">
                {t}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="overflow-hidden mb-14">
        <div className="marquee-track marquee-right">
          {doubled2.map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[340px] bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-hover"
            >
              <p className="text-gray-700 font-semibold text-base leading-relaxed">
                {t}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Trust badges */}
      <div className="flex items-center justify-center gap-8 flex-wrap px-6">
        {[
          { icon: '🟢', label: '5.0 Chrome Store' },
          { icon: '⭐', label: '4.4 Trustpilot' },
          { icon: '🔵', label: '5.0 Google Reviews' },
        ].map((b, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100 text-sm font-medium text-gray-600"
          >
            <span>{b.icon}</span>
            <span>{b.label}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════════
//  8. TABBED FEATURES
// ═══════════════════════════════════════════
function TabbedFeatures() {
  const [active, setActive] = useState(0);
  const feat = features[active];

  return (
    <Section className="py-24 px-6" id="voor-wie">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-4">
          Van losse tools naar één{' '}
          <span className="gradient-text">krachtig platform</span>
        </h2>
        <p className="text-gray-500 text-center text-lg max-w-2xl mx-auto mb-14">
          Bekijk de Elvatix modules — elk een compleet product op zich.
        </p>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-6 mb-12 flex-wrap">
          {features.map((f, i) => (
            <button
              key={f.id}
              onClick={() => setActive(i)}
              className={`tab-underline pb-2 text-base font-medium transition-colors ${
                active === i
                  ? 'active text-violet-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Content card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center pulse-glow">
          <div>
            <span className="inline-flex px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 font-semibold text-sm mb-6">
              {feat.label}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {feat.title}
            </h3>
            <p className="text-gray-600 leading-relaxed mb-8">
              {feat.description}
            </p>
            <a
              href="#cta"
              className="text-violet-600 font-semibold hover:text-violet-800 transition-colors"
            >
              Meer informatie →
            </a>

            {/* Quote */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <p className="text-gray-700 italic mb-2">{feat.quote}</p>
              <p className="text-sm text-gray-500 font-medium">{feat.author}</p>
            </div>
          </div>

          {/* Visual placeholder — large icon/illustration area */}
          <div className="flex items-center justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl bg-gradient-to-br from-violet-50 to-blue-50 border border-violet-100 flex items-center justify-center float-animation">
              <span className="text-8xl">{feat.icon}</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════════
//  9a. SOLUTIONS GRID
// ═══════════════════════════════════════════
function Solutions() {
  return (
    <Section className="py-24 px-6 bg-gradient-to-b from-white to-slate-50" id="case-studies">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-4">
          Oplossingen voor elk type recruitment
        </h2>
        <p className="text-gray-500 text-center text-lg max-w-2xl mx-auto mb-14">
          Of je nu bij een detacheringsbureau werkt, corporate recruiter bent of
          een recruitmentbureau runt — Elvatix past zich aan jouw workflow aan.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-gray-100 card-hover cursor-pointer group"
            >
              <span className="text-4xl mb-4 block">{s.icon}</span>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-violet-700 transition-colors">
                {s.title}
              </h3>
              <p className="text-sm text-gray-500">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ═══════════════════════════════════════════
//  9b. FOOTER CTA + FOOTER
// ═══════════════════════════════════════════
function FooterCTA() {
  return (
    <section
      id="cta"
      className="py-24 px-6 bg-gradient-to-r from-violet-600 via-violet-700 to-blue-700"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
          Word een recruitment machine
        </h2>
        <p className="text-lg text-violet-100 mb-10 max-w-xl mx-auto">
          Klaar om te ontdekken hoe Elvatix jouw recruitment workflow
          transformeert? Plan een persoonlijke demo.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#"
            className="px-10 py-4 text-base font-semibold rounded-full bg-white text-violet-700 hover:bg-gray-50 shadow-xl transition-all duration-300 hover:scale-105"
          >
            Plan een demo
          </a>
          <a
            href="#"
            className="px-10 py-4 text-base font-semibold rounded-full border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-300"
          >
            Probeer gratis
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16 px-6" id="contact">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
        <div>
          <span className="text-xl font-extrabold text-white mb-4 block">
            ELVATIX
          </span>
          <p className="text-sm leading-relaxed">
            De #1 Recruitment InMail & Invite Copilot. Gebouwd in Nederland,
            voor Nederlandse recruiters.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
            Modules
          </h4>
          {['InMail Copilot', 'Smart Follow-ups', 'Template Learning', 'LinkedIn Integratie'].map(
            (l) => (
              <a
                key={l}
                href="#"
                className="block text-sm mb-2 hover:text-white transition-colors"
              >
                {l}
              </a>
            )
          )}
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
            Oplossingen
          </h4>
          {[
            'Detacheringsbureaus',
            'Corporate Recruiters',
            'Recruitmentbureaus',
            'IT & Tech',
          ].map((l) => (
            <a
              key={l}
              href="#"
              className="block text-sm mb-2 hover:text-white transition-colors"
            >
              {l}
            </a>
          ))}
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
            Bedrijf
          </h4>
          {['Over Ons', 'Case Studies', 'Contact', 'Privacy Policy'].map(
            (l) => (
              <a
                key={l}
                href="#"
                className="block text-sm mb-2 hover:text-white transition-colors"
              >
                {l}
              </a>
            )
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs">
          © {new Date().getFullYear()} Elvatix. Alle rechten voorbehouden.
        </p>
        <div className="flex items-center gap-4">
          <a href="#" className="text-xs hover:text-white transition-colors">
            Privacy
          </a>
          <a href="#" className="text-xs hover:text-white transition-colors">
            Voorwaarden
          </a>
          <a
            href="https://www.linkedin.com/company/elvatix"
            target="_blank"
            rel="noreferrer"
            className="text-xs hover:text-white transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════
//  MAIN EXPORT
// ═══════════════════════════════════════════
export default function Homepage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <PainPoints />
      <GapVisual />
      <Comparison />
      <Stats />
      <Testimonials />
      <TabbedFeatures />
      <Solutions />
      <FooterCTA />
      <Footer />
    </div>
  );
}
