import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform — Elvatix",
  description: "Ontdek het Elvatix platform: AI-powered recruitment tools voor InMails, connectieverzoeken, reminders en analytics.",
};

const features = [
  { icon: "💬", title: "AI InMails", desc: "Genereer gepersonaliseerde InMails op basis van het LinkedIn-profiel van je kandidaat. Eén klik, klaar.", href: "/features/inmails" },
  { icon: "🤝", title: "Connectieverzoeken", desc: "Schrijf connectieverzoeken die opvallen en daadwerkelijk geaccepteerd worden. Geen standaard templates.", href: "/features/connections" },
  { icon: "⏰", title: "Smart Reminders", desc: "Automatische follow-ups afgestemd op eerdere interacties. Nooit meer een kandidaat vergeten.", href: "/features/reminders" },
  { icon: "📊", title: "Analytics Dashboard", desc: "Zie welke berichten converteren, welke templates het beste werken en waar je tijd het meest oplevert.", href: "/features/analytics" },
  { icon: "🤖", title: "Custom GPT", desc: "Train je eigen AI-model op jouw schrijfstijl, tone-of-voice en branchekennis. Uniek voor Elvatix.", href: "/platform" },
  { icon: "📝", title: "Templates", desc: "Bewaar en deel je beste berichten als template. Gebruik ze als startpunt voor nieuwe outreach.", href: "/platform" },
];

const steps = [
  { num: "01", title: "Plak een LinkedIn URL", desc: "Voer de LinkedIn-URL van je kandidaat in. Elvatix haalt automatisch alle relevante profieldata op." },
  { num: "02", title: "AI analyseert het profiel", desc: "Onze AI leest werkervaring, skills, headline en carrièrepad. Binnen seconden begrijpt het wie je kandidaat is." },
  { num: "03", title: "Ontvang gepersonaliseerde berichten", desc: "Je krijgt een InMail én connectieverzoek op maat. Persoonlijk, relevant en in natuurlijk Nederlands." },
];

export default function PlatformPage() {
  return (
    <main className="page-top">
      {/* Hero */}
      <section style={{ padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#8db600", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
            Platform
          </p>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, color: "#111", lineHeight: 1.1, marginBottom: 24 }}>
            Eén platform voor al je LinkedIn recruitment
          </h1>
          <p style={{ fontSize: 18, color: "#6b7280", lineHeight: 1.7, maxWidth: 600, margin: "0 auto 40px" }}>
            Elvatix combineert AI-powered messaging, slimme follow-ups en diepgaande analytics in één intuïtief platform. Gebouwd door recruiters, voor recruiters.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            <a href="/demo" className="pill-btn pill-btn-primary" style={{ padding: "14px 32px", fontSize: 16 }}>Boek een demo</a>
            <a href="/start" className="pill-btn pill-btn-outline" style={{ padding: "14px 32px", fontSize: 16 }}>Start gratis</a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: "80px 24px", background: "#f9fafb" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, textAlign: "center", color: "#111", marginBottom: 16 }}>
            Alles wat je nodig hebt
          </h2>
          <p style={{ textAlign: "center", color: "#6b7280", fontSize: 16, maxWidth: 500, margin: "0 auto 48px" }}>
            Elk onderdeel is een volwaardig product — samen vormen ze het krachtigste recruitment platform.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {features.map((f) => (
              <a key={f.title} href={f.href} style={{ background: "#fff", borderRadius: 16, padding: 32, border: "1px solid #e5e7eb", textDecoration: "none", transition: "box-shadow 0.2s" }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.6 }}>{f.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, textAlign: "center", color: "#111", marginBottom: 56 }}>
            Hoe werkt het?
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            {steps.map((s) => (
              <div key={s.num} style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
                <div style={{ fontSize: 48, fontWeight: 900, color: "#e5e7eb", lineHeight: 1, minWidth: 60 }}>{s.num}</div>
                <div>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: "#111", marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", background: "#111", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: "#fff", marginBottom: 16 }}>Klaar om te starten?</h2>
          <p style={{ color: "#9ca3af", fontSize: 16, marginBottom: 32 }}>Probeer Elvatix gratis of boek een demo met ons team.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            <a href="/demo" className="pill-btn pill-btn-white" style={{ padding: "14px 32px", fontSize: 16 }}>Boek een demo</a>
            <a href="/start" className="pill-btn pill-btn-outline" style={{ padding: "14px 32px", fontSize: 16, color: "#fff", borderColor: "#fff" }}>Start gratis</a>
          </div>
        </div>
      </section>
    </main>
  );
}
