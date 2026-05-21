import { describe, it, expect } from 'vitest';
import { encodeBuild, decodeBuild } from '../buildUrl';
import type { Build, WeaponTier } from '../../types';

const sampleBuild: Omit<Build, 'id' | 'createdAt'> = {
  name: 'Test Build',
  primaryWeaponId: 'kettle',
  primaryTier: 2 as WeaponTier,
  primaryAttachments: [
    { slot: 'muzzle', attachmentId: 'silencer-i' },
    { slot: 'underbarrel', attachmentId: 'vertical-grip-i' },
  ],
  secondaryWeaponId: 'rattler',
  secondaryTier: 1 as WeaponTier,
  secondaryAttachments: [{ slot: 'stock', attachmentId: 'padded-stock' }],
  augmentId: 'combat-augment-1',
  shieldId: 'medium-shield',
  quickUseItems: ['bandage', 'grenade-frag', null, null, null],
  notes: '',
};

describe('encodeBuild / decodeBuild', () => {
  it('encodes and decodes a full build correctly', () => {
    const encoded = encodeBuild(sampleBuild);
    expect(encoded).toBeTruthy();
    expect(typeof encoded).toBe('string');

    const decoded = decodeBuild(encoded);
    expect(decoded).not.toBeNull();
    expect(decoded!.primaryWeaponId).toBe('kettle');
    expect(decoded!.primaryTier).toBe(2);
    expect(decoded!.primaryAttachments).toHaveLength(2);
    expect(decoded!.secondaryWeaponId).toBe('rattler');
    expect(decoded!.augmentId).toBe('combat-augment-1');
    expect(decoded!.shieldId).toBe('medium-shield');
    expect(decoded!.quickUseItems[0]).toBe('bandage');
  });

  it('handles minimal build (primary only)', () => {
    const minimal: Omit<Build, 'id' | 'createdAt'> = {
      name: '',
      primaryWeaponId: 'kettle',
      primaryTier: 0 as WeaponTier,
      primaryAttachments: [],
      quickUseItems: [null, null, null, null, null],
    };
    const encoded = encodeBuild(minimal);
    const decoded = decodeBuild(encoded);
    expect(decoded!.primaryWeaponId).toBe('kettle');
    expect(decoded!.secondaryWeaponId).toBeUndefined();
    expect(decoded!.augmentId).toBeUndefined();
    expect(decoded!.shieldId).toBeUndefined();
  });

  it('returns null for invalid input', () => {
    expect(decodeBuild('')).toBeNull();
    expect(decodeBuild('not-valid-base64!!')).toBeNull();
  });

  it('returns null for wrong version', () => {
    const badData = btoa(encodeURIComponent(JSON.stringify({ v: 1, w: 'kettle' })));
    expect(decodeBuild(badData)).toBeNull();
  });

  it('round-trips empty attachments', () => {
    const build: Omit<Build, 'id' | 'createdAt'> = {
      name: '',
      primaryWeaponId: 'kettle',
      primaryTier: 0 as WeaponTier,
      primaryAttachments: [],
      quickUseItems: [null, null, null, null, null],
    };
    const encoded = encodeBuild(build);
    const decoded = decodeBuild(encoded);
    expect(decoded!.primaryAttachments).toEqual([]);
  });
});
