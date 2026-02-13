"use client";

const columns = [
  { title: "PLATFORM", links: [
    { label: "AI Copilot", href: "/platform" },
    { label: "InMails", href: "/features/inmails" },
    { label: "Connectieverzoeken", href: "/features/connections" },
    { label: "Reminders", href: "/features/reminders" },
    { label: "Custom GPT", href: "/platform" },
    { label: "Templates", href: "/platform" },
    { label: "Analytics", href: "/features/analytics" },
  ]},
  { title: "VOOR WIE", links: [
    { label: "Recruitmentbureaus", href: "/solutions" },
    { label: "Detacheringsbureaus", href: "/solutions" },
    { label: "Corporate Recruiters", href: "/solutions" },
    { label: "Executive Search", href: "/solutions" },
    { label: "Freelancers", href: "/solutions" },
  ]},
  { title: "CASE STUDIES", links: [
    { label: "Manpower", href: "/cases" },
    { label: "Vibe Group", href: "/cases" },
  ]},
  { title: "RESOURCES", links: [
    { label: "Blog", href: "/blog" },
    { label: "Integraties", href: "/integraties" },
    { label: "Pricing", href: "/pricing" },
  ]},
  { title: "BEDRIJF", links: [
    { label: "Over ons", href: "/over-ons" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ]},
];

export default function Footer() {
  return (
    <footer style={{ padding: "64px 24px 32px", background: "#fff", borderTop: "1px solid #e5e7eb" }}>
      <div className="section-inner">
        <div className="footer-grid">
          {columns.map((col, i) => (
            <div key={i}>
              <h4 style={{ fontSize: 12, fontWeight: 700, color: "#374151", letterSpacing: "0.1em", marginBottom: 16 }}>{col.title}</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} style={{ fontSize: 14, color: "#6b7280", textDecoration: "none" }}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: "#111", marginBottom: 4 }}>Elvatix</h3>
            <p style={{ fontSize: 13, color: "#9ca3af" }}>© 2026 Elvatix. Alle rechten voorbehouden.</p>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <a href="https://linkedin.com/company/elvatix" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none" }}>LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
