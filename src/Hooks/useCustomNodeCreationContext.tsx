import { NodeDefinition, PortRole } from "../Data/NodeDefinition";
import { PortTypeDefaultValue } from "../Data/NodeDefinition";
import { create } from "zustand";
import { produce } from "immer";
import { useTree } from "./useTree";
import { useRouter } from "./useRouter";
import { CUSTOM_FUNCTION, CUSTOM_SHADER } from "../Nodes/System";

export type EDIT_TARGET_TYPE = "function" | "shader";

export type CustomFunctionCreationContextStore = {
  model: NodeDefinition | null;
  type: EDIT_TARGET_TYPE;
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
  openEdit: (node: NodeDefinition, type?: EDIT_TARGET_TYPE) => void;
  openCreate: (type?: EDIT_TARGET_TYPE) => void;
};

export const useCustomNodeCreationContext = create<CustomFunctionCreationContextStore>()((set, get) => {
  return {
    mode: "edit",
    type: "function",
    model: null,
    openEdit(node: NodeDefinition, type: EDIT_TARGET_TYPE = "function") {
      set({
        mode: "edit",
        model: node,
        type: type,
      });
      useRouter.getState().open(type == "function" ? "custom-function" : "custom-shader");
    },
    openCreate(type: EDIT_TARGET_TYPE = "function") {
      var base: NodeDefinition =
        type == "function"
          ? {
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
            }
          : {
              id: "custom-shader",
              hideInLibrary: false,
              IsUnique: false,
              description: "Custom Shader",
              tags: ["Custom"],
              dataInputs: [],
              dataOutputs: [{ id: "image", type: "image", defaultValue: null }],
              executeOutputs: ["execute"],
              settings: [
                { id: "width", type: "number", defaultValue: 400 },
                { id: "height", type: "number", defaultValue: 400 },
                { id: "when", type: "dropdown", defaultValue: "Once", options: ["Once", "Per frame", "Everytime"] },
              ],
              getData: null,
              execute: null,
              executeAs: CUSTOM_SHADER,
              canBeExecuted: true,
            };
      set({
        mode: "create",
        type: type,
        model: base,
      });
      useRouter.getState().open(type == "function" ? "custom-function" : "custom-shader");
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
      if (get().type == "function") {
        useTree.getState().createFunction(get().model as NodeDefinition);
      } else {
        useTree.getState().createShader(get().model as NodeDefinition);
      }

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
