import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Over ons — Elvatix",
  description: "Elvatix is gebouwd door recruiters die gefrustreerd waren door generieke outreach. Ontdek ons verhaal.",
};

export default function OverOnsPage() {
  return (
    <main className="page-top">
      <section style={{ padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#8db600", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Over ons</p>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, color: "#111", lineHeight: 1.1, marginBottom: 24 }}>
            Wij geloven dat recruitment persoonlijk moet zijn
          </h1>
          <p style={{ fontSize: 18, color: "#6b7280", lineHeight: 1.7, maxWidth: 600, margin: "0 auto" }}>
            Elvatix is ontstaan uit frustratie. Frustratie over copy-paste templates, lage response rates en uren handmatig werk dat beter kan.
          </p>
        </div>
      </section>

      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ background: "#f9fafb", borderRadius: 20, padding: 48, border: "1px solid #e5e7eb", marginBottom: 32 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "#111", marginBottom: 16 }}>Ons verhaal</h2>
            <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.8, marginBottom: 16 }}>
              Als recruiters weten we hoe het voelt: je stuurt tientallen InMails per dag, maar de meeste worden niet eens geopend. Niet omdat de vacature niet interessant is, maar omdat het bericht te generiek is.
            </p>
            <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.8, marginBottom: 16 }}>
              We vroegen ons af: wat als AI het LinkedIn-profiel van een kandidaat kon lezen en daar een écht persoonlijk bericht van kon maken? Niet een template met een naam erin, maar een bericht dat laat zien dat je je hebt verdiept.
            </p>
            <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.8 }}>
              Dat werd Elvatix. Een AI copilot die recruiters helpt om betere berichten te schrijven, sneller op te volgen en slimmer te werken. Gebouwd in Nederland, voor de Nederlandse recruitmentmarkt.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              { value: "2024", label: "Opgericht" },
              { value: "500+", label: "Actieve gebruikers" },
              { value: "250K+", label: "Berichten gegenereerd" },
            ].map((s) => (
              <div key={s.label} style={{ background: "#fff", borderRadius: 16, padding: 32, border: "1px solid #e5e7eb", textAlign: "center" }}>
                <p style={{ fontSize: 36, fontWeight: 900, color: "#8db600", marginBottom: 8 }}>{s.value}</p>
                <p style={{ fontSize: 14, color: "#6b7280" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111", marginBottom: 32, textAlign: "center" }}>Onze waarden</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {[
              { title: "Persoonlijk boven alles", desc: "Technologie moet menselijke interacties versterken, niet vervangen. Elk bericht moet aanvoelen alsof het met de hand geschreven is." },
              { title: "Transparantie", desc: "Geen black boxes. Je ziet altijd wat onze AI genereert en je hebt volledige controle over het eindresultaat." },
              { title: "Gebouwd voor recruiters", desc: "Geen generiek AI-product. Elke feature is ontworpen op basis van feedback van werkende recruiters." },
            ].map((v) => (
              <div key={v.title} style={{ background: "#f9fafb", borderRadius: 16, padding: 32, border: "1px solid #e5e7eb" }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 8 }}>{v.title}</h3>
                <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 24px", background: "#111", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: "#fff", marginBottom: 16 }}>Laten we kennismaken</h2>
          <p style={{ color: "#9ca3af", fontSize: 16, marginBottom: 32 }}>Benieuwd wat Elvatix voor jou kan betekenen?</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            <a href="/demo" className="pill-btn pill-btn-white" style={{ padding: "14px 32px", fontSize: 16 }}>Boek een demo</a>
            <a href="/contact" className="pill-btn pill-btn-outline" style={{ padding: "14px 32px", fontSize: 16, color: "#fff", borderColor: "#fff" }}>Contact →</a>
          </div>
        </div>
      </section>
    </main>
  );
}
