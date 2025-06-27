import { Icon } from "@tabler/icons-react";
import { ExecutionContext } from "../Utils/graph/execution/createExecutionContext";
import { CustomNodeEditingType } from "./CustomFunctionCreationContextStore";
import { NodeData } from "./NodeData";
import { NodeTags } from "./NodeTags";
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
  preventSnippet?: boolean;

  /**
   * @TJS-ignore
   */
  icon?: Icon;
  label?: string;
  tags: Array<NodeTags>;
  //When looking for a node in the menu, this will also look for this field, not just the label
  alias?: string;

  //Meta
  executeAs?: string;
  contextMenu?: ContextMenuData | ((node: NodeData) => ContextMenuData);

  //Types
  availableTypes?: PortType[];
  onChangeType?: PortChangeFunction;

  //Logic
  settings: Array<SettingDefinition>;

  //Shader
  shaderRequirement?: string | string[];
  onManualCreation?: (node: NodeData) => void;

  onlyAvailableIn?: CustomNodeEditingType[];
};

export type LogicNodeDefinition = {
  //Data
  dataInputs: Array<PortDefinition>;
  dataOutputs: Array<PortDefinition>;
  getData?: (portId: string, node: NodeData, context: ExecutionContext) => any;
  hasInput?(input: PortType, def: NodeDefinition): PortType | null;
  hasOutput?(output: PortType, def: NodeDefinition): PortType | null;
  //Shader
  getShaderCode?: (node: NodeData, context: ExecutionContext) => string;
};

export type NodeDefinition = BaseNodeDefinition & LogicNodeDefinition;
