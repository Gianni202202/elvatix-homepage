"use client";

export default function DemoPage() {
  return (
    <main className="page-top">
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#8db600", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
              Demo
            </p>
            <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, color: "#111", lineHeight: 1.1, marginBottom: 24 }}>
              Zie Elvatix in actie
            </h1>
            <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.7, marginBottom: 32 }}>
              Boek een persoonlijke demo van 30 minuten. We laten je zien hoe Elvatix werkt voor jouw specifieke situatie — of je nu solo recruiter bent of een team van 50+ aanstuurt.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {["Persoonlijke walkthrough van het platform", "Advies op maat voor jouw workflow", "Live voorbeeld met een LinkedIn profiel", "Q&A met ons team"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ color: "#8db600", fontWeight: 700, fontSize: 16 }}>✓</span>
                  <span style={{ fontSize: 15, color: "#374151" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "#fff", borderRadius: 20, padding: "40px 32px", border: "1px solid #e5e7eb", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 24 }}>Plan je demo</h2>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Voornaam</label>
                  <input type="text" placeholder="Jan" style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid #d1d5db", fontSize: 15, outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Achternaam</label>
                  <input type="text" placeholder="De Vries" style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid #d1d5db", fontSize: 15, outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Zakelijk e-mailadres</label>
                <input type="email" placeholder="jan@bedrijf.nl" style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid #d1d5db", fontSize: 15, outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Bedrijfsnaam</label>
                <input type="text" placeholder="Recruitment BV" style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid #d1d5db", fontSize: 15, outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Teamgrootte</label>
                <select style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid #d1d5db", fontSize: 15, outline: "none", boxSizing: "border-box", background: "#fff" }}>
                  <option>1-5 recruiters</option>
                  <option>6-20 recruiters</option>
                  <option>21-50 recruiters</option>
                  <option>50+ recruiters</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Bericht (optioneel)</label>
                <textarea placeholder="Vertel ons over je huidige workflow..." rows={3} style={{
                  width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid #d1d5db",
                  fontSize: 15, outline: "none", boxSizing: "border-box", resize: "vertical", fontFamily: "inherit"
                }} />
              </div>
              <button type="submit" className="pill-btn pill-btn-primary" style={{ padding: "14px 24px", fontSize: 15, width: "100%", cursor: "pointer", border: "none", marginTop: 8 }}>
                Demo aanvragen
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
