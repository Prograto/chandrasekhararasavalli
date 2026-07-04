/**
 * Static 2D echo of the 3D network scene — same composition, no motion
 * dependency. Used when the user prefers reduced motion, and as the error
 * boundary fallback if WebGL is unavailable.
 */
export function StaticNetworkGraph() {
  const nodes = [
    { x: 220, y: 140, r: 5, color: "#EDEFF1" },
    { x: 400, y: 300, r: 9, color: "#C9A24B" },
    { x: 560, y: 120, r: 5, color: "#5FD9C4" },
    { x: 540, y: 420, r: 5, color: "#5FD9C4" },
    { x: 230, y: 400, r: 5, color: "#EDEFF1" },
    { x: 400, y: 60, r: 4, color: "#8B93A0" },
  ];
  const edges: [number, number][] = [
    [1, 0],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
    [2, 3],
    [4, 0],
  ];

  return (
    <svg viewBox="0 0 780 480" className="h-full w-full" aria-hidden="true">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="#8B93A0"
          strokeOpacity={0.25}
          strokeWidth={1}
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill={n.color}
          className="animate-pulse"
          style={{ animationDuration: `${3 + i}s` }}
        />
      ))}
    </svg>
  );
}
