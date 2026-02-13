import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacybeleid — Elvatix",
  description: "Lees hoe Elvatix omgaat met je gegevens en privacy.",
};

export default function PrivacyPage() {
  return (
    <main className="page-top">
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h1 style={{ fontSize: 36, fontWeight: 900, color: "#111", marginBottom: 8 }}>Privacybeleid</h1>
          <p style={{ fontSize: 14, color: "#9ca3af", marginBottom: 48 }}>Laatst bijgewerkt: februari 2026</p>

          {[
            { title: "1. Welke gegevens verzamelen wij?", content: "Wij verzamelen de gegevens die je aan ons verstrekt bij het aanmaken van een account (naam, e-mailadres, bedrijfsnaam) en gebruiksdata om onze dienst te verbeteren. LinkedIn profieldata wordt alleen verwerkt tijdens het genereren van berichten en wordt niet permanent opgeslagen." },
            { title: "2. Waarvoor gebruiken wij je gegevens?", content: "Je gegevens worden uitsluitend gebruikt voor het leveren van de Elvatix-dienst, het verbeteren van onze AI-modellen (geanonimiseerd), communicatie over je account en het voldoen aan wettelijke verplichtingen." },
            { title: "3. Delen met derden", content: "Wij delen je persoonlijke gegevens niet met derden, tenzij dit noodzakelijk is voor het leveren van onze dienst (bijv. hosting providers) of wettelijk vereist is. Wij verkopen nooit je gegevens." },
            { title: "4. Beveiliging", content: "Wij nemen passende technische en organisatorische maatregelen om je gegevens te beschermen tegen ongeautoriseerde toegang, verlies of misbruik. Alle data wordt versleuteld opgeslagen en overgedragen." },
            { title: "5. Je rechten", content: "Je hebt het recht om je gegevens in te zien, te corrigeren of te laten verwijderen. Ook kun je bezwaar maken tegen de verwerking van je gegevens. Neem hiervoor contact op via privacy@elvatix.com." },
            { title: "6. Cookies", content: "Wij gebruiken functionele cookies die noodzakelijk zijn voor het functioneren van de website. Analytische cookies worden alleen geplaatst met je toestemming." },
            { title: "7. Contact", content: "Voor vragen over dit privacybeleid kun je contact opnemen via privacy@elvatix.com of via onze contactpagina." },
          ].map((s) => (
            <div key={s.title} style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 8 }}>{s.title}</h2>
              <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8 }}>{s.content}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
