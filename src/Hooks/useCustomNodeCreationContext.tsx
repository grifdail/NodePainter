import { NodeDefinition } from "../Types/NodeDefinition";
import { createDefaultValue } from "../Utils/createDefaultValue";
import { create } from "zustand";
import { produce } from "immer";
import { useTree } from "./useTree";
import { useRouter } from "./useRouter";
import { CUSTOM_SHADER } from "../Nodes/Shaders/RenderShader";
import { CustomFunctionCreationContextStore } from "../Types/CustomFunctionCreationContextStore";
import { CustomNodeEditingType as CustomNodeType } from "../Types/CustomFunctionCreationContextStore";
import { CUSTOM_FUNCTION } from "../Nodes/CustomFunction/CustomFunction";
import { CUSTOM_SIMULATION } from "../Nodes/CustomFunction/CustomSimulation";
import { Routes } from "../Types/Routes";
import { createDefaultMaterial } from "../Utils/createDefaultMaterial";
import { SHADER_MATERIAL } from "../Nodes/Shaders/ShaderMaterial";

type CustomNodeCreationSetting = {
  baseNode: NodeDefinition;
  create(node: NodeDefinition): void;
  prepareNodeForEdit?: (node: NodeDefinition) => NodeDefinition;
};

const BaseNodeForModel: { [key in CustomNodeType]: CustomNodeCreationSetting } = {
  function: {
    baseNode: {
      id: "custom-node",
      hideInLibrary: false,
      IsUnique: false,
      description: "Custom Function",
      tags: ["Custom"],
      dataInputs: [],
      dataOutputs: [],
      executeOutputs: [],
      settings: [],
      executeAs: CUSTOM_FUNCTION,
      canBeExecuted: false,
    },
    create: function (node: NodeDefinition): void {
      useTree.getState().createFunction(node);
    },
  },
  shader: {
    baseNode: {
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
      executeAs: CUSTOM_SHADER,
      canBeExecuted: true,
    },
    create: function (node: NodeDefinition): void {
      useTree.getState().createShader(node);
    },
  },
  shaderMaterial: {
    baseNode: {
      id: "custom-shader-material",
      hideInLibrary: false,
      IsUnique: false,
      description: "Custom Shader",
      tags: ["Custom"],
      dataInputs: [],
      dataOutputs: [{ id: "mat", type: "material", defaultValue: createDefaultMaterial() }],
      executeOutputs: [],
      settings: [],
      executeAs: SHADER_MATERIAL,
      canBeExecuted: false,
    },
    create: function (node: NodeDefinition): void {
      useTree.getState().createShader(node);
    },
  },
  simulation: {
    baseNode: {
      id: "custom-simulation",
      hideInLibrary: false,
      IsUnique: false,
      description: "Custom Simulation",
      tags: ["Custom"],
      dataInputs: [],
      dataOutputs: [],
      executeOutputs: ["execute"],
      settings: [],
      executeAs: CUSTOM_SIMULATION,
      canBeExecuted: true,
    },
    create: function (node: NodeDefinition): void {
      useTree.getState().createSimulation(node);
    },
    prepareNodeForEdit(node) {
      console.log(node);
      node.dataInputs = node.dataInputs.filter((item) => item.id !== "progress" && !node.dataOutputs.some((output) => output.id === item.id));
      return node;
    },
  },
};

export const useCustomNodeCreationContext = create<CustomFunctionCreationContextStore>()((set, get) => {
  return {
    mode: "edit",
    type: "function",
    model: null,
    openEdit(node: NodeDefinition, type: CustomNodeType = "function") {
      var preparator = BaseNodeForModel[type].prepareNodeForEdit;
      var model = preparator !== undefined ? preparator(structuredClone(node)) : node;
      set({
        mode: "edit",
        model: model,
        type: type,
      });
      useRouter.getState().open(`custom-${type}` as Routes);
    },
    openCreate(type: CustomNodeType = "function", modal?: string) {
      var base: NodeDefinition = createNewFunctionDefinition(type);
      set({
        mode: "create",
        type: type,
        model: base,
      });
      useRouter.getState().open(`custom-${modal || type}` as Routes);
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
      BaseNodeForModel[get().type].create(get().model as NodeDefinition);

      useRouter.getState().close();
    },
    cancel() {
      useRouter.getState().close();
    },
    addOutput(prefix: string = "output") {
      set(
        produce((state) => {
          var model = state.model as NodeDefinition;
          model.dataOutputs.push({
            id: `${prefix}-${model.dataOutputs.length}`,
            type: "number",
            defaultValue: 0,
          });
        })
      );
    },
    addInputs(prefix: string = "input") {
      set(
        produce((state) => {
          var model = state.model as NodeDefinition;
          model.dataInputs.push({
            id: `${prefix}-${model.dataInputs.length}`,
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
          state.model[type === "inputData" ? "dataInputs" : "dataOutputs"][index].defaultValue = createDefaultValue(value);
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
    isNameValid() {
      var id = get().model?.id;
      if (!id) {
        return false;
      }
      if (get().mode === "create") {
        return useTree.getState().getNodeTypeDefinition(id) === undefined;
      } else {
        return true;
      }
    },
  };
});
export function createNewFunctionDefinition(type: CustomNodeType): NodeDefinition {
  return structuredClone(BaseNodeForModel[type].baseNode);
}
