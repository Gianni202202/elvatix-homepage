import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 60 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || req.headers.get("x-real-ip") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Je hebt het maximum aantal berichten bereikt (5 per uur). Probeer het later opnieuw." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { email, jobTitle, tone, profile } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Een geldig e-mailadres is vereist." }, { status: 400 });
    }

    let profileContext = "";
    if (profile && profile.fullName) {
      profileContext = `
VERRIJKT LINKEDIN PROFIEL:
- Volledige naam: ${profile.fullName}
- Headline (eigen omschrijving op LinkedIn): ${profile.headline || "niet beschikbaar"}
- Locatie: ${profile.location || "onbekend"}

WERKERVARING TIJDLIJN (van recent naar oud):
Elk item heeft een status-label en een periode.
- [HUIDIG] = de kandidaat bekleedt deze functie NU nog steeds (end_year en end_month zijn null in de data, dus geen einddatum → nog actief).
- [VORIG] = de kandidaat heeft deze functie AFGEROND (er is een einddatum → niet meer actief).
${(profile.jobHistory || []).length > 0 ? (profile.jobHistory || []).join("\n") : "  Geen werkervaring beschikbaar"}

SAMENVATTING HUIDIGE SITUATIE:
- De kandidaat werkt NU als: ${profile.currentTitle || "onbekend"}
- Bij het bedrijf: ${profile.companyName || "onbekend"}

Skills: ${(profile.skills || []).join(", ") || "niet beschikbaar"}`;
    }

    const candidateName = profile?.fullName || profile?.firstName || "de kandidaat";
    const firstName = profile?.firstName || candidateName.split(" ")[0] || "de kandidaat";

    const toneInstruction = tone === "formal"
      ? "Schrijf in een formele, professionele toon."
      : "Schrijf in een informele, warme en persoonlijke toon.";

    const prompt = `Je bent een expert recruitment copywriter voor Nederlandse recruiters. Genereer TWEE berichten.

KANDIDAAT:
- Naam: ${candidateName} (voornaam: ${firstName})
- Functie waarvoor geworven wordt: ${jobTitle || "niet gespecificeerd"}
${profileContext}

KRITIEKE REGELS OVER WERKERVARING (volg deze STRIKT):
1. Items met [HUIDIG] → de kandidaat doet dit NU. Gebruik tegenwoordige tijd. Voorbeeld: "je rol als X bij Y", "wat je nu doet bij Z".
2. Items met [VORIG] → dit is VERLEDEN TIJD. De kandidaat werkt hier NIET meer. Gebruik verleden tijd. Voorbeeld: "je ervaring als X bij Y", "je tijd bij Z".
3. Kijk naar de periode (bijv. "okt 2022 – heden" = nog actief, "jul 2020 – okt 2022" = afgelopen). "heden" = huidige baan. Een einddatum = vorige baan.
4. Haal NOOIT functies door elkaar. Als iemand van 2020-2022 Chairman was en sinds 2022 CEO is, refereer dan aan de CEO-rol als huidig en de Chairman-rol als verleden.
5. De headline is hoe de kandidaat zichzelf profileert — gebruik dit als context maar niet als feit over hun functie.

BERICHTEN:

1) INMAIL (max 150 woorden):
- ${toneInstruction}
- Spreek aan met voornaam "${firstName}".
- Verwijs specifiek naar hun HUIDIGE rol of een opvallend carrièrepad.
- Noem de functie waarvoor je werft: "${jobTitle || "niet gespecificeerd"}".
- Geen generieke zinnen als "Ik zag je profiel" of "Ik was onder de indruk".
- Eindig met een uitnodiging voor een kort gesprek of koffie.
- Schrijf in het Nederlands.

2) CONNECTIEVERZOEK (MAXIMAAL 300 karakters inclusief spaties — harde LinkedIn limiet):
- Heel kort en concreet.
- Noem een specifiek detail uit het profiel.
- Geef een duidelijke reden om te connecten.
- Geen formele afsluiting nodig.
- Schrijf in het Nederlands.

ANTWOORD FORMAT (volg dit EXACT, geen extra tekst eromheen):
---INMAIL---
[Het InMail bericht]
---CONNECTIE---
[Het connectieverzoek, max 300 karakters]`;

    const geminiKey = process.env.Gemini;
    if (!geminiKey) {
      return NextResponse.json({ error: "API configuratie ontbreekt." }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(geminiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-3-pro-preview" });
    const result = await model.generateContent(prompt);
    const rawText = result.response.text();

    if (!rawText) {
      return NextResponse.json({ error: "Generatie mislukt." }, { status: 500 });
    }

    // Parse the two messages
    let inmail = rawText.trim();
    let connectionRequest = "";

    if (rawText.includes("---INMAIL---") && rawText.includes("---CONNECTIE---")) {
      const parts = rawText.split("---CONNECTIE---");
      inmail = parts[0].replace("---INMAIL---", "").trim();
      connectionRequest = parts[1]?.trim() || "";
      if (connectionRequest.length > 300) {
        connectionRequest = connectionRequest.substring(0, 297) + "...";
      }
    }

    console.log("[LEAD]", { email, jobTitle, name: candidateName, timestamp: new Date().toISOString() });

    return NextResponse.json({
      message: inmail,
      connectionRequest,
    });
  } catch (error) {
    console.error("Error generating message:", error);
    return NextResponse.json({ error: "Er is een fout opgetreden. Probeer het opnieuw." }, { status: 500 });
  }
}
