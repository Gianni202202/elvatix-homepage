"use client";

import type { Metadata } from "next";

export default function LoginPage() {
  return (
    <main className="page-top" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ maxWidth: 420, width: "100%", padding: "48px 40px", background: "#fff", borderRadius: 20, border: "1px solid #e5e7eb", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#111", marginBottom: 8 }}>Welkom terug</h1>
          <p style={{ fontSize: 15, color: "#6b7280" }}>Log in op je Elvatix account</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>E-mailadres</label>
            <input type="email" placeholder="naam@bedrijf.nl" style={{
              width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid #d1d5db",
              fontSize: 15, outline: "none", boxSizing: "border-box"
            }} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Wachtwoord</label>
            <input type="password" placeholder="••••••••" style={{
              width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid #d1d5db",
              fontSize: 15, outline: "none", boxSizing: "border-box"
            }} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 6, color: "#6b7280", cursor: "pointer" }}>
              <input type="checkbox" /> Onthoud mij
            </label>
            <a href="#" style={{ color: "#8db600", textDecoration: "none", fontWeight: 500 }}>Wachtwoord vergeten?</a>
          </div>

          <button type="submit" className="pill-btn pill-btn-primary" style={{ padding: "14px 24px", fontSize: 15, width: "100%", cursor: "pointer", border: "none", marginTop: 8 }}>
            Inloggen
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: 14, color: "#6b7280", marginTop: 24 }}>
          Nog geen account? <a href="/start" style={{ color: "#8db600", fontWeight: 600, textDecoration: "none" }}>Start gratis →</a>
        </p>
      </div>
    </main>
  );
}
