import { IconAngle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { genShader } from "../../Data/genShader";

export const Atan2: NodeDefinition = {
  id: "Atan2",
  tags: ["Math"],
  icon: IconAngle,
  description: "Return the angle formed by the given coordinate and the horizontal axis.",
  dataInputs: [
    {
      id: "y",
      type: "number",
      defaultValue: 0,
    },
    {
      id: "x",
      type: "number",
      defaultValue: 0,
    },
  ],
  dataOutputs: [
    {
      id: "result",
      type: "number",
      defaultValue: 0,
    },
  ],
  executeOutputs: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    if (portId === "result") {
      var a = context.getInputValueNumber(nodeData, "y");
      var b = context.getInputValueNumber(nodeData, "x");
      return Math.atan2(a, b);
    }
  },
  shaderRequirement: `
    float atan2(in float y, in float x)
{
    bool s = (abs(x) > abs(y));
    return mix(PI/2.0 - atan(x,y), atan(y,x), s);
}
`,
  getShaderCode(node, context) {
    return genShader(node, context, "float", "result", ["x", "y"], ([x, y]) => `atan2(${y}, ${x})`);
  },
};
