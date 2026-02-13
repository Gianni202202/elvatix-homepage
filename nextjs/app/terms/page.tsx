import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Algemene Voorwaarden — Elvatix",
  description: "Lees de algemene voorwaarden van Elvatix.",
};

export default function TermsPage() {
  return (
    <main className="page-top">
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h1 style={{ fontSize: 36, fontWeight: 900, color: "#111", marginBottom: 8 }}>Algemene Voorwaarden</h1>
          <p style={{ fontSize: 14, color: "#9ca3af", marginBottom: 48 }}>Laatst bijgewerkt: februari 2026</p>

          {[
            { title: "1. Definities", content: "\"Elvatix\" verwijst naar het AI-powered recruitmentplatform beschikbaar op elvatix.com. \"Gebruiker\" verwijst naar elke persoon die een account aanmaakt of de dienst gebruikt. \"Dienst\" verwijst naar alle functionaliteiten die Elvatix aanbiedt." },
            { title: "2. Gebruik van de dienst", content: "Door gebruik te maken van Elvatix ga je akkoord met deze voorwaarden. Je bent verantwoordelijk voor het gebruik van je account en de berichten die je verstuurt via ons platform. Elvatix is een hulpmiddel — je blijft zelf verantwoordelijk voor de inhoud van je berichten." },
            { title: "3. Account en beveiliging", content: "Je bent verantwoordelijk voor het vertrouwelijk houden van je inloggegevens. Meld ongeautoriseerd gebruik direct bij ons. Wij behouden het recht om accounts te blokkeren bij misbruik." },
            { title: "4. Intellectueel eigendom", content: "Alle content, software en technologie van Elvatix blijft eigendom van Elvatix. De berichten die je genereert zijn je eigen eigendom en mogen door jou vrij gebruikt worden." },
            { title: "5. Beperkingen", content: "Het is niet toegestaan om Elvatix te gebruiken voor spam, misleidende communicatie of activiteiten die in strijd zijn met de gebruiksvoorwaarden van LinkedIn. Wij behouden het recht om de dienst te beperken bij misbruik." },
            { title: "6. Abonnementen en betaling", content: "Pro- en Enterprise-abonnementen worden maandelijks of jaarlijks gefactureerd. Je kunt op elk moment opzeggen. Bij opzegging behoud je toegang tot het einde van de betaalde periode." },
            { title: "7. Aansprakelijkheid", content: "Elvatix is een AI-tool die berichten genereert als suggestie. Wij zijn niet aansprakelijk voor de gevolgen van het gebruik van gegenereerde berichten. De dienst wordt aangeboden 'as is' zonder garanties op beschikbaarheid of resultaten." },
            { title: "8. Wijzigingen", content: "Wij behouden het recht om deze voorwaarden te wijzigen. Significante wijzigingen worden gecommuniceerd via e-mail. Voortgezet gebruik na wijzigingen geldt als acceptatie." },
            { title: "9. Toepasselijk recht", content: "Op deze voorwaarden is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in Nederland." },
            { title: "10. Contact", content: "Voor vragen over deze voorwaarden kun je contact opnemen via legal@elvatix.com." },
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
