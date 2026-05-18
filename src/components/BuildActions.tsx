import { useState } from 'react';
import type { AttachmentSlot, Build } from '../types';
import { getShareUrl } from '../utils/buildUrl';

interface BuildActionsProps {
  weaponId: string;
  attachments: Record<AttachmentSlot, string | null>;
  onSave: (name: string) => void;
  savedBuilds: Build[];
  onLoadBuild: (build: Build) => void;
  onDeleteBuild: (id: string) => void;
}

export function BuildActions({ weaponId, attachments, onSave, savedBuilds, onLoadBuild, onDeleteBuild }: BuildActionsProps) {
  const [copied, setCopied] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [showSave, setShowSave] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  const handleCopy = async () => {
    const url = getShareUrl({ weaponId, attachments, name: '', notes: '' });
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

  const hasWeapon = !!weaponId;

  return (
    <section className="space-y-3">
      <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-secondary font-semibold">
        Actions
      </h2>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleCopy}
          disabled={!hasWeapon}
          className={`px-4 py-2 text-xs font-mono uppercase tracking-[0.1em] border transition-all ${
            !hasWeapon
              ? 'border-[rgb(var(--border-primary))] text-tertiary cursor-not-allowed opacity-50'
              : copied
              ? 'border-accent bg-accent text-page'
              : 'border-accent text-accent hover:bg-accent hover:text-page'
          }`}
          aria-label={copied ? 'Copied to clipboard' : 'Copy build URL to clipboard'}
        >
          {copied ? 'Copied!' : 'Copy Build URL'}
        </button>

        <button
          onClick={() => setShowSave(!showSave)}
          disabled={!hasWeapon}
          className={`px-4 py-2 text-xs font-mono uppercase tracking-[0.1em] border transition-all ${
            !hasWeapon
              ? 'border-[rgb(var(--border-primary))] text-tertiary cursor-not-allowed opacity-50'
              : 'border-[rgb(var(--border-primary))] text-primary hover:bg-[rgb(var(--bg-elevated))]'
          }`}
        >
          Save Build
        </button>

        <button
          onClick={() => setShowSaved(!showSaved)}
          className={`px-4 py-2 text-xs font-mono uppercase tracking-[0.1em] border transition-all ${
            showSaved
              ? 'border-accent text-accent bg-[rgb(var(--bg-elevated))]'
              : 'border-[rgb(var(--border-primary))] text-primary hover:bg-[rgb(var(--bg-elevated))]'
          }`}
        >
          Saved ({savedBuilds.length})
        </button>
      </div>

      {showSave && (
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={saveName}
            onChange={(e) => setSaveName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            placeholder="Build name..."
            className="flex-1 px-3 py-2 text-xs bg-[rgb(var(--bg-elevated))] border border-[rgb(var(--border-primary))] text-primary placeholder:text-tertiary focus:outline-none focus:border-accent"
            aria-label="Build name"
            autoFocus
          />
          <button
            onClick={handleSave}
            disabled={!saveName.trim()}
            className="px-4 py-2 text-xs font-mono uppercase tracking-[0.1em] bg-accent text-page hover:opacity-90 transition-all disabled:opacity-50"
          >
            Save
          </button>
        </div>
      )}

      {showSaved && (
        <div className="border border-[rgb(var(--border-primary))] bg-surface max-h-48 overflow-y-auto" role="listbox" aria-label="Saved builds">
          {savedBuilds.length === 0 ? (
            <p className="p-4 text-xs text-tertiary text-center">No saved builds yet</p>
          ) : (
            savedBuilds.map((build) => (
              <div
                key={build.id}
                className="flex items-center justify-between px-3 py-2 border-b border-[rgb(var(--border-primary))] last:border-0 hover:bg-[rgb(var(--bg-elevated))] transition-colors"
              >
                <button
                  onClick={() => { onLoadBuild(build); setShowSaved(false); }}
                  className="text-left flex-1 min-w-0"
                >
                  <p className="text-xs text-primary truncate">{build.name}</p>
                  <p className="text-[9px] text-tertiary font-mono">
                    {new Date(build.createdAt).toLocaleDateString()} &middot; {build.weaponId}
                  </p>
                </button>
                <button
                  onClick={() => onDeleteBuild(build.id)}
                  className="ml-2 text-tertiary hover:text-danger transition-colors text-xs px-1"
                  aria-label={`Delete ${build.name}`}
                >
                  &#10005;
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
}
