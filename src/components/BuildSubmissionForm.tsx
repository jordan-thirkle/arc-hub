import { useState } from 'react';
import { weapons } from '../data/weapons';

interface BuildSubmissionFormProps {
  currentBuild: {
    primaryWeaponId: string;
    primaryTier: number;
    name: string;
  };
  onSubmit: (data: {
    name: string;
    build_json: Record<string, unknown>;
    role: string;
    tags: string[];
    author_username: string;
  }) => Promise<void>;
  onClose: () => void;
}

const ROLES = ['Allrounder', 'PvP Aggressor', 'PvE Farmer', 'Stealth', 'Budget', 'Boss Killer', 'CQB', 'Support', 'Rat'];

export function BuildSubmissionForm({ currentBuild, onSubmit, onClose }: BuildSubmissionFormProps) {
  const [name, setName] = useState(currentBuild.name || '');
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('Allrounder');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleAddTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (t && !tags.includes(t)) {
      setTags(prev => [...prev, t]);
      setTagInput('');
    }
  };

  const handleSubmit = async () => {
    if (!name.trim()) { setError('Build name is required'); return; }
    if (!author.trim()) { setError('Your name is required'); return; }
    setSubmitting(true);
    setError('');
    try {
      await onSubmit({
        name: name.trim(),
        build_json: currentBuild as unknown as Record<string, unknown>,
        role,
        tags,
        author_username: author.trim(),
      });
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-surface border border-[rgb(var(--border-primary))] w-full max-w-md max-h-[90vh] overflow-y-auto rounded-xl shadow-modal"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b border-[rgb(var(--border-primary))] flex items-center justify-between">
          <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-secondary font-semibold">Submit Build</h2>
          <button onClick={onClose} className="text-tertiary hover:text-primary transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 3l8 8M11 3l-8 8" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-3">
          <div className="space-y-1">
            <label className="text-[8px] font-mono uppercase tracking-[0.1em] text-tertiary">Build Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)}
              placeholder="My Build" maxLength={60}
              className="w-full px-3 py-2 text-[11px] bg-[rgb(var(--bg-elevated))] border border-[rgb(var(--border-primary))] text-primary placeholder:text-tertiary rounded-md focus-ring" />
          </div>

          <div className="space-y-1">
            <label className="text-[8px] font-mono uppercase tracking-[0.1em] text-tertiary">Your Name</label>
            <input type="text" value={author} onChange={e => setAuthor(e.target.value)}
              placeholder="ArcRaider42" maxLength={30}
              className="w-full px-3 py-2 text-[11px] bg-[rgb(var(--bg-elevated))] border border-[rgb(var(--border-primary))] text-primary placeholder:text-tertiary rounded-md focus-ring" />
          </div>

          <div className="space-y-1">
            <label className="text-[8px] font-mono uppercase tracking-[0.1em] text-tertiary">Role</label>
            <select value={role} onChange={e => setRole(e.target.value)}
              className="w-full px-3 py-2 text-[11px] bg-[rgb(var(--bg-elevated))] border border-[rgb(var(--border-primary))] text-primary rounded-md focus-ring appearance-none">
              {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[8px] font-mono uppercase tracking-[0.1em] text-tertiary">Tags</label>
            <div className="flex gap-1">
              <input type="text" value={tagInput} onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); } }}
                placeholder="Add tag..." maxLength={20}
                className="flex-1 px-3 py-2 text-[11px] bg-[rgb(var(--bg-elevated))] border border-[rgb(var(--border-primary))] text-primary placeholder:text-tertiary rounded-md focus-ring" />
              <button onClick={handleAddTag}
                className="px-3 py-2 text-[9px] font-mono border border-[rgb(var(--border-primary))] text-tertiary hover:text-primary rounded-md transition-all">
                Add
              </button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {tags.map(t => (
                  <span key={t} className="text-[8px] px-1.5 py-0.5 border border-[rgb(var(--border-primary))] text-tertiary font-mono rounded-full flex items-center gap-1">
                    {t}
                    <button onClick={() => setTags(prev => prev.filter(x => x !== t))} className="text-danger hover:text-red-300">&times;</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="p-3 border border-[rgb(var(--border-primary))] bg-[rgb(var(--bg-elevated))] rounded-md">
            <p className="text-[9px] text-tertiary font-mono">Primary: {weapons.find(w => w.id === currentBuild.primaryWeaponId)?.name || 'Unknown'}</p>
            <p className="text-[9px] text-tertiary font-mono">Tier: {currentBuild.primaryTier + 1 || '?'}</p>
          </div>

          {error && <p className="text-danger text-[9px] font-mono">{error}</p>}

          <div className="flex gap-2 pt-2">
            <button onClick={onClose}
              className="flex-1 py-2.5 text-[9px] font-mono uppercase tracking-[0.1em] border border-[rgb(var(--border-primary))] text-tertiary hover:text-primary rounded-md transition-all">
              Cancel
            </button>
            <button onClick={handleSubmit} disabled={submitting}
              className="flex-1 py-2.5 text-[9px] font-mono uppercase tracking-[0.1em] bg-accent text-page rounded-md hover:bg-accent-hover transition-all disabled:opacity-50 active:scale-[0.98]">
              {submitting ? 'Submitting...' : 'Submit Build'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
