import { calculateStats, statLabel, isHigherBetter, normalizeStat } from '../utils/stats';
import { StatBar } from './StatBar';
import type { Weapon, WeaponStat, WeaponTier, BuildAttachment } from '../types';

interface StatBreakdownProps {
  weapon: Weapon;
  tier: WeaponTier;
  attachments: BuildAttachment[];
}

const primaryKeys: (keyof WeaponStat)[] = ['damage', 'fireRate', 'range', 'dps', 'magSize'];
const handlingKeys: (keyof WeaponStat)[] = ['verticalRecoil', 'horizontalRecoil', 'adsSpeed', 'reloadSpeed', 'bulletVelocity', 'dispersion'];

export function StatBreakdown({ weapon, tier, attachments }: StatBreakdownProps) {
  const stats = calculateStats(weapon, tier, attachments);
  const base = weapon.tiers[tier]?.stats;
  if (!base) return null;

  const isDolabra = weapon.name === 'Dolabra';

  if (isDolabra) {
    return (
      <section className="space-y-3">
        <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-secondary font-semibold">Stats</h2>
        <div className="p-4 border border-[rgb(var(--border-primary))] bg-surface text-center">
          <p className="text-xs text-tertiary font-mono uppercase tracking-[0.1em]">Stats Unknown</p>
          <p className="text-[9px] text-tertiary mt-1">Dolabra stat data is not available.</p>
        </div>
      </section>
    );
  }

  const renderStat = (key: keyof WeaponStat) => (
    <StatBar
      key={key}
      label={statLabel(key)}
      value={stats[key]}
      baseValue={base[key]}
      pct={normalizeStat(stats[key], key)}
      better={isHigherBetter(key)}
    />
  );

  return (
    <section className="space-y-3">
      <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-secondary font-semibold">
        Stats — Tier {weapon.tiers[tier]?.label || 'I'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-2">
          <p className="text-[8px] font-mono uppercase tracking-[0.1em] text-tertiary">Primary</p>
          {primaryKeys.map(renderStat)}
        </div>
        <div className="space-y-2">
          <p className="text-[8px] font-mono uppercase tracking-[0.1em] text-tertiary">Handling</p>
          {handlingKeys.map(renderStat)}
        </div>
      </div>
    </section>
  );
}
