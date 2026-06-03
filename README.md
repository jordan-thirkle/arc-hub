# ARC Hub

Community hub for everything ARC Raiders: loadout planner, weapon database, build guides, patch analysis, daily meta briefing, and community builds.

**Stack:** React 19 + TypeScript 6 + Vite 8 + Tailwind CSS 4 + Framer Motion\
**Deploy:** Vercel (serverless + static)\
**AI:** DeepSeek V4 Flash via OpenRouter

## Features

- Interactive loadout planner (23 weapons, 4 tiers, 17 attachments, augments, shields, quick-use)
- Weapon comparison with stat deltas
- 44-node skill tree viewer with prerequisite validation
- Community build sharing + voting (Supabase)
- AI-powered patch notes analyzer
- Daily meta briefing endpoint (`/api/discord/daily`)
- Crafting calculator with material summaries
- 8 weapon-specific guides + 10 role-based meta guides
- Dark industrial sci-fi theme

## API Endpoints

| Route | Method | Description |
|-------|--------|-------------|
| `/api/weapons` | GET | Full weapon data |
| `/api/og` | GET | Open Graph image (build URL) |
| `/api/patch-analyzer` | POST | AI patch note analysis |
| `/api/discord/daily` | GET | Daily meta briefing (JSON) |

### Daily Briefing

```
GET /api/discord/daily
GET /api/discord/daily?post=discord   # Also pushes to Discord webhook
```

Requires `OPENROUTER_API_KEY` env var. Optional `DISCORD_WEBHOOK_URL` for auto-posting.

## Local Dev

```bash
npm run dev     # Vite dev server
npm run build   # TypeScript + Vite build
npm run test    # Vitest
npm run lint    # ESLint
```

## Environment

| Var | Required | Description |
|-----|----------|-------------|
| `VITE_SUPABASE_URL` | No | Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | No | Supabase anon key |
| `OPENROUTER_API_KEY` | For AI features | OpenRouter API key |
| `DISCORD_WEBHOOK_URL` | No | Discord webhook for daily briefing |

Not affiliated with Embark Studios.
