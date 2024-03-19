import { NodeDefinition } from "./NodeDefinition";
import { PortRole } from "./PortRole";
import { PortType } from "./PortType";

export type CustomFunctionCreationContextStore = {
  model: NodeDefinition | null;
  type: CustomNodeEditingType;
  mode: "edit" | "create";
  setPortId(type: PortRole, index: number, value: string): void;
  setPortDefaultValue(type: PortRole, index: number, value: any): void;
  deletePort(type: PortRole, index: number): void;
  setPortType(type: PortRole, index: number, portType: PortType): void;
  create: () => void;
  cancel: () => void;
  addOutput: (prefix?: string) => void;
  addInputs: (prefix?: string) => void;
  setId: (id: string) => void;
  setCanBeExecuted: (value: boolean) => void;
  openEdit: (node: NodeDefinition, type?: CustomNodeEditingType) => void;
  openCreate: (type?: CustomNodeEditingType) => void;
};
export type CustomNodeEditingType = "function" | "shader" | "simulation";
