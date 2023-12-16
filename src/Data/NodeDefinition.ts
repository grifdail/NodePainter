import { Icon } from "@tabler/icons-react";
import { NodeData } from "../Hooks/useTree";
import { createColor, createDefaultGradient } from "../Nodes/Color";
import { createVector } from "../Nodes/Vector";
import { ExecutionContext } from "./createExecutionContext";

export type PortRole = "inputData" | "outputData" | "inputExecute" | "outputExecute";

export type PortType = "execute" | "number" | "vector2" | "color" | "string" | "bool" | "image" | "gradient";
export type SettingType = "dropdown" | "palette" | "number" | "gradient" | "image-upload";

export const PortTypeArray: PortType[] = ["number", "vector2", "color", "string", "bool", "image", "gradient"];

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
