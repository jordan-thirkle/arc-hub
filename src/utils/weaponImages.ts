const CDN_BASE = 'https://cdn.metaforge.app/arc-raiders/icons';
const LOCAL_FALLBACKS: Record<string, string> = {
  bettina: '/images/bettina.svg',
};

const GENERIC_FALLBACK = '/images/weapon-fallback.svg';

export function getWeaponImageUrl(weaponId: string): string {
  return `${CDN_BASE}/${weaponId}.webp`;
}

export function getWeaponFallbackUrl(weaponId: string): string {
  return LOCAL_FALLBACKS[weaponId] || GENERIC_FALLBACK;
}
