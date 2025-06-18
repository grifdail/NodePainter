import { NodeDefinition } from "../../Types/NodeDefinition";
import { Constraints } from "../../Utils/ui/applyConstraints";
import { camelCaseToWords } from "../../Utils/ui/camelCaseToWords";
import { SimpleNodeVirtualNodeType } from "./VirtualNodeTypes/SimpleNodeVirtualNodeType";
import { createDefaultMaterialGenericData } from "./VirtualNodeTypes/createDefaultMaterialGenericData";

export function generateNodeFromVirtualNode(materialVirtualNodeType: SimpleNodeVirtualNodeType<any, any>): NodeDefinition {
  var inputs = materialVirtualNodeType.getInputs();
  return {
    id: materialVirtualNodeType.getId(),
    label: camelCaseToWords(materialVirtualNodeType.getLabel()),
    description: materialVirtualNodeType.getDescription(),
    icon: materialVirtualNodeType.getIcon(),
    tags: ["3D", ...materialVirtualNodeType.getTags()],
    dataInputs: inputs,
    dataOutputs: [materialVirtualNodeType.getOutput()],

    settings: [],
    getData: (portId, nodeData, context) => {
      const params = inputs.map((port) => context.getInputValue(nodeData, port.id, port.type));
      return materialVirtualNodeType.generate(context.getCallId(nodeData, materialVirtualNodeType.getHash(...params)), [], ...params);
    },
  };
}

export function generateMaterialNodeFromVirtualNode(materialVirtualNodeType: SimpleNodeVirtualNodeType<any, any>): NodeDefinition {
  var inputs = materialVirtualNodeType.getInputs();
  return {
    id: materialVirtualNodeType.getId(),
    label: camelCaseToWords(materialVirtualNodeType.getLabel()),
    description: materialVirtualNodeType.getDescription(),
    icon: materialVirtualNodeType.getIcon(),
    tags: ["3D", ...materialVirtualNodeType.getTags()],
    dataInputs: inputs,
    dataOutputs: [materialVirtualNodeType.getOutput()],
    settings: [
      {
        type: "group",
        id: "material",
        defaultValue: createDefaultMaterialGenericData(),
        settings: [
          { id: "blendingMode", type: "dropdown", defaultValue: "NormalBlending", options: ["NoBlending", "NormalBlending", "AdditiveBlending", "SubtractiveBlending", "MultiplyBlending"] },
          { id: "alphaTest", type: "number", defaultValue: 0, constrains: [Constraints.Clamp01()] },
          { id: "transparent", type: "bool", defaultValue: false },
          { id: "flatShading", type: "bool", defaultValue: false },
          { id: "wireframe", type: "bool", defaultValue: false },
          { id: "side", type: "dropdown", defaultValue: "FrontSide", options: ["FrontSide", "BackSide", "DoubleSide"] },
        ],
      },
    ],
    getData: (portId, nodeData, context) => {
      const params = inputs.map((port) => context.getInputValue(nodeData, port.id, port.type));
      const setting = nodeData.settings.material;
      const id = context.getCallId(nodeData, materialVirtualNodeType.getHash(...params));
      return materialVirtualNodeType.generate(id, [], ...params, setting);
    },
  };
}
