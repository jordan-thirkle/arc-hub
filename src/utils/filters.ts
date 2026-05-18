import type { MetaBuild, BuildRole, WeaponClass, AmmoType } from '../types';
import { getWeaponById } from '../data/weapons';

export interface BuildFilters {
  role: BuildRole | 'all';
  weaponClass: WeaponClass | 'all';
  ammoType: AmmoType | 'all';
  patch: string | 'all';
  search: string;
  minRating: number;
  sortBy: 'rating' | 'votes' | 'newest';
  sortDir: 'desc' | 'asc';
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
    result = result.filter(b =>
      b.name.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q) ||
      b.tags.some(t => t.toLowerCase().includes(q))
    );
  }
  if (filters.minRating > 0) {
    result = result.filter(b => b.rating >= filters.minRating);
  }

  result.sort((a, b) => {
    let cmp = 0;
    switch (filters.sortBy) {
      case 'rating': cmp = a.rating - b.rating; break;
      case 'votes': cmp = a.votes - b.votes; break;
      case 'newest': cmp = new Date(a.createdAt ?? 0).getTime() - new Date(b.createdAt ?? 0).getTime(); break;
    }
    return filters.sortDir === 'desc' ? -cmp : cmp;
  });

  return result;
}

export function getUniquePatches(builds: MetaBuild[]): string[] {
  return [...new Set(builds.map(b => b.patch))].sort();
}

export function getUniqueRoles(builds: MetaBuild[]): BuildRole[] {
  return [...new Set(builds.map(b => b.role))];
}
