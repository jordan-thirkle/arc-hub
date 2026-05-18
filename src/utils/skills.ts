import { skillNodes, getSkillNodeById } from '../data/skills';
import type { SkillNode, SkillBranch } from '../types';

export type SkillAllocation = Record<string, number>;

export function getTotalPoints(allocation: SkillAllocation): number {
  return Object.values(allocation).reduce((sum, pts) => sum + pts, 0);
}

export function getAllocatedNodes(allocation: SkillAllocation): SkillNode[] {
  return Object.entries(allocation)
    .filter(([, pts]) => pts > 0)
    .map(([id]) => getSkillNodeById(id))
    .filter(Boolean) as SkillNode[];
}

export function getPointsInBranch(allocation: SkillAllocation, branch: SkillBranch): number {
  return Object.entries(allocation)
    .filter(([id]) => {
      const node = getSkillNodeById(id);
      return node?.branch === branch;
    })
    .reduce((sum, [, pts]) => sum + pts, 0);
}

export function canAllocate(nodeId: string, allocation: SkillAllocation): { allowed: boolean; reason?: string } {
  const node = getSkillNodeById(nodeId);
  if (!node) return { allowed: false, reason: 'Unknown node' };

  const current = allocation[nodeId] ?? 0;
  if (current >= node.maxPoints) return { allowed: false, reason: 'Max points reached' };

  for (const prereqId of node.prerequisites) {
    const prereqPts = allocation[prereqId] ?? 0;
    if (prereqPts === 0) {
      const prereq = getSkillNodeById(prereqId);
      return { allowed: false, reason: `Requires "${prereq?.name ?? prereqId}"` };
    }
  }

  return { allowed: true };
}

export function canDeallocate(nodeId: string, allocation: SkillAllocation): { allowed: boolean; reason?: string } {
  const current = allocation[nodeId] ?? 0;
  if (current === 0) return { allowed: false, reason: 'No points to remove' };

  const dependentNodes = skillNodes.filter(n =>
    n.prerequisites.includes(nodeId) && (allocation[n.id] ?? 0) > 0
  );

  if (dependentNodes.length > 0) {
    return {
      allowed: false,
      reason: `"${dependentNodes[0].name}" depends on this`,
    };
  }

  return { allowed: true };
}

export function allocatePoint(nodeId: string, allocation: SkillAllocation): SkillAllocation {
  const check = canAllocate(nodeId, allocation);
  if (!check.allowed) return allocation;
  return { ...allocation, [nodeId]: (allocation[nodeId] ?? 0) + 1 };
}

export function deallocatePoint(nodeId: string, allocation: SkillAllocation): SkillAllocation {
  const check = canDeallocate(nodeId, allocation);
  if (!check.allowed) return allocation;
  const next = { ...allocation, [nodeId]: (allocation[nodeId] ?? 0) - 1 };
  if (next[nodeId] <= 0) delete next[nodeId];
  return next;
}

export function getRecommendedAllocation(): SkillAllocation {
  const recommended: SkillAllocation = {};
  for (const node of skillNodes) {
    if (node.recommended === 'S') {
      recommended[node.id] = node.maxPoints;
    } else if (node.recommended === 'A') {
      recommended[node.id] = Math.min(3, node.maxPoints);
    }
  }
  return recommended;
}

export function defaultAllocation(): SkillAllocation {
  return {};
}
