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
    <header className="border-b border-[rgb(var(--border-primary))] bg-page/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2.5">
          <div className="flex items-center gap-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 48 48"
              fill="none"
              aria-label="Logo mark"
              className="flex-shrink-0"
            >
              <polygon
                points="24,6 40,15 40,33 24,42 8,33 8,15"
                stroke="#E8A832"
                strokeWidth="2"
                fill="none"
                opacity="0.8"
              />
              <polyline
                points="19,27 24,18 29,27"
                stroke="#E8A832"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            <div>
              <h1 className="font-display font-bold text-accent text-sm tracking-tight leading-none">LOADOUT</h1>
              <p className="text-[8px] text-tertiary font-mono uppercase tracking-[0.15em] leading-tight">PLANNER</p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://ko-fi.com/thirkle"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9px] font-mono uppercase tracking-[0.1em] text-tertiary hover:text-accent transition-colors px-2 py-1 border border-border-primary rounded-[2px]"
                title="Support on Ko-fi"
              >
                &#9749; Ko-fi
              </a>
            </div>
          </div>
        </div>
        <nav className="flex gap-0 -mb-px" role="tablist" aria-label="Sections">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-2 text-[10px] font-mono uppercase tracking-[0.1em] border-b-2 transition-all duration-200 rounded-t-sm ${
                activeTab === tab.id
                  ? 'text-accent border-accent'
                  : 'text-tertiary border-transparent hover:text-primary hover:border-tertiary'
              }`}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
              {tab.id === 'planner' && savedCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 text-[7px] bg-accent text-page rounded-full font-semibold">
                  {savedCount}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
