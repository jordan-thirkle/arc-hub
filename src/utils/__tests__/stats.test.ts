import { describe, it, expect } from 'vitest';
import { calculateStats, statLabel, isHigherBetter, normalizeStat } from '../stats';
import type { Weapon, WeaponStat, BuildAttachment, WeaponTier } from '../../types';

const makeWeapon = (overrides: Partial<Weapon> = {}): Weapon => ({
  id: 'test-weapon',
  name: 'Test Weapon',
  class: 'Assault Rifle',
  ammoType: 'medium',
  firingMode: 'Full-Auto',
  image: '',
  description: '',
  rarity: 'Common',
  tiers: [
    {
      tier: 0 as WeaponTier,
      label: 'I',
      stats: {
        damage: 10,
        fireRate: 30,
        range: 50,
        dps: 300,
        magSize: 20,
        verticalRecoil: 25,
        horizontalRecoil: 15,
        adsSpeed: 0.35,
        reloadSpeed: 2.2,
        bulletVelocity: 550,
        dispersion: 1.8,
        agility: 50,
        stability: 50,
        stealth: 10,
      },
      value: 1000,
      weight: 5,
    },
    {
      tier: 1 as WeaponTier,
      label: 'II',
      stats: {
        damage: 11,
        fireRate: 32,
        range: 55,
        dps: 352,
        magSize: 24,
        verticalRecoil: 23,
        horizontalRecoil: 14,
        adsSpeed: 0.33,
        reloadSpeed: 2.1,
        bulletVelocity: 550,
        dispersion: 1.7,
        agility: 52,
        stability: 52,
        stealth: 10,
      },
      value: 2000,
      weight: 5,
    },
  ],
  attachmentSlots: ['muzzle', 'underbarrel', 'stock'],
  compatibleAttachments: [],
  ...overrides,
});

describe('calculateStats', () => {
  it('returns base stats with no attachments', () => {
    const weapon = makeWeapon();
    const result = calculateStats(weapon, 0, []);
    expect(result.damage).toBe(10);
    expect(result.fireRate).toBe(30);
    expect(result.dps).toBe(300);
  });

  it('applies attachment effects to stats', () => {
    const weapon = makeWeapon();
    const attachment: BuildAttachment = { slot: 'muzzle', attachmentId: 'silencer-i' };
    const result = calculateStats(weapon, 0, [attachment]);
    expect(result.damage).toBeGreaterThan(0);
  });

  it('handles missing tier gracefully', () => {
    const weapon = makeWeapon({ tiers: [] });
    const result = calculateStats(weapon, 0, []);
    expect(result.damage).toBe(0);
    expect(result.fireRate).toBe(0);
  });

  it('recalculates DPS after attachment changes', () => {
    const weapon = makeWeapon();
    const result = calculateStats(weapon, 0, []);
    expect(result.dps).toBe(result.damage * result.fireRate);
  });

  it('handles null attachment entries', () => {
    const weapon = makeWeapon();
    const attachments: BuildAttachment[] = [{ slot: 'muzzle', attachmentId: null }];
    const result = calculateStats(weapon, 0, attachments);
    expect(result.damage).toBe(10);
  });

  it('works for different tiers', () => {
    const weapon = makeWeapon();
    const tier0 = calculateStats(weapon, 0, []);
    const tier1 = calculateStats(weapon, 1, []);
    expect(tier1.damage).toBeGreaterThan(tier0.damage);
    expect(tier1.fireRate).toBeGreaterThan(tier0.fireRate);
  });
});

describe('statLabel', () => {
  it('returns readable labels for all stat keys', () => {
    const keys: (keyof WeaponStat)[] = [
      'damage',
      'fireRate',
      'range',
      'dps',
      'magSize',
      'verticalRecoil',
      'horizontalRecoil',
      'adsSpeed',
      'reloadSpeed',
      'bulletVelocity',
      'dispersion',
      'agility',
      'stability',
      'stealth',
    ];
    for (const key of keys) {
      expect(statLabel(key)).toBeTruthy();
      expect(typeof statLabel(key)).toBe('string');
    }
  });
});

describe('isHigherBetter', () => {
  it('returns false for recoil and handling stats', () => {
    expect(isHigherBetter('verticalRecoil')).toBe(false);
    expect(isHigherBetter('horizontalRecoil')).toBe(false);
    expect(isHigherBetter('dispersion')).toBe(false);
    expect(isHigherBetter('reloadSpeed')).toBe(false);
    expect(isHigherBetter('adsSpeed')).toBe(false);
  });

  it('returns true for damage and performance stats', () => {
    expect(isHigherBetter('damage')).toBe(true);
    expect(isHigherBetter('fireRate')).toBe(true);
    expect(isHigherBetter('range')).toBe(true);
    expect(isHigherBetter('dps')).toBe(true);
    expect(isHigherBetter('magSize')).toBe(true);
  });
});

describe('normalizeStat', () => {
  it('returns 0-100 for in-range values', () => {
    const n = normalizeStat(50, 'damage');
    expect(n).toBeGreaterThanOrEqual(0);
    expect(n).toBeLessThanOrEqual(100);
  });

  it('clamps values above range to 100', () => {
    expect(normalizeStat(999, 'damage')).toBe(100);
  });

  it('clamps values below range to 0', () => {
    expect(normalizeStat(-1, 'damage')).toBe(0);
  });
});
