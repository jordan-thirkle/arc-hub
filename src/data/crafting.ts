export interface CraftingRecipe {
  id: string;
  name: string;
  station: string;
  stationLevel: number;
  materials: { id: string; name: string; quantity: number }[];
  produces: string;
  category: 'attachment' | 'shield' | 'augment' | 'consumable';
}

export const craftingRecipes: CraftingRecipe[] = [
  // ── Muzzle Attachments ──
  { id: 'craft-silencer', name: 'Silencer', station: 'Gunsmith Bench', stationLevel: 2, produces: 'silencer', category: 'attachment',
    materials: [
      { id: 'scrap-metal', name: 'Scrap Metal', quantity: 6 },
      { id: 'polymer', name: 'Polymer', quantity: 3 },
      { id: 'screw-set', name: 'Screw Set', quantity: 2 },
    ]},
  { id: 'craft-compensator', name: 'Compensator', station: 'Gunsmith Bench', stationLevel: 1, produces: 'compensator', category: 'attachment',
    materials: [
      { id: 'scrap-metal', name: 'Scrap Metal', quantity: 4 },
      { id: 'screw-set', name: 'Screw Set', quantity: 1 },
    ]},
  { id: 'craft-muzzle-brake', name: 'Muzzle Brake', station: 'Gunsmith Bench', stationLevel: 3, produces: 'muzzle-brake', category: 'attachment',
    materials: [
      { id: 'titanium-alloy', name: 'Titanium Alloy', quantity: 3 },
      { id: 'scrap-metal', name: 'Scrap Metal', quantity: 4 },
      { id: 'screw-set', name: 'Screw Set', quantity: 2 },
    ]},
  { id: 'craft-extended-barrel', name: 'Extended Barrel', station: 'Gunsmith Bench', stationLevel: 3, produces: 'extended-barrel', category: 'attachment',
    materials: [
      { id: 'titanium-alloy', name: 'Titanium Alloy', quantity: 4 },
      { id: 'scrap-metal', name: 'Scrap Metal', quantity: 8 },
      { id: 'screw-set', name: 'Screw Set', quantity: 3 },
    ]},

  // ── Shotgun Muzzle ──
  { id: 'craft-shotgun-choke', name: 'Shotgun Choke', station: 'Gunsmith Bench', stationLevel: 2, produces: 'shotgun-choke', category: 'attachment',
    materials: [
      { id: 'scrap-metal', name: 'Scrap Metal', quantity: 5 },
      { id: 'polymer', name: 'Polymer', quantity: 2 },
    ]},
  { id: 'craft-shotgun-silencer', name: 'Shotgun Silencer', station: 'Gunsmith Bench', stationLevel: 3, produces: 'shotgun-silencer', category: 'attachment',
    materials: [
      { id: 'titanium-alloy', name: 'Titanium Alloy', quantity: 2 },
      { id: 'scrap-metal', name: 'Scrap Metal', quantity: 6 },
      { id: 'polymer', name: 'Polymer', quantity: 4 },
    ]},

  // ── Underbarrel ──
  { id: 'craft-vertical-grip', name: 'Vertical Grip', station: 'Gunsmith Bench', stationLevel: 1, produces: 'vertical-grip', category: 'attachment',
    materials: [
      { id: 'scrap-metal', name: 'Scrap Metal', quantity: 3 },
      { id: 'polymer', name: 'Polymer', quantity: 2 },
    ]},
  { id: 'craft-angled-grip', name: 'Angled Grip', station: 'Gunsmith Bench', stationLevel: 2, produces: 'angled-grip', category: 'attachment',
    materials: [
      { id: 'scrap-metal', name: 'Scrap Metal', quantity: 4 },
      { id: 'polymer', name: 'Polymer', quantity: 3 },
      { id: 'screw-set', name: 'Screw Set', quantity: 1 },
    ]},
  { id: 'craft-horizontal-grip', name: 'Horizontal Grip', station: 'Gunsmith Bench', stationLevel: 3, produces: 'horizontal-grip', category: 'attachment',
    materials: [
      { id: 'titanium-alloy', name: 'Titanium Alloy', quantity: 2 },
      { id: 'polymer', name: 'Polymer', quantity: 4 },
      { id: 'screw-set', name: 'Screw Set', quantity: 2 },
    ]},

  // ── Magazines ──
  { id: 'craft-extended-light-mag', name: 'Extended Light Mag', station: 'Gunsmith Bench', stationLevel: 2, produces: 'extended-light-mag', category: 'attachment',
    materials: [
      { id: 'scrap-metal', name: 'Scrap Metal', quantity: 4 },
      { id: 'spring-kit', name: 'Spring Kit', quantity: 1 },
      { id: 'polymer', name: 'Polymer', quantity: 2 },
    ]},
  { id: 'craft-extended-medium-mag', name: 'Extended Medium Mag', station: 'Gunsmith Bench', stationLevel: 2, produces: 'extended-medium-mag', category: 'attachment',
    materials: [
      { id: 'scrap-metal', name: 'Scrap Metal', quantity: 5 },
      { id: 'spring-kit', name: 'Spring Kit', quantity: 1 },
      { id: 'polymer', name: 'Polymer', quantity: 2 },
    ]},
  { id: 'craft-extended-shotgun-mag', name: 'Extended Shotgun Mag', station: 'Gunsmith Bench', stationLevel: 3, produces: 'extended-shotgun-mag', category: 'attachment',
    materials: [
      { id: 'titanium-alloy', name: 'Titanium Alloy', quantity: 1 },
      { id: 'scrap-metal', name: 'Scrap Metal', quantity: 4 },
      { id: 'spring-kit', name: 'Spring Kit', quantity: 2 },
    ]},

  // ── Stocks ──
  { id: 'craft-stable-stock', name: 'Stable Stock', station: 'Gunsmith Bench', stationLevel: 2, produces: 'stable-stock', category: 'attachment',
    materials: [
      { id: 'scrap-metal', name: 'Scrap Metal', quantity: 4 },
      { id: 'polymer', name: 'Polymer', quantity: 3 },
      { id: 'screw-set', name: 'Screw Set', quantity: 1 },
    ]},
  { id: 'craft-lightweight-stock', name: 'Lightweight Stock', station: 'Gunsmith Bench', stationLevel: 3, produces: 'lightweight-stock', category: 'attachment',
    materials: [
      { id: 'titanium-alloy', name: 'Titanium Alloy', quantity: 2 },
      { id: 'polymer', name: 'Polymer', quantity: 5 },
      { id: 'screw-set', name: 'Screw Set', quantity: 2 },
    ]},
  { id: 'craft-padded-stock', name: 'Padded Stock', station: 'Gunsmith Bench', stationLevel: 1, produces: 'padded-stock', category: 'attachment',
    materials: [
      { id: 'polymer', name: 'Polymer', quantity: 4 },
      { id: 'fabric', name: 'Fabric', quantity: 2 },
    ]},

  // ── Tech Mods ──
  { id: 'craft-kinetic-converter', name: 'Kinetic Converter', station: 'Electronics Bench', stationLevel: 3, produces: 'kinetic-converter', category: 'attachment',
    materials: [
      { id: 'circuit-board', name: 'Circuit Board', quantity: 4 },
      { id: 'energy-cell', name: 'Energy Cell', quantity: 2 },
      { id: 'titanium-alloy', name: 'Titanium Alloy', quantity: 2 },
    ]},
  { id: 'craft-anvil-splitter', name: 'Anvil Splitter', station: 'Gunsmith Bench', stationLevel: 4, produces: 'anvil-splitter', category: 'attachment',
    materials: [
      { id: 'titanium-alloy', name: 'Titanium Alloy', quantity: 5 },
      { id: 'circuit-board', name: 'Circuit Board', quantity: 3 },
      { id: 'screw-set', name: 'Screw Set', quantity: 3 },
    ]},

  // ── Consumables ──
  { id: 'craft-frag-grenade', name: 'Frag Grenade', station: 'Explosives Bench', stationLevel: 1, produces: 'frag-grenade', category: 'consumable',
    materials: [
      { id: 'scrap-metal', name: 'Scrap Metal', quantity: 2 },
      { id: 'gunpowder', name: 'Gunpowder', quantity: 2 },
    ]},
  { id: 'craft-incendiary-grenade', name: 'Incendiary Grenade', station: 'Explosives Bench', stationLevel: 2, produces: 'incendiary-grenade', category: 'consumable',
    materials: [
      { id: 'scrap-metal', name: 'Scrap Metal', quantity: 2 },
      { id: 'chemicals', name: 'Chemicals', quantity: 2 },
      { id: 'gunpowder', name: 'Gunpowder', quantity: 1 },
    ]},
  { id: 'craft-proximity-mine', name: 'Proximity Mine', station: 'Explosives Bench', stationLevel: 2, produces: 'proximity-mine', category: 'consumable',
    materials: [
      { id: 'scrap-metal', name: 'Scrap Metal', quantity: 4 },
      { id: 'circuit-board', name: 'Circuit Board', quantity: 1 },
      { id: 'gunpowder', name: 'Gunpowder', quantity: 3 },
    ]},
  { id: 'craft-advanced-med-kit', name: 'Advanced Med Kit', station: 'Medical Bench', stationLevel: 2, produces: 'med-kit-advanced', category: 'consumable',
    materials: [
      { id: 'bandage', name: 'Bandage', quantity: 2 },
      { id: 'chemicals', name: 'Chemicals', quantity: 2 },
    ]},
  { id: 'craft-stim-shot', name: 'Stim Shot', station: 'Medical Bench', stationLevel: 3, produces: 'stim-shot', category: 'consumable',
    materials: [
      { id: 'chemicals', name: 'Chemicals', quantity: 3 },
      { id: 'energy-cell', name: 'Energy Cell', quantity: 1 },
    ]},
  { id: 'craft-lockpick', name: 'Lockpick', station: 'Workshop Bench', stationLevel: 1, produces: 'lockpick', category: 'consumable',
    materials: [
      { id: 'scrap-metal', name: 'Scrap Metal', quantity: 2 },
    ]},
  { id: 'craft-data-spike', name: 'Data Spike', station: 'Electronics Bench', stationLevel: 1, produces: 'data-spike', category: 'consumable',
    materials: [
      { id: 'circuit-board', name: 'Circuit Board', quantity: 1 },
    ]},

  // ── Crafting Stations ──
  {
    id: 'crafting-station-materials', name: 'Crafting Stations — Material Sources',
    station: 'Various', stationLevel: 0, produces: 'crafting-stations', category: 'consumable',
    materials: [
      { id: 'scrap-metal', name: 'Scrap Metal', quantity: 1 },
      { id: 'polymer', name: 'Polymer', quantity: 1 },
      { id: 'screw-set', name: 'Screw Set', quantity: 1 },
      { id: 'titanium-alloy', name: 'Titanium Alloy', quantity: 1 },
      { id: 'circuit-board', name: 'Circuit Board', quantity: 1 },
      { id: 'spring-kit', name: 'Spring Kit', quantity: 1 },
      { id: 'energy-cell', name: 'Energy Cell', quantity: 1 },
      { id: 'gunpowder', name: 'Gunpowder', quantity: 1 },
      { id: 'chemicals', name: 'Chemicals', quantity: 1 },
      { id: 'fabric', name: 'Fabric', quantity: 1 },
    ],
  },
];

export function getRecipesByStation(station: string): CraftingRecipe[] {
  return craftingRecipes.filter(r => r.station === station);
}

export function getRecipeForItem(itemId: string): CraftingRecipe | undefined {
  return craftingRecipes.find(r => r.produces === itemId);
}
