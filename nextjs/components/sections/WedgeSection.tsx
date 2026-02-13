"use client";

export default function WedgeSection() {
  return (
    <section className="section-padding" style={{ background: "linear-gradient(135deg, #7aa300 0%, #8db600 50%, #1a2e05 100%)", position: "relative", overflow: "hidden" }}>
      <div className="section-inner" style={{ position: "relative", zIndex: 2 }}>
        <div className="grid-2" style={{ gap: 64 }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>De kloof wordt groter</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 56px)", fontWeight: 900, color: "white", marginBottom: 20, lineHeight: 1.1 }}>
              Recruitment verandert. <span style={{ color: "#fbbf24" }}>Snel.</span>
            </h2>
            <p style={{ fontSize: "clamp(15px, 1.5vw, 17px)", color: "rgba(255,255,255,0.7)", maxWidth: 460, marginBottom: 36, lineHeight: 1.7 }}>
              Wie blijft vasthouden aan de oude manier, loopt achter. Met de Elvatix AI Copilot ben je altijd een stap voor.
            </p>
            <a href="/platform" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.3)", padding: "12px 32px", borderRadius: 9999, fontSize: 15, fontWeight: 600, textDecoration: "none", backdropFilter: "blur(10px)" }}>
              Ontdek de AI Copilot →
            </a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { icon: "⚡", stat: "30x", label: "Sneller dan handmatig outreach" },
              { icon: "📈", stat: "85%", label: "Minder tijd per InMail" },
              { icon: "🎯", stat: "3x", label: "Hogere response rate" },
              { icon: "🤖", stat: "100%", label: "AI-gepersonaliseerd" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 20, background: "rgba(255,255,255,0.08)", borderRadius: 16, padding: "clamp(14px, 2vw, 20px) clamp(16px, 2vw, 24px)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}>
                <span style={{ fontSize: "clamp(20px, 3vw, 28px)" }}>{item.icon}</span>
                <div>
                  <span style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 800, color: "#fbbf24" }}>{item.stat}</span>
                  <p style={{ fontSize: "clamp(12px, 1.5vw, 14px)", color: "rgba(255,255,255,0.7)", marginTop: 2 }}>{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, background: "radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)", borderRadius: "50%", zIndex: 1 }} />
      <div style={{ position: "absolute", bottom: -150, left: -150, width: 500, height: 500, background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)", borderRadius: "50%", zIndex: 1 }} />
    </section>
  );
}
