import { IconPhoto } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { generateShaderCodeFromNodeData } from "../../Utils/generateShaderCodeFromNodeData";

export const ShaderMaterialStart: NodeDefinition = {
  id: "ShaderMaterial-start",
  hideInLibrary: true,
  icon: IconPhoto,
  description: "Render a shader to an image an image",
  dataInputs: [],
  dataOutputs: [],
  tags: ["Shader"],

  settings: [],
  getShaderCode(node, context) {
    return [
      generateShaderCodeFromNodeData(node, context, "uv", [], (_) => `vTexCoord.xy`),
      ...Object.values(node.dataOutputs)
        .filter((port) => port.id !== "uv" && port.type !== "image")
        .map((port) => {
          return generateShaderCodeFromNodeData(node, context, port.id, {}, () => `uniform_${port.id}`);
        }),
    ].join("\n");
  },
};
