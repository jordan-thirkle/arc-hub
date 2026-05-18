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

export type AttachmentSlot = 'muzzle' | 'underbarrel' | 'magazine' | 'stock';

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
  | 'Extended Heavy Mag'
  | 'Extended Shotgun Mag'
  | 'Stable Stock'
  | 'Lightweight Stock'
  | 'Padded Stock'
  | 'Kinetic Converter'
  | 'Anvil Splitter';

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
}

export interface Attachment {
  id: string;
  name: string;
  tier: number;
  slot: AttachmentSlot;
  type: AttachmentType;
  compatibleWith: string[];
  effects: Partial<Record<keyof WeaponStat, number>>;
  description: string;
}

export interface Weapon {
  id: string;
  name: string;
  class: WeaponClass;
  ammoType: AmmoType;
  firingMode: string;
  image: string;
  stats: WeaponStat;
  baseStats: WeaponStat;
  attachmentSlots: AttachmentSlot[];
  compatibleAttachments: string[];
  description: string;
}

export interface Build {
  id: string;
  name: string;
  weaponId: string;
  attachments: Record<AttachmentSlot, string | null>;
  createdAt: string;
  notes?: string;
}
