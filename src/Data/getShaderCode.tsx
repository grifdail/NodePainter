import { NodeCollection, NodeData, TreeStore } from "../Hooks/useTree";
import { ExecutionContext } from "./createExecutionContext";

export function getShaderCode(shader: string, tree: TreeStore | null, context: ExecutionContext) {
  const flattenNode = buildDependencyList(`${shader}-end`, tree?.nodes as NodeCollection);

  const requirement = Array.from(
    new Set(
      flattenNode
        .map((nodeId: string) => {
          const node = tree?.nodes[nodeId] as NodeData;
          let type = tree?.getNodeTypeDefinition(node);
          while (type?.executeAs != null) {
            type = tree?.getNodeTypeDefinition(type.executeAs);
          }
          return type?.shaderRequirement;
        })
        .filter((item: string) => item != null)
    )
  );

  const code = flattenNode.map((nodeId: string) => {
    const node = tree?.nodes[nodeId] as NodeData;
    let type = tree?.getNodeTypeDefinition(node);
    while (type?.executeAs != null) {
      type = tree?.getNodeTypeDefinition(type.executeAs);
    }
    return type?.getShaderCode && type.getShaderCode(node, context);
  });
  return `precision highp float;

  // x,y coordinates, given from the vertex shader
  varying vec2 vTexCoord;

  // the canvas contents, given from filter()
  uniform sampler2D tex0;
  // other useful information from the canvas
  uniform vec2 texelSize;
  uniform vec2 canvasSize;
  // a custom variable from this sketch
  uniform float time;

  ${requirement.join("\n")}

  void main() {
    ${code.join("\n")}
  }`;
}
function buildDependencyList(start: string, nodes: NodeCollection) {
  const distances: { [key: string]: number } = { [start]: 0 };
  const walk = (nodeId: string, distance: number) => {
    const node = nodes[nodeId];
    if (distances[nodeId] === undefined || distances[nodeId] < distance || start === nodeId) {
      distances[nodeId] = distance;
      console.log(nodeId, node);
      Object.entries(node.dataInputs).forEach(([id, port]) => {
        if (port.hasConnection) {
          walk(port.connectedNode as string, distance + 1);
        }
      });
    }
  };
  walk(start, 0);
  return (Object.entries(distances) as any).toSorted(([, a]: [string, number], [, b]: [string, number]) => b - a).map(([id]: [string]) => id);
}
