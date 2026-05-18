import type { MapData } from '../types';

export const maps: MapData[] = [
  {
    id: 'sector-1', name: 'Sector 1: Industrial Zone', difficulty: 1, unlockRound: 1, duration: 30,
    conditions: ['Day', 'Clear', 'Mild Radiation'],
    puzzleLoot: 'Containment Key — opens Storage Room B',
    loadoutTips: [
      'Short-to-mid range weapons recommended',
      'Bring lockpicks for office loot rooms',
      'Night vision optional — well-lit interiors',
      'Watch for ambushers in the warehouse catwalks',
    ],
  },
  {
    id: 'sector-2', name: 'Sector 2: Research Facility', difficulty: 2, unlockRound: 3, duration: 35,
    conditions: ['Day/Night', 'Intermittent Rain', 'Moderate Radiation'],
    puzzleLoot: 'Research Data (sellable), Room 4 access key',
    loadoutTips: [
      'Mid-range with a scope helps in the courtyard',
      'Bring EMP grenades for automated turrets',
      'Hazard Module recommended for lab areas',
      'Data spikes needed for terminal hacks',
    ],
  },
  {
    id: 'sector-3', name: 'Sector 3: Abandoned Metro', difficulty: 3, unlockRound: 6, duration: 35,
    conditions: ['Dark', 'Humid', 'Tight Quarters'],
    puzzleLoot: 'Metro Vault Key — contains high-tier loot',
    loadoutTips: [
      'CQB weapons excel here — SMGs and shotguns',
      'Flashlight or night vision essential',
      'Bear traps work well in tunnel chokepoints',
      'Bring extra meds — enemies hit hard up close',
    ],
  },
  {
    id: 'sector-4', name: 'Sector 4: Corporate HQ', difficulty: 4, unlockRound: 9, duration: 40,
    conditions: ['Day/Night', 'Heavy Security', 'Elevated Radiation'],
    puzzleLoot: 'CEO Keycard — executive floor loot room',
    loadoutTips: [
      'Bring a mix of CQB and mid-range',
      'Heavy shield recommended — lots of crossfire',
      'Signal Jammer useful for PvP zones',
      'Sonic traps help disorient campers',
    ],
  },
  {
    id: 'sector-5', name: 'Sector 5: Containment Zone', difficulty: 5, unlockRound: 12, duration: 40,
    conditions: ['Toxic Atmosphere', 'Extreme Radiation', 'Limited Visibility'],
    puzzleLoot: 'Hazmat Keycard — decontamination vault',
    loadoutTips: [
      'Hazard Module Mk.2+ is mandatory',
      'Bring antidotes and radiation meds',
      'Long-range weapons useful in open areas',
      'Coordinate with squad — easy to get separated',
    ],
  },
  {
    id: 'sector-6', name: 'Sector 6: The Core', difficulty: 5, unlockRound: 16, duration: 45,
    conditions: ['Volatile', 'Extreme Radiation', 'Boss Spawns'],
    puzzleLoot: 'Core Fragment (quest item), Omega Cache Key',
    loadoutTips: [
      'Bring your best gear — this is endgame',
      'Full squad required',
      'Boss enemies have heavy shields — bring AP ammo',
      'Jump pack or grapple can unlock secret loot paths',
      'Extract camping is common — stay alert',
    ],
  },
];

export function getMapById(id: string): MapData | undefined {
  return maps.find(m => m.id === id);
}
