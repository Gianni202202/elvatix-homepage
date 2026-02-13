import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connectieverzoeken — Elvatix",
  description: "Schrijf LinkedIn connectieverzoeken die geaccepteerd worden. Kort, persoonlijk en altijd binnen de 300 karakters.",
};

export default function ConnectionsPage() {
  return (
    <main className="page-top">
      <section style={{ padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#8db600", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Connectieverzoeken</p>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, color: "#111", lineHeight: 1.1, marginBottom: 24 }}>
            Connectieverzoeken die opvallen
          </h1>
          <p style={{ fontSize: 18, color: "#6b7280", lineHeight: 1.7, maxWidth: 600, margin: "0 auto 40px" }}>
            LinkedIn geeft je maar 300 karakters. Elvatix maakt daar het meeste van — met een persoonlijke hook die laat zien dat je je hebt verdiept.
          </p>
          <div style={{ fontSize: 100, marginBottom: 40 }}>��</div>
        </div>
      </section>

      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div style={{ background: "#fef2f2", borderRadius: 16, padding: 32, border: "1px solid #fecaca" }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#dc2626", marginBottom: 16 }}>❌ Zonder Elvatix</h3>
              <div style={{ background: "#fff", borderRadius: 12, padding: 20, fontSize: 14, color: "#374151", lineHeight: 1.6 }}>
                "Hallo, ik wil je graag toevoegen aan mijn netwerk. Ik ben recruiter en heb een interessante vacature die bij je zou passen."
              </div>
              <p style={{ fontSize: 13, color: "#dc2626", marginTop: 12, fontWeight: 500 }}>🔴 15% acceptatiegraad</p>
            </div>
            <div style={{ background: "#f0fdf4", borderRadius: 16, padding: 32, border: "1px solid #bbf7d0" }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#16a34a", marginBottom: 16 }}>✅ Met Elvatix</h3>
              <div style={{ background: "#fff", borderRadius: 12, padding: 20, fontSize: 14, color: "#374151", lineHeight: 1.6 }}>
                "Mooie stap van backend development naar platform architecture, Lisa. We zoeken iemand met precies die brug-ervaring. Benieuwd?"
              </div>
              <p style={{ fontSize: 13, color: "#16a34a", marginTop: 12, fontWeight: 500 }}>🟢 52% acceptatiegraad</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>
          {[
            { title: "Altijd binnen 300 karakters", desc: "LinkedIn's harde limiet. Elvatix telt mee en optimaliseert elke letter." },
            { title: "Specifiek en relevant", desc: "Elke connectieverzoek noemt iets concreets uit het profiel — een recente stap, een specifieke skill, of een opvallend bedrijf." },
            { title: "Geen formele afsluiting", desc: "Geen 'Met vriendelijke groet'. Kort, direct, en uitnodigend om te reageren." },
          ].map((item) => (
            <div key={item.title} style={{ background: "#f9fafb", borderRadius: 16, padding: 32, border: "1px solid #e5e7eb" }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 8 }}>{item.title}</h3>
              <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "80px 24px", background: "#111", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: "#fff", marginBottom: 16 }}>Probeer het zelf</h2>
          <p style={{ color: "#9ca3af", fontSize: 16, marginBottom: 32 }}>Genereer een connectieverzoek met de gratis tool op onze homepage.</p>
          <a href="/#lead-magnet" className="pill-btn pill-btn-white" style={{ padding: "14px 32px", fontSize: 16 }}>Probeer gratis →</a>
        </div>
      </section>
    </main>
  );
}
