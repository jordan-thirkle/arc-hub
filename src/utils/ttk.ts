import { calculateStats } from './stats';
import type { Weapon, WeaponTier, BuildAttachment } from '../types';

export type TargetType = 'unshielded' | 'light' | 'medium' | 'heavy';

export const TARGET_LABELS: Record<TargetType, string> = {
  unshielded: 'Unshielded',
  light: 'Light Shield',
  medium: 'Medium Shield',
  heavy: 'Heavy Shield',
};

export const TARGET_SHIELD_HP: Record<TargetType, number> = {
  unshielded: 0,
  light: 75,
  medium: 125,
  heavy: 200,
};

export const TARGET_PENETRATION: Record<TargetType, number> = {
  unshielded: 1.0,
  light: 0.60,
  medium: 0.55,
  heavy: 0.45,
};

export const BASE_TARGET_HP = 100;

export interface TTKResult {
  ttk: number;
  shotsToKill: number;
  shieldShots: number;
  fleshShots: number;
  shieldTtk: number;
  fleshTtk: number;
  dps: number;
  effectiveDps: number;
}

export function calculateTTK(
  weapon: Weapon,
  tier: WeaponTier,
  attachments: BuildAttachment[],
  target: TargetType,
): TTKResult {
  const stats = calculateStats(weapon, tier, attachments);
  const fireRatePerSec = stats.fireRate;
  const interval = fireRatePerSec > 0 ? 1 / fireRatePerSec : 0;
  const shieldHp = TARGET_SHIELD_HP[target];
  const penMod = TARGET_PENETRATION[target];
  const dmg = stats.damage <= 0 ? 1 : stats.damage;

  const damageThroughPerShot = dmg * penMod;
  const shieldShots = shieldHp > 0 && damageThroughPerShot > 0
    ? Math.ceil(shieldHp / damageThroughPerShot)
    : 0;
  const effectiveShieldHp = shieldHp > 0 ? shieldHp : 0;
  const shieldTtk = shieldHp > 0 && damageThroughPerShot > 0
    ? (effectiveShieldHp / damageThroughPerShot) * interval
    : 0;

  const fleshShots = Math.ceil(BASE_TARGET_HP / dmg);
  const fleshTtk = (BASE_TARGET_HP / dmg) * interval;

  const totalTtk = shieldTtk + fleshTtk;
  const effectiveDps = totalTtk > 0 ? (shieldHp + BASE_TARGET_HP) / totalTtk : 0;

  return {
    ttk: Math.round(totalTtk * 100) / 100,
    shotsToKill: shieldShots + fleshShots,
    shieldShots,
    fleshShots,
    shieldTtk: Math.round(shieldTtk * 100) / 100,
    fleshTtk: Math.round(fleshTtk * 100) / 100,
    dps: stats.dps,
    effectiveDps: Math.round(effectiveDps * 10) / 10,
  };
}

export function getTargetColor(target: TargetType): string {
  switch (target) {
    case 'unshielded': return '#8BC34A';
    case 'light': return '#FFC107';
    case 'medium': return '#FF9800';
    case 'heavy': return '#F44336';
  }
}