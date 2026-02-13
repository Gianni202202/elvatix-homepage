import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oplossingen — Elvatix",
  description: "Elvatix biedt oplossingen voor recruitmentbureaus, detacheringsbureaus, corporate recruiters, executive search en freelancers.",
};

const audiences = [
  {
    title: "Recruitmentbureaus",
    desc: "Schaal je outreach zonder extra headcount. Elvatix helpt je team om 3x meer gepersonaliseerde berichten te versturen met dezelfde bezetting.",
    stats: "Gemiddeld 47% hogere response rate",
    icon: "🏢",
  },
  {
    title: "Detacheringsbureaus",
    desc: "Bouw een warme kandidatenpool op met connectieverzoeken die converteren. Ideaal voor high-volume recruitment in IT, finance en engineering.",
    stats: "2,3x meer geaccepteerde connectieverzoeken",
    icon: "🔗",
  },
  {
    title: "Corporate Recruiters",
    desc: "Versterk je employer brand met berichten die je bedrijfscultuur uitstralen. Elvatix past de tone-of-voice aan op jouw organisatie.",
    stats: "65% tijdsbesparing op sourcing",
    icon: "🏛️",
  },
  {
    title: "Executive Search",
    desc: "Voor senior rollen telt elke zin. Elvatix analyseert carrièrepaden en schrijft berichten die C-level kandidaten aanspreken.",
    stats: "Gemiddeld 38% response op C-level outreach",
    icon: "🎯",
  },
  {
    title: "Freelance Recruiters",
    desc: "Werk slimmer als je voor jezelf werkt. Eén tool die je hele outreach beheert — van eerste bericht tot follow-up.",
    stats: "5 uur per week bespaard",
    icon: "💼",
  },
];

export default function SolutionsPage() {
  return (
    <main className="page-top">
      <section style={{ padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#8db600", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
            Oplossingen
          </p>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, color: "#111", lineHeight: 1.1, marginBottom: 24 }}>
            Gebouwd voor elke type recruiter
          </h1>
          <p style={{ fontSize: 18, color: "#6b7280", lineHeight: 1.7, maxWidth: 600, margin: "0 auto" }}>
            Of je nu werkt bij een bureau, corporate, of zelfstandig bent — Elvatix past zich aan op jouw workflow.
          </p>
        </div>
      </section>

      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", gap: 32 }}>
          {audiences.map((a, i) => (
            <div key={a.title} style={{
              display: "grid", gridTemplateColumns: i % 2 === 0 ? "1fr 2fr" : "2fr 1fr",
              gap: 48, alignItems: "center", background: "#f9fafb", borderRadius: 20, padding: 48, border: "1px solid #e5e7eb"
            }}>
              {i % 2 === 0 && (
                <div style={{ fontSize: 80, textAlign: "center" }}>{a.icon}</div>
              )}
              <div>
                <h3 style={{ fontSize: 24, fontWeight: 800, color: "#111", marginBottom: 12 }}>{a.title}</h3>
                <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.7, marginBottom: 16 }}>{a.desc}</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#8db600" }}>{a.stats}</p>
              </div>
              {i % 2 !== 0 && (
                <div style={{ fontSize: 80, textAlign: "center" }}>{a.icon}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "80px 24px", background: "#111", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: "#fff", marginBottom: 16 }}>Past Elvatix bij jou?</h2>
          <p style={{ color: "#9ca3af", fontSize: 16, marginBottom: 32 }}>Boek een demo en ontdek hoe Elvatix jouw recruitment transformeert.</p>
          <a href="/demo" className="pill-btn pill-btn-white" style={{ padding: "14px 32px", fontSize: 16 }}>Boek een demo</a>
        </div>
      </section>
    </main>
  );
}
