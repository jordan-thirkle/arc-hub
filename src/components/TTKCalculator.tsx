import { useState } from 'react';
import { calculateTTK, getTargetColor, TARGET_LABELS, TARGET_SHIELD_HP } from '../utils/ttk';
import type { TargetType } from '../utils/ttk';
import type { Weapon, WeaponTier, BuildAttachment } from '../types';

interface TTKCalculatorProps {
  weapon: Weapon;
  tier: WeaponTier;
  attachments: BuildAttachment[];
}

const targets: TargetType[] = ['unshielded', 'light', 'medium', 'heavy'];

export function TTKCalculator({ weapon, tier, attachments }: TTKCalculatorProps) {
  const [hoveredTarget, setHoveredTarget] = useState<TargetType | null>(null);

  const results = targets.reduce(
    (acc, t) => {
      acc[t] = calculateTTK(weapon, tier, attachments, t);
      return acc;
    },
    {} as Record<TargetType, ReturnType<typeof calculateTTK>>,
  );

  return (
    <section className="space-y-2">
      <h2 className="text-[10px] font-mono uppercase tracking-[0.15em] text-secondary font-semibold">TTK Analysis</h2>
      <div className="grid grid-cols-4 gap-1">
        {targets.map(target => {
          const r = results[target];
          const isHovered = hoveredTarget === target;
          return (
            <div
              key={target}
              onMouseEnter={() => setHoveredTarget(target)}
              onMouseLeave={() => setHoveredTarget(null)}
              className={`border p-2 transition-all cursor-default ${
                isHovered ? 'border-accent bg-elevated' : 'border-[rgb(var(--border-primary))] bg-surface'
              }`}
              style={{ borderColor: isHovered ? undefined : undefined }}
            >
              <p
                className="text-[7px] font-mono uppercase tracking-[0.1em] mb-1"
                style={{ color: getTargetColor(target) }}
              >
                {TARGET_LABELS[target]}
              </p>
              {isHovered ? (
                <div className="space-y-0.5">
                  <p className="text-[8px] font-mono text-tertiary">
                    Shield: <span className="text-primary">{r.shieldShots} shots</span>
                  </p>
                  <p className="text-[8px] font-mono text-tertiary">
                    Flesh: <span className="text-primary">{r.fleshShots} shots</span>
                  </p>
                  <p className="text-[8px] font-mono text-tertiary">
                    eDPS: <span className="text-accent">{r.effectiveDps.toFixed(0)}</span>
                  </p>
                </div>
              ) : (
                <div>
                  <p
                    className="text-xs font-mono font-bold"
                    style={{ color: r.ttk < 1 ? '#4CAF50' : r.ttk < 2 ? '#FFC107' : '#F44336' }}
                  >
                    {r.ttk.toFixed(2)}s
                  </p>
                  <p className="text-[8px] font-mono text-tertiary">{r.shotsToKill} shots</p>
                  {target !== 'unshielded' && (
                    <p className="text-[7px] font-mono text-tertiary">HP: {TARGET_SHIELD_HP[target]}</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
