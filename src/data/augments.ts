import type { Augment } from '../types';

export const augments: Augment[] = [
  {
    id: 'pressure-regulator', name: 'Pressure Regulator', type: 'Combat',
    shieldCompatibility: ['Light Shield', 'Medium Shield', 'Heavy Shield'],
    tiers: [
      { tier: 'Mk.1', weightLimit: 42, backpackSlots: 12, quickUseSlots: 4, safePocketSlots: 1, augmentedSlots: [{ type: 'weapon', count: 1 }], weaponSlots: 2, perkDescription: 'Reduces weapon recoil by 10% while stamina is above 75%.' },
      { tier: 'Mk.2', weightLimit: 45, backpackSlots: 15, quickUseSlots: 4, safePocketSlots: 1, augmentedSlots: [{ type: 'weapon', count: 1 }], weaponSlots: 2, perkDescription: 'Reduces weapon recoil by 15% while stamina is above 75%.' },
      { tier: 'Mk.3', weightLimit: 48, backpackSlots: 18, quickUseSlots: 5, safePocketSlots: 1, augmentedSlots: [{ type: 'weapon', count: 1 }], weaponSlots: 2, perkDescription: 'Reduces weapon recoil by 20% while stamina is above 75%.' },
    ],
  },
  {
    id: 'kinetic-capacitor', name: 'Kinetic Capacitor', type: 'Combat',
    shieldCompatibility: ['Light Shield', 'Medium Shield', 'Heavy Shield'],
    tiers: [
      { tier: 'Mk.1', weightLimit: 42, backpackSlots: 12, quickUseSlots: 4, safePocketSlots: 1, augmentedSlots: [{ type: 'weapon', count: 1 }], weaponSlots: 2, perkDescription: 'Storing a weapon charges it. Next shot deals 15% bonus damage.' },
      { tier: 'Mk.2', weightLimit: 45, backpackSlots: 15, quickUseSlots: 4, safePocketSlots: 1, augmentedSlots: [{ type: 'weapon', count: 1 }], weaponSlots: 2, perkDescription: 'Storing a weapon charges it. Next shot deals 20% bonus damage.' },
      { tier: 'Mk.3', weightLimit: 48, backpackSlots: 18, quickUseSlots: 5, safePocketSlots: 1, augmentedSlots: [{ type: 'weapon', count: 1 }], weaponSlots: 2, perkDescription: 'Storing a weapon charges it. Next shot deals 25% bonus damage.' },
    ],
  },
  {
    id: 'focus', name: 'Focus', type: 'Combat',
    shieldCompatibility: ['Light Shield', 'Medium Shield', 'Heavy Shield'],
    tiers: [
      { tier: 'Mk.1', weightLimit: 42, backpackSlots: 12, quickUseSlots: 4, safePocketSlots: 1, augmentedSlots: [], weaponSlots: 2, perkDescription: 'Standing still for 1 second reduces weapon dispersion by 30%.' },
      { tier: 'Mk.2', weightLimit: 45, backpackSlots: 15, quickUseSlots: 4, safePocketSlots: 1, augmentedSlots: [], weaponSlots: 2, perkDescription: 'Standing still for 1 second reduces weapon dispersion by 40%.' },
      { tier: 'Mk.3', weightLimit: 48, backpackSlots: 18, quickUseSlots: 5, safePocketSlots: 1, augmentedSlots: [], weaponSlots: 2, perkDescription: 'Standing still for 1 second reduces weapon dispersion by 50%.' },
    ],
  },
  {
    id: 'scanner', name: 'Scanner', type: 'Looting',
    shieldCompatibility: ['Light Shield', 'Medium Shield', 'Heavy Shield'],
    tiers: [
      { tier: 'Mk.1', weightLimit: 36, backpackSlots: 12, quickUseSlots: 3, safePocketSlots: 1, augmentedSlots: [], weaponSlots: 2, integratedTool: 'Proximity Scanner', perkDescription: 'Highlights nearby loot containers within 15m.' },
      { tier: 'Mk.2', weightLimit: 40, backpackSlots: 15, quickUseSlots: 4, safePocketSlots: 1, augmentedSlots: [], weaponSlots: 2, integratedTool: 'Proximity Scanner', perkDescription: 'Highlights nearby loot containers within 20m.' },
      { tier: 'Mk.3', weightLimit: 44, backpackSlots: 18, quickUseSlots: 4, safePocketSlots: 2, augmentedSlots: [], weaponSlots: 2, integratedTool: 'Proximity Scanner', perkDescription: 'Highlights nearby loot containers within 25m.' },
    ],
  },
  {
    id: 'breacher', name: 'Breacher', type: 'Looting',
    shieldCompatibility: ['Light Shield', 'Medium Shield', 'Heavy Shield'],
    tiers: [
      { tier: 'Mk.1', weightLimit: 36, backpackSlots: 12, quickUseSlots: 3, safePocketSlots: 1, augmentedSlots: [], weaponSlots: 2, integratedTool: 'Plasma Cutter', perkDescription: 'Opens locked containers. Cut time 8s.' },
      { tier: 'Mk.2', weightLimit: 40, backpackSlots: 15, quickUseSlots: 4, safePocketSlots: 1, augmentedSlots: [], weaponSlots: 2, integratedTool: 'Plasma Cutter', perkDescription: 'Opens locked containers. Cut time 6s.' },
      { tier: 'Mk.3', weightLimit: 44, backpackSlots: 18, quickUseSlots: 4, safePocketSlots: 2, augmentedSlots: [], weaponSlots: 2, integratedTool: 'Plasma Cutter', perkDescription: 'Opens locked containers. Cut time 4s.' },
    ],
  },
  {
    id: 'signal-jammer', name: 'Signal Jammer', type: 'Looting',
    shieldCompatibility: ['Light Shield', 'Medium Shield', 'Heavy Shield'],
    tiers: [
      { tier: 'Mk.1', weightLimit: 36, backpackSlots: 12, quickUseSlots: 3, safePocketSlots: 1, augmentedSlots: [], weaponSlots: 2, perkDescription: 'Prevents enemy radar from detecting you within 10m.' },
      { tier: 'Mk.2', weightLimit: 40, backpackSlots: 15, quickUseSlots: 4, safePocketSlots: 1, augmentedSlots: [], weaponSlots: 2, perkDescription: 'Prevents enemy radar from detecting you within 15m.' },
    ],
  },
  {
    id: 'vital-booster', name: 'Vital Booster', type: 'Tactical',
    shieldCompatibility: ['Light Shield', 'Medium Shield', 'Heavy Shield'],
    tiers: [
      { tier: 'Mk.1', weightLimit: 36, backpackSlots: 12, quickUseSlots: 4, safePocketSlots: 1, augmentedSlots: [], weaponSlots: 2, perkDescription: 'Increases max health by 25.' },
      { tier: 'Mk.2', weightLimit: 40, backpackSlots: 15, quickUseSlots: 4, safePocketSlots: 1, augmentedSlots: [], weaponSlots: 2, perkDescription: 'Increases max health by 50.' },
      { tier: 'Mk.3', weightLimit: 44, backpackSlots: 18, quickUseSlots: 5, safePocketSlots: 1, augmentedSlots: [], weaponSlots: 2, perkDescription: 'Increases max health by 75.' },
    ],
  },
  {
    id: 'trauma-kit', name: 'Trauma Kit', type: 'Tactical',
    shieldCompatibility: ['Light Shield', 'Medium Shield', 'Heavy Shield'],
    tiers: [
      { tier: 'Mk.1', weightLimit: 36, backpackSlots: 12, quickUseSlots: 4, safePocketSlots: 1, augmentedSlots: [], weaponSlots: 2, perkDescription: 'Revive downed teammates 15% faster.' },
      { tier: 'Mk.2', weightLimit: 40, backpackSlots: 15, quickUseSlots: 4, safePocketSlots: 1, augmentedSlots: [], weaponSlots: 2, perkDescription: 'Revive downed teammates 25% faster.' },
      { tier: 'Mk.3', weightLimit: 44, backpackSlots: 18, quickUseSlots: 5, safePocketSlots: 1, augmentedSlots: [], weaponSlots: 2, perkDescription: 'Revive downed teammates 35% faster. Can self-revive once per raid.' },
    ],
  },
  {
    id: 'hazard-module', name: 'Hazard Module', type: 'Tactical',
    shieldCompatibility: ['Light Shield', 'Medium Shield', 'Heavy Shield'],
    tiers: [
      { tier: 'Mk.1', weightLimit: 36, backpackSlots: 12, quickUseSlots: 4, safePocketSlots: 1, augmentedSlots: [], weaponSlots: 2, integratedTool: 'Radiation Filter', perkDescription: 'Reduces radiation damage by 30%. Filters hazardous air.' },
      { tier: 'Mk.2', weightLimit: 40, backpackSlots: 15, quickUseSlots: 4, safePocketSlots: 1, augmentedSlots: [], weaponSlots: 2, integratedTool: 'Radiation Filter', perkDescription: 'Reduces radiation damage by 50%. Filters hazardous air.' },
      { tier: 'Mk.3', weightLimit: 44, backpackSlots: 18, quickUseSlots: 5, safePocketSlots: 1, augmentedSlots: [], weaponSlots: 2, integratedTool: 'Radiation Filter', perkDescription: 'Reduces radiation damage by 70%. Filters hazardous air.' },
    ],
  },
  {
    id: 'drop-pod-beacon', name: 'Drop Pod Beacon', type: 'Tactical',
    shieldCompatibility: ['Light Shield', 'Medium Shield', 'Heavy Shield'],
    tiers: [
      { tier: 'Mk.1', weightLimit: 36, backpackSlots: 12, quickUseSlots: 4, safePocketSlots: 1, augmentedSlots: [], weaponSlots: 2, perkDescription: 'Calls a supply drop once per raid. 35s call-in time.' },
      { tier: 'Mk.2', weightLimit: 40, backpackSlots: 15, quickUseSlots: 4, safePocketSlots: 1, augmentedSlots: [], weaponSlots: 2, perkDescription: 'Calls a supply drop once per raid. 25s call-in time.' },
      { tier: 'Mk.3', weightLimit: 44, backpackSlots: 18, quickUseSlots: 5, safePocketSlots: 1, augmentedSlots: [], weaponSlots: 2, perkDescription: 'Calls a supply drop once per raid. 15s call-in time.' },
    ],
  },
  {
    id: 'space-synthesizer', name: 'Space Synthesizer', type: 'Free',
    shieldCompatibility: ['Light Shield', 'Medium Shield', 'Heavy Shield'],
    tiers: [
      { tier: 'Mk.1', weightLimit: 36, backpackSlots: 15, quickUseSlots: 4, safePocketSlots: 1, augmentedSlots: [], weaponSlots: 2, perkDescription: '+3 backpack slots.' },
      { tier: 'Mk.2', weightLimit: 40, backpackSlots: 20, quickUseSlots: 4, safePocketSlots: 1, augmentedSlots: [], weaponSlots: 2, perkDescription: '+5 backpack slots.' },
      { tier: 'Mk.3', weightLimit: 44, backpackSlots: 25, quickUseSlots: 5, safePocketSlots: 1, augmentedSlots: [], weaponSlots: 2, perkDescription: '+7 backpack slots.' },
    ],
  },
  {
    id: 'weight-converter', name: 'Weight Converter', type: 'Free',
    shieldCompatibility: ['Light Shield', 'Medium Shield', 'Heavy Shield'],
    tiers: [
      { tier: 'Mk.1', weightLimit: 48, backpackSlots: 12, quickUseSlots: 4, safePocketSlots: 1, augmentedSlots: [], weaponSlots: 2, perkDescription: '+6kg weight limit.' },
      { tier: 'Mk.2', weightLimit: 54, backpackSlots: 15, quickUseSlots: 4, safePocketSlots: 1, augmentedSlots: [], weaponSlots: 2, perkDescription: '+12kg weight limit.' },
      { tier: 'Mk.3', weightLimit: 60, backpackSlots: 18, quickUseSlots: 5, safePocketSlots: 1, augmentedSlots: [], weaponSlots: 2, perkDescription: '+18kg weight limit.' },
    ],
  },
  {
    id: 'ammo-converter', name: 'Ammo Converter', type: 'Free',
    shieldCompatibility: ['Light Shield', 'Medium Shield', 'Heavy Shield'],
    tiers: [
      { tier: 'Mk.1', weightLimit: 36, backpackSlots: 12, quickUseSlots: 3, safePocketSlots: 1, augmentedSlots: [{ type: 'ammo', count: 1 }], weaponSlots: 2, perkDescription: 'Converts 1 ammo type to another. 10s conversion time.' },
      { tier: 'Mk.2', weightLimit: 40, backpackSlots: 15, quickUseSlots: 4, safePocketSlots: 1, augmentedSlots: [{ type: 'ammo', count: 1 }], weaponSlots: 2, perkDescription: 'Converts 1 ammo type to another. 7s conversion time.' },
      { tier: 'Mk.3', weightLimit: 44, backpackSlots: 18, quickUseSlots: 4, safePocketSlots: 2, augmentedSlots: [{ type: 'ammo', count: 1 }], weaponSlots: 2, perkDescription: 'Converts 1 ammo type to another. 5s conversion time.' },
    ],
  },
  {
    id: 'armory-converter', name: 'Armory Converter', type: 'Free',
    shieldCompatibility: ['Light Shield', 'Medium Shield', 'Heavy Shield'],
    tiers: [
      { tier: 'Mk.1', weightLimit: 36, backpackSlots: 12, quickUseSlots: 3, safePocketSlots: 1, augmentedSlots: [{ type: 'weapon', count: 1 }], weaponSlots: 3, perkDescription: '+1 weapon slot. Converts stored weapon ammo to current weapon.' },
      { tier: 'Mk.2', weightLimit: 40, backpackSlots: 15, quickUseSlots: 4, safePocketSlots: 1, augmentedSlots: [{ type: 'weapon', count: 1 }], weaponSlots: 3, perkDescription: '+1 weapon slot. Converts stored weapon ammo to current weapon.' },
      { tier: 'Mk.3', weightLimit: 44, backpackSlots: 18, quickUseSlots: 4, safePocketSlots: 2, augmentedSlots: [{ type: 'weapon', count: 1 }], weaponSlots: 3, perkDescription: '+1 weapon slot. Converts stored weapon ammo to current weapon.' },
    ],
  },
];

export function getAugmentById(id: string): Augment | undefined {
  return augments.find(a => a.id === id);
}
