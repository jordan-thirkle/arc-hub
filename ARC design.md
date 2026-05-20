# ARC Raiders Loadout Planner — Design System

> Version 1.0 — 2026
> Brand: Dark Industrial Sci-Fi · "Topside Extraction" vibe
> Base palette: Deep space blue-black (#0A0E14) + Amber gold (#E8A832)

---

## 1. Brand Philosophy

The app is a tactical tool for a dark, atmospheric extraction shooter. The design must feel like a piece of **in-world equipment** — a Raider's HUD or field terminal. Every pixel should communicate:

- **Tension** — high-contrast light on deep darkness
- **Precision** — sharp geometry, monospace data readouts
- **Industrial grit** — subtle noise, scan-line texture, unpolished edges
- **Hope** — the warm amber glow of the surface above

---

## 2. Logo

### Mark
A **hexagonal frame** with an upward-pointing chevron — evoking the "extraction to topside" journey. The hexagon references the game's hexagonal UI motifs. The chevron doubles as a mountain peak and an upward arrow.

### Wordmark
**LOADOUT** — Barlow Condensed Bold, gold (#E8A832), tight tracking
**PLANNER** — JetBrains Mono, tertiary (#5A6A7A), wide tracking

### Usage
- Always on dark backgrounds
- Minimum clear space: 1× icon width on each side
- Never recolor the icon to anything other than gold

---

## 3. Color Palette

### Backgrounds
| Token | RGB | Hex | Usage |
|-------|-----|-----|-------|
| `--bg-page` | `10 14 20` | `#0A0E14` | Page background |
| `--bg-surface` | `19 25 32` | `#131920` | Card/panel surfaces |
| `--bg-elevated` | `28 37 48` | `#1C2530` | Dropdowns, hover states |
| `--bg-overlay` | `0 0 0 / 0.6` | — | Modal backdrops |

### Borders
| Token | RGB | Hex | Usage |
|-------|-----|-----|-------|
| `--border-primary` | `42 53 69` | `#2A3545` | Default borders |
| `--border-accent` | `232 168 50` | `#E8A832` | Active/focus borders |

### Text
| Token | RGB | Hex | Usage |
|-------|-----|-----|-------|
| `--text-primary` | `232 237 242` | `#E8EDF2` | Body, headings |
| `--text-secondary` | `136 153 170` | `#8899AA` | Labels, secondary info |
| `--text-tertiary` | `90 106 122` | `#5A6A7A` | Placeholder, disabled |

### Accents
| Token | RGB | Hex | Usage |
|-------|-----|-----|-------|
| `--accent` | `232 168 50` | `#E8A832` | Primary interactive |
| `--accent-hover` | `240 184 72` | `#F0B848` | Hover state |
| `--accent-blue` | `0 184 255` | `#00B8FF` | Secondary info |
| `--accent-green` | `76 175 80` | `#4CAF50` | Success |
| `--accent-warning` | `255 152 0` | `#FF9800` | Warning |
| `--danger` | `212 74 74` | `#D44A4A` | Danger, negatives |

### Stat Bars
| Token | RGB | Hex |
|-------|-----|-----|
| `--stat-bar-bg` | `28 37 48` | `#1C2530` |
| `--stat-bar-fill` | `232 168 50` | `#E8A832` |

### Gradients
```
--gradient-hero: radial-gradient(ellipse at 50% 100%, rgba(232,168,50,0.08) 0%, transparent 60%)
--gradient-card: linear-gradient(180deg, rgba(232,237,242,0.03) 0%, transparent 100%)
--gradient-glow-accent: radial-gradient(ellipse at center, rgba(232,168,50,0.15) 0%, transparent 70%)
```

---

## 4. Typography

### Font Stack
| Role | Font | Weights |
|------|------|---------|
| Display / Logo | Barlow Condensed | 700, 800, 900 |
| Body / UI | Inter | 300, 400, 500, 600, 700 |
| Monospace / Data | JetBrains Mono | 400, 500, 600 |

### Type Scale
```
--text-micro:   10px (0.625rem)  — UI badges, meta data
--text-xs:      11px (0.6875rem) — Labels, tab text
--text-sm:      12px (0.75rem)   — Small UI text
--text-base:    13px (0.8125rem) — Body text
--text-md:      14px (0.875rem)  — Large body
--text-lg:      16px (1rem)      — Subheadings
--text-xl:      18px (1.125rem)  — Small headings
--text-2xl:     20px (1.25rem)   — Section headings
--text-3xl:     24px (1.5rem)    — Page headings
--text-4xl:     30px (1.875rem)  — Hero subtitle
--text-5xl:     36px (2.25rem)   — Hero title (mobile)
--text-6xl:     48px (3rem)      — Hero title (desktop)
```

### Line Height
- Display: 0.9–1.0
- Body: 1.5
- Mono: 1.4

### Letter Spacing
- Uppercase UI: `0.1em`–`0.15em`
- Display heads: `-0.02em`
- Body: normal

---

## 5. Spacing

Base unit: **4px** (Tailwind default)

| Token | px | Tailwind |
|-------|----|----------|
| `space-1` | 4 | `p-1` |
| `space-2` | 8 | `p-2` |
| `space-3` | 12 | `p-3` |
| `space-4` | 16 | `p-4` |
| `space-5` | 20 | `p-5` |
| `space-6` | 24 | `p-6` |
| `space-8` | 32 | `p-8` |
| `space-10` | 40 | `p-10` |
| `space-12` | 48 | `p-12` |
| `space-16` | 64 | `p-16` |

---

## 6. Shadows & Glows

### Box Shadows
```
--shadow-sm:     0 1px 3px rgba(0,0,0,0.3)
--shadow-md:     0 4px 12px rgba(0,0,0,0.4)
--shadow-lg:     0 8px 32px rgba(0,0,0,0.5)
--shadow-xl:     0 16px 48px rgba(0,0,0,0.6)
```

### Glows
```
--glow-accent:        0 0 20px rgba(232,168,50,0.15)
--glow-accent-strong: 0 0 40px rgba(232,168,50,0.25)
--glow-blue:          0 0 20px rgba(0,184,255,0.15)
--glow-text-accent:   0 0 30px rgba(232,168,50,0.2)
```

---

## 7. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 4px | Buttons, inputs |
| `--radius-md` | 8px | Cards, panels |
| `--radius-lg` | 12px | Modals, dropdowns |
| `--radius-xl` | 16px | Large containers |
| `rounded-full` | 9999px | Badges, pills |

---

## 8. Animation

### Timing
| Token | Duration | Usage |
|-------|----------|-------|
| Instant | 100ms | Press states |
| Micro | 200ms | Hover, focus |
| Transition | 400ms | Tab switch, panel toggle |
| Reveal | 600–800ms | Scroll-triggered entrances |
| Hero | 800–1500ms | Initial load sequence |

### Easing
```
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)
--ease-in-out:   cubic-bezier(0.65, 0, 0.35, 1)
--ease-spring:   spring( stiffness 300, damping 20 )
```

### Keyframe Animations
- `fade-in-up` — opacity 0→1, translateY 20→0
- `scale-in` — opacity 0→1, scale 0.95→1
- `pulse-glow` — box-shadow oscillates for accent elements
- `float` — subtle translateY oscillation for cards
- `shimmer` — background-position sweep for skeletons
- `scan-line` — top→bottom sweep for HUD texture

### Micro-interactions
- **Buttons:** `scale(0.97)` on pointer-down, `shadow-glow` on hover (primary only)
- **Cards:** `translateY(-2px)` + `border-color` accent on hover
- **Inputs:** `ring-accent/50` on focus
- **Stat bars:** Animate width on mount and tier change
- **Tab switch:** Fade + 8px translateY slide
- **Modal:** Scale-in from center + backdrop blur fade

---

## 9. Iconography

Use **lucide-react** for all UI icons.

| Context | Icon |
|---------|------|
| Share | `Share2` |
| Save | `Save` |
| Reset | `RotateCcw` |
| Close | `X` |
| Chevron | `ChevronDown` |
| Search | `Search` |
| Weapon | `Sword` (or `Crosshair`) |
| Shield | `Shield` |
| Backpack | `Backpack` |
| Settings | `Settings2` |
| Compare | `GitCompare` |
| Skill | `Zap` |
| Craft | `Hammer` |

---

## 10. Component Design Tokens

### Cards
```
background:    rgb(var(--bg-surface))
border:        1px solid rgb(var(--border-primary))
border-radius: var(--radius-md)
shadow:        var(--shadow-sm)
hover:
  border-color: rgb(var(--border-accent))
  transform:    translateY(-2px)
  shadow:       var(--shadow-md)
```

### Primary Buttons
```
background:  rgb(var(--accent))
color:       rgb(var(--bg-page))
font:        font-mono text-[11px] tracking-[0.15em] uppercase
radius:      var(--radius-sm)
hover:
  background: rgb(var(--accent-hover))
  shadow:     var(--glow-accent)
active:      scale(0.97)
```

### Secondary Buttons
```
border:      1px solid rgb(var(--border-primary))
color:       rgb(var(--text-secondary))
radius:      var(--radius-sm)
hover:
  border-color: rgb(var(--border-accent))
  color:        rgb(var(--accent))
  shadow:       var(--glow-accent)
active:      scale(0.97)
```

### Inputs / Selects
```
background:  rgb(var(--bg-elevated))
border:      1px solid rgb(var(--border-primary))
radius:      var(--radius-sm)
color:       rgb(var(--text-primary))
focus:
  border-color: rgb(var(--accent))
  ring:         2px rgba(232,168,50,0.15)
```

### Stat Bars
```
track:
  background: rgb(var(--stat-bar-bg))
  radius:     4px
  height:     8px
fill:
  background: rgb(var(--stat-bar-fill))
  transition: width 400ms ease-out
  radius:     4px
```

### Badges
```
radius:      rounded-full
font:        font-mono text-[9px] tracking-wider uppercase
padding:     2px 8px
```

### Modals
```
backdrop:    rgb(var(--bg-overlay)) + backdrop-blur-xl
panel:
  background: rgb(var(--bg-surface))
  radius:     var(--radius-lg)
  shadow:     var(--shadow-xl)
  border:     1px solid rgb(var(--border-primary))
```

---

## 11. Textures & Effects

### Noise Overlay
A full-screen `::before` pseudo-element on hero and modal backdrops:
```css
background-image: url("data:image/svg+xml,...noise...");
opacity: 0.03;
pointer-events: none;
mix-blend-mode: overlay;
```

### Scan Line
Subtle horizontal line that sweeps top-to-bottom on hero:
```css
@keyframes scan-line {
  0%   { top: -5%; }
  100% { top: 105%; }
}
```

### Grid Background (Hero)
CSS perspective grid with thin 1px lines at opacity 0.04, slowly rotating.

---

## 12. Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 640px | Single column, compact |
| Tablet | 640–1023px | 2-column grids |
| Desktop | ≥ 1024px | 3-column grids, max-width 1280px |
| Wide | ≥ 1536px | Max-width fixed, hero scales |

---

*Last updated: May 2026*
