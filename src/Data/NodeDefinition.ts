import { Icon } from "@tabler/icons-react";
import { P5CanvasInstance } from "@p5-wrapper/react";
import { NodeData } from "../Hooks/useTree";
import { createColor, createDefaultGradient } from "../Nodes/Color";
import { createVector } from "../Nodes/Vector";

export type PortRole = "inputData" | "outputData" | "inputExecute" | "outputExecute";

export type PortType = "execute" | "number" | "vector2" | "color" | "string" | "bool" | "image" | "gradient";
export type SettingType = "dropdown" | "palette" | "number" | "gradient" | "image-upload";

export type PortDefinition = {
  id: string;
  type: PortType;
  defaultValue: any;
};

export type SettingDefinition = {
  id: string;
  type: SettingType;
  defaultValue: any;
  [key: string]: any;
};

export type NodeDefinition = {
  hideInLibrary?: boolean;
  IsUnique?: boolean;
  description?: string;
  icon?: Icon;
  id: string;
  tags: Array<string>;
  dataInputs: Array<PortDefinition>;
  dataOutputs: Array<PortDefinition>;
  executeOutputs: Array<string>;
  settings: Array<SettingDefinition>;
  getData: null | ((portId: string, data: NodeData, context: ExecutionContext) => any);
  execute: null | ((node: NodeData, context: ExecutionContext) => void);
  executeAs?: string;
  canBeExecuted?: boolean;
  tryBindPort?: (selfPort: string, self: NodeData, outputPorts: PortDefinition, selfPosition: PortRole) => boolean;
  contextMenu?: { [key: string]: (node: NodeData) => void };
};

export type ExecutionContext = {
  findNodeOfType(type: string): string | null;
  createFunctionContext(node: NodeData, context: ExecutionContext): { [key: string]: any };
  functionStack: Array<{ [key: string]: any }>;
  time: number;
  progress?: number;
  blackboard: { [key: string]: any };
  frameBlackboard: { [key: string]: any };
  getNodeOutput: (nodeId: string, portId: string) => any;
  p5: P5CanvasInstance;
  execute: (nodeId: string) => void;
  getInputValue: (nodeData: NodeData, portId: string) => any;
};

export const MainExecuteId = "mainExecute";
export const PortTypeDefaultValue = {
  number: 0,
  vector2: createVector(),
  color: createColor(),
  string: "",
  bool: "",
  gradient: createDefaultGradient(),
  iamge: null,
} as { [key: string]: any };
