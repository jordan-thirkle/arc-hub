import { attachments } from '../data/weapons';
import type { Weapon, WeaponStat, AttachmentSlot } from '../types';

export function calculateStats(weapon: Weapon, equipped: Record<AttachmentSlot, string | null>): WeaponStat {
  const stats: WeaponStat = { ...weapon.baseStats };

  for (const slot of Object.keys(equipped) as AttachmentSlot[]) {
    const attId = equipped[slot];
    if (!attId) continue;
    const att = attachments.find((a) => a.id === attId);
    if (!att) continue;
    const effects = att.effects as Partial<Record<keyof WeaponStat, number>>;
    for (const [key, value] of Object.entries(effects)) {
      if (value === undefined) continue;
      const k = key as keyof WeaponStat;
      if (k === 'magSize') {
        stats[k] = Math.round(Math.max(1, stats[k] + value));
      } else {
        stats[k] = Math.round(stats[k] * (1 + value / 100));
      }
    }
  }

  return stats;
}

export function statLabel(key: keyof WeaponStat): string {
  const labels: Record<keyof WeaponStat, string> = {
    damage: 'Damage',
    fireRate: 'Fire Rate',
    range: 'Range',
    dps: 'DPS',
    magSize: 'Mag Size',
    verticalRecoil: 'V-Recoil',
    horizontalRecoil: 'H-Recoil',
    adsSpeed: 'ADS Speed',
    reloadSpeed: 'Reload',
    bulletVelocity: 'Velocity',
    dispersion: 'Dispersion',
  };
  return labels[key];
}

export function isHigherBetter(key: keyof WeaponStat): boolean {
  return !['verticalRecoil', 'horizontalRecoil', 'dispersion', 'reloadSpeed'].includes(key);
}

export function normalizeStat(value: number, key: keyof WeaponStat): number {
  const ranges: Partial<Record<keyof WeaponStat, [number, number]>> = {
    damage: [0, 100],
    fireRate: [0, 100],
    range: [0, 100],
    dps: [0, 2000],
    magSize: [0, 60],
    verticalRecoil: [0, 100],
    horizontalRecoil: [0, 100],
    adsSpeed: [0, 100],
    reloadSpeed: [0, 6],
    bulletVelocity: [0, 100],
    dispersion: [0, 100],
  };
  const range = ranges[key];
  if (!range) return 50;
  const [min, max] = range;
  return Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
}
