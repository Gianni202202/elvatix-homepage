import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { linkedinUrl } = await req.json();

    if (!linkedinUrl || !linkedinUrl.includes("linkedin.com/in/")) {
      return NextResponse.json({ error: "Ongeldige LinkedIn URL." }, { status: 400 });
    }

    const apiKey = process.env.Prospeo;
    if (!apiKey) {
      const match = linkedinUrl.match(/linkedin\.com\/in\/([^/?]+)/);
      const name = match
        ? match[1].replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()).replace(/\d+/g, "").trim()
        : "";
      return NextResponse.json({
        success: true,
        enriched: false,
        profile: { fullName: name, currentTitle: "", companyName: "", headline: "", location: "", jobHistory: [], skills: [] },
      });
    }

    const res = await fetch("https://api.prospeo.io/enrich-person", {
      method: "POST",
      headers: { "X-KEY": apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({ data: { linkedin_url: linkedinUrl } }),
    });

    let data;
    try { data = await res.json(); } catch { data = null; }

    if (!data || !res.ok || data.error || !data.person) {
      const match = linkedinUrl.match(/linkedin\.com\/in\/([^/?]+)/);
      const name = match
        ? match[1].replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()).replace(/\d+/g, "").trim()
        : "";
      return NextResponse.json({
        success: true,
        enriched: false,
        profile: { fullName: name, currentTitle: "", companyName: "", headline: "", location: "", jobHistory: [], skills: [] },
      });
    }

    const person = data.person;
    const company = data.company;

    // Build job history with current/past distinction and dates
    const jobHistory = (person.job_history || [])
      .slice(0, 5)
      .map((job: { title: string; company_name: string; duration_in_months?: number; is_current?: boolean; start_date?: string; end_date?: string }, idx: number) => {
        const isCurrent = job.is_current || idx === 0;
        const years = job.duration_in_months ? Math.round(job.duration_in_months / 12) : null;
        const duration = years ? `${years} jaar` : "";
        const period = isCurrent ? "HUIDIG" : "VORIG";
        return `[${period}] ${job.title} bij ${job.company_name}${duration ? ` (${duration})` : ""}`;
      });

    return NextResponse.json({
      success: true,
      enriched: true,
      profile: {
        fullName: person.full_name || "",
        firstName: person.first_name || "",
        lastName: person.last_name || "",
        currentTitle: person.current_job_title || "",
        companyName: company?.name || person.job_history?.[0]?.company_name || "",
        headline: person.headline || "",
        location: person.location ? `${person.location.city || ""}, ${person.location.country || ""}`.replace(/^, |, $/g, "") : "",
        jobHistory,
        skills: (person.skills || []).slice(0, 10),
      },
    });
  } catch (error) {
    console.error("[Scrape] Error:", error);
    return NextResponse.json({ error: "Scraping mislukt." }, { status: 500 });
  }
}
