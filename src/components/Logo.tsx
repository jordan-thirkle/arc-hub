interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ className = '', size = 'md', showText = true }: LogoProps) {
  const iconSizes = { sm: 28, md: 38, lg: 52 };
  const subSizes = { sm: 'text-[8px]', md: 'text-[10px]', lg: 'text-xs' };
  const iconSize = iconSizes[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex-shrink-0">
        <svg width={iconSize} height={iconSize} viewBox="0 0 48 48" fill="none" aria-label="ARC Hub logo">
          <defs>
            <radialGradient id="logo-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E8A832" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#E8A832" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="24" cy="24" r="22" fill="url(#logo-glow)" />
          <polygon
            points="24,4 42,14 42,34 24,44 6,34 6,14"
            stroke="#E8A832"
            strokeWidth="2"
            fill="none"
            className="opacity-80"
          />
          <polygon
            points="24,4 42,14 42,34 24,44 6,34 6,14"
            stroke="#E8A832"
            strokeWidth="2"
            fill="none"
            className="opacity-80"
            transform="scale(0.85) translate(3.6, 3.6)"
          />
          <polyline
            points="18,26 24,16 30,26"
            stroke="#E8A832"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <line
            x1="24"
            y1="16"
            x2="24"
            y2="32"
            stroke="#E8A832"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.4"
          />
        </svg>
      </div>
      {showText && (
        <div className="text-left">
          <div
            className="font-display font-bold text-accent tracking-tight leading-none"
            style={{ fontSize: size === 'sm' ? '14px' : size === 'md' ? '20px' : '32px' }}
          >
            ARC
          </div>
          <div className={`${subSizes[size]} font-mono text-tertiary uppercase tracking-[0.15em] leading-tight`}>
            HUB
          </div>
        </div>
      )}
    </div>
  );
}
