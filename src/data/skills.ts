import type { SkillNode } from '../types';

export const skillNodes: SkillNode[] = [
  // ── Conditioning (col 0-3) ──
  { id: 'sprint-efficiency', name: 'Sprint Efficiency', branch: 'Conditioning', maxPoints: 5, pointCost: 1, prerequisites: [], effectPerLevel: '-2% sprint stamina drain', icon: '🏃', recommended: 'S', gridPosition: { row: 0, col: 0 } },
  { id: 'weight-training', name: 'Weight Training', branch: 'Conditioning', maxPoints: 5, pointCost: 1, prerequisites: ['sprint-efficiency'], effectPerLevel: '+2kg weight limit', icon: '🏋️', recommended: 'S', gridPosition: { row: 1, col: 0 } },
  { id: 'vitality', name: 'Vitality', branch: 'Conditioning', maxPoints: 5, pointCost: 2, prerequisites: ['weight-training'], effectPerLevel: '+10 max HP', icon: '❤️', recommended: 'S', gridPosition: { row: 2, col: 0 } },
  { id: 'adrenaline-rush', name: 'Adrenaline Rush', branch: 'Conditioning', maxPoints: 3, pointCost: 2, prerequisites: ['vitality'], effectPerLevel: '+10% sprint speed when HP < 50%', icon: '💥', recommended: 'A', gridPosition: { row: 3, col: 0 } },

  { id: 'quick-recovery', name: 'Quick Recovery', branch: 'Conditioning', maxPoints: 3, pointCost: 1, prerequisites: [], effectPerLevel: '+15% stamina regen rate', icon: '⚡', recommended: 'A', gridPosition: { row: 0, col: 1 } },
  { id: 'pack-rat', name: 'Pack Rat', branch: 'Conditioning', maxPoints: 3, pointCost: 1, prerequisites: ['quick-recovery'], effectPerLevel: '+5% backpack slot capacity', icon: '🎒', recommended: 'A', gridPosition: { row: 1, col: 1 } },
  { id: 'durable', name: 'Durable', branch: 'Conditioning', maxPoints: 3, pointCost: 2, prerequisites: ['pack-rat'], effectPerLevel: '+10% item durability loss reduction', icon: '🛡️', recommended: 'A', gridPosition: { row: 2, col: 1 } },
  { id: 'scavenger', name: 'Scavenger', branch: 'Conditioning', maxPoints: 3, pointCost: 3, prerequisites: ['durable'], effectPerLevel: '+5% extra loot from containers', icon: '🔍', recommended: 'B', gridPosition: { row: 3, col: 1 } },

  { id: 'steady-hands', name: 'Steady Hands', branch: 'Conditioning', maxPoints: 3, pointCost: 1, prerequisites: [], effectPerLevel: '-5% weapon sway while ADS', icon: '🎯', recommended: 'A', gridPosition: { row: 0, col: 2 } },
  { id: 'recoil-compensation', name: 'Recoil Compensation', branch: 'Conditioning', maxPoints: 5, pointCost: 2, prerequisites: ['steady-hands'], effectPerLevel: '-3% vertical recoil', icon: '↕️', recommended: 'S', gridPosition: { row: 1, col: 2 } },
  { id: 'snap-aim', name: 'Snap Aim', branch: 'Conditioning', maxPoints: 3, pointCost: 2, prerequisites: ['recoil-compensation'], effectPerLevel: '+5% ADS speed', icon: '🎯', recommended: 'S', gridPosition: { row: 2, col: 2 } },
  { id: 'deadshot', name: 'Deadshot', branch: 'Conditioning', maxPoints: 3, pointCost: 3, prerequisites: ['snap-aim'], effectPerLevel: '+5% headshot damage multiplier', icon: '💀', recommended: 'A', gridPosition: { row: 3, col: 2 } },

  { id: 'light-step', name: 'Light Step', branch: 'Conditioning', maxPoints: 3, pointCost: 1, prerequisites: [], effectPerLevel: '-10% footstep audio radius', icon: '👣', recommended: 'B', gridPosition: { row: 0, col: 3 } },
  { id: 'silent-crouch', name: 'Silent Crouch', branch: 'Conditioning', maxPoints: 3, pointCost: 2, prerequisites: ['light-step'], effectPerLevel: '-15% crouch movement noise', icon: '🧊', recommended: 'B', gridPosition: { row: 1, col: 3 } },
  { id: 'ghost', name: 'Ghost', branch: 'Conditioning', maxPoints: 1, pointCost: 4, prerequisites: ['silent-crouch', 'adrenaline-rush', 'scavenger', 'deadshot'], effectPerLevel: 'Silent sprint. No footstep audio while sprinting.', icon: '👻', recommended: 'B', gridPosition: { row: 2, col: 3 } },

  // ── Mobility (col 4-7) ──
  { id: 'agile', name: 'Agile', branch: 'Mobility', maxPoints: 3, pointCost: 1, prerequisites: [], effectPerLevel: '+3% movement speed', icon: '🏃', recommended: 'S', gridPosition: { row: 0, col: 4 } },
  { id: 'evasive', name: 'Evasive', branch: 'Mobility', maxPoints: 3, pointCost: 1, prerequisites: ['agile'], effectPerLevel: '-5% enemy detection range while moving', icon: '💨', recommended: 'A', gridPosition: { row: 1, col: 4 } },
  { id: 'slippery', name: 'Slippery', branch: 'Mobility', maxPoints: 3, pointCost: 2, prerequisites: ['evasive'], effectPerLevel: '-10% enemy accuracy when sprinting near them', icon: '🫧', recommended: 'B', gridPosition: { row: 2, col: 4 } },
  { id: 'daredevil', name: 'Daredevil', branch: 'Mobility', maxPoints: 1, pointCost: 4, prerequisites: ['slippery', 'freerunner', 'nimble-fingers', 'vault'], effectPerLevel: '+15% movement speed. Can sprint while shooting.', icon: '🤘', recommended: 'A', gridPosition: { row: 3, col: 4 } },

  { id: 'vault', name: 'Vault', branch: 'Mobility', maxPoints: 3, pointCost: 1, prerequisites: [], effectPerLevel: '-15% vault obstacle penalty', icon: '🧱', recommended: 'A', gridPosition: { row: 0, col: 5 } },
  { id: 'catlike', name: 'Catlike', branch: 'Mobility', maxPoints: 3, pointCost: 1, prerequisites: ['vault'], effectPerLevel: '-15% fall damage. +10% landing speed', icon: '🐱', recommended: 'A', gridPosition: { row: 1, col: 5 } },
  { id: 'freerunner', name: 'Freerunner', branch: 'Mobility', maxPoints: 3, pointCost: 2, prerequisites: ['catlike'], effectPerLevel: '+10% mantle/climb speed. -20% climb stamina drain', icon: '🏗️', recommended: 'B', gridPosition: { row: 2, col: 5 } },
  { id: 'nimble-fingers', name: 'Nimble Fingers', branch: 'Mobility', maxPoints: 3, pointCost: 2, prerequisites: [], effectPerLevel: '+5% reload speed', icon: '🤌', recommended: 'S', gridPosition: { row: 0, col: 6 } },
  { id: 'quick-swap', name: 'Quick Swap', branch: 'Mobility', maxPoints: 3, pointCost: 1, prerequisites: ['nimble-fingers'], effectPerLevel: '+10% weapon swap speed', icon: '🔄', recommended: 'A', gridPosition: { row: 1, col: 6 } },
  { id: 'fast-heal', name: 'Fast Heal', branch: 'Mobility', maxPoints: 3, pointCost: 2, prerequisites: ['quick-swap'], effectPerLevel: '+10% med item use speed', icon: '💉', recommended: 'S', gridPosition: { row: 2, col: 6 } },

  // ── Survival (col 8-11) ──
  { id: 'toughness', name: 'Toughness', branch: 'Survival', maxPoints: 5, pointCost: 1, prerequisites: [], effectPerLevel: '+8 max HP', icon: '🛡️', recommended: 'S', gridPosition: { row: 0, col: 8 } },
  { id: 'iron-hide', name: 'Iron Hide', branch: 'Survival', maxPoints: 3, pointCost: 2, prerequisites: ['toughness'], effectPerLevel: '+3% damage resistance (all sources)', icon: '🪨', recommended: 'S', gridPosition: { row: 1, col: 8 } },
  { id: 'regenerator', name: 'Regenerator', branch: 'Survival', maxPoints: 3, pointCost: 2, prerequisites: ['iron-hide'], effectPerLevel: '+0.5 HP/s passive regen (out of combat)', icon: '♻️', recommended: 'A', gridPosition: { row: 2, col: 8 } },
  { id: 'immovable', name: 'Immovable', branch: 'Survival', maxPoints: 1, pointCost: 4, prerequisites: ['regenerator', 'quick-thinker', 'field-medic', 'grenadier'], effectPerLevel: '+25% damage resistance while stationary for 2s', icon: '🧱', recommended: 'A', gridPosition: { row: 3, col: 8 } },

  { id: 'field-medic', name: 'Field Medic', branch: 'Survival', maxPoints: 3, pointCost: 1, prerequisites: [], effectPerLevel: '+15% med item effectiveness', icon: '🚑', recommended: 'S', gridPosition: { row: 0, col: 9 } },
  { id: 'combat-medic', name: 'Combat Medic', branch: 'Survival', maxPoints: 3, pointCost: 2, prerequisites: ['field-medic'], effectPerLevel: '+20% revive speed', icon: '🩺', recommended: 'A', gridPosition: { row: 1, col: 9 } },
  { id: 'sturdy', name: 'Sturdy', branch: 'Survival', maxPoints: 3, pointCost: 1, prerequisites: [], effectPerLevel: '+10% limb damage resistance', icon: '🦵', recommended: 'A', gridPosition: { row: 0, col: 10 } },
  { id: 'pain-resistance', name: 'Pain Resistance', branch: 'Survival', maxPoints: 3, pointCost: 1, prerequisites: ['sturdy'], effectPerLevel: '-10% damage screen effects intensity', icon: '💊', recommended: 'B', gridPosition: { row: 1, col: 10 } },
  { id: 'last-stand', name: 'Last Stand', branch: 'Survival', maxPoints: 3, pointCost: 3, prerequisites: ['pain-resistance', 'combat-medic'], effectPerLevel: '+5s bleed-out time before death', icon: '⏰', recommended: 'A', gridPosition: { row: 2, col: 10 } },
  { id: 'quick-thinker', name: 'Quick Thinker', branch: 'Survival', maxPoints: 3, pointCost: 1, prerequisites: [], effectPerLevel: '-10% tactical item use speed', icon: '🧠', recommended: 'A', gridPosition: { row: 0, col: 11 } },
  { id: 'grenadier', name: 'Grenadier', branch: 'Survival', maxPoints: 3, pointCost: 2, prerequisites: ['quick-thinker'], effectPerLevel: '+10% throwable range. +5% blast radius', icon: '💣', recommended: 'A', gridPosition: { row: 1, col: 11 } },
  { id: 'jack-of-all-trades', name: 'Jack of All Trades', branch: 'Survival', maxPoints: 1, pointCost: 5, prerequisites: ['last-stand', 'grenadier', 'ghost', 'daredevil'], effectPerLevel: 'Unlock all perk-type bonuses at 50% effectiveness', icon: '🃏', recommended: 'F', gridPosition: { row: 2, col: 11 } },
];

export function getSkillNodeById(id: string): SkillNode | undefined {
  return skillNodes.find(n => n.id === id);
}

export function getNodesByBranch(branch: SkillNode['branch']): SkillNode[] {
  return skillNodes.filter(n => n.branch === branch);
}

export function getPrerequisites(nodeId: string): SkillNode[] {
  const node = getSkillNodeById(nodeId);
  if (!node) return [];
  return node.prerequisites.map(id => getSkillNodeById(id)).filter(Boolean) as SkillNode[];
}
