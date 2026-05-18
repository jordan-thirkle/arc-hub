import { weapons } from '../data/weapons';
import { patches } from '../data/patches';

function jitter(value: number, pct = 2): number {
  const factor = 1 + (Math.random() - 0.5) * (pct / 100) * 2;
  return Math.round(value * factor * 10) / 10;
}

export async function mockFetchWeaponStats(): Promise<Record<string, unknown>> {
  await new Promise(r => setTimeout(r, 400 + Math.random() * 600));
  const result: Record<string, unknown> = {};
  for (const w of weapons) {
    result[w.id] = {
      name: w.name,
      tiers: w.tiers.map(t => ({
        tier: t.tier,
        label: t.label,
        stats: {
          damage: jitter(t.stats.damage),
          fireRate: t.stats.fireRate,
          range: jitter(t.stats.range),
          magSize: t.stats.magSize,
          verticalRecoil: jitter(t.stats.verticalRecoil),
          horizontalRecoil: jitter(t.stats.horizontalRecoil),
          adsSpeed: jitter(t.stats.adsSpeed, 5),
          reloadSpeed: jitter(t.stats.reloadSpeed, 5),
          bulletVelocity: t.stats.bulletVelocity,
          dispersion: jitter(t.stats.dispersion, 5),
        },
        value: t.value,
      })),
    };
  }
  return result;
}

export async function mockFetchLatestPatch(): Promise<{ version: string; date: string; changes: string[] }> {
  await new Promise(r => setTimeout(r, 200));
  const latest = patches[patches.length - 1];
  return { version: latest.version, date: latest.date, changes: latest.changes };
}
