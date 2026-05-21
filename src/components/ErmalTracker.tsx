import { useState, useMemo } from 'react';
import { getTraderById, ermalAcceptedItems } from '../data/traders';
import { ERMAL_TARGET_VALUES } from '../types';

const RESET_DAY = 4;
const RESET_HOUR = 10;

function getMsUntilReset(): { total: number; days: number; hours: number; minutes: number } {
  const now = new Date();
  const daysUntil = (RESET_DAY + 7 - now.getUTCDay()) % 7 || 7;
  const next = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + daysUntil, RESET_HOUR, 0, 0));
  const total = Math.max(0, next.getTime() - now.getTime());
  const days = Math.floor(total / (24 * 60 * 60 * 1000));
  const hours = Math.floor((total % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((total % (60 * 60 * 1000)) / (60 * 1000));
  return { total, days, hours, minutes };
}

export function ErmalTracker() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const ermal = getTraderById('ermal');

  const { days, hours, minutes } = useMemo(() => getMsUntilReset(), []);

  const totalValue = useMemo(() => {
    return ermalAcceptedItems.reduce((sum, item) => {
      const qty = counts[item.id] ?? 0;
      return sum + qty * item.baseValue;
    }, 0);
  }, [counts]);

  const setCount = (id: string, value: string) => {
    const num = parseInt(value, 10);
    setCounts(prev => ({ ...prev, [id]: isNaN(num) || num < 0 ? 0 : num }));
  };

  if (!ermal) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between border-b border-[rgb(var(--border-primary))] pb-3">
        <div>
          <h2 className="text-sm font-heading font-bold text-accent tracking-tight uppercase">Ermal — Nomadic Envoy</h2>
          <p className="text-[9px] text-tertiary font-mono mt-0.5">Weekly rotating stock — Topside Valuables accepted</p>
        </div>
        <div className="text-right">
          <p className="text-[8px] font-mono uppercase text-tertiary tracking-[0.1em]">Weekly Reset</p>
          <p className="text-xs font-mono text-accent">
            {days}d {hours}h {minutes}m
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="text-[10px] font-mono uppercase tracking-[0.15em] text-secondary font-semibold">
            Your Stash Inventory
          </h3>
          <div className="space-y-1 max-h-80 overflow-y-auto">
            {ermalAcceptedItems.map(item => (
              <div key={item.id} className="flex items-center gap-2 px-2 py-1.5 border border-[rgb(var(--border-primary))] bg-surface">
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-medium text-primary truncate">{item.name}</p>
                  <p className="text-[8px] font-mono text-tertiary">
                    {item.valueCategory} &middot; {item.baseValue.toLocaleString()}c each
                  </p>
                </div>
                <input
                  type="number"
                  min="0"
                  max="999"
                  value={counts[item.id] ?? 0}
                  onChange={e => setCount(item.id, e.target.value)}
                  className="w-16 px-2 py-1 text-[10px] font-mono bg-elevated border border-[rgb(var(--border-primary))] text-primary text-right focus:outline-none focus:border-accent"
                />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between px-2 py-1.5 border border-accent/50 bg-elevated">
            <p className="text-[10px] font-mono uppercase tracking-[0.1em] text-secondary">Total Value</p>
            <p className="text-sm font-mono font-bold text-accent">{totalValue.toLocaleString()}c</p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-[10px] font-mono uppercase tracking-[0.15em] text-secondary font-semibold">
            Ermal's Weekly Stock
          </h3>
          <div className="space-y-2">
            {ermal.inventory.map(item => {
              const target = ERMAL_TARGET_VALUES[item.itemId as keyof typeof ERMAL_TARGET_VALUES] ?? item.price;
              const progress = Math.min(100, (totalValue / target) * 100);
              const canAfford = totalValue >= target;
              const remaining = Math.max(0, target - totalValue);
              return (
                <div key={item.itemId} className={`border p-2 ${canAfford ? 'border-accent/60 bg-elevated' : 'border-[rgb(var(--border-primary))] bg-surface'}`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div>
                      <p className="text-[10px] font-semibold text-primary">{item.itemId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</p>
                      <p className="text-[8px] font-mono text-tertiary">{item.category} &middot; {target.toLocaleString()}c</p>
                    </div>
                    <span className={`text-[9px] font-mono ${canAfford ? 'text-accent-green' : 'text-tertiary'}`}>
                      {canAfford ? '✓ Affordable' : `${(remaining).toLocaleString()}c`}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[rgb(var(--bg-elevated))] border border-[rgb(var(--border-primary))]">
                    <div
                      className="h-full bg-accent transition-all duration-300"
                      style={{ width: `${Math.min(100, progress)}%` }}
                    />
                  </div>
                  {!canAfford && remaining > 0 && (
                    <p className="text-[7px] text-tertiary font-mono mt-1">
                      Need {(remaining / 80000).toFixed(0)} more Turbine Compressors or equivalent
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}