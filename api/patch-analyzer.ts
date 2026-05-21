import type { VercelRequest, VercelResponse } from '@vercel/node';

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'deepseek/deepseek-v4-flash';

interface AnalysisResult {
  summary: string;
  metaShifts: { weapon: string; impact: 'buff' | 'nerf' | 'rework' | 'new'; description: string }[];
  topBuffs: string[];
  topNerfs: string[];
  newMetaPicks: string[];
  verdict: string;
}

function parseAnalysis(raw: string): AnalysisResult | null {
  try {
    return JSON.parse(raw);
  } catch {
    const summary = raw.split('\n').slice(0, 3).join(' ').replace(/^#{1,3}\s*/, '').trim() || raw.slice(0, 200);
    return {
      summary,
      metaShifts: [],
      topBuffs: [],
      topNerfs: [],
      newMetaPicks: [],
      verdict: 'See full analysis above.',
    };
  }
}

const SYSTEM_PROMPT = `You are an ARC Raiders meta analyst. Analyze the provided patch notes and return a JSON object with this exact structure:
{
  "summary": "One-paragraph overview of the patch's impact on the meta",
  "metaShifts": [
    { "weapon": "Weapon Name", "impact": "buff|nerf|rework|new", "description": "What changed and why it matters" }
  ],
  "topBuffs": ["Weapon that got buffed most"],
  "topNerfs": ["Weapon that got nerfed most"],
  "newMetaPicks": ["New meta-relevant weapons or builds"],
  "verdict": "One-sentence bottom line on whether this patch shakes up the meta"
}

Be specific with numbers and mechanics. If no patch notes provided, explain what you'd need.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(200).json({
      error: 'OpenRouter API key not configured',
      analysis: null,
      hint: 'Set OPENROUTER_API_KEY in Vercel env vars to enable AI-powered analysis.',
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { patchNotes, patchName } = req.body;

  if (!patchNotes) {
    return res.status(400).json({ error: 'Missing patchNotes in request body' });
  }

  const userPrompt = patchName
    ? `Patch: ${patchName}\n\nPatch Notes:\n${patchNotes}`
    : `Patch Notes:\n${patchNotes}`;

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://arc-raiders-loadout-planner-seven.vercel.app',
        'X-Title': 'ARC Raiders Loadout Planner',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.3,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(502).json({
        error: 'OpenRouter API error',
        status: response.status,
        detail: errText,
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return res.status(502).json({ error: 'Empty response from OpenRouter' });
    }

    const analysis = parseAnalysis(content);
    const usage = data.usage;

    return res.status(200).json({ analysis, usage, raw: content });
  } catch (err) {
    return res.status(500).json({ error: 'Internal error', detail: String(err) });
  }
}
