import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { Build, BuildAttachment, WeaponTier } from '../types';

const DEFAULT_BUILD: Omit<Build, 'id' | 'createdAt'> = {
  name: '',
  primaryWeaponId: 'kettle',
  primaryTier: 0,
  primaryAttachments: [],
  quickUseItems: [null, null, null, null, null],
};

export function useBuild() {
  const [build, setBuild] = useLocalStorage<Build>('ar_build', {
    ...DEFAULT_BUILD,
    id: crypto.randomUUID?.() ?? Date.now().toString(36),
    createdAt: new Date().toISOString(),
  });

  const setPrimaryWeapon = useCallback((weaponId: string, tier: WeaponTier) => {
    setBuild(prev => ({
      ...prev,
      primaryWeaponId: weaponId,
      primaryTier: tier,
      primaryAttachments: prev.primaryAttachments.filter(a =>
        !a.attachmentId || true
      ),
    }));
  }, [setBuild]);

  const setPrimaryTier = useCallback((tier: WeaponTier) => {
    setBuild(prev => ({ ...prev, primaryTier: tier }));
  }, [setBuild]);

  const setPrimaryAttachment = useCallback((slot: string, attachmentId: string | null) => {
    setBuild(prev => {
      const existing = prev.primaryAttachments.filter(a => a.slot !== slot);
      const updated: BuildAttachment[] = attachmentId
        ? [...existing, { slot: slot as any, attachmentId }]
        : existing;
      return { ...prev, primaryAttachments: updated };
    });
  }, [setBuild]);

  const setSecondaryWeapon = useCallback((weaponId: string | undefined, tier?: WeaponTier) => {
    setBuild(prev => ({
      ...prev,
      secondaryWeaponId: weaponId,
      secondaryTier: tier ?? 0,
      secondaryAttachments: weaponId ? (prev.secondaryAttachments ?? []) : undefined,
    }));
  }, [setBuild]);

  const setSecondaryAttachment = useCallback((slot: string, attachmentId: string | null) => {
    setBuild(prev => {
      if (!prev.secondaryWeaponId) return prev;
      const existing = (prev.secondaryAttachments ?? []).filter(a => a.slot !== slot);
      const updated: BuildAttachment[] = attachmentId
        ? [...existing, { slot: slot as any, attachmentId }]
        : existing;
      return { ...prev, secondaryAttachments: updated };
    });
  }, [setBuild]);

  const setAugment = useCallback((augmentId: string | undefined) => {
    setBuild(prev => ({ ...prev, augmentId }));
  }, [setBuild]);

  const setShield = useCallback((shieldId: string | undefined) => {
    setBuild(prev => ({ ...prev, shieldId }));
  }, [setBuild]);

  const setQuickUseItem = useCallback((slot: number, itemId: string | null) => {
    setBuild(prev => {
      const items = [...prev.quickUseItems];
      items[slot] = itemId;
      return { ...prev, quickUseItems: items };
    });
  }, [setBuild]);

  const setName = useCallback((name: string) => {
    setBuild(prev => ({ ...prev, name }));
  }, [setBuild]);

  const setNotes = useCallback((notes: string) => {
    setBuild(prev => ({ ...prev, notes }));
  }, [setBuild]);

  const reset = useCallback(() => {
    setBuild({
      ...DEFAULT_BUILD,
      id: crypto.randomUUID?.() ?? Date.now().toString(36),
      createdAt: new Date().toISOString(),
    });
  }, [setBuild]);

  return {
    build,
    setPrimaryWeapon,
    setPrimaryTier,
    setPrimaryAttachment,
    setSecondaryWeapon,
    setSecondaryAttachment,
    setAugment,
    setShield,
    setQuickUseItem,
    setName,
    setNotes,
    reset,
  };
}
