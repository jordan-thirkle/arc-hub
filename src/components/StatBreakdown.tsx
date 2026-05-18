import type { Weapon, WeaponStat, AttachmentSlot } from '../types';
import { calculateStats, statLabel, isHigherBetter, normalizeStat } from '../utils/stats';

interface StatBreakdownProps {
  weapon: Weapon;
  equipped: Record<AttachmentSlot, string | null>;
}

const primaryKeys: (keyof WeaponStat)[] = ['damage', 'fireRate', 'range', 'dps', 'magSize'];
const handlingKeys: (keyof WeaponStat)[] = ['verticalRecoil', 'horizontalRecoil', 'adsSpeed', 'reloadSpeed', 'bulletVelocity', 'dispersion'];

function StatRow({ label, value, baseValue, pct, better }: {
  label: string;
  value: number;
  baseValue: number;
  pct: number;
  better: boolean;
}) {
  const diff = value - baseValue;
  return (
    <div className="space-y-0.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-secondary">{label}</span>
        <span className="font-mono text-primary">
          {value}
          {diff !== 0 && (
            <span className={`ml-1 text-[10px] ${diff > 0 ? 'text-[rgb(var(--accent))]' : 'text-danger'}`}>
              {diff > 0 ? '+' : ''}{diff}
            </span>
          )}
        </span>
      </div>
      <div className="h-1.5 bg-[rgb(var(--stat-bar-bg))]">
        <div
          className={`h-full transition-all duration-300 ${better ? 'bg-[rgb(var(--stat-fill))]' : 'bg-danger'}`}
          style={{ width: `${Math.min(100, pct)}%` }}
        />
      </div>
    </div>
  );
}

export function StatBreakdown({ weapon, equipped }: StatBreakdownProps) {
  const stats = calculateStats(weapon, equipped);

  return (
    <section className="space-y-4">
      <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-secondary font-semibold">
        Stats
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-[9px] font-mono uppercase tracking-[0.1em] text-tertiary">Primary</p>
          {primaryKeys.map((key) => (
            <StatRow
              key={key}
              label={statLabel(key)}
              value={stats[key]}
              baseValue={weapon.baseStats[key]}
              pct={normalizeStat(stats[key], key)}
              better={isHigherBetter(key)}
            />
          ))}
        </div>
        <div className="space-y-2">
          <p className="text-[9px] font-mono uppercase tracking-[0.1em] text-tertiary">Handling</p>
          {handlingKeys.map((key) => (
            <StatRow
              key={key}
              label={statLabel(key)}
              value={stats[key]}
              baseValue={weapon.baseStats[key]}
              pct={normalizeStat(stats[key], key)}
              better={isHigherBetter(key)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
