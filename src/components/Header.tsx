interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  savedCount?: number;
}

const tabs = [
  { id: 'planner', label: 'Planner' },
  { id: 'builds', label: 'Builds' },
  { id: 'database', label: 'Database' },
  { id: 'skills', label: 'Skills' },
  { id: 'craft', label: 'Craft' },
];

export function Header({ activeTab, onTabChange, savedCount = 0 }: HeaderProps) {
  return (
    <header className="border-b border-[rgb(var(--border-primary))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-accent flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-[rgb(var(--bg-page))]" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xs font-semibold text-primary tracking-tight leading-none">ARC RAIDERS</h1>
              <p className="text-[8px] text-tertiary font-mono uppercase tracking-[0.1em] leading-tight">Loadout Planner</p>
            </div>
          </div>
        </div>
        <nav className="flex gap-0 -mb-px" role="tablist" aria-label="Sections">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-2 text-[10px] font-mono uppercase tracking-[0.1em] border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'text-accent border-accent'
                  : 'text-tertiary border-transparent hover:text-primary hover:border-tertiary'
              }`}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
              {tab.id === 'planner' && savedCount > 0 && (
                <span className="ml-1 px-1 py-0.5 text-[7px] bg-accent text-page rounded-full">{savedCount}</span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
