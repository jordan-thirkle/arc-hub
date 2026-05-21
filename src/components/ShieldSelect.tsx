import { shields } from '../data/shields';

interface ShieldSelectProps {
  selectedId: string | undefined;
  onSelect: (id: string | undefined) => void;
}

export function ShieldSelect({ selectedId, onSelect }: ShieldSelectProps) {
  const selected = selectedId ? shields.find(s => s.id === selectedId) : null;

  return (
    <section className="space-y-2">
      <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-secondary font-semibold">Shield</h2>
      <div className="flex gap-1.5">
        <button
          onClick={() => onSelect(undefined)}
          className={`flex-1 py-2 min-h-10 text-[10px] font-mono uppercase tracking-[0.1em] border rounded-sm transition-all ${
            !selected
              ? 'bg-accent text-page border-accent shadow-glow-accent'
              : 'text-tertiary border-[rgb(var(--border-primary))] hover:text-primary hover:border-tertiary'
          }`}
        >
          None
        </button>
        {shields.map(s => (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={`flex-1 py-2 min-h-10 text-[10px] font-mono uppercase tracking-[0.1em] border rounded-sm transition-all ${
              selectedId === s.id
                ? 'bg-accent text-page border-accent shadow-glow-accent'
                : 'text-tertiary border-[rgb(var(--border-primary))] hover:text-primary hover:border-tertiary'
            }`}
          >
            {s.name.replace(' Shield', '')}
          </button>
        ))}
      </div>
      {selected && (
        <div className="grid grid-cols-2 gap-2 p-2 border border-[rgb(var(--border-primary))] rounded-md bg-surface">
          <div>
            <p className="text-[8px] font-mono uppercase text-tertiary">Charge</p>
            <p className="text-xs font-mono text-primary">{selected.charge}</p>
          </div>
          <div>
            <p className="text-[8px] font-mono uppercase text-tertiary">Mitigation</p>
            <p className="text-xs font-mono text-primary">{Math.round(selected.damageMitigation * 100)}%</p>
          </div>
          <div>
            <p className="text-[8px] font-mono uppercase text-tertiary">Move Penalty</p>
            <p className="text-xs font-mono text-primary">{Math.round(selected.movementPenalty * 100)}%</p>
          </div>
          <div>
            <p className="text-[8px] font-mono uppercase text-tertiary">Weight</p>
            <p className="text-xs font-mono text-primary">{selected.weight}kg</p>
          </div>
        </div>
      )}
    </section>
  );
}
