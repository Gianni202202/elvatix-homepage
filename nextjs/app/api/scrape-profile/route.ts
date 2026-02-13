import { NextRequest, NextResponse } from "next/server";

interface ProspeoJob {
  title: string;
  company_name: string;
  current: boolean;
  start_year: number | null;
  start_month: number | null;
  end_year: number | null;
  end_month: number | null;
  duration_in_months: number | null;
  seniority: string | null;
  departments: string[];
}

function formatPeriod(startYear: number | null, startMonth: number | null, endYear: number | null, endMonth: number | null): string {
  const months = ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];
  const start = startYear ? `${startMonth ? months[startMonth - 1] + " " : ""}${startYear}` : "?";
  if (!endYear && !endMonth) return `${start} – heden`;
  const end = endYear ? `${endMonth ? months[endMonth - 1] + " " : ""}${endYear}` : "?";
  return `${start} – ${end}`;
}

function formatDuration(months: number | null): string {
  if (!months) return "";
  const years = Math.floor(months / 12);
  const remainder = months % 12;
  if (years === 0) return `${remainder} mnd`;
  if (remainder === 0) return `${years} jr`;
  return `${years} jr ${remainder} mnd`;
}

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

    // Build detailed job history using actual Prospeo fields
    const jobHistory = (person.job_history || [])
      .slice(0, 5)
      .map((job: ProspeoJob) => {
        // Prospeo uses `current: true` and `end_year/end_month: null` for active jobs
        const isCurrent = job.current === true || (job.end_year === null && job.end_month === null);
        const status = isCurrent ? "HUIDIG" : "VORIG";
        const period = formatPeriod(job.start_year, job.start_month, job.end_year, job.end_month);
        const duration = formatDuration(job.duration_in_months);
        const seniority = job.seniority || "";

        return `[${status}] ${job.title} bij ${job.company_name} (${period}${duration ? ", " + duration : ""}${seniority ? " | " + seniority : ""})`;
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
