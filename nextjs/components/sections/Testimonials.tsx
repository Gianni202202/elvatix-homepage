"use client";

const testimonials = [
  { quote: "Elvatix heeft onze outreach compleet veranderd. We besparen minstens 2 uur per dag per recruiter.", name: "Lisa van den Berg", role: "Head of Recruitment, Vibe Group" },
  { quote: "De AI-gegenereerde berichten voelen persoonlijker dan wat we ooit handmatig schreven.", name: "Mark de Vries", role: "Senior Recruiter, Manpower" },
  { quote: "Onze response rate is met 40% gestegen sinds we Elvatix gebruiken. Het is een game-changer.", name: "Sarah Jansen", role: "Talent Acquisition Lead" },
];

const badges = [
  { icon: "⭐", label: "Highest Rated" },
  { icon: "🏆", label: "Best ROI 2025" },
  { icon: "🚀", label: "Fastest Growing" },
  { icon: "💚", label: "Most Loved" },
];

export default function Testimonials() {
  return (
    <section className="section-padding" style={{ background: "#fff" }}>
      <div className="section-inner">
        <h2 style={{ fontSize: "clamp(24px, 4vw, 48px)", fontWeight: 900, fontStyle: "italic", textAlign: "center", marginBottom: 48, color: "#111" }}>
          Wat onze klanten zeggen
        </h2>
        <div className="grid-3" style={{ marginBottom: 48 }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 20, padding: "clamp(20px, 3vw, 32px)" }}>
              <p style={{ fontSize: 16, color: "#6a9a00", lineHeight: 1.6, marginBottom: 20, fontWeight: 500 }}>&ldquo;{t.quote}&rdquo;</p>
              <p style={{ fontWeight: 700, fontSize: 15, color: "#111" }}>{t.name}</p>
              <p style={{ fontSize: 13, color: "#9ca3af" }}>{t.role}</p>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "clamp(16px, 3vw, 32px)", flexWrap: "wrap" }}>
          {badges.map((b, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 20 }}>{b.icon}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#6b7280" }}>{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
