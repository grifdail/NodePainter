import { IconMathXPlusY } from "@tabler/icons-react";
import { fraction } from "mathjs";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { VectorLength, VectorTypesFull } from "../../Types/PortType";
import { createVector2 } from "../../Types/vectorDataType";
import { changeTypeGenerator } from "../../Utils/changeTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../Utils/generateShaderCodeFromNodeData";
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
  availableTypes: VectorTypesFull,
  onChangeType: changeTypeGenerator(["seed"], []),
  getData: (portId, nodeData, context) => {
    return fraction(Math.sin(VectorDotProduct(context.getInputValueVector(nodeData, "seed"), randomVect.slice(0, VectorLength[nodeData.selectedType])) * 43758.5453123));
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
