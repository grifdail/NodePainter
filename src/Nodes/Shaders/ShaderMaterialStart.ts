import { IconPhoto } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { generateShaderCodeFromNodeData } from "../../Utils/graph/execution/generateShaderCodeFromNodeData";
import { sanitizeForShader } from "../../Utils/graph/execution/sanitizeForShader";

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
      ...Object.values(node.dataOutputs)
        .filter((port) => port.type !== "image")
        .map((port) => {
          return generateShaderCodeFromNodeData(node, context, port.id, {}, () => sanitizeForShader(`uniform_${port.id}`) as string);
        }),
    ].join("\n");
  },
};
