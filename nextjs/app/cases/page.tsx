import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies — Elvatix",
  description: "Ontdek hoe recruitmentbureaus zoals Manpower en Vibe Group hun outreach transformeerden met Elvatix.",
};

const cases = [
  {
    company: "Manpower",
    industry: "Uitzenden & Detachering",
    logo: "🏢",
    challenge: "Het team van 40+ recruiters verstuurde handmatig InMails die te generiek waren. Response rates lagen onder de 15% en de doorlooptijd van vacatures liep op.",
    solution: "Manpower implementeerde Elvatix voor het volledige recruitment team. Elke recruiter genereert nu gepersonaliseerde berichten op basis van LinkedIn profieldata, met follow-up reminders en analytics per medewerker.",
    results: [
      { metric: "Response rate", before: "14%", after: "41%" },
      { metric: "Time-to-fill", before: "34 dagen", after: "21 dagen" },
      { metric: "Tijd per bericht", before: "8 min", after: "30 sec" },
    ],
    quote: "Elvatix heeft de manier waarop ons team kandidaten benadert compleet veranderd. De berichten voelen echt persoonlijk — kandidaten merken niet dat AI meehielp.",
    quoteName: "Lisa van der Berg",
    quoteRole: "Head of Talent Acquisition, Manpower Nederland",
  },
  {
    company: "Vibe Group",
    industry: "IT Recruitment & Detachering",
    logo: "⚡",
    challenge: "Als snelgroeiend IT-recruitmentbureau had Vibe Group moeite om de outreach-kwaliteit te bewaken bij schaalvergroting. Nieuwe recruiters hadden weken nodig om het niveau van seniors te bereiken.",
    solution: "Met Elvatix kregen juniors direct toegang tot AI-gestuurde berichten die het niveau van senior recruiters evenaarden. Custom GPT werd getraind op de Vibe Group schrijfstijl.",
    results: [
      { metric: "Onboarding-tijd recruiters", before: "6 weken", after: "1 week" },
      { metric: "Connectie-acceptatie", before: "23%", after: "52%" },
      { metric: "Berichten per dag p.p.", before: "15", after: "60+" },
    ],
    quote: "De impact was direct zichtbaar. Onze juniors presteerden binnen een week op senior niveau. Dat had ik niet voor mogelijk gehouden.",
    quoteName: "Mark de Vries",
    quoteRole: "COO, Vibe Group",
  },
];

export default function CasesPage() {
  return (
    <main className="page-top">
      <section style={{ padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#8db600", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
            Case Studies
          </p>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, color: "#111", lineHeight: 1.1, marginBottom: 24 }}>
            Resultaten die voor zich spreken
          </h1>
          <p style={{ fontSize: 18, color: "#6b7280", lineHeight: 1.7, maxWidth: 600, margin: "0 auto" }}>
            Ontdek hoe toonaangevende recruitmentbureaus hun outreach transformeerden met Elvatix.
          </p>
        </div>
      </section>

      {cases.map((c) => (
        <section key={c.company} style={{ padding: "0 24px 80px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", background: "#f9fafb", borderRadius: 24, padding: 48, border: "1px solid #e5e7eb" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
              <span style={{ fontSize: 48 }}>{c.logo}</span>
              <div>
                <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111" }}>{c.company}</h2>
                <p style={{ fontSize: 14, color: "#6b7280" }}>{c.industry}</p>
              </div>
            </div>

            <div style={{ marginBottom: 32 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111", marginBottom: 8 }}>De uitdaging</h3>
              <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7 }}>{c.challenge}</p>
            </div>

            <div style={{ marginBottom: 32 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111", marginBottom: 8 }}>De oplossing</h3>
              <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7 }}>{c.solution}</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 32 }}>
              {c.results.map((r) => (
                <div key={r.metric} style={{ background: "#fff", borderRadius: 16, padding: 24, textAlign: "center", border: "1px solid #e5e7eb" }}>
                  <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>{r.metric}</p>
                  <p style={{ fontSize: 14, color: "#9ca3af", textDecoration: "line-through", marginBottom: 4 }}>{r.before}</p>
                  <p style={{ fontSize: 28, fontWeight: 800, color: "#8db600" }}>{r.after}</p>
                </div>
              ))}
            </div>

            <div style={{ background: "#fff", borderRadius: 16, padding: 32, borderLeft: "4px solid #8db600" }}>
              <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.7, fontStyle: "italic", marginBottom: 16 }}>"{c.quote}"</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{c.quoteName}</p>
              <p style={{ fontSize: 13, color: "#6b7280" }}>{c.quoteRole}</p>
            </div>
          </div>
        </section>
      ))}

      <section style={{ padding: "80px 24px", background: "#111", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: "#fff", marginBottom: 16 }}>Word de volgende success story</h2>
          <p style={{ color: "#9ca3af", fontSize: 16, marginBottom: 32 }}>Ontdek wat Elvatix voor jouw team kan betekenen.</p>
          <a href="/demo" className="pill-btn pill-btn-white" style={{ padding: "14px 32px", fontSize: 16 }}>Boek een demo</a>
        </div>
      </section>
    </main>
  );
}
