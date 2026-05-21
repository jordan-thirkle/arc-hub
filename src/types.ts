export type AmmoType = 'light' | 'medium' | 'heavy' | 'shotgun' | 'energy' | 'launcher';

export type WeaponClass =
  | 'Assault Rifle'
  | 'Battle Rifle'
  | 'SMG'
  | 'Shotgun'
  | 'Sniper Rifle'
  | 'LMG'
  | 'Pistol'
  | 'Hand Cannon'
  | 'Special';

export type AttachmentSlot =
  | 'muzzle'
  | 'shotgun-muzzle'
  | 'underbarrel'
  | 'light-magazine'
  | 'medium-magazine'
  | 'shotgun-magazine'
  | 'stock'
  | 'tech-mod';

export type AttachmentType =
  | 'Silencer'
  | 'Compensator'
  | 'Muzzle Brake'
  | 'Extended Barrel'
  | 'Shotgun Choke'
  | 'Shotgun Silencer'
  | 'Vertical Grip'
  | 'Angled Grip'
  | 'Horizontal Grip'
  | 'Extended Light Mag'
  | 'Extended Medium Mag'
  | 'Extended Shotgun Mag'
  | 'Stable Stock'
  | 'Lightweight Stock'
  | 'Padded Stock'
  | 'Kinetic Converter'
  | 'Anvil Splitter';

export type AugmentType = 'Combat' | 'Looting' | 'Tactical' | 'Free';

export type AugmentTier = 'Mk.1' | 'Mk.2' | 'Mk.3';

export interface AugmentTierData {
  tier: AugmentTier;
  weightLimit: number;
  backpackSlots: number;
  quickUseSlots: number;
  safePocketSlots: number;
  augmentedSlots: { type: string; count: number }[];
  weaponSlots: number;
  integratedTool?: string;
  perkDescription: string;
  crafting?: {
    station: string;
    level: number;
    materials: { id: string; name: string; quantity: number }[];
  };
}

export type ShieldName = 'Light Shield' | 'Medium Shield' | 'Heavy Shield';

export type QuickUseCategory = 'Medical' | 'Shield' | 'Stamina' | 'Grenade' | 'Utility' | 'Trap';

export type SkillBranch = 'Conditioning' | 'Mobility' | 'Survival';

export type BuildRole =
  | 'Allrounder'
  | 'PvP Aggressor'
  | 'PvE Farmer'
  | 'Stealth'
  | 'Budget'
  | 'Boss Killer'
  | 'CQB'
  | 'Support'
  | 'Rat';

export type WeaponTier = 0 | 1 | 2 | 3;

export interface WeaponStat {
  damage: number;
  fireRate: number;
  range: number;
  dps: number;
  magSize: number;
  verticalRecoil: number;
  horizontalRecoil: number;
  adsSpeed: number;
  reloadSpeed: number;
  bulletVelocity: number;
  dispersion: number;
  agility: number;
  stability: number;
  stealth: number;
}

export interface Attachment {
  id: string;
  name: string;
  tier: number;
  slot: AttachmentSlot;
  type: AttachmentType;
  compatibleWith: string[];
  effects: Partial<Record<keyof WeaponStat, number>>;
  penalties?: Partial<Record<keyof WeaponStat, number>>;
  description: string;
  crafting?: {
    station: string;
    level: number;
    materials: { id: string; name: string; quantity: number }[];
  };
}

export interface WeaponTierData {
  tier: WeaponTier;
  label: string;
  stats: WeaponStat;
  value: number;
  weight: number;
}

export interface Weapon {
  id: string;
  name: string;
  class: WeaponClass;
  ammoType: AmmoType;
  firingMode: string;
  image: string;
  description: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
  tiers: WeaponTierData[];
  attachmentSlots: AttachmentSlot[];
  compatibleAttachments: string[];
}

export interface Augment {
  id: string;
  name: string;
  type: AugmentType;
  variant?: string;
  shieldCompatibility: ShieldName[];
  tiers: AugmentTierData[];
}

export interface Shield {
  id: string;
  name: ShieldName;
  charge: number;
  damageMitigation: number;
  penetrationModifier: number;
  hp: number;
  movementPenalty: number;
  weight: number;
  compatibleAugments: string[];
  crafting?: {
    station: string;
    level: number;
    materials: { id: string; name: string; quantity: number }[];
  };
}

export interface QuickUseItem {
  id: string;
  name: string;
  category: QuickUseCategory;
  weight: number;
  effect: string;
  description: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
  crafting?: {
    station: string;
    level: number;
    materials: { id: string; name: string; quantity: number }[];
  };
}

export interface SkillNode {
  id: string;
  name: string;
  branch: SkillBranch;
  maxPoints: number;
  pointCost: number;
  prerequisites: string[];
  effectPerLevel: string;
  icon: string;
  recommended: 'S' | 'A' | 'B' | 'F';
  gridPosition: { row: number; col: number };
}

export interface MapData {
  id: string;
  name: string;
  difficulty: number;
  unlockRound: number;
  duration: number;
  conditions: string[];
  puzzleLoot?: string;
  loadoutTips: string[];
}

export interface Trader {
  id: string;
  name: string;
  currency: string;
  inventory: {
    itemId: string;
    price: number;
    stockLimit?: number;
    category: string;
  }[];
}

export interface BuildAttachment {
  slot: AttachmentSlot;
  attachmentId: string | null;
}

export interface Build {
  id: string;
  name: string;
  primaryWeaponId: string;
  primaryTier: WeaponTier;
  primaryAttachments: BuildAttachment[];
  secondaryWeaponId?: string;
  secondaryTier?: WeaponTier;
  secondaryAttachments?: BuildAttachment[];
  augmentId?: string;
  shieldId?: string;
  quickUseItems: (string | null)[];
  createdAt: string;
  patch?: string;
  notes?: string;
}

export interface MetaBuild {
  id: string;
  name: string;
  role: BuildRole;
  patch: string;
  description: string;
  build: Omit<Build, 'id' | 'createdAt'>;
  rating: number;
  votes: number;
  author: string;
  tags: string[];
}

export const WEAPON_TIER_MULTIPLIERS: Record<
  WeaponTier,
  { label: string; magBonus: number; statMult: number; recoilMult: number }
> = {
  0: { label: 'I', magBonus: 0, statMult: 1.0, recoilMult: 1.0 },
  1: { label: 'II', magBonus: 4, statMult: 1.08, recoilMult: 0.92 },
  2: { label: 'III', magBonus: 8, statMult: 1.15, recoilMult: 0.85 },
  3: { label: 'IV', magBonus: 12, statMult: 1.22, recoilMult: 0.78 },
};

export const SLOT_LABELS: Record<AttachmentSlot, string> = {
  muzzle: 'Muzzle',
  'shotgun-muzzle': 'Choke',
  underbarrel: 'Underbarrel',
  'light-magazine': 'Light Mag',
  'medium-magazine': 'Med Mag',
  'shotgun-magazine': 'Tube Mag',
  stock: 'Stock',
  'tech-mod': 'Tech Mod',
};

export interface ErmalAcceptedItem {
  id: string;
  name: string;
  valueCategory: 'Extremely High' | 'High' | 'Medium' | 'Low';
  baseValue: number;
}

export const ERMAL_TARGET_VALUES = {
  'tempest-blueprint': 1000000,
  'rascal-blueprint': 800000,
  'vault-access-key': 500000,
  'stash-expansion': 250000,
};

export const AMMO_COLORS: Record<AmmoType, string> = {
  light: '#8BC34A',
  medium: '#FFC107',
  heavy: '#F44336',
  shotgun: '#FF9800',
  energy: '#03A9F4',
  launcher: '#9C27B0',
};
