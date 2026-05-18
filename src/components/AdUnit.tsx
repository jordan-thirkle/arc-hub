import { useEffect, useRef } from 'react';

interface AdUnitProps {
  slot: string;
  type?: 'carbon' | 'ethical';
  className?: string;
}

export function AdUnit({ slot, type = 'carbon', className = '' }: AdUnitProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!import.meta.env.VITE_CARBON_SERVE && !import.meta.env.VITE_ETHICALADS_ID) return;

    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';

    if (type === 'carbon') {
      const s = document.createElement('script');
      s.async = true;
      s.id = '_carbonads_js';
      s.src = `//cdn.carbonads.com/carbon.js?serve=${import.meta.env.VITE_CARBON_SERVE}&placement=${slot}`;
      container.appendChild(s);
    }

    if (type === 'ethical') {
      const s = document.createElement('script');
      s.async = true;
      s.src = 'https://media.ethicalads.io/media/client/ethicalads.min.js';
      container.appendChild(s);
      const d = document.createElement('div');
      d.className = 'ethical-ad';
      d.dataset.ethicalAdUnit = slot;
      container.appendChild(d);
    }

    return () => {
      container.innerHTML = '';
    };
  }, [slot, type]);

  if (!import.meta.env.VITE_CARBON_SERVE && !import.meta.env.VITE_ETHICALADS_ID) return null;

  return (
    <div ref={containerRef} className={`ad-unit ${className}`} />
  );
}
