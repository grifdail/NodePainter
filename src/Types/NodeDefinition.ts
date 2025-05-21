import { Icon } from "@tabler/icons-react";
import { ExecutionContext } from "../Utils/createExecutionContext";
import { NodeData } from "./NodeData";
import { PortDefinition } from "./PortDefinition";
import { PortType } from "./PortType";
import { SettingDefinition } from "./SettingDefinition";
import { TreeStore } from "./TreeStore";

export type ContextMenuData = {
  [key: string]: (node: NodeData, tree: TreeStore) => void;
};

export type PortChangeFunction = (node: NodeData, type: PortType, blackboards: NodeData[]) => void;

export type BaseNodeDefinition = {
  id: string;
  // Display
  hideInLibrary?: boolean;
  featureLevel?: number;
  IsUnique?: boolean; //There can only be one of these node per sketch: Start, Custom Function Start & End, ect...
  description?: string;
  icon?: Icon;
  label?: string;
  tags: Array<string>;

  //Meta
  executeAs?: string;
  contextMenu?: ContextMenuData | ((node: NodeData) => ContextMenuData);
  onCreate?: (node: NodeData) => void;

  //Types
  availableTypes?: PortType[];
  defaultType?: PortType;
  onChangeType?: PortChangeFunction;
  //Logic
  settings: Array<SettingDefinition>;

  //Shader
  shaderRequirement?: string | string[];
};

export type LogicNodeDefinition = {
  //Shader
  getShaderCode?: (node: NodeData, context: ExecutionContext) => string;

  //Data
  dataInputs: Array<PortDefinition>;
  dataOutputs: Array<PortDefinition>;
  getData?: (portId: string, node: NodeData, context: ExecutionContext) => any;
  hasInput?(input: PortType): PortType | null;
  hasOutput?(output: PortType): PortType | null;

  //Multi Types
};

export type NodeDefinition = BaseNodeDefinition & LogicNodeDefinition;
