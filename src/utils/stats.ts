import { getAttachmentById } from '../data/attachments';
import type { Weapon, WeaponStat, AttachmentSlot, BuildAttachment } from '../types';

export function calculateStats(weapon: Weapon, tier: number, attachments: BuildAttachment[]): WeaponStat {
  const base = weapon.tiers[tier];
  if (!base) {
    return {
      damage: 0, fireRate: 0, range: 0, dps: 0, magSize: 0,
      verticalRecoil: 0, horizontalRecoil: 0, adsSpeed: 0,
      reloadSpeed: 0, bulletVelocity: 0, dispersion: 0,
    };
  }
  const stats: WeaponStat = { ...base.stats };

  for (const ba of attachments) {
    if (!ba.attachmentId) continue;
    const att = getAttachmentById(ba.attachmentId);
    if (!att) continue;

    for (const [key, value] of Object.entries(att.effects)) {
      const k = key as keyof WeaponStat;
      if (value === undefined) continue;
      if (k === 'magSize') {
        stats[k] = Math.round(Math.max(1, stats[k] + value));
      } else {
        stats[k] = Math.round(stats[k] * (1 + value / 100));
      }
    }

    for (const [key, value] of Object.entries(att.penalties ?? {})) {
      const k = key as keyof WeaponStat;
      if (value === undefined) continue;
      if (k === 'magSize') {
        stats[k] = Math.round(Math.max(1, stats[k] + value));
      } else if (typeof value === 'number' && value < 0) {
        stats[k] = Math.round(stats[k] * (1 + value / 100));
      } else {
        stats[k] = Math.round(stats[k] + value);
      }
    }
  }

  stats.dps = Math.round(stats.damage * stats.fireRate * 10) / 10;
  return stats;
}

export function statLabel(key: keyof WeaponStat): string {
  const labels: Record<keyof WeaponStat, string> = {
    damage: 'Damage', fireRate: 'Fire Rate', range: 'Range', dps: 'DPS',
    magSize: 'Mag Size', verticalRecoil: 'V-Recoil', horizontalRecoil: 'H-Recoil',
    adsSpeed: 'ADS Speed', reloadSpeed: 'Reload', bulletVelocity: 'Velocity', dispersion: 'Dispersion',
  };
  return labels[key];
}

export function isHigherBetter(key: keyof WeaponStat): boolean {
  return !['verticalRecoil', 'horizontalRecoil', 'dispersion', 'reloadSpeed', 'adsSpeed'].includes(key);
}

export function normalizeStat(value: number, key: keyof WeaponStat): number {
  const ranges: Partial<Record<keyof WeaponStat, [number, number]>> = {
    damage: [0, 100], fireRate: [0, 100], range: [0, 100], dps: [0, 2000],
    magSize: [0, 60], verticalRecoil: [0, 100], horizontalRecoil: [0, 100],
    adsSpeed: [0, 100], reloadSpeed: [0, 6], bulletVelocity: [0, 100], dispersion: [0, 100],
  };
  const range = ranges[key];
  if (!range) return 50;
  const [min, max] = range;
  return Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
}
