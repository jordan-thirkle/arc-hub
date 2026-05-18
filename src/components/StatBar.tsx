interface StatBarProps {
  label: string;
  value: number;
  baseValue: number;
  pct: number;
  better: boolean;
  suffix?: string;
}

export function StatBar({ label, value, baseValue, pct, better, suffix }: StatBarProps) {
  const diff = value - baseValue;
  return (
    <div className="space-y-0.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-secondary">{label}</span>
        <span className="font-mono text-primary">
          {value}{suffix || ''}
          {diff !== 0 && (
            <span className={`ml-1 text-[10px] ${diff > 0 ? 'text-accent' : 'text-danger'}`}>
              {diff > 0 ? '+' : ''}{diff}{suffix || ''}
            </span>
          )}
        </span>
      </div>
      <div className="h-1.5 bg-[rgb(var(--stat-bar-bg))]">
        <div
          className={`h-full transition-all duration-300 ${better ? 'bg-[rgb(var(--stat-fill))]' : 'bg-danger'}`}
          style={{ width: `${Math.min(100, pct)}%` }}
        />
      </div>
    </div>
  );
}
