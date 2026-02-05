# CLAUDE.md — FarmCast Build Context

## Project Overview

**FarmCast** is a proprietary predictive real estate farming platform being built for Stephanie Heifus, a real estate agent and long-time referral partner. The system scores homeowners within a target Missouri neighborhood on their probability of listing their property within the next 6–12 months.

This is NOT a SaaS product or commercial venture — it's a custom tool built as a gift for a trusted partner. Stephanie is the only user. There are no per-lead fees, no shared data, no subscriptions.

## Core Value Proposition

Traditional geographic farming treats every home equally. Agents send the same mailer to 500 homes when only 15–20 will realistically list in a year. FarmCast flips that by scoring every property and focusing outreach on the 25–30 highest-probability sellers.

**Key differentiators from Offrs/SmartZip/Remine:**
- Stephanie owns the system (not renting access)
- Transparent scoring (she sees WHY each property scored high)
- Exclusive to her market (no competing agents see this data)
- Hyper-local model trained on her specific farm area
- Feedback loop — her gut-checks improve the model

## Technical Architecture

### Stack
- **Frontend:** Next.js + React (TypeScript), Mapbox for map visualization
- **Backend:** Next.js API routes or Express
- **Database:** Supabase (PostgreSQL)
- **ML Model:** Python — XGBoost or LightGBM, served via FastAPI microservice
- **Data Pipeline:** Playwright scrapers + cron jobs
- **Enrichment APIs:** ATTOM, Melissa Data
- **Hosting:** Railway (backend), Vercel (frontend)
- **Email:** SendGrid (existing integration)

### Data Sources — Status

| Source | Status | Notes |
|--------|--------|-------|
| Heartland MLS (via REcolorado IntraMatrix) | HAVE | Agent access through existing REcolorado subscription |
| ATTOM Property API | HAVE | AVM, ownership, mortgage, demographics |
| Melissa Data | HAVE | Address verification, NCOA, enrichment |
| Missouri county deed records | HAVE (architecture) | Extend existing Playwright scrapers to MO counties |
| County assessor (tax) | PARTIAL | Jackson County online; survey others |
| Missouri voter registration | AVAILABLE | Free public records — age, tenure signal |
| Court records (Case.net) | NEED | Divorce/probate — new scraper required |
| Building permits | NEED | Municipal level — KC, Independence, Lee's Summit |

### Missouri Non-Disclosure State Considerations

Missouri does NOT record sale prices in public records. This affects equity calculations and training data. Workarounds:

1. **MLS via REcolorado → Heartland MLS IntraMatrix** — historical sold prices, listing data, DOM accessible through existing access
2. **ATTOM AVM estimates** — work in non-disclosure states, already integrated
3. **Mortgage-based inference** — recorded deed of trust amount at assumed 80% LTV gives approximate purchase price

## Scoring Model

### Algorithm
Gradient-boosted decision tree (XGBoost) — industry standard for structured tabular data. Handles missing values, runs fast, provides feature importance for transparency.

### Feature Tiers

**Tier 1 — Property & Mortgage (strongest signal):**
- Estimated LTV
- Time since origination (purchase)
- Time since last refinance
- ARM reset proximity
- Assessed value vs. estimated purchase price
- Tax delinquency
- Ownership type (individual vs. trust/LLC)

**Tier 2 — Life Events (high signal):**
- Divorce filings
- Probate / death records
- Pre-foreclosure (NOD/NED)
- Code violations
- Building permits (cosmetic)
- Bankruptcy filings
- Owner age / estate planning signals

**Tier 3 — Market Context:**
- Neighborhood listing velocity
- DOM trends
- Price appreciation rate (trailing 12mo)
- Comparable sales within 0.25mi
- School district rating changes

**Tier 4 — Behavioral (aspirational, Phase 4+):**
- Home valuation lookups (would need partnership)
- Homestead exemption changes
- NCOA address changes

### Score Output
- 0–100 probability score
- Top 3–5 contributing factors shown per property
- Bucketed into tiers: Hot (80–100), Warm (60–79), Watch (40–59), Cold (0–39)

### Training Data Construction
- Positive class: Properties that listed on MLS in past 3–5 years
- Negative class: Properties that did NOT list in same period
- Feature snapshot: Reconstruct features as they appeared 6–12 months BEFORE listing (prevents data leakage)

### Accuracy Targets
- Phase 1 (existing data): AUC > 0.70
- Phase 3 (with life events): AUC > 0.78
- Key metric: Precision at top — of 25 Hot properties, expect 8–10 to actually list within 12 months

## Development Phases

### Phase 1 — Foundation (Weeks 1–4)
- [ ] Set up Supabase schema for properties, features, scores
- [ ] Extend Playwright scrapers to Missouri counties (Jackson, Clay, Platte)
- [ ] Pull 3–5 years MLS history via REcolorado → Heartland MLS IntraMatrix
- [ ] Hydrate test farm (500 homes) with ATTOM property data
- [ ] Build feature engineering pipeline (Python)
- [ ] Train initial XGBoost model
- [ ] Retrospective validation against last 6mo listings
- [ ] Deliver scored CSV to Stephanie for gut-check

**Deliverable:** Scored list of 500 properties with probability scores and top feature drivers (CSV)

### Phase 2 — Dashboard (Weeks 5–8)
- [ ] Build Next.js dashboard shell
- [ ] Integrate Mapbox for farm visualization (heat-map coloring by score)
- [ ] Property detail cards with score breakdown, contributing factors, ownership history
- [ ] Filter/sort controls: by score tier, ownership duration, equity band, trigger events
- [ ] Export scored lists for mailer services (CSV with mailing address, owner name, score tier)
- [ ] SendGrid integration for digital outreach
- [ ] Score change alerts (notify when property jumps tiers)
- [ ] User testing with Stephanie

**Deliverable:** Functional web app for managing one farm area

### Phase 3 — Enhanced Signals (Weeks 9–12)
- [ ] Build Missouri Case.net court records scraper (divorce/probate)
- [ ] Build KC-area building permit scrapers
- [ ] Integrate Missouri voter file (age, tenure)
- [ ] Retrain model with expanded feature set — target AUC > 0.78
- [ ] Implement automated weekly scoring refresh

**Deliverable:** Materially improved model accuracy + automated refresh

### Phase 4 — Scale (Months 4–6)
- [ ] Multi-farm support
- [ ] User authentication (if needed)
- [ ] CRM integrations (Follow Up Boss, KVCore)
- [ ] Automated quarterly model retraining with outcome feedback

## Key Milestones

| Milestone | Target |
|-----------|--------|
| Pick test neighborhood with Stephanie | Week 0 |
| Scored CSV delivered for gut-check | Week 4 |
| Live dashboard with map + cards | Week 8 |
| Court records + permits integrated | Week 10 |
| Automated weekly refresh running | Week 12 |
| First outreach cycle results | Week 14 |

## Database Schema (Draft)

```sql
-- Properties table
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parcel_id TEXT UNIQUE,
  address TEXT NOT NULL,
  city TEXT,
  state TEXT DEFAULT 'MO',
  zip TEXT,
  county TEXT,
  latitude DECIMAL(10, 7),
  longitude DECIMAL(10, 7),
  
  -- Ownership
  owner_name TEXT,
  owner_type TEXT, -- individual, trust, llc
  ownership_start_date DATE,
  
  -- Property details
  property_type TEXT,
  bedrooms INT,
  bathrooms DECIMAL(3, 1),
  sqft INT,
  lot_sqft INT,
  year_built INT,
  
  -- Valuation
  assessed_value DECIMAL(12, 2),
  estimated_value DECIMAL(12, 2), -- AVM
  last_sale_price DECIMAL(12, 2),
  last_sale_date DATE,
  
  -- Mortgage
  mortgage_amount DECIMAL(12, 2),
  mortgage_date DATE,
  mortgage_type TEXT, -- conventional, FHA, VA, ARM
  estimated_ltv DECIMAL(5, 2),
  
  -- Metadata
  farm_id UUID REFERENCES farms(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Scores table
CREATE TABLE scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id),
  score DECIMAL(5, 2), -- 0-100
  tier TEXT, -- hot, warm, watch, cold
  top_factors JSONB, -- array of {factor, weight, value}
  model_version TEXT,
  scored_at TIMESTAMPTZ DEFAULT NOW()
);

-- Life events table
CREATE TABLE life_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id),
  event_type TEXT, -- divorce, probate, pre_foreclosure, permit, code_violation
  event_date DATE,
  source TEXT,
  raw_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Outreach tracking
CREATE TABLE outreach (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id),
  channel TEXT, -- mailer, email, door_knock, phone
  sent_at TIMESTAMPTZ,
  response TEXT,
  notes TEXT
);

-- Farms (target areas)
CREATE TABLE farms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  boundary JSONB, -- GeoJSON polygon
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## File Structure (Proposed)

```
farmcast/
├── apps/
│   ├── web/                    # Next.js frontend
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   └── lib/
│   │   └── package.json
│   └── api/                    # FastAPI ML service
│       ├── main.py
│       ├── model/
│       └── requirements.txt
├── packages/
│   ├── scrapers/               # Playwright scrapers
│   │   ├── missouri-deeds/
│   │   ├── casenet/
│   │   ├── permits/
│   │   └── heartland-mls/
│   └── ml/                     # Model training
│       ├── features.py
│       ├── train.py
│       └── evaluate.py
├── supabase/
│   └── migrations/
└── CLAUDE.md
```

## Important Context

- **Rich (me)** is building this — I'm an MLO at Blanchard/Rich Home Loans with experience in foreclosure intervention and distressed property investing. I already have scraping infrastructure (Dallas County tracker, Colorado DHO Pipeline, REcolorado scrapers), ATTOM/Melissa integrations, and Next.js/Supabase deployment experience.

- **Stephanie Heifus** is the end user — a real estate agent and long-time referral partner. She came up with the original idea over coffee. This is a gift, not a business transaction.

- **The one-pager is live** — there's a React-based executive summary page (FarmCast.jsx) that explains the concept to Stephanie. It has two tabs: "The Pitch" (clean exec summary) and "Project Plan" (Gantt chart, milestones, fun facts).

## Commands / Scripts (to be created)

```bash
# Scrape Missouri deeds
pnpm scrape:deeds --county=jackson

# Pull MLS data
pnpm scrape:mls --farm=test-farm-001

# Hydrate properties with ATTOM
pnpm enrich:attom --farm=test-farm-001

# Build feature vectors
pnpm features:build --farm=test-farm-001

# Train model
pnpm model:train --version=v1

# Score properties
pnpm model:score --farm=test-farm-001 --version=v1

# Export for Stephanie
pnpm export:csv --farm=test-farm-001 --output=stephanie-gut-check.csv
```

## Notes for Claude Code

- When building scrapers, use Playwright (not Puppeteer) — consistent with existing infrastructure
- Supabase is the database — use their JS client for frontend, direct PostgreSQL for Python scripts
- ATTOM API is already integrated in other projects — reuse existing patterns
- Melissa Data is for address verification and NCOA — not primary data source
- The model should output BOTH a score AND the top contributing factors (explainability matters for Stephanie's trust)
- Missouri is a non-disclosure state — always use MLS as primary price source, mortgage-based inference as fallback
- Heartland MLS data comes through REcolorado IntraMatrix — not a separate subscription
- Test farm should be ~500 homes with 30–50+ annual listings for sufficient training data
