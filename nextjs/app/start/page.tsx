"use client";

export default function StartPage() {
  return (
    <main className="page-top" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ maxWidth: 480, width: "100%", padding: 24 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 900, color: "#111", marginBottom: 12 }}>
            Start gratis met Elvatix
          </h1>
          <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.6 }}>
            Maak een account aan en verstuur je eerste gepersonaliseerde InMail binnen 60 seconden.
          </p>
        </div>

        <div style={{ background: "#fff", borderRadius: 20, padding: "40px 32px", border: "1px solid #e5e7eb", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
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
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Wachtwoord</label>
              <input type="password" placeholder="Min. 8 tekens" style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid #d1d5db", fontSize: 15, outline: "none", boxSizing: "border-box" }} />
            </div>

            <button type="submit" className="pill-btn pill-btn-primary" style={{ padding: "14px 24px", fontSize: 15, width: "100%", cursor: "pointer", border: "none", marginTop: 8 }}>
              Account aanmaken
            </button>
          </form>

          <p style={{ textAlign: "center", fontSize: 13, color: "#9ca3af", marginTop: 16, lineHeight: 1.5 }}>
            Door je aan te melden ga je akkoord met onze <a href="/terms" style={{ color: "#8db600", textDecoration: "none" }}>voorwaarden</a> en <a href="/privacy" style={{ color: "#8db600", textDecoration: "none" }}>privacybeleid</a>.
          </p>
        </div>

        <p style={{ textAlign: "center", fontSize: 14, color: "#6b7280", marginTop: 24 }}>
          Al een account? <a href="/login" style={{ color: "#8db600", fontWeight: 600, textDecoration: "none" }}>Log in →</a>
        </p>
      </div>
    </main>
  );
}
