import { skillNodes, getNodesByBranch } from '../data/skills';
import type { SkillAllocation } from '../utils/skills';
import { canAllocate, canDeallocate } from '../utils/skills';
import type { SkillBranch } from '../types';

interface SkillTreeViewerProps {
  allocation: SkillAllocation;
  totalPoints: number;
  remainingPoints: number;
  onAdd: (nodeId: string) => void;
  onRemove: (nodeId: string) => void;
}

const BRANCH_LABELS: Record<SkillBranch, string> = {
  Conditioning: 'Conditioning',
  Mobility: 'Mobility',
  Survival: 'Survival',
};

const BRANCH_COLORS: Record<SkillBranch, string> = {
  Conditioning: '#E8A832',
  Mobility: '#4CAF50',
  Survival: '#03A9F4',
};

function SkillNodeCard({
  nodeId,
  points,
  allocation,
  onAdd,
  onRemove,
}: {
  nodeId: string;
  points: number;
  allocation: SkillAllocation;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  const node = skillNodes.find(n => n.id === nodeId);
  if (!node) return null;

  const canAdd = canAllocate(nodeId, allocation).allowed;
  const canRemove = canDeallocate(nodeId, allocation).allowed;
  const hasPoints = points > 0;

  return (
    <div
      className={`border p-2 rounded-md transition-all duration-200 ${
        hasPoints
          ? 'border-accent/50 bg-[rgb(var(--bg-elevated))] shadow-glow-accent'
          : 'border-[rgb(var(--border-primary))] bg-surface hover:border-tertiary hover:shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-semibold text-primary truncate">{node.name}</span>
        <span
          className={`text-[8px] font-mono px-1 ${
            node.recommended === 'S' ? 'text-accent' : node.recommended === 'F' ? 'text-danger' : 'text-tertiary'
          }`}
        >
          {node.recommended}
        </span>
      </div>
      <p className="text-[8px] text-tertiary mb-1.5 leading-tight">{node.effectPerLevel}</p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onRemove(nodeId)}
          disabled={!canRemove}
          className="w-5 h-5 flex items-center justify-center text-[10px] border border-[rgb(var(--border-primary))] rounded-sm text-tertiary disabled:opacity-30 hover:bg-[rgb(var(--bg-elevated))] transition-all active:scale-[0.9]"
          aria-label={`Remove point from ${node.name}`}
        >
          -
        </button>
        <div className="flex-1 flex gap-0.5">
          {Array.from({ length: node.maxPoints }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1.5 rounded-sm ${i < points ? 'bg-accent' : 'bg-[rgb(var(--stat-bar-bg))]'}`}
            />
          ))}
        </div>
        <button
          onClick={() => onAdd(nodeId)}
          disabled={!canAdd}
          className="w-5 h-5 flex items-center justify-center text-[10px] border border-[rgb(var(--border-primary))] rounded-sm text-tertiary disabled:opacity-30 hover:bg-[rgb(var(--bg-elevated))] transition-all active:scale-[0.9]"
          aria-label={`Add point to ${node.name}`}
        >
          +
        </button>
      </div>
      <p className="text-[8px] font-mono text-tertiary mt-1">
        {points}/{node.maxPoints}
      </p>
    </div>
  );
}

export function SkillTreeViewer({ allocation, totalPoints, remainingPoints, onAdd, onRemove }: SkillTreeViewerProps) {
  const branches: SkillBranch[] = ['Conditioning', 'Mobility', 'Survival'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-secondary font-semibold">Skill Tree</h2>
        <div className="text-[10px] font-mono">
          <span className="text-primary">{totalPoints}</span>
          <span className="text-tertiary"> / 91 points</span>
          {remainingPoints > 0 && <span className="text-accent ml-2">({remainingPoints} remaining)</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {branches.map(branch => {
          const nodes = getNodesByBranch(branch).sort(
            (a, b) => a.gridPosition.row - b.gridPosition.row || a.gridPosition.col - b.gridPosition.col,
          );
          return (
            <div key={branch} className="space-y-2">
              <h3
                className="text-[10px] font-mono uppercase tracking-[0.1em] flex items-center gap-2"
                style={{ color: BRANCH_COLORS[branch] }}
              >
                <span className="w-2 h-2 inline-block" style={{ backgroundColor: BRANCH_COLORS[branch] }} />
                {BRANCH_LABELS[branch]}
              </h3>
              <div className="space-y-1.5">
                {nodes.map(node => (
                  <SkillNodeCard
                    key={node.id}
                    nodeId={node.id}
                    points={allocation[node.id] ?? 0}
                    allocation={allocation}
                    onAdd={onAdd}
                    onRemove={onRemove}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
