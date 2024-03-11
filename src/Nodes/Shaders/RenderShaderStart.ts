import { IconPhoto } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { genShader } from "../../Data/genShader";

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
      genShader(node, context, "uv", [], (_) => `vTexCoord.xy`),
      ...Object.values(node.dataOutputs)
        .filter((port) => port.id !== "uv" && port.type !== "image")
        .map((port) => {
          return genShader(node, context, port.id, {}, () => `uniform_${port.id}`);
        }),
    ].join("\n");
  },
};
