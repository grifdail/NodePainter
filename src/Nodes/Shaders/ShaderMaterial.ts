import { IconPhoto } from "@tabler/icons-react";
import { ImageData } from "../../Types/ImageData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortTypeDefinitions } from "../../Types/PortTypeDefinitions";
import { createDefaultMaterial } from "../../Utils/graph/definition/createDefaultMaterial";
import { ExecutionContext, FunctionContext } from "../../Utils/graph/execution/createExecutionContext";
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
    const code = context.getMaterialShaderCode(node.type, Object.values(node.dataInputs));
    return VirtualNodes.ShaderMaterialType.generate(callId, [], code.frag, code.vertex, {}, setting);
  },
};

function ApplyUniformFromData(shader: any, context: ExecutionContext, data: FunctionContext) {
  shader.setUniform("time", context.time);
  //Todo: passe the extra data for lights
  Object.entries(data).forEach(([id, { value, type }]) => {
    if (type === "image") {
      const image = value as ImageData;
      if (!image || !image.getP5(context.p5)) {
        return;
      }
      shader.setUniform(sanitizeForShader(`uniform_${id}`), image.getP5(context.p5));
    } else {
      const converter = PortTypeDefinitions[type].convertToShaderP5Uniform;
      shader.setUniform(sanitizeForShader(`uniform_${id}`), converter ? converter(value) : value);
    }
  });
}
