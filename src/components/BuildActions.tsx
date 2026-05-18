import { useState } from 'react';
import { getShareUrl } from '../utils/buildUrl';
import type { Build } from '../types';

interface BuildActionsProps {
  build: Omit<Build, 'id' | 'createdAt'>;
  onSave: (name: string) => void;
  savedBuilds: Build[];
  onLoadBuild: (build: Build) => void;
  onDeleteBuild: (id: string) => void;
  onReset: () => void;
}

export function BuildActions({ build, onSave, savedBuilds, onLoadBuild, onDeleteBuild, onReset }: BuildActionsProps) {
  const [copied, setCopied] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [showSave, setShowSave] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  const handleCopy = async () => {
    const url = getShareUrl(build);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = () => {
    if (!saveName.trim()) return;
    onSave(saveName.trim());
    setSaveName('');
    setShowSave(false);
  };

  const hasWeapon = !!build.primaryWeaponId;

  return (
    <section className="space-y-3">
      <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-secondary font-semibold">Build Actions</h2>
      <div className="space-y-2">
        <div className="flex flex-wrap gap-1.5">
          <button onClick={handleCopy} disabled={!hasWeapon}
            className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.1em] border transition-all ${
              !hasWeapon ? 'border-[rgb(var(--border-primary))] text-tertiary cursor-not-allowed opacity-50'
                : copied ? 'border-accent bg-accent text-page'
                : 'border-accent text-accent hover:bg-accent hover:text-page'
            }`}>
            {copied ? 'Copied!' : 'Share URL'}
          </button>
          <button onClick={() => setShowSave(!showSave)} disabled={!hasWeapon}
            className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.1em] border transition-all ${
              !hasWeapon ? 'border-[rgb(var(--border-primary))] text-tertiary cursor-not-allowed opacity-50'
                : 'border-[rgb(var(--border-primary))] text-primary hover:bg-[rgb(var(--bg-elevated))]'
            }`}>
            Save
          </button>
          <button onClick={() => setShowSaved(!showSaved)}
            className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.1em] border transition-all ${
              showSaved ? 'border-accent text-accent bg-[rgb(var(--bg-elevated))]'
                : 'border-[rgb(var(--border-primary))] text-primary hover:bg-[rgb(var(--bg-elevated))]'
            }`}>
            Saved ({savedBuilds.length})
          </button>
          <button onClick={onReset}
            className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.1em] border border-[rgb(var(--border-primary))] text-danger hover:bg-danger/10 transition-all">
            Reset
          </button>
        </div>

        {showSave && (
          <div className="flex gap-2 items-center">
            <input type="text" value={saveName} onChange={e => setSaveName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSave()}
              placeholder="Build name..."
              className="flex-1 px-3 py-1.5 text-xs bg-[rgb(var(--bg-elevated))] border border-[rgb(var(--border-primary))] text-primary placeholder:text-tertiary focus:outline-none focus:border-accent"
              autoFocus />
            <button onClick={handleSave} disabled={!saveName.trim()}
              className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.1em] bg-accent text-page hover:opacity-90 disabled:opacity-50">
              Save
            </button>
          </div>
        )}

        {showSaved && (
          <div className="border border-[rgb(var(--border-primary))] bg-surface max-h-48 overflow-y-auto">
            {savedBuilds.length === 0 ? (
              <p className="p-3 text-xs text-tertiary text-center">No saved builds yet</p>
            ) : (
              savedBuilds.map(b => (
                <div key={b.id} className="flex items-center justify-between px-3 py-2 border-b border-[rgb(var(--border-primary))] last:border-0 hover:bg-[rgb(var(--bg-elevated))]">
                  <button onClick={() => { onLoadBuild(b); setShowSaved(false); }} className="text-left flex-1 min-w-0">
                    <p className="text-xs text-primary truncate">{b.name}</p>
                    <p className="text-[8px] text-tertiary font-mono">
                      {new Date(b.createdAt).toLocaleDateString()} &middot; {b.primaryWeaponId}
                    </p>
                  </button>
                  <button onClick={() => onDeleteBuild(b.id)}
                    className="ml-2 text-tertiary hover:text-danger transition-colors text-xs px-1">
                    &#10005;
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}
