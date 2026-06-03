import type { VercelRequest, VercelResponse } from '@vercel/node';

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'deepseek/deepseek-v4-flash';
const CACHE_MAX_AGE = 3600;
const EMBED_FIELD_MAX = 1024;
const AI_MAX_TOKENS = 1024;
const VALID_POST_ACTIONS = new Set(['discord']);

interface DailyBriefing {
  date: string;
  generatedAt: string;
  meta: {
    topWeapons: { weapon: string; reason: string }[];
    metaShift: string;
  };
  patchSummary: string;
  trendingBuilds: string[];
  dailyTip: string;
  source: 'generated' | 'error';
}

interface DiscordBriefingResponse extends DailyBriefing {
  discordStatus?: string;
}

function makeErrorBriefing(patchSummary: string, opts?: { metaShift?: string }): DailyBriefing {
  const now = new Date().toISOString();
  return {
    date: now.slice(0, 10),
    generatedAt: now,
    meta: { topWeapons: [], metaShift: opts?.metaShift ?? 'Briefing unavailable' },
    patchSummary,
    trendingBuilds: [],
    dailyTip: 'Check back later.',
    source: 'error',
  };
}

const SYSTEM_PROMPT = `You are the ARC Hub daily briefing AI for ARC Raiders. Generate a concise, data-driven community briefing.

Return JSON with this exact structure:
{
  "meta": {
    "topWeapons": [
      { "weapon": "Weapon Name", "reason": "Brief reason why it's top meta" }
    ],
    "metaShift": "One-sentence summary of any current meta shift or 'No major shift this week.'"
  },
  "patchSummary": "One-paragraph summary of the latest patch impact on the meta. If no recent patch known, focus on current meta trends.",
  "trendingBuilds": ["Build/weapon combo that's gaining popularity"],
  "dailyTip": "One actionable tip for ARC Raiders players today"
}

Keep it short and useful. No markdown formatting in the string values. Max 3 top weapons. Max 3 trending builds.`;

function formatDiscordEmbed(briefing: DailyBriefing) {
  const color = 0xE8A832;
  const weapons = briefing.meta.topWeapons.map(w => `**${w.weapon}** — ${w.reason}`).join('\n');
  const builds = briefing.trendingBuilds.map(b => `• ${b}`).join('\n');

  return {
    embeds: [{
      title: `ARC Hub Daily Briefing — ${briefing.date}`,
      color,
      fields: [
        { name: 'Top Meta Weapons', value: (weapons || 'No data').slice(0, EMBED_FIELD_MAX), inline: false },
        { name: 'Meta Shift', value: briefing.meta.metaShift.slice(0, EMBED_FIELD_MAX), inline: false },
        { name: 'Patch Summary', value: briefing.patchSummary.slice(0, EMBED_FIELD_MAX), inline: false },
        { name: 'Trending Builds', value: (builds || 'None').slice(0, EMBED_FIELD_MAX), inline: false },
        { name: 'Daily Tip', value: briefing.dailyTip.slice(0, EMBED_FIELD_MAX), inline: false },
      ],
      footer: { text: 'ARC Hub — arc-hub.vercel.app' },
      timestamp: briefing.generatedAt,
    }],
  };
}

async function postToDiscordWebhook(briefing: DailyBriefing, webhookUrl: string): Promise<string> {
  let parsed: URL;
  try {
    parsed = new URL(webhookUrl);
  } catch {
    return 'Invalid webhook URL';
  }
  if (parsed.protocol !== 'https:' || !parsed.hostname.endsWith('.discord.com')) {
    return 'Webhook URL must be HTTPS and point to discord.com';
  }

  const payload = formatDiscordEmbed(briefing);
  const resp = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) {
    const body = await resp.text();
    return `Discord webhook error ${resp.status}`;
  }
  return `Posted to Discord (${resp.status})`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', `s-maxage=${CACHE_MAX_AGE}, stale-while-revalidate`);
  res.setHeader('Vary', 'Accept-Encoding');

  const apiKey = process.env.OPENROUTER_API_KEY;
  const postParam = Array.isArray(req.query.post) ? req.query.post[0] : req.query.post;
  const shouldPostToDiscord = postParam !== undefined && VALID_POST_ACTIONS.has(postParam);
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!apiKey) {
    return res.status(200).json(
      makeErrorBriefing('Daily briefing requires OPENROUTER_API_KEY configured in Vercel environment variables.')
    );
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://arc-hub.vercel.app',
        'X-Title': 'ARC Hub Daily Briefing',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: 'Generate today\'s ARC Raiders community briefing.' },
        ],
        temperature: 0.4,
        max_tokens: AI_MAX_TOKENS,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      return res.status(502).json(
        makeErrorBriefing(`OpenRouter API error: ${response.status}`)
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return res.status(502).json(
        makeErrorBriefing('Empty response from OpenRouter.')
      );
    }

    let briefing: Partial<DailyBriefing>;
    try {
      briefing = JSON.parse(content);
    } catch {
      briefing = {};
    }

    const now = new Date().toISOString();
    const result: DiscordBriefingResponse = {
      date: now.slice(0, 10),
      generatedAt: now,
      meta: briefing.meta || { topWeapons: [], metaShift: 'No meta data available' },
      patchSummary: briefing.patchSummary || content.slice(0, 500),
      trendingBuilds: briefing.trendingBuilds || [],
      dailyTip: briefing.dailyTip || 'No tip today.',
      source: 'generated',
    };

    if (shouldPostToDiscord) {
      if (!webhookUrl) {
        result.discordStatus = 'No DISCORD_WEBHOOK_URL configured';
        result.source = 'error';
      } else {
        result.discordStatus = await postToDiscordWebhook(result, webhookUrl);
      }
    }

    return res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return res.status(500).json(
      makeErrorBriefing(`Server error: ${message}`)
    );
  }
}
