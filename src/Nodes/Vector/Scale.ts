import { IconMathXy } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { genShader } from "../../Data/genShader";
import { createVector2 } from "../../Data/vectorDataType";
import { EnforceGoodType } from "../../Data/vectorUtils";
import { changeTypeGenerator } from "../../Data/changeTypeGenerator";
import { VectorTypesFull } from "../../Data/vectorUtils";

export const Scale: NodeDefinition = {
  id: "Scale",
  description: "Scale a value by a scalar",
  icon: IconMathXy,
  tags: ["Math", "Vector"],
  dataInputs: [
    {
      id: "vec",
      type: "vector2",
      defaultValue: createVector2(),
    },
    {
      id: "scale",
      type: "number",
      defaultValue: 1,
    },
  ],
  dataOutputs: [
    {
      id: "out",
      type: "vector2",
      defaultValue: createVector2(),
    },
  ],
  executeOutputs: [],
  settings: [],
  defaultType: "vector2",
  availableTypes: VectorTypesFull,
  onChangeType: changeTypeGenerator(["vec"], ["out"]),
  getData: (portId, nodeData, context) => {
    var a = context.getInputValueVector(nodeData, "vec");
    var b = context.getInputValueNumber(nodeData, "scale");
    return EnforceGoodType(
      nodeData,
      a.map((value) => value * b)
    );
  },
  getShaderCode(node, context) {
    return genShader(node, context, "out", ["vec", "scale"], ({ vec, scale }) => `${vec} * ${scale}`);
  },
};
