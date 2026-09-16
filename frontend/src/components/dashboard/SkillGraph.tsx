type NodeSpec = {
  id: string;
  label: string;
  x: number;
  y: number;
  accent?: boolean;
};

const nodes: NodeSpec[] = [
  { id: "react", label: "React", x: 280, y: 36, accent: true },
  { id: "frontend", label: "Frontend", x: 120, y: 140 },
  { id: "ledger", label: "LedgerLens", x: 440, y: 140, accent: true },
  { id: "node", label: "Node.js", x: 120, y: 250 },
  { id: "pg", label: "PostgreSQL", x: 440, y: 250 },
];

const edges: [string, string][] = [
  ["react", "frontend"],
  ["react", "ledger"],
  ["frontend", "node"],
  ["ledger", "pg"],
  ["node", "pg"],
];

export default function SkillGraph() {
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <div className="overflow-x-auto">
      <svg viewBox="0 0 560 320" className="h-[280px] w-full min-w-[420px]">
        {edges.map(([a, b]) => {
          const from = byId[a];
          const to = byId[b];
          return (
            <line
              key={`${a}-${b}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="#9E9E9E"
              strokeWidth="1.5"
              opacity="0.55"
            />
          );
        })}
        {nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r="28"
              fill={node.accent ? "#DA224B" : "#242424"}
              stroke={node.accent ? "#DA224B" : "#9E9E9E"}
              strokeWidth="1.5"
            />
            <text
              x={node.x}
              y={node.y + 48}
              textAnchor="middle"
              fill={node.accent ? "#E0E0E0" : "#9E9E9E"}
              fontSize="12"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
