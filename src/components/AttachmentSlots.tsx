import { useState, useEffect } from 'react';
import { attachments, getAttachmentsForSlot, slotLabels } from '../data/weapons';
import type { AttachmentSlot } from '../types';

interface AttachmentSlotsProps {
  weapon: { id: string; attachmentSlots: AttachmentSlot[] };
  equipped: Record<AttachmentSlot, string | null>;
  onEquip: (slot: AttachmentSlot, attachmentId: string | null) => void;
}

export function AttachmentSlots({ weapon, equipped, onEquip }: AttachmentSlotsProps) {
  const [openSlot, setOpenSlot] = useState<AttachmentSlot | null>(null);

  useEffect(() => {
    setOpenSlot(null);
  }, [weapon.id]);

  const availableSlots = weapon.attachmentSlots;

  if (availableSlots.length === 0) {
    return (
      <div className="p-6 border border-[rgb(var(--border-primary))] bg-surface text-center">
        <p className="text-xs text-tertiary font-mono uppercase tracking-[0.1em]">
          This weapon has no attachment slots
        </p>
        <p className="text-[10px] text-tertiary mt-1">Legendary weapons cannot be modified</p>
      </div>
    );
  }

  return (
    <section className="space-y-3">
      <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-secondary font-semibold">
        Attachments
      </h2>
      <div className="grid grid-cols-2 gap-2">
        {availableSlots.map((slot) => {
          const equippedAtt = equipped[slot];
          const attData = equippedAtt
            ? attachments.find((a) => a.id === equippedAtt)
            : null;
          const options = getAttachmentsForSlot(slot, weapon.id);
          const isOpen = openSlot === slot;

          return (
            <div key={slot} className="relative">
              <button
                onClick={() => setOpenSlot(isOpen ? null : slot)}
                className={`w-full text-left p-3 border transition-all ${
                  equippedAtt
                    ? 'border-accent/50 bg-[rgb(var(--bg-elevated))]'
                    : 'border-[rgb(var(--border-primary))] bg-surface hover:border-tertiary'
                }`}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-mono uppercase tracking-[0.1em] text-tertiary">
                    {slotLabels[slot]}
                  </span>
                  {equippedAtt && (
                    <span className="text-[8px] font-mono text-accent">T{attData?.tier}</span>
                  )}
                </div>
                {attData ? (
                  <p className="text-xs font-medium text-primary truncate">{attData.name}</p>
                ) : (
                  <p className="text-xs text-tertiary">Empty slot</p>
                )}
                {equippedAtt && attData && (
                  <p className="text-[9px] text-tertiary mt-0.5 truncate">{attData.description}</p>
                )}
              </button>

              {isOpen && (
                <div className="absolute z-20 top-full left-0 right-0 mt-1 border border-[rgb(var(--border-primary))] bg-surface shadow-xl max-h-48 overflow-y-auto" role="listbox">
                  <button
                    onClick={() => { onEquip(slot, null); setOpenSlot(null); }}
                    className={`w-full text-left px-3 py-2 text-xs transition-colors hover:bg-[rgb(var(--bg-elevated))] ${
                      !equippedAtt ? 'text-accent bg-[rgb(var(--bg-elevated))]' : 'text-tertiary'
                    }`}
                    role="option"
                    aria-selected={!equippedAtt}
                  >
                    None
                  </button>
                  {options.map((att) => (
                    <button
                      key={att.id}
                      onClick={() => { onEquip(slot, att.id); setOpenSlot(null); }}
                      className={`w-full text-left px-3 py-2 text-xs transition-colors hover:bg-[rgb(var(--bg-elevated))] ${
                        equippedAtt === att.id ? 'text-accent bg-[rgb(var(--bg-elevated))]' : 'text-primary'
                      }`}
                      role="option"
                      aria-selected={equippedAtt === att.id}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{att.name}</span>
                        <span className="text-[9px] font-mono text-tertiary">T{att.tier}</span>
                      </div>
                      <p className="text-[9px] text-tertiary mt-0.5">{att.description}</p>
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
