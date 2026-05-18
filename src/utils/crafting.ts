import { craftingRecipes, getRecipeForItem } from '../data/crafting';

export interface MaterialRequirement {
  id: string;
  name: string;
  quantity: number;
  perItem: number;
}

export interface CraftingSummary {
  totalMaterials: MaterialRequirement[];
  stationsRequired: { name: string; level: number }[];
  totalCrafts: number;
}

export function calculateMaterialsForItems(itemIds: string[]): CraftingSummary {
  const materialMap = new Map<string, { name: string; total: number; recipeCount: number }>();
  const stationSet = new Set<string>();

  for (const itemId of itemIds) {
    const recipe = getRecipeForItem(itemId);
    if (!recipe) continue;

    stationSet.add(`${recipe.station} (Lv.${recipe.stationLevel})`);

    for (const mat of recipe.materials) {
      const existing = materialMap.get(mat.id);
      if (existing) {
        existing.total += mat.quantity;
        existing.recipeCount += 1;
      } else {
        materialMap.set(mat.id, { name: mat.name, total: mat.quantity, recipeCount: 1 });
      }
    }
  }

  return {
    totalMaterials: Array.from(materialMap.entries()).map(([id, data]) => ({
      id,
      name: data.name,
      quantity: data.total,
      perItem: Math.round(data.total / data.recipeCount),
    })),
    stationsRequired: craftingRecipes
      .filter(r => itemIds.includes(r.produces))
      .map(r => ({ name: r.station, level: r.stationLevel }))
      .filter((s, i, arr) => arr.findIndex(x => x.name === s.name && x.level === s.level) === i),
    totalCrafts: itemIds.length,
  };
}

export function getStations(): string[] {
  const stations = new Set(craftingRecipes.map(r => r.station));
  return Array.from(stations);
}

export function getRecipesByStation(station: string) {
  return craftingRecipes.filter(r => r.station === station);
}
