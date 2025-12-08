import { NodeDefinition } from "./NodeDefinition";
import { PortDefinition } from "./PortDefinition";
import { PortRole } from "./PortRole";

export type CustomFunctionCreationContextStore = {
  model: NodeDefinition | null;
  type: CustomNodeEditingType;
  mode: "edit" | "create";
  setPortList(type: PortRole, list: PortDefinition[]): void;
  create: () => void;
  cancel: () => void;
  addOutput: (prefix?: string) => void;
  addInputs: (prefix?: string) => void;
  setId: (id: string) => void;
  setCanBeExecuted: (value: boolean) => void;
  openEdit: (node: NodeDefinition, type?: CustomNodeEditingType) => void;
  openCreate: (type?: CustomNodeEditingType, modal?: string) => void;
  isNameValid: () => boolean;
  setDescription: (value: string) => void;
};
export type CustomNodeEditingType = "function" | "shader" | "simulation" | "shaderMaterial";
