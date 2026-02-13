"use client";
import { useState } from "react";

const navLinks = [
  { label: "Platform", href: "/platform" },
  { label: "Oplossingen", href: "/solutions" },
  { label: "Case Studies", href: "/cases" },
  { label: "Pricing", href: "/pricing" },
  { label: "Inloggen", href: "/login" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="navbar-floating">
        <nav style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <a href="/" style={{ fontSize: 18, fontWeight: 800, color: "#111", textDecoration: "none", marginRight: 16 }}>
            Elvatix
          </a>
          <div className="nav-links">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} style={{ fontSize: 14, fontWeight: 500, color: "#374151", textDecoration: "none" }}>
                {link.label}
              </a>
            ))}
          </div>
          <div className="nav-cta">
            <a href="/start" className="pill-btn pill-btn-outline" style={{ padding: "8px 20px", fontSize: 13 }}>Start gratis</a>
            <a href="/demo" className="pill-btn pill-btn-primary" style={{ padding: "8px 20px", fontSize: 13 }}>Boek een demo</a>
          </div>
          <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round">
              {open ? (<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>) : (<><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>)}
            </svg>
          </button>
        </nav>
      </header>
      <div className={`mobile-nav ${open ? "open" : ""}`}>
        {navLinks.map((link) => (
          <a key={link.label} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>
        ))}
        <a href="/start" className="pill-btn pill-btn-outline" onClick={() => setOpen(false)}>Start gratis</a>
        <a href="/demo" className="pill-btn pill-btn-primary" onClick={() => setOpen(false)}>Boek een demo</a>
      </div>
    </>
  );
}
