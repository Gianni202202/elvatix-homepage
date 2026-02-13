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
- Huidige functie: ${profile.currentTitle || "onbekend"}
- Bedrijf: ${profile.companyName || "onbekend"}
- Headline: ${profile.headline || "niet beschikbaar"}
- Locatie: ${profile.location || "onbekend"}
- Werkervaring: ${(profile.jobHistory || []).join(" → ") || "niet beschikbaar"}
- Skills: ${(profile.skills || []).join(", ") || "niet beschikbaar"}`;
    }

    const candidateName = profile?.fullName || profile?.firstName || "de kandidaat";

    const toneInstruction = tone === "formal"
      ? "Schrijf in een formele, professionele toon."
      : "Schrijf in een informele, warme en persoonlijke toon.";

    const prompt = `Je bent een expert recruitment copywriter voor Nederlandse recruiters. Genereer TWEE berichten:

1) Een gepersonaliseerd LinkedIn InMail bericht (max 150 woorden)
2) Een kort connectieverzoek-bericht (MAXIMAAL 300 karakters inclusief spaties — dit is een harde limiet van LinkedIn)

KANDIDAAT INFORMATIE:
- Naam: ${candidateName}
- Functie waarvoor geworven wordt: ${jobTitle || "niet gespecificeerd"}
${profileContext}

INSTRUCTIES VOOR BEIDE BERICHTEN:
- ${toneInstruction}
- Het bericht moet ECHT persoonlijk aanvoelen — gebruik specifieke details uit het profiel.
- Als er werkervaring of headline beschikbaar is, verwijs daar concreet naar.
- Gebruik de voornaam van de kandidaat als aanspreking.
- GEEN generieke zinnen als "Ik zag je profiel" of "Ik was onder de indruk". Wees specifiek.
- Schrijf in het Nederlands.

EXTRA VOOR INMAIL:
- Noem de functie waarvoor je werft.
- Gebruik een pakkende openingszin die opvalt in een drukke inbox.
- Eindig met een uitnodiging voor een kort gesprek of (virtuele) koffie.

EXTRA VOOR CONNECTIEVERZOEK:
- Heel kort en puntig — max 300 karakters totaal.
- Geen formele afsluiting nodig.
- Geef een duidelijke reden om te connecten.

ANTWOORD FORMAT (volg dit EXACT):
---INMAIL---
[Het InMail bericht hier]
---CONNECTIE---
[Het connectieverzoek hier, max 300 karakters]`;

    const geminiKey = process.env.Gemini;
    if (!geminiKey) {
      return NextResponse.json({ error: "API configuratie ontbreekt." }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(geminiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
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
