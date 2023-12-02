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
  IsUnique?: boolean;
  description?: string;
  icon?: Icon;
  id: string;
  tags: Array<string>;
  inputPorts: Array<PortDefinition>;
  outputPorts: Array<PortDefinition>;
  executeOutputPorts: Array<string>;
  settings: Array<SettingDefinition>;
  getData: (portId: string, data: NodeData, context: ExecutionContext) => any;
  execute: null | ((node: NodeData, context: ExecutionContext) => void);
};

export type ExecutionContext = {
  time: number;
  blackboard: { [key: string]: any };
  getNodeOutput: (nodeId: string, portId: string) => any;
  p5: P5CanvasInstance;
  execute: (nodeId: string) => void;
  getInputValue: (nodeData: NodeData, portId: string) => any;
};
