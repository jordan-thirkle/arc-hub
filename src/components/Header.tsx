export function Header() {
  return (
    <header className="border-b border-[rgb(var(--border-primary))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-[rgb(var(--bg-page))]" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-semibold text-primary tracking-tight leading-none">
              ARC RAIDERS
            </h1>
            <p className="text-[10px] text-tertiary font-mono uppercase tracking-[0.1em] leading-tight">
              Loadout Planner
            </p>
          </div>
        </div>
        <nav className="flex items-center gap-6" aria-label="Main navigation">
          <a href="#planner" className="text-xs text-tertiary hover:text-accent transition-colors font-mono uppercase tracking-[0.1em]">
            Planner
          </a>
          <a href="#saved" className="text-xs text-tertiary hover:text-accent transition-colors font-mono uppercase tracking-[0.1em]">
            Saved
          </a>
        </nav>
      </div>
    </header>
  );
}
