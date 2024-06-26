import { IconMathXy } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { generateShaderCodeFromNodeData } from "../../Utils/generateShaderCodeFromNodeData";
import { Vector, createVector2 } from "../../Types/vectorDataType";
import { EnforceGoodType } from "../../Utils/vectorUtils";
import { changeTypeGenerator } from "../../Utils/changeTypeGenerator";
import { VectorTypesFull } from "../../Types/PortType";

export const Scale: NodeDefinition = {
  id: "Scale",
  description: "Scale a value by a scalar",
  icon: IconMathXy,
  featureLevel: 80,
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
    return EnforceGoodType(nodeData, VectorScale(a, b));
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "out", ["vec", "scale"], ({ vec, scale }) => `${vec} * ${scale}`);
  },
};

export function VectorScale(a: Vector, b: number): number[] {
  return a.map((value) => value * b);
}
