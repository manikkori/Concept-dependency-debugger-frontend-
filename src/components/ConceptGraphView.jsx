import React, { useMemo } from "react";
import ReactFlow, { Background, Controls, MarkerType } from "reactflow";
import "reactflow/dist/style.css";

export default function ConceptGraphView({ graphData, scores }) {
  const { nodes, edges } = useMemo(() => {
    if (!graphData || !graphData.concepts) return { nodes: [], edges: [] };

    const newNodes = [];
    const newEdges = [];

    // Staggered layout coordinates
    let y = 50;

    graphData.concepts.forEach((concept, index) => {
      // Default colors (Gray)
      let bgColor = "#f8fafc";
      let borderColor = "#94a3b8";

      // Update colors based on engine scores
      if (scores && scores[concept.id]) {
        const status = scores[concept.id].status;
        if (status === "strong") {
          bgColor = "#dcfce3";
          borderColor = "#16a34a";
        } // Green for mastery
        if (status === "weak") {
          bgColor = "#fee2e2";
          borderColor = "#dc2626";
        } // Red for weak point
      }

      newNodes.push({
        id: concept.id,
        position: { x: index % 2 === 0 ? 150 : 350, y: y }, // Zig-zag pattern
        data: { label: concept.name },
        style: {
          background: bgColor,
          border: `2px solid ${borderColor}`,
          padding: "12px",
          borderRadius: "8px",
          fontWeight: "bold",
          width: 180,
          textAlign: "center",
        },
      });
      y += 100; // Push next node down

      // Create arrows for prerequisites
      concept.prerequisites.forEach((prereq) => {
        newEdges.push({
          id: `e-${prereq}-${concept.id}`,
          source: prereq,
          target: concept.id,
          animated: true,
          style: { stroke: "#475569", strokeWidth: 2 },
          markerEnd: { type: MarkerType.ArrowClosed, color: "#475569" },
        });
      });
    });

    return { nodes: newNodes, edges: newEdges };
  }, [graphData, scores]);

  return (
    <div className="w-full h-full min-h-[500px]">
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background color="#cbd5e1" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
