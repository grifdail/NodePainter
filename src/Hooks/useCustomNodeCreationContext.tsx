import { NodeDefinition } from "../Types/NodeDefinition";
import { create } from "zustand";
import { produce } from "immer";
import { useTree } from "./useTree";
import { useRouter } from "./useRouter";
import { CustomFunctionCreationContextStore } from "../Types/CustomFunctionCreationContextStore";
import { CustomNodeEditingType as CustomNodeType } from "../Types/CustomFunctionCreationContextStore";
import { Routes } from "../Types/Routes";
import { createDefaultMaterial } from "../Utils/graph/definition/createDefaultMaterial";
import { ShaderMaterial } from "../Nodes/Technical/MaterialShader/ShaderMaterial";
import { CustomFunction } from "../Nodes/Technical/CustomFunction/CustomFunction";
import { RenderShader } from "../Nodes/Technical/ImageEffectShader/RenderShader";
import { CustomSimulation } from "../Nodes/Technical/Simulation/CustomSimulation";

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

      settings: [],
      executeAs: CustomFunction.id,
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
      description: "Custom Image Effect Shader",
      tags: ["Custom"],
      dataInputs: [],
      dataOutputs: [{ id: "image", type: "image", defaultValue: null }],
      settings: [
        { id: "width", type: "number", defaultValue: 400 },
        { id: "height", type: "number", defaultValue: 400 },
      ],
      executeAs: RenderShader.id,
    },
    create: function (node: NodeDefinition): void {
      useTree.getState().createShader(node);
    },
    prepareNodeForEdit(node) {
      node.dataInputs = node.dataInputs.filter((item) => item.id !== "cache-id");
      node.dataOutputs = [];
      return node;
    },
  },
  shaderMaterial: {
    baseNode: {
      id: "custom-shader-material",
      hideInLibrary: false,
      IsUnique: false,
      description: "Custom Shader Material",
      tags: ["Custom"],
      dataInputs: [],
      dataOutputs: [{ id: "mat", type: "material", defaultValue: createDefaultMaterial() }],

      settings: ShaderMaterial.settings,
      executeAs: ShaderMaterial.id,
    },
    create: function (node: NodeDefinition): void {
      useTree.getState().createShaderMaterial(node);
    },
    prepareNodeForEdit(node) {
      node.dataInputs = node.dataInputs.filter((item) => item.id !== "cache-id");
      node.dataOutputs = [];
      return node;
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
      settings: [],
      executeAs: CustomSimulation.id,
    },
    create: function (node: NodeDefinition): void {
      useTree.getState().createSimulation(node);
    },
    prepareNodeForEdit(node) {
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
    setPortList(type, list) {
      set(
        produce((state) => {
          state.model[type === "input" ? "dataInputs" : "dataOutputs"] = list;
        })
      );
    },
    setDescription(value) {
      set(
        produce((state) => {
          state.model.description = value;
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
