import { useState, useEffect, useRef } from "react";

const NAVY = "#1B2A4A";
const TEAL = "#2B8C96";
const TEAL_LIGHT = "#E8F4F6";
const DARK = "#1a1a2e";
const CREAM = "#FAF9F7";
const WARM_GRAY = "#6B7280";

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

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: NAVY, background: CREAM, overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

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

      {/* === SIGNALS === */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
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

      {/* === MISSOURI === */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
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
      <section style={{ padding: "80px 24px" }}>
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
      <section style={{ padding: "80px 24px", background: "#fff" }}>
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
      <section style={{ padding: "80px 24px" }}>
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
