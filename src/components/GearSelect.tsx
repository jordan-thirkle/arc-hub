interface GearItem {
  id: string;
  name: string;
  type: 'helmet' | 'vest' | 'backpack' | 'augment';
  tier: number;
  description: string;
}

interface GearSelectProps {
  selected: Record<string, string | null>;
  onSelect: (type: string, id: string | null) => void;
}

const gearData: GearItem[] = [
  { id: 'light-helmet', name: 'Light Helmet', type: 'helmet', tier: 1, description: 'Minimal head protection' },
  { id: 'medium-helmet', name: 'Medium Helmet', type: 'helmet', tier: 2, description: 'Moderate head protection' },
  { id: 'heavy-helmet', name: 'Heavy Helmet', type: 'helmet', tier: 3, description: 'Maximum head protection' },
  { id: 'light-vest', name: 'Light Vest', type: 'vest', tier: 1, description: 'Minimal torso protection' },
  { id: 'medium-vest', name: 'Medium Vest', type: 'vest', tier: 2, description: 'Moderate torso protection' },
  { id: 'heavy-vest', name: 'Heavy Vest', type: 'vest', tier: 3, description: 'Maximum torso protection' },
  { id: 'small-backpack', name: 'Small Backpack', type: 'backpack', tier: 1, description: '14 slots' },
  { id: 'medium-backpack', name: 'Medium Backpack', type: 'backpack', tier: 2, description: '18 slots' },
  { id: 'large-backpack', name: 'Large Backpack', type: 'backpack', tier: 3, description: '24 slots' },
];

export function GearSelect({ selected, onSelect }: GearSelectProps) {
  const types = ['helmet', 'vest', 'backpack'] as const;
  const labels: Record<string, string> = { helmet: 'Helmet', vest: 'Vest', backpack: 'Backpack' };

  return (
    <section className="space-y-3">
      <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-secondary font-semibold">
        Gear
      </h2>
      <div className="grid grid-cols-3 gap-2">
        {types.map((type) => {
          const items = gearData.filter((g) => g.type === type);
          const selectedId = selected[type];
          const selectedItem = selectedId ? items.find((i) => i.id === selectedId) : null;

          return (
            <div key={type} className="relative">
              <select
                value={selectedId || ''}
                onChange={(e) => onSelect(type, e.target.value || null)}
                className="w-full p-3 text-xs bg-surface border border-[rgb(var(--border-primary))] text-primary focus:outline-none focus:border-accent appearance-none cursor-pointer"
                aria-label={labels[type]}
              >
                <option value="">— {labels[type]} —</option>
                {items.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              {selectedItem && (
                <p className="text-[9px] text-tertiary mt-1 px-1">{selectedItem.description}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
