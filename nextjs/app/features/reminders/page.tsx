import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smart Reminders — Elvatix",
  description: "Automatische follow-ups afgestemd op eerdere interacties. Nooit meer een kandidaat vergeten op te volgen.",
};

export default function RemindersPage() {
  return (
    <main className="page-top">
      <section style={{ padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#8db600", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Reminders</p>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, color: "#111", lineHeight: 1.1, marginBottom: 24 }}>
            Follow-ups die vanzelf gaan
          </h1>
          <p style={{ fontSize: 18, color: "#6b7280", lineHeight: 1.7, maxWidth: 600, margin: "0 auto 40px" }}>
            80% van de plaatsingen komt na het tweede of derde contact. Elvatix zorgt dat je nooit meer een follow-up mist.
          </p>
          <div style={{ fontSize: 100, marginBottom: 40 }}>⏰</div>
        </div>
      </section>

      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {[
            { icon: "📅", title: "Slim plannen", desc: "Stel in na hoeveel dagen je wilt opvolgen. Elvatix herinnert je op het juiste moment." },
            { icon: "✍️", title: "AI follow-up berichten", desc: "Geen 'Ik wilde even checken'. Elvatix genereert een follow-up die verwijst naar je vorige bericht." },
            { icon: "🔔", title: "Dashboard notificaties", desc: "Zie al je openstaande follow-ups in één overzicht. Prioriteit op basis van urgentie en response-kans." },
            { icon: "📈", title: "Hogere response rate", desc: "Kandidaten die een relevante follow-up krijgen reageren 3x vaker dan bij een cold InMail." },
          ].map((item) => (
            <div key={item.title} style={{ background: "#f9fafb", borderRadius: 16, padding: 32, border: "1px solid #e5e7eb" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 8 }}>{item.title}</h3>
              <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "80px 24px", background: "#111", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: "#fff", marginBottom: 16 }}>Klaar om te starten?</h2>
          <p style={{ color: "#9ca3af", fontSize: 16, marginBottom: 32 }}>Smart Reminders zijn beschikbaar in het Pro-plan.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            <a href="/pricing" className="pill-btn pill-btn-white" style={{ padding: "14px 32px", fontSize: 16 }}>Bekijk pricing</a>
            <a href="/demo" className="pill-btn pill-btn-outline" style={{ padding: "14px 32px", fontSize: 16, color: "#fff", borderColor: "#fff" }}>Boek een demo</a>
          </div>
        </div>
      </section>
    </main>
  );
}
