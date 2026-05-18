const BASE_URL = 'https://api.metaforge.app/v1';
const CACHE_PREFIX = 'mf_cache_';
const CACHE_TTL = 5 * 60 * 1000;

interface CacheEntry<T> {
  data: T;
  expiry: number;
}

function getCacheKey(endpoint: string): string {
  return `${CACHE_PREFIX}${endpoint}`;
}

function getFromCache<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const entry: CacheEntry<T> = JSON.parse(raw);
    if (Date.now() > entry.expiry) {
      sessionStorage.removeItem(key);
      return null;
    }
    return entry.data;
  } catch { return null; }
}

function setCache<T>(key: string, data: T): void {
  try {
    const entry: CacheEntry<T> = { data, expiry: Date.now() + CACHE_TTL };
    sessionStorage.setItem(key, JSON.stringify(entry));
  } catch { /* storage full — ignore */ }
}

export async function fetchApi<T>(endpoint: string, options?: { ttl?: number }): Promise<T> {
  const cacheKey = getCacheKey(endpoint);
  const cached = getFromCache<T>(cacheKey);
  if (cached) return cached;

  const res = await fetch(`${BASE_URL}${endpoint}`);
  if (!res.ok) throw new Error(`API ${res.status}: ${endpoint}`);

  const data: T = await res.json();
  setCache(cacheKey, data);
  return data;
}

export async function fetchWeaponStats(weaponId: string): Promise<any> {
  return fetchApi(`/weapons/${weaponId}/stats`);
}

export async function fetchPatches(): Promise<any> {
  return fetchApi('/patches');
}

export async function fetchLeaderboards(): Promise<any> {
  return fetchApi('/leaderboards/meta-builds', { ttl: 60 * 1000 });
}

export function clearCache(): void {
  const keys: string[] = [];
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key?.startsWith(CACHE_PREFIX)) keys.push(key);
  }
  keys.forEach(k => sessionStorage.removeItem(k));
}
