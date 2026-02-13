import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Elvatix",
  description: "Tips, inzichten en best practices voor LinkedIn recruitment. Leer van de beste recruiters in Nederland.",
};

const posts = [
  {
    title: "5 manieren om je LinkedIn InMail response rate te verdubbelen",
    excerpt: "Generieke berichten zijn dood. Ontdek vijf bewezen technieken waarmee toprecuiters hun response rates hebben verdubbeld — zonder meer uren te werken.",
    date: "6 februari 2026",
    category: "Best Practices",
    readTime: "5 min",
  },
  {
    title: "Waarom 90% van de connectieverzoeken wordt genegeerd",
    excerpt: "We analyseerden 10.000 connectieverzoeken en ontdekten waarom de meeste worden genegeerd. Het probleem zit niet in de boodschap — maar in de eerste vijf woorden.",
    date: "28 januari 2026",
    category: "Data & Insights",
    readTime: "7 min",
  },
  {
    title: "AI in recruitment: hype of game-changer?",
    excerpt: "Iedereen praat over AI, maar wat werkt écht in de praktijk? We spraken met 20 recruiters die AI-tools gebruiken en delen hun eerlijke ervaring.",
    date: "15 januari 2026",
    category: "Trends",
    readTime: "8 min",
  },
  {
    title: "De perfecte follow-up: timing, toon en inhoud",
    excerpt: "80% van de plaatsingen komt na het 2e of 3e contact. Maar hoe schrijf je een follow-up die niet irritant is? Een handleiding met voorbeelden.",
    date: "3 januari 2026",
    category: "Best Practices",
    readTime: "6 min",
  },
  {
    title: "Van 10 naar 60 berichten per dag: hoe Vibe Group schaalde zonder kwaliteitsverlies",
    excerpt: "Vibe Group verviervoudigde hun outreach volume met behoud van personalisatie. Lees hoe ze dat deden met een combinatie van AI en slimme workflows.",
    date: "18 december 2025",
    category: "Case Study",
    readTime: "10 min",
  },
];

export default function BlogPage() {
  return (
    <main className="page-top">
      <section style={{ padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#8db600", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Blog</p>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, color: "#111", lineHeight: 1.1, marginBottom: 24 }}>
            Recruitment insights & tips
          </h1>
          <p style={{ fontSize: 18, color: "#6b7280", lineHeight: 1.7, maxWidth: 600, margin: "0 auto" }}>
            Praktische tips, data-gedreven inzichten en verhalen van recruiters die slimmer werken.
          </p>
        </div>
      </section>

      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>
          {posts.map((post) => (
            <article key={post.title} style={{ background: "#fff", borderRadius: 16, padding: 32, border: "1px solid #e5e7eb", cursor: "pointer", transition: "box-shadow 0.2s" }}>
              <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#8db600", background: "#f0f7d4", padding: "4px 10px", borderRadius: 6 }}>{post.category}</span>
                <span style={{ fontSize: 12, color: "#9ca3af" }}>{post.date}</span>
                <span style={{ fontSize: 12, color: "#9ca3af" }}>{post.readTime} lezen</span>
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8, lineHeight: 1.3 }}>{post.title}</h2>
              <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7 }}>{post.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
