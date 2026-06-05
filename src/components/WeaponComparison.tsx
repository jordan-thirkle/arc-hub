import { useState } from 'react';
import { weapons, getWeaponById } from '../data/weapons';
import { calculateStats, statLabel, isHigherBetter, normalizeStat } from '../utils/stats';
import type { WeaponTier, WeaponStat } from '../types';

const TIERS: WeaponTier[] = [0, 1, 2, 3];

export function WeaponComparison() {
  const [weaponAId, setWeaponAId] = useState('kettle');
  const [tierA, setTierA] = useState<WeaponTier>(0);
  const [weaponBId, setWeaponBId] = useState('rattler');
  const [tierB, setTierB] = useState<WeaponTier>(0);

  const weaponA = getWeaponById(weaponAId);
  const weaponB = getWeaponById(weaponBId);

  const statsA = weaponA ? calculateStats(weaponA, tierA, []) : null;
  const statsB = weaponB ? calculateStats(weaponB, tierB, []) : null;

  const allStatKeys: (keyof WeaponStat)[] = [
    'damage',
    'fireRate',
    'range',
    'dps',
    'magSize',
    'verticalRecoil',
    'horizontalRecoil',
    'adsSpeed',
    'reloadSpeed',
    'bulletVelocity',
    'dispersion',
  ];

  const handleClose = () => {
    const btn = document.getElementById('toggle-compare');
    if (btn) btn.click();
  };

  return (
    <div className="space-y-4 p-4 border border-accent/30 bg-surface/80">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-secondary font-semibold">
          Weapon Compare
        </h2>
        <button
          onClick={handleClose}
          className="text-[8px] font-mono uppercase tracking-[0.1em] text-tertiary hover:text-primary px-2 py-1 border border-[rgb(var(--border-primary))]"
        >
          Close
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            label: 'Weapon A',
            weaponId: weaponAId,
            setWeaponId: setWeaponAId,
            tier: tierA,
            setTier: setTierA,
            weapon: weaponA,
            stats: statsA,
          },
          {
            label: 'Weapon B',
            weaponId: weaponBId,
            setWeaponId: setWeaponBId,
            tier: tierB,
            setTier: setTierB,
            weapon: weaponB,
            stats: statsB,
          },
        ].map(slot => (
          <div key={slot.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono uppercase tracking-[0.1em] text-secondary">{slot.label}</span>
            </div>
            <select
              value={slot.weaponId}
              onChange={e => slot.setWeaponId(e.target.value)}
              className="w-full px-2 py-1.5 text-[10px] bg-surface border border-[rgb(var(--border-primary))] text-primary focus:outline-none focus:border-accent font-mono"
            >
              {weapons.map(w => (
                <option key={w.id} value={w.id}>
                  {w.name}
                </option>
              ))}
            </select>
            <div className="flex gap-1">
              {TIERS.map(t => {
                const td = slot.weapon?.tiers[t];
                if (!td || td.value === 0) return null;
                return (
                  <button
                    key={t}
                    onClick={() => slot.setTier(t)}
                    className={`flex-1 py-1.5 text-[9px] font-mono uppercase tracking-[0.1em] border transition-all ${
                      slot.tier === t
                        ? 'bg-accent text-page border-accent'
                        : 'text-tertiary border-[rgb(var(--border-primary))] hover:text-primary'
                    }`}
                  >
                    {td.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {statsA && statsB && (
        <div className="space-y-2">
          <p className="text-[8px] font-mono uppercase tracking-[0.1em] text-tertiary">Stat Comparison</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
            {allStatKeys.map(key => {
              const valA = statsA[key];
              const valB = statsB[key];
              const diff = valA - valB;
              const better = isHigherBetter(key);
              const winnerA = diff > 0 && better;
              const winnerB = diff < 0 && better;
              const loserA = diff < 0 && better;
              const loserB = diff > 0 && better;

              return (
                <div key={key} className="grid grid-cols-[80px_1fr_auto] items-center gap-1.5 text-[9px]">
                  <span className="text-tertiary font-mono truncate">{statLabel(key)}</span>
                  <div className="flex items-center gap-1">
                    <span
                      className={`font-mono w-8 text-right ${winnerA ? 'text-green-400' : loserA ? 'text-red-400' : 'text-primary'}`}
                    >
                      {valA}
                    </span>
                    <div className="flex-1 h-2 bg-[rgb(var(--stat-bar-bg))] relative">
                      <div
                        className="absolute inset-y-0 left-0 bg-accent/60 transition-all"
                        style={{ width: `${normalizeStat(valA, key)}%` }}
                      />
                    </div>
                    <div className="flex-1 h-2 bg-[rgb(var(--stat-bar-bg))] relative">
                      <div
                        className="absolute inset-y-0 right-0 bg-blue-400/60 transition-all"
                        style={{ width: `${normalizeStat(valB, key)}%` }}
                      />
                    </div>
                    <span
                      className={`font-mono w-8 text-left ${winnerB ? 'text-blue-400' : loserB ? 'text-red-400' : 'text-primary'}`}
                    >
                      {valB}
                    </span>
                  </div>
                  <span
                    className={`font-mono text-[8px] w-10 text-right ${
                      diff > 0
                        ? better
                          ? 'text-green-400'
                          : 'text-red-400'
                        : diff < 0
                          ? better
                            ? 'text-red-400'
                            : 'text-green-400'
                          : 'text-tertiary'
                    }`}
                  >
                    {diff > 0 ? `+${diff}` : diff < 0 ? `${diff}` : '—'}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-3 text-[8px] text-tertiary font-mono pt-1 border-t border-[rgb(var(--border-primary))]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-accent/60 inline-block" /> {weaponA?.name || 'A'}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-400/60 inline-block" /> {weaponB?.name || 'B'}
            </span>
            <span className="text-tertiary">Δ = difference</span>
          </div>
        </div>
      )}
    </div>
  );
}
