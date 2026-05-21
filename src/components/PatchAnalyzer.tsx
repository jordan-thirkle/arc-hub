import { useState } from 'react';
import { latestPatch } from '../data/patches';

interface MetaShift {
  weapon: string;
  impact: 'buff' | 'nerf' | 'rework' | 'new';
  description: string;
}

interface AnalysisResult {
  summary: string;
  metaShifts: MetaShift[];
  topBuffs: string[];
  topNerfs: string[];
  newMetaPicks: string[];
  verdict: string;
}

const impactColors: Record<string, string> = {
  buff: '#4CAF50',
  nerf: '#F44336',
  rework: '#FFC107',
  new: '#2196F3',
};

export function PatchAnalyzer() {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = async () => {
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const res = await fetch('/api/patch-analyzer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patchNotes: latestPatch.changes.join('\n'),
          patchName: latestPatch.version,
        }),
      });
      const data = await res.json();
      if (data.error) {
        if (data.hint) {
          setError(data.hint);
        } else {
          setError(data.error);
        }
        return;
      }
      setAnalysis(data.analysis);
    } catch (err) {
      setError('Failed to connect to analysis service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-[10px] font-mono uppercase tracking-[0.1em] text-secondary font-semibold">
          AI Meta Impact Report
        </h3>
        <span className="text-[8px] text-tertiary font-mono">Patch {latestPatch.version}</span>
      </div>
      <p className="text-[9px] text-tertiary leading-relaxed">
        Uses DeepSeek V4 via OpenRouter to analyze patch notes and predict meta shifts.
      </p>
      <button
        onClick={analyze}
        disabled={loading}
        className="px-3 py-1.5 text-[9px] font-mono uppercase tracking-[0.1em] bg-accent text-page hover:opacity-90 transition-all disabled:opacity-50"
      >
        {loading ? 'Analyzing...' : 'Analyze Latest Patch'}
      </button>

      {error && (
        <div className="border border-[rgb(var(--border-primary))] bg-surface p-2">
          <p className="text-[9px] text-danger font-mono">{error}</p>
        </div>
      )}

      {analysis && (
        <div className="space-y-3">
          <div className="border border-[rgb(var(--border-primary))] bg-surface p-2">
            <p className="text-[9px] text-primary leading-relaxed">{analysis.summary}</p>
          </div>

          {analysis.metaShifts.length > 0 && (
            <div className="space-y-1">
              <p className="text-[8px] font-mono uppercase tracking-[0.1em] text-tertiary">Weapon Changes</p>
              {analysis.metaShifts.map((shift, i) => (
                <div key={i} className="flex items-start gap-2 border border-[rgb(var(--border-primary))] bg-surface p-2">
                  <span
                    className="text-[7px] font-mono uppercase px-1 py-0.5 mt-0.5 font-bold"
                    style={{ backgroundColor: impactColors[shift.impact], color: '#0A0E14' }}
                  >
                    {shift.impact}
                  </span>
                  <div>
                    <p className="text-[9px] text-primary font-semibold">{shift.weapon}</p>
                    <p className="text-[8px] text-tertiary">{shift.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-3 gap-2">
            {analysis.topBuffs.length > 0 && (
              <div className="border border-[rgb(var(--border-primary))] bg-surface p-2">
                <p className="text-[7px] font-mono uppercase tracking-[0.1em] text-green-400 mb-1">Top Buffs</p>
                <ul className="space-y-0.5">
                  {analysis.topBuffs.map((w, i) => (
                    <li key={i} className="text-[8px] text-primary font-mono">{w}</li>
                  ))}
                </ul>
              </div>
            )}
            {analysis.topNerfs.length > 0 && (
              <div className="border border-[rgb(var(--border-primary))] bg-surface p-2">
                <p className="text-[7px] font-mono uppercase tracking-[0.1em] text-red-400 mb-1">Top Nerfs</p>
                <ul className="space-y-0.5">
                  {analysis.topNerfs.map((w, i) => (
                    <li key={i} className="text-[8px] text-primary font-mono">{w}</li>
                  ))}
                </ul>
              </div>
            )}
            {analysis.newMetaPicks.length > 0 && (
              <div className="border border-[rgb(var(--border-primary))] bg-surface p-2">
                <p className="text-[7px] font-mono uppercase tracking-[0.1em] text-blue-400 mb-1">New Meta Picks</p>
                <ul className="space-y-0.5">
                  {analysis.newMetaPicks.map((w, i) => (
                    <li key={i} className="text-[8px] text-primary font-mono">{w}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="border-l-2 border-accent pl-2">
            <p className="text-[8px] font-mono uppercase tracking-[0.1em] text-accent">Verdict</p>
            <p className="text-[9px] text-primary">{analysis.verdict}</p>
          </div>
        </div>
      )}
    </div>
  );
}
