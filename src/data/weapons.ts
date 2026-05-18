import type { Weapon, Attachment, AttachmentSlot, WeaponClass } from '../types';

export const weapons: Weapon[] = [
  {
    id: 'tempest',
    name: 'Tempest',
    class: 'Assault Rifle',
    ammoType: 'medium',
    firingMode: 'Fully-Automatic',
    image: '',
    baseStats: {
      damage: 10, fireRate: 36.7, range: 55.9, dps: 367,
      magSize: 25, verticalRecoil: 55, horizontalRecoil: 45,
      adsSpeed: 70, reloadSpeed: 2.8, bulletVelocity: 85, dispersion: 40,
    },
    stats: {
      damage: 10, fireRate: 36.7, range: 55.9, dps: 367,
      magSize: 25, verticalRecoil: 55, horizontalRecoil: 45,
      adsSpeed: 70, reloadSpeed: 2.8, bulletVelocity: 85, dispersion: 40,
    },
    attachmentSlots: ['muzzle', 'underbarrel', 'magazine', 'stock'],
    compatibleAttachments: ['compensator-1','compensator-2','compensator-3','muzzle-brake-1','muzzle-brake-2','muzzle-brake-3','silencer-1','silencer-2','silencer-3','extended-barrel','vertical-grip-1','vertical-grip-2','vertical-grip-3','angled-grip-1','angled-grip-2','angled-grip-3','horizontal-grip','extended-medium-mag-1','extended-medium-mag-2','extended-medium-mag-3','stable-stock-1','stable-stock-2','stable-stock-3','lightweight-stock','padded-stock','kinetic-converter'],
    description: 'A versatile fully-automatic assault rifle chambered in medium ammo. Balanced stats make it reliable in most engagements.',
  },
  {
    id: 'rattler',
    name: 'Rattler',
    class: 'Assault Rifle',
    ammoType: 'medium',
    firingMode: 'Fully-Automatic',
    image: '',
    baseStats: {
      damage: 9, fireRate: 33.3, range: 56.2, dps: 299,
      magSize: 25, verticalRecoil: 50, horizontalRecoil: 40,
      adsSpeed: 75, reloadSpeed: 2.6, bulletVelocity: 80, dispersion: 45,
    },
    stats: {
      damage: 9, fireRate: 33.3, range: 56.2, dps: 299,
      magSize: 25, verticalRecoil: 50, horizontalRecoil: 40,
      adsSpeed: 75, reloadSpeed: 2.6, bulletVelocity: 80, dispersion: 45,
    },
    attachmentSlots: ['muzzle', 'underbarrel', 'magazine', 'stock'],
    compatibleAttachments: ['compensator-1','compensator-2','compensator-3','muzzle-brake-1','muzzle-brake-2','muzzle-brake-3','silencer-1','silencer-2','silencer-3','vertical-grip-1','vertical-grip-2','angled-grip-1','angled-grip-2','extended-medium-mag-1','extended-medium-mag-2','extended-medium-mag-3','stable-stock-1','stable-stock-2','padded-stock','kinetic-converter'],
    description: 'A reliable fully-automatic assault rifle with solid handling. Easy to control and effective at medium range.',
  },
  {
    id: 'arpeggio',
    name: 'Arpeggio',
    class: 'Assault Rifle',
    ammoType: 'medium',
    firingMode: '3-Round Burst',
    image: '',
    baseStats: {
      damage: 9.5, fireRate: 18.3, range: 55.9, dps: 173,
      magSize: 27, verticalRecoil: 35, horizontalRecoil: 30,
      adsSpeed: 72, reloadSpeed: 2.5, bulletVelocity: 88, dispersion: 30,
    },
    stats: {
      damage: 9.5, fireRate: 18.3, range: 55.9, dps: 173,
      magSize: 27, verticalRecoil: 35, horizontalRecoil: 30,
      adsSpeed: 72, reloadSpeed: 2.5, bulletVelocity: 88, dispersion: 30,
    },
    attachmentSlots: ['muzzle', 'underbarrel', 'magazine', 'stock'],
    compatibleAttachments: ['compensator-1','compensator-2','compensator-3','muzzle-brake-1','muzzle-brake-2','muzzle-brake-3','silencer-1','silencer-2','silencer-3','extended-barrel','vertical-grip-1','vertical-grip-2','vertical-grip-3','angled-grip-1','angled-grip-2','extended-medium-mag-1','extended-medium-mag-2','extended-medium-mag-3','stable-stock-1','stable-stock-2','stable-stock-3','padded-stock','kinetic-converter'],
    description: 'A precise burst-fire assault rifle. Excellent recoil control and dispersion make it deadly at range.',
  },
  {
    id: 'kettle',
    name: 'Kettle',
    class: 'Assault Rifle',
    ammoType: 'light',
    firingMode: 'Semi-Automatic',
    image: '',
    baseStats: {
      damage: 8.5, fireRate: 30, range: 42.8, dps: 280,
      magSize: 20, verticalRecoil: 30, horizontalRecoil: 25,
      adsSpeed: 78, reloadSpeed: 2.2, bulletVelocity: 75, dispersion: 25,
    },
    stats: {
      damage: 8.5, fireRate: 30, range: 42.8, dps: 280,
      magSize: 20, verticalRecoil: 30, horizontalRecoil: 25,
      adsSpeed: 78, reloadSpeed: 2.2, bulletVelocity: 75, dispersion: 25,
    },
    attachmentSlots: ['muzzle', 'underbarrel', 'magazine', 'stock'],
    compatibleAttachments: ['compensator-1','compensator-2','muzzle-brake-1','muzzle-brake-2','silencer-1','silencer-2','extended-barrel','vertical-grip-1','vertical-grip-2','angled-grip-1','angled-grip-2','extended-light-mag-1','extended-light-mag-2','extended-light-mag-3','stable-stock-1','stable-stock-2','padded-stock','kinetic-converter'],
    description: 'A precise semi-automatic rifle using light ammo. Low recoil with excellent handling for accurate follow-up shots.',
  },
  {
    id: 'bettina',
    name: 'Bettina',
    class: 'Assault Rifle',
    ammoType: 'heavy',
    firingMode: 'Fully-Automatic',
    image: '',
    baseStats: {
      damage: 16, fireRate: 28.7, range: 52.3, dps: 448,
      magSize: 20, verticalRecoil: 70, horizontalRecoil: 55,
      adsSpeed: 55, reloadSpeed: 3.2, bulletVelocity: 90, dispersion: 50,
    },
    stats: {
      damage: 16, fireRate: 28.7, range: 52.3, dps: 448,
      magSize: 20, verticalRecoil: 70, horizontalRecoil: 55,
      adsSpeed: 55, reloadSpeed: 3.2, bulletVelocity: 90, dispersion: 50,
    },
    attachmentSlots: ['muzzle', 'magazine', 'stock'],
    compatibleAttachments: ['compensator-1','compensator-2','compensator-3','muzzle-brake-1','muzzle-brake-2','muzzle-brake-3','silencer-1','silencer-2','extended-medium-mag-1','extended-medium-mag-2','extended-medium-mag-3','stable-stock-1','stable-stock-2','stable-stock-3','lightweight-stock','padded-stock','kinetic-converter'],
    description: 'A hard-hitting heavy ammo assault rifle. High damage per shot with manageable recoil for its class.',
  },
  {
    id: 'ferro',
    name: 'Ferro',
    class: 'Battle Rifle',
    ammoType: 'heavy',
    firingMode: 'Break-Action',
    image: '',
    baseStats: {
      damage: 40, fireRate: 6.6, range: 53.1, dps: 264,
      magSize: 5, verticalRecoil: 45, horizontalRecoil: 35,
      adsSpeed: 60, reloadSpeed: 3.5, bulletVelocity: 95, dispersion: 15,
    },
    stats: {
      damage: 40, fireRate: 6.6, range: 53.1, dps: 264,
      magSize: 5, verticalRecoil: 45, horizontalRecoil: 35,
      adsSpeed: 60, reloadSpeed: 3.5, bulletVelocity: 95, dispersion: 15,
    },
    attachmentSlots: ['muzzle', 'underbarrel', 'stock'],
    compatibleAttachments: ['muzzle-brake-1','muzzle-brake-2','muzzle-brake-3','compensator-1','compensator-2','silencer-1','silencer-2','extended-barrel','vertical-grip-1','vertical-grip-2','angled-grip-1','angled-grip-2','angled-grip-3','stable-stock-1','stable-stock-2','stable-stock-3','padded-stock','kinetic-converter'],
    description: 'A powerful break-action battle rifle. Devastating per-shot damage with excellent precision. Best for picking your shots.',
  },
  {
    id: 'renegade',
    name: 'Renegade',
    class: 'Battle Rifle',
    ammoType: 'medium',
    firingMode: 'Lever-Action',
    image: '',
    baseStats: {
      damage: 35, fireRate: 21, range: 68.8, dps: 735,
      magSize: 8, verticalRecoil: 55, horizontalRecoil: 40,
      adsSpeed: 55, reloadSpeed: 3.0, bulletVelocity: 92, dispersion: 20,
    },
    stats: {
      damage: 35, fireRate: 21, range: 68.8, dps: 735,
      magSize: 8, verticalRecoil: 55, horizontalRecoil: 40,
      adsSpeed: 55, reloadSpeed: 3.0, bulletVelocity: 92, dispersion: 20,
    },
    attachmentSlots: ['muzzle', 'magazine', 'stock'],
    compatibleAttachments: ['muzzle-brake-1','muzzle-brake-2','muzzle-brake-3','compensator-1','compensator-2','compensator-3','silencer-1','silencer-2','silencer-3','extended-medium-mag-1','extended-medium-mag-2','extended-medium-mag-3','stable-stock-1','stable-stock-2','stable-stock-3','lightweight-stock','padded-stock','kinetic-converter'],
    description: 'A lever-action battle rifle with impressive DPS. Excellent range makes it a threat at distance.',
  },
  {
    id: 'aphelion',
    name: 'Aphelion',
    class: 'Battle Rifle',
    ammoType: 'energy',
    firingMode: '2-Round Burst',
    image: '',
    baseStats: {
      damage: 25, fireRate: 9, range: 76, dps: 216,
      magSize: 20, verticalRecoil: 20, horizontalRecoil: 15,
      adsSpeed: 68, reloadSpeed: 3.5, bulletVelocity: 100, dispersion: 10,
    },
    stats: {
      damage: 25, fireRate: 9, range: 76, dps: 216,
      magSize: 20, verticalRecoil: 20, horizontalRecoil: 15,
      adsSpeed: 68, reloadSpeed: 3.5, bulletVelocity: 100, dispersion: 10,
    },
    attachmentSlots: [],
    compatibleAttachments: [],
    description: 'An energy-based battle rifle with exceptional range. No attachment slots but outstanding accuracy out of the box.',
  },
  {
    id: 'stitcher',
    name: 'Stitcher',
    class: 'SMG',
    ammoType: 'light',
    firingMode: 'Fully-Automatic',
    image: '',
    baseStats: {
      damage: 6.5, fireRate: 45.3, range: 42.1, dps: 317,
      magSize: 25, verticalRecoil: 40, horizontalRecoil: 50,
      adsSpeed: 85, reloadSpeed: 2.0, bulletVelocity: 60, dispersion: 55,
    },
    stats: {
      damage: 6.5, fireRate: 45.3, range: 42.1, dps: 317,
      magSize: 25, verticalRecoil: 40, horizontalRecoil: 50,
      adsSpeed: 85, reloadSpeed: 2.0, bulletVelocity: 60, dispersion: 55,
    },
    attachmentSlots: ['muzzle', 'underbarrel', 'magazine', 'stock'],
    compatibleAttachments: ['muzzle-brake-1','muzzle-brake-2','muzzle-brake-3','compensator-1','compensator-2','silencer-1','silencer-2','silencer-3','extended-barrel','vertical-grip-1','vertical-grip-2','vertical-grip-3','angled-grip-1','angled-grip-2','extended-light-mag-1','extended-light-mag-2','extended-light-mag-3','stable-stock-1','stable-stock-2','stable-stock-3','padded-stock','kinetic-converter'],
    description: 'A high-fire-rate SMG perfect for close quarters. Fast handling and great hipfire accuracy.',
  },
  {
    id: 'bobcat',
    name: 'Bobcat',
    class: 'SMG',
    ammoType: 'light',
    firingMode: 'Fully-Automatic',
    image: '',
    baseStats: {
      damage: 6, fireRate: 66.7, range: 44, dps: 400,
      magSize: 20, verticalRecoil: 55, horizontalRecoil: 60,
      adsSpeed: 88, reloadSpeed: 1.8, bulletVelocity: 55, dispersion: 60,
    },
    stats: {
      damage: 6, fireRate: 66.7, range: 44, dps: 400,
      magSize: 20, verticalRecoil: 55, horizontalRecoil: 60,
      adsSpeed: 88, reloadSpeed: 1.8, bulletVelocity: 55, dispersion: 60,
    },
    attachmentSlots: ['muzzle', 'underbarrel', 'magazine', 'stock'],
    compatibleAttachments: ['muzzle-brake-1','muzzle-brake-2','muzzle-brake-3','compensator-1','compensator-2','compensator-3','silencer-1','silencer-2','silencer-3','vertical-grip-1','vertical-grip-2','angled-grip-1','angled-grip-2','angled-grip-3','extended-light-mag-1','extended-light-mag-2','extended-light-mag-3','stable-stock-1','stable-stock-2','stable-stock-3','lightweight-stock','padded-stock','kinetic-converter'],
    description: 'An extremely high fire-rate SMG. Melts targets up close but requires recoil management.',
  },
  {
    id: 'canto',
    name: 'Canto',
    class: 'SMG',
    ammoType: 'medium',
    firingMode: 'Fully-Automatic',
    image: '',
    baseStats: {
      damage: 6.5, fireRate: 56.7, range: 51, dps: 369,
      magSize: 22, verticalRecoil: 48, horizontalRecoil: 52,
      adsSpeed: 82, reloadSpeed: 2.1, bulletVelocity: 62, dispersion: 50,
    },
    stats: {
      damage: 6.5, fireRate: 56.7, range: 51, dps: 369,
      magSize: 22, verticalRecoil: 48, horizontalRecoil: 52,
      adsSpeed: 82, reloadSpeed: 2.1, bulletVelocity: 62, dispersion: 50,
    },
    attachmentSlots: ['muzzle', 'underbarrel', 'magazine', 'stock'],
    compatibleAttachments: ['compensator-1','compensator-2','muzzle-brake-1','muzzle-brake-2','silencer-1','silencer-2','vertical-grip-1','vertical-grip-2','angled-grip-1','angled-grip-2','extended-medium-mag-1','extended-medium-mag-2','extended-medium-mag-3','stable-stock-1','stable-stock-2','padded-stock','kinetic-converter'],
    description: 'A medium-ammo SMG with better range than typical SMGs. Effective at close-to-mid range.',
  },
  {
    id: 'il-toro',
    name: 'Il Toro',
    class: 'Shotgun',
    ammoType: 'shotgun',
    firingMode: 'Pump-Action',
    image: '',
    baseStats: {
      damage: 67.5, fireRate: 14, range: 20, dps: 965,
      magSize: 6, verticalRecoil: 75, horizontalRecoil: 40,
      adsSpeed: 50, reloadSpeed: 4.0, bulletVelocity: 40, dispersion: 80,
    },
    stats: {
      damage: 67.5, fireRate: 14, range: 20, dps: 965,
      magSize: 6, verticalRecoil: 75, horizontalRecoil: 40,
      adsSpeed: 50, reloadSpeed: 4.0, bulletVelocity: 40, dispersion: 80,
    },
    attachmentSlots: ['muzzle', 'magazine', 'stock'],
    compatibleAttachments: ['shotgun-choke-1','shotgun-choke-2','shotgun-choke-3','shotgun-silencer','extended-shotgun-mag-1','extended-shotgun-mag-2','extended-shotgun-mag-3','stable-stock-1','stable-stock-2','stable-stock-3','lightweight-stock','padded-stock','vertical-grip-3','angled-grip-3','kinetic-converter'],
    description: 'A devastating pump-action shotgun. Massive per-pellet damage but tight range. King of room clearing.',
  },
  {
    id: 'vulcano',
    name: 'Vulcano',
    class: 'Shotgun',
    ammoType: 'shotgun',
    firingMode: 'Semi-Automatic',
    image: '',
    baseStats: {
      damage: 49.5, fireRate: 26.3, range: 26, dps: 1303,
      magSize: 8, verticalRecoil: 60, horizontalRecoil: 45,
      adsSpeed: 55, reloadSpeed: 3.5, bulletVelocity: 42, dispersion: 75,
    },
    stats: {
      damage: 49.5, fireRate: 26.3, range: 26, dps: 1303,
      magSize: 8, verticalRecoil: 60, horizontalRecoil: 45,
      adsSpeed: 55, reloadSpeed: 3.5, bulletVelocity: 42, dispersion: 75,
    },
    attachmentSlots: ['muzzle', 'underbarrel', 'magazine', 'stock'],
    compatibleAttachments: ['shotgun-choke-1','shotgun-choke-2','shotgun-choke-3','shotgun-silencer','extended-shotgun-mag-1','extended-shotgun-mag-2','extended-shotgun-mag-3','vertical-grip-1','vertical-grip-2','vertical-grip-3','angled-grip-1','angled-grip-2','angled-grip-3','horizontal-grip','stable-stock-1','stable-stock-2','stable-stock-3','lightweight-stock','padded-stock','kinetic-converter'],
    description: 'A semi-auto shotgun with blazing DPS. Quick follow-up shots make it lethal in skilled hands.',
  },
  {
    id: 'osprey',
    name: 'Osprey',
    class: 'Sniper Rifle',
    ammoType: 'medium',
    firingMode: 'Bolt-Action',
    image: '',
    baseStats: {
      damage: 45, fireRate: 17.7, range: 80.3, dps: 796,
      magSize: 5, verticalRecoil: 65, horizontalRecoil: 40,
      adsSpeed: 35, reloadSpeed: 3.8, bulletVelocity: 98, dispersion: 5,
    },
    stats: {
      damage: 45, fireRate: 17.7, range: 80.3, dps: 796,
      magSize: 5, verticalRecoil: 65, horizontalRecoil: 40,
      adsSpeed: 35, reloadSpeed: 3.8, bulletVelocity: 98, dispersion: 5,
    },
    attachmentSlots: ['muzzle', 'underbarrel', 'magazine', 'stock'],
    compatibleAttachments: ['compensator-1','compensator-2','compensator-3','muzzle-brake-1','muzzle-brake-2','muzzle-brake-3','silencer-1','silencer-2','silencer-3','extended-barrel','vertical-grip-1','vertical-grip-2','angled-grip-1','angled-grip-2','angled-grip-3','horizontal-grip','extended-medium-mag-1','extended-medium-mag-2','extended-medium-mag-3','stable-stock-1','stable-stock-2','stable-stock-3','lightweight-stock','padded-stock','kinetic-converter'],
    description: 'A bolt-action sniper rifle with outstanding range and precision. One-shot potential at long distances.',
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    class: 'Sniper Rifle',
    ammoType: 'energy',
    firingMode: 'Bolt-Action',
    image: '',
    baseStats: {
      damage: 60, fireRate: 7.7, range: 71.7, dps: 423,
      magSize: 5, verticalRecoil: 50, horizontalRecoil: 30,
      adsSpeed: 30, reloadSpeed: 4.0, bulletVelocity: 100, dispersion: 5,
    },
    stats: {
      damage: 60, fireRate: 7.7, range: 71.7, dps: 423,
      magSize: 5, verticalRecoil: 50, horizontalRecoil: 30,
      adsSpeed: 30, reloadSpeed: 4.0, bulletVelocity: 100, dispersion: 5,
    },
    attachmentSlots: [],
    compatibleAttachments: [],
    description: 'A legendary energy sniper rifle. Highest damage per shot in its class. No attachment slots.',
  },
  {
    id: 'torrente',
    name: 'Torrente',
    class: 'LMG',
    ammoType: 'medium',
    firingMode: 'Fully-Automatic',
    image: '',
    baseStats: {
      damage: 8, fireRate: 58.3, range: 49.9, dps: 466,
      magSize: 50, verticalRecoil: 75, horizontalRecoil: 60,
      adsSpeed: 35, reloadSpeed: 4.5, bulletVelocity: 82, dispersion: 55,
    },
    stats: {
      damage: 8, fireRate: 58.3, range: 49.9, dps: 466,
      magSize: 50, verticalRecoil: 75, horizontalRecoil: 60,
      adsSpeed: 35, reloadSpeed: 4.5, bulletVelocity: 82, dispersion: 55,
    },
    attachmentSlots: ['muzzle', 'underbarrel', 'magazine', 'stock'],
    compatibleAttachments: ['compensator-1','compensator-2','compensator-3','muzzle-brake-1','muzzle-brake-2','muzzle-brake-3','silencer-1','silencer-2','silencer-3','vertical-grip-1','vertical-grip-2','angled-grip-1','angled-grip-2','extended-medium-mag-1','extended-medium-mag-2','extended-medium-mag-3','stable-stock-1','stable-stock-2','stable-stock-3','lightweight-stock','padded-stock','kinetic-converter'],
    description: 'A light machine gun with a massive magazine. Suppressive fire specialist with high sustained DPS.',
  },
  {
    id: 'hairpin',
    name: 'Hairpin',
    class: 'Pistol',
    ammoType: 'light',
    firingMode: 'Slide-Action',
    image: '',
    baseStats: {
      damage: 20, fireRate: 9, range: 38.6, dps: 180,
      magSize: 8, verticalRecoil: 25, horizontalRecoil: 20,
      adsSpeed: 95, reloadSpeed: 1.5, bulletVelocity: 70, dispersion: 20,
    },
    stats: {
      damage: 20, fireRate: 9, range: 38.6, dps: 180,
      magSize: 8, verticalRecoil: 25, horizontalRecoil: 20,
      adsSpeed: 95, reloadSpeed: 1.5, bulletVelocity: 70, dispersion: 20,
    },
    attachmentSlots: ['muzzle', 'magazine'],
    compatibleAttachments: ['silencer-1','silencer-2','extended-barrel','extended-light-mag-1','extended-light-mag-2','extended-light-mag-3'],
    description: 'A compact sidearm with excellent handling. Low recoil and fast reload make it a reliable backup.',
  },
  {
    id: 'burletta',
    name: 'Burletta',
    class: 'Pistol',
    ammoType: 'light',
    firingMode: 'Semi-Automatic',
    image: '',
    baseStats: {
      damage: 10, fireRate: 28, range: 41.7, dps: 280,
      magSize: 15, verticalRecoil: 30, horizontalRecoil: 25,
      adsSpeed: 92, reloadSpeed: 1.8, bulletVelocity: 68, dispersion: 25,
    },
    stats: {
      damage: 10, fireRate: 28, range: 41.7, dps: 280,
      magSize: 15, verticalRecoil: 30, horizontalRecoil: 25,
      adsSpeed: 92, reloadSpeed: 1.8, bulletVelocity: 68, dispersion: 25,
    },
    attachmentSlots: ['muzzle', 'magazine'],
    compatibleAttachments: ['silencer-1','silencer-2','silencer-3','extended-barrel','compensator-1','compensator-2','muzzle-brake-1','extended-light-mag-1','extended-light-mag-2','extended-light-mag-3'],
    description: 'A semi-automatic pistol with a generous magazine. Fast fire rate makes it competitive in a pinch.',
  },
  {
    id: 'venator',
    name: 'Venator',
    class: 'Pistol',
    ammoType: 'medium',
    firingMode: 'Semi-Automatic',
    image: '',
    baseStats: {
      damage: 18, fireRate: 36.7, range: 48.4, dps: 660,
      magSize: 12, verticalRecoil: 40, horizontalRecoil: 35,
      adsSpeed: 88, reloadSpeed: 2.0, bulletVelocity: 75, dispersion: 30,
    },
    stats: {
      damage: 18, fireRate: 36.7, range: 48.4, dps: 660,
      magSize: 12, verticalRecoil: 40, horizontalRecoil: 35,
      adsSpeed: 88, reloadSpeed: 2.0, bulletVelocity: 75, dispersion: 30,
    },
    attachmentSlots: ['muzzle', 'magazine'],
    compatibleAttachments: ['muzzle-brake-1','muzzle-brake-2','compensator-1','silencer-1','silencer-2','extended-medium-mag-1','extended-medium-mag-2','extended-medium-mag-3','angled-grip-3'],
    description: 'A high-caliber pistol with impressive stopping power. Medium ammo gives it better penetration.',
  },
  {
    id: 'anvil',
    name: 'Anvil',
    class: 'Hand Cannon',
    ammoType: 'heavy',
    firingMode: 'Single-Action',
    image: '',
    baseStats: {
      damage: 40, fireRate: 16.3, range: 50.2, dps: 652,
      magSize: 6, verticalRecoil: 70, horizontalRecoil: 50,
      adsSpeed: 45, reloadSpeed: 3.2, bulletVelocity: 90, dispersion: 15,
    },
    stats: {
      damage: 40, fireRate: 16.3, range: 50.2, dps: 652,
      magSize: 6, verticalRecoil: 70, horizontalRecoil: 50,
      adsSpeed: 45, reloadSpeed: 3.2, bulletVelocity: 90, dispersion: 15,
    },
    attachmentSlots: ['muzzle', 'stock'],
    compatibleAttachments: ['muzzle-brake-1','muzzle-brake-2','muzzle-brake-3','compensator-1','compensator-2','compensator-3','silencer-1','silencer-2','stable-stock-1','stable-stock-2','lightweight-stock','padded-stock'],
    description: 'A massive hand cannon firing heavy ammo. Devastating damage with good range. For those who want stopping power in a sidearm.',
  },
  {
    id: 'hullcracker',
    name: 'Hullcracker',
    class: 'Special',
    ammoType: 'launcher',
    firingMode: 'Pump-Action',
    image: '',
    baseStats: {
      damage: 100, fireRate: 20.3, range: 38.9, dps: 2030,
      magSize: 1, verticalRecoil: 85, horizontalRecoil: 40,
      adsSpeed: 30, reloadSpeed: 5.0, bulletVelocity: 50, dispersion: 60,
    },
    stats: {
      damage: 100, fireRate: 20.3, range: 38.9, dps: 2030,
      magSize: 1, verticalRecoil: 85, horizontalRecoil: 40,
      adsSpeed: 30, reloadSpeed: 5.0, bulletVelocity: 50, dispersion: 60,
    },
    attachmentSlots: [],
    compatibleAttachments: [],
    description: 'A pump-action launcher. Devastating explosive damage but single-shot only. No attachment compatibility.',
  },
  {
    id: 'equalizer',
    name: 'Equalizer',
    class: 'Special',
    ammoType: 'energy',
    firingMode: 'Fully-Automatic',
    image: '',
    baseStats: {
      damage: 8, fireRate: 33.3, range: 68.6, dps: 266,
      magSize: 30, verticalRecoil: 30, horizontalRecoil: 25,
      adsSpeed: 65, reloadSpeed: 3.0, bulletVelocity: 95, dispersion: 20,
    },
    stats: {
      damage: 8, fireRate: 33.3, range: 68.6, dps: 266,
      magSize: 30, verticalRecoil: 30, horizontalRecoil: 25,
      adsSpeed: 65, reloadSpeed: 3.0, bulletVelocity: 95, dispersion: 20,
    },
    attachmentSlots: [],
    compatibleAttachments: [],
    description: 'A legendary energy weapon with no attachment slots. Excellent base stats with great range and handling.',
  },
];

export const attachments: Attachment[] = [
  // MUZZLE - Silencers
  { id: 'silencer-1', name: 'Silencer I', tier: 1, slot: 'muzzle', type: 'Silencer', compatibleWith: ['bobcat','osprey','torrente','tempest','arpeggio','anvil','burletta','renegade','stitcher','kettle'], effects: { dispersion: -5 }, description: '20% reduced noise. Basic stealth option.' },
  { id: 'silencer-2', name: 'Silencer II', tier: 2, slot: 'muzzle', type: 'Silencer', compatibleWith: ['bobcat','osprey','torrente','tempest','arpeggio','anvil','burletta','renegade','stitcher','kettle'], effects: { dispersion: -10 }, description: '40% reduced noise. Quiet without drawbacks.' },
  { id: 'silencer-3', name: 'Silencer III', tier: 3, slot: 'muzzle', type: 'Silencer', compatibleWith: ['bobcat','osprey','torrente','tempest','arpeggio','renegade','stitcher'], effects: { dispersion: -15 }, description: '60% reduced noise. Maximum stealth.' },

  // MUZZLE - Compensators
  { id: 'compensator-1', name: 'Compensator I', tier: 1, slot: 'muzzle', type: 'Compensator', compatibleWith: ['tempest','arpeggio','renegade','bobcat','torrente','burletta','anvil','osprey','ferro','kettle','venator','bettina','rattler','stitcher','canto'], effects: { dispersion: -15 }, description: '15% reduced per-shot dispersion.' },
  { id: 'compensator-2', name: 'Compensator II', tier: 2, slot: 'muzzle', type: 'Compensator', compatibleWith: ['tempest','arpeggio','renegade','bobcat','torrente','burletta','anvil','osprey','ferro','kettle','bettina','rattler','stitcher','canto'], effects: { dispersion: -30 }, description: '30% reduced per-shot dispersion.' },
  { id: 'compensator-3', name: 'Compensator III', tier: 3, slot: 'muzzle', type: 'Compensator', compatibleWith: ['tempest','arpeggio','renegade','bobcat','torrente','anvil','osprey','bettina','rattler'], effects: { dispersion: -50 }, description: '50% reduced dispersion. +20% durability burn.' },

  // MUZZLE - Muzzle Brakes
  { id: 'muzzle-brake-1', name: 'Muzzle Brake I', tier: 1, slot: 'muzzle', type: 'Muzzle Brake', compatibleWith: ['tempest','arpeggio','renegade','bobcat','torrente','anvil','osprey','ferro','bettina','rattler','stitcher','kettle','venator','hairpin','burletta'], effects: { verticalRecoil: -15, horizontalRecoil: -15 }, description: '15% reduced vertical and horizontal recoil.' },
  { id: 'muzzle-brake-2', name: 'Muzzle Brake II', tier: 2, slot: 'muzzle', type: 'Muzzle Brake', compatibleWith: ['tempest','arpeggio','renegade','bobcat','torrente','anvil','osprey','ferro','bettina','rattler','stitcher','kettle'], effects: { verticalRecoil: -20, horizontalRecoil: -20 }, description: '20% reduced vertical and horizontal recoil.' },
  { id: 'muzzle-brake-3', name: 'Muzzle Brake III', tier: 3, slot: 'muzzle', type: 'Muzzle Brake', compatibleWith: ['tempest','arpeggio','renegade','bobcat','torrente','anvil','osprey','ferro','bettina','rattler'], effects: { verticalRecoil: -25, horizontalRecoil: -25 }, description: '25% reduced recoil. +20% durability burn.' },

  // MUZZLE - Extended Barrel
  { id: 'extended-barrel', name: 'Extended Barrel', tier: 3, slot: 'muzzle', type: 'Extended Barrel', compatibleWith: ['osprey','stitcher','ferro','arpeggio','anvil','burletta','kettle'], effects: { bulletVelocity: 25, verticalRecoil: 15 }, description: '25% increased bullet velocity. 15% increased vertical recoil.' },

  // MUZZLE - Shotgun
  { id: 'shotgun-choke-1', name: 'Shotgun Choke I', tier: 1, slot: 'muzzle', type: 'Shotgun Choke', compatibleWith: ['il-toro','vulcano'], effects: { dispersion: -15 }, description: 'Tighter pellet spread.' },
  { id: 'shotgun-choke-2', name: 'Shotgun Choke II', tier: 2, slot: 'muzzle', type: 'Shotgun Choke', compatibleWith: ['il-toro','vulcano'], effects: { dispersion: -20 }, description: 'Much tighter pellet spread.' },
  { id: 'shotgun-choke-3', name: 'Shotgun Choke III', tier: 3, slot: 'muzzle', type: 'Shotgun Choke', compatibleWith: ['il-toro','vulcano'], effects: { dispersion: -30 }, description: 'Maximum tightness. +20% durability burn.' },
  { id: 'shotgun-silencer', name: 'Shotgun Silencer', tier: 2, slot: 'muzzle', type: 'Shotgun Silencer', compatibleWith: ['il-toro','vulcano'], effects: { dispersion: -8 }, description: '50% reduced noise for shotguns.' },

  // UNDERBARREL - Vertical Grips
  { id: 'vertical-grip-1', name: 'Vertical Grip I', tier: 1, slot: 'underbarrel', type: 'Vertical Grip', compatibleWith: ['tempest','arpeggio','kettle','ferro','rattler','stitcher','venator','vulcano','bobcat','canto'], effects: { verticalRecoil: -15 }, description: '15% reduced vertical recoil.' },
  { id: 'vertical-grip-2', name: 'Vertical Grip II', tier: 2, slot: 'underbarrel', type: 'Vertical Grip', compatibleWith: ['tempest','arpeggio','kettle','ferro','rattler','stitcher','venator','vulcano','bobcat','canto'], effects: { verticalRecoil: -25 }, description: '25% reduced vertical recoil.' },
  { id: 'vertical-grip-3', name: 'Vertical Grip III', tier: 3, slot: 'underbarrel', type: 'Vertical Grip', compatibleWith: ['arpeggio','il-toro','vulcano','stitcher','tempest'], effects: { verticalRecoil: -40, adsSpeed: -30 }, description: '40% reduced vertical recoil. 30% reduced ADS speed.' },

  // UNDERBARREL - Angled Grips
  { id: 'angled-grip-1', name: 'Angled Grip I', tier: 1, slot: 'underbarrel', type: 'Angled Grip', compatibleWith: ['tempest','arpeggio','kettle','ferro','rattler','canto','vulcano','bobcat','stitcher'], effects: { horizontalRecoil: -15 }, description: '15% reduced horizontal recoil.' },
  { id: 'angled-grip-2', name: 'Angled Grip II', tier: 2, slot: 'underbarrel', type: 'Angled Grip', compatibleWith: ['tempest','arpeggio','kettle','ferro','rattler','canto','vulcano','bobcat','stitcher'], effects: { horizontalRecoil: -30 }, description: '30% reduced horizontal recoil.' },
  { id: 'angled-grip-3', name: 'Angled Grip III', tier: 3, slot: 'underbarrel', type: 'Angled Grip', compatibleWith: ['vulcano','osprey','ferro','venator','il-toro','bobcat','tempest'], effects: { horizontalRecoil: -40, adsSpeed: -30 }, description: '40% reduced horizontal recoil. 30% reduced ADS speed.' },

  // UNDERBARREL - Horizontal Grip
  { id: 'horizontal-grip', name: 'Horizontal Grip', tier: 3, slot: 'underbarrel', type: 'Horizontal Grip', compatibleWith: ['tempest','vulcano','osprey'], effects: { horizontalRecoil: -30, verticalRecoil: -30, adsSpeed: -30 }, description: '30% reduced horizontal and vertical recoil. 30% reduced ADS speed.' },

  // MAGAZINE - Light
  { id: 'extended-light-mag-1', name: 'Extended Light Mag I', tier: 1, slot: 'magazine', type: 'Extended Light Mag', compatibleWith: ['burletta','bobcat','hairpin','kettle','stitcher'], effects: { magSize: 5 }, description: '+5 magazine size.' },
  { id: 'extended-light-mag-2', name: 'Extended Light Mag II', tier: 2, slot: 'magazine', type: 'Extended Light Mag', compatibleWith: ['burletta','bobcat','hairpin','kettle','stitcher'], effects: { magSize: 8 }, description: '+8 magazine size.' },
  { id: 'extended-light-mag-3', name: 'Extended Light Mag III', tier: 3, slot: 'magazine', type: 'Extended Light Mag', compatibleWith: ['burletta','bobcat','hairpin','kettle','stitcher'], effects: { magSize: 12 }, description: '+12 magazine size. Max capacity.' },

  // MAGAZINE - Medium
  { id: 'extended-medium-mag-1', name: 'Extended Medium Mag I', tier: 1, slot: 'magazine', type: 'Extended Medium Mag', compatibleWith: ['tempest','arpeggio','venator','torrente','renegade','osprey','rattler','bettina','canto'], effects: { magSize: 5 }, description: '+5 magazine size.' },
  { id: 'extended-medium-mag-2', name: 'Extended Medium Mag II', tier: 2, slot: 'magazine', type: 'Extended Medium Mag', compatibleWith: ['tempest','arpeggio','venator','torrente','renegade','osprey','rattler','bettina','canto'], effects: { magSize: 8 }, description: '+8 magazine size.' },
  { id: 'extended-medium-mag-3', name: 'Extended Medium Mag III', tier: 3, slot: 'magazine', type: 'Extended Medium Mag', compatibleWith: ['tempest','arpeggio','venator','torrente','renegade','osprey','rattler','bettina','canto'], effects: { magSize: 12 }, description: '+12 magazine size. Max capacity.' },

  // MAGAZINE - Shotgun
  { id: 'extended-shotgun-mag-1', name: 'Extended Shotgun Mag I', tier: 1, slot: 'magazine', type: 'Extended Shotgun Mag', compatibleWith: ['il-toro','vulcano'], effects: { magSize: 2 }, description: '+2 shell capacity.' },
  { id: 'extended-shotgun-mag-2', name: 'Extended Shotgun Mag II', tier: 2, slot: 'magazine', type: 'Extended Shotgun Mag', compatibleWith: ['il-toro','vulcano'], effects: { magSize: 4 }, description: '+4 shell capacity.' },
  { id: 'extended-shotgun-mag-3', name: 'Extended Shotgun Mag III', tier: 3, slot: 'magazine', type: 'Extended Shotgun Mag', compatibleWith: ['il-toro','vulcano'], effects: { magSize: 6 }, description: '+6 shell capacity. Max capacity.' },

  // STOCK - Stable Stock
  { id: 'stable-stock-1', name: 'Stable Stock I', tier: 1, slot: 'stock', type: 'Stable Stock', compatibleWith: ['tempest','arpeggio','renegade','vulcano','ferro','bobcat','il-toro','torrente','rattler','bettina','canto','stitcher','kettle','anvil','osprey'], effects: { verticalRecoil: -5, horizontalRecoil: -5 }, description: '20% reduced recoil recovery and dispersion recovery time.' },
  { id: 'stable-stock-2', name: 'Stable Stock II', tier: 2, slot: 'stock', type: 'Stable Stock', compatibleWith: ['tempest','arpeggio','renegade','vulcano','ferro','bobcat','il-toro','torrente','rattler','bettina','canto','stitcher','kettle','anvil','osprey'], effects: { verticalRecoil: -8, horizontalRecoil: -8 }, description: '35% reduced recoil recovery and dispersion recovery time.' },
  { id: 'stable-stock-3', name: 'Stable Stock III', tier: 3, slot: 'stock', type: 'Stable Stock', compatibleWith: ['bobcat','vulcano','osprey','il-toro','ferro','renegade','tempest','arpeggio','torrente','bettina','rattler','stitcher'], effects: { verticalRecoil: -12, horizontalRecoil: -12, adsSpeed: -10 }, description: '50% reduced recovery. 20% increased equip/unequip time.' },

  // STOCK - Lightweight Stock
  { id: 'lightweight-stock', name: 'Lightweight Stock', tier: 3, slot: 'stock', type: 'Lightweight Stock', compatibleWith: ['renegade','vulcano','bobcat','tempest','bettina','torrente','il-toro','anvil','osprey'], effects: { adsSpeed: 50, verticalRecoil: 10, horizontalRecoil: 10 }, description: '200% increased ADS speed. Increased recoil.' },

  // STOCK - Padded Stock
  { id: 'padded-stock', name: 'Padded Stock', tier: 3, slot: 'stock', type: 'Padded Stock', compatibleWith: ['rattler','il-toro','osprey','stitcher','ferro','arpeggio','renegade','vulcano','tempest','bobcat','bettina','kettle','canto','anvil'], effects: { horizontalRecoil: -12, verticalRecoil: -12, dispersion: -15, adsSpeed: -15 }, description: '30% reduced recoil and dispersion. 30% reduced ADS speed.' },

  // STOCK - Kinetic Converter (special)
  { id: 'kinetic-converter', name: 'Kinetic Converter', tier: 3, slot: 'stock', type: 'Kinetic Converter', compatibleWith: ['arpeggio','rattler','kettle','vulcano','osprey','torrente','ferro','il-toro','tempest','bobcat','stitcher','canto','bettina','renegade'], effects: { fireRate: 15, verticalRecoil: 15, horizontalRecoil: 15 }, description: '15% increased fire rate. 20% increased recoil.' },
];

export function getWeaponById(id: string): Weapon | undefined {
  return weapons.find((w) => w.id === id);
}

export function getAttachmentsForSlot(slot: AttachmentSlot, weaponId: string): Attachment[] {
  return attachments.filter(
    (a) => a.slot === slot && a.compatibleWith.includes(weaponId),
  );
}

export function getAttachmentById(id: string): Attachment | undefined {
  return attachments.find((a) => a.id === id);
}

export const weaponClasses: { class: WeaponClass; label: string }[] = [
  { class: 'Assault Rifle', label: 'Assault Rifles' },
  { class: 'Battle Rifle', label: 'Battle Rifles' },
  { class: 'SMG', label: 'SMGs' },
  { class: 'Shotgun', label: 'Shotguns' },
  { class: 'Sniper Rifle', label: 'Sniper Rifles' },
  { class: 'LMG', label: 'LMGs' },
  { class: 'Pistol', label: 'Pistols' },
  { class: 'Hand Cannon', label: 'Hand Cannons' },
  { class: 'Special', label: 'Special' },
];

export const slotLabels: Record<AttachmentSlot, string> = {
  muzzle: 'Muzzle',
  underbarrel: 'Underbarrel',
  magazine: 'Magazine',
  stock: 'Stock',
};

export const slotIcons: Record<AttachmentSlot, string> = {
  muzzle: '🎯',
  underbarrel: '🤌',
  magazine: '📦',
  stock: '🔧',
};
