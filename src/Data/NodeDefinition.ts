import { Icon } from "@tabler/icons-react";
import { PortType, SettingType } from "./PortType";
import { P5CanvasInstance } from "@p5-wrapper/react";
import { NodeData } from "../Hooks/useTree";

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
  inputPorts: Array<PortDefinition>;
  outputPorts: Array<PortDefinition>;
  executeOutputPorts: Array<string>;
  settings: Array<SettingDefinition>;
  getData: null | ((portId: string, data: NodeData, context: ExecutionContext) => any);
  execute: null | ((node: NodeData, context: ExecutionContext) => void);
  executeAs?: string;
  canBeExecuted?: boolean;
};

export type ExecutionContext = {
  findNodeOfType(type: string): string | null;
  createFunctionContext(node: NodeData, context: ExecutionContext): { [key: string]: any };
  functionStack: Array<{ [key: string]: any }>;
  time: number;
  progress?: number;
  blackboard: { [key: string]: any };
  getNodeOutput: (nodeId: string, portId: string) => any;
  p5: P5CanvasInstance;
  execute: (nodeId: string) => void;
  getInputValue: (nodeData: NodeData, portId: string) => any;
};
