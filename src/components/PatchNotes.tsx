import { patches, latestPatch } from '../data/patches';
import { getWeaponById } from '../data/weapons';

interface PatchNotesProps {
  highlightVersion?: string;
  compact?: boolean;
}

export function PatchNotes({ highlightVersion, compact }: PatchNotesProps) {
  if (compact) {
    return (
      <div className="space-y-3">
        <p className="text-[8px] font-mono uppercase text-tertiary tracking-[0.1em]">Recent Patches</p>
        {patches
          .slice(-2)
          .reverse()
          .map(p => (
            <div key={p.id} className="border border-[rgb(var(--border-primary))] bg-surface p-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-semibold text-primary">Patch {p.version}</span>
                <span className="text-[8px] text-tertiary font-mono">{p.date}</span>
              </div>
              <p className="text-[8px] text-tertiary mb-1">{p.title}</p>
              <ul className="space-y-0.5">
                {p.changes.slice(0, 3).map((c, i) => (
                  <li key={i} className="text-[8px] text-secondary pl-2 border-l border-[rgb(var(--border-primary))]">
                    {c}
                  </li>
                ))}
                {p.changes.length > 3 && (
                  <li className="text-[7px] text-tertiary pl-2">+{p.changes.length - 3} more</li>
                )}
              </ul>
            </div>
          ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[10px] font-mono uppercase tracking-[0.1em] text-secondary font-semibold">Patch History</h3>
        <span className="text-[8px] text-tertiary font-mono">{patches.length} patches</span>
      </div>
      <div className="relative">
        <div className="absolute left-2 top-0 bottom-0 w-px bg-[rgb(var(--border-primary))]" />
        <div className="space-y-4">
          {[...patches].reverse().map(p => {
            const isHighlighted = p.version === highlightVersion;
            const isLatest = p.version === latestPatch.version;
            const weapons: NonNullable<ReturnType<typeof getWeaponById>>[] = (p.weaponsAffected ?? [])
              .map(id => getWeaponById(id))
              .filter((w): w is NonNullable<typeof w> => w != null);

            return (
              <div key={p.id} className={`relative pl-6 ${isHighlighted ? 'bg-accent/5 -mx-2 px-2 rounded-sm' : ''}`}>
                <div
                  className={`absolute left-1.5 top-1.5 w-2 h-2 rounded-full border-2 ${
                    isLatest ? 'bg-accent border-accent' : 'bg-surface border-[rgb(var(--border-primary))]'
                  }`}
                />
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-primary">Patch {p.version}</span>
                  {isLatest && (
                    <span className="text-[7px] px-1 py-0.5 bg-accent text-page font-mono uppercase tracking-[0.1em]">
                      Latest
                    </span>
                  )}
                  <span className="text-[9px] text-tertiary font-mono">{p.date}</span>
                </div>
                <p className="text-[10px] text-secondary mb-1.5 italic">{p.title}</p>
                <ul className="space-y-1 mb-1.5">
                  {p.changes.map((c, i) => (
                    <li
                      key={i}
                      className="text-[9px] text-primary pl-3 border-l border-[rgb(var(--border-primary))] leading-tight"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
                {weapons.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {weapons.map(w => (
                      <span
                        key={w.id}
                        className="text-[7px] px-1 py-0.5 border border-[rgb(var(--border-primary))] text-tertiary font-mono uppercase"
                      >
                        {w.name}
                      </span>
                    ))}
                    <span className="text-[7px] text-tertiary font-mono self-center">affected</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
