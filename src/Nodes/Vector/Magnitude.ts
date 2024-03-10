import { IconArrowUpRightCircle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { genShader } from "../../Data/genShader";
import { createVector2 } from "../../Data/vectorDataType";
import { VectorMagnitude } from "../../Data/vectorUtils";
import { changeTypeGenerator } from "../../Data/changeTypeGenerator";
import { VectorTypeslimited } from "../../Data/vectorUtils";

export const Magnitude: NodeDefinition = {
  id: "Magnitude",
  description: "Return the length of a vector",
  icon: IconArrowUpRightCircle,
  tags: ["Vector"],
  dataInputs: [
    {
      id: "vec",
      type: "vector2",
      defaultValue: createVector2(),
    },
  ],
  dataOutputs: [
    {
      id: "length",
      type: "number",
      defaultValue: 0,
    },
  ],
  executeOutputs: [],
  settings: [],
  defaultType: "vector2",
  availableTypes: VectorTypeslimited,
  onChangeType: changeTypeGenerator(["vec"], []),
  getData: (portId, nodeData, context) => {
    var vec = context.getInputValueVector(nodeData, "vec");
    return VectorMagnitude(vec);
  },
  getShaderCode(node, context) {
    return genShader(node, context, "float", "length", ["vec"], ([vec]) => `length(${vec})`);
  },
};
