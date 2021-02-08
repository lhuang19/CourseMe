/**
 * 
 * Various types for graph visualization
 * 
 */

type NodeInfo = {
  id: string;
  label: string;
  color?: string;
  shape?: string;
  title: string;
  group?: string;
  borderWidth?: number;
  level?: number;
};

type EdgeInfo = {
  from: string;
  to: string;
  color?: string;
  title?: string;
};

type GraphInfo = {
  nodes: NodeInfo[];
  edges: EdgeInfo[];
};

export type {
  NodeInfo,
  EdgeInfo,
  GraphInfo
}

