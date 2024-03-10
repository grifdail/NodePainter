import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { genShader } from "../../Data/genShader";
import { createVector2 } from "../../Data/vectorDataType";
import { VectorLerp } from "../../Data/vectorUtils";
import { EnforceGoodType } from "../../Data/vectorUtils";
import { changeTypeGenerator } from "../../Data/changeTypeGenerator";
import { VectorTypesFull } from "../../Data/vectorUtils";

export const Lerp: NodeDefinition = {
  id: "Lerp",
  description: "interpolate between 2 vector",
  icon: IconMathFunction,
  tags: ["Math", "Vector"],
  dataInputs: [
    {
      id: "from",
      type: "vector2",
      defaultValue: createVector2(),
    },
    {
      id: "to",
      type: "vector2",
      defaultValue: createVector2(),
    },
    {
      id: "t",
      type: "number",
      defaultValue: 0.5,
    },
  ],
  dataOutputs: [
    {
      id: "result",
      type: "vector2",
      defaultValue: createVector2(),
    },
  ],
  executeOutputs: [],
  settings: [],
  defaultType: "vector2",
  availableTypes: VectorTypesFull,
  onChangeType: changeTypeGenerator(["from", "to"], ["result"]),
  getData: (portId, nodeData, context) => {
    var a = context.getInputValueVector(nodeData, "from");
    var b = context.getInputValueVector(nodeData, "to");
    var t = context.getInputValueNumber(nodeData, "t");
    return EnforceGoodType(nodeData, VectorLerp(a, b, t));
  },
  getShaderCode(node, context) {
    return genShader(node, context, "vec4", "result", ["from", "to", "t"], ([from, to, t]) => `mix(${from}, ${to}, ${t})`);
  },
};
