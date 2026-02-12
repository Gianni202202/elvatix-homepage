"use client";

export default function WedgeSection() {
  return (
    <section style={{
      background: "linear-gradient(135deg, #7c3aed 0%, #4361ee 50%, #1e1b4b 100%)",
      padding: "100px 24px",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          {/* Left: headline + text */}
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
              De kloof wordt groter
            </p>
            <h2 style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 900, color: "white", marginBottom: 20, lineHeight: 1.1 }}>
              Recruitment verandert.{" "}
              <span style={{ color: "#fbbf24" }}>Snel.</span>
            </h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", maxWidth: 460, marginBottom: 36, lineHeight: 1.7 }}>
              Wie blijft vasthouden aan de oude manier, loopt achter. Met de Elvatix AI Copilot ben je altijd een stap voor.
            </p>
            <a href="/platform" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.15)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.3)",
              padding: "12px 32px",
              borderRadius: 9999,
              fontSize: 15,
              fontWeight: 600,
              textDecoration: "none",
              backdropFilter: "blur(10px)",
              transition: "background 0.2s",
            }}>
              Ontdek de AI Copilot →
            </a>
          </div>

          {/* Right: visual metrics */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { icon: "⚡", stat: "30x", label: "Sneller dan handmatig outreach" },
              { icon: "📈", stat: "85%", label: "Minder tijd per InMail" },
              { icon: "🎯", stat: "3x", label: "Hogere response rate" },
              { icon: "🤖", stat: "100%", label: "AI-gepersonaliseerd" },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                background: "rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: "20px 24px",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
              }}>
                <span style={{ fontSize: 28 }}>{item.icon}</span>
                <div>
                  <span style={{ fontSize: 28, fontWeight: 800, color: "#fbbf24" }}>{item.stat}</span>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle decorative elements instead of the broken wedge */}
      <div style={{
        position: "absolute",
        top: -100,
        right: -100,
        width: 400,
        height: 400,
        background: "radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)",
        borderRadius: "50%",
        zIndex: 1,
      }} />
      <div style={{
        position: "absolute",
        bottom: -150,
        left: -150,
        width: 500,
        height: 500,
        background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)",
        borderRadius: "50%",
        zIndex: 1,
      }} />
    </section>
  );
}
