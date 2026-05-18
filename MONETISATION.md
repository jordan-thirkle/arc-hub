# Monetisation Strategy — ARC Raiders Loadout Planner

## Current State (May 2026)

| Stream | Status | Est. Revenue | Blockers |
|---|---|---|---|
| Carbon Ads | Wired, disabled | $0 | Requires 1M impressions/month or ~10k pageviews. Not eligible at current traffic. |
| EthicalAds | Wired, disabled | $0 | Requires 50k+ monthly pageviews. Publisher approval needed. Cannot coexist with other ad networks per policy. |
| Gear Affiliate | 3 links with **NO** tracking | $0 | Links are plain URLs — no affiliate tags, no commission. Need program enrollment. |
| Ko-fi | Placeholder (`YOUR_KOFI`) | $0 | Takes 15 min to set up but yields nothing without traffic. |

**Core problem**: All 3 revenue streams require traffic. The app has none yet. This is a pre-revenue bootstrap phase.

## Traffic Reality

ARC Raiders has ~14M copies sold (Feb 2026), but a niche build planner is low-volume SEO:
- **Month 1** (now): ~100-500 visitors (Reddit/Discord/Steam guide mentions)
- **Month 3**: ~1k-3k/month (if SEO-optimised and linked from game communities)
- **Month 6**: ~5k-15k/month (requires sustained content/SEO)
- **Month 12**: ~20k-50k/month (optimistic — needs consistent effort)

**EthicalAds threshold of 50k/month is a Year 2+ target.**

## Roadmap

### Phase A — Foundation (Months 1-3, $0 revenue)

**1. Enable Vercel Analytics** — ✅ DONE (installed and deployed)
   - Free tier included with Vercel deployment
   - Provides traffic data required for ad network applications
   - No configuration needed — just deploy

**2. Fix affiliate links** (~30 min, $0 cost)
   - Sign up for SteelSeries (Impact Radius), Razer Affiliate, Secretlab affiliate
   - Append referral/affiliate tags to each URL
   - Expected: $0-5/month at current traffic — establishes the pipeline
   - Action needed: Create accounts, get tracking IDs

**3. Set up real Ko-fi account** (15 min, $0 cost)
   - Create page at ko-fi.com
   - Replace `YOUR_KOFI` placeholder in footer
   - Embed donation widget
   - Expected: $0-2/month — zero downside

**4. SEO foundation** (2-4 hours)
   - ✅ Sitemap via Vercel static output
   - ✅ JSON-LD structured data (WebApplication schema with feature list)
   - ✅ Proper OpenGraph/Twitter meta tags
   - **Missing**: Google Search Console submission
   - **Missing**: Weapon-specific guide pages for long-tail keywords
   - Target keyword: "arc raiders build planner" (very low competition)
   - Secondary keywords: "arc raiders best loadout", "arc raiders weapon stats"

**5. Domain setup** (May 20)
   - Custom domain unlocks brand credibility for ad network applications
   - Redirect vercel.app subdomain to custom domain via Vercel
   - Update all OG URLs, JSON-LD `url` field, and portfolio link

### Phase B — Growth (Months 3-6)

**6. Community distribution**
   - Post guide to r/ARC Raiders subreddit with planner link
   - Create Steam Community guide linking to the planner
   - YouTube short/walkthrough (2-min screen recording)
   - These are the highest-leverage traffic drivers for game tools

**7. Apply to ad networks**
   - Apply to Carbon Ads first (lower threshold per third-party reports)
   - Only apply to EthicalAds when hitting 50k+/month
   - Both are developer-friendly and accept game-related content

**8. Content pages for SEO**
   - Create static-page equivalents for popular searches:
     - `/best-kettle-loadout` → inline guide with embedded planner
     - `/weapon-stats` → printable stat table
   - Each page is a potential landing page from Google

### Phase C — Revenue (Month 6+)

**9. Enable ads**
   - Set `VITE_CARBON_SERVE` or `VITE_ETHICALADS_ID` in Vercel env vars
   - Flicker-free: AdUnit component already handles conditional rendering
   - At 50k pageviews/month: ~$125/month from EthicalAds ($2.50 CPM)
   - Note: Carbon Ads $2 max RPM means $100 at 50k views

**10. Supabase upgrade evaluation**
   - Free tier: 500 MB DB, 50k MAU, pauses after 1 week of inactivity
   - $25/mo Pro: never pauses, 8 GB disk, 100k MAU
   - Breakeven at ~10k pageviews/month from ad revenue
   - Decision point: upgrade when ad revenue > $25/month

### Phase D — Scaling (Month 12+)

**11. Premium features for Ko-fi donors**
   - Custom build badge ("Supporter") visible on community builds
   - Early access to new features before public release
   - Ad-free experience for Ko-fi supporters (set a cookie)

**12. Sponsored build slots**
   - Gaming peripheral brands paying for featured/pinned builds
   - Could be automated via the community build system
   - $50-200/month per sponsor slot

**13. Multiple ad placements**
   - Currently only 1 AdUnit slot active at a time (EthicalAds restriction)
   - If using Carbon Ads, could add sidebar + footer simultaneously
   - Carbon allows non-competing ads on same page

## Decision Points

| When | Decision | Criteria |
|---|---|---|
| May 20 | Buy domain, set up redirect | Fixed date |
| After domain setup | Apply to Carbon Ads | Even with low traffic, application starts relationship |
| After Vercel Analytics shows 5k+/month | Re-apply to Carbon Ads with data | Actual traffic data strengthens application |
| At 50k+ monthly | Switch to EthicalAds or dual-network | Higher CPM ($2.50 vs $1.50) but exclusivity clause |
| At $25+/month ad revenue | Evaluate Supabase Pro | Cost-neutral upgrade for reliability |

## Affiliate Program Details

| Program | Platform | Commission | Cookie Window | Notes |
|---|---|---|---|---|
| SteelSeries | Impact Radius | 5-8% | 30 days | Sign up at impact.com |
| Razer | Razer Affiliate | 3-5% | 30 days | Sign up at razer.com/affiliate |
| Secretlab | Secretlab Affiliate | 5-10% | 30 days | Sign up at secretlab.co/pages/affiliates |
| Amazon (fallback) | Amazon Associates | 1-3% | 24 hours | Lower rates but universal inventory |

**Recommendation**: Start with SteelSeries + Razer + Secretlab directly. Add Amazon Associates as a catch-all for general gaming gear recommendations.

## Key Metrics to Track

- Monthly unique visitors (Vercel Analytics)
- Monthly pageviews (Vercel Analytics)
- Ko-fi donations (Ko-fi dashboard)
- Affiliate link click-through rate (manual tracking via UTM)
- Ad network revenue (ad network dashboard)
- Build share count (estimate via URL generation frequency)

## Revenue Projections

| Month | Traffic | Affiliate | Ko-fi | Ads | Total |
|---|---|---|---|---|---|
| 1 | 200 | $0 | $0 | $0 | $0 |
| 3 | 2,000 | $2 | $1 | $0 | $3 |
| 6 | 10,000 | $10 | $5 | $0 | $15 |
| 9 | 30,000 | $30 | $15 | $75 | $120 |
| 12 | 50,000 | $50 | $25 | $125 | $200 |

These are optimistic estimates. Realistic revenue at 12 months is likely $50-100/month.

## Immediate Actions (This Session)

1. ✅ Vercel Analytics — deployed
2. ✅ Code splitting — initial bundle 730 KB → 344 KB (97 KB gzipped)
3. ✅ vercel.json — build config, security headers, SPA rewrites
4. ✅ SEO — JSON-LD + meta tags updated
5. ⬜ Set up coal affiliate accounts (SteelSeries, Razer, Secretlab)
6. ⬜ Create Ko-fi account + update URL
7. ⬜ Submit to Google Search Console
8. ⬜ Domain purchase + Vercel custom domain config (May 20)
