import { IconPhoto } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const ShaderMaterialEnd: NodeDefinition = {
  id: "ShaderMaterial-end",
  hideInLibrary: true,
  icon: IconPhoto,
  description: "Render a shader to an image an image",
  dataInputs: [],
  dataOutputs: [{ id: "image", type: "image", defaultValue: null }],
  tags: ["Shader"],
  executeOutputs: [],
  settings: [],
  getShaderCode(node, context) {
    return `gl_FragColor  = ${context.getShaderVar(node, "color", "color")};`;
  },
};
