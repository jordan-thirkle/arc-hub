import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import {
  allocatePoint,
  deallocatePoint,
  getTotalPoints,
  canAllocate,
  canDeallocate,
  defaultAllocation,
} from '../utils/skills';
import type { SkillAllocation } from '../utils/skills';

const MAX_TOTAL_POINTS = 91;

export function useSkills() {
  const [allocation, setAllocation] = useLocalStorage<SkillAllocation>('ar_skills', defaultAllocation());

  const totalPoints = useMemo(() => getTotalPoints(allocation), [allocation]);

  const addPoint = useCallback(
    (nodeId: string) => {
      setAllocation(prev => {
        if (totalPoints >= MAX_TOTAL_POINTS) return prev;
        return allocatePoint(nodeId, prev);
      });
    },
    [setAllocation, totalPoints],
  );

  const removePoint = useCallback(
    (nodeId: string) => {
      setAllocation(prev => deallocatePoint(nodeId, prev));
    },
    [setAllocation],
  );

  const canAdd = useCallback(
    (nodeId: string) => {
      if (totalPoints >= MAX_TOTAL_POINTS) return { allowed: false, reason: 'Max total points reached' };
      return canAllocate(nodeId, allocation);
    },
    [allocation, totalPoints],
  );

  const canRemove = useCallback(
    (nodeId: string) => {
      return canDeallocate(nodeId, allocation);
    },
    [allocation],
  );

  const resetSkills = useCallback(() => {
    setAllocation(defaultAllocation());
  }, [setAllocation]);

  const remainingPoints = MAX_TOTAL_POINTS - totalPoints;

  return {
    allocation,
    totalPoints,
    remainingPoints,
    addPoint,
    removePoint,
    canAdd,
    canRemove,
    resetSkills,
  };
}
