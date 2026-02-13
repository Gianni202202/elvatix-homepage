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
  | "connecting"     // "Verbinding maken met LinkedIn..."
  | "scanning"       // "Profiel wordt gescand..."  (avatar placeholder scanning)
  | "found"          // Profile card slides in — "Profiel gevonden!"
  | "analyzing"      // "Ervaring en skills worden geanalyseerd..."
  | "writing-inmail" // "Recruiter schrijft je InMail..."  (typewriter)
  | "checking"       // "Bericht wordt gecontroleerd op kwaliteit..."
  | "writing-conn"   // "Connectieverzoek wordt opgesteld..."
  | "done";

interface WorkerMessage {
  icon: string;
  text: string;
  sub?: string;
}

const PHASE_MESSAGES: Record<string, WorkerMessage> = {
  connecting:       { icon: "🔗", text: "Verbinding maken met LinkedIn...", sub: "Even geduld, we zoeken het profiel op" },
  scanning:         { icon: "🔍", text: "Profiel wordt gescand...", sub: "Naam, functie, ervaring en skills ophalen" },
  found:            { icon: "✅", text: "Profiel gevonden!", sub: "Alle gegevens succesvol opgehaald" },
  analyzing:        { icon: "📊", text: "Profiel wordt geanalyseerd...", sub: "Zoeken naar de beste insteek voor het bericht" },
  "writing-inmail": { icon: "✍️", text: "Je recruiter schrijft het InMail bericht...", sub: "Elk woord wordt zorgvuldig gekozen" },
  checking:         { icon: "🔎", text: "Kwaliteitscheck...", sub: "Controleren op natuurlijk Nederlands en personalisatie" },
  "writing-conn":   { icon: "🤝", text: "Connectieverzoek wordt opgesteld...", sub: "Kort, krachtig en uitnodigend" },
  done:             { icon: "🎉", text: "Alles staat klaar!", sub: "Kopieer en verstuur direct via LinkedIn" },
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
          // Move to checking phase
          setTimeout(() => setPhase("checking"), 400);
        }
      }, 20);
      return () => { if (typewriterRef.current) clearInterval(typewriterRef.current); };
    }
  }, [phase, inmailFull]);

  // Typewriter for connection request
  useEffect(() => {
    if (phase === "writing-conn" && connectionFull) {
      let i = 0;
      setConnectionDisplayed("");
      typewriterRef.current = setInterval(() => {
        i++;
        setConnectionDisplayed(connectionFull.slice(0, i));
        if (i >= connectionFull.length) {
          clearInterval(typewriterRef.current!);
          setTimeout(() => setPhase("done"), 400);
        }
      }, 25);
      return () => { if (typewriterRef.current) clearInterval(typewriterRef.current); };
    }
  }, [phase, connectionFull]);

  // Auto-transition: checking → writing-conn
  useEffect(() => {
    if (phase === "checking") {
      const t = setTimeout(() => setPhase("writing-conn"), 2000);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // Auto-scroll
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [inmailDisplayed, connectionDisplayed]);

  const handleGenerate = useCallback(async () => {
    setError("");
    setPhase("connecting");

    try {
      // Fake connecting delay
      await new Promise(r => setTimeout(r, 1200));
      setPhase("scanning");

      // STEP 1: Scrape
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

      // Show found profile for a moment
      await new Promise(r => setTimeout(r, 2000));
      setPhase("analyzing");

      // Brief analyzing pause
      await new Promise(r => setTimeout(r, 1800));

      // STEP 2: Generate messages
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

      // Set full messages — typewriter effects will kick in via useEffect
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

  const isProcessing = !["idle", "done"].includes(phase);
  const phaseOrder: Phase[] = ["connecting", "scanning", "found", "analyzing", "writing-inmail", "checking", "writing-conn", "done"];
  const currentPhaseIdx = phaseOrder.indexOf(phase);

  const getStepState = (idx: number) => {
    if (idx < currentPhaseIdx) return "done";
    if (idx === currentPhaseIdx) return "active";
    return "pending";
  };

  // Steps to show in the timeline
  const timelineSteps = [
    { phase: "connecting", icon: "🔗", label: "LinkedIn verbinden", doneLabel: "Verbonden" },
    { phase: "scanning",   icon: "🔍", label: "Profiel scannen", doneLabel: "Profiel gevonden" },
    { phase: "analyzing",  icon: "📊", label: "Data analyseren", doneLabel: "Geanalyseerd" },
    { phase: "writing-inmail", icon: "✍️", label: "InMail schrijven", doneLabel: "InMail klaar" },
    { phase: "checking",   icon: "🔎", label: "Kwaliteitscheck", doneLabel: "Goedgekeurd ✓" },
    { phase: "writing-conn", icon: "🤝", label: "Connectieverzoek", doneLabel: "Connectieverzoek klaar" },
  ];

  return (
    <section id="lead-magnet" style={{
      padding: "100px 24px",
      background: "linear-gradient(180deg, #f8fafc 0%, #eef2ff 50%, #f8fafc 100%)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background orbs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div className="lm-orb lm-orb-1" />
        <div className="lm-orb lm-orb-2" />
        <div className="lm-orb lm-orb-3" />
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(67, 97, 238, 0.08)", border: "1px solid rgba(67, 97, 238, 0.2)",
            borderRadius: 9999, padding: "8px 20px", marginBottom: 24, backdropFilter: "blur(8px)",
          }}>
            <span style={{ fontSize: 16 }}>✨</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#4361ee", letterSpacing: "0.5px", textTransform: "uppercase" }}>
              Gratis AI Recruitment Writer
            </span>
          </div>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, color: "#0f172a",
            marginBottom: 16, lineHeight: 1.1, letterSpacing: "-0.02em",
          }}>
            Jouw persoonlijke{" "}
            <span className="lm-gradient-text">AI recruiter</span>
            <br />aan het werk
          </h2>
          <p style={{ fontSize: 17, color: "#64748b", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
            Plak een LinkedIn URL en kijk live mee hoe onze AI het profiel analyseert
            en twee op maat gemaakte berichten schrijft.
          </p>
        </div>

        {/* Main Card */}
        <div className="lm-card" style={{
          background: "rgba(255, 255, 255, 0.92)", borderRadius: 24,
          padding: "40px 36px",
          boxShadow: "0 8px 40px rgba(67, 97, 238, 0.08), 0 1px 3px rgba(0,0,0,0.04)",
          border: "1px solid rgba(67, 97, 238, 0.1)",
          backdropFilter: "blur(20px)", position: "relative", overflow: "hidden",
        }}>
          {isProcessing && <div className="lm-shimmer-border" />}

          {phase === "idle" ? (
            /* ========== INPUT FORM ========== */
            <>
              <div style={{ marginBottom: 22 }}>
                <label className="lm-label">LinkedIn profiel-URL *</label>
                <div className="lm-input-group">
                  <span className="lm-input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4361ee" strokeWidth="2" strokeLinecap="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                    </svg>
                  </span>
                  <input type="url" placeholder="https://linkedin.com/in/jan-jansen" value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)} className="lm-input" />
                </div>
                <p className="lm-hint">We scrapen automatisch naam, functie, ervaring en skills.</p>
              </div>

              <div style={{ marginBottom: 22 }}>
                <label className="lm-label">Functie waarvoor je werft</label>
                <input type="text" placeholder="bijv. Senior Software Engineer" value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)} className="lm-input lm-input-full" />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label className="lm-label">Toon</label>
                <div style={{ display: "flex", gap: 12 }}>
                  {(["informal", "formal"] as const).map((t) => (
                    <button key={t} onClick={() => setTone(t)}
                      className={`lm-tone-btn ${tone === t ? "lm-tone-active" : ""}`}>
                      {t === "informal" ? "😊 Informeel" : "👔 Formeel"}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 28 }}>
                <label className="lm-label">Jouw e-mailadres *</label>
                <input type="email" placeholder="naam@bedrijf.nl" value={email}
                  onChange={(e) => setEmail(e.target.value)} className="lm-input lm-input-full" />
                <p className="lm-hint">Geen spam, alleen om je bericht te bewaren.</p>
              </div>

              {error && <div className="lm-error">{error}</div>}

              <button onClick={handleGenerate} disabled={!email || !linkedinUrl} className="lm-submit">
                <span className="lm-submit-shine" />
                <span style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                  Start AI Recruiter
                </span>
              </button>
            </>
          ) : (
            /* ========== WORKER EXPERIENCE ========== */
            <>
              {/* Live status banner */}
              <div className="lm-status-banner" key={phase}>
                <div className={`lm-status-icon ${isProcessing ? "lm-status-pulse" : ""}`}>
                  {PHASE_MESSAGES[phase]?.icon || "🎉"}
                </div>
                <div>
                  <p style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: 0 }}>
                    {PHASE_MESSAGES[phase]?.text || "Klaar!"}
                  </p>
                  <p style={{ fontSize: 13, color: "#64748b", margin: "2px 0 0" }}>
                    {PHASE_MESSAGES[phase]?.sub || ""}
                  </p>
                </div>
              </div>

              {/* Timeline */}
              <div style={{ display: "flex", gap: 4, margin: "24px 0 28px", flexWrap: "wrap" }}>
                {timelineSteps.map((step, i) => {
                  const state = getStepState(phaseOrder.indexOf(step.phase as Phase));
                  return (
                    <div key={step.phase} style={{ flex: 1, minWidth: 60 }}>
                      <div style={{
                        height: 4, borderRadius: 4, marginBottom: 8,
                        background: state === "done" ? "linear-gradient(90deg, #10b981, #059669)"
                          : state === "active" ? "linear-gradient(90deg, #4361ee, #7c3aed)"
                          : "#e2e8f0",
                        transition: "background 0.5s ease",
                        position: "relative", overflow: "hidden",
                      }}>
                        {state === "active" && <div className="lm-bar-pulse" />}
                      </div>
                      <p style={{
                        fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3px",
                        color: state === "done" ? "#10b981" : state === "active" ? "#4361ee" : "#cbd5e1",
                        margin: 0, textAlign: "center", transition: "color 0.3s",
                      }}>
                        {state === "done" ? step.doneLabel : step.label}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Profile Card — shown from "found" onwards */}
              {profile && currentPhaseIdx >= phaseOrder.indexOf("found") && (
                <div className="lm-profile-card" style={{ animation: "lm-slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: 16,
                      background: "linear-gradient(135deg, #4361ee, #7c3aed)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "white", fontSize: 20, fontWeight: 800, flexShrink: 0,
                    }}>
                      {profile.fullName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                        <p style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: 0 }}>
                          {profile.fullName}
                        </p>
                        {enriched && (
                          <span style={{
                            fontSize: 10, fontWeight: 700, color: "#10b981", background: "#ecfdf5",
                            padding: "2px 8px", borderRadius: 6, textTransform: "uppercase", letterSpacing: "0.5px",
                          }}>Gescraped</span>
                        )}
                      </div>
                      <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>
                        {profile.currentTitle}{profile.companyName ? ` bij ${profile.companyName}` : ""}
                      </p>
                      {profile.headline && (
                        <p style={{ fontSize: 12, color: "#94a3b8", margin: "4px 0 0", fontStyle: "italic" }}>
                          &ldquo;{profile.headline}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>

                  {enriched && (profile.location || profile.jobHistory.length > 0 || profile.skills.length > 0) && (
                    <div style={{
                      display: "flex", gap: 16, marginTop: 14, paddingTop: 14,
                      borderTop: "1px solid rgba(226, 232, 240, 0.8)", flexWrap: "wrap",
                    }}>
                      {profile.location && (
                        <div className="lm-stat"><span>📍</span><span>{profile.location}</span></div>
                      )}
                      {profile.jobHistory.length > 0 && (
                        <div className="lm-stat"><span>💼</span><span>{profile.jobHistory.length} posities</span></div>
                      )}
                      {profile.skills.length > 0 && (
                        <div className="lm-stat"><span>⚡</span><span>{profile.skills.length} skills</span></div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Scanning animation placeholder — before profile found */}
              {(phase === "connecting" || phase === "scanning") && (
                <div className="lm-scan-placeholder">
                  <div className="lm-scan-avatar lm-shimmer-bg" />
                  <div style={{ flex: 1 }}>
                    <div className="lm-scan-line lm-shimmer-bg" style={{ width: "60%", height: 16, marginBottom: 8 }} />
                    <div className="lm-scan-line lm-shimmer-bg" style={{ width: "40%", height: 12, marginBottom: 6 }} />
                    <div className="lm-scan-line lm-shimmer-bg" style={{ width: "80%", height: 12 }} />
                  </div>
                  <div className="lm-scan-sweep" />
                </div>
              )}

              {/* Analyzing animation */}
              {phase === "analyzing" && (
                <div className="lm-analyzing-dots" style={{ textAlign: "center", padding: "16px 0" }}>
                  <div style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
                    {["Ervaring", "Skills", "Toon", "Context"].map((label, i) => (
                      <span key={label} className="lm-analyze-tag" style={{ animationDelay: `${i * 0.2}s` }}>
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Message display area — tabs for InMail / Connection request */}
              {(["writing-inmail", "checking", "writing-conn", "done"].includes(phase)) && (
                <div style={{ marginTop: 24, animation: "lm-slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}>
                  {/* Tabs */}
                  <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                    <button onClick={() => setActiveTab("inmail")}
                      className={`lm-tab ${activeTab === "inmail" ? "lm-tab-active" : ""}`}>
                      💌 InMail bericht
                      {inmailFull && <span className="lm-tab-badge">✓</span>}
                    </button>
                    <button onClick={() => setActiveTab("connection")}
                      className={`lm-tab ${activeTab === "connection" ? "lm-tab-active" : ""}`}>
                      🤝 Connectieverzoek
                      {connectionFull && phase === "done" && <span className="lm-tab-badge">✓</span>}
                    </button>
                  </div>

                  {/* InMail tab */}
                  {activeTab === "inmail" && (
                    <div ref={messageRef} className="lm-message-box" style={{ maxHeight: 300, overflowY: "auto" }}>
                      {inmailDisplayed || (
                        <span style={{ color: "#cbd5e1", fontStyle: "italic" }}>Bericht wordt geschreven...</span>
                      )}
                      {(phase === "writing-inmail") && inmailDisplayed && <span className="lm-cursor">|</span>}
                    </div>
                  )}

                  {/* Connection request tab */}
                  {activeTab === "connection" && (
                    <div>
                      <div className="lm-message-box" style={{ minHeight: 80 }}>
                        {phase === "done" || phase === "writing-conn" ? (
                          <>
                            {connectionDisplayed || (
                              <span style={{ color: "#cbd5e1", fontStyle: "italic" }}>Wordt opgesteld...</span>
                            )}
                            {phase === "writing-conn" && connectionDisplayed && <span className="lm-cursor">|</span>}
                          </>
                        ) : (
                          <span style={{ color: "#cbd5e1", fontStyle: "italic" }}>
                            Wordt geschreven na het InMail bericht...
                          </span>
                        )}
                      </div>
                      {(phase === "done" && connectionFull) && (
                        <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 8, textAlign: "right" }}>
                          {connectionFull.length} / 300 karakters
                        </p>
                      )}
                    </div>
                  )}

                  {/* Quality check visual */}
                  {phase === "checking" && (
                    <div className="lm-check-visual">
                      {["Grammatica", "Personalisatie", "Tone of voice", "Call-to-action"].map((item, i) => (
                        <div key={item} className="lm-check-item" style={{ animationDelay: `${i * 0.4}s` }}>
                          <span className="lm-check-icon">✓</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Done state: actions */}
              {phase === "done" && (
                <div style={{ marginTop: 24, animation: "lm-slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <button onClick={() => { setActiveTab("inmail"); handleCopy("inmail"); }}
                      className={`lm-action-btn ${copiedInmail ? "lm-copied" : "lm-primary"}`}>
                      {copiedInmail ? "✓ Gekopieerd!" : "📋 Kopieer InMail"}
                    </button>
                    <button onClick={() => { setActiveTab("connection"); handleCopy("connection"); }}
                      className={`lm-action-btn ${copiedConn ? "lm-copied" : "lm-conn-btn"}`}>
                      {copiedConn ? "✓ Gekopieerd!" : "🤝 Kopieer connectieverzoek"}
                    </button>
                    <button onClick={handleReset} className="lm-action-btn lm-secondary">
                      🔄 Nieuw
                    </button>
                  </div>

                  {/* Upsell */}
                  <div className="lm-upsell">
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 28 }}>🚀</span>
                      <div>
                        <p style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", margin: "0 0 4px" }}>
                          Wil je onbeperkt berichten + automatische follow-ups?
                        </p>
                        <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>
                          Ontdek hoe Elvatix recruitment 10x sneller maakt.
                        </p>
                      </div>
                    </div>
                    <a href="/demo" className="lm-demo-btn">Vraag demo aan →</a>
                  </div>
                </div>
              )}

              {error && <div className="lm-error" style={{ marginTop: 16 }}>{error}</div>}
            </>
          )}
        </div>

        {/* Trust indicators */}
        <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 36, flexWrap: "wrap" }}>
          {[
            { icon: "🔒", label: "Veilig & privé" },
            { icon: "⚡", label: "Klaar in ~15 sec" },
            { icon: "🆓", label: "3x gratis per uur" },
            { icon: "🔍", label: "Scraped échte data" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, opacity: 0.7 }}>
              <span style={{ fontSize: 14 }}>{item.icon}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#64748b" }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .lm-gradient-text {
          background: linear-gradient(135deg, #4361ee 0%, #7c3aed 50%, #4361ee 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: lm-gradient-shift 3s ease infinite;
        }
        .lm-orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.12; }
        .lm-orb-1 { width: 400px; height: 400px; background: #4361ee; top: -100px; right: -100px; animation: lm-float 20s ease-in-out infinite; }
        .lm-orb-2 { width: 300px; height: 300px; background: #7c3aed; bottom: -50px; left: -50px; animation: lm-float 15s ease-in-out infinite reverse; }
        .lm-orb-3 { width: 200px; height: 200px; background: #10b981; top: 50%; left: 50%; animation: lm-float 25s ease-in-out infinite; }
        .lm-card { transition: box-shadow 0.4s ease; }
        .lm-shimmer-border { position: absolute; inset: -2px; border-radius: 26px; background: linear-gradient(90deg, transparent, #4361ee, #7c3aed, #10b981, transparent); background-size: 400% 100%; animation: lm-shimmer 2s linear infinite; z-index: -1; }
        .lm-label { display: block; font-size: 13px; font-weight: 700; color: #374151; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
        .lm-hint { font-size: 12px; color: #94a3b8; margin-top: 6px; }
        .lm-input-group { display: flex; align-items: center; background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 14px; overflow: hidden; transition: border-color 0.2s, box-shadow 0.2s; }
        .lm-input-group:focus-within { border-color: #4361ee; box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1); }
        .lm-input-icon { padding: 14px; display: flex; align-items: center; border-right: 1px solid #e2e8f0; background: #f1f5f9; }
        .lm-input { flex: 1; padding: 14px 16px; border: none; outline: none; font-size: 15px; background: transparent; color: #0f172a; font-family: inherit; }
        .lm-input-full { width: 100%; padding: 14px 16px; border: 1.5px solid #e2e8f0; border-radius: 14px; font-size: 15px; outline: none; background: #f8fafc; color: #0f172a; box-sizing: border-box; font-family: inherit; transition: border-color 0.2s, box-shadow 0.2s; }
        .lm-input-full:focus { border-color: #4361ee; box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1); }
        .lm-tone-btn { flex: 1; padding: 13px 20px; border-radius: 12px; border: 1.5px solid #e2e8f0; background: #fff; color: #64748b; font-weight: 600; font-size: 14px; cursor: pointer; transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1); font-family: inherit; }
        .lm-tone-btn:hover { border-color: #cbd5e1; background: #f8fafc; }
        .lm-tone-active { border-color: #4361ee !important; background: linear-gradient(135deg, rgba(67, 97, 238, 0.06), rgba(124, 58, 237, 0.06)) !important; color: #4361ee !important; box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.08); }
        .lm-submit { width: 100%; padding: 18px 32px; background: linear-gradient(135deg, #4361ee, #7c3aed); color: white; border: none; border-radius: 16px; font-size: 16px; font-weight: 700; cursor: pointer; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); font-family: inherit; position: relative; overflow: hidden; }
        .lm-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(67, 97, 238, 0.35); }
        .lm-submit:disabled { opacity: 0.4; cursor: not-allowed; }
        .lm-submit-shine { position: absolute; inset: 0; background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%); animation: lm-shine 3s infinite; }

        /* Status banner */
        .lm-status-banner { display: flex; align-items: center; gap: 16; padding: 20px 24px; background: linear-gradient(135deg, #f0f4ff, #eef2ff); border: 1px solid rgba(67, 97, 238, 0.15); border-radius: 18px; margin-bottom: 4px; animation: lm-slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .lm-status-icon { font-size: 28px; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: white; border-radius: 14px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); flex-shrink: 0; }
        .lm-status-pulse { animation: lm-pulse-icon 2s ease-in-out infinite; }

        /* Progress bar pulse */
        .lm-bar-pulse { position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent); animation: lm-bar-sweep 1.5s ease-in-out infinite; }

        /* Scanning placeholder */
        .lm-scan-placeholder { display: flex; align-items: center; gap: 16; padding: 20px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 18px; margin-top: 20px; position: relative; overflow: hidden; }
        .lm-scan-avatar { width: 52px; height: 52px; border-radius: 16px; flex-shrink: 0; }
        .lm-scan-line { border-radius: 8px; }
        .lm-shimmer-bg { background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%); background-size: 200% 100%; animation: lm-shimmer-load 1.5s ease-in-out infinite; }
        .lm-scan-sweep { position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(67, 97, 238, 0.06), transparent); animation: lm-sweep 2s ease-in-out infinite; }

        /* Analyze tags */
        .lm-analyze-tag { display: inline-block; padding: 6px 14px; background: white; border: 1px solid #e2e8f0; border-radius: 20px; font-size: 12px; font-weight: 600; color: #4361ee; animation: lm-tag-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both; }

        /* Tabs */
        .lm-tab { flex: 1; padding: 12px 16px; border: 1.5px solid #e2e8f0; border-radius: 12px; background: #fff; color: #64748b; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: inherit; display: flex; align-items: center; justify-content: center; gap: 6; }
        .lm-tab:hover { border-color: #cbd5e1; }
        .lm-tab-active { border-color: #4361ee; background: linear-gradient(135deg, rgba(67, 97, 238, 0.04), rgba(124, 58, 237, 0.04)); color: #4361ee; }
        .lm-tab-badge { width: 18px; height: 18px; border-radius: 50%; background: #10b981; color: white; font-size: 10px; display: flex; align-items: center; justify-content: center; }

        /* Profile card */
        .lm-profile-card { padding: 20px; background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%); border: 1px solid rgba(67, 97, 238, 0.12); border-radius: 18px; margin-top: 20px; }
        .lm-stat { display: flex; align-items: center; gap: 5px; font-size: 12px; color: #64748b; font-weight: 500; }

        /* Message box */
        .lm-message-box { background: #fafbfc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; white-space: pre-wrap; font-size: 15px; line-height: 1.8; color: #334155; font-family: inherit; }
        .lm-cursor { animation: lm-blink 0.6s step-end infinite; color: #4361ee; font-weight: 300; }

        /* Quality check */
        .lm-check-visual { display: flex; gap: 8; flex-wrap: wrap; margin-top: 16; }
        .lm-check-item { display: flex; align-items: center; gap: 6; padding: 8px 14px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 10px; font-size: 12px; font-weight: 600; color: #065f46; animation: lm-check-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        .lm-check-icon { color: #10b981; font-weight: 800; }

        .lm-error { padding: 12px 16px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 12px; color: #dc2626; font-size: 14px; margin-bottom: 16px; }

        /* Action buttons */
        .lm-action-btn { padding: 14px 20px; border-radius: 14px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1); font-family: inherit; border: none; white-space: nowrap; }
        .lm-primary { flex: 1; background: linear-gradient(135deg, #4361ee, #7c3aed); color: white; }
        .lm-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(67, 97, 238, 0.3); }
        .lm-conn-btn { flex: 1; background: linear-gradient(135deg, #0ea5e9, #0284c7); color: white; }
        .lm-conn-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(14, 165, 233, 0.3); }
        .lm-copied { flex: 1; background: linear-gradient(135deg, #10b981, #059669); color: white; }
        .lm-secondary { background: #f1f5f9; color: #4361ee; border: 1.5px solid #e2e8f0; }
        .lm-secondary:hover { background: #eef2ff; border-color: #c7d2fe; }

        .lm-upsell { margin-top: 24px; padding: 24px; background: linear-gradient(135deg, rgba(67, 97, 238, 0.04), rgba(124, 58, 237, 0.06)); border: 1px solid rgba(67, 97, 238, 0.12); border-radius: 18px; display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
        .lm-demo-btn { padding: 12px 24px; background: linear-gradient(135deg, #4361ee, #7c3aed); color: white; border-radius: 12px; font-weight: 700; font-size: 14px; text-decoration: none; white-space: nowrap; transition: all 0.25s; flex-shrink: 0; }
        .lm-demo-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(67, 97, 238, 0.3); }

        /* Animations */
        @keyframes lm-spin { to { transform: rotate(360deg); } }
        @keyframes lm-blink { 50% { opacity: 0; } }
        @keyframes lm-pulse-icon { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.08); } }
        @keyframes lm-slide-up { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes lm-shimmer { 0% { background-position: 100% 0; } 100% { background-position: -100% 0; } }
        @keyframes lm-shimmer-load { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes lm-shine { 0% { transform: translateX(-100%); } 40%, 100% { transform: translateX(200%); } }
        @keyframes lm-float { 0%, 100% { transform: translate(0, 0); } 33% { transform: translate(30px, -30px); } 66% { transform: translate(-20px, 20px); } }
        @keyframes lm-gradient-shift { 0% { background-position: 0% center; } 50% { background-position: 100% center; } 100% { background-position: 0% center; } }
        @keyframes lm-sweep { 0% { left: -100%; } 100% { left: 200%; } }
        @keyframes lm-bar-sweep { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
        @keyframes lm-tag-pop { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
        @keyframes lm-check-pop { from { opacity: 0; transform: scale(0.8) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }

        @media (max-width: 640px) {
          .lm-upsell { flex-direction: column; text-align: center; }
          .lm-demo-btn { width: 100%; text-align: center; display: block; }
          .lm-action-btn { font-size: 13px; padding: 12px 16px; }
        }
      `}</style>
    </section>
  );
}
