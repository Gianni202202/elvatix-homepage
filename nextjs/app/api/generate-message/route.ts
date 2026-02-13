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
VERRIJKT LINKEDIN PROFIEL (via scraping):
- Volledige naam: ${profile.fullName}
- Headline (zelfbeschrijving op LinkedIn): ${profile.headline || "niet beschikbaar"}
- Locatie: ${profile.location || "onbekend"}

BELANGRIJK — WERKERVARING TIJDLIJN (lees dit als een CV, van boven naar beneden):
Items met [HUIDIG] zijn functies die de kandidaat NU bekleedt.
Items met [VORIG] zijn functies uit het VERLEDEN — de kandidaat werkt hier NIET meer.
${(profile.jobHistory || []).length > 0 ? (profile.jobHistory || []).map((j: string) => `  ${j}`).join("\n") : "  Geen werkervaring beschikbaar"}

HUIDIGE SITUATIE (gebaseerd op bovenstaande tijdlijn):
- Huidige functietitel: ${profile.currentTitle || "onbekend"}
- Huidig bedrijf: ${profile.companyName || "onbekend"}

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

KRITIEKE REGELS OVER WERKERVARING:
1. Functies gemarkeerd als [VORIG] zijn VERLEDEN TIJD. De kandidaat werkt daar NIET meer. Verwijs ernaar in de verleden tijd ("je ervaring bij X", "je tijd bij Y").
2. Functies gemarkeerd als [HUIDIG] zijn ACTIEF. De kandidaat werkt daar NU. Gebruik tegenwoordige tijd ("je rol bij X", "wat je doet bij Y").
3. Haal NOOIT vorige en huidige functies door elkaar. Als iemand vroeger bij Microsoft werkte en nu bij een startup zit, zeg dan NIET "wat je bij Microsoft doet" maar "je ervaring bij Microsoft".
4. De headline (zelfbeschrijving) is hoe de kandidaat ZICHZELF omschrijft — gebruik dit als context voor hoe ze hun carrière zien.

BERICHTEN:

1) INMAIL (max 150 woorden):
- ${toneInstruction}
- Spreek aan met voornaam "${firstName}".
- Refereer concreet aan iets specifieks uit het profiel: hun HUIDIGE rol, een specifieke skill, of hun carrièrepad.
- Noem de functie waarvoor je werft.
- Geen generieke openingszinnen als "Ik zag je profiel" of "Ik was onder de indruk".
- Eindig met een uitnodiging voor een kort gesprek of koffie.
- Schrijf in het Nederlands.

2) CONNECTIEVERZOEK (MAXIMAAL 300 karakters inclusief spaties — LinkedIn limiet):
- Heel kort en concreet.
- Noem een specifiek detail uit het profiel.
- Geef een reden om te connecten.
- Geen formele afsluiting.
- Schrijf in het Nederlands.

ANTWOORD FORMAT (volg dit EXACT, geen extra tekst):
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
