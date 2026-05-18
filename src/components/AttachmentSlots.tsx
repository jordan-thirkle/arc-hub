import { useState, useEffect } from 'react';
import { getAttachmentsBySlot } from '../data/attachments';
import { SLOT_LABELS } from '../types';
import type { AttachmentSlot, BuildAttachment } from '../types';

interface AttachmentSlotsProps {
  weaponId: string;
  slots: AttachmentSlot[];
  attachments: BuildAttachment[];
  onEquip: (slot: AttachmentSlot, attachmentId: string | null) => void;
  label?: string;
}

export function AttachmentSlots({ weaponId, slots, attachments: current, onEquip, label = 'Attachments' }: AttachmentSlotsProps) {
  const [openSlot, setOpenSlot] = useState<AttachmentSlot | null>(null);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setOpenSlot(null); }, [weaponId]);

  if (slots.length === 0) {
    return (
      <div className="p-4 border border-[rgb(var(--border-primary))] bg-surface text-center">
        <p className="text-xs text-tertiary font-mono uppercase tracking-[0.1em]">
          No Attachment Slots
        </p>
        <p className="text-[9px] text-tertiary mt-1">Legendary weapons cannot be modified</p>
      </div>
    );
  }

  return (
    <section className="space-y-2">
      <h3 className="text-[10px] font-mono uppercase tracking-[0.15em] text-secondary font-semibold">
        {label}
      </h3>
      <div className="grid grid-cols-2 gap-1.5">
        {slots.map(slot => {
          const equipped = current.find(a => a.slot === slot);
          const optionList = getAttachmentsBySlot(slot).filter(a => a.compatibleWith.includes(weaponId));
          const isOpen = openSlot === slot;

          return (
            <div key={slot} className="relative">
              <button
                onClick={() => setOpenSlot(isOpen ? null : slot)}
                className={`w-full text-left p-2 border transition-all ${
                  equipped?.attachmentId
                    ? 'border-accent/50 bg-[rgb(var(--bg-elevated))]'
                    : 'border-[rgb(var(--border-primary))] bg-surface hover:border-tertiary'
                }`}
                aria-expanded={isOpen}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[8px] font-mono uppercase tracking-[0.1em] text-tertiary">
                    {SLOT_LABELS[slot]}
                  </span>
                </div>
                {equipped?.attachmentId ? (
                  <p className="text-[10px] font-medium text-primary truncate">
                    {optionList.find(a => a.id === equipped.attachmentId)?.name || equipped.attachmentId}
                  </p>
                ) : (
                  <p className="text-[10px] text-tertiary">Empty</p>
                )}
              </button>

              {isOpen && (
                <div className="absolute z-20 top-full left-0 right-0 mt-1 border border-[rgb(var(--border-primary))] bg-surface shadow-xl max-h-56 overflow-y-auto min-w-[200px]" role="listbox">
                  <button
                    onClick={() => { onEquip(slot, null); setOpenSlot(null); }}
                    className={`w-full text-left px-3 py-1.5 text-[11px] transition-colors hover:bg-[rgb(var(--bg-elevated))] ${
                      !equipped?.attachmentId ? 'text-accent bg-[rgb(var(--bg-elevated))]' : 'text-tertiary'
                    }`}
                  >
                    None
                  </button>
                  {optionList.map(att => (
                    <button
                      key={att.id}
                      onClick={() => { onEquip(slot, att.id); setOpenSlot(null); }}
                      className={`w-full text-left px-3 py-1.5 text-[11px] transition-colors hover:bg-[rgb(var(--bg-elevated))] ${
                        equipped?.attachmentId === att.id ? 'text-accent bg-[rgb(var(--bg-elevated))]' : 'text-primary'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{att.name}</span>
                        <span className="text-[8px] font-mono text-tertiary">T{att.tier}</span>
                      </div>
                      {att.effects && (
                        <p className="text-[8px] text-tertiary mt-0.5">
                          {Object.entries(att.effects).map(([k, v]) =>
                            `${k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}: ${v > 0 ? '+' : ''}${v}`
                          ).join(', ')}
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
