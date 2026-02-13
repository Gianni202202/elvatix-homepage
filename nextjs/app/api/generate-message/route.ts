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
- [ONBEKEND] = er zijn geen datums opgegeven, dus het is onduidelijk of deze functie nog actief is. Behandel dit neutraal, niet als huidig of verleden.
${(profile.jobHistory || []).length > 0 ? (profile.jobHistory || []).join("\n") : "  Geen werkervaring beschikbaar"}

SAMENVATTING HUIDIGE SITUATIE:
- De kandidaat werkt NU als: ${profile.currentTitle || "onbekend"}
- Bij het bedrijf: ${profile.companyName || "onbekend"}

Skills: ${(profile.skills || []).join(", ") || "niet beschikbaar"}`;
    }

    const candidateName = profile?.fullName || profile?.firstName || "de kandidaat";
    const firstName = profile?.firstName || candidateName.split(" ")[0] || "de kandidaat";

    const toneInstruction = tone === "formal"
      ? "Schrijf professioneel maar menselijk — zoals een senior professional die een gelijkwaardige aanspreekt."
      : "Schrijf warm, vlot en persoonlijk — zoals een goed gesprek tussen twee professionals bij een kop koffie.";

    const prompt = `Je schrijft LinkedIn-berichten in vloeiend, natuurlijk Nederlands. Geen vertaaltaal, geen stijve zinnen. Schrijf zoals een Nederlander echt schrijft — vlot, direct, en met persoonlijkheid.

KANDIDAAT:
- Naam: ${candidateName} (voornaam: ${firstName})
- De rol waar het om gaat: ${jobTitle || "niet gespecificeerd"}
${profileContext}

REGELS OVER WERKERVARING (STRIKT):
1. [HUIDIG] = NU actief → tegenwoordige tijd ("je rol bij X", "wat je doet bij Y").
2. [VORIG] = VERLEDEN → verleden tijd ("je tijd bij X", "je ervaring bij Y").
3. [ONBEKEND] = geen datuminfo → schrijf neutraal, zonder aan te nemen of het huidig of verleden is.
4. "heden" in de periode = nog actief. Een einddatum = afgelopen. Haal dit NOOIT door elkaar.
5. De headline is hoe de kandidaat zichzelf omschrijft — gebruik het als context, niet als functietitel.

TOON & STIJL:
- ${toneInstruction}
- Het bericht gaat VOLLEDIG over de kandidaat: hun pad, hun skills, wat hen bijzonder maakt. Maak ze nieuwsgierig.
- Noem NOOIT dat je recruiter bent, niet "als recruiter", niet "vanuit mijn rol", niets daarover. Je bent gewoon iemand met een interessant voorstel.
- Noem de functie/rol waarvoor je schrijft ("${jobTitle || "niet gespecificeerd"}"), maar zonder te zeggen "ik werf" of "ik zoek kandidaten".
- Schrijf alsof je oprecht geïnteresseerd bent in deze persoon. Geen verkooppraatjes.

VERBODEN ZINNEN (gebruik deze NOOIT):
- "Ik zag je profiel"
- "Ik was onder de indruk"
- "Als recruiter zoek ik"
- "Wij zijn op zoek naar"
- "Ik kwam je profiel tegen"
- "Namens mijn klant"
- Elke zin die begint met "Ik" als openingszin

BERICHTEN:

1) INMAIL (max 150 woorden):
- Spreek aan met "${firstName}".
- Open met iets specifieks over hún carrière dat laat zien dat je je hebt verdiept — hun huidige rol, een opvallende stap, of een combinatie van skills.
- Maak een natuurlijke brug naar de rol: "${jobTitle || "niet gespecificeerd"}". Leg uit waarom hun achtergrond daar perfect bij past.
- Sluit af met een laagdrempelige uitnodiging — kort gesprek, koffie, even bellen. Geen druk.
- Elke zin moet waarde toevoegen. Geen opvulzinnen.

2) CONNECTIEVERZOEK (MAXIMAAL 300 karakters inclusief spaties — harde LinkedIn limiet):
- Eén of twee zinnen, max.
- Noem iets concreets uit hun profiel dat opvalt.
- Geef een korte, eerlijke reden om te connecten.
- Geen afsluiting, geen "Groet" of "Mvg".

ANTWOORD FORMAT (volg EXACT, geen extra tekst):
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
