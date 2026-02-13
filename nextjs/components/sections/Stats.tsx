"use client";

const stats = [
  { number: "85%", label: "Minder tijd per InMail" },
  { number: "3x", label: "Hogere response rate" },
  { number: "500+", label: "Actieve recruiters" },
];

export default function Stats() {
  return (
    <section className="section-padding" style={{ background: "linear-gradient(135deg, #8db600 0%, #a3c520 30%, #8db600 60%, #6a9a00 100%)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="stats-card">
          <div className="grid-3" style={{ textAlign: "center" }}>
            {stats.map((stat, i) => (
              <div key={i}>
                <div style={{ fontSize: "clamp(36px, 6vw, 80px)", fontWeight: 900, marginBottom: 8, background: "linear-gradient(135deg, #8db600 0%, #7aa300 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {stat.number}
                </div>
                <p style={{ color: "#6b7280", fontSize: "clamp(13px, 1.5vw, 16px)", fontWeight: 500 }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <a href="/demo" className="pill-btn pill-btn-primary" style={{ padding: "14px 32px" }}>Meer weten over Elvatix</a>
        </div>
      </div>
    </section>
  );
}
