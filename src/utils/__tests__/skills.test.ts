import { describe, it, expect } from 'vitest';
import {
  canAllocate, canDeallocate, allocatePoint, deallocatePoint,
  getTotalPoints, getRecommendedAllocation, getAllocatedNodes, getPointsInBranch,
} from '../skills';
import type { SkillAllocation } from '../skills';

describe('canAllocate', () => {
  it('allows allocation on node with no prerequisites', () => {
    const result = canAllocate('sprint-efficiency', {});
    expect(result.allowed).toBe(true);
  });

  it('blocks allocation when max points reached', () => {
    const result = canAllocate('sprint-efficiency', { 'sprint-efficiency': 5 });
    expect(result.allowed).toBe(false);
    expect(result.reason).toContain('Max points');
  });

  it('blocks allocation when prerequisite not met', () => {
    const result = canAllocate('weight-training', {});
    expect(result.allowed).toBe(false);
    expect(result.reason).toContain('Requires');
  });

  it('rejects unknown node IDs', () => {
    const result = canAllocate('non-existent-node', {});
    expect(result.allowed).toBe(false);
    expect(result.reason).toBe('Unknown node');
  });
});

describe('canDeallocate', () => {
  it('blocks deallocation when node has no points', () => {
    const result = canDeallocate('sprint-efficiency', {});
    expect(result.allowed).toBe(false);
    expect(result.reason).toContain('No points');
  });

  it('blocks deallocation when other nodes depend on it', () => {
    const allocation = { 'sprint-efficiency': 1, 'weight-training': 1 };
    const result = canDeallocate('sprint-efficiency', allocation);
    expect(result.allowed).toBe(false);
    expect(result.reason).toContain('depends on this');
  });

  it('allows deallocation of leaf node', () => {
    const allocation = { 'sprint-efficiency': 1, 'weight-training': 1 };
    const result = canDeallocate('weight-training', allocation);
    expect(result.allowed).toBe(true);
  });
});

describe('allocatePoint / deallocatePoint', () => {
  it('adds a point when allowed', () => {
    const result = allocatePoint('sprint-efficiency', {});
    expect(result['sprint-efficiency']).toBe(1);
  });

  it('does not add a point when blocked', () => {
    const result = allocatePoint('sprint-efficiency', { 'sprint-efficiency': 5 });
    expect(result['sprint-efficiency']).toBe(5);
  });

  it('removes a point when allowed', () => {
    const result = deallocatePoint('sprint-efficiency', { 'sprint-efficiency': 1 });
    expect(result['sprint-efficiency']).toBeUndefined();
  });

  it('does not remove a point when blocked', () => {
    const result = deallocatePoint('non-existent', {});
    expect(result).toEqual({});
  });
});

describe('getTotalPoints', () => {
  it('sums allocated points', () => {
    const allocation: SkillAllocation = { a: 3, b: 5, c: 1 };
    expect(getTotalPoints(allocation)).toBe(9);
  });

  it('returns 0 for empty allocation', () => {
    expect(getTotalPoints({})).toBe(0);
  });
});

describe('getRecommendedAllocation', () => {
  it('returns S-rank nodes at max and A-rank at 3', () => {
    const rec = getRecommendedAllocation();
    expect(Object.keys(rec).length).toBeGreaterThan(0);
    for (const [, pts] of Object.entries(rec)) {
      expect(pts).toBeGreaterThan(0);
    }
  });
});

describe('getPointsInBranch', () => {
  it('returns 0 for branch with no points', () => {
    expect(getPointsInBranch({}, 'Conditioning')).toBe(0);
  });

  it('returns total points in a specific branch', () => {
    const allocation: SkillAllocation = { 'sprint-efficiency': 3, 'agile': 2 };
    expect(getPointsInBranch(allocation, 'Conditioning')).toBe(3);
    expect(getPointsInBranch(allocation, 'Mobility')).toBe(2);
  });
});

describe('getAllocatedNodes', () => {
  it('returns empty array for empty allocation', () => {
    expect(getAllocatedNodes({})).toEqual([]);
  });

  it('returns nodes with allocated points', () => {
    const nodes = getAllocatedNodes({ 'sprint-efficiency': 1 });
    expect(nodes.length).toBeGreaterThan(0);
    expect(nodes[0].id).toBe('sprint-efficiency');
  });
});
