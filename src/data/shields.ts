import type { Shield } from '../types';

export const shields: Shield[] = [
  {
    id: 'light-shield', name: 'Light Shield', charge: 40, damageMitigation: 0.40,
    movementPenalty: 0, weight: 5,
    compatibleAugments: [
      'pressure-regulator', 'kinetic-capacitor', 'focus',
      'scanner', 'breacher', 'signal-jammer',
      'vital-booster', 'trauma-kit', 'hazard-module', 'drop-pod-beacon',
      'space-synthesizer', 'weight-converter', 'ammo-converter', 'armory-converter',
    ],
    crafting: { station: 'Equipment Bench 1', level: 1, materials: [
      { id: 'scrap-metal', name: 'Scrap Metal', quantity: 4 },
      { id: 'circuit-board', name: 'Circuit Board', quantity: 1 },
    ]},
  },
  {
    id: 'medium-shield', name: 'Medium Shield', charge: 70, damageMitigation: 0.425,
    movementPenalty: 0.05, weight: 7,
    compatibleAugments: [
      'pressure-regulator', 'kinetic-capacitor', 'focus',
      'scanner', 'breacher', 'signal-jammer',
      'vital-booster', 'trauma-kit', 'hazard-module', 'drop-pod-beacon',
      'space-synthesizer', 'weight-converter', 'ammo-converter', 'armory-converter',
    ],
    crafting: { station: 'Equipment Bench', level: 2, materials: [
      { id: 'scrap-metal', name: 'Scrap Metal', quantity: 8 },
      { id: 'circuit-board', name: 'Circuit Board', quantity: 3 },
      { id: 'polymer', name: 'Polymer', quantity: 2 },
    ]},
  },
  {
    id: 'heavy-shield', name: 'Heavy Shield', charge: 80, damageMitigation: 0.525,
    movementPenalty: 0.15, weight: 9,
    compatibleAugments: [
      'pressure-regulator', 'kinetic-capacitor', 'focus',
      'scanner', 'breacher', 'signal-jammer',
      'vital-booster', 'trauma-kit', 'hazard-module', 'drop-pod-beacon',
      'space-synthesizer', 'weight-converter', 'ammo-converter', 'armory-converter',
    ],
    crafting: { station: 'Gear Bench 3', level: 3, materials: [
      { id: 'scrap-metal', name: 'Scrap Metal', quantity: 14 },
      { id: 'circuit-board', name: 'Circuit Board', quantity: 6 },
      { id: 'polymer', name: 'Polymer', quantity: 5 },
      { id: 'titanium-alloy', name: 'Titanium Alloy', quantity: 2 },
    ]},
  },
];

export function getShieldById(id: string): Shield | undefined {
  return shields.find(s => s.id === id);
}
