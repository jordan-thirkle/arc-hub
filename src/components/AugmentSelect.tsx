import { useState } from 'react';
import { augments } from '../data/augments';
import type { ShieldName } from '../types';

interface AugmentSelectProps {
  selectedId: string | undefined;
  shieldId?: string;
  onSelect: (id: string | undefined) => void;
}

export function AugmentSelect({ selectedId, shieldId, onSelect }: AugmentSelectProps) {
  const [expanded, setExpanded] = useState(false);
  const selected = selectedId ? augments.find(a => a.id === selectedId) : null;

  const filtered = shieldId
    ? augments.filter(a => a.shieldCompatibility.includes(shieldId as ShieldName))
    : augments;

  const types = ['Combat', 'Looting', 'Tactical', 'Free'] as const;

  return (
    <section className="space-y-2">
      <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-secondary font-semibold">
        Augment
      </h2>
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-full p-2.5 border text-left transition-all ${
          selected ? 'border-accent/50 bg-[rgb(var(--bg-elevated))]' : 'border-[rgb(var(--border-primary))] bg-surface hover:border-tertiary'
        }`}
      >
        {selected ? (
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-primary">{selected.name}</span>
              <span className="text-[9px] font-mono text-accent">{selected.tiers[selected.tiers.length - 1]?.tier}</span>
            </div>
            <p className="text-[9px] text-tertiary mt-0.5">{selected.type}</p>
          </div>
        ) : (
          <p className="text-xs text-tertiary">No augment</p>
        )}
      </button>

      {expanded && (
        <div className="border border-[rgb(var(--border-primary))] bg-surface max-h-64 overflow-y-auto">
          {types.map(type => {
            const group = filtered.filter(a => a.type === type);
            if (group.length === 0) return null;
            return (
              <div key={type}>
                <p className="px-3 py-1.5 text-[8px] font-mono uppercase tracking-[0.1em] text-tertiary bg-[rgb(var(--bg-elevated))]">
                  {type}
                </p>
                {group.map(a => {
                  const isSelected = selectedId === a.id;
                  return (
                    <button
                      key={a.id}
                      onClick={() => { onSelect(isSelected ? undefined : a.id); setExpanded(false); }}
                      className={`w-full text-left px-3 py-2 border-b border-[rgb(var(--border-primary))] last:border-0 transition-colors hover:bg-[rgb(var(--bg-elevated))] ${
                        isSelected ? 'bg-accent/10' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-primary">{a.name}</span>
                        <span className="text-[8px] font-mono text-tertiary">{a.tiers.length} tiers</span>
                      </div>
                      <p className="text-[9px] text-tertiary mt-0.5">{a.tiers[a.tiers.length - 1]?.perkDescription}</p>
                    </button>
                  );
                })}
              </div>
            );
          })}
          <button
            onClick={() => { onSelect(undefined); setExpanded(false); }}
            className="w-full text-left px-3 py-2 text-xs text-tertiary hover:bg-[rgb(var(--bg-elevated))] transition-colors"
          >
            Clear augment
          </button>
        </div>
      )}
    </section>
  );
}
