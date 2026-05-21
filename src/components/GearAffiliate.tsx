const GEAR = [
  {
    name: 'SteelSeries Arctis Nova Pro',
    desc: 'Best gaming headset for extraction shooters',
    url: 'https://steelseries.com/arctis-nova-pro',
    tag: 'Headset',
  },
  {
    name: 'Razer DeathAdder V3 Pro',
    desc: 'Lightweight precision mouse',
    url: 'https://razer.com/deathadder-v3-pro',
    tag: 'Mouse',
  },
  { name: 'Secretlab Titan Evo', desc: 'Ergonomic gaming chair', url: 'https://secretlab.co/titan-evo', tag: 'Chair' },
];

export function GearAffiliate() {
  const handleClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-2">
      <p className="text-[8px] font-mono uppercase tracking-[0.1em] text-tertiary">Recommended Gear</p>
      <div className="space-y-1">
        {GEAR.map(item => (
          <button
            key={item.name}
            onClick={() => handleClick(item.url)}
            className="w-full text-left p-2 border border-[rgb(var(--border-primary))] bg-surface hover:border-tertiary transition-all text-[10px]"
          >
            <div className="flex items-center justify-between">
              <span className="text-primary font-medium truncate">{item.name}</span>
              <span className="text-[7px] font-mono text-tertiary uppercase ml-1 shrink-0">{item.tag}</span>
            </div>
            <p className="text-[8px] text-tertiary mt-0.5">{item.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
