import { NodeDefinition, PortRole } from "../Data/NodeDefinition";
import { PortTypeDefaultValue } from "../Data/NodeDefinition";
import { create } from "zustand";
import { produce } from "immer";
import { useTree } from "./useTree";
import { useRouter } from "./useRouter";
import { CUSTOM_FUNCTION } from "../Nodes/System";

export type CustomFunctionCreationContextStore = {
  model: NodeDefinition | null;
  mode: "edit" | "create";
  setPortId(type: PortRole, index: number, value: string): void;
  setPortDefaultValue(type: PortRole, index: number, value: any): void;
  deletePort(type: PortRole, index: number): void;
  setPortType(type: PortRole, index: number, arg2: string): void;
  create: () => void;
  cancel: () => void;
  addOutput: () => void;
  addInputs: () => void;
  setId: (id: string) => void;
  setCanBeExecuted: (value: boolean) => void;
  openEdit: (node: NodeDefinition) => void;
  openCreate: () => void;
};

export const useCustomNodeCreationContext = create<CustomFunctionCreationContextStore>()((set, get) => {
  return {
    mode: "edit",
    model: null,
    openEdit(node: NodeDefinition) {
      set({
        mode: "edit",
        model: node,
      });
      useRouter.getState().open("custom-function");
    },
    openCreate() {
      set({
        mode: "create",
        model: {
          id: "custom-node",
          hideInLibrary: false,
          IsUnique: false,
          description: "Custom Function",
          tags: ["Custom"],
          dataInputs: [],
          dataOutputs: [],
          executeOutputs: [],
          settings: [],
          getData: null,
          execute: null,
          executeAs: CUSTOM_FUNCTION,
          canBeExecuted: false,
        },
      });
      useRouter.getState().open("custom-function");
    },
    setId: (id: string) => {
      set(
        produce((state) => {
          if (state.mode !== "edit") {
            state.model.id = id;
          }
        })
      );
    },
    setCanBeExecuted: (value: boolean) => {
      set(
        produce((state) => {
          state.model.canBeExecuted = value;
        })
      );
    },
    create() {
      useTree.getState().createFunction(get().model as NodeDefinition);
      useRouter.getState().close();
    },
    cancel() {
      useRouter.getState().close();
    },
    addOutput() {
      set(
        produce((state) => {
          var model = state.model as NodeDefinition;
          model.dataOutputs.push({
            id: `output-${model.dataOutputs.length}`,
            type: "number",
            defaultValue: 0,
          });
        })
      );
    },
    addInputs() {
      set(
        produce((state) => {
          var model = state.model as NodeDefinition;
          model.dataInputs.push({
            id: `input-${model.dataInputs.length}`,
            type: "number",
            defaultValue: 0,
          });
        })
      );
    },
    setPortType(type, index, value) {
      set(
        produce((state) => {
          state.model[type === "inputData" ? "dataInputs" : "dataOutputs"][index].type = value;
          state.model[type === "inputData" ? "dataInputs" : "dataOutputs"][index].defaultValue = PortTypeDefaultValue[value] as any;
        })
      );
    },
    setPortDefaultValue(type, index, value) {
      set(
        produce((state) => {
          state.model[type === "inputData" ? "dataInputs" : "dataOutputs"][index].defaultValue = value;
        })
      );
    },
    setPortId(type, index, value) {
      set(
        produce((state) => {
          state.model[type === "inputData" ? "dataInputs" : "dataOutputs"][index].id = value;
        })
      );
    },
    deletePort(type, index) {
      set(
        produce((state) => {
          state.model[type === "inputData" ? "dataInputs" : "dataOutputs"].splice(index, 1);
        })
      );
    },
  };
});
