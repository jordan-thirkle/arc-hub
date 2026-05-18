import type { MetaBuild } from '../types';

export const metaBuilds: MetaBuild[] = [
  {
    id: 'meta-rattler-pvp', name: 'Rattler PvP Meta', role: 'PvP Aggressor', patch: '1.26',
    description: 'The definitive PvP build. Rattler III with vertical grip for recoil control and stable stock for ADS speed. Medium shield + Pressure Regulator Mk.2 for combat sustain.',
    build: {
      name: 'Rattler PvP Meta', primaryWeaponId: 'rattler', primaryTier: 2,
      primaryAttachments: [
        { slot: 'muzzle', attachmentId: 'compensator' },
        { slot: 'underbarrel', attachmentId: 'vertical-grip' },
        { slot: 'stock', attachmentId: 'stable-stock' },
      ],
      augmentId: 'pressure-regulator', shieldId: 'medium-shield',
      quickUseItems: ['stim-shot', 'shield-cell', 'shield-cell', 'frag-grenade', 'bandage'],
      patch: '1.26', notes: 'Aggressive playstyle. Close-mid range domination.',
    },
    rating: 4.8, votes: 3421, author: 'ArcMeta', tags: ['pvp', 'meta', 'aggressive', 'medium-shield'],
  },
  {
    id: 'meta-tempest-farmer', name: 'Tempest PvE Farmer', role: 'PvE Farmer', patch: '1.26',
    description: 'Max efficiency loot farmer. Tempest II with extended medium mag and padded stock. Scanner augment to find loot faster. Light shield for mobility.',
    build: {
      name: 'Tempest PvE Farmer', primaryWeaponId: 'tempest', primaryTier: 1,
      primaryAttachments: [
        { slot: 'muzzle', attachmentId: 'compensator' },
        { slot: 'underbarrel', attachmentId: 'angled-grip' },
        { slot: 'medium-magazine', attachmentId: 'extended-medium-mag' },
      ],
      augmentId: 'scanner', shieldId: 'light-shield',
      quickUseItems: ['med-kit-advanced', 'shield-cell', 'lockpick', 'lockpick', 'energy-drink'],
      patch: '1.26', notes: 'Solo farmer. Prioritize loot over combat.',
    },
    rating: 4.6, votes: 2156, author: 'LootGoblin', tags: ['pve', 'farming', 'solo', 'tempest'],
  },
  {
    id: 'meta-osprey-sniper', name: 'Osprey Stealth Sniper', role: 'Stealth', patch: '1.26',
    description: 'Stay hidden, take precise shots. Osprey IV with silencer, angled grip, stable stock. Signal Jammer augment to avoid detection.',
    build: {
      name: 'Osprey Stealth Sniper', primaryWeaponId: 'osprey', primaryTier: 3,
      primaryAttachments: [
        { slot: 'muzzle', attachmentId: 'silencer' },
        { slot: 'underbarrel', attachmentId: 'angled-grip' },
        { slot: 'medium-magazine', attachmentId: 'extended-medium-mag' },
        { slot: 'stock', attachmentId: 'stable-stock' },
      ],
      secondaryWeaponId: 'burletta', secondaryTier: 2,
      secondaryAttachments: [
        { slot: 'muzzle', attachmentId: 'silencer' },
        { slot: 'light-magazine', attachmentId: 'extended-light-mag' },
      ],
      augmentId: 'signal-jammer', shieldId: 'light-shield',
      quickUseItems: ['stim-shot', 'painkiller', 'flashbang', 'smoke-grenade', 'bandage'],
      patch: '1.26', notes: 'Rat playstyle. Third-party engagements.',
    },
    rating: 4.5, votes: 1843, author: 'GhostMain', tags: ['stealth', 'sniper', 'rat', 'silencer'],
  },
  {
    id: 'meta-kettle-budget', name: 'Kettle Budget Build', role: 'Budget', patch: '1.26',
    description: 'Cheapest viable loadout. Kettle I with nothing but a vertical grip. No shield, no augment. High reward for low risk.',
    build: {
      name: 'Kettle Budget Build', primaryWeaponId: 'kettle', primaryTier: 0,
      primaryAttachments: [
        { slot: 'underbarrel', attachmentId: 'vertical-grip' },
      ],
      quickUseItems: ['bandage', 'energy-drink'],
      patch: '1.26', notes: 'Entry level. Bankrupt recover build.',
    },
    rating: 4.2, votes: 5620, author: 'BudgetKing', tags: ['budget', 'starter', 'zero-to-hero'],
  },
  {
    id: 'meta-ferro-boss', name: 'Ferro Boss Killer', role: 'Boss Killer', patch: '1.26',
    description: 'Ferro IV hits like a truck. Extended barrel for max damage range. Heavy shield + Vital Booster Mk.2 for tankiness.',
    build: {
      name: 'Ferro Boss Killer', primaryWeaponId: 'ferro', primaryTier: 3,
      primaryAttachments: [
        { slot: 'muzzle', attachmentId: 'extended-barrel' },
        { slot: 'underbarrel', attachmentId: 'horizontal-grip' },
        { slot: 'stock', attachmentId: 'padded-stock' },
      ],
      secondaryWeaponId: 'venator', secondaryTier: 2,
      secondaryAttachments: [
        { slot: 'underbarrel', attachmentId: 'vertical-grip' },
      ],
      augmentId: 'vital-booster', shieldId: 'heavy-shield',
      quickUseItems: ['med-kit-surgical', 'stim-shot', 'adrenaline-shot', 'frag-grenade', 'repair-kit'],
      patch: '1.26', notes: 'Boss hunting squad build.',
    },
    rating: 4.7, votes: 1289, author: 'BossHunter', tags: ['boss', 'heavy', 'squad', 'ferro'],
  },
  {
    id: 'meta-canto-cqb', name: 'Canto CQB Rush', role: 'CQB', patch: '1.26',
    description: 'Canto II with muzzle brake and horizontal grip. Max fire rate CQB monster. Light shield + Kinetic Capacitor.',
    build: {
      name: 'Canto CQB Rush', primaryWeaponId: 'canto', primaryTier: 1,
      primaryAttachments: [
        { slot: 'muzzle', attachmentId: 'muzzle-brake' },
        { slot: 'underbarrel', attachmentId: 'horizontal-grip' },
        { slot: 'medium-magazine', attachmentId: 'extended-medium-mag' },
        { slot: 'stock', attachmentId: 'lightweight-stock' },
      ],
      augmentId: 'kinetic-capacitor', shieldId: 'light-shield',
      quickUseItems: ['stim-shot', 'shield-cell', 'frag-grenade', 'flashbang', 'bandage'],
      patch: '1.26', notes: 'Close range dominance. High risk, high reward.',
    },
    rating: 4.4, votes: 987, author: 'RushB', tags: ['cqb', 'smg', 'aggressive', 'rush'],
  },
  {
    id: 'meta-anvil-support', name: 'Anvil Support Build', role: 'Support', patch: '1.26',
    description: 'Anvil with Anvil Splitter tech mod + Kinetic Converter. Provides covering fire and breaching utility. Trauma Kit augment for team revives.',
    build: {
      name: 'Anvil Support Build', primaryWeaponId: 'anvil', primaryTier: 2,
      primaryAttachments: [
        { slot: 'muzzle', attachmentId: 'compensator' },
        { slot: 'tech-mod', attachmentId: 'anvil-splitter' },
      ],
      augmentId: 'trauma-kit', shieldId: 'medium-shield',
      quickUseItems: ['med-kit-surgical', 'bandage', 'bandage', 'smoke-grenade', 'flare'],
      patch: '1.26', notes: 'Squad medic support.',
    },
    rating: 4.3, votes: 756, author: 'MedicMain', tags: ['support', 'medic', 'squad', 'anvil'],
  },
  {
    id: 'meta-bobcat-rat', name: 'Bobcat Zero-to-Hero', role: 'Rat', patch: '1.26',
    description: 'Ultra budget rat build. Bobcat I with nothing attached. No shield. Sneak in, grab loot, extract.',
    build: {
      name: 'Bobcat Zero-to-Hero', primaryWeaponId: 'bobcat', primaryTier: 0,
      primaryAttachments: [],
      quickUseItems: ['bandage', 'energy-drink', 'lockpick'],
      patch: '1.26', notes: 'True rat run. Abandon all gear fear.',
    },
    rating: 4.0, votes: 4521, author: 'RatKing', tags: ['rat', 'budget', 'zero-to-hero', 'stealth'],
  },
  {
    id: 'meta-torrente-suppression', name: 'Torrente Suppression', role: 'PvP Aggressor', patch: '1.26',
    description: 'Torrente IV with extended mag and muzzle brake. Lays down suppressive fire. Heavy shield + Focus augment for ADS accuracy.',
    build: {
      name: 'Torrente Suppression', primaryWeaponId: 'torrente', primaryTier: 3,
      primaryAttachments: [
        { slot: 'muzzle', attachmentId: 'muzzle-brake' },
        { slot: 'medium-magazine', attachmentId: 'extended-medium-mag' },
        { slot: 'stock', attachmentId: 'stable-stock' },
      ],
      augmentId: 'focus', shieldId: 'heavy-shield',
      quickUseItems: ['med-kit-advanced', 'shield-pack', 'shield-pack', 'frag-grenade', 'energy-drink'],
      patch: '1.26', notes: 'Anchor for squad pushes.',
    },
    rating: 4.1, votes: 534, author: 'LMGFan', tags: ['lmg', 'suppression', 'squad', 'heavy'],
  },
  {
    id: 'meta-aphelion-allrounder', name: 'Aphelion Allrounder', role: 'Allrounder', patch: '1.26',
    description: 'Aphelion III with stable stock. Versatile for any situation. Breacher augment for locked rooms. Medium shield.',
    build: {
      name: 'Aphelion Allrounder', primaryWeaponId: 'aphelion', primaryTier: 2,
      primaryAttachments: [
        { slot: 'underbarrel', attachmentId: 'angled-grip' },
        { slot: 'stock', attachmentId: 'stable-stock' },
      ],
      secondaryWeaponId: 'venator', secondaryTier: 1,
      secondaryAttachments: [
        { slot: 'medium-magazine', attachmentId: 'extended-medium-mag' },
      ],
      augmentId: 'breacher', shieldId: 'medium-shield',
      quickUseItems: ['med-kit-advanced', 'shield-cell', 'lockpick', 'data-spike', 'frag-grenade'],
      patch: '1.26', notes: 'Well-rounded solo build.',
    },
    rating: 4.5, votes: 1678, author: 'SoloPlayer', tags: ['allrounder', 'solo', 'versatile', 'energy'],
  },
  {
    id: 'meta-iltoro-cqb', name: 'Il Toro Room Clearer', role: 'CQB', patch: '1.26',
    description: 'Il Toro with shotgun choke and extended tube. Devastating in CQB. Space Synthesizer for extra loot space.',
    build: {
      name: 'Il Toro Room Clearer', primaryWeaponId: 'iltoro', primaryTier: 1,
      primaryAttachments: [
        { slot: 'shotgun-muzzle', attachmentId: 'shotgun-choke' },
        { slot: 'shotgun-magazine', attachmentId: 'extended-shotgun-mag' },
        { slot: 'stock', attachmentId: 'padded-stock' },
      ],
      secondaryWeaponId: 'stitcher', secondaryTier: 1,
      secondaryAttachments: [
        { slot: 'muzzle', attachmentId: 'compensator' },
        { slot: 'light-magazine', attachmentId: 'extended-light-mag' },
      ],
      augmentId: 'space-synthesizer', shieldId: 'medium-shield',
      quickUseItems: ['med-kit-advanced', 'shield-cell', 'incendiary-grenade', 'lockpick', 'bandage'],
      patch: '1.26', notes: 'CQB looting hybrid.',
    },
    rating: 4.3, votes: 892, author: 'Shotgunner', tags: ['cqb', 'shotgun', 'looting', 'hybrid'],
  },
  {
    id: 'meta-equalizer-endgame', name: 'Equalizer Endgame', role: 'Boss Killer', patch: '1.26',
    description: 'Legendary Equalizer with Hazard Module Mk.3 for Sector 6. Full endgame kit. Heavy shield. Max survivability.',
    build: {
      name: 'Equalizer Endgame', primaryWeaponId: 'equalizer', primaryTier: 3,
      primaryAttachments: [],
      secondaryWeaponId: 'jupiter', secondaryTier: 3,
      secondaryAttachments: [],
      augmentId: 'hazard-module', shieldId: 'heavy-shield',
      quickUseItems: ['med-kit-surgical', 'med-kit-surgical', 'shield-overcharge', 'adrenaline-shot', 'antidote'],
      patch: '1.26', notes: 'Full endgame kit. Sector 6 ready.',
    },
    rating: 4.9, votes: 2103, author: 'EndgameGod', tags: ['endgame', 'legendary', 'sector-6', 'boss'],
  },
  {
    id: 'meta-vulcano-hybrid', name: 'Vulcano Hybrid Farmer', role: 'PvE Farmer', patch: '1.26',
    description: 'Semi-auto shotgun + pistol sidearm for efficient PvE clearing. Weight Converter augment for max loot.',
    build: {
      name: 'Vulcano Hybrid Farmer', primaryWeaponId: 'vulcano', primaryTier: 2,
      primaryAttachments: [
        { slot: 'shotgun-muzzle', attachmentId: 'shotgun-choke' },
        { slot: 'underbarrel', attachmentId: 'vertical-grip' },
        { slot: 'stock', attachmentId: 'lightweight-stock' },
      ],
      secondaryWeaponId: 'hairpin', secondaryTier: 2,
      secondaryAttachments: [
        { slot: 'light-magazine', attachmentId: 'extended-light-mag' },
      ],
      augmentId: 'weight-converter', shieldId: 'light-shield',
      quickUseItems: ['med-kit-advanced', 'shield-cell', 'lockpick', 'lockpick', 'energy-drink'],
      patch: '1.26', notes: 'Max loot capacity farming.',
    },
    rating: 4.1, votes: 645, author: 'LootMax', tags: ['pve', 'farming', 'loot-max', 'shotgun'],
  },
  {
    id: 'meta-stitcher-stealth', name: 'Stitcher Stealth Scout', role: 'Stealth', patch: '1.26',
    description: 'Silenced Stitcher with nimble handling for sneaky flanks. Drop Pod Beacon for supply drops. Stay mobile, stay quiet.',
    build: {
      name: 'Stitcher Stealth Scout', primaryWeaponId: 'stitcher', primaryTier: 2,
      primaryAttachments: [
        { slot: 'muzzle', attachmentId: 'silencer' },
        { slot: 'underbarrel', attachmentId: 'angled-grip' },
        { slot: 'light-magazine', attachmentId: 'extended-light-mag' },
        { slot: 'stock', attachmentId: 'lightweight-stock' },
      ],
      augmentId: 'drop-pod-beacon', shieldId: 'light-shield',
      quickUseItems: ['stim-shot', 'smoke-grenade', 'flashbang', 'sonic-trap', 'binoculars'],
      patch: '1.26', notes: 'Scout + loot denial.',
    },
    rating: 4.0, votes: 432, author: 'ScoutSix', tags: ['stealth', 'scout', 'smg', 'tactical'],
  },
  {
    id: 'meta-arpeggio-midrange', name: 'Arpeggio Mid-Range Anchor', role: 'Allrounder', patch: '1.26',
    description: 'Arpeggio IV burst-fire AR for mid-range dominance. Armory Converter for extra weapon slot. Balanced shield choice.',
    build: {
      name: 'Arpeggio Mid-Range Anchor', primaryWeaponId: 'arpeggio', primaryTier: 3,
      primaryAttachments: [
        { slot: 'muzzle', attachmentId: 'compensator' },
        { slot: 'underbarrel', attachmentId: 'vertical-grip' },
        { slot: 'medium-magazine', attachmentId: 'extended-medium-mag' },
        { slot: 'stock', attachmentId: 'stable-stock' },
      ],
      secondaryWeaponId: 'venator', secondaryTier: 2,
      secondaryAttachments: [
        { slot: 'underbarrel', attachmentId: 'vertical-grip' },
      ],
      augmentId: 'armory-converter', shieldId: 'medium-shield',
      quickUseItems: ['med-kit-advanced', 'shield-cell', 'shield-cell', 'frag-grenade', 'flare-tactical'],
      patch: '1.26', notes: 'Flexible squad anchor build.',
    },
    rating: 4.4, votes: 1123, author: 'AnchorMain', tags: ['allrounder', 'squad', 'mid-range', 'burst'],
  },
];

export function getMetaBuildById(id: string): MetaBuild | undefined {
  return metaBuilds.find(b => b.id === id);
}
