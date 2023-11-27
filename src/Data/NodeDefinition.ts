import { Icon } from "@tabler/icons-react";
import { PortType, SettingType } from "./PortType";
import { NodeData } from "./stores";

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
  getData: (portId: string, data: NodeData, getNodeOutput: (nodeId: string, portId: string) => any) => any;
  execute: null | ((node: NodeData, execute: (nodeId: string) => void, getNodeOutput: (nodeId: string, portId: string) => any) => void);
};

export function getInputValue(nodeData: NodeData, portId: string, getNodeOutput: (nodeId: string, portId: string) => any) {
  const inputPorts = nodeData.inputs[portId];
  if (inputPorts.hasConnection) {
    return getNodeOutput(inputPorts.connectedNode as string, inputPorts.connectedPort as string);
  } else {
    return inputPorts.ownValue;
  }
}
