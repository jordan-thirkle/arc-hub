import type { Trader } from '../types';

export const traders: Trader[] = [
  {
    id: 'haley', name: 'Haley — Quartermaster', currency: 'Credits',
    inventory: [
      { itemId: 'bandage', price: 50, stockLimit: 20, category: 'Medical' },
      { itemId: 'med-kit-basic', price: 200, stockLimit: 10, category: 'Medical' },
      { itemId: 'painkiller', price: 150, stockLimit: 5, category: 'Medical' },
      { itemId: 'shield-cell', price: 100, stockLimit: 15, category: 'Shield' },
      { itemId: 'energy-drink', price: 75, stockLimit: 15, category: 'Stamina' },
      { itemId: 'kettle', price: 750, stockLimit: 1, category: 'Weapon' },
      { itemId: 'rattler', price: 850, stockLimit: 1, category: 'Weapon' },
      { itemId: 'stitcher', price: 500, stockLimit: 1, category: 'Weapon' },
      { itemId: 'bobcat', price: 400, stockLimit: 1, category: 'Weapon' },
      { itemId: 'hairpin', price: 300, stockLimit: 1, category: 'Weapon' },
      { itemId: 'burletta', price: 200, stockLimit: 1, category: 'Weapon' },
      { itemId: 'renegade', price: 600, stockLimit: 1, category: 'Weapon' },
      { itemId: 'iltoro', price: 600, stockLimit: 1, category: 'Weapon' },
    ],
  },
  {
    id: 'marcus', name: 'Marcus — Tech Specialist', currency: 'Credits + Parts',
    inventory: [
      { itemId: 'lockpick', price: 100, stockLimit: 5, category: 'Utility' },
      { itemId: 'data-spike', price: 150, stockLimit: 5, category: 'Utility' },
      { itemId: 'flashlight', price: 80, stockLimit: 3, category: 'Utility' },
      { itemId: 'binoculars', price: 200, stockLimit: 2, category: 'Utility' },
      { itemId: 'stim-shot', price: 350, stockLimit: 5, category: 'Medical' },
      { itemId: 'signal-jammer', price: 2500, stockLimit: 1, category: 'Augment' },
    ],
  },
  {
    id: 'kuro', name: 'Kuro — Black Market', currency: 'Credits',
    inventory: [
      { itemId: 'frag-grenade', price: 300, stockLimit: 5, category: 'Grenade' },
      { itemId: 'smoke-grenade', price: 200, stockLimit: 3, category: 'Grenade' },
      { itemId: 'proximity-mine', price: 500, stockLimit: 2, category: 'Grenade' },
      { itemId: 'jump-pack', price: 2500, stockLimit: 1, category: 'Utility' },
      { itemId: 'grapple-hook', price: 2000, stockLimit: 1, category: 'Utility' },
      { itemId: 'night-vision', price: 1500, stockLimit: 1, category: 'Utility' },
    ],
  },
  {
    id: 'zara', name: 'Zara — Armorer', currency: 'Credits + Materials',
    inventory: [
      { itemId: 'light-shield', price: 500, stockLimit: 1, category: 'Shield' },
      { itemId: 'medium-shield', price: 1500, stockLimit: 1, category: 'Shield' },
      { itemId: 'heavy-shield', price: 3500, stockLimit: 1, category: 'Shield' },
      { itemId: 'repair-kit', price: 400, stockLimit: 3, category: 'Utility' },
      { itemId: 'tempest', price: 2000, stockLimit: 1, category: 'Weapon' },
      { itemId: 'ferro', price: 1500, stockLimit: 1, category: 'Weapon' },
      { itemId: 'vulcano', price: 1400, stockLimit: 1, category: 'Weapon' },
    ],
  },
  {
    id: 'doc', name: 'Doc — Medical Specialist', currency: 'Credits + Medicine',
    inventory: [
      { itemId: 'med-kit-advanced', price: 800, stockLimit: 5, category: 'Medical' },
      { itemId: 'med-kit-surgical', price: 2000, stockLimit: 2, category: 'Medical' },
      { itemId: 'antidote', price: 300, stockLimit: 3, category: 'Medical' },
      { itemId: 'blood-pack', price: 1200, stockLimit: 3, category: 'Medical' },
      { itemId: 'adrenaline-shot', price: 900, stockLimit: 2, category: 'Stamina' },
      { itemId: 'trauma-kit', price: 3000, stockLimit: 1, category: 'Augment' },
    ],
  },
];

export function getTraderById(id: string): Trader | undefined {
  return traders.find(t => t.id === id);
}
