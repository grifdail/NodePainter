import { P5CanvasInstance } from "@p5-wrapper/react";
import { NodeCollection } from "../Types/NodeCollection";
import { TreeStore } from "../Types/TreeStore";
import { PortConnection } from "../Types/PortConnection";
import { NodeData } from "../Types/NodeData";
import p5, { Graphics } from "p5";
import { getShaderCode } from "./getShaderCode";
import { PortTypeDefinitions } from "../Types/PortTypeDefinitions";
import { convertTypeValue } from "./convertTypeValue";
import { Vector2 } from "@use-gesture/react";
import { ImageData } from "../Types/ImageData";
import { Color, Gradient, Quaternion, Vector, Vector3, Vector4 } from "../Types/vectorDataType";
import { convertShaderType } from "./convertTypeValue";
import { sanitizeForShader } from "./sanitizeForShader";
import { MaterialData, MeshData } from "../Types/MaterialData";
import { NodeDefinition } from "../Types/NodeDefinition";
import Rand from "rand-seed";
import { PortType } from "../Types/PortType";
import { OutputPortView } from "../Components/Graph/OutputPortView";

export type FunctionContext = {
  [key: string]: { type: PortType; value: any };
};

export type ExecutionContext = {
  deltaTime: number;
  getShaderVar(nodeData: NodeData, portId: string, type: PortType, isOutput?: boolean): string;
  getShaderCode(shader: string, uniforms: PortConnection[]): string;
  findNodeOfType(type: string): NodeData | null;
  getNodeDefinition: (type: string) => NodeDefinition | undefined;
  createFunctionContext(node: NodeData): FunctionContext;
  functionStack: Array<FunctionContext>;
  time: number;
  target: Graphics;
  lastVisitedNode: string;
  blackboard: { [key: string]: any };
  callCounts: { [key: string]: number };
  frameBlackboard: { [key: string]: any };
  getNodeOutput: (nodeId: string, portId: string) => any;
  p5: P5CanvasInstance;
  RNG: Rand;
  getInputValue: <T>(nodeData: NodeData, portId: string, outputValue: PortType) => T;
  getInputValueVector: (nodeData: NodeData, portId: string) => Vector;
  getInputValueVector2: (nodeData: NodeData, portId: string) => Vector2;
  getInputValueVector3: (nodeData: NodeData, portId: string) => Vector3;
  getInputValueVector4: (nodeData: NodeData, portId: string) => Vector4;
  getInputValueQuaternion: (nodeData: NodeData, portId: string) => Quaternion;
  getInputValueNumber: (nodeData: NodeData, portId: string) => number;
  getInputValueColor: (nodeData: NodeData, portId: string) => Color;
  getInputValueGradient: (nodeData: NodeData, portId: string) => Gradient;
  getInputValueImage: (nodeData: NodeData, portId: string) => null | ImageData;
  getInputValueString: (nodeData: NodeData, portId: string) => string;
  getInputValueBoolean: (nodeData: NodeData, portId: string) => boolean;
  getInputValueMaterial: (nodeData: NodeData, portId: string) => MaterialData;
  getInputValueMesh: (nodeData: NodeData, portId: string) => MeshData;
  getInputValueDrawing: (nodeData: NodeData, portId: string) => () => void;
  getInputValueVectorArray: (nodeData: NodeData, portId: string) => Vector[];
  getGlobalSetting<T>(arg0: string): T;
  getCallId(node: NodeData, ...args: any[]): string;
  endOfFrameCleanup(): void;
  endOfRunCleanup(): void;
};

export function createExecutionContext(tree: TreeStore | null, p5: P5CanvasInstance): ExecutionContext {
  var context: ExecutionContext = {
    p5: p5 as P5CanvasInstance,
    time: 0,
    deltaTime: 0,
    blackboard: {},
    target: p5 as Graphics,
    frameBlackboard: {},
    functionStack: [],
    callCounts: {},
    lastVisitedNode: "",
    RNG: new Rand(),
    getNodeOutput(nodeId, portId) {
      return tree?.getPortValue(nodeId, portId, context);
    },
    getInputValue<T>(nodeData: NodeData, portId: string, outputType: PortType = "unknown") {
      const inputPorts = nodeData.dataInputs[portId];
      let item: [any, PortType] = [null, "unknown"];
      if (!inputPorts) {
        return PortTypeDefinitions[outputType].createDefaultValue();
      }
      if (inputPorts.hasConnection) {
        var oldVisited = context.lastVisitedNode;
        context.lastVisitedNode = inputPorts.connectedNode as string;
        item = context.getNodeOutput(inputPorts.connectedNode as string, inputPorts.connectedPort as string);
        context.lastVisitedNode = oldVisited;
      } else {
        item = [inputPorts.ownValue, inputPorts.type];
      }
      return convertTypeValue(item[0], item[1], outputType) as T;
    },
    getInputValueVector: (nodeData: NodeData, portId: string) => context.getInputValue(nodeData, portId, "vector") as Vector,
    getInputValueVector2: (nodeData: NodeData, portId: string) => context.getInputValue(nodeData, portId, "vector2") as Vector2,
    getInputValueVector3: (nodeData: NodeData, portId: string) => context.getInputValue(nodeData, portId, "vector3") as Vector3,
    getInputValueVector4: (nodeData: NodeData, portId: string) => context.getInputValue(nodeData, portId, "vector4") as Vector4,
    getInputValueQuaternion: (nodeData: NodeData, portId: string) => context.getInputValue(nodeData, portId, "quaternion") as Quaternion,
    getInputValueNumber: (nodeData: NodeData, portId: string) => context.getInputValue(nodeData, portId, "number") as number,
    getInputValueColor: (nodeData: NodeData, portId: string) => context.getInputValue(nodeData, portId, "color") as Color,
    getInputValueGradient: (nodeData: NodeData, portId: string) => context.getInputValue(nodeData, portId, "gradient") as Gradient,
    getInputValueImage: (nodeData: NodeData, portId: string) => context.getInputValue(nodeData, portId, "image") as ImageData,
    getInputValueString: (nodeData: NodeData, portId: string) => context.getInputValue(nodeData, portId, "string") as string,
    getInputValueBoolean: (nodeData: NodeData, portId: string) => context.getInputValue(nodeData, portId, "bool") as boolean,
    getInputValueMaterial: (nodeData: NodeData, portId: string) => context.getInputValue(nodeData, portId, "material"),
    getInputValueMesh: (nodeData: NodeData, portId: string) => context.getInputValue(nodeData, portId, "mesh"),
    getInputValueVectorArray: (nodeData: NodeData, portId: string) => context.getInputValue(nodeData, portId, "array-vector") as Vector[],
    getInputValueDrawing: (nodeData: NodeData, portId: string) => (context.getInputValue(nodeData, portId, "drawing2d") || (() => {})) as () => void,
    getShaderVar(nodeData, portId, type: PortType, isOutput = false) {
      const inputPorts = nodeData.dataInputs[portId];
      if (!inputPorts || isOutput) {
        return `${sanitizeForShader(nodeData.id)}_${sanitizeForShader(portId)}`;
      }
      if (inputPorts.hasConnection) {
        var outPort = tree?.getOutputPort(inputPorts.connectedNode as string, inputPorts.connectedPort as string);
        return convertShaderType(`${sanitizeForShader(inputPorts.connectedNode)}_${sanitizeForShader(inputPorts.connectedPort)}`, outPort?.type as PortType, inputPorts.type);
      } else {
        var converter = PortTypeDefinitions[inputPorts.type].convertToShaderValue;
        return converter ? converter(inputPorts.ownValue) : "";
      }
    },
    getGlobalSetting<T>(arg0: string) {
      return tree?.globalSettings[arg0] as T;
    },
    createFunctionContext(node: NodeData) {
      return Object.fromEntries(
        Object.keys(node.dataInputs).map((key) => {
          const type = node.dataInputs[key].type;
          return [key, { type, value: context.getInputValue(node, key, type) }];
        })
      );
    },
    findNodeOfType(type) {
      const nodes = tree?.nodes as NodeCollection;
      for (let key in nodes) {
        if (nodes[key].type === type) {
          return nodes[key];
        }
      }
      return null;
    },
    getNodeDefinition(type) {
      return tree?.getNodeTypeDefinition(type);
    },
    getShaderCode(shader, ports) {
      return getShaderCode(shader, ports, tree, context);
    },
    getCallId: function (node: NodeData, ...args: any[]): string {
      var result = `${node.id} - ${context.callCounts[node.id] || 0} - ${args.join(" - ")}`;
      context.callCounts[node.id] = (context.callCounts[node.id] || 0) + 1;
      return result;
    },
    endOfFrameCleanup: function (): void {
      context.callCounts = {};
    },
    endOfRunCleanup: function (): void {
      console.log("cleanup");
      Object.keys(context.blackboard).forEach((key) => {
        console.log("cleaning " + key);
        if (context.blackboard[key] && typeof context.blackboard[key].dispose === "function") {
          console.log("disposing ");
          context.blackboard[key].dispose();
        }
      });
    },
  };
  return context;
}
