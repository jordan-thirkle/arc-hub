import { useMemo, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
  type Node,
  type Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { skillNodes, getSkillNodeById } from '../data/skills';
import { canAllocate, canDeallocate } from '../utils/skills';
import { SkillGraphNode, type SkillGraphNodeData } from './SkillGraphNode';
import type { SkillAllocation } from '../utils/skills';

interface SkillGraphViewProps {
  allocation: SkillAllocation;
  totalPoints: number;
  remainingPoints: number;
  onAdd: (nodeId: string) => void;
  onRemove: (nodeId: string) => void;
}

const NODE_WIDTH = 180;
const NODE_HEIGHT = 100;
const COL_GAP = 30;
const ROW_GAP = 30;

const nodeTypes = { skillNode: SkillGraphNode };

export function SkillGraphView({ allocation, totalPoints, remainingPoints, onAdd, onRemove }: SkillGraphViewProps) {
  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    const nodes: Node<SkillGraphNodeData>[] = skillNodes.map(node => {
      const addCheck = canAllocate(node.id, allocation);
      const removeCheck = canDeallocate(node.id, allocation);
      return {
        id: node.id,
        type: 'skillNode',
        position: {
          x: node.gridPosition.col * (NODE_WIDTH + COL_GAP),
          y: node.gridPosition.row * (NODE_HEIGHT + ROW_GAP),
        },
        data: {
          nodeId: node.id,
          label: node.name,
          points: allocation[node.id] ?? 0,
          maxPoints: node.maxPoints,
          recommended: node.recommended,
          branch: node.branch,
          effectPerLevel: node.effectPerLevel,
          canAdd: addCheck.allowed,
          canRemove: removeCheck.allowed,
          onAdd,
          onRemove,
        },
      };
    });

    const edges: Edge[] = [];
    for (const node of skillNodes) {
      for (const prereqId of node.prerequisites) {
        const prereq = getSkillNodeById(prereqId);
        if (!prereq) continue;
        const hasPrereqPoints = (allocation[prereqId] ?? 0) > 0;
        edges.push({
          id: `${prereqId}->${node.id}`,
          source: prereqId,
          target: node.id,
          animated: hasPrereqPoints,
          style: {
            stroke: hasPrereqPoints ? '#E8A832' : '#4a5568',
            strokeWidth: hasPrereqPoints ? 2 : 1,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: hasPrereqPoints ? '#E8A832' : '#4a5568',
            width: 16,
            height: 16,
          },
        });
      }
    }

    return { nodes, edges };
  }, [allocation, onAdd, onRemove]);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      const data = node.data as SkillGraphNodeData;
      const allocated = allocation[data.nodeId] ?? 0;
      if (allocated > 0) {
        onRemove(data.nodeId);
      } else {
        onAdd(data.nodeId);
      }
    },
    [allocation, onAdd, onRemove],
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-[9px] font-mono text-tertiary">
          <span>
            Points: <span className="text-primary">{totalPoints}</span>/91
          </span>
          {remainingPoints > 0 && <span className="text-accent">{remainingPoints} remaining</span>}
        </div>
        <div className="flex items-center gap-2 text-[8px] text-tertiary">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ background: '#E8A832' }} /> Conditioning
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ background: '#4CAF50' }} /> Mobility
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ background: '#03A9F4' }} /> Survival
          </span>
        </div>
      </div>
      <div className="h-[600px] border border-[rgb(var(--border-primary))]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          colorMode="dark"
          onNodeClick={onNodeClick}
          fitView
          minZoom={0.3}
          maxZoom={2}
          panOnDrag
          selectionOnDrag={false}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={true}
        >
          <Background color="#2d3748" gap={20} />
          <Controls
            showInteractive={false}
            className="[&_button]:!bg-surface [&_button]:!border-[rgb(var(--border-primary))] [&_button]:!text-primary"
          />
          <MiniMap
            nodeColor={n => {
              const d = n.data as SkillGraphNodeData;
              if (!d) return '#1a202c';
              return (allocation[d.nodeId] ?? 0) > 0 ? '#E8A832' : '#2d3748';
            }}
            maskColor="rgba(0,0,0,0.7)"
            className="!border !border-[rgb(var(--border-primary))]"
          />
        </ReactFlow>
      </div>
    </div>
  );
}
