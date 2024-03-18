import { IconArrowUpRightCircle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { genShader } from "../../Utils/genShader";
import { createVector2 } from "../../Types/vectorDataType";
import { VectorSquareMagnitude } from "../../Utils/vectorUtils";
import { changeTypeGenerator } from "../../Utils/changeTypeGenerator";
import { VectorTypeslimited } from "../../Types/PortType";

export const SquareMagnitude: NodeDefinition = {
  id: "SquareMagnitude",
  description: "Return the squared length of a vector",
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
    return VectorSquareMagnitude(vec);
  },
  getShaderCode(node, context) {
    return genShader(node, context, "length", ["vec"], ({ vec }) => `dot(${vec},${vec})`);
  },
};
