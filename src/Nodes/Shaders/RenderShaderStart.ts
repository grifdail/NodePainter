import { IconPhoto } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { genShader } from "../../Data/genShader";
import { getShaderType } from "../../Data/convertToShaderValue";

export const RenderShaderStart: NodeDefinition = {
  id: "CustomShader-start",
  hideInLibrary: true,
  icon: IconPhoto,
  description: "Render a shader to an image an image",
  dataInputs: [],
  dataOutputs: [],
  tags: ["Shader"],
  executeOutputs: [],
  settings: [],
  getShaderCode(node, context) {
    return [
      genShader(node, context, "vec4", "uv", [], () => `vec4(vTexCoord.xy, 0.0, 0.0)`),
      ...Object.values(node.dataOutputs)
        .filter((port) => port.id !== "uv" && port.type !== "image")
        .map((port) => {
          return genShader(node, context, getShaderType(port.type), port.id, [], () => `uniform_${port.id}`);
        }),
    ].join("\n");
  },
};
