import { IconGizmo } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { genShader } from "../../Utils/genShader";
import { createColor, createVector2 } from "../../Types/vectorDataType";
import { cleanNameForShader } from "../../Utils/genShader";

export const SampleTexture: NodeDefinition = {
  id: "Sample Texture",
  hideInLibrary: false,
  icon: IconGizmo,
  description: "Sample a pixel from a UV",
  dataInputs: [
    { id: "uv", type: "vector2", defaultValue: createVector2(0, 0) },
    { id: "sampler", type: "image", defaultValue: null },
  ],

  dataOutputs: [{ id: "out", type: "color", defaultValue: createColor() }],
  tags: ["UV"],
  executeOutputs: [],
  settings: [],
  getShaderCode(node, context) {
    return genShader(node, context, "out", ["uv"], ({ uv }) => `texture2D(${cleanNameForShader(`uniform_${node.dataInputs["sampler"].connectedPort}`)}, ${uv})`);
  },
};
