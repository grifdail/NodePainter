import { IconPhoto } from "@tabler/icons-react";
import { ImageData } from "../../Types/ImageData";
import { MaterialData } from "../../Types/MaterialData";
import { MaterialNodeDefinition } from "../../Types/NodeDefinition";
import { convertToUniform } from "../../Utils/convertToShaderValue";
import { createDefaultMaterial } from "../../Utils/createDefaultMaterial";
import { ExecutionContext, FunctionContext } from "../../Utils/createExecutionContext";
import { sanitizeForShader } from "../../Utils/sanitizeForShader";

const VERTEX_SHADER = ``;

export const ShaderMaterial: MaterialNodeDefinition = {
  id: "ShaderMaterial",
  hideInLibrary: true,
  icon: IconPhoto,
  description: "Use a shader to render the material",
  dataInputs: [],
  dataOutputs: [{ id: "material", type: "material", defaultValue: createDefaultMaterial() }],
  tags: ["Shader", "Material"],
  executeOutputs: [],
  settings: [],
  canBeExecuted: false,
  getData(portId, node, context) {
    const keyShader = `${node.id}-shader`;
    let shader = context.blackboard[keyShader];
    if (!shader) {
      try {
        const shaderCode: string = context.getShaderCode(node.type, Object.values(node.dataInputs));
        console.log(shaderCode);
        shader = context.target.createShader(VERTEX_SHADER, shaderCode);
        context.blackboard[keyShader] = shader;
      } catch (error) {
        console.error(error);
      }
    }
    var mat: MaterialData = {
      id: "ShaderMaterial",
      shader: shader,
      uniforms: context.createFunctionContext(node),
    };
    return mat;
  },
  applyMaterial(context, mat, isStrokeOnly) {
    if (mat.shader !== undefined && mat.uniforms !== undefined) {
      ApplyUniformFromData(mat.shader, context, mat.uniforms);
      context.target.shader(mat.shader);
    }
  },
};
export const SHADER_MATERIAL = "ShaderMaterial";

function ApplyUniformFromData(shader: any, context: ExecutionContext, data: FunctionContext) {
  shader.setUniform("time", context.time);
  //Todo: passe the extra data for lights
  Object.entries(data).forEach(([id, { value, type }]) => {
    if (type === "image") {
      const image = value as ImageData;
      if (!image || !image.isLoaded) {
        return;
      }
      shader.setUniform(sanitizeForShader(`uniform_${id}`), convertToUniform("image", value));
    } else {
      shader.setUniform(sanitizeForShader(`uniform_${id}`), convertToUniform(type, value));
    }
  });
}
