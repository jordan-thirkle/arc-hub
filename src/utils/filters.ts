import type { MetaBuild, BuildRole, WeaponClass, AmmoType } from '../types';
import { getWeaponById } from '../data/weapons';
import type { CommunityBuild } from '../hooks/useCommunityBuilds';

export interface BuildFilters {
  role: BuildRole | 'all';
  weaponClass: WeaponClass | 'all';
  ammoType: AmmoType | 'all';
  patch: string | 'all';
  search: string;
  minRating: number;
  sortBy: 'rating' | 'votes' | 'newest';
  sortDir: 'desc' | 'asc';
  source?: 'official' | 'community' | 'all';
}

export const defaultFilters: BuildFilters = {
  role: 'all',
  weaponClass: 'all',
  ammoType: 'all',
  patch: 'all',
  search: '',
  minRating: 0,
  sortBy: 'rating',
  sortDir: 'desc',
  source: 'all',
};

export function filterBuilds(builds: MetaBuild[], filters: BuildFilters): MetaBuild[] {
  let result = [...builds];

  if (filters.role !== 'all') {
    result = result.filter(b => b.role === filters.role);
  }
  if (filters.weaponClass !== 'all') {
    result = result.filter(b => {
      const w = getWeaponById(b.build.primaryWeaponId);
      return w?.class === filters.weaponClass;
    });
  }
  if (filters.ammoType !== 'all') {
    result = result.filter(b => {
      const w = getWeaponById(b.build.primaryWeaponId);
      return w?.ammoType === filters.ammoType;
    });
  }
  if (filters.patch !== 'all') {
    result = result.filter(b => b.patch === filters.patch);
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      b =>
        b.name.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.tags.some(t => t.toLowerCase().includes(q)),
    );
  }
  if (filters.minRating > 0) {
    result = result.filter(b => b.rating >= filters.minRating);
  }

  result.sort((a, b) => {
    switch (filters.sortBy) {
      case 'rating':
        return filters.sortDir === 'desc' ? b.rating - a.rating : a.rating - b.rating;
      case 'votes':
        return filters.sortDir === 'desc' ? b.votes - a.votes : a.votes - b.votes;
      default:
        return 0;
    }
  });

  return result;
}

export function getUniquePatches(builds: MetaBuild[]): string[] {
  return [...new Set(builds.map(b => b.patch))].sort();
}

export function getUniqueRoles(builds: MetaBuild[]): BuildRole[] {
  return [...new Set(builds.map(b => b.role))];
}

export function filterCommunityBuilds(builds: CommunityBuild[], filters: BuildFilters): CommunityBuild[] {
  let result = [...builds];

  if (filters.source === 'official') result = result.filter(b => b.official);
  else if (filters.source === 'community') result = result.filter(b => !b.official);

  if (filters.role !== 'all') result = result.filter(b => b.role === filters.role);
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(b => b.name.toLowerCase().includes(q) || b.tags.some(t => t.toLowerCase().includes(q)));
  }

  result.sort((a, b) => {
    switch (filters.sortBy) {
      case 'votes':
        return filters.sortDir === 'desc'
          ? (b.net_votes ?? 0) - (a.net_votes ?? 0)
          : (a.net_votes ?? 0) - (b.net_votes ?? 0);
      case 'rating':
        return filters.sortDir === 'desc'
          ? (b.net_votes ?? 0) - (a.net_votes ?? 0)
          : (a.net_votes ?? 0) - (b.net_votes ?? 0);
      case 'newest':
        return filters.sortDir === 'desc'
          ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          : new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      default:
        return 0;
    }
  });

  return result;
}
