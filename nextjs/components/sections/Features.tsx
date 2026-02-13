"use client";
import { useState } from "react";

const tabs = [
  { id: "inmails", label: "InMails", emoji: "💬", title: "Schrijf gepersonaliseerde InMails op schaal", desc: "Onze AI leest het LinkedIn-profiel van je kandidaat en genereert een volledig gepersonaliseerd bericht — in de juiste toon, met relevante hooks. Eén klik en je bericht is klaar.", link: "/features/inmails" },
  { id: "connecties", label: "Connectieverzoeken", emoji: "🤝", title: "Connectieverzoeken die echt aankomen", desc: "Vergeet standaard 'I'd like to add you to my network'. Elvatix schrijft connectieverzoeken die opvallen en conversaties starten.", link: "/features/connections" },
  { id: "reminders", label: "Reminders", emoji: "⏰", title: "Automatische follow-ups", desc: "Stel in wanneer je wilt opvolgen. Elvatix herinnert je en genereert een follow-up bericht afgestemd op de vorige interactie.", link: "/features/reminders" },
  { id: "analytics", label: "Analytics", emoji: "📊", title: "Inzicht in je outreach performance", desc: "Zie welke berichten het beste converteren, welke templates de hoogste response rate hebben en waar je tijd het meest oplevert.", link: "/features/analytics" },
];

export default function Features() {
  const [active, setActive] = useState(0);
  const tab = tabs[active];
  return (
    <section className="section-padding" style={{ background: "#fff" }}>
      <div className="section-inner">
        <h2 style={{ fontSize: "clamp(24px, 4vw, 48px)", fontWeight: 900, textAlign: "center", color: "#111", marginBottom: 16 }}>
          Neem je recruitment workflow van losse tools naar één krachtig platform
        </h2>
        <p style={{ textAlign: "center", color: "#6b7280", fontSize: 16, maxWidth: 600, margin: "0 auto 48px", lineHeight: 1.6 }}>
          Bekijk de features die Elvatix uniek maken — elk onderdeel is een volwaardig product bij andere aanbieders. 😎
        </p>
        <div className="feature-tabs">
          {tabs.map((t, i) => (
            <button key={t.id} onClick={() => setActive(i)} style={{ background: "none", border: "none", cursor: "pointer", paddingBottom: 16, fontSize: 15, fontWeight: i === active ? 600 : 400, color: i === active ? "#8db600" : "#6b7280", borderBottom: i === active ? "2px solid #8db600" : "2px solid transparent", transition: "all 0.2s" }}>
              {t.label}
            </button>
          ))}
        </div>
        <div className="feature-tab-content" style={{ background: "#f9fafb", borderRadius: 24, padding: 48, minHeight: 300 }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#8db600", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>{tab.label}</p>
            <h3 style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 800, color: "#111", marginBottom: 16, lineHeight: 1.2 }}>{tab.title}</h3>
            <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.7, marginBottom: 24 }}>{tab.desc}</p>
            <a href={tab.link} style={{ color: "#8db600", fontWeight: 600, fontSize: 15, textDecoration: "none" }}>Meer over {tab.label} →</a>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontSize: "clamp(64px, 10vw, 120px)", filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.1))" }}>{tab.emoji}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
