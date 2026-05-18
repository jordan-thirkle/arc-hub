import { useState, useMemo } from 'react';
import { weapons, getWeaponsByClass } from '../data/weapons';
import { AMMO_COLORS } from '../types';
import type { Weapon, WeaponClass, WeaponTier } from '../types';

const CLASS_LABELS: Record<WeaponClass, string> = {
  'Assault Rifle': 'AR', 'Battle Rifle': 'BR', 'SMG': 'SMG',
  'Shotgun': 'SG', 'Sniper Rifle': 'SR', 'LMG': 'LMG',
  'Pistol': 'Pistol', 'Hand Cannon': 'HC', 'Special': 'Special',
};

interface WeaponSelectorProps {
  selectedId: string;
  selectedTier: WeaponTier;
  onSelect: (weapon: Weapon, tier: WeaponTier) => void;
  label?: string;
}

export function WeaponSelector({ selectedId, selectedTier, onSelect, label = 'Primary' }: WeaponSelectorProps) {
  const [activeClass, setActiveClass] = useState<WeaponClass | 'all'>('all');
  const [expanded, setExpanded] = useState(false);
  const [selectedImgError, setSelectedImgError] = useState(false);
  const [gridImgErrors, setGridImgErrors] = useState<Set<string>>(new Set());

  const classes = useMemo(() => {
    const set = new Set<WeaponClass>(weapons.map(w => w.class));
    return Array.from(set);
  }, []);

  const filtered = activeClass === 'all' ? weapons : getWeaponsByClass(activeClass);
  const selected = weapons.find(w => w.id === selectedId);

  const handleSelect = (w: Weapon) => {
    onSelect(w, selectedTier);
    setExpanded(false);
  };

  const imgSrc = selected ? `https://cdn.metaforge.app/arc-raiders/icons/${selected.id}.webp` : '';

  const handleSelection = (w: Weapon) => {
    setSelectedImgError(false);
    handleSelect(w);
  };

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-secondary font-semibold">
          {label} Weapon
        </h2>
        {selected && (
          <span className="text-[10px] font-mono" style={{ color: AMMO_COLORS[selected.ammoType] }}>
            {selected.ammoType.toUpperCase()}
          </span>
        )}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-3 border border-[rgb(var(--border-primary))] bg-surface hover:border-tertiary transition-all text-left"
        aria-expanded={expanded}
      >
        {selected ? (
          <div className="flex items-center gap-3">
            <div className="w-14 h-10 bg-[rgb(var(--bg-elevated))] flex items-center justify-center border border-[rgb(var(--border-primary))]">
              {selectedImgError || selected.ammoType === 'energy' ? (
                <span className="text-lg">⚔</span>
              ) : (
                <img src={imgSrc} alt={selected.name} className="w-full h-full object-contain"
                  onError={() => setSelectedImgError(true)} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-primary truncate">{selected.name}</p>
              <p className="text-[9px] font-mono text-tertiary uppercase">
                {selected.firingMode} &middot; {selected.tiers[selectedTier]?.label || 'I'}
              </p>
            </div>
            <span className="text-[10px] px-2 py-0.5 font-mono" style={{
              backgroundColor: AMMO_COLORS[selected.ammoType] + '22',
              color: AMMO_COLORS[selected.ammoType],
              border: `1px solid ${AMMO_COLORS[selected.ammoType]}44`,
            }}>
              {CLASS_LABELS[selected.class]}
            </span>
          </div>
        ) : (
          <p className="text-xs text-tertiary">Select a weapon...</p>
        )}
      </button>

      {selected && (
        <div className="flex gap-1.5">
          {([0, 1, 2, 3] as WeaponTier[]).map(t => {
            const td = selected.tiers[t];
            if (!td || td.value === 0) return null;
            return (
              <button
                key={t}
                onClick={() => onSelect(selected, t)}
                className={`flex-1 py-2 min-h-10 text-[10px] font-mono uppercase tracking-[0.1em] border transition-all ${
                  selectedTier === t
                    ? 'bg-accent text-page border-accent'
                    : 'text-tertiary border-[rgb(var(--border-primary))] hover:text-primary hover:border-tertiary'
                }`}
              >
                {td.label}
              </button>
            );
          })}
        </div>
      )}

      {expanded && (
        <div className="border border-[rgb(var(--border-primary))] bg-surface max-h-80 overflow-hidden flex flex-col">
          <div className="flex gap-1 p-2 overflow-x-auto flex-nowrap border-b border-[rgb(var(--border-primary))] scrollbar-none" role="tablist">
            <button onClick={() => setActiveClass('all')}
              className={`px-3 py-2 min-h-10 text-[9px] font-mono uppercase tracking-[0.1em] border transition-all ${
                activeClass === 'all' ? 'bg-accent text-page border-accent' : 'text-tertiary border-[rgb(var(--border-primary))]'
              }`}>
              All
            </button>
            {classes.map(cls => (
              <button key={cls} onClick={() => setActiveClass(cls)}
                className={`px-3 py-2 min-h-10 text-[9px] font-mono uppercase tracking-[0.1em] border transition-all ${
                  activeClass === cls ? 'bg-accent text-page border-accent' : 'text-tertiary border-[rgb(var(--border-primary))]'
                }`}>
                {CLASS_LABELS[cls]}
              </button>
            ))}
          </div>
          <div className="overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-1 p-2" role="listbox">
            {filtered.map(w => {
              const isSelected = selectedId === w.id;
              const isDolabra = w.name === 'Dolabra';
              return (
                <button
                  key={w.id}
                  onClick={() => handleSelection(w)}
                  className={`text-left p-2 border transition-all ${
                    isSelected ? 'border-accent bg-[rgb(var(--bg-elevated))]' : 'border-[rgb(var(--border-primary))] hover:border-tertiary'
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="aspect-video bg-[rgb(var(--bg-elevated))] mb-1 flex items-center justify-center border border-[rgb(var(--border-primary))]">
                    {isDolabra || w.ammoType === 'energy' || gridImgErrors.has(w.id) ? (
                      <span className="text-lg text-tertiary">⚔</span>
                    ) : (
                      <img src={`https://cdn.metaforge.app/arc-raiders/icons/${w.id}.webp`} alt={w.name}
                        className="w-full h-full object-contain"
                        onError={() => setGridImgErrors(prev => new Set(prev).add(w.id))} />
                    )}
                  </div>
                  <p className="text-[11px] font-semibold text-primary truncate">{w.name}</p>
                  <p className="text-[8px] font-mono text-tertiary uppercase tracking-[0.05em]">
                    {w.ammoType} &middot; {w.firingMode}
                  </p>
                  {isDolabra && (
                    <span className="inline-block mt-1 px-1 py-0.5 text-[7px] font-mono bg-danger/20 text-danger uppercase tracking-[0.1em]">
                      Stats Unknown
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
