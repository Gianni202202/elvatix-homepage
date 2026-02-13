"use client";

export default function ContactPage() {
  return (
    <main className="page-top">
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#8db600", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Contact</p>
            <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, color: "#111", lineHeight: 1.1, marginBottom: 24 }}>Laten we praten</h1>
            <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.7, marginBottom: 40 }}>Heb je een vraag, wil je een demo plannen, of ben je benieuwd of Elvatix bij jouw organisatie past? Laat het ons weten.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 4 }}>E-mail</h3>
                <a href="mailto:hello@elvatix.com" style={{ fontSize: 15, color: "#8db600", textDecoration: "none" }}>hello@elvatix.com</a>
              </div>
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 4 }}>LinkedIn</h3>
                <a href="https://linkedin.com/company/elvatix" target="_blank" rel="noopener noreferrer" style={{ fontSize: 15, color: "#8db600", textDecoration: "none" }}>linkedin.com/company/elvatix</a>
              </div>
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 4 }}>Locatie</h3>
                <p style={{ fontSize: 15, color: "#6b7280" }}>Nederland</p>
              </div>
            </div>
          </div>
          <div style={{ background: "#fff", borderRadius: 20, padding: "40px 32px", border: "1px solid #e5e7eb", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Naam</label>
                <input type="text" placeholder="Je naam" style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid #d1d5db", fontSize: 15, outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>E-mailadres</label>
                <input type="email" placeholder="naam@bedrijf.nl" style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid #d1d5db", fontSize: 15, outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Onderwerp</label>
                <select style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid #d1d5db", fontSize: 15, outline: "none", boxSizing: "border-box", background: "#fff" }}>
                  <option>Algemene vraag</option>
                  <option>Demo aanvragen</option>
                  <option>Pricing informatie</option>
                  <option>Technische support</option>
                  <option>Partnership</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Bericht</label>
                <textarea placeholder="Waar kunnen we je mee helpen?" rows={5} style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid #d1d5db", fontSize: 15, outline: "none", boxSizing: "border-box", resize: "vertical", fontFamily: "inherit" }} />
              </div>
              <button type="submit" className="pill-btn pill-btn-primary" style={{ padding: "14px 24px", fontSize: 15, width: "100%", cursor: "pointer", border: "none", marginTop: 8 }}>Verstuur bericht</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
