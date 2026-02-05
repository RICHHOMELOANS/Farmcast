import { useState, useEffect, useRef } from "react";

const NAVY = "#1B2A4A";
const TEAL = "#2B8C96";
const TEAL_LIGHT = "#E8F4F6";
const DARK = "#1a1a2e";
const CREAM = "#FAF9F7";
const WARM_GRAY = "#6B7280";
const DARK_GRAY = "#333333";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function ScoreBar({ score, label, color, delay = 0 }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: WARM_GRAY, fontWeight: 500 }}>{label}</span>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: NAVY, fontWeight: 700 }}>{score}</span>
      </div>
      <div style={{ height: 8, borderRadius: 4, background: "#E5E7EB", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            borderRadius: 4,
            background: color,
            width: visible ? `${score}%` : "0%",
            transition: `width 1.2s ease ${delay}s`,
          }}
        />
      </div>
    </div>
  );
}

function StatCard({ number, label, delay = 0 }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      style={{
        textAlign: "center",
        padding: "28px 16px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `all 0.6s ease ${delay}s`,
      }}
    >
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 700, color: TEAL, lineHeight: 1 }}>{number}</div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: WARM_GRAY, marginTop: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>{label}</div>
    </div>
  );
}

const tierData = [
  { score: "80–100", tier: "Hot", color: "#DC2626", bg: "#FEF2F2", action: "Door knock, handwritten note, personal call. Highest-value targets." },
  { score: "60–79", tier: "Warm", color: "#F59E0B", bg: "#FFFBEB", action: "Targeted digital ads + personalized mailer with CMA offer." },
  { score: "40–59", tier: "Watch", color: TEAL, bg: TEAL_LIGHT, action: "Standard farm mailers. Monitor for weekly score changes." },
  { score: "0–39", tier: "Cold", color: "#9CA3AF", bg: "#F9FAFB", action: "Branding only. Minimal spend." },
];

const signalData = [
  { cat: "Mortgage & Equity", signals: "Loan amount, estimated value (AVM), time since purchase, ARM resets", icon: "🏦" },
  { cat: "Life Events", signals: "Divorce filings, probate, pre-foreclosure, bankruptcy", icon: "⚡" },
  { cat: "Property Signals", signals: "Building permits, code violations, tax delinquency", icon: "🏠" },
  { cat: "Neighborhood", signals: "Recent nearby sales, DOM trends, listing velocity", icon: "📍" },
  { cat: "Demographics", signals: "Owner age, household composition, length of residence", icon: "👤" },
];

const timelineData = [
  { phase: "1", title: "Foundation", time: "Weeks 1–4", desc: "Database, MLS data ingestion, county scrapers, feature engineering, first trained model → scored CSV of 500 properties." },
  { phase: "2", title: "Dashboard", time: "Weeks 5–8", desc: "Map-based web app, property detail cards, score breakdowns, mailer export, email outreach integration." },
  { phase: "3", title: "Enhanced Signals", time: "Weeks 9–12", desc: "Court records scraper, building permits, voter file integration, model retrain, automated weekly refresh." },
  { phase: "4", title: "Scale", time: "Months 4–6", desc: "Multi-farm support, CRM integrations, automated retraining pipeline." },
];

export default function FarmCastApp() {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState("pitch");

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: NAVY, background: CREAM, overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* === STICKY TAB NAV === */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrollY > 100 ? "rgba(27, 42, 74, 0.95)" : "transparent",
        backdropFilter: scrollY > 100 ? "blur(12px)" : "none",
        transition: "all 0.3s ease",
        padding: "12px 24px",
        display: "flex", justifyContent: "center", gap: 8,
      }}>
        {[
          { id: "pitch", label: "The Pitch" },
          { id: "project", label: "Project Plan" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            style={{
              padding: "8px 20px", borderRadius: 20, border: "none", cursor: "pointer",
              fontSize: 13, fontWeight: 600, letterSpacing: "0.02em",
              background: activeTab === tab.id
                ? (scrollY > 100 ? TEAL : "rgba(255,255,255,0.2)")
                : "transparent",
              color: activeTab === tab.id
                ? "#fff"
                : (scrollY > 100 ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.4)"),
              transition: "all 0.2s ease",
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {activeTab === "pitch" && (
        <>
      {/* === HERO === */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "60px 24px",
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(160deg, ${DARK} 0%, ${NAVY} 50%, ${TEAL} 100%)`,
      }}>
        {/* Subtle grid */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: `linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
        {/* Glow */}
        <div style={{
          position: "absolute", top: "20%", left: "50%", transform: "translate(-50%, -50%)",
          width: 600, height: 600, borderRadius: "50%",
          background: `radial-gradient(circle, ${TEAL}22, transparent 70%)`,
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase",
            color: TEAL, marginBottom: 24, fontWeight: 500,
            opacity: 1,
            animation: "fadeInUp 0.8s ease forwards",
          }}>
            Proprietary Farming System
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontSize: "clamp(48px, 8vw, 88px)", fontWeight: 900,
            color: "#fff", lineHeight: 1.05, margin: "0 0 24px",
            animation: "fadeInUp 0.8s ease 0.15s both",
          }}>
            Farm<span style={{ color: TEAL }}>Cast</span>
          </h1>
          <p style={{
            fontSize: "clamp(18px, 2.5vw, 22px)", color: "rgba(255,255,255,0.65)", maxWidth: 520, margin: "0 auto 40px",
            lineHeight: 1.6, fontWeight: 300,
            animation: "fadeInUp 0.8s ease 0.3s both",
          }}>
            Know which homeowners are most likely to sell — before they call another agent.
          </p>
          <div style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.4)",
            animation: "fadeInUp 0.8s ease 0.45s both",
          }}>
            Built for Stephanie Heifus &nbsp;·&nbsp; Missouri Market &nbsp;·&nbsp; February 2026
          </div>
        </div>

        <div style={{
          position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
          animation: "bounce 2s ease infinite",
        }}>
          <svg width="24" height="24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* === THE IDEA === */}
      <section style={{ padding: "100px 24px", maxWidth: 720, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: TEAL, fontWeight: 600, marginBottom: 16 }}>The Idea</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: NAVY, lineHeight: 1.2, margin: "0 0 24px" }}>
            Stop farming blind.
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: WARM_GRAY, marginBottom: 20 }}>
            Traditional geographic farming treats every home the same. You send identical mailers to 500 homes when only 15–20 are realistically going to list this year. That's a lot of wasted postage and zero personalization.
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: WARM_GRAY, marginBottom: 32 }}>
            FarmCast scores every property in your farm on its probability of listing in the next 6–12 months. Instead of 500 identical touches, you make 25 meaningful ones.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div style={{
            background: `linear-gradient(135deg, ${NAVY}, ${TEAL})`,
            borderRadius: 12, padding: "28px 32px", color: "#fff",
          }}>
            <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0, fontWeight: 300 }}>
              This isn't a lead service you're renting. No per-lead fees, no shared data with competing agents, no black-box scoring. <strong style={{ fontWeight: 600 }}>You own the system, the data stays yours, and no other agent in your market has access to the same intelligence.</strong>
            </p>
          </div>
        </FadeIn>
      </section>

      {/* === STATS === */}
      <section style={{ padding: "40px 24px 80px", maxWidth: 720, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: `1px solid #E5E7EB`, borderBottom: `1px solid #E5E7EB` }}>
          <StatCard number="500" label="Homes Scored" delay={0} />
          <StatCard number="25" label="High-Value Targets" delay={0.1} />
          <StatCard number="6–12" label="Month Forecast" delay={0.2} />
        </div>
      </section>

      {/* === COMPARISON === */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: TEAL, fontWeight: 600, marginBottom: 16 }}>Why This Is Different</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: NAVY, lineHeight: 1.2, margin: "0 0 24px" }}>
              You've seen these tools before.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.75, color: WARM_GRAY, marginBottom: 40 }}>
              Remine, Offrs, SmartZip — they all promise seller predictions. Here's what they actually deliver versus what FarmCast does differently.
            </p>
          </FadeIn>

          {/* Competitor cards */}
          <FadeIn delay={0.1}>
            <div style={{
              background: "#FEF2F2", borderRadius: 12, padding: 24, marginBottom: 16,
              borderLeft: "4px solid #EF4444",
            }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: "#DC2626", marginBottom: 8 }}>Offrs / SmartZip</div>
              <div style={{ fontSize: 14, color: WARM_GRAY, lineHeight: 1.7 }}>
                Lead-purchase model — you're buying leads at $20–50+ each from a shared pool. Other agents in your area buy the same leads. Scoring is a black box: you can't see why a property ranked high. National model, not tuned to your market. You're renting access, not owning anything.
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div style={{
              background: "#FEF3C7", borderRadius: 12, padding: 24, marginBottom: 16,
              borderLeft: "4px solid #F59E0B",
            }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: "#D97706", marginBottom: 8 }}>Remine</div>
              <div style={{ fontSize: 14, color: WARM_GRAY, lineHeight: 1.7 }}>
                Property data browser with MLS integration. Shows ownership, mortgage info, some propensity indicators. But it's passive — you're still manually hunting through properties hoping to spot patterns. No predictive scoring, no ranked targeting list. A research tool, not a targeting engine.
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div style={{
              background: `linear-gradient(135deg, ${TEAL_LIGHT}, #D1FAE5)`, borderRadius: 12, padding: 24, marginBottom: 32,
              borderLeft: `4px solid ${TEAL}`,
            }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: TEAL, marginBottom: 8 }}>FarmCast</div>
              <div style={{ fontSize: 14, color: NAVY, lineHeight: 1.7 }}>
                <strong>Your system, your data, your market.</strong> Predictive scoring trained specifically on your farm area. No per-lead fees, ever. No shared data with competing agents — you're the only one who sees this intelligence. Transparent scoring: you see exactly why each property ranked high. When you tell me "this one's wrong," we tune the model. Try doing that with Offrs.
              </div>
            </div>
          </FadeIn>

          {/* Comparison table */}
          <FadeIn delay={0.25}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, minWidth: 500 }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${NAVY}` }}>
                    <th style={{ textAlign: "left", padding: "12px 8px", fontWeight: 600, color: NAVY }}></th>
                    <th style={{ textAlign: "center", padding: "12px 8px", fontWeight: 600, color: "#DC2626" }}>Offrs</th>
                    <th style={{ textAlign: "center", padding: "12px 8px", fontWeight: 600, color: "#D97706" }}>Remine</th>
                    <th style={{ textAlign: "center", padding: "12px 8px", fontWeight: 600, color: TEAL }}>FarmCast</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Predictive scoring", "Yes (black box)", "No", "Yes (transparent)"],
                    ["Per-lead fees", "$20–50+", "N/A", "None"],
                    ["Shared with competitors", "Yes", "N/A", "No — exclusive"],
                    ["See scoring factors", "No", "No", "Yes"],
                    ["Tuned to your market", "No (national)", "No", "Yes"],
                    ["You own the system", "No (subscription)", "No", "Yes"],
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #E5E7EB", background: i % 2 === 1 ? "#FAFAFA" : "transparent" }}>
                      <td style={{ padding: "12px 8px", color: WARM_GRAY }}>{row[0]}</td>
                      <td style={{ textAlign: "center", padding: "12px 8px", color: row[1].includes("No") || row[1].includes("N/A") ? "#9CA3AF" : DARK_GRAY }}>{row[1]}</td>
                      <td style={{ textAlign: "center", padding: "12px 8px", color: "#9CA3AF" }}>{row[2]}</td>
                      <td style={{ textAlign: "center", padding: "12px 8px", color: TEAL, fontWeight: 600 }}>{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* === SIGNALS === */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: TEAL, fontWeight: 600, marginBottom: 16 }}>How It Works</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: NAVY, lineHeight: 1.2, margin: "0 0 12px" }}>
              Stacked signals, one score.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: WARM_GRAY, marginBottom: 48 }}>
              No single data point predicts a sale. But layer mortgage timing, life events, property activity, and neighborhood momentum together — and patterns emerge.
            </p>
          </FadeIn>

          {signalData.map((s, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{
                display: "flex", gap: 20, padding: "20px 0",
                borderBottom: i < signalData.length - 1 ? "1px solid #F3F4F6" : "none",
              }}>
                <div style={{ fontSize: 28, width: 48, textAlign: "center", flexShrink: 0, paddingTop: 2 }}>{s.icon}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15, color: NAVY, marginBottom: 4 }}>{s.cat}</div>
                  <div style={{ fontSize: 14, color: WARM_GRAY, lineHeight: 1.6 }}>{s.signals}</div>
                </div>
              </div>
            </FadeIn>
          ))}

          <FadeIn delay={0.4}>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: WARM_GRAY, marginTop: 32, fontStyle: "italic" }}>
              Every scored property shows the top contributing factors — so you know exactly why it's hot and can craft your outreach message around it.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* === SCORE TIERS === */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: TEAL, fontWeight: 600, marginBottom: 16 }}>Score Tiers</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: NAVY, lineHeight: 1.2, margin: "0 0 40px" }}>
              Every home gets a playbook.
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{ marginBottom: 40 }}>
              <ScoreBar score={92} label="Hot — 1247 Elm St" color="#DC2626" delay={0.3} />
              <ScoreBar score={71} label="Warm — 834 Oak Dr" color="#F59E0B" delay={0.5} />
              <ScoreBar score={48} label="Watch — 2201 Pine Ave" color={TEAL} delay={0.7} />
              <ScoreBar score={22} label="Cold — 560 Maple Ct" color="#D1D5DB" delay={0.9} />
            </div>
          </FadeIn>

          {tierData.map((t, i) => (
            <FadeIn key={i} delay={0.1 + i * 0.08}>
              <div style={{
                display: "flex", gap: 16, alignItems: "flex-start",
                padding: "16px 20px", marginBottom: 8,
                borderRadius: 8, background: t.bg, borderLeft: `4px solid ${t.color}`,
              }}>
                <div style={{ minWidth: 64 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: t.color, textTransform: "uppercase", letterSpacing: "0.05em" }}>{t.tier}</div>
                  <div style={{ fontSize: 13, color: WARM_GRAY }}>{t.score}</div>
                </div>
                <div style={{ fontSize: 14, color: NAVY, lineHeight: 1.6 }}>{t.action}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* === ACCURACY === */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: TEAL, fontWeight: 600, marginBottom: 16 }}>The Honest Answer</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: NAVY, lineHeight: 1.2, margin: "0 0 24px" }}>
              How accurate is this?
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.75, color: WARM_GRAY, marginBottom: 40 }}>
              We won't know exact numbers until the model is trained on real Missouri data. But here's what's realistic based on how these models perform — and how we'll validate before investing further.
            </p>
          </FadeIn>

          {/* Accuracy gauge cards */}
          <FadeIn delay={0.1}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }}>
              <div style={{ background: CREAM, borderRadius: 12, padding: "24px 20px", textAlign: "center", border: "1px solid #E5E7EB" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: "#F59E0B", lineHeight: 1 }}>70%</div>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: WARM_GRAY, marginTop: 8, fontWeight: 600 }}>Phase 1 Target</div>
                <div style={{ fontSize: 12, color: WARM_GRAY, marginTop: 4, lineHeight: 1.4 }}>Mortgage & equity<br/>data only</div>
              </div>
              <div style={{ background: CREAM, borderRadius: 12, padding: "24px 20px", textAlign: "center", border: "1px solid #E5E7EB" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: TEAL, lineHeight: 1 }}>80%</div>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: WARM_GRAY, marginTop: 8, fontWeight: 600 }}>Phase 3 Target</div>
                <div style={{ fontSize: 12, color: WARM_GRAY, marginTop: 4, lineHeight: 1.4 }}>+ life events<br/>& permits</div>
              </div>
              <div style={{ background: CREAM, borderRadius: 12, padding: "24px 20px", textAlign: "center", border: "1px solid #E5E7EB" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: "#DC2626", lineHeight: 1 }}>8–10</div>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: WARM_GRAY, marginTop: 8, fontWeight: 600 }}>Out of 25 Hot</div>
                <div style={{ fontSize: 12, color: WARM_GRAY, marginTop: 4, lineHeight: 1.4 }}>expected to list<br/>within 12 months</div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p style={{ fontSize: 17, lineHeight: 1.75, color: WARM_GRAY, marginBottom: 24 }}>
              Those percentages measure how well the model ranks properties — a score of 70% means it correctly identifies a future seller over a non-seller about 7 out of 10 times. The commercial platforms (Offrs, SmartZip) claim similar ranges with broader, less targeted data.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div style={{
              background: `linear-gradient(135deg, ${NAVY}, ${TEAL})`,
              borderRadius: 12, padding: "28px 32px", color: "#fff", marginBottom: 32,
            }}>
              <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0, fontWeight: 300 }}>
                <strong style={{ fontWeight: 600 }}>The number that actually matters</strong> isn't a model statistic — it's this: of the 25 homes FarmCast flags as Hot, how many actually list within a year? If 8–10 do, that's a dramatically better hit rate than mailing 500 homes and hoping. That's the metric we optimize for.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div style={{ fontWeight: 600, fontSize: 15, color: NAVY, marginBottom: 8 }}>How we prove it before going further</div>
            <p style={{ fontSize: 17, lineHeight: 1.75, color: WARM_GRAY, margin: 0 }}>
              Before building the dashboard, we run a retrospective validation — score every current property in the test farm, then check against actual listings from the past 6 months. If the model would have predicted last year's listings accurately, we move to Phase 2. If not, we iterate on the data and features first. No wasted investment.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* === MISSOURI === */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: TEAL, fontWeight: 600, marginBottom: 16 }}>Missouri Market</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: NAVY, lineHeight: 1.2, margin: "0 0 24px" }}>
              Non-disclosure? Handled.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.75, color: WARM_GRAY, marginBottom: 32 }}>
              Missouri doesn't record sale prices in public records. That matters — but it's solved. Here's how:
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
              {[
                { title: "REcolorado → Heartland MLS", desc: "Our existing REcolorado access includes IntraMatrix data sharing with Heartland MLS (KCRAR), covering 50 counties across KS/MO. Historical sold prices, listing data, DOM — all accessible. No new subscriptions." },
                { title: "ATTOM AVM Estimates", desc: "Automated valuations still work in non-disclosure states. We already have this integration active — current estimated values at no additional cost." },
                { title: "Mortgage-Based Inference", desc: "Deeds of trust are public. A recorded $320K mortgage at 80% LTV implies ~$400K purchase price. Not perfect, but directionally strong." },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: "20px 24px", borderRadius: 10,
                  background: CREAM, border: "1px solid #E5E7EB",
                }}>
                  <div style={{ fontWeight: 600, fontSize: 15, color: NAVY, marginBottom: 6 }}>{item.title}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.65, color: WARM_GRAY }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* === DAY IN THE LIFE === */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: TEAL, fontWeight: 600, marginBottom: 16 }}>In Practice</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: NAVY, lineHeight: 1.2, margin: "0 0 40px" }}>
              A week with FarmCast.
            </h2>
          </FadeIn>

          {[
            { time: "Monday AM", text: "Open the dashboard. Your farm — 500 homes color-coded by score. Eight properties flagged Hot. Three jumped from Warm this week after a neighbor sale and a divorce filing hit court records." },
            { time: "Outreach", text: "Pull the Hot list. Each card shows the score, top drivers, and owner info. Write three handwritten notes. Trigger five personalized CMA emails." },
            { time: "Warm tier", text: "22 properties in Warm. Export to your mailer service. Targeted postcard with neighborhood stats. Cost: $15 instead of $250 for the whole farm." },
            { time: "Week over week", text: "Watch scores shift. A property that's been Watch for months jumps to Warm after a cosmetic permit is filed. Add it to your follow-up list." },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ display: "flex", gap: 20, marginBottom: 28 }}>
                <div style={{
                  minWidth: 80, fontFamily: "'DM Sans', sans-serif", fontSize: 12,
                  fontWeight: 600, color: TEAL, textTransform: "uppercase", letterSpacing: "0.05em", paddingTop: 3,
                }}>
                  {item.time}
                </div>
                <div style={{ fontSize: 15, lineHeight: 1.7, color: WARM_GRAY, borderLeft: `2px solid #E5E7EB`, paddingLeft: 20 }}>
                  {item.text}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* === TIMELINE === */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: TEAL, fontWeight: 600, marginBottom: 16 }}>Roadmap</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: NAVY, lineHeight: 1.2, margin: "0 0 40px" }}>
              From concept to live in 12 weeks.
            </h2>
          </FadeIn>

          {timelineData.map((t, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                display: "flex", gap: 20, marginBottom: 24, alignItems: "flex-start",
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
                  background: `linear-gradient(135deg, ${NAVY}, ${TEAL})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontWeight: 700, fontSize: 16,
                  fontFamily: "'Playfair Display', serif",
                }}>
                  {t.phase}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                    <div style={{ fontWeight: 600, fontSize: 16, color: NAVY }}>{t.title}</div>
                    <div style={{ fontSize: 12, color: TEAL, fontWeight: 500 }}>{t.time}</div>
                  </div>
                  <div style={{ fontSize: 14, lineHeight: 1.65, color: WARM_GRAY }}>{t.desc}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* === YOUR ROLE === */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: TEAL, fontWeight: 600, marginBottom: 16 }}>Your Role</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: NAVY, lineHeight: 1.2, margin: "0 0 24px" }}>
              I build it. You sharpen it.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.75, color: WARM_GRAY, marginBottom: 40 }}>
              The technical build is on me. Your market knowledge is what turns a good model into a great one.
            </p>
          </FadeIn>

          {[
            { num: "01", title: "Pick the test neighborhood", desc: "400–600 homes with decent listing volume. Somewhere you know well enough to gut-check the model's output." },
            { num: "02", title: "Gut-check the scores", desc: "When the first scored list drops — does the Hot list match your intuition? That feedback is how the model improves." },
            { num: "03", title: "Test the outreach", desc: "Run the playbook on one cycle of Hot/Warm properties. We measure conversion against your traditional farming numbers." },
            { num: "04", title: "Share local intel", desc: "Court records, permit patterns, HOA drama, neighborhood dynamics — signals only someone on the ground can catch." },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                display: "flex", gap: 20, marginBottom: 28, alignItems: "flex-start",
              }}>
                <div style={{
                  fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700,
                  color: TEAL, opacity: 0.3, minWidth: 48, lineHeight: 1,
                }}>
                  {item.num}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16, color: NAVY, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.65, color: WARM_GRAY }}>{item.desc}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* === CLOSING === */}
      <section style={{
        padding: "100px 24px",
        background: `linear-gradient(160deg, ${DARK} 0%, ${NAVY} 50%, ${TEAL} 100%)`,
        textAlign: "center",
      }}>
        <FadeIn>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 5vw, 44px)",
            fontWeight: 700, color: "#fff", lineHeight: 1.2, margin: "0 0 24px",
          }}>
            Let's pick the neighborhood.
          </h2>
          <p style={{
            fontSize: 17, color: "rgba(255,255,255,0.6)", maxWidth: 480, margin: "0 auto 12px", lineHeight: 1.7, fontWeight: 300,
          }}>
            Scored property list in your hands within 3–4 weeks of locking down the farm area.
          </p>
          <p style={{
            fontSize: 15, color: "rgba(255,255,255,0.35)", marginTop: 40,
          }}>
            — Rich
          </p>
        </FadeIn>
      </section>
        </>
      )}

      {activeTab === "project" && (
        <>
      {/* === PROJECT TAB HERO === */}
      <section style={{
        minHeight: "40vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "100px 24px 60px",
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(160deg, ${DARK} 0%, ${NAVY} 50%, ${TEAL} 100%)`,
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: `linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 6vw, 56px)", fontWeight: 900,
            color: "#fff", lineHeight: 1.1, margin: "0 0 16px",
          }}>
            Project Plan
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", maxWidth: 500, margin: "0 auto" }}>
            Gantt charts, milestones, and some fun facts to put it all in perspective.
          </p>
        </div>
      </section>

      {/* === PROJECT TRACKER === */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: TEAL, fontWeight: 600, marginBottom: 16 }}>Project Tracker</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: NAVY, lineHeight: 1.2, margin: "0 0 24px" }}>
              The build at a glance.
            </h2>
          </FadeIn>

          {/* Gantt Chart */}
          <FadeIn delay={0.1}>
            <div style={{ marginBottom: 48, overflowX: "auto" }}>
              <div style={{ minWidth: 600 }}>
                {/* Week headers */}
                <div style={{ display: "flex", marginBottom: 8, paddingLeft: 180 }}>
                  {[1,2,3,4,5,6,7,8,9,10,11,12].map(w => (
                    <div key={w} style={{
                      width: 40, textAlign: "center", fontSize: 11, fontWeight: 600,
                      color: WARM_GRAY, flexShrink: 0
                    }}>W{w}</div>
                  ))}
                </div>

                {/* Gantt rows */}
                {[
                  { label: "Phase 1: Foundation", isPhase: true },
                  { label: "Database & Scrapers", start: 1, duration: 2, color: TEAL },
                  { label: "MLS + ATTOM Data", start: 2, duration: 1, color: TEAL },
                  { label: "Feature Engineering", start: 3, duration: 1, color: TEAL },
                  { label: "Train Model", start: 3, duration: 2, color: "#F59E0B" },
                  { label: "Validation", start: 4, duration: 1, color: "#10B981" },
                  { label: "Phase 2: Dashboard", isPhase: true },
                  { label: "UI Shell + Map", start: 5, duration: 1, color: TEAL },
                  { label: "Property Cards", start: 6, duration: 1, color: TEAL },
                  { label: "Export + Email", start: 7, duration: 1, color: TEAL },
                  { label: "User Testing", start: 8, duration: 1, color: "#10B981" },
                  { label: "Phase 3: Enhanced", isPhase: true },
                  { label: "Court Scrapers", start: 9, duration: 2, color: TEAL },
                  { label: "Voter File", start: 10, duration: 1, color: TEAL },
                  { label: "Retrain + Automate", start: 11, duration: 2, color: "#F59E0B" },
                ].map((row, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", marginBottom: 4,
                    background: row.isPhase ? NAVY : i % 2 === 0 ? "#F9FAFB" : "transparent",
                    borderRadius: 4, padding: row.isPhase ? "8px 0" : "4px 0",
                  }}>
                    <div style={{
                      width: 180, paddingLeft: 12, fontSize: 12, fontWeight: row.isPhase ? 700 : 500,
                      color: row.isPhase ? "#fff" : DARK_GRAY, flexShrink: 0,
                    }}>{row.label}</div>
                    <div style={{ display: "flex", flex: 1 }}>
                      {[1,2,3,4,5,6,7,8,9,10,11,12].map(w => (
                        <div key={w} style={{
                          width: 40, height: row.isPhase ? 8 : 20, flexShrink: 0,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          {!row.isPhase && w >= row.start && w < row.start + row.duration && (
                            <div style={{
                              width: "100%", height: 14, borderRadius: 3,
                              background: row.color,
                              marginLeft: w === row.start ? 4 : 0,
                              marginRight: w === row.start + row.duration - 1 ? 4 : 0,
                              borderTopLeftRadius: w === row.start ? 7 : 0,
                              borderBottomLeftRadius: w === row.start ? 7 : 0,
                              borderTopRightRadius: w === row.start + row.duration - 1 ? 7 : 0,
                              borderBottomRightRadius: w === row.start + row.duration - 1 ? 7 : 0,
                            }} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Legend */}
                <div style={{ display: "flex", gap: 24, marginTop: 16, paddingLeft: 180, fontSize: 11, color: WARM_GRAY }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 12, height: 12, borderRadius: 3, background: TEAL }} />
                    <span>Build</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 12, height: 12, borderRadius: 3, background: "#F59E0B" }} />
                    <span>Train/Iterate</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 12, height: 12, borderRadius: 3, background: "#10B981" }} />
                    <span>Validate</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Todo List */}
          <FadeIn delay={0.2}>
            <div style={{ fontWeight: 600, fontSize: 15, color: NAVY, marginBottom: 16 }}>Key Milestones</div>
            <div style={{ display: "grid", gap: 8 }}>
              {[
                { task: "Pick test neighborhood with Stephanie", week: "Week 0", status: "pending", critical: true },
                { task: "Scored CSV delivered for gut-check", week: "Week 4", status: "pending", critical: true },
                { task: "Live dashboard with map + cards", week: "Week 8", status: "pending", critical: false },
                { task: "Court records + permits integrated", week: "Week 10", status: "pending", critical: false },
                { task: "Automated weekly refresh running", week: "Week 12", status: "pending", critical: true },
                { task: "First outreach cycle results", week: "Week 14", status: "pending", critical: true },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "12px 16px", borderRadius: 8,
                  background: item.critical ? `linear-gradient(90deg, ${TEAL}11, transparent)` : "#F9FAFB",
                  borderLeft: item.critical ? `3px solid ${TEAL}` : "3px solid #E5E7EB",
                }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                    border: `2px solid ${item.critical ? TEAL : "#D1D5DB"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {item.status === "done" && (
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: TEAL }} />
                    )}
                  </div>
                  <div style={{ flex: 1, fontSize: 14, color: DARK_GRAY }}>{item.task}</div>
                  <div style={{
                    fontSize: 11, fontWeight: 600, color: item.critical ? TEAL : WARM_GRAY,
                    textTransform: "uppercase", letterSpacing: "0.05em",
                  }}>{item.week}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* === FUN FACTS === */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: TEAL, fontWeight: 600, marginBottom: 16 }}>For Perspective</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: NAVY, lineHeight: 1.2, margin: "0 0 24px" }}>
              While we're building this...
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
              {[
                { value: "186,282", unit: "mi/sec", label: "Speed of light", sub: "How fast your leads disappear to competitors" },
                { value: "13.8", unit: "billion yrs", label: "Age of the universe", sub: "Time it feels like waiting for a cold lead to convert" },
                { value: "500", unit: "homes", label: "Typical farm size", sub: "Only 25 will actually list this year" },
                { value: "12", unit: "weeks", label: "Time to MVP", sub: "That's 0.0000000003% of the universe's age" },
                { value: "8-10", unit: "listings", label: "Expected Hot conversions", sub: "Out of 25 flagged — vs. hoping 500 mailers work" },
                { value: "∞", unit: "", label: "ROI potential", sub: "When you're the only agent with this intel" },
              ].map((stat, i) => (
                <div key={i} style={{
                  padding: 20, borderRadius: 12,
                  background: i % 2 === 0 ? "#fff" : CREAM,
                  border: "1px solid #E5E7EB",
                }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                    <span style={{
                      fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700,
                      color: TEAL, lineHeight: 1
                    }}>{stat.value}</span>
                    <span style={{ fontSize: 12, color: WARM_GRAY, fontWeight: 500 }}>{stat.unit}</span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: NAVY, marginBottom: 4 }}>{stat.label}</div>
                  <div style={{ fontSize: 12, color: WARM_GRAY, lineHeight: 1.4 }}>{stat.sub}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* === PROJECT TAB CLOSING === */}
      <section style={{
        padding: "80px 24px",
        background: `linear-gradient(160deg, ${DARK} 0%, ${NAVY} 50%, ${TEAL} 100%)`,
        textAlign: "center",
      }}>
        <FadeIn>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 4vw, 36px)",
            fontWeight: 700, color: "#fff", lineHeight: 1.2, margin: "0 0 16px",
          }}>
            Ready to see the pitch?
          </h2>
          <button
            onClick={() => { setActiveTab("pitch"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            style={{
              padding: "14px 32px", borderRadius: 30, border: "2px solid rgba(255,255,255,0.3)",
              background: "transparent", color: "#fff", fontSize: 14, fontWeight: 600,
              cursor: "pointer", transition: "all 0.2s ease",
            }}
            onMouseOver={e => { e.target.style.background = "rgba(255,255,255,0.1)"; e.target.style.borderColor = "rgba(255,255,255,0.5)"; }}
            onMouseOut={e => { e.target.style.background = "transparent"; e.target.style.borderColor = "rgba(255,255,255,0.3)"; }}
          >
            ← Back to The Pitch
          </button>
        </FadeIn>
      </section>
        </>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-8px); }
          60% { transform: translateX(-50%) translateY(-4px); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}
