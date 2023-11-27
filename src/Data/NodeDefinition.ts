import { Icon } from "@tabler/icons-react";
import { PortType, SettingType } from "./PortType";
import { NodeData } from "./stores";
import { P5CanvasInstance } from "@p5-wrapper/react";

export type PortDefinition = {
  id: string;
  type: PortType;
  defaultValue: any;
};

export type SettingDefinition = {
  id: string;
  type: SettingType;
  defaultValue: any;
};

export type NodeDefinition = {
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
  getNodeOutput: (nodeId: string, portId: string) => any;
  p5: P5CanvasInstance;
  execute: (nodeId: string) => void;
};

export function getInputValue(nodeData: NodeData, portId: string, context: ExecutionContext) {
  const inputPorts = nodeData.inputs[portId];
  if (inputPorts.hasConnection) {
    return context.getNodeOutput(inputPorts.connectedNode as string, inputPorts.connectedPort as string);
  } else {
    return inputPorts.ownValue;
  }
}
