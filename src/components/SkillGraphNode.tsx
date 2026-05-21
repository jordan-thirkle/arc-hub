import { memo } from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import type { SkillBranch } from '../types';

export type SkillGraphNodeData = {
  nodeId: string;
  label: string;
  points: number;
  maxPoints: number;
  recommended: string;
  branch: SkillBranch;
  effectPerLevel: string;
  canAdd: boolean;
  canRemove: boolean;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
};

const BRANCH_COLORS: Record<SkillBranch, string> = {
  Conditioning: '#E8A832',
  Mobility: '#4CAF50',
  Survival: '#03A9F4',
};

type SkillGraphNodeProps = NodeProps<Node<SkillGraphNodeData>>;

export const SkillGraphNode = memo(({ data, selected }: SkillGraphNodeProps) => {
  const hasPoints = data.points > 0;
  const branchColor = BRANCH_COLORS[data.branch] || '#666';

  return (
    <div
      className={`border-2 transition-all min-w-[160px] ${
        selected ? 'border-accent shadow-lg shadow-accent/20' : 'border-[rgb(var(--border-primary))]'
      } ${hasPoints ? 'bg-[rgb(var(--bg-elevated))]' : 'bg-surface'}`}
      style={{
        borderLeftColor: branchColor,
        borderLeftWidth: 3,
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: branchColor, width: 8, height: 8, border: '2px solid #0A0E14' }}
      />

      <div className="px-2.5 py-1.5">
        <div className="flex items-center justify-between gap-1 mb-0.5">
          <span className="text-[10px] font-semibold text-primary truncate leading-tight">{data.label}</span>
          <span
            className={`text-[7px] font-mono px-1 py-[1px] leading-none ${
              data.recommended === 'S'
                ? 'text-accent bg-accent/10'
                : data.recommended === 'F'
                  ? 'text-danger bg-danger/10'
                  : 'text-tertiary'
            }`}
          >
            {data.recommended}
          </span>
        </div>
        <p className="text-[7px] text-tertiary leading-tight mb-1">{data.effectPerLevel}</p>
        <div className="flex gap-0.5 mb-1">
          {Array.from({ length: data.maxPoints }).map((_, i) => (
            <div key={i} className={`flex-1 h-1 ${i < data.points ? 'bg-accent' : 'bg-[rgb(var(--stat-bar-bg))]'}`} />
          ))}
        </div>
        <div className="flex items-center justify-between gap-1">
          <button
            onClick={e => {
              e.stopPropagation();
              data.onRemove(data.nodeId);
            }}
            disabled={!data.canRemove}
            className="w-4 h-4 flex items-center justify-center text-[8px] border border-[rgb(var(--border-primary))] text-tertiary disabled:opacity-30 hover:bg-[rgb(var(--bg-elevated))] transition-all leading-none"
          >
            -
          </button>
          <span className="text-[8px] font-mono text-tertiary">
            {data.points}/{data.maxPoints}
          </span>
          <button
            onClick={e => {
              e.stopPropagation();
              data.onAdd(data.nodeId);
            }}
            disabled={!data.canAdd}
            className="w-4 h-4 flex items-center justify-center text-[8px] border border-[rgb(var(--border-primary))] text-tertiary disabled:opacity-30 hover:bg-[rgb(var(--bg-elevated))] transition-all leading-none"
          >
            +
          </button>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: branchColor, width: 8, height: 8, border: '2px solid #0A0E14' }}
      />
    </div>
  );
});
