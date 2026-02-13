import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics \u2014 Elvatix",
  description: "Inzicht in je outreach performance. Zie welke berichten converteren en optimaliseer je recruitment strategie.",
};

export default function AnalyticsPage() {
  return (
    <main className="page-top">
      <section style={{ padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#8db600", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Analytics</p>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, color: "#111", lineHeight: 1.1, marginBottom: 24 }}>Data-gedreven recruitment</h1>
          <p style={{ fontSize: 18, color: "#6b7280", lineHeight: 1.7, maxWidth: 600, margin: "0 auto 40px" }}>Stop met gokken. Zie precies welke berichten, templates en aanpakken de beste resultaten opleveren.</p>
        </div>
      </section>
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ background: "#f9fafb", borderRadius: 20, padding: 40, border: "1px solid #e5e7eb", marginBottom: 32 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 24 }}>Performance overzicht</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              {[{ label: "Berichten verstuurd", value: "1.247", change: "+23%" }, { label: "Response rate", value: "41%", change: "+12%" }, { label: "Connectie-acceptatie", value: "52%", change: "+8%" }, { label: "Gesprekken gepland", value: "89", change: "+31%" }].map((s) => (
                <div key={s.label} style={{ background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #e5e7eb" }}>
                  <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 8 }}>{s.label}</p>
                  <p style={{ fontSize: 28, fontWeight: 800, color: "#111", marginBottom: 4 }}>{s.value}</p>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#16a34a" }}>{s.change}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {[{ title: "Response tracking", desc: "Zie welke berichten reacties opleveren en welke niet. Leer van je beste prestaties." }, { title: "Template vergelijking", desc: "A/B test verschillende tonen en aanpakken. Data vertelt je wat werkt voor jouw doelgroep." }, { title: "Team performance", desc: "Vergelijk resultaten binnen je team. Identificeer best practices en deel ze eenvoudig." }, { title: "Export & rapportages", desc: "Download je data als CSV of PDF. Ideaal voor management rapportages en klantpresentaties." }].map((item) => (
              <div key={item.title} style={{ background: "#f9fafb", borderRadius: 16, padding: 32, border: "1px solid #e5e7eb" }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding: "80px 24px", background: "#111", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: "#fff", marginBottom: 16 }}>Klaar om je resultaten te meten?</h2>
          <p style={{ color: "#9ca3af", fontSize: 16, marginBottom: 32 }}>Analytics is beschikbaar in het Pro-plan.</p>
          <a href="/pricing" className="pill-btn pill-btn-white" style={{ padding: "14px 32px", fontSize: 16 }}>Bekijk pricing</a>
        </div>
      </section>
    </main>
  );
}
