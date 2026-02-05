import { useEffect } from "react";

export default function FarmCastApp() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fills = entry.target.querySelectorAll('.score-bar-fill');
          fills.forEach((fill, i) => {
            setTimeout(() => {
              fill.style.width = fill.dataset.width + '%';
            }, i * 200);
          });
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.score-bar').forEach(el => barObserver.observe(el.closest('.fade-in') || el));

    return () => {
      observer.disconnect();
      barObserver.disconnect();
    };
  }, []);

  return (
    <>
      <style>{`
        :root {
          --navy: #1B2A4A;
          --teal: #2B8C96;
          --teal-light: #E8F4F6;
          --dark: #1a1a2e;
          --cream: #FAF9F7;
          --warm-gray: #6B7280;
          --border: #E5E7EB;
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
        body {
          font-family: 'DM Sans', -apple-system, sans-serif;
          color: var(--navy);
          background: var(--cream);
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }
        .fade-in {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .fade-in.d1 { transition-delay: 0.08s; }
        .fade-in.d2 { transition-delay: 0.16s; }
        .fade-in.d3 { transition-delay: 0.24s; }
        .fade-in.d4 { transition-delay: 0.32s; }
        .fade-in.d5 { transition-delay: 0.4s; }
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 60px 24px;
          position: relative;
          overflow: hidden;
          background: linear-gradient(160deg, var(--dark) 0%, var(--navy) 50%, var(--teal) 100%);
        }
        .hero-grid {
          position: absolute; inset: 0; opacity: 0.04;
          background-image: linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .hero-glow {
          position: absolute; top: 20%; left: 50%; transform: translate(-50%, -50%);
          width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(43,140,150,0.13), transparent 70%);
          pointer-events: none;
        }
        .hero-content { position: relative; z-index: 1; }
        .hero-tag {
          font-size: 13px; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--teal); margin-bottom: 24px; font-weight: 500;
          animation: fadeInUp 0.8s ease forwards;
        }
        .hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(48px, 8vw, 88px);
          font-weight: 900; color: #fff; line-height: 1.05;
          margin: 0 0 24px;
          animation: fadeInUp 0.8s ease 0.15s both;
        }
        .hero h1 span { color: var(--teal); }
        .hero-sub {
          font-size: clamp(18px, 2.5vw, 22px); color: rgba(255,255,255,0.65);
          max-width: 520px; margin: 0 auto 40px; line-height: 1.6; font-weight: 300;
          animation: fadeInUp 0.8s ease 0.3s both;
        }
        .hero-meta {
          font-size: 14px; color: rgba(255,255,255,0.4);
          animation: fadeInUp 0.8s ease 0.45s both;
        }
        .hero-arrow {
          position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);
          animation: bounce 2s ease infinite;
        }
        .hero-arrow svg { stroke: rgba(255,255,255,0.3); }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-8px); }
          60% { transform: translateX(-50%) translateY(-4px); }
        }
        .section { padding: 80px 24px; }
        .section.white-bg { background: #fff; }
        .section-inner { max-width: 720px; margin: 0 auto; }
        .section-tag {
          font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--teal); font-weight: 600; margin-bottom: 16px;
        }
        .section h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 700; color: var(--navy); line-height: 1.2;
          margin: 0 0 24px;
        }
        .section p.body {
          font-size: 17px; line-height: 1.75; color: var(--warm-gray); margin-bottom: 20px;
        }
        .section p.body:last-child { margin-bottom: 0; }
        .callout {
          background: linear-gradient(135deg, var(--navy), var(--teal));
          border-radius: 12px; padding: 28px 32px; color: #fff;
          margin-top: 32px;
        }
        .callout p { font-size: 15px; line-height: 1.7; font-weight: 300; margin: 0; }
        .callout strong { font-weight: 600; }
        .stats-bar {
          display: grid; grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
          max-width: 720px; margin: 0 auto;
          padding: 0 24px;
        }
        .stat { text-align: center; padding: 28px 16px; }
        .stat-num {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 5vw, 48px); font-weight: 700;
          color: var(--teal); line-height: 1;
        }
        .stat-label {
          font-size: 13px; color: var(--warm-gray); margin-top: 8px;
          letter-spacing: 0.05em; text-transform: uppercase;
        }
        .signal-row {
          display: flex; gap: 20px; padding: 20px 0;
          border-bottom: 1px solid #F3F4F6;
        }
        .signal-row:last-child { border-bottom: none; }
        .signal-icon { font-size: 28px; width: 48px; text-align: center; flex-shrink: 0; padding-top: 2px; }
        .signal-cat { font-weight: 600; font-size: 15px; color: var(--navy); margin-bottom: 4px; }
        .signal-desc { font-size: 14px; color: var(--warm-gray); line-height: 1.6; }
        .signal-note { font-size: 15px; line-height: 1.7; color: var(--warm-gray); margin-top: 32px; font-style: italic; }
        .score-bar { margin-bottom: 16px; }
        .score-bar-header { display: flex; justify-content: space-between; margin-bottom: 6px; }
        .score-bar-label { font-size: 14px; color: var(--warm-gray); font-weight: 500; }
        .score-bar-val { font-size: 14px; color: var(--navy); font-weight: 700; }
        .score-bar-track { height: 8px; border-radius: 4px; background: #E5E7EB; overflow: hidden; }
        .score-bar-fill {
          height: 100%; border-radius: 4px; width: 0%;
          transition: width 1.2s ease;
        }
        .tier-card {
          display: flex; gap: 16px; align-items: flex-start;
          padding: 16px 20px; margin-bottom: 8px; border-radius: 8px;
        }
        .tier-meta { min-width: 64px; }
        .tier-name { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
        .tier-range { font-size: 13px; color: var(--warm-gray); }
        .tier-action { font-size: 14px; color: var(--navy); line-height: 1.6; }
        .mo-card {
          padding: 20px 24px; border-radius: 10px;
          background: var(--cream); border: 1px solid var(--border);
          margin-bottom: 16px;
        }
        .white-bg .mo-card { background: #F9FAFB; }
        .mo-card-title { font-weight: 600; font-size: 15px; color: var(--navy); margin-bottom: 6px; }
        .mo-card-desc { font-size: 14px; line-height: 1.65; color: var(--warm-gray); }
        .day-row { display: flex; gap: 20px; margin-bottom: 28px; }
        .day-time {
          min-width: 80px; font-size: 12px; font-weight: 600;
          color: var(--teal); text-transform: uppercase; letter-spacing: 0.05em; padding-top: 3px;
        }
        .day-text {
          font-size: 15px; line-height: 1.7; color: var(--warm-gray);
          border-left: 2px solid var(--border); padding-left: 20px;
        }
        .timeline-item { display: flex; gap: 20px; margin-bottom: 24px; align-items: flex-start; }
        .timeline-num {
          width: 44px; height: 44px; border-radius: 50%; flex-shrink: 0;
          background: linear-gradient(135deg, var(--navy), var(--teal));
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-weight: 700; font-size: 16px;
          font-family: 'Playfair Display', serif;
        }
        .timeline-body { flex: 1; }
        .timeline-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
        .timeline-title { font-weight: 600; font-size: 16px; color: var(--navy); }
        .timeline-time { font-size: 12px; color: var(--teal); font-weight: 500; }
        .timeline-desc { font-size: 14px; line-height: 1.65; color: var(--warm-gray); }
        .role-item { display: flex; gap: 20px; margin-bottom: 28px; align-items: flex-start; }
        .role-num {
          font-family: 'Playfair Display', serif;
          font-size: 32px; font-weight: 700; color: var(--teal);
          opacity: 0.3; min-width: 48px; line-height: 1;
        }
        .role-title { font-weight: 600; font-size: 16px; color: var(--navy); margin-bottom: 4px; }
        .role-desc { font-size: 14px; line-height: 1.65; color: var(--warm-gray); }
        .footer-cta {
          padding: 100px 24px; text-align: center;
          background: linear-gradient(160deg, var(--dark) 0%, var(--navy) 50%, var(--teal) 100%);
        }
        .footer-cta h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 5vw, 44px);
          font-weight: 700; color: #fff; line-height: 1.2; margin: 0 0 24px;
        }
        .footer-cta p {
          font-size: 17px; color: rgba(255,255,255,0.6);
          max-width: 480px; margin: 0 auto; line-height: 1.7; font-weight: 300;
        }
        .footer-sig { font-size: 15px; color: rgba(255,255,255,0.35); margin-top: 40px; }
        .accuracy-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .accuracy-card {
          background: var(--cream); border-radius: 12px; padding: 24px 20px;
          text-align: center; border: 1px solid var(--border);
        }
        .accuracy-num { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 700; line-height: 1; }
        .accuracy-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--warm-gray); margin-top: 8px; font-weight: 600; }
        .accuracy-desc { font-size: 12px; color: var(--warm-gray); margin-top: 4px; line-height: 1.4; }
        @media (max-width: 600px) {
          .stats-bar { grid-template-columns: repeat(3, 1fr); gap: 0; }
          .stat { padding: 20px 8px; }
          .day-row { flex-direction: column; gap: 8px; }
          .day-time { min-width: auto; }
          .day-text { border-left: none; padding-left: 0; border-top: 2px solid var(--border); padding-top: 12px; }
          .signal-row { gap: 14px; }
          .signal-icon { width: 36px; font-size: 24px; }
          .tier-card { flex-direction: column; gap: 8px; }
          .tier-meta { min-width: auto; display: flex; gap: 12px; align-items: baseline; }
          .timeline-header { flex-direction: column; gap: 2px; }
          .accuracy-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <section className="hero">
        <div className="hero-grid"></div>
        <div className="hero-glow"></div>
        <div className="hero-content">
          <div className="hero-tag">Proprietary Farming System</div>
          <h1>Farm<span>Cast</span></h1>
          <p className="hero-sub">Know which homeowners are most likely to sell — before they call another agent.</p>
          <div className="hero-meta">Built for Stephanie Heifus · Missouri Market · February 2026</div>
        </div>
        <div className="hero-arrow">
          <svg width="24" height="24" fill="none" strokeWidth="2" strokeLinecap="round">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </section>

      <section className="section" style={{paddingTop: '100px'}}>
        <div className="section-inner">
          <div className="fade-in">
            <div className="section-tag">The Idea</div>
            <h2>Stop farming blind.</h2>
          </div>
          <div className="fade-in d1">
            <p className="body">Traditional geographic farming treats every home the same. You send identical mailers to 500 homes when only 15–20 are realistically going to list this year. That's a lot of wasted postage and zero personalization.</p>
          </div>
          <div className="fade-in d2">
            <p className="body">FarmCast scores every property in your farm on its probability of listing in the next 6–12 months. Instead of 500 identical touches, you make 25 meaningful ones.</p>
          </div>
          <div className="fade-in d3">
            <div className="callout">
              <p>This isn't a lead service you're renting. No per-lead fees, no shared data with competing agents, no black-box scoring. <strong>You own the system, the data stays yours, and no other agent in your market has access to the same intelligence.</strong></p>
            </div>
          </div>
        </div>
      </section>

      <section style={{padding: '40px 24px 80px'}}>
        <div className="stats-bar">
          <div className="stat fade-in"><div className="stat-num">500</div><div className="stat-label">Homes Scored</div></div>
          <div className="stat fade-in d1"><div className="stat-num">25</div><div className="stat-label">High-Value Targets</div></div>
          <div className="stat fade-in d2"><div className="stat-num">6–12</div><div className="stat-label">Month Forecast</div></div>
        </div>
      </section>

      <section className="section white-bg">
        <div className="section-inner">
          <div className="fade-in">
            <div className="section-tag">How It Works</div>
            <h2>Stacked signals, one score.</h2>
            <p className="body" style={{marginBottom: '48px'}}>No single data point predicts a sale. But layer mortgage timing, life events, property activity, and neighborhood momentum together — and patterns emerge.</p>
          </div>
          <div className="signal-row fade-in d1">
            <div className="signal-icon">🏦</div>
            <div><div className="signal-cat">Mortgage & Equity</div><div className="signal-desc">Loan amount, estimated value (AVM), time since purchase, ARM resets</div></div>
          </div>
          <div className="signal-row fade-in d2">
            <div className="signal-icon">⚡</div>
            <div><div className="signal-cat">Life Events</div><div className="signal-desc">Divorce filings, probate, pre-foreclosure, bankruptcy</div></div>
          </div>
          <div className="signal-row fade-in d3">
            <div className="signal-icon">🏠</div>
            <div><div className="signal-cat">Property Signals</div><div className="signal-desc">Building permits, code violations, tax delinquency</div></div>
          </div>
          <div className="signal-row fade-in d4">
            <div className="signal-icon">📍</div>
            <div><div className="signal-cat">Neighborhood</div><div className="signal-desc">Recent nearby sales, DOM trends, listing velocity</div></div>
          </div>
          <div className="signal-row fade-in d5" style={{borderBottom: 'none'}}>
            <div className="signal-icon">👤</div>
            <div><div className="signal-cat">Demographics</div><div className="signal-desc">Owner age, household composition, length of residence</div></div>
          </div>
          <div className="fade-in d5">
            <p className="signal-note">Every scored property shows the top contributing factors — so you know exactly why it's hot and can craft your outreach around it.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="fade-in">
            <div className="section-tag">Score Tiers</div>
            <h2>Every home gets a playbook.</h2>
          </div>
          <div className="fade-in d1" style={{marginBottom: '40px'}}>
            <div className="score-bar">
              <div className="score-bar-header"><span className="score-bar-label">Hot — 1247 Elm St</span><span className="score-bar-val">92</span></div>
              <div className="score-bar-track"><div className="score-bar-fill" data-width="92" style={{background: '#DC2626'}}></div></div>
            </div>
            <div className="score-bar">
              <div className="score-bar-header"><span className="score-bar-label">Warm — 834 Oak Dr</span><span className="score-bar-val">71</span></div>
              <div className="score-bar-track"><div className="score-bar-fill" data-width="71" style={{background: '#F59E0B'}}></div></div>
            </div>
            <div className="score-bar">
              <div className="score-bar-header"><span className="score-bar-label">Watch — 2201 Pine Ave</span><span className="score-bar-val">48</span></div>
              <div className="score-bar-track"><div className="score-bar-fill" data-width="48" style={{background: '#2B8C96'}}></div></div>
            </div>
            <div className="score-bar">
              <div className="score-bar-header"><span className="score-bar-label">Cold — 560 Maple Ct</span><span className="score-bar-val">22</span></div>
              <div className="score-bar-track"><div className="score-bar-fill" data-width="22" style={{background: '#D1D5DB'}}></div></div>
            </div>
          </div>
          <div className="tier-card fade-in d2" style={{background: '#FEF2F2', borderLeft: '4px solid #DC2626'}}>
            <div className="tier-meta"><div className="tier-name" style={{color: '#DC2626'}}>Hot</div><div className="tier-range">80–100</div></div>
            <div className="tier-action">Door knock, handwritten note, personal call. Highest-value targets.</div>
          </div>
          <div className="tier-card fade-in d3" style={{background: '#FFFBEB', borderLeft: '4px solid #F59E0B'}}>
            <div className="tier-meta"><div className="tier-name" style={{color: '#F59E0B'}}>Warm</div><div className="tier-range">60–79</div></div>
            <div className="tier-action">Targeted digital ads + personalized mailer with CMA offer.</div>
          </div>
          <div className="tier-card fade-in d4" style={{background: '#E8F4F6', borderLeft: '4px solid #2B8C96'}}>
            <div className="tier-meta"><div className="tier-name" style={{color: '#2B8C96'}}>Watch</div><div className="tier-range">40–59</div></div>
            <div className="tier-action">Standard farm mailers. Monitor for weekly score changes.</div>
          </div>
          <div className="tier-card fade-in d5" style={{background: '#F9FAFB', borderLeft: '4px solid #9CA3AF'}}>
            <div className="tier-meta"><div className="tier-name" style={{color: '#9CA3AF'}}>Cold</div><div className="tier-range">0–39</div></div>
            <div className="tier-action">Branding only. Minimal spend.</div>
          </div>
        </div>
      </section>

      <section className="section white-bg">
        <div className="section-inner">
          <div className="fade-in">
            <div className="section-tag">The Honest Answer</div>
            <h2>How accurate is this?</h2>
            <p className="body">We won't know exact numbers until the model is trained on real Missouri data. But here's what's realistic based on how these models perform in practice — and how we'll validate before investing further.</p>
          </div>
          <div className="fade-in d1" style={{margin: '40px 0'}}>
            <div className="accuracy-grid">
              <div className="accuracy-card">
                <div className="accuracy-num" style={{color: '#F59E0B'}}>70%</div>
                <div className="accuracy-label">Phase 1 Target</div>
                <div className="accuracy-desc">Mortgage & equity<br/>data only</div>
              </div>
              <div className="accuracy-card">
                <div className="accuracy-num" style={{color: '#2B8C96'}}>80%</div>
                <div className="accuracy-label">Phase 3 Target</div>
                <div className="accuracy-desc">+ life events<br/>& permits</div>
              </div>
              <div className="accuracy-card">
                <div className="accuracy-num" style={{color: '#DC2626'}}>8–10</div>
                <div className="accuracy-label">Out of 25 Hot</div>
                <div className="accuracy-desc">expected to list<br/>within 12 months</div>
              </div>
            </div>
          </div>
          <div className="fade-in d2">
            <p className="body">Those percentages measure how well the model ranks properties — a score of 70% means it correctly identifies a future seller over a non-seller about 7 out of 10 times. The commercial platforms (Offrs, SmartZip) claim similar ranges, and they're working with broader, less targeted data than what we'll have.</p>
          </div>
          <div className="fade-in d3">
            <div className="callout">
              <p><strong>The number that actually matters for you</strong> isn't a model statistic — it's this: of the 25 homes FarmCast flags as Hot, how many actually list within a year? If 8–10 do, that's a dramatically better hit rate than mailing 500 homes and hoping. That's the metric we optimize for and the one you'll feel in your business.</p>
            </div>
          </div>
          <div className="fade-in d4" style={{marginTop: '32px'}}>
            <div style={{fontWeight: 600, fontSize: '15px', color: '#1B2A4A', marginBottom: '8px'}}>How we prove it before going further</div>
            <p className="body" style={{marginBottom: 0}}>Before building the dashboard, we run a retrospective validation — score every current property in the test farm, then check against actual listings from the past 6 months. If the model would have predicted last year's listings accurately, we move to Phase 2. If not, we iterate on the data and features first. No wasted investment.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="fade-in">
            <div className="section-tag">Missouri Market</div>
            <h2>Non-disclosure? Handled.</h2>
            <p className="body" style={{marginBottom: '32px'}}>Missouri doesn't record sale prices in public records. That matters — but it's solved.</p>
          </div>
          <div className="fade-in d1">
            <div className="mo-card">
              <div className="mo-card-title">REcolorado → Heartland MLS</div>
              <div className="mo-card-desc">Our existing REcolorado access includes IntraMatrix data sharing with Heartland MLS (KCRAR), covering 50 counties across KS/MO. Historical sold prices, listing data, DOM — all accessible. No new subscriptions.</div>
            </div>
          </div>
          <div className="fade-in d2">
            <div className="mo-card">
              <div className="mo-card-title">ATTOM AVM Estimates</div>
              <div className="mo-card-desc">Automated valuations still work in non-disclosure states. We already have this integration active — current estimated values at no additional cost.</div>
            </div>
          </div>
          <div className="fade-in d3">
            <div className="mo-card">
              <div className="mo-card-title">Mortgage-Based Inference</div>
              <div className="mo-card-desc">Deeds of trust are public. A recorded $320K mortgage at 80% LTV implies ~$400K purchase price. Not perfect, but directionally strong.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section white-bg">
        <div className="section-inner">
          <div className="fade-in">
            <div className="section-tag">In Practice</div>
            <h2>A week with FarmCast.</h2>
          </div>
          <div style={{marginTop: '40px'}}>
            <div className="day-row fade-in d1">
              <div className="day-time">Monday AM</div>
              <div className="day-text">Open the dashboard. Your farm — 500 homes color-coded by score. Eight properties flagged Hot. Three jumped from Warm this week after a neighbor sale and a divorce filing hit court records.</div>
            </div>
            <div className="day-row fade-in d2">
              <div className="day-time">Outreach</div>
              <div className="day-text">Pull the Hot list. Each card shows the score, top drivers, and owner info. Write three handwritten notes. Trigger five personalized CMA emails.</div>
            </div>
            <div className="day-row fade-in d3">
              <div className="day-time">Warm Tier</div>
              <div className="day-text">22 properties in Warm. Export to your mailer service. Targeted postcard with neighborhood stats. Cost: $15 instead of $250 for the whole farm.</div>
            </div>
            <div className="day-row fade-in d4">
              <div className="day-time">Week / Week</div>
              <div className="day-text">Watch scores shift. A property that's been Watch for months jumps to Warm after a cosmetic permit is filed. Add it to your follow-up list.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="fade-in">
            <div className="section-tag">Roadmap</div>
            <h2>From concept to live in 12 weeks.</h2>
          </div>
          <div style={{marginTop: '40px'}}>
            <div className="timeline-item fade-in d1">
              <div className="timeline-num">1</div>
              <div className="timeline-body">
                <div className="timeline-header"><div className="timeline-title">Foundation</div><div className="timeline-time">Weeks 1–4</div></div>
                <div className="timeline-desc">Database, MLS data ingestion via REcolorado → Heartland MLS, county scrapers, feature engineering, first trained model → scored CSV of 500 properties.</div>
              </div>
            </div>
            <div className="timeline-item fade-in d2">
              <div className="timeline-num">2</div>
              <div className="timeline-body">
                <div className="timeline-header"><div className="timeline-title">Dashboard</div><div className="timeline-time">Weeks 5–8</div></div>
                <div className="timeline-desc">Map-based web app, property detail cards, score breakdowns, mailer export, email outreach integration.</div>
              </div>
            </div>
            <div className="timeline-item fade-in d3">
              <div className="timeline-num">3</div>
              <div className="timeline-body">
                <div className="timeline-header"><div className="timeline-title">Enhanced Signals</div><div className="timeline-time">Weeks 9–12</div></div>
                <div className="timeline-desc">Court records scraper (Case.net), building permits, voter file integration, model retrain, automated weekly refresh.</div>
              </div>
            </div>
            <div className="timeline-item fade-in d4">
              <div className="timeline-num">4</div>
              <div className="timeline-body">
                <div className="timeline-header"><div className="timeline-title">Scale</div><div className="timeline-time">Months 4–6</div></div>
                <div className="timeline-desc">Multi-farm support, CRM integrations, automated retraining pipeline.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section white-bg">
        <div className="section-inner">
          <div className="fade-in">
            <div className="section-tag">Your Role</div>
            <h2>I build it. You sharpen it.</h2>
            <p className="body" style={{marginBottom: '40px'}}>The technical build is on me. Your market knowledge is what turns a good model into a great one.</p>
          </div>
          <div className="role-item fade-in d1">
            <div className="role-num">01</div>
            <div><div className="role-title">Pick the test neighborhood</div><div className="role-desc">400–600 homes with decent listing volume. Somewhere you know well enough to gut-check the model's output.</div></div>
          </div>
          <div className="role-item fade-in d2">
            <div className="role-num">02</div>
            <div><div className="role-title">Gut-check the scores</div><div className="role-desc">When the first scored list drops — does the Hot list match your intuition? That feedback is how the model improves.</div></div>
          </div>
          <div className="role-item fade-in d3">
            <div className="role-num">03</div>
            <div><div className="role-title">Test the outreach</div><div className="role-desc">Run the playbook on one cycle of Hot/Warm properties. We measure conversion against your traditional farming numbers.</div></div>
          </div>
          <div className="role-item fade-in d4">
            <div className="role-num">04</div>
            <div><div className="role-title">Share local intel</div><div className="role-desc">Court records, permit patterns, HOA drama, neighborhood dynamics — signals only someone on the ground can catch.</div></div>
          </div>
        </div>
      </section>

      <section className="footer-cta">
        <div className="fade-in">
          <h2>Let's pick the neighborhood.</h2>
          <p>Scored property list in your hands within 3–4 weeks of locking down the farm area.</p>
          <div className="footer-sig">— Rich</div>
        </div>
      </section>
    </>
  );
}
