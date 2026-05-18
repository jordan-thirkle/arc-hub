import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

type VoteValue = 1 | -1 | null;

interface UseVotesResult {
  userVotes: Record<string, VoteValue>;
  setVote: (buildId: string, value: VoteValue) => Promise<void>;
  loading: boolean;
}

export function useVotes(): UseVotesResult {
  const [userVotes, setUserVotes] = useState<Record<string, VoteValue>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!import.meta.env.VITE_SUPABASE_URL) return;

    const initVotes = async () => {
      setLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          const { data } = await supabase.auth.signInAnonymously();
          if (!data.user) return;
        }

        const { data: votes } = await supabase
          .from('votes')
          .select('build_id, vote_value');

        if (votes) {
          const map: Record<string, VoteValue> = {};
          for (const v of votes) {
            map[v.build_id] = v.vote_value as VoteValue;
          }
          setUserVotes(map);
        }
      } catch {
        // silently fail — votes stay empty
      } finally {
        setLoading(false);
      }
    };

    initVotes();
  }, []);

  const setVote = useCallback(async (buildId: string, value: VoteValue) => {
    const original = userVotes[buildId] ?? null;

    setUserVotes(prevVotes => ({ ...prevVotes, [buildId]: value }));

    if (!import.meta.env.VITE_SUPABASE_URL) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      if (value === null) {
        await supabase.from('votes').delete().match({ build_id: buildId, user_id: user.id });
      } else {
        await supabase.from('votes').upsert(
          { build_id: buildId, user_id: user.id, vote_value: value },
          { onConflict: 'build_id, user_id' }
        );
      }
    } catch {
      setUserVotes(prevVotes => ({ ...prevVotes, [buildId]: original }));
    }
  }, [userVotes]);

  return { userVotes, setVote, loading };
}
