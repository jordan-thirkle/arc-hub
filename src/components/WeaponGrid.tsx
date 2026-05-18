import { useState } from 'react';
import { weapons, weaponClasses } from '../data/weapons';
import type { Weapon, WeaponClass } from '../types';

interface WeaponGridProps {
  selectedId: string | null;
  onSelect: (weapon: Weapon) => void;
}

export function WeaponGrid({ selectedId, onSelect }: WeaponGridProps) {
  const [activeClass, setActiveClass] = useState<WeaponClass | 'all'>('all');

  const filtered = activeClass === 'all'
    ? weapons
    : weapons.filter((w) => w.class === activeClass);

  const groupedClasses = weaponClasses.filter((wc) =>
    weapons.some((w) => w.class === wc.class),
  );

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-secondary font-semibold">
          Weapons
        </h2>
        <span className="text-[10px] font-mono text-tertiary">{filtered.length} available</span>
      </div>

      <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Weapon class filter">
        <button
          onClick={() => setActiveClass('all')}
          className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.1em] border transition-all ${
            activeClass === 'all'
              ? 'bg-accent text-page border-accent'
              : 'text-tertiary border-[rgb(var(--border-primary))] hover:text-primary hover:border-tertiary'
          }`}
          role="tab"
          aria-selected={activeClass === 'all'}
        >
          All
        </button>
        {groupedClasses.map((wc) => (
          <button
            key={wc.class}
            onClick={() => setActiveClass(wc.class)}
            className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.1em] border transition-all ${
              activeClass === wc.class
                ? 'bg-accent text-page border-accent'
                : 'text-tertiary border-[rgb(var(--border-primary))] hover:text-primary hover:border-tertiary'
            }`}
            role="tab"
            aria-selected={activeClass === wc.class}
          >
            {wc.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2" role="listbox" aria-label="Select a weapon">
        {filtered.map((weapon) => (
          <button
            key={weapon.id}
            onClick={() => onSelect(weapon)}
            className={`text-left p-3 border transition-all ${
              selectedId === weapon.id
                ? 'border-accent bg-[rgb(var(--bg-elevated))]'
                : 'border-[rgb(var(--border-primary))] hover:border-tertiary bg-surface'
            }`}
            role="option"
            aria-selected={selectedId === weapon.id}
          >
            <div className="aspect-video bg-[rgb(var(--bg-elevated))] mb-2 flex items-center justify-center border border-[rgb(var(--border-primary))]">
              <span className="text-2xl font-mono text-tertiary">⚔</span>
            </div>
            <p className="text-xs font-semibold text-primary truncate">{weapon.name}</p>
            <p className="text-[9px] font-mono text-tertiary uppercase tracking-[0.05em] truncate">
              {weapon.ammoType} &middot; {weapon.firingMode}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
