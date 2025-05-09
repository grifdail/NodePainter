import { IconMathXy } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { VectorTypesFull } from "../../Types/PortType";
import { createVector2 } from "../../Types/vectorDataType";
import { changeTypeGenerator } from "../../Utils/changeTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../Utils/generateShaderCodeFromNodeData";
import { EnforceGoodType, VectorScale } from "../../Utils/vectorUtils";

export const Scale: NodeDefinition = {
  id: "Scale",
  description: "Multiply a vector by a scalar",
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
