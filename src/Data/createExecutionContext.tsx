import { P5CanvasInstance } from "@p5-wrapper/react";
import { NodeCollection, NodeData, PortConnection, TreeStore } from "../Hooks/useTree";
import { Graphics } from "p5";
import { getShaderCode } from "./getShaderCode";
import { convertToShaderValue } from "./convertToShaderValue";
import { PortType } from "./NodeDefinition";
import { convertTypeValue } from "./convertTypeValue";
import { Vector2 } from "@use-gesture/react";
import { ImageData } from "./ImageData";
import { Color, Gradient, Vector, Vector3, Vector4 } from "./vectorDataType";
import { convertShaderType } from "./convertTypeValue";

export type ExecutionContext = {
  getShaderVar(nodeData: NodeData, portId: string, type: PortType, isOutput?: boolean): string;
  getShaderCode(shader: string, uniforms: PortConnection[]): string;
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
  _getInputValue: <T>(nodeData: NodeData, portId: string, outputValue: PortType) => T;
  getInputValueVector: (nodeData: NodeData, portId: string) => Vector;
  getInputValueVector2: (nodeData: NodeData, portId: string) => Vector2;
  getInputValueVector3: (nodeData: NodeData, portId: string) => Vector3;
  getInputValueVector4: (nodeData: NodeData, portId: string) => Vector4;
  getInputValueNumber: (nodeData: NodeData, portId: string) => number;
  getInputValueColor: (nodeData: NodeData, portId: string) => Color;
  getInputValueGradient: (nodeData: NodeData, portId: string) => Gradient;
  getInputValueImage: (nodeData: NodeData, portId: string) => null | ImageData;
  getInputValueString: (nodeData: NodeData, portId: string) => string;
  getInputValueBoolean: (nodeData: NodeData, portId: string) => boolean;
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
    _getInputValue<T>(nodeData: NodeData, portId: string, outputType: PortType = "unknown") {
      const inputPorts = nodeData.dataInputs[portId];
      let item: [any, PortType] = [null, "unknown"];
      if (inputPorts.hasConnection) {
        item = context.getNodeOutput(inputPorts.connectedNode as string, inputPorts.connectedPort as string);
      } else {
        item = [inputPorts.ownValue, inputPorts.type];
      }
      return convertTypeValue(item[0], item[1], outputType) as T;
    },
    getInputValueVector: (nodeData: NodeData, portId: string) => context._getInputValue(nodeData, portId, "vector") as Vector,
    getInputValueVector2: (nodeData: NodeData, portId: string) => context._getInputValue(nodeData, portId, "vector2") as Vector2,
    getInputValueVector3: (nodeData: NodeData, portId: string) => context._getInputValue(nodeData, portId, "vector3") as Vector3,
    getInputValueVector4: (nodeData: NodeData, portId: string) => context._getInputValue(nodeData, portId, "vector4") as Vector4,
    getInputValueNumber: (nodeData: NodeData, portId: string) => context._getInputValue(nodeData, portId, "number") as number,
    getInputValueColor: (nodeData: NodeData, portId: string) => context._getInputValue(nodeData, portId, "color") as Color,
    getInputValueGradient: (nodeData: NodeData, portId: string) => context._getInputValue(nodeData, portId, "gradient") as Gradient,
    getInputValueImage: (nodeData: NodeData, portId: string) => context._getInputValue(nodeData, portId, "image") as ImageData,
    getInputValueString: (nodeData: NodeData, portId: string) => context._getInputValue(nodeData, portId, "string") as string,
    getInputValueBoolean: (nodeData: NodeData, portId: string) => context._getInputValue(nodeData, portId, "bool") as boolean,
    getShaderVar(nodeData, portId, type: PortType, isOutput = false) {
      const inputPorts = nodeData.dataInputs[portId];
      if (!inputPorts || isOutput) {
        return `${cleanNameForShader(nodeData.id)}_${cleanNameForShader(portId)}`;
      }
      if (inputPorts.hasConnection) {
        var outPort = tree?.getOutputPort(inputPorts.connectedNode as string, inputPorts.connectedPort as string);
        return convertShaderType(`${cleanNameForShader(inputPorts.connectedNode)}_${cleanNameForShader(inputPorts.connectedPort)}`, outPort?.type as PortType, inputPorts.type);
      } else {
        return convertToShaderValue(inputPorts.ownValue, inputPorts.type);
      }
    },
    createFunctionContext(node: NodeData, context: ExecutionContext) {
      return Object.fromEntries(
        Object.keys(node.dataInputs).map((key) => {
          return [key, context._getInputValue(node, key, node.dataInputs[key].type)];
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
    getShaderCode(shader, ports) {
      return getShaderCode(shader, ports, tree, context);
    },
  };
  return context;
}

export const cleanNameForShader = function (str: string | null) {
  return str?.replaceAll("-", "_").replaceAll("__", "_");
};
