import { IconPhoto } from "@tabler/icons-react";
import { ImageData } from "../../Types/ImageData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortTypeDefinitions } from "../../Types/PortTypeDefinitions";
import { createDefaultMaterial } from "../../Utils/graph/definition/createDefaultMaterial";
import { ExecutionContext, FunctionContext } from "../../Utils/graph/execution/createExecutionContext";
import { sanitizeForShader } from "../../Utils/graph/execution/sanitizeForShader";

const VERTEX_SHADER = `
IN vec3 aPosition;
IN vec3 aNormal;
IN vec2 aTexCoord;
IN vec4 aVertexColor;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat3 uNormalMatrix;

uniform vec4 uMaterialColor;
uniform bool uUseVertexColor;

OUT vec3 vVertexNormal;
OUT highp vec2 vVertTexCoord;
OUT vec4 vColor;

void main(void) {
  vec4 positionVec4 = vec4(aPosition, 1.0);
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
  vVertexNormal = normalize(vec3( uNormalMatrix * aNormal ));
  vVertTexCoord = aTexCoord;
  vColor = (uUseVertexColor ? aVertexColor : uMaterialColor);
}`;

const FRAG_SHADER = `IN vec3 vVertexNormal;
void main(void) {
  OUT_COLOR = vec4(vVertexNormal, 1.0);
}`;

export const ShaderMaterial: NodeDefinition = {
  id: "ShaderMaterial",
  hideInLibrary: true,
  icon: IconPhoto,
  description: "[WIP] Use a shader to render the material",
  dataInputs: [],
  dataOutputs: [{ id: "material", type: "material", defaultValue: createDefaultMaterial() }],
  tags: ["Shader", "Material"],

  settings: [],

  getData(portId, node, context) {
    const keyShader = `${node.id}-shader`;
    let shader = context.blackboard[keyShader];
    if (!shader) {
      try {
        //const shaderCode: string = context.getShaderCode(node.type, Object.values(node.dataInputs));
        shader = context.target.createShader(VERTEX_SHADER, FRAG_SHADER);
        context.blackboard[keyShader] = shader;
      } catch (error) {
        console.error(error);
      }
    }

    return null;
  },
};
export const SHADER_MATERIAL = "ShaderMaterial";

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
