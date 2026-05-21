import { describe, it, expect } from 'vitest';
import { filterBuilds, getUniqueRoles, getUniquePatches } from '../filters';
import type { MetaBuild } from '../../types';

const mockBuilds: MetaBuild[] = [
  {
    id: 'build-1', name: 'Rattler PvP', role: 'PvP Aggressor', patch: 'v1.26',
    description: 'Top tier PvP loadout for close quarters', rating: 4.8, votes: 120,
    author: 'Meta', tags: ['pvp', 'meta'],
    build: { name: '', primaryWeaponId: 'rattler', primaryTier: 2, primaryAttachments: [], quickUseItems: [] },
  },
  {
    id: 'build-2', name: 'Tempest Farmer', role: 'PvE Farmer', patch: 'v1.26',
    description: 'Best PvE clear speed build', rating: 4.5, votes: 85,
    author: 'Meta', tags: ['pve', 'farming'],
    build: { name: '', primaryWeaponId: 'tempest', primaryTier: 2, primaryAttachments: [], quickUseItems: [] },
  },
  {
    id: 'build-3', name: 'Stealth Sniper', role: 'Stealth', patch: 'v1.25',
    description: 'Silent and deadly long range', rating: 4.2, votes: 45,
    author: 'Meta', tags: ['stealth', 'sniper'],
    build: { name: '', primaryWeaponId: 'osprey', primaryTier: 3, primaryAttachments: [], quickUseItems: [] },
  },
];

describe('filterBuilds', () => {
  it('returns all builds with default filters', () => {
    const result = filterBuilds(mockBuilds, {
      role: 'all', weaponClass: 'all', ammoType: 'all', patch: 'all',
      search: '', minRating: 0, sortBy: 'rating', sortDir: 'desc',
    });
    expect(result).toHaveLength(3);
  });

  it('filters by role', () => {
    const result = filterBuilds(mockBuilds, {
      role: 'Stealth', weaponClass: 'all', ammoType: 'all', patch: 'all',
      search: '', minRating: 0, sortBy: 'rating', sortDir: 'desc',
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('build-3');
  });

  it('filters by search term (name)', () => {
    const result = filterBuilds(mockBuilds, {
      role: 'all', weaponClass: 'all', ammoType: 'all', patch: 'all',
      search: 'farmer', minRating: 0, sortBy: 'rating', sortDir: 'desc',
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('build-2');
  });

  it('filters by search term (tags)', () => {
    const result = filterBuilds(mockBuilds, {
      role: 'all', weaponClass: 'all', ammoType: 'all', patch: 'all',
      search: 'sniper', minRating: 0, sortBy: 'rating', sortDir: 'desc',
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('build-3');
  });

  it('filters by minimum rating', () => {
    const result = filterBuilds(mockBuilds, {
      role: 'all', weaponClass: 'all', ammoType: 'all', patch: 'all',
      search: '', minRating: 4.5, sortBy: 'rating', sortDir: 'desc',
    });
    expect(result).toHaveLength(2);
  });

  it('filters by patch', () => {
    const result = filterBuilds(mockBuilds, {
      role: 'all', weaponClass: 'all', ammoType: 'all', patch: 'v1.25',
      search: '', minRating: 0, sortBy: 'rating', sortDir: 'desc',
    });
    expect(result).toHaveLength(1);
    expect(result[0].patch).toBe('v1.25');
  });

  it('sorts by rating descending by default', () => {
    const result = filterBuilds(mockBuilds, {
      role: 'all', weaponClass: 'all', ammoType: 'all', patch: 'all',
      search: '', minRating: 0, sortBy: 'rating', sortDir: 'desc',
    });
    expect(result[0].rating).toBeGreaterThanOrEqual(result[1].rating);
  });

  it('sorts by votes ascending', () => {
    const result = filterBuilds(mockBuilds, {
      role: 'all', weaponClass: 'all', ammoType: 'all', patch: 'all',
      search: '', minRating: 0, sortBy: 'votes', sortDir: 'asc',
    });
    expect(result[0].votes).toBeLessThanOrEqual(result[1].votes);
  });

  it('returns empty array when no builds match role', () => {
    const result = filterBuilds(mockBuilds, {
      role: 'Support', weaponClass: 'all', ammoType: 'all', patch: 'all',
      search: '', minRating: 0, sortBy: 'rating', sortDir: 'desc',
    });
    expect(result).toHaveLength(0);
  });
});

describe('getUniqueRoles', () => {
  it('returns unique roles from builds', () => {
    const roles = getUniqueRoles(mockBuilds);
    expect(roles).toContain('PvP Aggressor');
    expect(roles).toContain('PvE Farmer');
    expect(roles).toContain('Stealth');
    expect(roles).toHaveLength(3);
  });

  it('returns empty array for empty input', () => {
    expect(getUniqueRoles([])).toEqual([]);
  });
});

describe('getUniquePatches', () => {
  it('returns unique sorted patches', () => {
    const patches = getUniquePatches(mockBuilds);
    expect(patches).toEqual(['v1.25', 'v1.26']);
  });
});
