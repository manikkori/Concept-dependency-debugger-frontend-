import React, { useMemo } from "react";
import ReactFlow, { Background, Controls, MarkerType } from "reactflow";
import "reactflow/dist/style.css";

export default function ConceptGraphView({
  graphData,
  scores,
  rootCauseId,
  allMastered,
}) {
  // Memoize the computation of nodes and edges to optimize rendering performance
  const { nodes, edges } = useMemo(() => {
    if (!graphData || !graphData.concepts) return { nodes: [], edges: [] };

    const newNodes = [];
    const newEdges = [];

    // Initial vertical position for the first node
    let yPosition = 40;

    graphData.concepts.forEach((concept, index) => {
      // Node fills are self-contained functional indicators, never theme tokens.
      let backgroundColor = "#f8fafc";
      let borderColor = "#94a3b8";
      let fontColor = "#334155";

      const status = scores?.[concept.id]?.status;
      const isRootCause = !allMastered && rootCauseId === concept.id;
      const isAffected = status === "weak" && !isRootCause;

      // Apply dynamic styling based on the assessment scores.
      if (scores && scores[concept.id]) {
        if (status === "strong") {
          backgroundColor = "#dcfce7";
          borderColor = "#16a34a";
          fontColor = "#16a34a";
        }
        if (status === "borderline") {
          backgroundColor = "#fef9c3";
          borderColor = "#ca8a04";
          fontColor = "#ca8a04";
        }
        if (status === "weak") {
          backgroundColor = "#fee2e2";
          borderColor = "#dc2626";
          fontColor = "#dc2626";
        }
      }

      // Construct the node configuration ensuring high contrast and visibility
      // Tighter X coordinates (50 & 250) so they don't clip off mobile screens
      newNodes.push({
        id: concept.id,
        position: { x: index % 2 === 0 ? 50 : 250, y: yPosition },
        data: {
          label: (
            <div className="font-display flex flex-col items-center gap-1.5 leading-tight">
              <span>{concept.name}</span>
              {isRootCause && (
                <span className="rounded-full bg-red-600 px-2 py-0.5 text-[9px] font-bold tracking-wider text-white">
                  ROOT CAUSE
                </span>
              )}
              {isAffected && (
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-[9px] font-bold tracking-wider text-red-700">
                  AFFECTED
                </span>
              )}
            </div>
          ),
        },
        style: {
          background: backgroundColor,
          color: fontColor,
          border: isRootCause
            ? `3px solid ${borderColor}`
            : isAffected
              ? `2px dashed ${borderColor}`
              : `2px solid ${borderColor}`,
          padding: "16px 20px",
          borderRadius: "12px",
          fontFamily: '"JetBrains Mono", monospace',
          fontWeight: "700",
          fontSize: "12px",
          width: 180,
          textAlign: "center",
          boxShadow: isRootCause
            ? "0 8px 16px -4px rgba(239, 68, 68, 0.35)"
            : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        },
      });

      // Increment vertical offset for the next node in the sequence
      yPosition += 115;

      // Construct prerequisite connection arrows
      concept.prerequisites.forEach((prereq) => {
        newEdges.push({
          id: `edge-${prereq}-${concept.id}`,
          source: prereq,
          target: concept.id,
          animated: true,
          style: { stroke: "var(--text-muted)", strokeWidth: 2 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "var(--text-muted)",
          },
        });
      });
    });

    return { nodes: newNodes, edges: newEdges };
  }, [allMastered, graphData, scores, rootCauseId]);

  // Using absolute inset-0 forces ReactFlow to respect the parent container's dimensions on mobile
  return (
    <div className="absolute inset-0 w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.2 }}
      >
        <Background color="var(--border-hairline)" gap={20} size={1} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
