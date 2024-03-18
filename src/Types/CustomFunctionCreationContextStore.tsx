import { NodeDefinition } from "./NodeDefinition";
import { PortRole } from "./PortRole";
import { PortType } from "./PortType";

export type CustomFunctionCreationContextStore = {
  model: NodeDefinition | null;
  type: EDIT_TARGET_TYPE;
  mode: "edit" | "create";
  setPortId(type: PortRole, index: number, value: string): void;
  setPortDefaultValue(type: PortRole, index: number, value: any): void;
  deletePort(type: PortRole, index: number): void;
  setPortType(type: PortRole, index: number, portType: PortType): void;
  create: () => void;
  cancel: () => void;
  addOutput: () => void;
  addInputs: () => void;
  setId: (id: string) => void;
  setCanBeExecuted: (value: boolean) => void;
  openEdit: (node: NodeDefinition, type?: EDIT_TARGET_TYPE) => void;
  openCreate: (type?: EDIT_TARGET_TYPE) => void;
};
export type EDIT_TARGET_TYPE = "function" | "shader";
