"use client";
import { useState, useEffect, useRef, useCallback } from "react";

interface ProfileData {
  fullName: string;
  firstName?: string;
  lastName?: string;
  currentTitle: string;
  companyName: string;
  headline: string;
  location: string;
  jobHistory: string[];
  skills: string[];
}

type Phase =
  | "idle"
  | "connecting"
  | "scanning"
  | "found"
  | "analyzing"
  | "writing-inmail"
  | "writing-conn"
  | "done";

const STEPS = [
  { key: "connecting", label: "Verbinden" },
  { key: "scanning", label: "Scannen" },
  { key: "found", label: "Profiel" },
  { key: "analyzing", label: "Analyseren" },
  { key: "writing-inmail", label: "InMail" },
  { key: "writing-conn", label: "Connectie" },
];

const STATUS_TEXT: Record<string, { title: string; sub: string }> = {
  connecting: { title: "Verbinding maken met LinkedIn…", sub: "Profiel wordt opgezocht" },
  scanning: { title: "Profiel wordt gescand…", sub: "Data ophalen" },
  found: { title: "Profiel gevonden", sub: "Gegevens succesvol opgehaald" },
  analyzing: { title: "Profiel wordt geanalyseerd…", sub: "Beste insteek bepalen" },
  "writing-inmail": { title: "InMail wordt geschreven…", sub: "Gepersonaliseerd bericht genereren" },
  "writing-conn": { title: "Connectieverzoek wordt opgesteld…", sub: "Kort bericht genereren" },
  done: { title: "Klaar", sub: "Kopieer en verstuur via LinkedIn" },
};

export default function LeadMagnet() {
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [email, setEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [tone, setTone] = useState<"informal" | "formal">("informal");
  const [phase, setPhase] = useState<Phase>("idle");
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [enriched, setEnriched] = useState(false);
  const [inmailFull, setInmailFull] = useState("");
  const [inmailDisplayed, setInmailDisplayed] = useState("");
  const [connectionFull, setConnectionFull] = useState("");
  const [connectionDisplayed, setConnectionDisplayed] = useState("");
  const [error, setError] = useState("");
  const [copiedInmail, setCopiedInmail] = useState(false);
  const [copiedConn, setCopiedConn] = useState(false);
  const [activeTab, setActiveTab] = useState<"inmail" | "connection">("inmail");
  const typewriterRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  // Typewriter for InMail
  useEffect(() => {
    if (phase === "writing-inmail" && inmailFull) {
      let i = 0;
      setInmailDisplayed("");
      typewriterRef.current = setInterval(() => {
        i++;
        setInmailDisplayed(inmailFull.slice(0, i));
        if (i >= inmailFull.length) {
          clearInterval(typewriterRef.current!);
          setTimeout(() => setPhase("writing-conn"), 600);
        }
      }, 18);
      return () => { if (typewriterRef.current) clearInterval(typewriterRef.current); };
    }
  }, [phase, inmailFull]);

  // Typewriter for connection request
  useEffect(() => {
    if (phase === "writing-conn" && connectionFull) {
      let i = 0;
      setConnectionDisplayed("");
      setActiveTab("connection");
      typewriterRef.current = setInterval(() => {
        i++;
        setConnectionDisplayed(connectionFull.slice(0, i));
        if (i >= connectionFull.length) {
          clearInterval(typewriterRef.current!);
          setTimeout(() => setPhase("done"), 400);
        }
      }, 22);
      return () => { if (typewriterRef.current) clearInterval(typewriterRef.current); };
    }
  }, [phase, connectionFull]);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [inmailDisplayed, connectionDisplayed]);

  const handleGenerate = useCallback(async () => {
    setError("");
    setPhase("connecting");

    try {
      await new Promise(r => setTimeout(r, 1000));
      setPhase("scanning");

      const scrapeRes = await fetch("/api/scrape-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ linkedinUrl }),
      });
      const scrapeData = await scrapeRes.json();

      if (!scrapeRes.ok) {
        setError(scrapeData.error || "Scraping mislukt.");
        setPhase("idle");
        return;
      }

      setProfile(scrapeData.profile);
      setEnriched(scrapeData.enriched);
      setPhase("found");

      await new Promise(r => setTimeout(r, 1500));
      setPhase("analyzing");
      await new Promise(r => setTimeout(r, 1500));

      setPhase("writing-inmail");

      const genRes = await fetch("/api/generate-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, jobTitle, tone, profile: scrapeData.profile }),
      });
      const genData = await genRes.json();

      if (!genRes.ok) {
        setError(genData.error || "Generatie mislukt.");
        setPhase("idle");
        return;
      }

      setInmailFull(genData.message);
      setConnectionFull(genData.connectionRequest || "");
    } catch {
      setError("Er is een fout opgetreden. Probeer het opnieuw.");
      setPhase("idle");
    }
  }, [linkedinUrl, email, jobTitle, tone]);

  const handleCopy = (type: "inmail" | "connection") => {
    const text = type === "inmail" ? inmailFull : connectionFull;
    navigator.clipboard.writeText(text);
    if (type === "inmail") { setCopiedInmail(true); setTimeout(() => setCopiedInmail(false), 2500); }
    else { setCopiedConn(true); setTimeout(() => setCopiedConn(false), 2500); }
  };

  const handleReset = () => {
    setPhase("idle");
    setInmailFull(""); setInmailDisplayed("");
    setConnectionFull(""); setConnectionDisplayed("");
    setLinkedinUrl(""); setJobTitle(""); setError("");
    setEnriched(false); setProfile(null);
    setActiveTab("inmail");
  };

  const phaseOrder: Phase[] = ["connecting", "scanning", "found", "analyzing", "writing-inmail", "writing-conn", "done"];
  const currentIdx = phaseOrder.indexOf(phase);

  const getStepStatus = (stepKey: string) => {
    const stepIdx = phaseOrder.indexOf(stepKey as Phase);
    if (stepIdx < currentIdx) return "done";
    if (stepIdx === currentIdx) return "active";
    return "pending";
  };

  return (
    <section id="lead-magnet" style={{
      padding: "100px 24px",
      background: "#f9fafb",
      position: "relative",
    }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{
            display: "inline-block", fontSize: 12, fontWeight: 600, color: "#4361ee",
            letterSpacing: "1px", textTransform: "uppercase", marginBottom: 16,
          }}>
            AI Recruitment Writer
          </span>
          <h2 style={{
            fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 800, color: "#111827",
            marginBottom: 12, lineHeight: 1.15, letterSpacing: "-0.025em",
          }}>
            Genereer een gepersonaliseerd bericht
          </h2>
          <p style={{ fontSize: 16, color: "#6b7280", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            Plak een LinkedIn URL — wij scrapen het profiel en schrijven een InMail en connectieverzoek op maat.
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "#ffffff", borderRadius: 16, padding: "36px 32px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
          border: "1px solid #e5e7eb",
        }}>
          {phase === "idle" ? (
            <>
              {/* LinkedIn URL */}
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>LinkedIn URL *</label>
                <div style={{
                  display: "flex", alignItems: "center",
                  border: "1px solid #d1d5db", borderRadius: 10, overflow: "hidden",
                  transition: "border-color 0.2s",
                }}>
                  <span style={{
                    padding: "12px 14px", background: "#f9fafb", borderRight: "1px solid #d1d5db",
                    display: "flex", alignItems: "center",
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                    </svg>
                  </span>
                  <input type="url" placeholder="https://linkedin.com/in/jan-jansen"
                    value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)}
                    style={inputStyle} />
                </div>
              </div>

              {/* Job title */}
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Functie waarvoor je werft</label>
                <input type="text" placeholder="bijv. Senior Software Engineer"
                  value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}
                  style={{ ...inputStyle, ...fullInputStyle }} />
              </div>

              {/* Tone */}
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Toon</label>
                <div style={{ display: "flex", gap: 10 }}>
                  {(["informal", "formal"] as const).map((t) => (
                    <button key={t} onClick={() => setTone(t)} style={{
                      flex: 1, padding: "11px 16px", borderRadius: 8,
                      border: tone === t ? "1.5px solid #4361ee" : "1px solid #d1d5db",
                      background: tone === t ? "#f0f3ff" : "#fff",
                      color: tone === t ? "#4361ee" : "#6b7280",
                      fontWeight: 600, fontSize: 14, cursor: "pointer",
                      transition: "all 0.15s ease", fontFamily: "inherit",
                    }}>
                      {t === "informal" ? "Informeel" : "Formeel"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle}>E-mailadres *</label>
                <input type="email" placeholder="naam@bedrijf.nl"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  style={{ ...inputStyle, ...fullInputStyle }} />
              </div>

              {error && <div style={errorStyle}>{error}</div>}

              <button onClick={handleGenerate} disabled={!email || !linkedinUrl} style={{
                width: "100%", padding: "14px 24px",
                background: !email || !linkedinUrl ? "#d1d5db" : "#4361ee",
                color: "white", border: "none", borderRadius: 10,
                fontSize: 15, fontWeight: 700, cursor: !email || !linkedinUrl ? "not-allowed" : "pointer",
                transition: "background 0.2s", fontFamily: "inherit",
              }}>
                Genereer berichten
              </button>
            </>
          ) : (
            <>
              {/* Progress steps */}
              <div style={{ display: "flex", gap: 2, marginBottom: 28 }}>
                {STEPS.map((step) => {
                  const status = getStepStatus(step.key);
                  return (
                    <div key={step.key} style={{ flex: 1 }}>
                      <div style={{
                        height: 3, borderRadius: 2, marginBottom: 8,
                        background: status === "done" ? "#4361ee"
                          : status === "active" ? "#93a6f5"
                          : "#e5e7eb",
                        transition: "background 0.4s ease",
                      }} />
                      <p style={{
                        fontSize: 11, fontWeight: 600, textAlign: "center", margin: 0,
                        color: status === "done" ? "#4361ee"
                          : status === "active" ? "#4361ee"
                          : "#d1d5db",
                        transition: "color 0.3s",
                      }}>
                        {step.label}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Status line */}
              <div style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "14px 18px", background: "#f9fafb",
                border: "1px solid #e5e7eb", borderRadius: 10, marginBottom: 20,
              }}>
                {phase !== "done" ? (
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%", background: "#4361ee",
                    animation: "lm-pulse 1.5s ease-in-out infinite", flexShrink: 0,
                  }} />
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                    <circle cx="8" cy="8" r="8" fill="#10b981"/>
                    <path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#111827", margin: 0 }}>
                    {STATUS_TEXT[phase]?.title || "Klaar"}
                  </p>
                  <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>
                    {STATUS_TEXT[phase]?.sub || ""}
                  </p>
                </div>
              </div>

              {/* Scanning skeleton */}
              {(phase === "connecting" || phase === "scanning") && (
                <div style={{
                  display: "flex", alignItems: "center", gap: 14, padding: "18px",
                  background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 10,
                }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: "#e5e7eb", flexShrink: 0, animation: "lm-shimmer 1.5s ease-in-out infinite" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ width: "55%", height: 14, background: "#e5e7eb", borderRadius: 4, marginBottom: 8, animation: "lm-shimmer 1.5s ease-in-out infinite" }} />
                    <div style={{ width: "35%", height: 10, background: "#e5e7eb", borderRadius: 4, animation: "lm-shimmer 1.5s ease-in-out infinite" }} />
                  </div>
                </div>
              )}

              {/* Profile card */}
              {profile && currentIdx >= phaseOrder.indexOf("found") && (
                <div style={{
                  padding: "18px", background: "#f9fafb",
                  border: "1px solid #e5e7eb", borderRadius: 10,
                  marginBottom: phase === "found" || phase === "analyzing" ? 0 : 20,
                  animation: "lm-fade-in 0.3s ease",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 10, background: "#4361ee",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "white", fontSize: 16, fontWeight: 700, flexShrink: 0,
                    }}>
                      {profile.fullName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <p style={{ fontSize: 15, fontWeight: 700, color: "#111827", margin: 0 }}>
                          {profile.fullName}
                        </p>
                        {enriched && (
                          <span style={{
                            fontSize: 10, fontWeight: 600, color: "#4361ee", background: "#f0f3ff",
                            padding: "2px 7px", borderRadius: 4, letterSpacing: "0.3px",
                          }}>VERRIJKT</span>
                        )}
                      </div>
                      <p style={{ fontSize: 13, color: "#6b7280", margin: "2px 0 0" }}>
                        {profile.currentTitle}{profile.companyName ? ` · ${profile.companyName}` : ""}
                      </p>
                    </div>
                  </div>
                  {enriched && (profile.location || profile.jobHistory.length > 0 || profile.skills.length > 0) && (
                    <div style={{
                      display: "flex", gap: 16, marginTop: 12, paddingTop: 12,
                      borderTop: "1px solid #e5e7eb", flexWrap: "wrap",
                    }}>
                      {profile.location && (
                        <span style={{ fontSize: 12, color: "#9ca3af" }}>📍 {profile.location}</span>
                      )}
                      {profile.jobHistory.length > 0 && (
                        <span style={{ fontSize: 12, color: "#9ca3af" }}>💼 {profile.jobHistory.length} posities</span>
                      )}
                      {profile.skills.length > 0 && (
                        <span style={{ fontSize: 12, color: "#9ca3af" }}>⚡ {profile.skills.length} skills</span>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Message area */}
              {(["writing-inmail", "writing-conn", "done"].includes(phase)) && (
                <div style={{ marginTop: 20, animation: "lm-fade-in 0.3s ease" }}>
                  {/* Tabs */}
                  <div style={{ display: "flex", gap: 0, marginBottom: 0, borderBottom: "1px solid #e5e7eb" }}>
                    {[
                      { key: "inmail" as const, label: "InMail", done: !!inmailFull },
                      { key: "connection" as const, label: "Connectieverzoek", done: !!connectionFull && phase === "done" },
                    ].map((tab) => (
                      <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
                        padding: "10px 20px", border: "none",
                        borderBottom: activeTab === tab.key ? "2px solid #4361ee" : "2px solid transparent",
                        background: "transparent",
                        color: activeTab === tab.key ? "#4361ee" : "#9ca3af",
                        fontWeight: 600, fontSize: 13, cursor: "pointer",
                        fontFamily: "inherit", transition: "all 0.15s",
                        display: "flex", alignItems: "center", gap: 6,
                      }}>
                        {tab.label}
                        {tab.done && (
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <circle cx="7" cy="7" r="7" fill="#10b981"/>
                            <path d="M4.5 7l1.5 1.5 3.5-3.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* InMail content */}
                  {activeTab === "inmail" && (
                    <div ref={messageRef} style={{
                      ...messageBoxStyle, maxHeight: 280, overflowY: "auto",
                    }}>
                      {inmailDisplayed || (
                        <span style={{ color: "#d1d5db", fontStyle: "italic" }}>Bericht wordt geschreven…</span>
                      )}
                      {phase === "writing-inmail" && inmailDisplayed && (
                        <span style={{ color: "#4361ee", animation: "lm-blink 0.7s step-end infinite" }}>|</span>
                      )}
                    </div>
                  )}

                  {/* Connection content */}
                  {activeTab === "connection" && (
                    <div>
                      <div style={{ ...messageBoxStyle, minHeight: 72 }}>
                        {phase === "done" || phase === "writing-conn" ? (
                          <>
                            {connectionDisplayed || (
                              <span style={{ color: "#d1d5db", fontStyle: "italic" }}>Wordt opgesteld…</span>
                            )}
                            {phase === "writing-conn" && connectionDisplayed && (
                              <span style={{ color: "#4361ee", animation: "lm-blink 0.7s step-end infinite" }}>|</span>
                            )}
                          </>
                        ) : (
                          <span style={{ color: "#d1d5db", fontStyle: "italic" }}>
                            Wordt na InMail gegenereerd…
                          </span>
                        )}
                      </div>
                      {phase === "done" && connectionFull && (
                        <p style={{ fontSize: 11, color: "#9ca3af", margin: "8px 4px 0", textAlign: "right" }}>
                          {connectionFull.length}/300 karakters
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Done actions */}
              {phase === "done" && (
                <div style={{ marginTop: 24, animation: "lm-fade-in 0.3s ease" }}>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={() => { setActiveTab("inmail"); handleCopy("inmail"); }}
                      style={{
                        ...actionBtnStyle,
                        flex: 1,
                        background: copiedInmail ? "#10b981" : "#4361ee",
                        color: "white",
                      }}>
                      {copiedInmail ? "✓ Gekopieerd" : "Kopieer InMail"}
                    </button>
                    <button onClick={() => { setActiveTab("connection"); handleCopy("connection"); }}
                      style={{
                        ...actionBtnStyle,
                        flex: 1,
                        background: copiedConn ? "#10b981" : "#111827",
                        color: "white",
                      }}>
                      {copiedConn ? "✓ Gekopieerd" : "Kopieer connectieverzoek"}
                    </button>
                    <button onClick={handleReset}
                      style={{
                        ...actionBtnStyle,
                        background: "#f3f4f6", color: "#374151", border: "1px solid #d1d5db",
                      }}>
                      Nieuw
                    </button>
                  </div>

                  {/* Upsell */}
                  <div style={{
                    marginTop: 20, padding: "20px", background: "#f9fafb",
                    border: "1px solid #e5e7eb", borderRadius: 10,
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    gap: 16, flexWrap: "wrap",
                  }}>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 700, color: "#111827", margin: "0 0 4px" }}>
                        Onbeperkt berichten + automatische follow-ups?
                      </p>
                      <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>
                        Ontdek wat Elvatix voor jouw recruitment kan doen.
                      </p>
                    </div>
                    <a href="/demo" style={{
                      padding: "10px 20px", background: "#4361ee", color: "white",
                      borderRadius: 8, fontWeight: 600, fontSize: 13,
                      textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0,
                    }}>
                      Vraag demo aan →
                    </a>
                  </div>
                </div>
              )}

              {error && <div style={{ ...errorStyle, marginTop: 16 }}>{error}</div>}
            </>
          )}
        </div>

        {/* Trust */}
        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 28, flexWrap: "wrap" }}>
          {[
            { icon: "🔒", text: "Veilig & privé" },
            { icon: "⚡", text: "Klaar in ~15 sec" },
            { icon: "🎯", text: "5x gratis per uur" },
          ].map((item, i) => (
            <span key={i} style={{ fontSize: 12, color: "#9ca3af", display: "flex", alignItems: "center", gap: 5 }}>
              <span>{item.icon}</span> {item.text}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes lm-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes lm-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes lm-blink { 50% { opacity: 0; } }
        @keyframes lm-fade-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

        #lead-magnet input:focus {
          outline: none;
          border-color: #4361ee !important;
          box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.08);
        }

        @media (max-width: 640px) {
          #lead-magnet .lm-actions { flex-direction: column; }
        }
      `}</style>
    </section>
  );
}

// Shared styles
const labelStyle: React.CSSProperties = {
  display: "block", fontSize: 13, fontWeight: 600, color: "#374151",
  marginBottom: 6,
};

const inputStyle: React.CSSProperties = {
  flex: 1, padding: "12px 14px", border: "none", outline: "none",
  fontSize: 14, background: "transparent", color: "#111827", fontFamily: "inherit",
};

const fullInputStyle: React.CSSProperties = {
  width: "100%", border: "1px solid #d1d5db", borderRadius: 10,
  background: "#ffffff", boxSizing: "border-box" as const,
};

const messageBoxStyle: React.CSSProperties = {
  background: "#fafbfc", borderLeft: "1px solid #e5e7eb", borderRight: "1px solid #e5e7eb",
  borderBottom: "1px solid #e5e7eb", borderTop: "none",
  borderRadius: "0 0 10px 10px", padding: "20px",
  whiteSpace: "pre-wrap" as const, fontSize: 14, lineHeight: 1.8, color: "#374151", fontFamily: "inherit",
};

const errorStyle: React.CSSProperties = {
  padding: "10px 14px", background: "#fef2f2", border: "1px solid #fecaca",
  borderRadius: 8, color: "#dc2626", fontSize: 13, marginBottom: 16,
};

const actionBtnStyle: React.CSSProperties = {
  padding: "12px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600,
  cursor: "pointer", transition: "all 0.15s ease", fontFamily: "inherit",
  border: "none", whiteSpace: "nowrap" as const,
};
