interface TabPanelProps {
  tabs: { id: string; label: string; badge?: number }[];
  active: string;
  onChange: (id: string) => void;
  children: React.ReactNode;
}

export function TabPanel({ tabs, active, onChange, children }: TabPanelProps) {
  return (
    <div>
      <div className="flex border-b border-[rgb(var(--border-primary))]" role="tablist">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative px-4 py-3 text-[11px] font-mono uppercase tracking-[0.1em] transition-all ${
              active === tab.id
                ? 'text-accent border-b-2 border-accent'
                : 'text-tertiary hover:text-primary'
            }`}
            role="tab"
            aria-selected={active === tab.id}
          >
            {tab.label}
            {tab.badge !== undefined && tab.badge > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 text-[8px] bg-accent text-page rounded-full">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="pt-4" role="tabpanel">
        {children}
      </div>
    </div>
  );
}
