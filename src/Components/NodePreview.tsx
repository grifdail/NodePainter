import React from "react";
import { NodeDefinition } from "../Data/NodeDefinition";

export function NodePreview({ node, onClick }: { node: NodeDefinition; onClick: (node: NodeDefinition) => void }) {
  const Icon = node.icon;
  return (
    <button onClick={() => onClick(node)}>
      <div>{node.id}</div>
      {Icon != null ? <Icon></Icon> : null}
      <p>{node.description}</p>
    </button>
  );
}
