import { useState, useEffect, useCallback, useRef } from 'react';

export type DataSource = 'live' | 'cached' | 'static';

export interface LiveDataResult<T> {
  data: T;
  source: DataSource;
  lastUpdated: Date | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useLiveData<T>(
  fetcher: () => Promise<T>,
  fallback: T,
  cacheKey?: string,
): LiveDataResult<T> {
  const [data, setData] = useState<T>(() => {
    if (cacheKey) {
      try {
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) return JSON.parse(cached);
      } catch { /* ignore */ }
    }
    return fallback;
  });
  const [source, setSource] = useState<DataSource>(cacheKey ? 'cached' : 'static');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const result = await fetcher();
      clearTimeout(timeoutId);

      if (!mountedRef.current) return;
      setData(result);
      setSource('live');
      const now = new Date();
      setLastUpdated(now);

      if (cacheKey) {
        try { sessionStorage.setItem(cacheKey, JSON.stringify(result)); } catch { /* ignore */ }
      }
    } catch (e) {
      if (!mountedRef.current) return;
      setError(e instanceof Error ? e.message : 'Fetch failed');
      if (cacheKey) setSource('cached');
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, [fetcher, cacheKey]);

  useEffect(() => {
    mountedRef.current = true;
    if (import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_USE_MOCK_API === 'true') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetch();
    }
    return () => { mountedRef.current = false; };
  }, [fetch]);

  return { data, source, lastUpdated, loading, error, refetch: fetch };
}
