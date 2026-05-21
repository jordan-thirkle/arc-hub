import LZString from 'lz-string';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { weapons } from '../src/data/weapons';

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function makeSvg(params: { primary: string; tier: string; secondary?: string; tier2?: string; damage?: number; dps?: number; fireRate?: number }) {
  const { primary, tier, secondary, tier2, damage, dps, fireRate } = params;
  const leftColX = 60;
  const rightColX = 620;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0A0E14"/>
      <stop offset="100%" stop-color="#131920"/>
    </linearGradient>
    <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="transparent"/>
      <stop offset="50%" stop-color="#E8A832"/>
      <stop offset="100%" stop-color="transparent"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="1" fill="url(#line)"/>
  <rect x="0" y="629" width="1200" height="1" fill="url(#line)"/>

  <text x="60" y="70" font-family="sans-serif" font-size="28" font-weight="700" fill="#E8A832" letter-spacing="3">ARC RAIDERS</text>
  <text x="60" y="100" font-family="sans-serif" font-size="16" fill="#8899AA" letter-spacing="2">LOADOUT PLANNER</text>

  <text x="${leftColX}" y="160" font-family="monospace" font-size="14" font-weight="600" fill="#E8A832" letter-spacing="2">PRIMARY WEAPON</text>
  <text x="${leftColX}" y="190" font-family="sans-serif" font-size="40" font-weight="700" fill="#E8EDF2">${escapeXml(primary)}</text>
  <text x="${leftColX}" y="220" font-family="monospace" font-size="20" fill="#5A6A7A">Tier ${escapeXml(tier)}</text>

  ${secondary ? `
  <text x="${rightColX}" y="160" font-family="monospace" font-size="14" font-weight="600" fill="#E8A832" letter-spacing="2">SECONDARY WEAPON</text>
  <text x="${rightColX}" y="190" font-family="sans-serif" font-size="40" font-weight="700" fill="#E8EDF2">${escapeXml(secondary)}</text>
  <text x="${rightColX}" y="220" font-family="monospace" font-size="20" fill="#5A6A7A">Tier ${escapeXml(tier2 ?? 'I')}</text>
  ` : ''}

  ${damage ? `
  <text x="${leftColX}" y="300" font-family="monospace" font-size="14" font-weight="600" fill="#E8A832" letter-spacing="2">WEAPON STATS</text>
  <rect x="${leftColX}" y="315" width="1080" height="1" fill="#2A3545"/>
  <text x="${leftColX}" y="350" font-family="monospace" font-size="16" fill="#8899AA">Damage</text>
  <text x="${leftColX + 300}" y="350" font-family="monospace" font-size="18" font-weight="700" fill="#E8EDF2">${damage}</text>
  <text x="${leftColX}" y="390" font-family="monospace" font-size="16" fill="#8899AA">Fire Rate</text>
  <text x="${leftColX + 300}" y="390" font-family="monospace" font-size="18" font-weight="700" fill="#E8EDF2">${fireRate ?? '-'}</text>
  <text x="${leftColX + 540}" y="350" font-family="monospace" font-size="16" fill="#8899AA">DPS</text>
  <text x="${leftColX + 540 + 200}" y="350" font-family="monospace" font-size="18" font-weight="700" fill="#FF5A00">${dps ?? '-'}</text>
  ` : ''}

  <text x="60" y="570" font-family="monospace" font-size="12" fill="#5A6A7A">arc-raiders-loadout-planner.vercel.app</text>
  <text x="1140" y="570" font-family="monospace" font-size="12" fill="#5A6A7A" text-anchor="end">Patch 1.29.0</text>
</svg>`;
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  const buildParam = req.query.build as string | undefined;

  if (!buildParam) {
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    const svg = makeSvg({ primary: 'ARC Raiders', tier: 'I' });
    return res.status(200).send(svg);
  }

  try {
    const json = LZString.decompressFromEncodedURIComponent(buildParam);
    if (!json) throw new Error('Invalid build data');
    const data = JSON.parse(json);
    const primaryId = data.w;
    const primaryTier = data.wt ?? 0;
    const secondaryId = data.s;
    const secondaryTier = data.st;

    const primaryWeapon = weapons.find((w: { id: string }) => w.id === primaryId);
    const secondaryWeapon = secondaryId ? weapons.find((w: { id: string }) => w.id === secondaryId) : undefined;

    const tierLabels = ['I', 'II', 'III', 'IV'];
    const tierLabel = tierLabels[primaryTier] ?? 'I';
    const tier2Label = secondaryTier !== undefined ? (tierLabels[secondaryTier] ?? 'I') : undefined;

    const stats = primaryWeapon?.tiers[primaryTier]?.stats;

    const svg = makeSvg({
      primary: primaryWeapon?.name ?? primaryId,
      tier: tierLabel,
      secondary: secondaryWeapon?.name,
      tier2: tier2Label,
      damage: stats?.damage,
      dps: stats?.dps,
      fireRate: stats?.fireRate,
    });

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    return res.status(200).send(svg);
  } catch {
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    const svg = makeSvg({ primary: 'ARC Raiders', tier: 'I' });
    return res.status(200).send(svg);
  }
}