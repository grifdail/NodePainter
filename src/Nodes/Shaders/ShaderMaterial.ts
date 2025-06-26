import { IconPhoto } from "@tabler/icons-react";
import { NodeData } from "../../Types/NodeData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortTypeDefinitions } from "../../Types/PortTypeDefinitions";
import { createDefaultMaterial } from "../../Utils/graph/definition/createDefaultMaterial";
import { createOrSelectFromCache } from "../../Utils/graph/execution/blackboardCache";
import { ExecutionContext } from "../../Utils/graph/execution/createExecutionContext";
import { sanitizeForShader } from "../../Utils/graph/execution/sanitizeForShader";
import { Constraints } from "../../Utils/ui/applyConstraints";
import { VirtualNodes } from "../3D/VirtualNodeTypes/VirtualNodeTypes";
import { createDefaultMaterialGenericData } from "../3D/VirtualNodeTypes/createDefaultMaterialGenericData";

export const SHADER_MATERIAL = "ShaderMaterial";
export const ShaderMaterial: NodeDefinition = {
  id: SHADER_MATERIAL,
  hideInLibrary: true,
  icon: IconPhoto,
  description: "[WIP] Use a shader to render the material",
  dataInputs: [],
  dataOutputs: [{ id: "material", type: "material", defaultValue: createDefaultMaterial() }],
  tags: ["Shader", "Material"],

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

  getData(portId, node, context) {
    const callId = context.getCallId(node);
    const setting = node.settings.material;
    const code = createOrSelectFromCache(
      context,
      node,
      () => {
        return context.getMaterialShaderCode(node.type, Object.values(node.dataInputs));
      },
      "shader"
    );
    const uniforms = getUniformObject(node.type, context, node);
    return VirtualNodes.ShaderMaterialType.generate(callId, [], code.frag, code.vertex, uniforms, setting);
  },
};

function getUniformObject(shader: any, context: ExecutionContext, node: NodeData) {
  return {
    time: { value: context.time },
    ...Object.fromEntries(
      Object.values(node.dataInputs).map((port) => {
        const converter = PortTypeDefinitions[port.type].convertToThreeType;
        const value = context.getInputValue(node, port.id, port.type);
        return [sanitizeForShader(`uniform_${port.id}`), { value: converter ? converter(value) : value }];
      })
    ),
  };
}
