import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Integraties — Elvatix",
  description: "Elvatix integreert naadloos met LinkedIn, populaire ATS-systemen en je bestaande recruitment workflow.",
};

const integrations = [
  { name: "LinkedIn", desc: "Directe integratie met LinkedIn profielen. Plak een URL en Elvatix haalt alle relevante data op.", category: "Platform", icon: "🔗" },
  { name: "Bullhorn", desc: "Synchroniseer kandidaten en berichten rechtstreeks met je Bullhorn ATS.", category: "ATS", icon: "🎯" },
  { name: "Recruitee", desc: "Koppel Elvatix aan Recruitee voor een naadloze workflow van sourcing tot plaatsing.", category: "ATS", icon: "📋" },
  { name: "Greenhouse", desc: "Push kandidaatinformatie en outreach data naar je Greenhouse pipeline.", category: "ATS", icon: "🌱" },
  { name: "HubSpot", desc: "Gebruik Elvatix-data in je HubSpot CRM voor betere candidate relationship management.", category: "CRM", icon: "🧡" },
  { name: "Slack", desc: "Ontvang notificaties over responses en follow-ups direct in je Slack kanaal.", category: "Communicatie", icon: "💬" },
  { name: "Zapier", desc: "Verbind Elvatix met 5.000+ apps via Zapier. Automatiseer elke stap van je workflow.", category: "Automatisering", icon: "⚡" },
  { name: "Google Sheets", desc: "Exporteer analytics, kandidaatlijsten en performance data naar Google Sheets.", category: "Data", icon: "📊" },
];

export default function IntegratiesPage() {
  return (
    <main className="page-top">
      <section style={{ padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#8db600", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Integraties</p>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, color: "#111", lineHeight: 1.1, marginBottom: 24 }}>
            Werkt met je bestaande tools
          </h1>
          <p style={{ fontSize: 18, color: "#6b7280", lineHeight: 1.7, maxWidth: 600, margin: "0 auto" }}>
            Elvatix past in je huidige workflow. Integreer met je ATS, CRM of communicatie-tools — zonder je proces te veranderen.
          </p>
        </div>
      </section>

      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {integrations.map((integ) => (
            <div key={integ.name} style={{ background: "#fff", borderRadius: 16, padding: 32, border: "1px solid #e5e7eb", display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div style={{ fontSize: 40, minWidth: 48 }}>{integ.icon}</div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111" }}>{integ.name}</h3>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#8db600", background: "#f0f7d4", padding: "2px 8px", borderRadius: 4 }}>{integ.category}</span>
                </div>
                <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>{integ.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "60px 24px", background: "#f9fafb", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#111", marginBottom: 12 }}>Mis je een integratie?</h2>
          <p style={{ color: "#6b7280", fontSize: 15, marginBottom: 24 }}>Laat het ons weten! We bouwen actief nieuwe integraties op basis van klantvragen.</p>
          <a href="/contact" className="pill-btn pill-btn-primary" style={{ padding: "12px 28px", fontSize: 15 }}>Stel een integratie voor</a>
        </div>
      </section>
    </main>
  );
}
