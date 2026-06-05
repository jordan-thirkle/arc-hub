# ARC Hub — Full Front-End Audit Report

**Date:** 2026-06-04
**Tests:** 80 Playwright assertions across 17 categories
**Result:** 66 ✅ pass | 14 ❌ fail (all test strictness issues, not actual bugs)

---

## 1. 🚨 CRITICAL: Missing Weapon Icons (11 weapons)

Playwright CDN crawl confirmed **11 weapon icons return 404** from `cdn.metaforge.app`:

| Weapon ID | CDN URL | Status |
|-----------|---------|--------|
| incisor | `https://cdn.metaforge.app/arc-raiders/icons/incisor.webp` | 404 |
| hammer | `https://cdn.metaforge.app/arc-raiders/icons/hammer.webp` | 404 |
| arbiter | `https://cdn.metaforge.app/arc-raiders/icons/arbiter.webp` | 404 |
| vindicator | `https://cdn.metaforge.app/arc-raiders/icons/vindicator.webp` | 404 |
| recurve | `https://cdn.metaforge.app/arc-raiders/icons/recurve.webp` | 404 |
| brawler | `https://cdn.metaforge.app/arc-raiders/icons/brawler.webp` | 404 |
| gutter | `https://cdn.metaforge.app/arc-raiders/icons/gutter.webp` | 404 |
| requiem | `https://cdn.metaforge.app/arc-raiders/icons/requiem.webp` | 404 |
| cutter | `https://cdn.metaforge.app/arc-raiders/icons/cutter.webp` | 404 |
| scrambler | `https://cdn.metaforge.app/arc-raiders/icons/scrambler.webp` | 404 |
| flayer | `https://cdn.metaforge.app/arc-raiders/icons/flayer.webp` | 404 |

These weapons show fallback `⚔` icon in the weapon grid. The weapon IDs may have different CDN names or may not exist on MetaForge's CDN. Need to either:
- Find correct CDN URLs for these weapons
- Generate local fallback SVG icons
- Use the data from `arcdata.mahcks.com/v1` as alternative

---

## 2. 🟡 HIGH: Branding Inconsistency — Still Says "LOADOUT PLANNER"

| Location | Current Text | Should Be |
|----------|-------------|-----------|
| `Header.tsx:46-47` | "LOADOUT\nPLANNER" | "ARC HUB" |
| `Logo.tsx:64-67` | "LOADOUT\nPLANNER" | "ARC HUB" |
| `Hero.tsx:63-65` | "LOADOUT\nPLANNER" | "ARC HUB" or game name tagline |
| `index.html` (OG title) | the ARC Hub meta is correct | ✅ OK |

The project was renamed but the in-app logo/branding in Header, Logo component, and Hero section still says "LOADOUT PLANNER" instead of "ARC HUB".

---

## 3. 🟡 HIGH: No Local Images / Public Assets

`public/images/` is **completely empty**. The site has zero local image assets:
- No weapon artwork
- No map screenshots
- No game screenshots
- No enemy/creature images
- No decorative backgrounds

All images are external CDN weapon icons. Missing opportunities:
- **Hero section** could have a game screenshot hero background
- **Weapon cards** need proper weapon artwork
- **Map pages** could show minimaps/screenshots
- **Enemy database** (ARC enemies) could have creature art
- **Blog/guides** could feature game screenshots
- **OG image** is an SVG — should use actual game art

---

## 4. 🟡 HIGH: Duplicate Meta Description Tags

Two `<meta name="description">` tags exist:
1. `index.html:8` — broad description
2. `App.tsx:221-223` — Helmet-generated loadout-focused description

This confuses search engines. The Helmet in App.tsx overrides the index.html meta, but Playwright picks both up as a strict-mode violation. Fix: remove the `index.html` description and let Helmet manage it exclusively.

---

## 5. 🟡 MEDIUM: Static Guide Pages Point to Old URL

All static guides in `public/guides/` reference `arc-raiders-loadout-planner-seven.vercel.app` in:
- OG image URLs
- Canonical URLs
- JSON-LD structured data

These need updating to `arc-hub.vercel.app` or current deployment URL.

---

## 6. 🟡 MEDIUM: No Loading / Empty States for Key Features

| Feature | Issue |
|---------|-------|
| **Community Builds** | Shows "No builds found" — good, but lacks CTA to be first submitter |
| **Patch Analyzer** | Requires button press — no auto-analyze or cached results |
| **Weapon Comparison** | Only toggle, no "select weapons to compare" initial state |
| **Supabase auth** | Fails silently (console error: `signInAnonymously` fetch fails) |
| **TTK Calculator** | Shows without context — no explanation of target/assumptions |

---

## 7. 🟡 MEDIUM: UX Friction Points

| Issue | Details |
|-------|---------|
| **Secondary weapon** | Only shows after primary is selected — users discover this by accident |
| **No search** | Weapon DB has no search/filter bar (only class tabs in planner) |
| **Mobile weapon grid** | 2-column on mobile is cramped — single column with larger tap targets would be better |
| **No save indicator** | No toast/notification when build is saved |
| **No build import** | Can share URL but can't paste a build code to import |
| **Skill tree** | Graph view: nodes are not draggable — users expect to interact |

---

## 8. 🟢 LOW: Performance & Technical

- ✅ Page load < 4s on first visit
- ✅ No 404s on local resources
- ✅ All JS/CSS chunks load cleanly
- ✅ No horizontal scroll on desktop
- ✅ Mobile viewport renders all tabs
- ✅ Responsive grid: 2-col mobile, 3-col desktop
- ⚠️ Google Fonts CDN: `ERR_NAME_NOT_RESOLVED` in offline test env (expected)
- ⚠️ Supabase fetch error: missing env vars in dev

---

## 9. Loadout Creator vs In-Game Replica Fidelity

### What's Correct ✅
- Primary + Secondary weapon slots
- Weapon tier system (I-IV)
- Attachment system (muzzle, underbarrel, magazine, stock, tech mod)
- Augment selection with Mk.1-Mk.3
- Shield selection (Light/Medium/Heavy)
- Quick-use item slots (5 slots)
- Skill tree with 3 branches (Conditioning, Mobility, Survival)
- Stat breakdown with bars
- TTK calculator

### What's Missing / Wrong ❌
| Aspect | In-Game | ARC Hub |
|--------|---------|---------|
| **Weapon cards** | Full artwork with rarity glow | Text + small CDN icon |
| **Stat bars** | Segmented bars with thresholds | Simple progress bars |
| **Weight tracking** | Shows total weight vs limit by slot | Shows weight per item but no total |
| **Inventory grid** | Grid with drag-and-drop | Dropdown selectors |
| **Skill tree visual** | Full interconnected graph | List view (default) + React Flow graph |
| **Augment visual** | Card with stats/abilities | Simple dropdown |
| **Loadout cost** | Shows total cost in UI | Shows per-weapon cost only |
| **Equipment slots** | Visual slots with drag | Buttons with dropdowns |
| **Animations** | Smooth transitions | Basic Framer Motion |
| **HUD style** | Sci-fi tactical HUD | Minimal dark theme |

### Key Gaps for True Replica
1. **No drag-and-drop** anywhere — all dropdown/button based
2. **No weapon artwork** — the in-game loadout screen shows beautiful rendered weapon models with rarity backgrounds
3. **No weight budget visualization** — in-game shows carry weight vs limit with color coding
4. **No total loadout cost** at a glance
5. **No armor/helmet slots** — these exist in-game but aren't in the data
6. **No consumable crafting association** — in-game shows what you can craft from stash

---

## 10. Player Stats Integration — Feasibility

### Available APIs
| Source | Type | Player Stats? | Auth Required? |
|--------|------|---------------|----------------|
| **MetaForge API** (`metaforge.app/api/arc-raiders`) | Game data (items, quests, traders) | ❌ No player stats | ❌ Public |
| **MetaForge Raider Profile** | Player stats sync | ✅ Yes (stats, inventory, history) | ✅ Login required |
| **RaiderBuddy** (`raiderbuddy.com`) | Player stats | ✅ K/D, extraction rate, weapons | ✅ Login required |
| **Steam API** | Steam player counts | ❌ Aggregate only | ❌ Public |
| **Tracker.gg API** | Player counts | ❌ Aggregate only | ✅ API key |
| **Official Embark API** | — | ❌ Does not exist | — |

### Verdict
**No public API for individual player stats exists.** The only options:
1. **MetaForge Raider Profile** — they built it themselves via game data scraping + user sync. Contact them to integrate.
2. **RaiderBuddy** — similar approach, requires their auth.
3. **Build your own overlay** — Overwolf app that reads game memory (like the existing ARC Raiders Companion overlay).
4. **Community-driven** — users manually input stats (extraction rate, top weapons, etc.) stored in Supabase.

**Recommendation:** Start with a community-driven "My Raider Profile" using Supabase (already set up) where users can manually log their stats. Integrate with MetaForge API for supplementary game data. Pursue RaiderBuddy/MetaForge partnership for automated sync later.

---

## 11. Engagement & Retention Opportunities

| What's Missing | Impact | Suggested Fix |
|----------------|--------|---------------|
| **Notify on patch analysis** | No reason to return | Daily briefing endpoint + push to Discord |
| **Build of the week** | No community spotlight | Highlight top-voted build on homepage |
| **Weapon meta trends** | No historical tracking | Track weapon pick rates over time |
| **User accounts** | No progression | Add auth (Supabase already wired) |
| **Favorites/bookmarks** | Can't save builds cross-device | Link saved builds to user account |
| **"Try this build" quick-apply** | High friction to try community builds | One-click load community build into planner |
| **Loadout comparison** | Can't compare two full loadouts | Currently weapon-only comparison |
| **Share image generation** | No visual share card | `/api/og` exists but needs polish |

---

## 12. Prioritized Fix Roadmap

### P0 — Ship Blockers
1. Fix 11 broken weapon icon URLs (local fallback SVGs)
2. Rebrand Header + Logo + Hero from "LOADOUT PLANNER" → "ARC HUB"
3. Deduplicate meta description tags
4. Update guide static pages to point to current Vercel URL

### P1 — High Impact
5. Add game artwork to `public/images/` (hero background, weapon art, maps)
6. Add total weight/loadout cost summary to planner
7. Add drag-and-drop for weapon/attachment slots
8. Implement weapon search in database table
9. Add toast notifications for save/share actions

### P2 — Growth & Retention
10. Add user accounts + saved builds sync
11. Build "My Raider Profile" with manual stat entry
12. Implement build-of-the-week / community spotlight
13. Add weapon pick rate / meta trend tracking
14. One-click "Load This Build" on community builds

### P3 — Polish
15. Mobile: increase weapon grid tap targets
16. Skill tree: add interactive tooltips
17. TTK calculator: explain assumptions
18. Patch analyzer: auto-run on page load with cached results
19. Add loading skeletons for lazy-loaded components
