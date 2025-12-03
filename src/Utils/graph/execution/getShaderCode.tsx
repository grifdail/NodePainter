import { typeOf } from "mathjs";
import { NodeCollection } from "../../../Types/NodeCollection";
import { TreeStore } from "../../../Types/TreeStore";
import { PortConnection } from "../../../Types/PortConnection";
import { NodeData } from "../../../Types/NodeData";
import { ExecutionContext } from "./createExecutionContext";
import { sanitizeForShader } from "./sanitizeForShader";
import { PortTypeDefinitions } from "../../../Types/PortTypeDefinitions";
import { PortType } from "../../../Types/PortType";
import { SketchSave } from "../../../Types/SketchTemplate";
import { getNodeTypeDefinition } from "./getNode";
import { SketchData } from "../../../Types/SketchData";

export function getImageEffectShaderCode(shader: string, ports: PortConnection[], tree: SketchData, context: ExecutionContext) {
  const flattenNode = buildDependencyList(`${shader}-end`, tree?.nodes as NodeCollection);
  const requirement = buildRequirement(flattenNode, tree);
  const code = buildCode(flattenNode, tree, context);
  const result = `precision highp float;

  // x,y coordinates, given from the vertex shader
  varying vec2 vTexCoord;

  // the canvas contents, given from filter()
  uniform sampler2D tex0;
  // other useful information from the canvas
  uniform vec2 texelSize;
  uniform vec2 canvasSize;
  // a custom variable from this sketch
  uniform float time;

  ${ports.map((port) => `uniform ${getShaderType(port.type)} ${sanitizeForShader(`uniform_${port.id}`)};`).join("\n")}

  ${requirement.join("\n\n")}

  void main() {
    ${code.join("\n")}
  }`;

  console.log(result);
  return result;
}

export function buildRequirement(flattenNode: any, tree: SketchData) {
  return Array.from(
    new Set(
      flattenNode
        .flatMap((nodeId: string) => {
          const node = tree?.nodes[nodeId] as NodeData;
          let type = getNodeTypeDefinition(tree, node);
          while (type?.executeAs != null) {
            type = getNodeTypeDefinition(tree, type.executeAs);
          }
          var requirement = type?.shaderRequirement;
          if (requirement === undefined || requirement === null) {
            return [];
          }
          if (typeOf(requirement) === "string") {
            return [requirement];
          }
          return requirement;
        })
        .filter((item: string) => item != null)
    )
  );
}

export function buildCode(flattenNode: any, tree: SketchData, context: ExecutionContext) {
  return flattenNode.map((nodeId: string) => {
    const node = tree?.nodes[nodeId] as NodeData;
    let type = getNodeTypeDefinition(tree, node);
    while (type?.executeAs != null) {
      type = getNodeTypeDefinition(tree, type.executeAs);
    }
    return type?.getShaderCode && type.getShaderCode(node, context);
  });
}

export function buildDependencyList(start: string, nodes: NodeCollection) {
  const distances: { [key: string]: number } = { [start]: 0 };
  const walk = (nodeId: string, distance: number) => {
    const node = nodes[nodeId];
    if (distances[nodeId] === undefined || distances[nodeId] < distance || start === nodeId) {
      distances[nodeId] = distance;
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
export function getShaderType(type: PortType) {
  return PortTypeDefinitions[type].convertToShaderType;
}
