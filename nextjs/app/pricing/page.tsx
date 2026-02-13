"use client";
import type React from "react";

const tiers = [
  {
    name: "Starter",
    price: "Gratis",
    period: "",
    desc: "Perfect om te beginnen",
    features: ["5 gegenereerde berichten per maand", "InMails + connectieverzoeken", "LinkedIn profiel-analyse", "Nederlands en Engels"],
    cta: "Start gratis",
    href: "/start",
    primary: false,
  },
  {
    name: "Pro",
    price: "€49",
    period: "/mnd",
    desc: "Voor actieve recruiters",
    features: ["Onbeperkt berichten", "Smart follow-up reminders", "Analytics dashboard", "Custom tone-of-voice", "Template bibliotheek", "Prioriteit support"],
    cta: "Start 14 dagen gratis",
    href: "/start",
    primary: true,
    badge: "Populairste keuze",
  },
  {
    name: "Enterprise",
    price: "Op maat",
    period: "",
    desc: "Voor teams & bureaus",
    features: ["Alles uit Pro", "Custom GPT op jouw schrijfstijl", "Team analytics & rapportages", "Onboarding & training", "Dedicated account manager", "SSO & API toegang", "SLA garantie"],
    cta: "Neem contact op",
    href: "/contact",
    primary: false,
  },
];

export default function PricingPage() {
  return (
    <main className="page-top">
      <section style={{ padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#8db600", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
            Pricing
          </p>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, color: "#111", lineHeight: 1.1, marginBottom: 24 }}>
            Transparante prijzen, geen verrassingen
          </h1>
          <p style={{ fontSize: 18, color: "#6b7280", lineHeight: 1.7, maxWidth: 600, margin: "0 auto" }}>
            Begin gratis. Upgrade wanneer je klaar bent. Geen contracten, geen verborgen kosten.
          </p>
        </div>
      </section>

      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, alignItems: "stretch" }}>
          {tiers.map((t) => (
            <div key={t.name} style={{
              background: "#fff", borderRadius: 20, padding: 40, border: t.primary ? "2px solid #8db600" : "1px solid #e5e7eb",
              display: "flex", flexDirection: "column", position: "relative",
              boxShadow: t.primary ? "0 8px 32px rgba(67, 97, 238, 0.15)" : "none"
            }}>
              {t.badge && (
                <span style={{
                  position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                  background: "#8db600", color: "#fff", fontSize: 12, fontWeight: 600, padding: "4px 16px", borderRadius: 20
                }}>
                  {t.badge}
                </span>
              )}
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8 }}>{t.name}</h3>
              <div style={{ marginBottom: 8 }}>
                <span style={{ fontSize: 40, fontWeight: 900, color: "#111" }}>{t.price}</span>
                {t.period && <span style={{ fontSize: 16, color: "#6b7280" }}>{t.period}</span>}
              </div>
              <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 24 }}>{t.desc}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, flex: 1 }}>
                {t.features.map((f) => (
                  <li key={f} style={{ fontSize: 14, color: "#374151", padding: "8px 0", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: "#8db600", fontWeight: 700 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <a href={t.href} className={t.primary ? "pill-btn pill-btn-primary" : "pill-btn pill-btn-outline"}
                 style={{ padding: "14px 24px", fontSize: 15, textAlign: "center", marginTop: 32, display: "block" }}>
                {t.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "60px 24px 80px", textAlign: "center" }}>
        <p style={{ fontSize: 15, color: "#6b7280" }}>
          Vragen over pricing? <a href="/contact" style={{ color: "#8db600", fontWeight: 600, textDecoration: "none" }}>Neem contact op →</a>
        </p>
      </section>
    </main>
  );
}
