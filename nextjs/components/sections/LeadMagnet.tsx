"use client";
import { useState, useEffect, useRef } from "react";

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

type ProcessStep = "idle" | "scraping" | "scraped" | "generating" | "typing" | "done";

const STEPS_CONFIG = [
  { key: "scraping", icon: "🔍", label: "LinkedIn profiel scannen...", doneLabel: "Profiel gevonden" },
  { key: "scraped",  icon: "📊", label: "Profieldata verwerken...", doneLabel: "Data geanalyseerd" },
  { key: "generating", icon: "🧠", label: "AI schrijft je bericht...", doneLabel: "Bericht gegenereerd" },
  { key: "typing",  icon: "✍️", label: "Bericht wordt geschreven...", doneLabel: "Klaar!" },
];

export default function LeadMagnet() {
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [email, setEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [tone, setTone] = useState<"informal" | "formal">("informal");
  const [fullMessage, setFullMessage] = useState("");
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [currentStep, setCurrentStep] = useState<ProcessStep>("idle");
  const [enriched, setEnriched] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const typewriterRef = useRef<NodeJS.Timeout | null>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  // Typewriter effect
  useEffect(() => {
    if (currentStep === "typing" && fullMessage) {
      let i = 0;
      setDisplayedMessage("");
      typewriterRef.current = setInterval(() => {
        i++;
        setDisplayedMessage(fullMessage.slice(0, i));
        if (i >= fullMessage.length) {
          clearInterval(typewriterRef.current!);
          setCurrentStep("done");
        }
      }, 18);
      return () => { if (typewriterRef.current) clearInterval(typewriterRef.current); };
    }
  }, [currentStep, fullMessage]);

  // Auto-scroll message into view
  useEffect(() => {
    if (displayedMessage && messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [displayedMessage]);

  const handleGenerate = async () => {
    setError("");
    setCurrentStep("scraping");

    try {
      // STEP 1: Scrape LinkedIn profile
      const scrapeRes = await fetch("/api/scrape-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ linkedinUrl }),
      });
      const scrapeData = await scrapeRes.json();

      if (!scrapeRes.ok) {
        setError(scrapeData.error || "Scraping mislukt.");
        setCurrentStep("idle");
        return;
      }

      setProfile(scrapeData.profile);
      setEnriched(scrapeData.enriched);
      setCurrentStep("scraped");

      // Brief pause to show scraped data
      await new Promise(r => setTimeout(r, 1200));
      setCurrentStep("generating");

      // STEP 2: Generate message with AI
      const genRes = await fetch("/api/generate-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, jobTitle, tone, profile: scrapeData.profile }),
      });
      const genData = await genRes.json();

      if (!genRes.ok) {
        setError(genData.error || "Generatie mislukt.");
        setCurrentStep("idle");
        return;
      }

      setFullMessage(genData.message);
      setCurrentStep("typing");
    } catch {
      setError("Er is een fout opgetreden. Probeer het opnieuw.");
      setCurrentStep("idle");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(fullMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReset = () => {
    setCurrentStep("idle");
    setFullMessage("");
    setDisplayedMessage("");
    setLinkedinUrl("");
    setJobTitle("");
    setError("");
    setEnriched(false);
    setProfile(null);
  };

  const getStepStatus = (stepKey: string) => {
    const order = ["scraping", "scraped", "generating", "typing", "done"];
    const currentIdx = order.indexOf(currentStep);
    const stepIdx = order.indexOf(stepKey);
    if (stepIdx < currentIdx) return "done";
    if (stepIdx === currentIdx) return "active";
    return "pending";
  };

  const isProcessing = ["scraping", "scraped", "generating", "typing"].includes(currentStep);
  const showResult = currentStep === "typing" || currentStep === "done";

  return (
    <section id="lead-magnet" style={{
      padding: "100px 24px",
      background: "linear-gradient(180deg, #f8fafc 0%, #eef2ff 50%, #f8fafc 100%)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background animated orbs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div className="lm-orb lm-orb-1" />
        <div className="lm-orb lm-orb-2" />
        <div className="lm-orb lm-orb-3" />
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(67, 97, 238, 0.08)",
            border: "1px solid rgba(67, 97, 238, 0.2)",
            borderRadius: 9999,
            padding: "8px 20px",
            marginBottom: 24,
            backdropFilter: "blur(8px)",
          }}>
            <span style={{ fontSize: 16 }}>✨</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#4361ee", letterSpacing: "0.5px", textTransform: "uppercase" }}>
              Gratis AI InMail Generator
            </span>
          </div>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 900,
            color: "#0f172a",
            marginBottom: 16,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}>
            Genereer een{" "}
            <span className="lm-gradient-text">gepersonaliseerd</span>
            <br />bericht in seconden
          </h2>
          <p style={{ fontSize: 17, color: "#64748b", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            Plak een LinkedIn URL — wij scrapen het profiel en genereren een bericht dat écht aankomt.
          </p>
        </div>

        {/* Main Card */}
        <div className="lm-card" style={{
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: 24,
          padding: "40px 36px",
          boxShadow: "0 8px 40px rgba(67, 97, 238, 0.08), 0 1px 3px rgba(0,0,0,0.04)",
          border: "1px solid rgba(67, 97, 238, 0.1)",
          backdropFilter: "blur(20px)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Shimmer border during processing */}
          {isProcessing && <div className="lm-shimmer-border" />}

          {currentStep === "idle" ? (
            /* ========== INPUT FORM ========== */
            <>
              {/* LinkedIn URL */}
              <div style={{ marginBottom: 22 }}>
                <label className="lm-label">LinkedIn profiel-URL *</label>
                <div className="lm-input-group">
                  <span className="lm-input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4361ee" strokeWidth="2" strokeLinecap="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                    </svg>
                  </span>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/jan-jansen"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="lm-input"
                  />
                </div>
                <p className="lm-hint">We scrapen automatisch naam, functie, ervaring en skills.</p>
              </div>

              {/* Job Title */}
              <div style={{ marginBottom: 22 }}>
                <label className="lm-label">Functie waarvoor je werft</label>
                <input
                  type="text"
                  placeholder="bijv. Senior Software Engineer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="lm-input lm-input-full"
                />
              </div>

              {/* Tone selector */}
              <div style={{ marginBottom: 24 }}>
                <label className="lm-label">Toon</label>
                <div style={{ display: "flex", gap: 12 }}>
                  {(["informal", "formal"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className={`lm-tone-btn ${tone === t ? "lm-tone-active" : ""}`}
                    >
                      {t === "informal" ? "😊 Informeel" : "👔 Formeel"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div style={{ marginBottom: 28 }}>
                <label className="lm-label">Jouw e-mailadres *</label>
                <input
                  type="email"
                  placeholder="naam@bedrijf.nl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="lm-input lm-input-full"
                />
                <p className="lm-hint">We gebruiken dit alleen om je bericht te verzenden. Geen spam.</p>
              </div>

              {/* Error */}
              {error && <div className="lm-error">{error}</div>}

              {/* Submit */}
              <button
                onClick={handleGenerate}
                disabled={!email || !linkedinUrl}
                className="lm-submit"
              >
                <span className="lm-submit-shine" />
                <span style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                  Genereer InMail bericht
                </span>
              </button>
            </>
          ) : (
            /* ========== PROCESSING + RESULT ========== */
            <>
              {/* Step Progress */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {STEPS_CONFIG.map((step, i) => {
                    const status = getStepStatus(step.key);
                    return (
                      <div key={step.key} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                        {/* Vertical line + dot */}
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 36, flexShrink: 0 }}>
                          <div className={`lm-step-dot ${status === "done" ? "lm-step-done" : status === "active" ? "lm-step-active" : "lm-step-pending"}`}>
                            {status === "done" ? (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                            ) : status === "active" ? (
                              <div className="lm-step-spinner" />
                            ) : (
                              <span style={{ fontSize: 12 }}>{step.icon}</span>
                            )}
                          </div>
                          {i < STEPS_CONFIG.length - 1 && (
                            <div style={{
                              width: 2,
                              height: 32,
                              background: status === "done" ? "linear-gradient(180deg, #10b981, #10b981)" : "rgba(203, 213, 225, 0.5)",
                              transition: "background 0.5s ease",
                            }} />
                          )}
                        </div>
                        {/* Label */}
                        <div style={{ paddingTop: 6, paddingBottom: i < STEPS_CONFIG.length - 1 ? 18 : 0 }}>
                          <p style={{
                            fontSize: 14,
                            fontWeight: status === "active" ? 700 : 500,
                            color: status === "done" ? "#10b981" : status === "active" ? "#0f172a" : "#94a3b8",
                            transition: "all 0.3s ease",
                            margin: 0,
                          }}>
                            {status === "done" ? `✓ ${step.doneLabel}` : status === "active" ? step.label : step.doneLabel}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Profile Card (shown after scraping) */}
              {profile && (currentStep !== "scraping") && (
                <div className="lm-profile-card" style={{
                  animation: "lm-slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    {/* Avatar */}
                    <div style={{
                      width: 52,
                      height: 52,
                      borderRadius: 16,
                      background: "linear-gradient(135deg, #4361ee, #7c3aed)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: 20,
                      fontWeight: 800,
                      flexShrink: 0,
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
                            fontSize: 10,
                            fontWeight: 700,
                            color: "#10b981",
                            background: "#ecfdf5",
                            padding: "2px 8px",
                            borderRadius: 6,
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}>
                            Verified
                          </span>
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

                  {/* Mini stats */}
                  {enriched && (profile.location || profile.jobHistory.length > 0) && (
                    <div style={{
                      display: "flex",
                      gap: 16,
                      marginTop: 14,
                      paddingTop: 14,
                      borderTop: "1px solid rgba(226, 232, 240, 0.8)",
                      flexWrap: "wrap",
                    }}>
                      {profile.location && (
                        <div className="lm-stat">
                          <span style={{ fontSize: 13 }}>📍</span>
                          <span>{profile.location}</span>
                        </div>
                      )}
                      {profile.jobHistory.length > 0 && (
                        <div className="lm-stat">
                          <span style={{ fontSize: 13 }}>💼</span>
                          <span>{profile.jobHistory.length} posities</span>
                        </div>
                      )}
                      {profile.skills.length > 0 && (
                        <div className="lm-stat">
                          <span style={{ fontSize: 13 }}>⚡</span>
                          <span>{profile.skills.length} skills</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Generated Message (typewriter) */}
              {showResult && (
                <div style={{
                  marginTop: 24,
                  animation: "lm-slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <span style={{ fontSize: 14 }}>💌</span>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#64748b", margin: 0, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      Jouw InMail bericht
                    </p>
                  </div>
                  <div
                    ref={messageRef}
                    className="lm-message-box"
                    style={{
                      maxHeight: 300,
                      overflowY: "auto",
                    }}
                  >
                    {displayedMessage}
                    {currentStep === "typing" && <span className="lm-cursor">|</span>}
                  </div>
                </div>
              )}

              {/* Actions (shown when done) */}
              {currentStep === "done" && (
                <div style={{
                  marginTop: 24,
                  animation: "lm-slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}>
                  {/* Confetti burst */}
                  <div className="lm-confetti-container">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div key={i} className="lm-confetti" style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 0.5}s`,
                        backgroundColor: ["#4361ee", "#7c3aed", "#10b981", "#f59e0b", "#ef4444"][i % 5],
                      }} />
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: 12 }}>
                    <button onClick={handleCopy} className={`lm-action-btn ${copied ? "lm-copied" : "lm-primary"}`}>
                      {copied ? "✓ Gekopieerd!" : "📋 Kopieer bericht"}
                    </button>
                    <button onClick={handleReset} className="lm-action-btn lm-secondary">
                      🔄 Nieuw
                    </button>
                  </div>

                  {/* Upsell CTA */}
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
                    <a href="/demo" className="lm-demo-btn">
                      Vraag demo aan →
                    </a>
                  </div>
                </div>
              )}

              {/* Error during processing */}
              {error && <div className="lm-error" style={{ marginTop: 16 }}>{error}</div>}
            </>
          )}
        </div>

        {/* Trust indicators */}
        <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 36, flexWrap: "wrap" }}>
          {[
            { icon: "🔒", label: "Veilig & privé" },
            { icon: "⚡", label: "Klaar in ~10 sec" },
            { icon: "🆓", label: "Gratis, geen account" },
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
        /* Gradient text */
        .lm-gradient-text {
          background: linear-gradient(135deg, #4361ee 0%, #7c3aed 50%, #4361ee 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: lm-gradient-shift 3s ease infinite;
        }

        /* Floating orbs */
        .lm-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.15;
        }
        .lm-orb-1 { width: 400px; height: 400px; background: #4361ee; top: -100px; right: -100px; animation: lm-float 20s ease-in-out infinite; }
        .lm-orb-2 { width: 300px; height: 300px; background: #7c3aed; bottom: -50px; left: -50px; animation: lm-float 15s ease-in-out infinite reverse; }
        .lm-orb-3 { width: 200px; height: 200px; background: #10b981; top: 50%; left: 50%; animation: lm-float 25s ease-in-out infinite; }

        /* Card */
        .lm-card { transition: box-shadow 0.4s ease, transform 0.4s ease; }
        .lm-card:hover { box-shadow: 0 12px 48px rgba(67, 97, 238, 0.12), 0 1px 3px rgba(0,0,0,0.04); }

        /* Shimmer border */
        .lm-shimmer-border {
          position: absolute;
          inset: -2px;
          border-radius: 26px;
          background: linear-gradient(90deg, transparent, #4361ee, #7c3aed, #10b981, transparent);
          background-size: 400% 100%;
          animation: lm-shimmer 2s linear infinite;
          z-index: -1;
        }

        /* Labels & inputs */
        .lm-label { display: block; font-size: 13px; font-weight: 700; color: #374151; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
        .lm-hint { font-size: 12px; color: #94a3b8; margin-top: 6px; }
        .lm-input-group { display: flex; align-items: center; background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 14px; overflow: hidden; transition: border-color 0.2s, box-shadow 0.2s; }
        .lm-input-group:focus-within { border-color: #4361ee; box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1); }
        .lm-input-icon { padding: 14px 14px; display: flex; align-items: center; border-right: 1px solid #e2e8f0; background: #f1f5f9; }
        .lm-input { flex: 1; padding: 14px 16px; border: none; outline: none; font-size: 15px; background: transparent; color: #0f172a; font-family: inherit; }
        .lm-input-full { width: 100%; padding: 14px 16px; border: 1.5px solid #e2e8f0; border-radius: 14px; font-size: 15px; outline: none; background: #f8fafc; color: #0f172a; box-sizing: border-box; font-family: inherit; transition: border-color 0.2s, box-shadow 0.2s; }
        .lm-input-full:focus { border-color: #4361ee; box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1); }

        /* Tone buttons */
        .lm-tone-btn { flex: 1; padding: 13px 20px; border-radius: 12px; border: 1.5px solid #e2e8f0; background: #fff; color: #64748b; font-weight: 600; font-size: 14px; cursor: pointer; transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1); font-family: inherit; }
        .lm-tone-btn:hover { border-color: #cbd5e1; background: #f8fafc; }
        .lm-tone-active { border-color: #4361ee !important; background: linear-gradient(135deg, rgba(67, 97, 238, 0.06), rgba(124, 58, 237, 0.06)) !important; color: #4361ee !important; box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.08); }

        /* Submit button */
        .lm-submit {
          width: 100%; padding: 18px 32px; background: linear-gradient(135deg, #4361ee, #7c3aed); color: white;
          border: none; border-radius: 16px; font-size: 16px; font-weight: 700; cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); font-family: inherit; position: relative; overflow: hidden;
        }
        .lm-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(67, 97, 238, 0.35); }
        .lm-submit:disabled { opacity: 0.4; cursor: not-allowed; }
        .lm-submit-shine { position: absolute; inset: 0; background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%); animation: lm-shine 3s infinite; }

        /* Step dots */
        .lm-step-dot { width: 32px; height: 32px; border-radius: 10px; display: flex; align-items: center; justify-content: center; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); flex-shrink: 0; }
        .lm-step-done { background: linear-gradient(135deg, #10b981, #059669); box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3); }
        .lm-step-active { background: linear-gradient(135deg, #4361ee, #7c3aed); box-shadow: 0 2px 12px rgba(67, 97, 238, 0.4); animation: lm-pulse 2s ease-in-out infinite; }
        .lm-step-pending { background: #f1f5f9; border: 1.5px solid #e2e8f0; }
        .lm-step-spinner { width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.3); border-top: 2px solid white; border-radius: 50%; animation: lm-spin 0.7s linear infinite; }

        /* Profile card */
        .lm-profile-card {
          padding: 20px; background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%);
          border: 1px solid rgba(67, 97, 238, 0.12); border-radius: 18px; margin-bottom: 4px;
        }
        .lm-stat { display: flex; align-items: center; gap: 5px; font-size: 12px; color: #64748b; font-weight: 500; }

        /* Message box */
        .lm-message-box {
          background: #fafbfc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px;
          white-space: pre-wrap; font-size: 15px; line-height: 1.8; color: #334155;
          font-family: inherit;
        }
        .lm-cursor { animation: lm-blink 0.6s step-end infinite; color: #4361ee; font-weight: 300; }

        /* Error */
        .lm-error { padding: 12px 16px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 12px; color: #dc2626; font-size: 14px; margin-bottom: 16px; }

        /* Action buttons */
        .lm-action-btn { padding: 14px 28px; border-radius: 14px; font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1); font-family: inherit; border: none; }
        .lm-primary { flex: 1; background: linear-gradient(135deg, #4361ee, #7c3aed); color: white; }
        .lm-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(67, 97, 238, 0.3); }
        .lm-copied { flex: 1; background: linear-gradient(135deg, #10b981, #059669); color: white; }
        .lm-secondary { background: #f1f5f9; color: #4361ee; border: 1.5px solid #e2e8f0; }
        .lm-secondary:hover { background: #eef2ff; border-color: #c7d2fe; }

        /* Upsell */
        .lm-upsell {
          margin-top: 24px; padding: 24px; background: linear-gradient(135deg, rgba(67, 97, 238, 0.04), rgba(124, 58, 237, 0.06));
          border: 1px solid rgba(67, 97, 238, 0.12); border-radius: 18px; display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap;
        }
        .lm-demo-btn {
          padding: 12px 24px; background: linear-gradient(135deg, #4361ee, #7c3aed); color: white;
          border-radius: 12px; font-weight: 700; font-size: 14px; text-decoration: none; white-space: nowrap;
          transition: all 0.25s; flex-shrink: 0;
        }
        .lm-demo-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(67, 97, 238, 0.3); }

        /* Confetti */
        .lm-confetti-container { position: relative; height: 0; overflow: visible; pointer-events: none; }
        .lm-confetti {
          position: absolute; width: 8px; height: 8px; border-radius: 2px; top: -20px;
          animation: lm-confetti-fall 1.5s cubic-bezier(0.36, 0, 0.66, -0.56) forwards;
          opacity: 0;
        }

        /* Animations */
        @keyframes lm-spin { to { transform: rotate(360deg); } }
        @keyframes lm-blink { 50% { opacity: 0; } }
        @keyframes lm-pulse { 0%, 100% { box-shadow: 0 2px 12px rgba(67, 97, 238, 0.4); } 50% { box-shadow: 0 2px 24px rgba(67, 97, 238, 0.6); } }
        @keyframes lm-slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes lm-shimmer { 0% { background-position: 100% 0; } 100% { background-position: -100% 0; } }
        @keyframes lm-shine { 0% { transform: translateX(-100%); } 40%, 100% { transform: translateX(200%); } }
        @keyframes lm-float { 0%, 100% { transform: translate(0, 0); } 33% { transform: translate(30px, -30px); } 66% { transform: translate(-20px, 20px); } }
        @keyframes lm-gradient-shift { 0% { background-position: 0% center; } 50% { background-position: 100% center; } 100% { background-position: 0% center; } }
        @keyframes lm-confetti-fall {
          0% { opacity: 1; transform: translateY(0) rotate(0deg) scale(1); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-120px) rotate(720deg) scale(0); }
        }

        @media (max-width: 640px) {
          .lm-upsell { flex-direction: column; text-align: center; }
          .lm-demo-btn { width: 100%; text-align: center; display: block; }
        }
      `}</style>
    </section>
  );
}
