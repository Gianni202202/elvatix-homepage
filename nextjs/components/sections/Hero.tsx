"use client";

export default function Hero() {
  return (
    <section style={{ position: "relative", paddingTop: 140, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, background: "linear-gradient(to bottom, #f8fafc, #ffffff)", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 384, height: 384, background: "rgba(219,234,254,0.4)", borderRadius: "50%", filter: "blur(120px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, width: 320, height: 320, background: "rgba(243,232,255,0.3)", borderRadius: "50%", filter: "blur(100px)", pointerEvents: "none" }} />
      <div className="section-inner-wide">
        <div className="grid-2" style={{ gap: 64 }}>
          <div>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.02em", marginBottom: 24, color: "#111" }}>
              <span style={{ fontStyle: "italic", color: "#8db600" }}>Jouw</span> complete recruitment workflow. <span style={{ fontStyle: "italic" }}>Eén</span> easy-to-use, <span className="gradient-text">AI-native</span> platform.
            </h1>
            <p style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "#6b7280", marginBottom: 40, maxWidth: 480, lineHeight: 1.7 }}>
              Geen losse tools meer. Personaliseer je LinkedIn outreach, automatiseer InMails en connectieverzoeken — allemaal vanuit één AI-copilot.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a href="/demo" className="pill-btn pill-btn-primary" style={{ padding: "14px 32px", fontSize: 16 }}>Boek een demo</a>
              <a href="/start" className="pill-btn pill-btn-outline" style={{ padding: "14px 32px", fontSize: 16 }}>Start gratis</a>
            </div>
          </div>
          <div>
            <div style={{ background: "linear-gradient(135deg, #8db600, #a3c520, #6a9a00)", borderRadius: 24, padding: "clamp(16px, 3vw, 32px)", position: "relative", overflow: "hidden", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "white", fontSize: 24, fontWeight: 700 }}>E</span>
                </div>
              </div>
              <div className="grid-hero-cards">
                {[{ icon: "💬", label: "InMails" }, { icon: "🤝", label: "Connecties" }, { icon: "📊", label: "Analytics" }, { icon: "🔍", label: "Sourcing" }, { icon: "🤖", label: "AI Copilot" }, { icon: "📧", label: "Outreach" }].map((item, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.15)", borderRadius: 16, padding: "clamp(10px, 2vw, 16px)", textAlign: "center", color: "white", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <div style={{ fontSize: "clamp(18px, 2vw, 24px)", marginBottom: 4 }}>{item.icon}</div>
                    <div style={{ fontSize: "clamp(10px, 1.2vw, 12px)", fontWeight: 500, opacity: 0.9 }}>{item.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 24 }}>
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: 500 }}>OLD WAY</span>
                <div style={{ width: 48, height: 24, background: "rgba(255,255,255,0.3)", borderRadius: 9999, position: "relative" }}>
                  <div style={{ position: "absolute", right: 4, top: 4, width: 16, height: 16, background: "white", borderRadius: "50%" }} />
                </div>
                <span style={{ color: "white", fontSize: 14, fontWeight: 600 }}>NEW WAY</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 80, textAlign: "center" }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 32 }}>Vertrouwd door 500+ recruiters in Nederland en België</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "clamp(16px, 3vw, 40px)", opacity: 0.5 }}>
            {["Manpower", "Vibe Group", "Yacht", "Hays", "Brunel", "Michael Page"].map((name) => (
              <span key={name} style={{ fontSize: "clamp(14px, 1.5vw, 18px)", fontWeight: 700, color: "#9ca3af", letterSpacing: "0.05em" }}>{name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
