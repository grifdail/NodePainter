import { IconGizmo } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { genShader } from "../../Data/genShader";
import { createColor, createVector2 } from "../../Data/vectorDataType";

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
    return genShader(node, context, "vec4", "out", ["uv"], ([uv]) => `texture2D(uniform_${node.dataInputs["sampler"].connectedPort}, ${uv}.xy)`);
  },
};
