import { Icon } from "@tabler/icons-react";
import { ExecutionContext } from "../Utils/createExecutionContext";
import { MaterialData } from "./MaterialData";
import { NodeData } from "./NodeData";
import { PortDefinition } from "./PortDefinition";
import { PortRole } from "./PortRole";
import { PortType } from "./PortType";
import { SettingDefinition } from "./SettingDefinition";
import { TreeStore } from "./TreeStore";

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
  bindPort?: (portId: string, self: NodeData, outputPorts: PortDefinition, selfPosition: PortRole) => boolean;
  unbindPort?: (portId: string, self: NodeData, selfPosition: PortRole) => void;
  contextMenu?: { [key: string]: (node: NodeData, tree: TreeStore) => void };
  onSettingChange?: (node: NodeData, settingId: string, value: any, tree: TreeStore) => void;
  availableTypes?: PortType[];
  defaultType?: PortType;
  onChangeType?: (node: NodeData, type: PortType) => void;
  onCreate?: (node: NodeData) => void;
  featureLevel?: number;
};

export type MaterialNodeDefinition = NodeDefinition & {
  applyMaterial: (context: ExecutionContext, mat: MaterialData, isStrokeOnly?: boolean) => void;
};

export function isMaterialNode(node: NodeDefinition): node is MaterialNodeDefinition {
  return (node as MaterialNodeDefinition).applyMaterial != null;
}

export const MainExecuteId = "mainExecute";
