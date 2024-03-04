import { P5CanvasInstance } from "@p5-wrapper/react";
import { NodeCollection, NodeData, TreeStore } from "../Hooks/useTree";
import { Color, Graphics } from "p5";
import { getShaderCode } from "./getShaderCode";
import { convertToShaderValue } from "./convertToShaderValue";

export type ExecutionContext = {
  getShaderVar(nodeData: NodeData, portId: string, isOutput?: boolean): string;
  getShaderCode(shader: string): string;
  findNodeOfType(type: string): string | null;
  createFunctionContext(node: NodeData, context: ExecutionContext): { [key: string]: any };
  functionStack: Array<{ [key: string]: any }>;
  time: number;
  target: Graphics;
  blackboard: { [key: string]: any };
  frameBlackboard: { [key: string]: any };
  getNodeOutput: (nodeId: string, portId: string) => any;
  p5: P5CanvasInstance;
  execute: (nodeId: string) => void;
  getInputValue: (nodeData: NodeData, portId: string) => any;
};

export function createExecutionContext(tree: TreeStore | null, p5: P5CanvasInstance): ExecutionContext {
  var context: ExecutionContext = {
    p5: p5 as P5CanvasInstance,
    time: 0,
    blackboard: {},
    target: p5 as Graphics,
    frameBlackboard: {},
    functionStack: [],
    execute(nodeId) {
      var node = tree?.nodes[nodeId];
      if (node != null) {
        let def = tree?.getNodeTypeDefinition(node);
        if (def) {
          if (def.executeAs) {
            def = tree?.getNodeTypeDefinition(def.executeAs);
          }
          if (def?.execute) {
            def.execute(node, context);
          }
        } else {
          throw new Error("Trying to execute a node of unknow type");
        }
      }
    },

    getNodeOutput(nodeId, portId) {
      return tree?.getPortValue(nodeId, portId, context);
    },
    getInputValue(nodeData: NodeData, portId: string) {
      const inputPorts = nodeData.dataInputs[portId];
      if (inputPorts.hasConnection) {
        return context.getNodeOutput(inputPorts.connectedNode as string, inputPorts.connectedPort as string);
      } else {
        return inputPorts.ownValue;
      }
    },
    getShaderVar(nodeData, portId, isOutput = false) {
      const inputPorts = nodeData.dataInputs[portId];
      if (!inputPorts || isOutput) {
        return `${cleanVar(nodeData.id)}_${cleanVar(portId)}`;
      }
      if (inputPorts.hasConnection) {
        return `${cleanVar(inputPorts.connectedNode)}_${cleanVar(inputPorts.connectedPort)}`;
      } else {
        return convertToShaderValue(inputPorts.ownValue, inputPorts.type);
      }
    },
    createFunctionContext(node: NodeData, context: ExecutionContext) {
      return Object.fromEntries(
        Object.keys(node.dataInputs).map((key) => {
          return [key, context.getInputValue(node, key)];
        })
      );
    },
    findNodeOfType(type) {
      const nodes = tree?.nodes as NodeCollection;
      for (let key in nodes) {
        if (nodes[key].type === type) {
          return key;
        }
      }
      return null;
    },
    getShaderCode(shader) {
      return getShaderCode(shader, tree, context);
    },
  };
  return context;
}

var cleanVar = function (str: string | null) {
  return str?.replaceAll("-", "_");
};
