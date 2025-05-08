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

export type NodeDefinition = {
  hideInLibrary?: boolean;
  IsUnique?: boolean;
  description?: string;
  icon?: Icon;
  id: string;
  label?: string;
  tags: Array<string>;
  isShader?: false;
  dataInputs: Array<PortDefinition>;
  dataOutputs: Array<PortDefinition>;
  executeOutputs: Array<string>;
  settings: Array<SettingDefinition>;
  getData?: (portId: string, node: NodeData, context: ExecutionContext) => any;
  execute?: (node: NodeData, context: ExecutionContext) => void;
  getShaderCode?: (node: NodeData, context: ExecutionContext) => string;
  shaderRequirement?: string | string[];
  executeAs?: string;
  canBeExecuted?: boolean;
  contextMenu?: ContextMenuData | ((node: NodeData) => ContextMenuData);
  onSettingChange?: (node: NodeData, settingId: string, value: any, tree: TreeStore) => void;
  availableTypes?: PortType[];
  defaultType?: PortType;
  onChangeType?: PortChangeFunction;
  onCreate?: (node: NodeData) => void;
  featureLevel?: number;
  hasInput?(input: PortType): PortType | null;
  hasOutput?(output: PortType): PortType | null;
};

export const MainExecuteId = "mainExecute";
