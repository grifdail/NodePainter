import Ajv, { JSONSchemaType } from "ajv";
import schemaJSON from "../../../schema/Snippet.json";
import { NodeData } from "../../../Types/NodeData";
import { TreeStore } from "../../../Types/TreeStore";
import { Vector2 } from "../../../Types/vectorDataType";
import { buildBoundingBox } from "../../ui/buildBoundingBox";
import { duplicateNode } from "./duplicateNode";

const ajv = new Ajv({ meta: false, validateSchema: false, strictRequired: true, strict: true });

export type Snippet = {
  nodes: NodeData[];
  offset: Vector2;
  name: string;
};

export type SnippetCollection = {
  [key: string]: Snippet;
};

export const validateSnipetJson = ajv.compile(schemaJSON as any as JSONSchemaType<Snippet>);

export function loadSnippet(snippet: Snippet, tree: TreeStore, pos: Vector2) {
  const nodeMapping: Record<string, string> = {};
  snippet.nodes
    .map((sourceNode) => {
      const newNode = duplicateNode(tree, sourceNode, sourceNode.positionX - snippet.offset[0] + pos[0], sourceNode.positionY - snippet.offset[1] + pos[1], sourceNode.graph as string);
      tree.nodes[newNode.id] = newNode;
      nodeMapping[sourceNode.id] = newNode.id;
      return newNode;
    })
    .map((newNode) => {
      Object.values(newNode.dataInputs).forEach((connection) => {
        if (connection.hasConnection && connection.connectedNode !== null) {
          if (nodeMapping[connection.connectedNode] !== undefined) {
            connection.connectedNode = nodeMapping[connection.connectedNode];
          } else {
            connection.connectedNode = null;
            connection.connectedPort = null;
            connection.hasConnection = false;
          }
        }
      });
    });
  return nodeMapping;
}

export function extractSnipet(name: string, nodeIds: string[], tree: TreeStore): Snippet {
  var { bb, nodes } = buildBoundingBox(nodeIds, tree);
  return {
    nodes: nodes.map((node) => structuredClone(node.node)),
    offset: bb.center(),
    name: name,
  };
}

export function validateSnipet(nodeIds: string[], tree: TreeStore) {
  return nodeIds
    .map((node) => {
      const n = tree.getNode(node);
      return [n, tree.getNodeTypeDefinition(n)] as const;
    })
    .every(([node, def]) => {
      if (def.IsUnique) {
        return false;
      }
      if (node.pairedNode && !nodeIds.includes(node.pairedNode)) {
        return false;
      }
      if (def.executeAs) {
        return false;
      }
      return true;
    });
}
