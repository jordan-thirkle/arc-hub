# ARC Raiders Loadout Planner — Master Plan

## Current State (May 2026)

The app is **functionally complete but not production-ready**. All features exist (weapon planner, skill tree, crafting, meta builds, comparison, share URLs) but multiple critical issues block real user adoption.

### Critical Issues

| Issue | Severity | Impact |
|---|---|---|
| 19/22 weapons have 0 for 6 key stats (recoil, ADS, reload, velocity, dispersion) | **HIGH** | Stats page, stat bars, and weapon comparison show incomplete data. Users get a broken experience. |
| No tests | **HIGH** | Cannot refactor or add features confidently. Every change risks regression. |
| No CI/CD | **HIGH** | No automated verification. Broken code can ship. |
| No error monitoring | **MEDIUM** | Silent failures in production. Cannot debug user issues. |
| No custom domain | **MEDIUM** | Hurts credibility, SEO, and ad network approval. |
| Supabase env vars not set | **MEDIUM** | Community builds + voting disabled. |
| Ad networks not applied to | **MEDIUM** | Zero revenue; carbon/ethical ads both disabled. |
| No SEO content | **MEDIUM** | No organic search traffic from weapon-specific queries. |
| No Google Search Console | **LOW** | Can't track or improve search performance. |
| Ko-fi placeholder | **LOW** | Donation link points to generic URL. |
| Affiliate links lack tracking | **LOW** | No commission on any gear referral. |

---

## Phase 0 — Data Quality (Week 1)

**Goal**: Fix the incomplete weapon stats so the core feature works correctly.

| Task | Est. Time | Details |
|---|---|---|
| 0.1 Run fetch-weapons.mjs against live MetaForge API | 15 min | `node scripts/fetch-weapons.mjs` — check if API now returns stat_block data for all weapons |
| 0.2 Verify each weapon has non-zero stats for all fields | 30 min | Run `verify-weapons.mjs`, inspect output |
| 0.3 For weapons still missing stats, hand-author from game data | 2-4 hrs | Cross-reference with RaidTheory/arcraiders-data and arcdata.mahcks.com for recoil, ADS, reload, velocity, dispersion |
| 0.4 Normalize all weapons to same data quality | 1 hr | Ensure no weapon has all-zero stat rows (Dolabra needs real data or better handling) |
| 0.5 Add verify-weapons script to npm as `npm run verify:weapons` | 5 min | `"verify:weapons": "node scripts/verify-weapons.mjs"` in package.json |

**Exit criteria**: `npm run verify:weapons` shows zero weapons with incomplete stat blocks.

---

## Phase 1 — Quality Foundation (Week 1-2)

**Goal**: Establish testing, CI/CD, and error monitoring so the app can be safely maintained.

| Task | Est. Time | Details |
|---|---|---|
| 1.1 Add unit tests for stat calculation | 2 hrs | Test `calculateStats()` in `src/utils/stats.ts` — verify attachment effects, tier scaling, edge cases (Dolabra, no attachments) |
| 1.2 Add unit tests for build URL encoding/decoding | 1 hr | Test `buildUrl.ts` — encode a build, decode it, verify round-trip |
| 1.3 Add unit tests for skill allocation logic | 1 hr | Test `src/utils/skills.ts` — prerequisite validation, max point limits, recommended allocation |
| 1.4 Add unit tests for weapon filtering/sorting | 1 hr | Test `src/utils/filters.ts` — role filter, sort by rating/votes, edge cases |
| 1.5 Add component smoke tests | 2 hrs | Render each major component (WeaponSelector, ShieldSelect, etc.) and verify no crash |
| 1.6 Set up Vitest | 30 min | Add vitest dependency, configure in vite.config.ts, alias `npm run test` |
| 1.7 Add GitHub Actions CI | 1 hr | `.github/workflows/ci.yml` — run `npm run lint && npm run test && npm run build` on PR/push to main |
| 1.8 Add Sentry error monitoring | 1 hr | `npm install @sentry/react`; init in `main.tsx` with `VITE_SENTRY_DSN` env var; capture unhandled errors + React error boundaries |
| 1.9 Set up pre-commit hook | 30 min | Run lint + typecheck before commit via husky or simple git hook |
| 1.10 Add loading/error states for community builds | 1 hr | Wrap Supabase calls in try-catch, show loading skeleton, show error toast on failure |

**Exit criteria**: `npm run test` passes with 20+ tests; GitHub Actions runs lint+test+build on every push; Sentry captures production errors.

---

## Phase 2 — Deployment & Domain (Week 2)

**Goal**: Professional deployment with custom domain, proper HTTPS, and verified ownership.

| Task | Est. Time | Details |
|---|---|---|
| 2.1 Purchase custom domain | Done (May 20) | Use the domain purchased for the portfolio or a dedicated domain for the planner |
| 2.2 Add custom domain in Vercel project settings | 15 min | Vercel Dashboard → arc-raiders-loadout-planner → Domains → add domain |
| 2.3 Update DNS records | 15 min | Point custom domain CNAME to `cname.vercel-dns.com` |
| 2.4 Update all hardcoded URLs | 30 min | Update `public/sitemap.xml`, `public/og-image.svg`, OG meta tags in `App.tsx` Helmet, JSON-LD in `index.html` |
| 2.5 Update portfolio project entry liveUrl | 5 min | `arc-raiders-build-planner.mdx` → change `liveUrl` to use custom domain |
| 2.6 Submit to Google Search Console | 15 min | Add domain property, verify via DNS TXT record, submit sitemap |
| 2.7 Add Vercel Analytics dashboard bookmark | 5 min | Set up weekly traffic monitoring habit |

**Exit criteria**: App accessible at custom domain with valid HTTPS; Google Search Console verified; sitemap submitted.

---

## Phase 3 — SEO & Content (Week 2-3)

**Goal**: Drive organic search traffic from low-competition keywords.

| Task | Est. Time | Details |
|---|---|---|
| 3.1 Create `/guides/` landing page | 2 hrs | Static guide index at `public/guides/index.html` (or SPA route) listing all guides |
| 3.2 Create weapon-specific guide pages (top 5 weapons) | 4 hrs e.a. | Static HTML pages or SPA routes for: Kettle, Rattler, Tempest, Osprey, Venator. Each guide = "Best {Weapon} Loadout in ARC Raiders [Patch {version}]". Include embedded build data, weapon stats table, tier list recommendation. |
| 3.3 Create "Best Loadout by Role" guide | 3 hrs | Overview page: PvP Aggressor, PvE Farmer, Stealth, Support — which weapons, augments, shields for each role |
| 3.4 Update JSON-LD structured data | 30 min | Ensure every page has `WebApplication` schema (already done for root) + `Article` schema for guides |
| 3.5 Update OG images per guide | 1 hr | Create guide-specific Open Graph images (1200x630) with weapon name + "Best Loadout" text |
| 3.6 Internal link network | 30 min | Each guide links to 2-3 other guides + the planner root. Planner links to relevant guides. |
| 3.7 Write portfolio blog post | 2 hrs | "Building the ARC Raiders Loadout Planner: A 2026 Masterclass in Web Design" — links to live app, explains tech stack, embeds screenshots |

**Exit criteria**: 5 weapon guide pages + 1 role guide + 1 portfolio blog post published. Each indexed by Google.

---

## Phase 4 — Monetisation (Week 3)

**Goal**: Establish all revenue pipelines (even if $0 initially) so they're ready when traffic arrives.

| Task | Est. Time | Details |
|---|---|---|
| 4.1 Sign up for affiliate programs | 1 hr | SteelSeries (Impact Radius), Razer Affiliate, Secretlab Affiliate. Generate tracking IDs. |
| 4.2 Replace plain gear URLs with affiliate URLs | 15 min | Update `GearAffiliate.tsx` with real tracking tags |
| 4.3 Create Ko-fi account | 15 min | Set up at ko-fi.com, get custom URL |
| 4.4 Replace Ko-fi link in footer | 5 min | Update `App.tsx` footer — replace `ko-fi.com/thirkle` placeholder with real URL |
| 4.4 Apply to Carbon Ads | 30 min | Submit application with whatever traffic data Vercel Analytics shows. Even if rejected, establishes the relationship. |
| 4.5 Apply to EthicalAds | 30 min | Submit publisher application. Note: exclusive network, cannot run alongside Carbon Ads. |
| 4.6 Update `.env.example` with all env vars | 5 min | Add `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SENTRY_DSN` to `.env.example` |
| 4.7 Set up Vercel env vars for Supabase | 15 min | Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in Vercel Dashboard |
| 4.8 Set up Vercel env vars for Sentry | 5 min | Add `VITE_SENTRY_DSN` in Vercel Dashboard |

**Exit criteria**: Affiliate links have real tracking; Ko-fi link works; Supabase env vars set; Sentry env var set; ad network applications submitted.

---

## Phase 5 — Supabase Production (Week 3-4)

**Goal**: Community builds + voting fully operational with proper data model.

| Task | Est. Time | Details |
|---|---|---|
| 5.1 Create Supabase tables | 30 min | SQL for `community_builds` and `votes` tables (run in Supabase SQL editor) |
| 5.2 Set up Row-Level Security policies | 30 min | Anonymous insert on builds, authenticated vote upserts, read-all |
| 5.3 Add Supabase env vars to Vercel | 5 min | Already in Phase 4 task 4.7 |
| 5.4 Test full community flow | 30 min | Submit build → appear in community tab → upvote → downvote → refresh → persist |
| 5.5 Add build capacity limit/gating | 1 hr | Rate limiting or daily cap on anonymous submissions to prevent spam |
| 5.6 Add moderation tool (admin delete) | 2 hrs | Simple admin panel or Supabase Dashboard-based moderation |
| 5.7 Migrate 15 meta builds to Supabase as "official" | 30 min | Seed the 15 curated builds as official entries in the `community_builds` table |

**Exit criteria**: Community builds flow works end-to-end in production. Voting persists. Spam protection active.

---

## Phase 6 — Data Freshness (Week 4)

**Goal**: Game data auto-refreshes when the game patches, without manual intervention.

| Task | Est. Time | Details |
|---|---|---|
| 6.1 Add `npm run fetch:all` script | 1 hr | Script that calls `fetch-weapons.mjs` and also generates/updates attachments, augments, shields from API |
| 6.2 Add CI cron/scheduled GitHub Action | 1 hr | `.github/workflows/refresh-data.yml` — weekly run `npm run fetch:all` and open PR with results if anything changed |
| 6.3 Add data version tracking | 1 hr | `src/data/version.ts` — export `LAST_UPDATED` timestamp; show in footer |
| 6.4 Build `npm run build` verifies data integrity | 30 min | Build step checks that all weapon IDs in meta builds, attachments, etc. still exist |

**Exit criteria**: Weekly automated PRs when game data changes; data version visible in footer; build fails on broken references.

---

## Phase 7 — Polish & UX (Week 4-5)

**Goal**: Eliminate rough edges and improve the user experience for first-time visitors.

| Task | Est. Time | Details |
|---|---|---|
| 7.1 Fix Dolabra — show "Stats Unknown" better | 1 hr | Instead of all-zero stats, show a clear message: "Stats not yet available — contribute data via GitHub link" |
| 7.2 Add empty states for every section | 2 hrs | "No weapon selected", "No saved builds", "No community builds", "No quick-use items" — consistent messaging |
| 7.3 Add keyboard navigation | 2 hrs | Tab traps in modals, Escape to close dropdowns, arrow keys in filters |
| 7.4 Add toast notifications for actions | 1 hr | "Build saved", "Build URL copied", "Build shared" — current missing (no feedback on actions) |
| 7.5 Add loading skeleton for lazy-loaded components | 30 min | Already partially done; verify WeaponComparison, SkillGraphView, BuildSubmissionForm all have skeletons |
| 7.6 Fix WeaponComparison close hack | 15 min | Replace `document.getElementById('toggle-compare')` with proper state prop |
| 7.7 Add mobile responsiveness audit | 2 hrs | Test 320px-768px widths, fix overflow in stat tables, ensure dropdowns work on touch |
| 7.8 Add PWA manifest (optional stretch) | 2 hrs | `public/manifest.json`, service worker for offline caching of static assets |

**Exit criteria**: All features work on mobile (320px+); toasts fire for every user action; empty states guide new users.

---

## Phase 8 — Community & Growth (Month 2)

**Goal**: Drive initial real users to the app.

| Task | Est. Time | Details |
|---|---|---|
| 8.1 Post to r/ARC Raiders subreddit | 1 hr | Guide-style post: "I built a loadout planner for ARC Raiders — here's how to use it". Include screenshots, live link. |
| 8.2 Create Steam Community guide | 1 hr | Re-purpose the guide into Steam's guide format — screenshots + build planner link |
| 8.3 Record 2-min YouTube overview | 2 hrs | Screen recording with voiceover showing the key features. Title: "ARC Raiders Best Loadout Planner (2026)" |
| 8.4 Share on X/Twitter + Discord communities | 30 min | Post in ARC Raiders Discord, relevant gaming discords, X with screenshot |
| 8.5 Add "share this build" social links | 1 hr | Twitter/X share button for individual builds with pre-filled text |
| 8.6 Track referral sources | 30 min | Add UTM parameters to all external links; monitor in Vercel Analytics |
| 8.7 Review Vercel Analytics week 1 data | 30 min | Check traffic sources, top pages, device breakdown. Adjust strategy based on data. |

**Exit criteria**: App appears in 3+ external communities; Vercel Analytics shows 100+ unique visitors.

---

## Phase 9 — Monitoring & Iteration (Ongoing)

**Goal**: Continuously improve based on real user data.

| Task | Frequency | Details |
|---|---|---|
| 9.1 Review Sentry errors | Weekly | Fix top 3 errors by frequency before adding new features |
| 9.2 Review Vercel Analytics | Weekly | Track pageviews, unique visitors, top pages, bounce rate |
| 9.3 Review Google Search Console | Bi-weekly | Track impressions, clicks, average position for target keywords |
| 9.4 Update weapon data after game patches | As needed | Run fetch script, verify changes, merge PR |
| 9.5 Add new meta builds per patch | Per patch | Create new meta build entries for each game balance patch |
| 9.6 A/B test ad placements | Monthly | Test sidebar vs footer vs both (if using Carbon Ads) |
| 9.7 Evaluate Supabase Pro upgrade | At $25/mo ad revenue | Cost-neutral upgrade; enables never-pausing DB |

**Exit criteria**: Error rate < 0.1%; traffic grows month-over-month.

---

## Phase 10 — Stretch Goals (Month 3+)

**Goal**: Major features that differentiate from competitors.

| Task | Priority | Details |
|---|---|---|
| 10.1 Build "Optimal Loadout" AI recommendation | HIGH | Given player's playstyle preferences (PvP/PvE, budget, playstyle), recommend optimal weapon+aument+shield combo |
| 10.2 Interactive damage calculator | HIGH | Input enemy armor type + distance → see TTK and shots-to-kill with current build |
| 10.3 Discord bot integration | MEDIUM | Bot command `/ar-build {weapon}` returns build stats in Discord embed |
| 10.4 Build import/export as JSON | MEDIUM | Download build as `.json` file; upload to import |
| 10.5 Dark mode / theme variants | LOW | Currently only dark; add "OLED true black" toggle as requested by community |
| 10.6 Multiple compare mode | LOW | Compare 3+ weapons side by side |
| 10.7 i18n / language support | LOW | Japanese, Korean, German translations (ARC Raiders is popular in Asia/Europe) |

---

## Timeline Summary

```
Week 1:  ── Phase 0 (Data) + Phase 1 (Quality) ──→ Ship data fix + tests + CI
Week 2:  ── Phase 2 (Domain) + Phase 3 (SEO) ────→ Ship custom domain + guides
Week 3:  ── Phase 4 (Monetisation) ───────────────→ Ship revenue pipelines
Week 4:  ── Phase 5 (Supabase) + Phase 6 (Data Freshness) ──→ Ship community + auto-refresh
Week 5:  ── Phase 7 (Polish) ─────────────────────→ Ship UX improvements
Month 2: ── Phase 8 (Community & Growth) ─────────→ Ship to real users
Ongoing: ── Phase 9 (Monitoring) + Phase 10 (Stretch) ──→ Iterate based on data
```

## Key Metrics to Track

| Metric | Current | Target (Month 1) | Target (Month 3) | Source |
|---|---|---|---|---|
| Unique visitors/mo | ~0 | 500 | 3,000 | Vercel Analytics |
| Pageviews/mo | ~0 | 2,000 | 15,000 | Vercel Analytics |
| Builds shared | N/A | 50 | 500 | Estimate from URL gen |
| Submitted community builds | 15 (seeded) | 25 | 100 | Supabase count |
| Search impressions/mo | N/A | 500 | 10,000 | Google Search Console |
| Search clicks/mo | N/A | 10 | 300 | Google Search Console |
| Error rate | N/A | <0.5% | <0.1% | Sentry |
| Revenue/mo | $0 | $0 | $5 | Affiliate + Ko-fi + Ads |
| Avg. session duration | N/A | 2 min | 4 min | Vercel Analytics |
| Bounce rate | N/A | <65% | <50% | Vercel Analytics |

## Success Definition

**Phase 0-7 complete** = App is production-ready with quality data, tests, CI, domain, and monetisation wired.

**Phase 8 complete** = Real users are finding and using the app.

**Phase 9-10 ongoing** = Continuous improvement based on user data.

The app is "shipped" when: data is accurate, tests pass, CI runs, domain works, and at least 100 real users have used the planner.

## Files That Need Changes by Phase

| Phase | Files |
|---|---|
| 0 | `scripts/fetch-weapons.mjs`, `src/data/weapons.ts`, `package.json` |
| 1 | `src/utils/stats.ts` (add tests in `src/utils/__tests__/stats.test.ts`), `src/utils/buildUrl.ts` (add tests), `src/utils/skills.ts` (add tests), `src/utils/filters.ts` (add tests), `vite.config.ts`, `.github/workflows/ci.yml`, `main.tsx` (add Sentry), `.env.example` |
| 2 | Vercel Dashboard, DNS provider, `public/sitemap.xml`, `public/og-image.svg`, `src/App.tsx` (OG URLs), `src/data/projects/arc-raiders-build-planner.mdx` |
| 3 | New files in `public/guides/` or `src/data/guides/`, `src/App.tsx` (routing), portfolio blog post at `JordanThirkle.com/src/data/blog/` |
| 4 | `src/components/GearAffiliate.tsx`, `src/App.tsx` (Ko-fi), `.env.example`, Vercel Dashboard |
| 5 | Supabase SQL scripts, `src/lib/supabase.ts` (RLS check), Vercel Dashboard |
| 6 | `scripts/fetch-all.mjs`, `.github/workflows/refresh-data.yml`, `src/data/version.ts`, `src/App.tsx` |
| 7 | `src/components/WeaponComparison.tsx`, various component files |
| 8 | Reddit/Steam/Discord/YouTube content |
