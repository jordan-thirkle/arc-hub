import { useState } from 'react';
import { quickUseItems, getItemsByCategory } from '../data/quickuse';
import type { QuickUseCategory } from '../types';

interface QuickUseSlotsProps {
  items: (string | null)[];
  onSetItem: (slot: number, itemId: string | null) => void;
  maxSlots?: number;
}

export function QuickUseSlots({ items, onSetItem, maxSlots = 5 }: QuickUseSlotsProps) {
  const [openSlot, setOpenSlot] = useState<number | null>(null);
  const [category, setCategory] = useState<QuickUseCategory | 'all'>('all');

  const categories: (QuickUseCategory | 'all')[] = [
    'all',
    'Medical',
    'Shield',
    'Stamina',
    'Grenade',
    'Utility',
    'Trap',
  ];

  const slotItems = () => {
    if (category === 'all') return quickUseItems;
    return getItemsByCategory(category);
  };

  return (
    <section className="space-y-2">
      <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-secondary font-semibold">Quick Use</h2>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
        {Array.from({ length: maxSlots }).map((_, i) => {
          const itemId = items[i];
          const item = itemId ? quickUseItems.find(q => q.id === itemId) : null;
          const isOpen = openSlot === i;

          return (
            <div key={i} className="relative">
              <button
                onClick={() => setOpenSlot(isOpen ? null : i)}
                className={`w-full aspect-square p-1 border rounded-md transition-all flex flex-col items-center justify-center text-center ${
                  item
                    ? 'border-accent/50 bg-[rgb(var(--bg-elevated))] shadow-glow-accent'
                    : 'border-[rgb(var(--border-primary))] bg-surface hover:border-tertiary hover:shadow-sm'
                }`}
                aria-label={`Quick use slot ${i + 1}`}
              >
                {item ? (
                  <>
                    <span className="text-[9px] font-semibold text-primary leading-tight">{item.name}</span>
                    <span className="text-[6px] text-tertiary mt-0.5">{item.weight}kg</span>
                  </>
                ) : (
                  <span className="text-[9px] text-tertiary">Slot {i + 1}</span>
                )}
              </button>

              {isOpen && (
                <div
                  className="absolute z-20 top-full left-0 mt-1 w-64 border border-[rgb(var(--border-primary))] bg-surface rounded-md shadow-elevated"
                  role="listbox"
                >
                  <div className="flex flex-wrap gap-0.5 p-1.5 border-b border-[rgb(var(--border-primary))]">
                    {categories.map(c => (
                      <button
                        key={c}
                        onClick={() => setCategory(c)}
                        className={`px-1.5 py-0.5 text-[8px] font-mono uppercase tracking-[0.1em] border rounded-sm transition-all ${
                          category === c
                            ? 'bg-accent text-page border-accent'
                            : 'text-tertiary border-[rgb(var(--border-primary))]'
                        }`}
                      >
                        {c === 'all' ? 'All' : c}
                      </button>
                    ))}
                  </div>
                  <div className="max-h-40 overflow-y-auto">
                    <button
                      onClick={() => {
                        onSetItem(i, null);
                        setOpenSlot(null);
                      }}
                      className={`w-full text-left px-2 py-1.5 text-[10px] transition-colors hover:bg-[rgb(var(--bg-elevated))] ${
                        !item ? 'text-accent' : 'text-tertiary'
                      }`}
                    >
                      Empty
                    </button>
                    {slotItems().map(q => (
                      <button
                        key={q.id}
                        onClick={() => {
                          onSetItem(i, q.id);
                          setOpenSlot(null);
                        }}
                        className={`w-full text-left px-2 py-1.5 text-[10px] transition-colors hover:bg-[rgb(var(--bg-elevated))] ${
                          itemId === q.id ? 'text-accent bg-accent/10' : 'text-primary'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{q.name}</span>
                          <span className="text-[8px] text-tertiary">{q.weight}kg</span>
                        </div>
                        <p className="text-[8px] text-tertiary">{q.effect}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
