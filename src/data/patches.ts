export interface PatchEntry {
  id: string;
  version: string;
  date: string;
  title: string;
  changes: string[];
  weaponsAffected?: string[];
  metaChanges?: boolean;
}

export const patches: PatchEntry[] = [
  {
    id: '1.24',
    version: '1.24',
    date: '2026-02-15',
    title: 'Ammo Economy',
    changes: [
      'Adjusted Medium Ammo spawn rates in all sectors',
      'Increased Scrap Metal drop rate from containers',
      'Rebalanced shotgun pellet spread patterns',
      'Added crafting recipes for Extended Barrel and Shotgun Choke',
      'Fixed Kettle damage scaling at Tier III and IV',
    ],
    weaponsAffected: ['kettle', 'canto', 'tempest'],
  },
  {
    id: '1.25',
    version: '1.25',
    date: '2026-03-22',
    title: 'Gunsmith Update',
    changes: [
      'New weapon: Osprey — semi-auto battle rifle',
      'New weapon: Venator — marksman rifle',
      'All weapons now support up to 4 attachment slots',
      'New attachment: Kinetic Converter (Tech Mod)',
      'New attachment: Anvil Splitter (Tech Mod)',
      'Rebalanced all suppressor stat penalties',
    ],
    weaponsAffected: ['osprey', 'venator'],
  },
  {
    id: '1.26',
    version: '1.26',
    date: '2026-04-30',
    title: 'The Big One',
    changes: [
      'Skill tree expanded to 44 nodes across 3 branches',
      'New augment: Signal Jammer (avoids detection)',
      'New augment: Kinetic Capacitor (shock melee)',
      'New augment: Vital Booster (temporary max HP)',
      'Crafting system: 26 recipes across 5 stations',
      'New quick-use items: Adrenaline Shot, Repair Kit, Lockpick',
      'Medium Shield now compatible with more augments',
      'Various UI and quality-of-life improvements',
    ],
    weaponsAffected: [],
    metaChanges: true,
  },
];

export const latestPatch = patches[patches.length - 1];

export function getPatchByVersion(version: string): PatchEntry | undefined {
  return patches.find(p => p.version === version);
}
