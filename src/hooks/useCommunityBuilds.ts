import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { metaBuilds } from '../data/metaBuilds';
import { useLocalStorage } from './useLocalStorage';

export interface CommunityBuild {
  id: string;
  name: string;
  build_json: Record<string, unknown>;
  role: string;
  tags: string[];
  author_username: string;
  net_votes: number;
  official: boolean;
  created_at: string;
}

interface UseCommunityBuildsResult {
  builds: CommunityBuild[];
  loading: boolean;
  error: string | null;
  submitBuild: (data: Omit<CommunityBuild, 'id' | 'net_votes' | 'official' | 'created_at'>) => Promise<void>;
  refetch: () => void;
}

function seedOfficialBuilds(): CommunityBuild[] {
  return metaBuilds.map((mb, i) => ({
    id: `official-${mb.id}`,
    name: mb.name,
    build_json: mb.build as unknown as Record<string, unknown>,
    role: mb.role,
    tags: mb.tags,
    author_username: mb.author,
    net_votes: mb.votes,
    official: true,
    created_at: `2026-0${Math.floor(i / 8) + 4}-${String((i % 28) + 1).padStart(2, '0')}T00:00:00Z`,
  }));
}

const OFFICIAL_BUILDS = seedOfficialBuilds();

export function useCommunityBuilds(): UseCommunityBuildsResult {
  const [communityBuilds, setCommunityBuilds] = useLocalStorage<CommunityBuild[]>('ar-community-builds', []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  const fetchBuilds = useCallback(async () => {
    if (!import.meta.env.VITE_SUPABASE_URL) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('community_builds')
        .select('*')
        .order('net_votes', { ascending: false });

      if (err) throw err;

      if (data) {
        const mapped: CommunityBuild[] = data.map((r: Record<string, unknown>) => ({
          id: r.id as string,
          name: r.name as string,
          build_json: r.build_json as Record<string, unknown>,
          role: r.role as string,
          tags: r.tags as string[],
          author_username: r.author_username as string,
          net_votes: (r.net_votes as number) ?? 0,
          official: false,
          created_at: r.created_at as string,
        }));
        setCommunityBuilds(mapped);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to fetch builds');
    } finally {
      setLoading(false);
    }
  }, [setCommunityBuilds]);

  useEffect(() => {
    mountedRef.current = true;
    if (import.meta.env.VITE_SUPABASE_URL) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchBuilds();
    }
    return () => { mountedRef.current = false; };
  }, [fetchBuilds]);

  const submitBuild = useCallback(async (data: Omit<CommunityBuild, 'id' | 'net_votes' | 'official' | 'created_at'>) => {
    if (!import.meta.env.VITE_SUPABASE_URL) {
      const localBuild: CommunityBuild = {
        ...data,
        id: Date.now().toString(36),
        net_votes: 0,
        official: false,
        created_at: new Date().toISOString(),
      };
      setCommunityBuilds(prev => [localBuild, ...prev]);
      return;
    }
    try {
      const { error: err } = await supabase.from('community_builds').insert({
        name: data.name,
        build_json: data.build_json,
        role: data.role,
        tags: data.tags,
        author_username: data.author_username,
      });
      if (err) throw err;
      await fetchBuilds();
    } catch (e) {
      throw new Error(e instanceof Error ? e.message : 'Failed to submit build', { cause: e });
    }
  }, [fetchBuilds, setCommunityBuilds]);

  const allBuilds: CommunityBuild[] = [...OFFICIAL_BUILDS, ...communityBuilds];

  return {
    builds: allBuilds,
    loading,
    error,
    submitBuild,
    refetch: fetchBuilds,
  };
}
