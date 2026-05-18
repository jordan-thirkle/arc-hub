import type { Weapon, WeaponTier, WeaponStat, WeaponClass, AmmoType, AttachmentSlot } from '../types';

interface WeaponDef {
  id: string; name: string; class: WeaponClass; ammoType: AmmoType;
  firingMode: string; description: string; rarity: Weapon['rarity'];
  slotUsage: WeaponStat['magSize']; weight: number;
  damage: number; fireRate: number; range: number; magSize: number;
  verticalRecoil: number; horizontalRecoil: number;
  adsSpeed: number; reloadSpeed: number; bulletVelocity: number; dispersion: number;
  value: [number, number, number, number];
  attachmentSlots: AttachmentSlot[];
}

function buildTier(label: Weapon['tiers'][0]['label'], tier: WeaponTier, d: WeaponDef): Weapon['tiers'][0] {
  const tMult = 1 + tier * 0.07;
  const rMult = 1 - tier * 0.07;
  const magBase = d.magSize + tier * 4;
  const stats: WeaponStat = {
    damage: Math.round(d.damage * tMult * 10) / 10,
    fireRate: d.fireRate,
    range: d.range,
    dps: Math.round(d.damage * tMult * d.fireRate * 10) / 10,
    magSize: magBase,
    verticalRecoil: Math.round(d.verticalRecoil * rMult * 10) / 10,
    horizontalRecoil: Math.round(d.horizontalRecoil * rMult * 10) / 10,
    adsSpeed: Math.round(d.adsSpeed * (1 + tier * 0.05) * 10) / 10,
    reloadSpeed: Math.round(d.reloadSpeed * (1 - tier * 0.05) * 10) / 10,
    bulletVelocity: d.bulletVelocity,
    dispersion: Math.round(d.dispersion * rMult * 10) / 10,
  };
  return { tier, label, stats, value: d.value[tier], weight: d.weight };
}

const w = (d: WeaponDef): Weapon => ({
  id: d.id, name: d.name, class: d.class, ammoType: d.ammoType,
  firingMode: d.firingMode, image: `https://cdn.metaforge.app/arc-raiders/icons/${d.id}.webp`,
  description: d.description, rarity: d.rarity,
  tiers: ([0, 1, 2, 3] as WeaponTier[]).map(t => buildTier(['I', 'II', 'III', 'IV'][t] as Weapon['tiers'][0]['label'], t, d)),
  attachmentSlots: d.attachmentSlots, compatibleAttachments: [],
});

export const weapons: Weapon[] = [
  // ── Assault Rifles ──
  w({ id: 'kettle', name: 'Kettle', class: 'Assault Rifle', ammoType: 'light',
    firingMode: 'Semi-Auto', description: 'Precise semi-auto AR. Slow fire rate, high control.',
    rarity: 'Common', slotUsage: 2, weight: 8,
    damage: 8.5, fireRate: 30, range: 42.8, magSize: 20,
    verticalRecoil: 18, horizontalRecoil: 12, adsSpeed: 0.45, reloadSpeed: 2.2, bulletVelocity: 500, dispersion: 1.2,
    value: [750, 1200, 2400, 4200],
    attachmentSlots: ['muzzle', 'underbarrel', 'light-magazine', 'stock'] }),

  w({ id: 'rattler', name: 'Rattler', class: 'Assault Rifle', ammoType: 'medium',
    firingMode: 'Full-Auto', description: 'Fast-firing medium AR. High DPS, moderate recoil.',
    rarity: 'Common', slotUsage: 2, weight: 9,
    damage: 9, fireRate: 33.3, range: 56.2, magSize: 10,
    verticalRecoil: 22, horizontalRecoil: 15, adsSpeed: 0.5, reloadSpeed: 2.0, bulletVelocity: 550, dispersion: 1.5,
    value: [850, 1500, 3000, 5200],
    attachmentSlots: ['muzzle', 'underbarrel', 'stock'] }),

  w({ id: 'arpeggio', name: 'Arpeggio', class: 'Assault Rifle', ammoType: 'medium',
    firingMode: '3-Round Burst', description: 'Burst-fire AR. Devastating at mid range.',
    rarity: 'Uncommon', slotUsage: 2, weight: 10,
    damage: 9.5, fireRate: 18.3, range: 55.9, magSize: 24,
    verticalRecoil: 14, horizontalRecoil: 10, adsSpeed: 0.5, reloadSpeed: 2.1, bulletVelocity: 580, dispersion: 1.0,
    value: [1800, 3200, 5000, 7500],
    attachmentSlots: ['muzzle', 'underbarrel', 'medium-magazine', 'stock'] }),

  w({ id: 'tempest', name: 'Tempest', class: 'Assault Rifle', ammoType: 'medium',
    firingMode: 'Full-Auto', description: 'High-caliber AR. Slower fire rate but hard-hitting.',
    rarity: 'Uncommon', slotUsage: 2, weight: 11,
    damage: 10, fireRate: 36.7, range: 55.9, magSize: 25,
    verticalRecoil: 25, horizontalRecoil: 17, adsSpeed: 0.55, reloadSpeed: 2.3, bulletVelocity: 560, dispersion: 1.6,
    value: [2000, 3800, 6000, 8800],
    attachmentSlots: ['muzzle', 'underbarrel', 'medium-magazine'] }),

  w({ id: 'bettina', name: 'Bettina', class: 'Assault Rifle', ammoType: 'heavy',
    firingMode: 'Full-Auto', description: 'Powerful heavy AR. Slower handling, massive damage.',
    rarity: 'Rare', slotUsage: 2, weight: 13,
    damage: 16, fireRate: 28.7, range: 52.3, magSize: 20,
    verticalRecoil: 30, horizontalRecoil: 20, adsSpeed: 0.6, reloadSpeed: 2.5, bulletVelocity: 520, dispersion: 1.8,
    value: [4000, 7000, 11000, 16000],
    attachmentSlots: ['muzzle', 'underbarrel', 'stock'] }),

  // ── Battle Rifles ──
  w({ id: 'ferro', name: 'Ferro', class: 'Battle Rifle', ammoType: 'heavy',
    firingMode: 'Break-Action Single', description: 'Single-shot battle rifle. Extremely high damage per shot.',
    rarity: 'Uncommon', slotUsage: 1, weight: 14,
    damage: 40, fireRate: 6.6, range: 53.1, magSize: 1,
    verticalRecoil: 35, horizontalRecoil: 22, adsSpeed: 0.55, reloadSpeed: 2.8, bulletVelocity: 600, dispersion: 0.8,
    value: [1500, 2800, 4500, 6500],
    attachmentSlots: ['muzzle', 'underbarrel', 'stock'] }),

  w({ id: 'renegade', name: 'Renegade', class: 'Battle Rifle', ammoType: 'medium',
    firingMode: 'Lever-Action', description: 'Lever-action rifle. Hits hard, great range.',
    rarity: 'Common', slotUsage: 1, weight: 12,
    damage: 35, fireRate: 21, range: 68.8, magSize: 8,
    verticalRecoil: 28, horizontalRecoil: 18, adsSpeed: 0.5, reloadSpeed: 1.8, bulletVelocity: 650, dispersion: 0.9,
    value: [600, 1100, 2200, 3800],
    attachmentSlots: ['muzzle', 'medium-magazine', 'stock'] }),

  w({ id: 'aphelion', name: 'Aphelion', class: 'Battle Rifle', ammoType: 'energy',
    firingMode: '2-Round Burst', description: 'Energy BR. Low ammo consumption, high precision.',
    rarity: 'Rare', slotUsage: 2, weight: 11,
    damage: 25, fireRate: 9, range: 76, magSize: 10,
    verticalRecoil: 16, horizontalRecoil: 10, adsSpeed: 0.5, reloadSpeed: 2.0, bulletVelocity: 700, dispersion: 0.7,
    value: [3500, 6000, 9500, 14000],
    attachmentSlots: ['underbarrel', 'stock'] }),

  // ── SMGs ──
  w({ id: 'stitcher', name: 'Stitcher', class: 'SMG', ammoType: 'light',
    firingMode: 'Full-Auto', description: 'Well-rounded SMG. Good fire rate and control.',
    rarity: 'Common', slotUsage: 1, weight: 6,
    damage: 6.5, fireRate: 45.3, range: 42.1, magSize: 20,
    verticalRecoil: 16, horizontalRecoil: 14, adsSpeed: 0.35, reloadSpeed: 1.8, bulletVelocity: 400, dispersion: 2.0,
    value: [500, 900, 1800, 3200],
    attachmentSlots: ['muzzle', 'underbarrel', 'light-magazine', 'stock'] }),

  w({ id: 'canto', name: 'Canto', class: 'SMG', ammoType: 'medium',
    firingMode: 'Full-Auto', description: 'Extremely high fire rate SMG. Melts at close range.',
    rarity: 'Uncommon', slotUsage: 1, weight: 7,
    damage: 6.5, fireRate: 56.7, range: 51, magSize: 18,
    verticalRecoil: 20, horizontalRecoil: 18, adsSpeed: 0.38, reloadSpeed: 1.9, bulletVelocity: 420, dispersion: 2.3,
    value: [1200, 2200, 4000, 6500],
    attachmentSlots: ['muzzle', 'underbarrel', 'medium-magazine', 'stock'] }),

  w({ id: 'bobcat', name: 'Bobcat', class: 'SMG', ammoType: 'light',
    firingMode: 'Full-Auto', description: 'Max fire rate. Uncontrollable but shreds up close.',
    rarity: 'Common', slotUsage: 1, weight: 5,
    damage: 6, fireRate: 66.7, range: 44, magSize: 20,
    verticalRecoil: 24, horizontalRecoil: 22, adsSpeed: 0.33, reloadSpeed: 1.7, bulletVelocity: 380, dispersion: 2.6,
    value: [400, 800, 1500, 2800],
    attachmentSlots: ['muzzle', 'underbarrel', 'light-magazine', 'stock'] }),

  // ── Shotguns ──
  w({ id: 'iltoro', name: 'Il Toro', class: 'Shotgun', ammoType: 'shotgun',
    firingMode: 'Pump-Action', description: 'Pump shotgun. Devastating per-shot damage.',
    rarity: 'Common', slotUsage: 2, weight: 10,
    damage: 67.5, fireRate: 14, range: 20, magSize: 5,
    verticalRecoil: 32, horizontalRecoil: 12, adsSpeed: 0.55, reloadSpeed: 3.0, bulletVelocity: 300, dispersion: 4.0,
    value: [600, 1100, 2200, 3800],
    attachmentSlots: ['shotgun-muzzle', 'underbarrel', 'shotgun-magazine', 'stock'] }),

  w({ id: 'vulcano', name: 'Vulcano', class: 'Shotgun', ammoType: 'shotgun',
    firingMode: 'Semi-Auto', description: 'Semi-auto shotgun. Fast follow-up shots.',
    rarity: 'Uncommon', slotUsage: 2, weight: 11,
    damage: 49.5, fireRate: 26.3, range: 26, magSize: 6,
    verticalRecoil: 28, horizontalRecoil: 10, adsSpeed: 0.55, reloadSpeed: 2.5, bulletVelocity: 320, dispersion: 3.5,
    value: [1400, 2500, 4500, 7000],
    attachmentSlots: ['shotgun-muzzle', 'underbarrel', 'shotgun-magazine', 'stock'] }),

  w({ id: 'dolabra', name: 'Dolabra', class: 'Shotgun', ammoType: 'energy',
    firingMode: 'Semi-Auto', description: 'Legendary energy shotgun. Stats unknown.',
    rarity: 'Legendary', slotUsage: 2, weight: 10,
    damage: 0, fireRate: 0, range: 0, magSize: 0,
    verticalRecoil: 0, horizontalRecoil: 0, adsSpeed: 1, reloadSpeed: 0, bulletVelocity: 0, dispersion: 0,
    value: [0, 0, 0, 0],
    attachmentSlots: [] }),

  // ── Pistols ──
  w({ id: 'hairpin', name: 'Hairpin', class: 'Pistol', ammoType: 'light',
    firingMode: 'Slide-Action', description: 'Sidearm with unique slide-action mechanism.',
    rarity: 'Common', slotUsage: 1, weight: 3,
    damage: 20, fireRate: 9, range: 38.6, magSize: 8,
    verticalRecoil: 12, horizontalRecoil: 8, adsSpeed: 0.3, reloadSpeed: 1.5, bulletVelocity: 350, dispersion: 1.0,
    value: [300, 600, 1200, 2200],
    attachmentSlots: ['light-magazine'] }),

  w({ id: 'burletta', name: 'Burletta', class: 'Pistol', ammoType: 'light',
    firingMode: 'Semi-Auto', description: 'Standard sidearm. Reliable, low cost.',
    rarity: 'Common', slotUsage: 1, weight: 3,
    damage: 10, fireRate: 28, range: 41.7, magSize: 12,
    verticalRecoil: 14, horizontalRecoil: 10, adsSpeed: 0.3, reloadSpeed: 1.6, bulletVelocity: 380, dispersion: 1.2,
    value: [200, 400, 800, 1500],
    attachmentSlots: ['muzzle', 'light-magazine'] }),

  w({ id: 'venator', name: 'Venator', class: 'Pistol', ammoType: 'medium',
    firingMode: 'Semi-Auto', description: 'High-calibre pistol. Hits hard for a sidearm.',
    rarity: 'Uncommon', slotUsage: 1, weight: 4,
    damage: 18, fireRate: 36.7, range: 48.4, magSize: 10,
    verticalRecoil: 18, horizontalRecoil: 12, adsSpeed: 0.33, reloadSpeed: 1.7, bulletVelocity: 420, dispersion: 1.4,
    value: [800, 1500, 3000, 5000],
    attachmentSlots: ['underbarrel', 'medium-magazine'] }),

  // ── Hand Cannons ──
  w({ id: 'anvil', name: 'Anvil', class: 'Hand Cannon', ammoType: 'heavy',
    firingMode: 'Single-Action', description: 'Heavy hand cannon. Slow but devastating.',
    rarity: 'Rare', slotUsage: 1, weight: 6,
    damage: 40, fireRate: 16.3, range: 50.2, magSize: 6,
    verticalRecoil: 38, horizontalRecoil: 15, adsSpeed: 0.4, reloadSpeed: 2.2, bulletVelocity: 500, dispersion: 1.5,
    value: [2800, 5000, 8500, 13000],
    attachmentSlots: ['muzzle', 'tech-mod'] }),

  // ── LMGs ──
  w({ id: 'torrente', name: 'Torrente', class: 'LMG', ammoType: 'medium',
    firingMode: 'Full-Auto', description: 'Light machine gun. High capacity, sustained fire.',
    rarity: 'Rare', slotUsage: 2, weight: 16,
    damage: 8, fireRate: 58.3, range: 49.9, magSize: 60,
    verticalRecoil: 28, horizontalRecoil: 20, adsSpeed: 0.7, reloadSpeed: 3.5, bulletVelocity: 540, dispersion: 2.2,
    value: [3200, 5800, 9500, 14500],
    attachmentSlots: ['muzzle', 'medium-magazine', 'stock'] }),

  // ── Sniper Rifles ──
  w({ id: 'osprey', name: 'Osprey', class: 'Sniper Rifle', ammoType: 'medium',
    firingMode: 'Bolt-Action', description: 'Bolt-action sniper. Excellent range and damage.',
    rarity: 'Uncommon', slotUsage: 2, weight: 12,
    damage: 45, fireRate: 17.7, range: 80.3, magSize: 8,
    verticalRecoil: 20, horizontalRecoil: 8, adsSpeed: 0.65, reloadSpeed: 2.8, bulletVelocity: 800, dispersion: 0.5,
    value: [2200, 4000, 6500, 9500],
    attachmentSlots: ['muzzle', 'underbarrel', 'medium-magazine', 'stock'] }),

  w({ id: 'jupiter', name: 'Jupiter', class: 'Sniper Rifle', ammoType: 'energy',
    firingMode: 'Bolt-Action', description: 'Legendary energy rifle. One-shot potential.',
    rarity: 'Legendary', slotUsage: 2, weight: 13,
    damage: 60, fireRate: 7.7, range: 71.7, magSize: 5,
    verticalRecoil: 18, horizontalRecoil: 6, adsSpeed: 0.65, reloadSpeed: 2.5, bulletVelocity: 900, dispersion: 0.4,
    value: [8000, 14000, 22000, 32000],
    attachmentSlots: [] }),

  // ── Specials ──
  w({ id: 'hullcracker', name: 'Hullcracker', class: 'Special', ammoType: 'launcher',
    firingMode: 'Pump-Action', description: 'Grenade launcher. Explosive area denial.',
    rarity: 'Rare', slotUsage: 2, weight: 15,
    damage: 100, fireRate: 20.3, range: 38.9, magSize: 5,
    verticalRecoil: 40, horizontalRecoil: 25, adsSpeed: 0.65, reloadSpeed: 3.2, bulletVelocity: 200, dispersion: 3.0,
    value: [3500, 6000, 10000, 15000],
    attachmentSlots: ['underbarrel', 'stock'] }),

  w({ id: 'equalizer', name: 'Equalizer', class: 'Special', ammoType: 'energy',
    firingMode: 'Full-Auto', description: 'Legendary energy LMG. Devastating sustained fire.',
    rarity: 'Legendary', slotUsage: 2, weight: 14,
    damage: 8, fireRate: 33.3, range: 68.6, magSize: 50,
    verticalRecoil: 22, horizontalRecoil: 14, adsSpeed: 0.6, reloadSpeed: 3.0, bulletVelocity: 650, dispersion: 1.8,
    value: [10000, 18000, 28000, 40000],
    attachmentSlots: [] }),
];

export function getWeaponById(id: string): Weapon | undefined {
  return weapons.find(w => w.id === id);
}

export function getWeaponsByClass(className: WeaponClass): Weapon[] {
  return weapons.filter(w => w.class === className);
}

export function mergeApiWeapons(apiData: Record<string, unknown>): Weapon[] {
  return weapons.map(w => {
    const apiW = apiData[w.id] as Record<string, unknown> | undefined;
    if (!apiW) return w;
    const apiTiers = apiW.tiers as Array<Record<string, unknown>> | undefined;
    if (!apiTiers) return w;
    return {
      ...w,
      tiers: w.tiers.map((t, i) => {
        const apiT = apiTiers[i];
        if (!apiT || !apiT.stats) return t;
        const apiStats = apiT.stats as Record<string, number>;
        return {
          ...t,
          stats: {
            ...t.stats,
            ...Object.fromEntries(
              Object.entries(apiStats).filter(([, v]) => typeof v === 'number')
            ),
          },
        };
      }),
    };
  });
}
