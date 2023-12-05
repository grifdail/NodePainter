﻿import { NodeDefinition } from "../Data/NodeDefinition";
import { PortTypeDefaultValue } from "../Data/PortType";
import { create } from "zustand";
import { produce } from "immer";
import { useTree } from "../Hooks/useTree";
import { useRouter } from "../Hooks/useRouter";

export type PortPosition = "input" | "output";
export type CustomFunctionCreationContextStore = {
  model: NodeDefinition | null;
  mode: "edit" | "create";
  setPortId(type: PortPosition, index: number, value: string): void;
  setPortDefaultValue(type: PortPosition, index: number, value: any): void;
  deletePort(type: PortPosition, index: number): void;
  setPortType(type: PortPosition, index: number, arg2: string): void;
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
          inputPorts: [],
          outputPorts: [],
          executeOutputPorts: [],
          settings: [],
          getData: null,
          execute: null,
          executeAs: "CustomFunction",
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
          state.model.outputPorts.push({
            id: `output-${state.model.outputPorts.length}`,
            type: "number",
            defaultValue: 0,
          });
        })
      );
    },
    addInputs() {
      set(
        produce((state) => {
          state.model.inputPorts.push({
            id: `input-${state.model.inputPorts.length}`,
            type: "number",
            defaultValue: 0,
          });
        })
      );
    },
    setPortType(type, index, value) {
      set(
        produce((state) => {
          state.model[type === "input" ? "inputPorts" : "outputPorts"][index].type = value;
          state.model[type === "input" ? "inputPorts" : "outputPorts"][index].defaultValue = PortTypeDefaultValue[value] as any;
        })
      );
    },
    setPortDefaultValue(type, index, value) {
      set(
        produce((state) => {
          state.model[type === "input" ? "inputPorts" : "outputPorts"][index].defaultValue = value;
        })
      );
    },
    setPortId(type, index, value) {
      set(
        produce((state) => {
          state.model[type === "input" ? "inputPorts" : "outputPorts"][index].id = value;
        })
      );
    },
    deletePort(type, index) {
      set(
        produce((state) => {
          state.model[type === "input" ? "inputPorts" : "outputPorts"].splice(index, 1);
        })
      );
    },
  };
});