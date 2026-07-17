import React, { useMemo } from "react";
import ReactFlow, { Background, Controls, MarkerType } from "reactflow";
import "reactflow/dist/style.css";

export default function ConceptGraphView({ graphData, scores }) {
  // Memoize the computation of nodes and edges to optimize rendering performance
  const { nodes, edges } = useMemo(() => {
    if (!graphData || !graphData.concepts) return { nodes: [], edges: [] };

    const newNodes = [];
    const newEdges = [];

    // Initial vertical position for the first node
    let yPosition = 40;

    graphData.concepts.forEach((concept, index) => {
      // Base styling for unassessed topics using solid hex colors
      let backgroundColor = "#ffffff";
      let borderColor = "#cbd5e1";
      let fontColor = "#334155";

      // Apply dynamic solid styling based on the assessment scores
      if (scores && scores[concept.id]) {
        const status = scores[concept.id].status;
        if (status === "strong") {
          backgroundColor = "#dcfce3"; // Solid Light Green
          borderColor = "#22c55e";
          fontColor = "#166534";
        }
        if (status === "weak") {
          backgroundColor = "#fee2e2"; // Solid Light Red
          borderColor = "#ef4444";
          fontColor = "#991b1b";
        }
      }

      // Construct the node configuration ensuring high contrast and visibility
      newNodes.push({
        id: concept.id,
        position: { x: index % 2 === 0 ? 80 : 300, y: yPosition },
        data: { label: concept.name },
        style: {
          background: backgroundColor,
          color: fontColor,
          border: `2px solid ${borderColor}`,
          padding: "16px 20px",
          borderRadius: "12px",
          fontWeight: "800",
          fontSize: "14px",
          width: 190,
          textAlign: "center",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
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
          style: { stroke: "#94a3b8", strokeWidth: 2 },
          markerEnd: { type: MarkerType.ArrowClosed, color: "#94a3b8" },
        });
      });
    });

    return { nodes: newNodes, edges: newEdges };
  }, [graphData, scores]);

  return (
    <div className="w-full h-full min-h-[450px]">
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background color="#cbd5e1" gap={20} size={1} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
