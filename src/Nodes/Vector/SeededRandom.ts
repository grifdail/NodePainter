import { IconMathXPlusY } from "@tabler/icons-react";
import { fraction } from "mathjs";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortTypeDefinitions, portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { createVector2 } from "../../Types/vectorDataType";
import { changeTypeGenerator } from "../../Utils/graph/definition/changeTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../Utils/graph/execution/generateShaderCodeFromNodeData";
import { VectorDotProduct } from "./DotProduct";

const randomVect = [12.9898, 78.233, 56.128, 48.411];

export const SeededRandom: NodeDefinition = {
  id: "SeededRandom",
  description: "Generate a random value from a seed",
  icon: IconMathXPlusY,
  tags: ["Math", "Vector"],
  dataInputs: [
    {
      id: "seed",
      type: "vector2",
      defaultValue: createVector2(),
    },
  ],
  dataOutputs: [
    {
      id: "out",
      type: "number",
      defaultValue: 0,
    },
  ],

  settings: [],
  availableTypes: portTypesWithTags(["common", "vector"], ["array"]),
  onChangeType: changeTypeGenerator(["seed"], []),
  getData: (portId, nodeData, context) => {
    return fraction(Math.sin(VectorDotProduct(context.getInputValueVector(nodeData, "seed"), randomVect.slice(0, PortTypeDefinitions[nodeData.selectedType].vectorLength)) * 43758.5453123));
  },
  shaderRequirement: `
  float rand(float n){return fract(sin(n) * 43758.5453123);}
  float rand(vec2 st) {
    return fract(sin(dot(st, vec2(12.9898,78.233))) *  43758.5453123);
}
  float rand(vec3 st) {
    return fract(sin(dot(st, vec3(12.9898,78.233,56.128)))*43758.5453123);
}
float rand(vec4 st) {
    return fract(sin(dot(st, vec4(12.9898,78.233,56.128,48.411)))*43758.5453123);
}
`,
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "out", ["seed"], ({ seed }) => `rand(${seed})`);
  },
};
