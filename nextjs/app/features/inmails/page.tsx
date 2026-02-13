import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI InMails — Elvatix",
  description: "Genereer gepersonaliseerde LinkedIn InMails op basis van profieldata. Elke keer uniek, relevant en in natuurlijk Nederlands.",
};

export default function InMailsPage() {
  return (
    <main className="page-top">
      <section style={{ padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#8db600", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>InMails</p>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, color: "#111", lineHeight: 1.1, marginBottom: 24 }}>
            InMails die gelezen worden
          </h1>
          <p style={{ fontSize: 18, color: "#6b7280", lineHeight: 1.7, maxWidth: 600, margin: "0 auto 40px" }}>
            Geen copy-paste templates meer. Elvatix analyseert het volledige LinkedIn profiel en schrijft een bericht dat aansluit op de werkervaring, skills en carrière van je kandidaat.
          </p>
          <div style={{ fontSize: 100, marginBottom: 40 }}>💬</div>
        </div>
      </section>

      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>
          {[
            { title: "Profiel-gebaseerde personalisatie", desc: "Elvatix leest werkervaring, headline, skills en carrièrepad. Het bericht refereert aan specifieke details — geen generieke zinnen." },
            { title: "Chronologisch bewust", desc: "AI onderscheidt huidige en vorige functies. Iemand die nu CEO is en eerder developer was? Het bericht klopt altijd." },
            { title: "Tone-of-voice controle", desc: "Kies tussen formeel en informeel. Of train Custom GPT op jouw eigen schrijfstijl voor maximale consistentie." },
            { title: "Nederlands én Engels", desc: "Native kwaliteit in beide talen. Geen vertaaltaal of stijve constructies — gewoon hoe een mens het zou schrijven." },
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
          <p style={{ color: "#9ca3af", fontSize: 16, marginBottom: 32 }}>Ga naar de homepage en test de InMail generator met een LinkedIn URL.</p>
          <a href="/#lead-magnet" className="pill-btn pill-btn-white" style={{ padding: "14px 32px", fontSize: 16 }}>Probeer gratis →</a>
        </div>
      </section>
    </main>
  );
}
