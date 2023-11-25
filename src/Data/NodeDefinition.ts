import { NodeData } from "./NodeData";
import { Tree } from "./Tree";
import { PortType, SettingType } from "./PortType";

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
  id: string;
  tags: Array<string>;
  inputPorts: Array<PortDefinition>;
  outputPorts: Array<PortDefinition>;
  executeOutputPorts: Array<string>;
  settings: Array<SettingDefinition>;
  getData: (portId: string, data: NodeData, tree: Tree) => any;
  execute: null | ((data: NodeData, tree: Tree) => any);
};
