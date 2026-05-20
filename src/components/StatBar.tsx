import { motion } from 'framer-motion';

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
      <div className="h-1.5 bg-[rgb(var(--stat-bar-bg))] rounded-sm overflow-hidden">
        <motion.div
          className={`h-full rounded-sm ${better ? 'bg-[rgb(var(--stat-fill))]' : 'bg-danger'}`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, pct)}%` }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}
