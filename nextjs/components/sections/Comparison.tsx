"use client";

const rows = [
  { category: "Persoonlijke InMails sturen", old: { text: "Handmatig profiel bekijken, bericht typen, personaliseren per kandidaat", time: "5 minuten per kandidaat" }, new_: { text: "Elvatix genereert een gepersonaliseerd bericht op basis van het LinkedIn-profiel met één klik", time: "10 seconden per kandidaat" } },
  { category: "Connectieverzoeken", old: { text: "Template kopiëren, plakken, handmatig aanpassen per persoon", time: "3 minuten per kandidaat" }, new_: { text: "AI past automatisch de toon en inhoud aan op basis van het profiel", time: "5 seconden per kandidaat" } },
  { category: "Follow-up berichten", old: { text: "Bijhouden wie je hebt benaderd, handmatig opvolgen, berichten opnieuw schrijven", time: "10 minuten per batch" }, new_: { text: "Automatische reminders en AI-gegenereerde follow-ups", time: "0 seconden per batch" } },
  { category: "Outreach personaliseren", old: { text: "CV's lezen, recent posts checken, handmatig relevante details verwerken", time: "8 minuten per kandidaat" }, new_: { text: "AI analyseert profiel, posts en ervaring — verwerkt dit automatisch in het bericht", time: "10 seconden per kandidaat" } },
  { category: "Performance bijhouden", old: { text: "Handmatig Excel bijhouden, geen inzicht in welke berichten werken", time: "1 uur per week" }, new_: { text: "Real-time dashboard met response rates per template en bericht", time: "0 seconden" } },
];

export default function Comparison() {
  return (
    <section id="comparison" className="section-padding" style={{ background: "#fff" }}>
      <div className="section-inner">
        <div className="comparison-grid" style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: "clamp(16px, 2vw, 18px)", fontWeight: 700, color: "#374151" }}>De oude manier</h3>
          <div className="comparison-center-label" />
          <h3 style={{ fontSize: "clamp(16px, 2vw, 18px)", fontWeight: 700, color: "#6a9a00", textAlign: "right" }}>De nieuwe manier</h3>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {rows.map((row, i) => (
            <div key={i}>
              <p className="comparison-mobile-label" style={{ display: "none", fontSize: 14, fontWeight: 600, color: "#6b7280", textAlign: "center", marginBottom: 8 }}>{row.category}</p>
              <div className="comparison-grid" style={{ alignItems: "stretch" }}>
                <div className="card-old">
                  <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 8, color: "#111" }}>{row.old.text}</p>
                  <p style={{ fontSize: 13, color: "#9ca3af", fontStyle: "italic" }}>{row.old.time}</p>
                </div>
                <div className="comparison-center-label" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#6b7280", textAlign: "center" }}>{row.category}</span>
                </div>
                <div className="card-new">
                  <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 8 }}>{row.new_.text}</p>
                  <p style={{ fontSize: 13, opacity: 0.8, fontStyle: "italic" }}>{row.new_.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
